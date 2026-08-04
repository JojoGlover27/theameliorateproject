// Double opt-in confirmation endpoint.
// Validates the HMAC token from the confirmation email, adds the subscriber to
// the Resend audience, marks the local row active, and sends the welcome email.
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const AUDIENCE_NAME = "Amelio Newsletter";
const FROM = "The Ameliorate Project <info@ameliorateproject.org>";
const SITE_URL = "https://ameliorateproject.org";

const b64urlDecode = (s: string) => {
  const pad = s.length % 4 ? 4 - (s.length % 4) : 0;
  return atob(s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad));
};
const b64url = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SUPABASE_SERVICE_ROLE_KEY + ":confirm"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value.toLowerCase()));
  return b64url(sig);
}

async function verifyToken(token: string): Promise<string | null> {
  const [ePart, sig] = token.split(".");
  if (!ePart || !sig) return null;
  let email: string;
  try { email = b64urlDecode(ePart); } catch { return null; }
  if (await hmac(email) !== sig) return null;
  return email.toLowerCase();
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
  return { ok: r.ok, status: r.status, body: text ? JSON.parse(text) : {} };
}

async function getAudienceId(): Promise<string> {
  const list = await resend("/audiences", { method: "GET" });
  const found = (list.body?.data ?? []).find((a: any) => a.name === AUDIENCE_NAME);
  if (found?.id) return found.id;
  const created = await resend("/audiences", { method: "POST", body: JSON.stringify({ name: AUDIENCE_NAME }) });
  if (!created.ok) throw new Error("audience_unavailable");
  return created.body.id;
}

const welcomeHtml = () => `<!doctype html><html><body style="margin:0;padding:0;background:#f6f4fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1a1030;">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;">
  <div style="background:#3C14A0;padding:28px 24px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;font-weight:600;">Subscription confirmed</h1>
    <p style="color:#F0A028;margin:8px 0 0;font-size:14px;letter-spacing:1px;text-transform:uppercase;">The Ameliorate Project</p>
  </div>
  <div style="background:#ffffff;padding:28px 24px;border-radius:0 0 12px 12px;line-height:1.6;font-size:15px;">
    <p>Thank you for confirming your subscription.</p>
    <p>You will receive our research, community health insights, digital rights and safety advisories, and updates from across our innovation ecosystem: Synapse, Orenta and DigiHub.</p>
    <p style="margin-top:24px;"><strong>The Ameliorate Project Team</strong><br/>
    <a href="${SITE_URL}" style="color:#3C14A0;">ameliorateproject.org</a></p>
  </div>
  <p style="text-align:center;color:#6b6580;font-size:12px;margin-top:20px;">You can unsubscribe at any time using the link in any email we send.</p>
</div></body></html>`;

const page = (title: string, body: string) => `<!doctype html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/><title>${title}</title></head>
<body style="margin:0;background:#f6f4fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1a1030;">
<div style="max-width:520px;margin:12vh auto;padding:32px 24px;background:#fff;border-radius:14px;text-align:center;">
<h1 style="font-size:22px;margin:0 0 12px;">${title}</h1><p style="line-height:1.6;color:#4b4560;">${body}</p>
<p style="margin-top:24px;"><a href="${SITE_URL}" style="color:#3C14A0;">Return to ameliorateproject.org</a></p>
</div></body></html>`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  const html = (s: string, status = 200) =>
    new Response(s, { status, headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" } });

  try {
    const email = await verifyToken(token);
    if (!email) {
      return html(page("Link not valid", "This confirmation link is invalid or has already been used. Please subscribe again from our website."), 400);
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
    const { data: existing } = await admin.from("subscribers").select("status").eq("email", email).maybeSingle();

    if (existing?.status === "active") {
      return html(page("You are already subscribed", "Your email address is already confirmed. Thank you for being with us."));
    }

    const audienceId = await getAudienceId();
    const add = await resend(`/audiences/${audienceId}/contacts`, {
      method: "POST",
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (!add.ok && add.status !== 409 && add.body?.name !== "validation_error") {
      console.error("resend_add_failed", add.status, add.body);
    }

    await admin.from("subscribers").upsert(
      { email, status: "active", resend_contact_id: add.body?.id ?? null, unsubscribed_at: null },
      { onConflict: "email" },
    );

    const send = await resend("/emails", {
      method: "POST",
      body: JSON.stringify({ from: FROM, to: [email], subject: "Subscription confirmed", html: welcomeHtml() }),
    });
    if (!send.ok) console.error("resend_send_failed", send.status, send.body);

    return html(page("Subscription confirmed", "Thank you. Your email address is confirmed and you are now subscribed to updates from The Ameliorate Project."));
  } catch (err) {
    console.error("confirm_error", err);
    return html(page("Something went wrong", "We could not confirm your subscription right now. Please try the link again shortly."), 500);
  }
});
