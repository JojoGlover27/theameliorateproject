import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, Camera, Route, Scale, Compass } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import AskOrenta from "@/components/digihub/AskOrenta";
import { Button } from "@/components/ui/button";
import { problems } from "@/data/digihub-rights";

const RightsHelp = () => {
  const [params, setParams] = useSearchParams();
  const [active, setActive] = useState<string | null>(params.get("p"));
  const guide = problems.find((p) => p.slug === active);

  useEffect(() => {
    if (active) {
      setParams({ p: active }, { replace: true });
      document.getElementById("guidance")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [active, setParams]);

  return (
    <DigiHubShell
      eyebrow="Knowledge Library · I have a problem"
      title="What happened?"
      description="Choose the situation closest to yours. We will show the rights that may apply, immediate safety steps, what evidence to keep, and where you can turn for support."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-10 md:py-14 space-y-8">
        <Link to="/digihub/your-rights" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft size={15} /> Back to Your Rights
        </Link>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {problems.map((p) => {
            const on = p.slug === active;
            return (
              <button
                key={p.slug}
                onClick={() => setActive(p.slug)}
                aria-pressed={on}
                className={`text-left rounded-2xl border bg-card p-4 transition-all hover:shadow-md tint-pink ${on ? "ring-2 ring-brand-magenta/40 shadow-md" : ""}`}
              >
                <span className="text-2xl" aria-hidden>{p.emoji}</span>
                <p className="text-sm font-semibold text-card-foreground mt-2 leading-snug">{p.title}</p>
              </button>
            );
          })}
        </div>

        <div id="guidance" className="scroll-mt-28">
          {guide ? (
            <div className="space-y-4">
              <div className="rounded-3xl border bg-card p-5 md:p-7 shadow-sm tint-purple">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">Your situation</p>
                <h2 className="text-xl md:text-2xl font-semibold text-card-foreground">{guide.emoji} {guide.title}</h2>
                <p className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed"><strong className="text-foreground">This may involve:</strong> {guide.mayInvolve}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <section className="rounded-3xl border bg-card p-5 shadow-sm tint-gold">
                  <h3 className="flex items-center gap-2 font-semibold text-card-foreground mb-3"><Scale size={17} className="text-brand-gold" /> Rights that may apply</h3>
                  <ul className="space-y-2 mb-4">
                    {guide.rights.map((r) => <li key={r} className="text-sm text-muted-foreground flex gap-2"><span className="text-brand-gold">•</span>{r}</li>)}
                  </ul>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Read the law</p>
                  <ul className="space-y-1.5">
                    {guide.resources.map((r) => (
                      <li key={r.to}><Link to={r.to} className="text-sm text-primary hover:underline inline-flex items-center gap-1">{r.label} <ArrowRight size={12} /></Link></li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-3xl border bg-card p-5 shadow-sm tint-teal">
                  <h3 className="flex items-center gap-2 font-semibold text-card-foreground mb-3"><ShieldCheck size={17} className="text-brand-teal" /> Immediate safety steps</h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    {guide.safetySteps.map((s) => <li key={s} className="text-sm text-muted-foreground">{s}</li>)}
                  </ol>
                </section>

                <section className="rounded-3xl border bg-card p-5 shadow-sm tint-blue">
                  <h3 className="flex items-center gap-2 font-semibold text-card-foreground mb-3"><Camera size={17} className="text-brand-blue" /> Evidence to keep</h3>
                  <ul className="space-y-2">
                    {guide.evidence.map((e) => <li key={e} className="text-sm text-muted-foreground flex gap-2"><span className="text-brand-blue">•</span>{e}</li>)}
                  </ul>
                </section>

                <section className="rounded-3xl border bg-card p-5 shadow-sm tint-orange">
                  <h3 className="flex items-center gap-2 font-semibold text-card-foreground mb-3"><Route size={17} className="text-accent" /> Where to turn</h3>
                  <ul className="space-y-2">
                    {guide.pathways.map((p) => <li key={p} className="text-sm text-muted-foreground flex gap-2"><span className="text-accent">•</span>{p}</li>)}
                  </ul>
                </section>
              </div>

              <section className="rounded-3xl border border-border bg-secondary p-5">
                <h3 className="flex items-center gap-2 font-semibold text-foreground mb-3"><Compass size={17} className="text-primary" /> Helpful DigiHub tools</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.digihub.map((d) => (
                    <Button key={d.to} size="sm" variant="outline" className="rounded-full bg-background" asChild>
                      <Link to={d.to}>{d.label}</Link>
                    </Button>
                  ))}
                </div>
              </section>

              <p className="text-xs text-muted-foreground">
                This guidance is educational, not legal advice. If you are in immediate danger, contact emergency services. For your specific situation, speak to a qualified legal professional or a trusted human-rights organisation.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
              Select a situation above to see guidance.
            </div>
          )}
        </div>

        <AskOrenta compact />
      </div>
    </DigiHubShell>
  );
};

export default RightsHelp;
