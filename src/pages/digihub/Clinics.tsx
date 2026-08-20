import { useState } from "react";
import { CalendarClock, CheckCircle2, HeartHandshake, Sparkles } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const promises = [
  { icon: HeartHandshake, label: "Community cohorts", sub: "Learn together, not alone" },
  { icon: Sparkles, label: "Hands-on practice", sub: "Real devices, real settings" },
  { icon: CheckCircle2, label: "Personal safety plan", sub: "Leave with your own plan" },
];

const Clinics = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const notify = async () => {
    if (!email) return;
    setState("loading");
    try {
      const { error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: { email, source: "digihub-clinic-waitlist", website: "" },
      });
      if (error) throw error;
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <DigiHubShell
      title="Digital Rights & Safety Clinics"
      description="Workshops, virtual sessions and multi-week cohorts, built with the communities they serve."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-14 md:py-20">
        <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-brand-magenta/10 to-brand-blue/10 p-8 md:p-12 text-center shadow-lg">
          <span className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-primary text-primary-foreground mx-auto mb-5">
            <CalendarClock size={26} />
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Clinic Coming Soon</h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Our first Digital Rights &amp; Safety Clinic is being designed with community partners.
            Dates, locations and registration will be published here as soon as they are confirmed.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mt-8 text-left">
            {promises.map((p) => (
              <div key={p.label} className="rounded-2xl border border-border bg-card/80 backdrop-blur p-4">
                <p.icon className="text-primary mb-2" size={18} />
                <p className="text-sm font-semibold text-card-foreground">{p.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-md mx-auto text-left">
            {state === "done" ? (
              <p className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                <CheckCircle2 size={16} /> You are on the list. We will email you when dates are live.
              </p>
            ) : (
              <>
                <label htmlFor="clinic-email" className="block text-xs font-medium text-muted-foreground mb-2">
                  Get notified when the first clinic opens
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="clinic-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                  <Button className="rounded-full px-6" disabled={state === "loading"} onClick={notify}>
                    {state === "loading" ? "Adding..." : "Notify me"}
                  </Button>
                </div>
                {state === "error" && (
                  <p className="text-xs text-destructive mt-2">Something went wrong. Please try again shortly.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DigiHubShell>
  );
};

export default Clinics;
