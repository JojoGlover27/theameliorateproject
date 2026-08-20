import { useState } from "react";
import { AlertTriangle, ChevronDown, ShieldCheck, ExternalLink, Radio, RefreshCw } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { alerts } from "@/data/digihub";
import { formatWhen, useIntel } from "@/lib/digihub-intel";

const severityTone: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/30",
  Medium: "bg-accent/10 text-accent border-accent/30",
  Low: "bg-primary/10 text-primary border-primary/30",
};

const Alerts = () => {
  const [open, setOpen] = useState<string | null>(alerts[0]?.slug ?? null);
  const { data, loading, error } = useIntel();
  const live = data?.alerts ?? [];

  return (
    <DigiHubShell
      title="Scam Alerts"
      description="A live feed of scam and fraud reporting from around the world, alongside verified guidance from our team on what to do."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-12 md:py-16 space-y-10">
        {/* Live feed */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              {loading ? (
                <RefreshCw size={15} className="text-muted-foreground animate-spin" />
              ) : (
                <Radio size={15} className="text-emerald-500 animate-pulse" />
              )}
              Live scam intelligence
            </h2>
            {data && (
              <span className="text-[11px] text-muted-foreground rounded-full border border-border bg-secondary px-3 py-1">
                Updated {formatWhen(data.updatedAt)}
              </span>
            )}
          </div>

          {loading && <p className="text-sm text-muted-foreground">Pulling the latest reports...</p>}
          {!loading && (error || live.length === 0) && (
            <p className="text-sm text-muted-foreground">
              {error ?? "No new reports in this refresh. The feed updates automatically."}
            </p>
          )}

          <div className="grid gap-3">
            {live.map((a) => (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-border bg-gradient-to-br from-destructive/5 via-card to-accent/5 p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${severityTone[a.severity]}`}>
                    {a.severity}
                  </span>
                  <span className="text-xs text-muted-foreground">{a.source}</span>
                  <span className="text-xs text-muted-foreground">· {formatWhen(a.date)}</span>
                </div>
                <p className="text-sm font-medium text-card-foreground leading-snug group-hover:text-primary transition-colors">
                  {a.title}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Read the report <ExternalLink size={11} />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Verified guidance */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Verified guidance from our team</h2>
          {alerts.map((a) => {
            const isOpen = open === a.slug;
            return (
              <div
                key={a.slug}
                className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-brand-magenta/5 shadow-sm overflow-hidden"
              >
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
        </section>

        <p className="text-xs text-muted-foreground">
          The live feed aggregates published reporting worldwide and refreshes on its own. To report an
          incident anonymously, use the contact form, no name or email is required.
        </p>
      </div>
    </DigiHubShell>
  );
};

export default Alerts;
