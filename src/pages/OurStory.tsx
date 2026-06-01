import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";

const paragraphs = [
  "The Ameliorate Project was born from a question that wouldn't go away: what happens to people who need healthcare but cannot safely seek it?",
  "In Ghana, the answer is quietly devastating. Hundreds of LGBTQI+ individuals and other key populations are living with HIV, or at risk of it, while staying deliberately invisible to health systems that were never designed to protect them. They are not unreachable. They are hiding. From discrimination. From exposure. From a country that has spent the last several years debating whether their lives are worth protecting at all.",
  "Ghana's Anti-LGBTQI+ Bill has not simply created a legal threat, it has created a climate. Long before any signature, the public discourse around the bill unleashed something that no health campaign can easily counter: open, legitimised hostility. Religious leaders have taken to national television to demand the bill's passage. Lawmakers have issued public threats. And perhaps most damaging of all, the very people communities should be able to trust with their health have turned against them.",
  "Nurses and healthcare workers have appeared on national television, not to reassure LGBTQI+ patients, but to accuse them. Transgender people in particular have been singled out and blamed, on prime time, by name of group, for HIV prevalence in Ghana. These are not fringe voices. These are people in clinical uniforms, speaking from positions of authority, telling a vulnerable population that the healthcare system sees them not as patients deserving care, but as a problem to be condemned.",
  "The effect on health-seeking behaviour has been immediate and measurable. People who were already afraid to be seen at a facility, afraid of a neighbour, a family member, a coworker, are now afraid of the nurses inside it. They have watched healthcare workers perform cruelty on a public stage and drawn the only rational conclusion: the clinic is not safe for people like me.",
  "This is the environment in which The Ameliorate Project was founded. Not in spite of it, because of it.",
  "Our founder, a trans woman and community health advocate operating anonymously in Ghana, understood this not as a statistic but as a lived reality. She had watched her community contract, watched people she knew go silent, watched those who needed ART most retreat furthest from the system designed to provide it. In 2025, she began building what didn't exist: an organisation designed from the ground up around the people most likely to be turned away, exposed, or endangered by conventional healthcare.",
  "The Ameliorate Project was registered, resourced entirely through personal funds, and grounded in community evidence before a single grant was sought. Because we believed the community deserved to be heard before being served.",
  "When politicians threaten from pulpits and nurses accuse from studios, the answer cannot only be advocacy. Sometimes the answer is infrastructure. A way for people to get what they need, quietly, safely, without being seen, while the world figures out whether it is willing to protect them.",
  "That is what we are building.",
];

const OurStory = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <AnimatedSection>
          <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold">Our Story</p>
          <h1 className="text-3xl md:text-5xl text-foreground mb-10 leading-tight">
            Built for the people the system was never built for.
          </h1>
        </AnimatedSection>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          {paragraphs.map((p, i) => (
            <AnimatedSection key={i}>
              <p>{p}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default OurStory;
