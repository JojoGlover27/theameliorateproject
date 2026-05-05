import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

const CTASection = () => (
  <section className="py-16 md:py-24" style={{ background: "var(--hero-gradient)" }}>
    <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-foreground mb-4">
          Your Identity Is Protected. Your Health Shouldn't Wait.
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Whether you need PrEP, PEP, ART, testing kits, or just someone to talk to — Synapse connects you to care without ever revealing who you are. Take the first step today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-md text-base px-8" asChild>
            <a href="https://synapse-prototype.lovable.app/" target="_blank" rel="noopener noreferrer">Access Synapse</a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-md text-base px-8" asChild>
            <a href="#donate">Support Our Work</a>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default CTASection;
