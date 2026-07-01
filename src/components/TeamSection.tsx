import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

// Unsplash photo chosen so faces are naturally not visible (hands / silhouettes / back-turned).
// Photo by "Hannah Busing" on Unsplash — hands together, no identifiable faces.
const TEAM_PHOTO =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=70";

const TeamSection = () => (
  <section id="team" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-5xl">
      <AnimatedSection>
        <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold text-center">
          Our Team
        </p>
        <h2 className="text-3xl md:text-5xl text-foreground mb-6 text-center font-serif">
          The People Behind the Mission
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          <p>
            Amelio is a small, dedicated team of professionals united by a shared conviction: that everyone deserves access to healthcare, safety, and dignity, without exception. We bring together expertise across community health, clinical care, digital infrastructure, finance, and advocacy, working across Ghana to build systems that centre the people most often left out.
          </p>
          <p>
            We are practitioners, not just advocates. Our work is grounded in community relationships, evidence, and a deep understanding of the realities facing the populations we serve.
          </p>
          <p>
            Together, we collaborate to create lasting impact, advance equality, and empower the communities we serve.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <figure className="mt-12 md:mt-16 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={TEAM_PHOTO}
            alt="Hands of community members joined together, symbolising Amelio's team and the communities we serve."
            loading="lazy"
            decoding="async"
            className="w-full h-[280px] md:h-[460px] object-cover"
          />
        </figure>
      </AnimatedSection>

      <AnimatedSection>
        <div className="mt-10 md:mt-12 max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            We are always looking to grow our network of committed professionals and volunteers. If you share our values and want to contribute to this work, we would love to hear from you.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/get-involved">Get Involved</Link>
          </Button>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default TeamSection;
