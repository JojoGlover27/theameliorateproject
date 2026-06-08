import { Quote } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

type Testimonial = { quote: string; attribution: string };

const testimonials: Testimonial[] = [
  {
    quote:
      "Thanks for making me feel safe, even online.",
    attribution: "Community member · Needs assessment respondent, 2025",
  },
  {
    quote:
      "Telemedicine is very good. It's the use of a phone, there's no stress, unlike going to the hospital.",
    attribution: "Community member · Needs assessment respondent, 2025",
  },
  {
    quote:
      "Telecare is a great option that all queer people, regardless of status, should explore. It will improve every aspect of health for our community.",
    attribution: "Community member · Needs assessment respondent, 2025",
  },
  {
    quote:
      "It is very discreet. I would recommend it to my queer people and to anyone who would like to use this platform and medication.",
    attribution: "Community member · Needs assessment respondent, 2025",
  },
  {
    quote:
      "I will recommend the platform only if I have used it myself and can attest to its anonymity.",
    attribution: "Community member · Needs assessment respondent, 2025",
  },
  {
    quote:
      "I was looking for PEP for days to just be safe. The only place I could find it was in Kumasi, and I couldn't make the trip. Let's do better and make it available for all.",
    attribution: "Community member · Needs assessment respondent, 2025",
  },
];

const TestimonialsSection = () => (
  <section id="voices" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-5xl">
      <AnimatedSection>
        <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold text-center">
          Community Voices
        </p>
        <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-3 text-center">
          What the community told us
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          Selected, lightly edited responses from our 2025 needs assessment of 253 community members across Ghana. Shared anonymously, with permission, in their own words.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-5">
        {testimonials.map((t, i) => (
          <AnimatedSection key={i}>
            <figure className="h-full bg-card border border-border rounded-xl p-6 md:p-7 shadow-sm flex flex-col">
              <Quote className="text-primary/60 mb-3 shrink-0" size={22} aria-hidden="true" />
              <blockquote className="text-base md:text-lg text-foreground leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-wider text-muted-foreground border-t border-border pt-4">
                {t.attribution}
              </figcaption>
            </figure>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <p className="mt-10 text-sm text-muted-foreground italic text-center max-w-2xl mx-auto">
          Identifying details have been removed. Quotes are lightly edited for clarity and grammar only, never for meaning.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default TestimonialsSection;
