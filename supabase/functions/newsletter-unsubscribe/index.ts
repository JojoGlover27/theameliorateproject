// Public unsubscribe endpoint. Validates HMAC token, removes subscriber
// from Resend audience, and marks local row as unsubscribed.
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

const SITE_URL = "https://ameliorateproject.org";

const b64url = (buf: ArrayBuffer | Uint8Array) => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const b64urlDecode = (s: string) => {
  const pad = s.length % 4 ? 4 - (s.length % 4) : 0;
  const n = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  return atob(n);
};

async function hmac(email: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SUPABASE_SERVICE_ROLE_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(email.toLowerCase()));
  return b64url(sig);
}

export async function makeUnsubscribeToken(email: string): Promise<string> {
  const sig = await hmac(email);
  return `${b64url(new TextEncoder().encode(email.toLowerCase()))}.${sig}`;
}

async function verifyToken(token: string): Promise<string | null> {
  const [ePart, sig] = token.split(".");
  if (!ePart || !sig) return null;
  let email: string;
  try { email = b64urlDecode(ePart); } catch { return null; }
  const expected = await hmac(email);
  if (expected !== sig) return null;
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

async function getAudienceId(): Promise<string | null> {
  const list = await resend("/audiences", { method: "GET" });
  if (!list.ok) return null;
  return (list.body?.data ?? []).find((a: any) => a.name === AUDIENCE_NAME)?.id ?? null;
}

async function unsubscribe(email: string) {
  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  await admin.from("subscribers").update({
    status: "unsubscribed",
    unsubscribed_at: new Date().toISOString(),
  }).eq("email", email);

  try {
    const audienceId = await getAudienceId();
    if (audienceId) {
      await resend(`/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`, { method: "DELETE" });
    }
  } catch (e) {
    console.error("resend_remove_failed", e);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  const email = token ? await verifyToken(token) : null;

  // One-click List-Unsubscribe POST from mail clients
  if (req.method === "POST") {
    if (!email) return new Response("invalid_token", { status: 400, headers: corsHeaders });
    await unsubscribe(email);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // GET: unsubscribe and redirect to a friendly page
  if (req.method === "GET") {
    if (!email) {
      return Response.redirect(`${SITE_URL}/unsubscribed?status=invalid`, 302);
    }
    await unsubscribe(email);
    return Response.redirect(`${SITE_URL}/unsubscribed?status=ok`, 302);
  }

  return new Response("method_not_allowed", { status: 405, headers: corsHeaders });
});
