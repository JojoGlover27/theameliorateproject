import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, LifeBuoy, ArrowRight, BookOpen, Scale, FileText, Info } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import AskOrenta from "@/components/digihub/AskOrenta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { legalResources, rightsTopics, searchLibrary, type RightsTopic } from "@/data/digihub-rights";

const docTone: Record<string, string> = {
  Constitution: "tint-gold",
  Law: "tint-purple",
  Policy: "tint-blue",
  Regulation: "tint-teal",
  Strategy: "tint-pink",
  Guidance: "tint-orange",
};

const YourRights = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const topicSlug = params.get("topic");
  const activeTopic = rightsTopics.find((t) => t.slug === topicSlug);

  const hits = useMemo(() => searchLibrary(query), [query]);
  const resources = useMemo(
    () => (activeTopic ? legalResources.filter((r) => r.topics.includes(activeTopic.name as RightsTopic)) : legalResources),
    [activeTopic],
  );

  const setTopic = (slug: string | null) => {
    if (slug) setParams({ topic: slug });
    else setParams({});
  };

  return (
    <DigiHubShell
      eyebrow="DigiHub · Knowledge Library"
      title="Your Rights in Ghana"
      description="Ghana's digital rights laws and policies explained in plain language. Understand what protects you, what it means day to day, and what you can do when something goes wrong."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-10 md:py-14 space-y-10">
        {/* Search + problem navigator */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
          <div className="rounded-3xl border p-5 md:p-6 shadow-sm tint-purple bg-card">
            <label htmlFor="rights-search" className="text-sm font-semibold text-card-foreground flex items-center gap-2 mb-3">
              <Search size={16} className="text-primary" /> Search the library
            </label>
            <Input
              id="rights-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “privacy”, “SIM registration”, “consent”, “harassment”…"
              className="rounded-full bg-background"
            />
            {query.trim() && (
              <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-background overflow-hidden">
                {hits.length === 0 && <li className="p-3 text-sm text-muted-foreground">No results yet. Try a simpler word.</li>}
                {hits.map((h) => (
                  <li key={h.to + h.title}>
                    <Link to={h.to} className="flex items-center gap-3 p-3 hover:bg-secondary transition-colors">
                      {h.kind === "topic" ? <BookOpen size={15} className="text-primary shrink-0" /> : h.kind === "resource" ? <Scale size={15} className="text-primary shrink-0" /> : <FileText size={15} className="text-primary shrink-0" />}
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-foreground truncate">{h.title}</span>
                        <span className="block text-xs text-muted-foreground">{h.subtitle}</span>
                      </span>
                      <ArrowRight size={14} className="text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-3xl border p-5 md:p-6 shadow-sm tint-pink bg-card flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <LifeBuoy size={18} className="text-brand-magenta" />
              <h2 className="text-lg font-semibold text-card-foreground">I have a problem</h2>
            </div>
            <p className="text-sm text-muted-foreground flex-1">
              Not sure which law applies? Start with what happened and we will point you to the rights, safety steps and support pathways that fit.
            </p>
            <Button className="rounded-full mt-4 w-fit bg-brand-magenta text-white hover:bg-brand-magenta/90" asChild>
              <Link to="/digihub/your-rights/help">Get guidance <ArrowRight size={15} /></Link>
            </Button>
          </div>
        </div>

        {/* Topics */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Browse by topic</h2>
              <p className="text-sm text-muted-foreground mt-1">Pick an area of life online to see the laws and protections that apply.</p>
            </div>
            {activeTopic && (
              <button onClick={() => setTopic(null)} className="text-sm font-medium text-primary hover:underline">
                Clear filter
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {rightsTopics.map((t) => {
              const active = t.slug === topicSlug;
              return (
                <button
                  key={t.slug}
                  onClick={() => setTopic(active ? null : t.slug)}
                  aria-pressed={active}
                  className={`text-left rounded-2xl border p-4 transition-all bg-card hover:shadow-md ${active ? "border-primary ring-2 ring-primary/30 shadow-md" : "border-border"}`}
                >
                  <span className={`inline-grid place-items-center h-8 w-8 rounded-lg mb-2 ${t.tone}`}>
                    <BookOpen size={15} />
                  </span>
                  <p className="text-sm font-semibold text-card-foreground leading-snug">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.blurb}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
            {activeTopic ? `Laws & policies on ${activeTopic.name}` : "Laws & policies"}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {resources.length} resource{resources.length === 1 ? "" : "s"} · Ghana
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((r) => (
              <Link
                key={r.slug}
                to={`/digihub/your-rights/${r.slug}`}
                className={`group rounded-3xl border p-5 md:p-6 bg-card shadow-sm hover:shadow-lg transition-all ${docTone[r.documentType] ?? "tint-purple"}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="rounded-full">{r.documentType}</Badge>
                  <Badge variant="outline" className="rounded-full">{r.country}</Badge>
                  {r.sourceUrl ? (
                    <Badge variant="outline" className="rounded-full border-brand-teal/50 text-brand-teal">Source verified</Badge>
                  ) : (
                    <Badge variant="outline" className="rounded-full text-muted-foreground">Source pending</Badge>
                  )}
                </div>
                <h3 className="font-semibold text-card-foreground text-lg leading-snug group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{r.description}</p>
                <p className="text-xs text-muted-foreground mt-3">{r.topicLine}</p>
                <p className="text-xs font-medium text-primary mt-4 inline-flex items-center gap-1">
                  {r.provisions.length} key provision{r.provisions.length === 1 ? "" : "s"} explained <ArrowRight size={13} />
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-4 items-start">
          <div className="rounded-3xl border border-border bg-secondary p-5 md:p-6 flex gap-3">
            <Info size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Educational information, not legal advice.</strong> DigiHub explains laws in plain language to help you understand your rights. Official wording is only shown once it has been verified against an authoritative source. For decisions about your specific situation, speak to a qualified legal professional or a trusted human-rights organisation.
            </p>
          </div>
          <div id="ask-orenta">
            <AskOrenta compact />
          </div>
        </div>
      </div>
    </DigiHubShell>
  );
};

export default YourRights;
