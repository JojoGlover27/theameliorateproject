import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { downloads } from "@/lib/downloads";
import PdfIcon from "@/components/PdfIcon";

const DownloadCTASection = () => (
  <section id="downloads" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-5xl">
      <AnimatedSection>
        <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold text-center">
          Read offline, share freely
        </p>
        <h2 className="text-3xl md:text-4xl text-foreground mb-3 text-center">
          Download our briefs &amp; guides
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          No email required. Take what you need, share it with whoever needs it. Anonymity protected.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-5">
        {downloads.map((d) => (
          <AnimatedSection key={d.id}>
            <div className="h-full bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
              <PdfIcon className="w-10 h-12 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{d.description}</p>
              <Button asChild size="sm" className="mt-5 w-full">
                <a href={d.url} download={d.filename} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-1" /> Download PDF
                </a>
              </Button>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default DownloadCTASection;
