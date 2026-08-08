import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/newsletter-confirm`;

const ConfirmSubscription = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<"loading" | "confirmed" | "already" | "invalid" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!token) { setState("invalid"); return; }
      try {
        const res = await fetch(`${FN_URL}?format=json&token=${encodeURIComponent(token)}`);
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        setState((data?.status as typeof state) ?? (res.ok ? "confirmed" : "error"));
      } catch {
        if (!cancelled) setState("error");
      }
    };
    run();
    return () => { cancelled = true; };
  }, [token]);

  const content = {
    loading: { title: "Confirming your subscription…", body: "One moment please." },
    confirmed: {
      title: "Subscription confirmed",
      body: "Thank you. Your email address is confirmed and you are now subscribed to updates from The Ameliorate Project. A confirmation email is on its way to your inbox.",
    },
    already: { title: "You are already subscribed", body: "Your email address is already confirmed. Thank you for being with us." },
    invalid: { title: "Link not valid", body: "This confirmation link is invalid or has expired. Please subscribe again from our website." },
    error: { title: "Something went wrong", body: "We could not confirm your subscription right now. Please try the link again shortly." },
  }[state];

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/40 px-4 py-20">
      <div className="w-full max-w-lg rounded-2xl bg-card p-8 text-center shadow-lg">
        <div className="mb-4 flex justify-center">
          {state === "loading" && <Loader2 className="animate-spin text-primary" size={36} />}
          {(state === "confirmed" || state === "already") && <CheckCircle2 className="text-primary" size={40} />}
          {(state === "invalid" || state === "error") && <AlertCircle className="text-destructive" size={40} />}
        </div>
        <h1 className="text-2xl font-semibold text-foreground">{content.title}</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{content.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Return home</Link>
          <Link to="/newsletter" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground">About our newsletter</Link>
        </div>
      </div>
    </main>
  );
};

export default ConfirmSubscription;
