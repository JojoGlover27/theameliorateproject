import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResearchLayout from "@/components/research/ResearchLayout";
import NewsletterForm from "@/components/NewsletterForm";

type Pub = {
  slug: string;
  category: "Research Reports" | "Working Papers";
  tag: string;
  title: string;
  detail: string;
  summary: string;
};

const publications: Pub[] = [
  {
    slug: "access-safety-anonymity-ghana",
    category: "Research Reports",
    tag: "RESEARCH REPORT",
    title: "Access, Safety, and Anonymity in HIV & Sexual Health Services for Queer People in Ghana",
    detail: "The Ameliorate Project · Kumasi, Ghana · 2025–2026 · n = 253",
    summary:
      "A nationwide community needs assessment documenting the barriers LGBTQI+ people and other key populations face when seeking HIV and sexual health services in Ghana, and the case for anonymity as a clinical precondition.",
  },
  {
    slug: "anonymity-clinical-necessity",
    category: "Working Papers",
    tag: "WORKING PAPER",
    title: "Why Anonymity is a Clinical Necessity: Evidence from a Nationwide Community Health Needs Assessment in Ghana",
    detail: "The Ameliorate Project · Kumasi, Ghana · June 2026 · Submitted to Health and Human Rights Journal",
    summary:
      "A working paper arguing that in restrictive legal environments, anonymity is not a privacy preference but a clinical precondition for HIV testing, prevention, and treatment.",
  },
];

const TABS: { label: string; active: boolean }[] = [
  { label: "All", active: true },
  { label: "Working Papers", active: true },
  { label: "Research Reports", active: true },
  { label: "Policy Briefs", active: false },
  { label: "Journal Articles", active: false },
  { label: "Opinion & Commentary", active: false },
  { label: "Conference Presentations", active: false },
  { label: "Annual Reports", active: false },
];

const Research = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = publications.filter((p) => activeTab === "All" || p.category === activeTab);

  return (
    <ResearchLayout>
      <Helmet>
        <title>Research & Publications — The Ameliorate Project</title>
        <meta
          name="description"
          content="Evidence-based research, policy analysis, and community-led publications on HIV, digital health, LGBTQI+ rights, and equitable healthcare access from The Ameliorate Project."
        />
        <link rel="canonical" href="https://theameliorateproject.lovable.app/research" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-28 pb-20">
        <section className="container mx-auto px-4 md:px-8 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "var(--r-gold)" }}>
            The Ameliorate Project
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6" style={{ color: "var(--r-purple)" }}>
            Research &amp; Publications
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            The Ameliorate Project produces evidence-based research, policy analysis, and community-led publications on HIV, digital health, LGBTQI+ rights, and equitable healthcare access. Our research informs advocacy, innovation, and policy development across Ghana and beyond.
          </p>

          {/* Tabs */}
          <TooltipProvider delayDuration={100}>
            <div className="mt-10 flex flex-wrap gap-2">
              {TABS.map((t) => {
                const isSelected = activeTab === t.label;
                if (!t.active) {
                  return (
                    <Tooltip key={t.label}>
                      <TooltipTrigger asChild>
                        <button
                          disabled
                          className="px-4 py-2 rounded-full text-sm font-medium border border-border text-muted-foreground/60 bg-muted/40 cursor-not-allowed"
                        >
                          {t.label}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Coming Soon</TooltipContent>
                    </Tooltip>
                  );
                }
                return (
                  <button
                    key={t.label}
                    onClick={() => setActiveTab(t.label)}
                    className="px-4 py-2 rounded-full text-sm font-medium border transition"
                    style={{
                      background: isSelected ? "var(--r-purple)" : "transparent",
                      color: isSelected ? "white" : "var(--r-purple)",
                      borderColor: "var(--r-purple)",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </TooltipProvider>

          {/* Publications list */}
          <div className="mt-12 grid gap-6">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to={`/research/${p.slug}`}
                className="block group rounded-2xl border border-border bg-card p-6 md:p-8 hover:shadow-lg transition"
              >
                <p
                  className="text-xs font-bold tracking-widest mb-2"
                  style={{ color: "var(--r-gold)" }}
                >
                  {p.tag}
                </p>
                <h2
                  className="text-xl md:text-2xl font-serif mb-2 group-hover:underline"
                  style={{ color: "var(--r-purple)" }}
                >
                  {p.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-3">{p.detail}</p>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{p.summary}</p>
                <span className="inline-block mt-4 text-sm font-medium" style={{ color: "var(--r-blue)" }}>
                  Read publication →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-2xl p-6 md:p-8" style={{ background: "#3C14A0" }}>
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-3">Stay updated on new publications</h2>
            <p className="text-white/85 mb-5 max-w-2xl">
              Subscribe to our newsletter to be notified when new research from The Ameliorate Project is available.
            </p>
            <div className="max-w-md">
              <NewsletterForm source="research" variant="inline" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </ResearchLayout>
  );
};

export default Research;
