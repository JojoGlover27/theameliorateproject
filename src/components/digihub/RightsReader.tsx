import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  Landmark,
  Lightbulb,
  ListChecks,
  ListTree,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  Clock,
} from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { legalResources, LegalResource, Provision, SOURCE_PLACEHOLDER } from "@/data/digihub-rights";

interface Page {
  resource: LegalResource;
  provision: Provision;
}

const gold = "text-[#F5A524]";

const RightsReader = () => {
  const pages = useMemo<Page[]>(
    () => legalResources.flatMap((resource) => resource.provisions.map((provision) => ({ resource, provision }))),
    [],
  );

  const [index, setIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const { resource, provision } = pages[index];
  const verified = Boolean(provision.sourceText);
  const related = provision.related
    .map((slug) => legalResources.find((r) => r.slug === slug))
    .filter((r): r is LegalResource => Boolean(r));

  const goTo = (i: number) => {
    setIndex(i);
    setDrawerOpen(false);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toc = (onPick: (i: number) => void) => (
    <nav aria-label="Table of contents" className="space-y-4">
      {legalResources.map((r) => (
        <div key={r.slug}>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 px-2">
            {r.shortTitle}
          </p>
          <ul className="space-y-0.5">
            {r.provisions.map((p) => {
              const i = pages.findIndex((x) => x.provision.slug === p.slug && x.resource.slug === r.slug);
              const active = i === index;
              return (
                <li key={p.slug}>
                  <button
                    onClick={() => onPick(i)}
                    className={`w-full text-left rounded-lg px-2 py-1.5 text-[13px] leading-snug transition-colors ${
                      active
                        ? "bg-gradient-to-r from-[#8B5CF6]/25 to-[#3B82F6]/25 text-white font-medium"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-wider opacity-60">{p.label}</span>
                    {p.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div
      ref={topRef}
      className="relative rounded-3xl border border-white/10 bg-[#070b1c]/95 shadow-2xl overflow-hidden scroll-mt-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 8% 0%, hsl(275 72% 40% / 0.35), transparent 55%), radial-gradient(circle at 95% 100%, hsl(200 85% 40% / 0.28), transparent 55%)",
        }}
      />
      <div className="relative">
        {/* Reader header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 md:px-7 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white shrink-0 shadow-lg shadow-[#8B5CF6]/30">
              <BookOpen size={19} />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg md:text-xl font-semibold text-white leading-tight">The Rights Reader</h2>
              <p className="text-xs text-slate-400 truncate">
                Ghana's digital-rights laws, page by page, in plain language.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 rounded-full border border-white/10 bg-white/5 px-3 py-1 hidden sm:inline-block">
              Page {index + 1} of {pages.length}
            </span>
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors">
                  <ListTree size={14} /> Contents
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] bg-[#0a1024] border-white/10 text-slate-200 p-0">
                <SheetHeader className="px-4 pt-5 pb-3 border-b border-white/10">
                  <SheetTitle className="text-white text-left flex items-center gap-2">
                    <BookOpen size={16} className={gold} /> Rights Reader — Contents
                  </SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto max-h-[calc(100vh-70px)] px-3 py-4">{toc(goTo)}</div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr]">
          {/* Sidebar TOC (desktop) */}
          <aside className="hidden lg:block border-r border-white/10 px-3 py-5 max-h-[720px] overflow-y-auto">
            {toc(goTo)}
          </aside>

          {/* Page body */}
          <div className="px-5 md:px-8 py-6 md:py-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5A524]">
                {resource.shortTitle}
              </span>
              {verified ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5">
                  <BadgeCheck size={12} /> Verified official wording
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5">
                  <Clock size={12} /> Official wording pending verification
                </span>
              )}
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight mb-1.5">
              <span className="text-[#8B5CF6]">{provision.label}.</span> {provision.title}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {resource.country} · {resource.documentType}
              {resource.version ? ` · ${resource.version}` : ""}
              {resource.lastVerified ? ` · Source checked ${resource.lastVerified}` : ""}
            </p>

            {/* Official wording */}
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 mb-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <Landmark size={14} className={gold} /> Official wording
              </p>
              {provision.sourceText ? (
                <blockquote className="text-sm md:text-[15px] text-slate-100 leading-relaxed italic border-l-2 border-[#F5A524] pl-4">
                  {provision.sourceText}
                </blockquote>
              ) : (
                <p className="text-sm text-slate-400 inline-flex items-start gap-2">
                  <Info size={15} className="shrink-0 mt-0.5 text-amber-300" /> {SOURCE_PLACEHOLDER}
                </p>
              )}
            </section>

            {/* Explains */}
            <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#8B5CF6]/15 to-transparent p-4 md:p-5 mb-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                <Lightbulb size={14} className="text-[#8B5CF6]" /> DigiHub explains
              </p>
              <p className="text-sm md:text-[15px] text-slate-200 leading-relaxed">{provision.explains}</p>
            </section>

            {/* Why it matters */}
            <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#F5A524]/10 to-transparent p-4 md:p-5 mb-4">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                <Sparkles size={14} className={gold} /> Why this matters to you
              </p>
              <p className="text-sm md:text-[15px] text-slate-200 leading-relaxed">{provision.whyItMatters}</p>
            </section>

            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
                  <ShieldCheck size={14} className="text-emerald-400" /> What it protects
                </p>
                <ul className="space-y-1.5">
                  {provision.protects.map((x) => (
                    <li key={x} className="text-sm text-slate-300 flex gap-2">
                      <span className="text-emerald-400">•</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
                  <ListChecks size={14} className="text-[#EC4899]" /> What you can do
                </p>
                <ol className="space-y-1.5 list-decimal list-inside">
                  {provision.actions.map((x) => (
                    <li key={x} className="text-sm text-slate-300">
                      {x}
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            {/* Related laws + official source */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {related.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => goTo(pages.findIndex((x) => x.resource.slug === r.slug))}
                  className="text-xs font-medium text-slate-200 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10 transition-colors"
                >
                  Related: {r.shortTitle}
                </button>
              ))}
              {resource.sourceUrl && (
                <a
                  href={resource.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white rounded-full bg-[#3B82F6] px-3.5 py-1.5 hover:opacity-90 transition-opacity"
                >
                  View official source <ExternalLink size={11} />
                </a>
              )}
              <Link
                to={`/digihub/your-rights/${resource.slug}/${provision.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5A524] hover:underline"
              >
                Open full page <ArrowRight size={12} />
              </Link>
            </div>

            {/* Prev / Next */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => goTo(Math.max(0, index - 1))}
                disabled={index === 0}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <span className="text-[11px] text-slate-500 text-center hidden sm:block">
                Educational explanation, not legal advice.
              </span>
              <button
                onClick={() => goTo(Math.min(pages.length - 1, index + 1))}
                disabled={index === pages.length - 1}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#8B5CF6]/25 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 md:px-7 py-3.5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] text-slate-500">
            Official wording is quoted from verified public sources. Explanations are DigiHub's own plain-language summaries.
          </p>
          <Link
            to="/digihub/your-rights"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
          >
            Browse the full library <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RightsReader;
