// Newsletter signup → Resend Audience + branded welcome email
// deno-lint-ignore-file no-explicit-any

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const AUDIENCE_NAME = "Amelio Newsletter";
const FROM = "The Ameliorate Project <info@ameliorateproject.org>";

// Simple in-memory rate limit (per edge instance) — pragmatic anti-spam.
const rl = new Map<string, number[]>();
const RL_WINDOW_MS = 60_000;
const RL_MAX = 5;

let cachedAudienceId: string | null = null;

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

const welcomeHtml = () => `<!doctype html><html><body style="margin:0;padding:0;background:#f6f4fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1a1030;">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;">
  <div style="background:#3C14A0;padding:28px 24px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;font-weight:600;">Welcome to The Ameliorate Project</h1>
    <p style="color:#F0A028;margin:8px 0 0;font-size:14px;letter-spacing:1px;text-transform:uppercase;">Newsletter</p>
  </div>
  <div style="background:#ffffff;padding:28px 24px;border-radius:0 0 12px 12px;line-height:1.6;font-size:15px;">
    <p>Thank you for subscribing to updates from The Ameliorate Project.</p>
    <p>Each month, we share our latest research, community health insights, advocacy updates, and news from the development of Synapse, our privacy-first digital health platform for LGBTQI+ people and people living with HIV in Ghana.</p>
    <p>We are glad you are here.</p>
    <p style="margin-top:24px;"><strong>The Ameliorate Project Team</strong><br/>
    <a href="https://ameliorateproject.org" style="color:#3C14A0;">ameliorateproject.org</a></p>
  </div>
  <p style="text-align:center;color:#6b6580;font-size:12px;margin-top:20px;">You can unsubscribe at any time using the link in any email we send.</p>
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
    // honeypot
    if (body?.website) return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "invalid_email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const audienceId = await getOrCreateAudience();

    // Add contact (Resend dedupes; 409 => already exists)
    const add = await resend(`/audiences/${audienceId}/contacts`, {
      method: "POST",
      body: JSON.stringify({ email, unsubscribed: false, first_name: source }),
    });

    if (!add.ok && add.status !== 409 && add.body?.name !== "validation_error") {
      // Try to continue with welcome even on non-fatal errors, but surface if truly failed
      console.error("resend_add_failed", add.status, add.body);
    }

    const alreadyExists = add.status === 409 || add.body?.name === "validation_error";

    if (!alreadyExists) {
      const send = await resend("/emails", {
        method: "POST",
        body: JSON.stringify({
          from: FROM,
          to: [email],
          subject: "Welcome to The Ameliorate Project Newsletter",
          html: welcomeHtml(),
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
