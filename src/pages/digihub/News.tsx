import DigiHubShell from "@/components/digihub/DigiHubShell";
import { news } from "@/data/digihub";

const News = () => (
  <DigiHubShell
    title="News & Explainers"
    description="Short updates on digital rights, privacy and online safety, written in plain language."
  >
    <div className="container mx-auto px-4 md:px-8 max-w-3xl py-12 md:py-16 space-y-6">
      {news.map((n) => (
        <article key={n.slug} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs text-primary font-semibold uppercase tracking-wider">{n.category} · {n.date}</p>
          <h2 className="text-xl font-semibold text-card-foreground mt-1.5">{n.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{n.summary}</p>
          <div className="mt-4 space-y-3">
            {n.body.map((p) => (
              <p key={p} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  </DigiHubShell>
);

export default News;
