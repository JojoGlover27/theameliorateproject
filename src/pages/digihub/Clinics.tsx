import { useState } from "react";
import { CalendarDays, MapPin, Users, CheckCircle2 } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clinicEvents } from "@/data/digihub";
import { addClinic, getClinics } from "@/lib/digihub-store";
import { supabase } from "@/integrations/supabase/client";

const Clinics = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [registered, setRegistered] = useState<string[]>(getClinics());

  const register = async (slug: string) => {
    if (!email) return;
    setState("loading");
    try {
      // Registration confirmation is delivered through the existing email system.
      const { error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: { email, source: `digihub-clinic:${slug}`, website: "" },
      });
      if (error) throw error;
      addClinic(slug);
      setRegistered(getClinics());
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <DigiHubShell
      title="Digital Rights & Safety Clinics"
      description="Workshops, virtual sessions and multi-week cohorts. These are learning experiences, not consultations, and every participant leaves with a personal Digital Safety Plan."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-12 md:py-16 space-y-5">
        {clinicEvents.map((e) => {
          const isRegistered = registered.includes(e.slug);
          return (
            <div key={e.slug} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25">
                  {e.type}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border ${e.status === "Open" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/25" : "bg-accent/10 text-accent border-accent/30"}`}>
                  {e.status === "Open" ? "Registration open" : "Waiting list"}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-card-foreground">{e.title}</h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{e.blurb}</p>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {e.date}</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} /> {e.location}</span>
                <span className="flex items-center gap-1.5"><Users size={13} /> {e.seats}</span>
              </div>

              {isRegistered ? (
                <p className="mt-4 flex items-center gap-2 text-sm text-primary">
                  <CheckCircle2 size={15} /> You are registered. A confirmation email is on its way.
                </p>
              ) : selected === e.slug ? (
                <div className="mt-4 space-y-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder="Email for your confirmation"
                    aria-label="Email address"
                  />
                  <div className="flex gap-2">
                    <Button className="rounded-full" disabled={state === "loading"} onClick={() => register(e.slug)}>
                      {state === "loading" ? "Registering..." : e.status === "Open" ? "Confirm registration" : "Join waiting list"}
                    </Button>
                    <Button variant="ghost" className="rounded-full" onClick={() => setSelected(null)}>Cancel</Button>
                  </div>
                  {state === "error" && (
                    <p className="text-xs text-destructive">Something went wrong. Please try again in a moment.</p>
                  )}
                </div>
              ) : (
                <Button className="rounded-full mt-4" onClick={() => { setSelected(e.slug); setState("idle"); }}>
                  {e.status === "Open" ? "Register" : "Join waiting list"}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </DigiHubShell>
  );
};

export default Clinics;
