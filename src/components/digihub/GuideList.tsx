import { useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Guide } from "@/data/digihub";

interface Props {
  title: string;
  description: string;
  items: Guide[];
}

const GuideList = ({ title, description, items }: Props) => {
  const [open, setOpen] = useState<string | null>(items[0]?.slug ?? null);

  return (
    <DigiHubShell title={title} description={description}>
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-12 md:py-16 space-y-4">
        {items.map((g) => {
          const isOpen = open === g.slug;
          return (
            <article key={g.slug} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : g.slug)}
                aria-expanded={isOpen}
                className="w-full flex items-start gap-3 p-5 text-left"
              >
                <span className="flex-1">
                  <span className="block font-semibold text-card-foreground">{g.title}</span>
                  <span className="block text-sm text-muted-foreground mt-1">{g.summary}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                    <Clock size={12} /> {g.minutes} min
                  </span>
                </span>
                <ChevronDown size={18} className={`text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <ol className="px-5 pb-6 space-y-2.5 list-decimal list-inside">
                  {g.steps.map((s) => (
                    <li key={s} className="text-sm text-muted-foreground leading-relaxed">{s}</li>
                  ))}
                </ol>
              )}
            </article>
          );
        })}
        <p className="text-xs text-muted-foreground pt-4">
          More articles will be published here and managed through the Intelligence Dashboard.
        </p>
      </div>
    </DigiHubShell>
  );
};

export default GuideList;
