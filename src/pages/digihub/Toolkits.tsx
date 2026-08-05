import { FileText } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Button } from "@/components/ui/button";
import { toolkits } from "@/data/digihub";

const Toolkits = () => (
  <DigiHubShell
    title="Digital Safety Toolkit"
    description="Printable, offline-friendly downloads, checklists and templates for personal use, clinics and workshops."
  >
    <div className="container mx-auto px-4 md:px-8 max-w-4xl py-12 md:py-16 grid sm:grid-cols-2 gap-4">
      {toolkits.map((t) => (
        <div key={t.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <FileText className="text-primary shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="font-medium text-card-foreground">{t.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.blurb}</p>
            <p className="text-[11px] text-muted-foreground mt-2">{t.format} · {t.size}</p>
          </div>
          <Button size="sm" variant="outline" className="rounded-full" asChild>
            <a href="/#contact">Request</a>
          </Button>
        </div>
      ))}
    </div>
  </DigiHubShell>
);

export default Toolkits;
