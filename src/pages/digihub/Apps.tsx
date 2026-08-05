import { useState } from "react";
import { ExternalLink, Star, Code2 } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { appCategories, secureApps } from "@/data/digihub";

const Apps = () => {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? secureApps : secureApps.filter((a) => a.category === filter);

  return (
    <DigiHubShell
      title="Secure Apps You Can Trust"
      description="A curated list of privacy-friendly tools, chosen for strong encryption, independent audits and usability on everyday devices."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-12 md:py-16">
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", ...appCategories].map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((a) => (
            <div
              key={a.name}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-primary/10 text-primary font-bold">
                  {a.name[0]}
                </span>
                {a.openSource && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/25">
                    <Code2 size={11} /> Open source
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-card-foreground">{a.name}</h3>
              <p className="text-xs text-primary mb-2">{a.category}</p>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{a.description}</p>
              <p className="text-xs text-muted-foreground mt-4">{a.platforms}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="flex items-center gap-1 text-xs text-brand-gold">
                  <Star size={13} className="fill-current" /> {a.rating.toFixed(1)} privacy rating
                </span>
                <a
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Download <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DigiHubShell>
  );
};

export default Apps;
