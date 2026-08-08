// TEMPORARY diagnostic: lists recent Resend emails to verify send logging.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) {
    return new Response(JSON.stringify({ error: "no_key" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const r = await fetch("https://api.resend.com/emails", {
    headers: { Authorization: `Bearer ${key}` },
  });
  const text = await r.text();
  return new Response(text, {
    status: r.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
