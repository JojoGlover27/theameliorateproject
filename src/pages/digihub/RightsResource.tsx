import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, Lightbulb, ListChecks, Info, FileText } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getResource, legalResources, SOURCE_PLACEHOLDER } from "@/data/digihub-rights";

const RightsResource = () => {
  const { resource: resourceSlug, provision: provisionSlug } = useParams();
  const resource = getResource(resourceSlug ?? "");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [resourceSlug, provisionSlug]);

  if (!resource) return <Navigate to="/digihub/your-rights" replace />;

  const provision = provisionSlug ? resource.provisions.find((p) => p.slug === provisionSlug) : undefined;
  if (provisionSlug && !provision) return <Navigate to={`/digihub/your-rights/${resource.slug}`} replace />;

  const related = provision
    ? provision.related.map((s) => legalResources.find((r) => r.slug === s)).filter(Boolean)
    : [];

  return (
    <DigiHubShell
      eyebrow={`Knowledge Library · ${resource.documentType}`}
      title={provision ? `${provision.label}: ${provision.title}` : resource.title}
      description={provision ? `From the ${resource.shortTitle}. Explained in plain language by DigiHub.` : resource.description}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-10 md:py-14">
        <Link
          to={provision ? `/digihub/your-rights/${resource.slug}` : "/digihub/your-rights"}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6"
        >
          <ArrowLeft size={15} /> {provision ? `Back to ${resource.shortTitle}` : "Back to Your Rights"}
        </Link>

        {!provision ? (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
            <div className="space-y-6">
              <section className="rounded-3xl border bg-card p-5 md:p-7 shadow-sm tint-purple">
                <h2 className="text-lg font-semibold text-card-foreground mb-2">Overview</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{resource.overview}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">Key provisions explained</h2>
                <div className="space-y-3">
                  {resource.provisions.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/digihub/your-rights/${resource.slug}/${p.slug}`}
                      className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 md:p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
                    >
                      <span className="grid place-items-center h-10 w-10 rounded-xl bg-primary/10 text-primary shrink-0">
                        <FileText size={18} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-primary">{p.label}</span>
                        <span className="block font-semibold text-card-foreground group-hover:text-primary transition-colors">{p.title}</span>
                        <span className="block text-sm text-muted-foreground mt-1 line-clamp-2">{p.explains}</span>
                      </span>
                      <ArrowRight size={16} className="text-muted-foreground shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <aside className="rounded-3xl border border-border bg-card p-5 shadow-sm space-y-4 lg:sticky lg:top-28">
              <h3 className="font-semibold text-card-foreground">About this document</h3>
              <dl className="text-sm space-y-2">
                <div><dt className="text-muted-foreground text-xs">Type</dt><dd className="text-foreground">{resource.documentType}</dd></div>
                <div><dt className="text-muted-foreground text-xs">Jurisdiction</dt><dd className="text-foreground">{resource.country}</dd></div>
                {resource.version && <div><dt className="text-muted-foreground text-xs">Version</dt><dd className="text-foreground">{resource.version}</dd></div>}
                <div><dt className="text-muted-foreground text-xs">Responsible authority</dt><dd className="text-foreground">{resource.sourceOrg}</dd></div>
                <div>
                  <dt className="text-muted-foreground text-xs">Official source</dt>
                  <dd>
                    {resource.sourceUrl ? (
                      <a href={resource.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary inline-flex items-center gap-1 hover:underline">
                        Open document <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">Link pending verification</span>
                    )}
                  </dd>
                </div>
                <div><dt className="text-muted-foreground text-xs">Last verified</dt><dd className="text-foreground">{resource.lastVerified ?? "Not yet verified"}</dd></div>
              </dl>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {resource.topics.map((t) => <Badge key={t} variant="secondary" className="rounded-full text-[11px]">{t}</Badge>)}
              </div>
            </aside>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
            <div className="space-y-5">
              <section className="rounded-3xl border border-border bg-secondary p-5 md:p-6">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Official wording</h2>
                {provision.sourceText ? (
                  <blockquote className="text-sm md:text-base text-foreground leading-relaxed italic border-l-2 border-primary pl-4">{provision.sourceText}</blockquote>
                ) : (
                  <p className="text-sm text-muted-foreground inline-flex items-start gap-2"><Info size={15} className="shrink-0 mt-0.5" /> {SOURCE_PLACEHOLDER}</p>
                )}
              </section>

              <section className="rounded-3xl border bg-card p-5 md:p-6 shadow-sm tint-purple">
                <h2 className="flex items-center gap-2 font-semibold text-card-foreground mb-2"><Lightbulb size={17} className="text-primary" /> In simple terms</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{provision.explains}</p>
              </section>

              <section className="rounded-3xl border bg-card p-5 md:p-6 shadow-sm tint-gold">
                <h2 className="font-semibold text-card-foreground mb-2">Why it matters to you</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{provision.whyItMatters}</p>
              </section>

              <div className="grid sm:grid-cols-2 gap-4">
                <section className="rounded-3xl border bg-card p-5 shadow-sm tint-teal">
                  <h2 className="flex items-center gap-2 font-semibold text-card-foreground mb-3"><ShieldCheck size={17} className="text-brand-teal" /> What it protects</h2>
                  <ul className="space-y-2">
                    {provision.protects.map((x) => <li key={x} className="text-sm text-muted-foreground flex gap-2"><span className="text-brand-teal">•</span>{x}</li>)}
                  </ul>
                </section>
                <section className="rounded-3xl border bg-card p-5 shadow-sm tint-pink">
                  <h2 className="flex items-center gap-2 font-semibold text-card-foreground mb-3"><ListChecks size={17} className="text-brand-magenta" /> What you can do</h2>
                  <ol className="space-y-2 list-decimal list-inside">
                    {provision.actions.map((x) => <li key={x} className="text-sm text-muted-foreground">{x}</li>)}
                  </ol>
                </section>
              </div>

              <p className="text-xs text-muted-foreground">
                Educational explanation by DigiHub, not legal advice. For your specific situation, speak to a qualified legal professional.
              </p>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                <h3 className="font-semibold text-card-foreground mb-3">More in this document</h3>
                <ul className="space-y-1.5">
                  {resource.provisions.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`/digihub/your-rights/${resource.slug}/${p.slug}`}
                        className={`block text-sm rounded-lg px-2 py-1.5 transition-colors ${p.slug === provision.slug ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary"}`}
                      >
                        <span className="text-xs opacity-70">{p.label}</span><br />{p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {related.length > 0 && (
                <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="font-semibold text-card-foreground mb-3">Related laws</h3>
                  <ul className="space-y-2">
                    {related.map((r) => r && (
                      <li key={r.slug}>
                        <Link to={`/digihub/your-rights/${r.slug}`} className="text-sm text-primary hover:underline inline-flex items-center gap-1">{r.shortTitle} <ArrowRight size={12} /></Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Button variant="outline" className="rounded-full w-full" asChild>
                <Link to="/digihub/your-rights/help">I have a problem</Link>
              </Button>
            </aside>
          </div>
        )}
      </div>
    </DigiHubShell>
  );
};

export default RightsResource;
