// Newsletter signup → Resend Audience + local subscribers mirror + welcome email
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const AUDIENCE_NAME = "Amelio Newsletter";
const FROM = "The Ameliorate Project <info@ameliorateproject.org>";

const rl = new Map<string, number[]>();
const RL_WINDOW_MS = 60_000;
const RL_MAX = 5;

const b64url = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

async function confirmToken(email: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SUPABASE_SERVICE_ROLE_KEY + ":confirm"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(email.toLowerCase()));
  return `${b64url(new TextEncoder().encode(email.toLowerCase()))}.${b64url(sig)}`;
}

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

async function getOrCreateAudience(): Promise<string> {
  if (cachedAudienceId) return cachedAudienceId;
  const list = await resend("/audiences", { method: "GET" });
  if (list.ok) {
    const found = (list.body?.data ?? []).find((a: any) => a.name === AUDIENCE_NAME);
    if (found?.id) return (cachedAudienceId = found.id);
  }
  const created = await resend("/audiences", {
    method: "POST",
    body: JSON.stringify({ name: AUDIENCE_NAME }),
  });
  if (!created.ok) throw new Error(`audience_create_failed: ${created.status}`);
  return (cachedAudienceId = created.body.id);
}

const confirmHtml = (link: string) => `<!doctype html><html><body style="margin:0;padding:0;background:#f6f4fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1a1030;">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;">
  <div style="background:#3C14A0;padding:28px 24px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;font-weight:600;">Please confirm your subscription</h1>
    <p style="color:#F0A028;margin:8px 0 0;font-size:14px;letter-spacing:1px;text-transform:uppercase;">The Ameliorate Project</p>
  </div>
  <div style="background:#ffffff;padding:28px 24px;border-radius:0 0 12px 12px;line-height:1.6;font-size:15px;">
    <p>You asked to receive updates from The Ameliorate Project. Confirm your email address to complete your subscription.</p>
    <p style="text-align:center;margin:28px 0;">
      <a href="${link}" style="background:#3C14A0;color:#ffffff;text-decoration:none;padding:13px 26px;border-radius:8px;font-weight:600;display:inline-block;">Confirm subscription</a>
    </p>
    <p style="font-size:13px;color:#6b6580;">If the button does not work, copy this link into your browser:<br/>
    <a href="${link}" style="color:#3C14A0;word-break:break-all;">${link}</a></p>
    <p style="font-size:13px;color:#6b6580;">If you did not request this, simply ignore this email. Nothing will be sent to you.</p>
  </div>
</div></body></html>`;

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 254;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const now = Date.now();
    const hits = (rl.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
    if (hits.length >= RL_MAX) {
      return new Response(JSON.stringify({ error: "rate_limited" }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    hits.push(now); rl.set(ip, hits);

    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim().toLowerCase();
    const source = String(body?.source ?? "unknown").slice(0, 60);
    if (body?.website) return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "invalid_email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Double opt-in: store as pending and email a confirmation link.
    // The subscriber is only added to the Resend audience after confirming.
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
    const { data: existing } = await admin
      .from("subscribers")
      .select("status")
      .eq("email", email)
      .maybeSingle();

    const alreadyExists = existing?.status === "active";

    if (!alreadyExists) {
      await admin.from("subscribers").upsert(
        { email, source, status: "pending", unsubscribed_at: null },
        { onConflict: "email" },
      );

      const link = `${SUPABASE_URL}/functions/v1/newsletter-confirm?token=${await confirmToken(email)}`;
      const send = await resend("/emails", {
        method: "POST",
        body: JSON.stringify({
          from: FROM,
          to: [email],
          subject: "Please confirm your newsletter subscription",
          html: confirmHtml(link),
        }),
      });
      if (!send.ok) console.error("resend_send_failed", send.status, send.body);
    }

    return new Response(JSON.stringify({ ok: true, alreadyExists }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("newsletter_error", err);
    return new Response(JSON.stringify({ error: "server_error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
