import { AnimatedSection } from "@/components/AnimatedSection";

const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-foreground mb-8">About Us</h2>
      </AnimatedSection>
      <AnimatedSection>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>
            The Ameliorate Project is a community-led initiative dedicated to removing barriers to essential HIV prevention, treatment, and care for hidden LGBTQI+ individuals in Ghana.
          </p>
          <p>
            We understand the real challenges: stigma, fear of exposure, legal risks, and limited safe access to services. That is why we built a privacy-first, digital ecosystem where your safety and dignity come before anything else.
          </p>
          <p>
            Through our secure telemedicine platform, Synapse, you engage with our team and services anonymously, using only a generated unique ID. The Ameliorate team and Synapse operations never see your name, contact, or location.
          </p>
          <p>
            For services that involve prescribed medication such as ART, PrEP, and PEP, Ghana Health Service regulations require that a clinician records a name and a contact for medication accountability. That information is shared only with your treating clinician, held in strict confidence, and is never disclosed to the Ameliorate team, Synapse operations, or any third party. Everything else, from browsing resources to ordering self-test kits, remains fully anonymous end to end.
          </p>
          <p>
            Founded in Kumasi by passionate advocates and allies from within the community, we exist so that no one has to choose between their health and their safety.
          </p>
          <p className="font-semibold text-foreground">Better, Without Barriers.</p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default AboutSection;
