import { AnimatedSection } from "@/components/AnimatedSection";

const ResourcesSection = () => (
  <section id="resources" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-6">Resources & Information</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          We provide clear, affirming, and practical information to help you stay informed and empowered.
        </p>
      </AnimatedSection>

      <div className="space-y-8">
        <AnimatedSection>
          <h3 className="text-xl font-semibold text-secondary-foreground mb-3 font-sans">HIV & Prevention Basics</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>What is PrEP and how does it work?</li>
            <li>PEP: What to do after potential exposure</li>
            <li>Understanding ART and viral suppression</li>
            <li>Common myths about HIV in our community</li>
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-xl font-semibold text-secondary-foreground mb-3 font-sans">Testing & Results Guidance</h3>
          <p className="text-muted-foreground">
            Step-by-step support for self-testing, reading results, and next steps (negative, positive, or invalid).
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-xl font-semibold text-secondary-foreground mb-3 font-sans">Mental Health & Wellbeing</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Coping with stigma and disclosure fears</li>
            <li>Self-care tips for resilience</li>
            <li>Anonymous emotional support options</li>
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-xl font-semibold text-secondary-foreground mb-3 font-sans">Know Your Options in Ghana</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Current national HIV guidelines (simplified)</li>
            <li>Safe navigation tips in challenging environments</li>
            <li>Nutrition & healthy living while on medication</li>
          </ul>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-xl font-semibold text-secondary-foreground mb-3 font-sans">Downloadable Materials</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Infographics on PrEP/PEP timelines</li>
            <li>Adherence reminder templates</li>
            <li>Privacy & safety checklist</li>
          </ul>
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <p className="mt-8 text-muted-foreground italic">
          All content is written by and for the community — straightforward, non-judgmental, and focused on what actually helps.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ResourcesSection;
