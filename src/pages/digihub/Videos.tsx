import { useState } from "react";
import { PlayCircle, X } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { videos, Category } from "@/data/digihub";

const categories: (Category | "All")[] = [
  "All",
  "Privacy",
  "Cybersecurity",
  "Digital Rights",
  "Scam Awareness",
  "Social Media Safety",
];

const Videos = () => {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [open, setOpen] = useState<string | null>(null);
  const shown = filter === "All" ? videos : videos.filter((v) => v.category === filter);

  return (
    <DigiHubShell
      title="Video Library & Tutorials"
      description="Short, practical walkthroughs you can follow on any device. Tap a thumbnail to watch without leaving DigiHub."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-12 md:py-16">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                filter === c
                  ? "bg-gradient-to-r from-primary to-brand-blue text-primary-foreground border-transparent shadow-md"
                  : "bg-card text-muted-foreground border-border hover:text-primary hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((v) => (
            <button
              key={v.id}
              onClick={() => setOpen(v.id)}
              className="text-left rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-brand-magenta/5 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-0.5"
            >

              <div className="relative aspect-video bg-secondary">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 grid place-items-center bg-black/25">
                  <PlayCircle className="text-white" size={46} />
                </span>
                <span className="absolute bottom-2 right-2 text-[11px] bg-black/75 text-white px-1.5 py-0.5 rounded">
                  {v.duration}
                </span>
              </div>
              <div className="p-5">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {v.category}
                </span>
                <h3 className="font-semibold text-card-foreground mt-2 leading-snug">{v.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{v.blurb}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(null)}
              aria-label="Close video"
              className="mb-3 ml-auto flex items-center gap-1 text-sm text-white/80 hover:text-white"
            >
              Close <X size={16} />
            </button>
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/15">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${open}?autoplay=1`}
                title="DigiHub video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </DigiHubShell>
  );
};

export default Videos;
