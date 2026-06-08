import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { downloads } from "@/lib/downloads";
import { Link } from "react-router-dom";

const DownloadCTASection = () => (
  <section id="downloads" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-5xl">
      <AnimatedSection>
        <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold text-center">
          Read offline · Share freely
        </p>
        <h2 className="text-3xl md:text-4xl text-foreground mb-3 text-center">
          Download our briefs &amp; guides
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          No email required. Take what you need, share it with whoever needs it. Anonymity protected.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {downloads.map((d) => (
          <AnimatedSection key={d.id}>
            <div className="h-full bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
              <FileText className="text-primary mb-3" size={24} aria-hidden="true" />
              <h3 className="text-lg font-semibold text-foreground mb-1 leading-snug">{d.title}</h3>
              <p className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-3">{d.audience}</p>
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

      <AnimatedSection>
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="rounded-md">
            <Link to="/resources#downloads">Browse all resources →</Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default DownloadCTASection;
