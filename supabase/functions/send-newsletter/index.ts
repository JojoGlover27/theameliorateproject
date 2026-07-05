// Admin-only: send a newsletter to all active subscribers
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const FROM = "The Ameliorate Project <info@ameliorateproject.org>";

async function resend(path: string, init: RequestInit = {}) {
  const r = await fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await r.text();
  const body = text ? JSON.parse(text) : {};
  return { ok: r.ok, status: r.status, body };
}

function wrapHtml(subject: string, previewText: string, innerHtml: string, coverUrl?: string | null) {
  const cover = coverUrl
    ? `<img src="${coverUrl}" alt="" style="display:block;width:100%;max-width:560px;height:auto;border-radius:8px;margin:0 0 20px 0;" />`
    : "";
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:#f6f4fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1a1030;">
<div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">${escapeHtml(previewText)}</div>
<div style="max-width:600px;margin:0 auto;padding:24px 16px;">
  <div style="background:#3C14A0;padding:20px 24px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:20px;font-weight:600;">The Ameliorate Project</h1>
    <p style="color:#F0A028;margin:6px 0 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;">Newsletter</p>
  </div>
  <div style="background:#fff;padding:28px 24px;border-radius:0 0 12px 12px;line-height:1.65;font-size:16px;">
    ${cover}
    ${innerHtml}
  </div>
  <p style="text-align:center;color:#6b6580;font-size:12px;margin-top:20px;">
    You are receiving this email because you subscribed to updates from The Ameliorate Project.<br/>
    <a href="https://ameliorateproject.org" style="color:#3C14A0;">ameliorateproject.org</a> ·
    <a href="{{RESEND_UNSUBSCRIBE_URL}}" style="color:#3C14A0;">Unsubscribe</a>
  </p>
</div></body></html>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // AuthN + AuthZ (admin only)
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const body = await req.json().catch(() => ({}));
    const newsletterId = String(body?.newsletterId ?? "");
    const testEmail = body?.testEmail ? String(body.testEmail).trim().toLowerCase() : null;
    if (!newsletterId) {
      return new Response(JSON.stringify({ error: "missing_newsletter_id" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: nl, error: nlErr } = await admin.from("newsletters").select("*").eq("id", newsletterId).single();
    if (nlErr || !nl) {
      return new Response(JSON.stringify({ error: "newsletter_not_found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const finalHtml = wrapHtml(nl.subject, nl.preview_text ?? "", nl.html, nl.cover_image_url);

    // Test send: don't touch subscribers, don't mark sent
    if (testEmail) {
      const r = await resend("/emails", {
        method: "POST",
        body: JSON.stringify({ from: FROM, to: [testEmail], subject: `[TEST] ${nl.subject}`, html: finalHtml }),
      });
      if (!r.ok) {
        return new Response(JSON.stringify({ error: "test_send_failed", detail: r.body }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ ok: true, test: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (nl.status === "sent") {
      return new Response(JSON.stringify({ error: "already_sent" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: subs, error: subsErr } = await admin
      .from("subscribers")
      .select("email")
      .eq("status", "active");
    if (subsErr) throw subsErr;

    await admin.from("newsletters").update({ status: "sending" }).eq("id", newsletterId);

    let sent = 0;
    let failed = 0;
    for (const s of subs ?? []) {
      const r = await resend("/emails", {
        method: "POST",
        body: JSON.stringify({
          from: FROM,
          to: [s.email],
          subject: nl.subject,
          html: finalHtml,
          headers: { "List-Unsubscribe": "<mailto:info@ameliorateproject.org?subject=unsubscribe>" },
        }),
      });
      if (r.ok) {
        sent++;
        await admin.from("newsletter_sends").insert({
          newsletter_id: newsletterId,
          subscriber_email: s.email,
          status: "sent",
          resend_message_id: r.body?.id ?? null,
          sent_at: new Date().toISOString(),
        });
      } else {
        failed++;
        await admin.from("newsletter_sends").insert({
          newsletter_id: newsletterId,
          subscriber_email: s.email,
          status: "failed",
          error: JSON.stringify(r.body).slice(0, 500),
        });
      }
      // small throttle for Resend rate limits (~10/s)
      await new Promise((res) => setTimeout(res, 120));
    }

    await admin.from("newsletters").update({
      status: "sent",
      sent_at: new Date().toISOString(),
      recipient_count: sent,
    }).eq("id", newsletterId);

    return new Response(JSON.stringify({ ok: true, sent, failed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send_newsletter_error", err);
    return new Response(JSON.stringify({ error: "server_error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
