import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

import TEAM_PHOTO from "@/assets/20260704_170327.jpg";


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
            Amelio is a small, dedicated team of technologists, health practitioners, researchers and advocates united by one conviction: privacy should never be a privilege. We build privacy-first innovations that remove the barriers standing between people and healthcare, trusted knowledge, digital rights and cybersecurity.
          </p>
          <p>
            We come from different backgrounds. Some of us build software, some work in health and community care,
            some spend their days on research, funding or advocacy. What we share is a simple belief that people
            should be able to get help without being watched, judged or put at risk.
          </p>
          <p>
            We listen first. We design with LGBTQI+ communities, key populations and other marginalized populations in
            Ghana, and we build around what people tell us they actually need, so that everything we make is safe and
            simple to use in real life.
          </p>

        </div>
      </AnimatedSection>

      <AnimatedSection>
        <figure className="mt-12 md:mt-16 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={TEAM_PHOTO}
            alt="Amelio team members collaborating around a shared table, hands and laptops visible."
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
