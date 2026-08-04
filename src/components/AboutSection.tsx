import { AnimatedSection } from "@/components/AnimatedSection";

const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-foreground mb-8">About The Ameliorate Project</h2>
      </AnimatedSection>
      <AnimatedSection>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>
            The Ameliorate Project is a Ghanaian nonprofit building privacy-first innovations that remove barriers to healthcare, trusted knowledge, digital rights and cybersecurity.
          </p>
          <p>
            We believe no one should have to choose between their health, safety, dignity or participation in society.
          </p>
          <p>
            Through our growing innovation ecosystem, we are creating practical digital solutions that protect privacy, expand access to essential services and empower LGBTQI+ communities, key populations and other marginalized populations with the tools they need to live healthier, safer and more informed lives.
          </p>
          <p>Our work is built on one simple belief:</p>
          <p className="font-semibold text-foreground">Privacy should never be a privilege.</p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default AboutSection;
