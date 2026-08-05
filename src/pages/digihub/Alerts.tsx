import { useState } from "react";
import { AlertTriangle, ChevronDown, ShieldCheck } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { alerts } from "@/data/digihub";

const severityTone: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/30",
  Medium: "bg-accent/10 text-accent border-accent/30",
  Low: "bg-primary/10 text-primary border-primary/30",
};

const Alerts = () => {
  const [open, setOpen] = useState<string | null>(alerts[0]?.slug ?? null);

  return (
    <DigiHubShell
      title="Scam Alerts"
      description="Current scams and threats reported by the community and verified by our team. Open an alert for the full explanation and what to do."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-12 md:py-16 space-y-4">
        {alerts.map((a) => {
          const isOpen = open === a.slug;
          return (
            <div key={a.slug} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : a.slug)}
                aria-expanded={isOpen}
                className="w-full flex items-start gap-3 p-5 text-left"
              >
                <AlertTriangle className="text-destructive shrink-0 mt-0.5" size={18} />
                <span className="flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${severityTone[a.severity]}`}>
                      {a.severity}
                    </span>
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                  </span>
                  <span className="block font-semibold text-card-foreground mt-1.5">{a.title}</span>
                  <span className="block text-sm text-muted-foreground mt-1">{a.summary}</span>
                </span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pl-14 space-y-4">
                  {a.detail.map((d) => (
                    <p key={d} className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                  ))}
                  <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                    <p className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <ShieldCheck size={15} className="text-primary" /> What to do
                    </p>
                    <ul className="space-y-1.5">
                      {a.actions.map((act) => (
                        <li key={act} className="text-sm text-muted-foreground">• {act}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <p className="text-xs text-muted-foreground pt-4">
          Alerts are reviewed weekly and managed through the Intelligence Dashboard. To report an incident
          anonymously, use the contact form, no name or email is required.
        </p>
      </div>
    </DigiHubShell>
  );
};

export default Alerts;
