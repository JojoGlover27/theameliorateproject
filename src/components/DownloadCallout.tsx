import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloads } from "@/lib/downloads";

type Props = { resourceId?: string; title?: string; body?: string };

const DownloadCallout = ({
  resourceId = "care-pathways",
  title = "Take this with you",
  body = "Download our plain-language care pathways guide — PEP, PrEP, testing, ART, and how to safely re-engage with care. No email required.",
}: Props) => {
  const d = downloads.find((x) => x.id === resourceId) ?? downloads[0];
  return (
    <aside className="my-10 bg-secondary border border-border rounded-xl p-6 md:p-7 not-prose">
      <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Free download</p>
      <h3 className="text-xl font-semibold text-secondary-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{body}</p>
      <Button asChild>
        <a href={d.url} download={d.filename} target="_blank" rel="noopener noreferrer">
          <Download className="mr-1" /> Download {d.title} (PDF)
        </a>
      </Button>
    </aside>
  );
};

export default DownloadCallout;
