import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";

const paragraphs: Array<{ type: "p" | "h2"; text: string }> = [
  { type: "p", text: "There is a particular kind of courage that nobody talks about." },
  { type: "p", text: "It is not the courage of marching in the streets or standing at a podium. It is quieter and far more private. It is the courage of deciding, on a Tuesday afternoon, to walk into a health facility and ask for help, knowing that someone you know might see you there, and that being seen could cost you everything." },
  { type: "p", text: "Your job. Your family. In some cases, your freedom." },
  { type: "p", text: "This is the reality for hundreds of LGBTQI+ individuals in Ghana living with HIV or at risk of it. They know treatment exists. They know PrEP could protect them. They know that being on ART and achieving an undetectable viral load means they cannot transmit the virus to anyone else. They know all of this. And they still do not go." },
  { type: "p", text: "Not because they don't care about their health. Because caring about their health requires a visibility that is simply too dangerous." },
  { type: "h2", text: "What Our Community Told Us" },
  { type: "p", text: "In 2025, The Ameliorate Project asked 253 community members across Ghana about their experiences with HIV services. We asked anonymously, because that was the only way to get honest answers." },
  { type: "p", text: "What came back was not surprising to us. But it was important to document, because data has a way of making the invisible legible to people who have never had to hide." },
  { type: "p", text: "85.4% of respondents said that anonymity would make them more likely to access and stay on treatment. Not convenience. Not cost. Anonymity. The simple assurance that no one would know." },
  { type: "p", text: "53.2% said they do not trust existing health systems to keep their HIV status confidential. More than half. In a country with a national HIV response, more than half of the people most at risk do not believe that system will protect them." },
  { type: "p", text: "And 76.8% said they would prefer to access HIV services remotely, by phone or app, rather than attending a facility in person." },
  { type: "p", text: "This is not a healthcare access problem. This is a safety problem masquerading as a healthcare problem." },
  { type: "h2", text: "What We Are Doing About It" },
  { type: "p", text: "The Ameliorate Project exists because the standard solutions, more clinics, more outreach workers, more awareness campaigns, were not built for people who cannot be seen." },
  { type: "p", text: "Synapse is being built for them." },
  { type: "p", text: "It is an anonymous digital health platform. Users connect through generated anonymous IDs, consult with an affirming clinician via telemedicine, and receive ART, PrEP, PEP, and HIV self-testing kits delivered discreetly to a location of their choosing." },
  { type: "p", text: "The technology is not the point. The technology is just what makes the safety possible." },
  { type: "h2", text: "What We Need You to Understand" },
  { type: "p", text: "Ghana has over 330,000 people living with HIV. The national response is real, funded, and staffed. And yet the populations most at risk — MSM with a prevalence of 18.1%, transgender women with a prevalence of up to 28.1% — remain the least served." },
  { type: "p", text: "This is not a gap that more funding to the same systems will close. It requires a different approach. One that starts not with the clinic, but with the question: what would make you feel safe enough to seek care?" },
  { type: "p", text: "We asked. Our community answered. And we are building accordingly." },
  { type: "p", text: "If you believe healthcare is a right, not a risk, we invite you to support this work. Visit ameliorateproject.org to learn more, donate, or get in touch." },
  { type: "p", text: "Anonymously, of course." },
];

const BlogPost = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-28 md:pt-36 pb-16 md:pb-24">
      <article className="container mx-auto px-4 md:px-8 max-w-3xl">
        <AnimatedSection>
          <Link to="/blog" className="text-sm text-primary hover:underline mb-6 inline-block">← Back to Blog</Link>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground mb-4">
            <span className="text-primary font-semibold">Community Health</span>
            <span>•</span>
            <span>May 2026</span>
            <span>•</span>
            <span>4 min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl text-foreground mb-10 leading-tight">
            The Clinic Was Never the Problem. Being Seen Was.
          </h1>
        </AnimatedSection>

        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          {paragraphs.map((b, i) =>
            b.type === "h2" ? (
              <AnimatedSection key={i}>
                <h2 className="text-2xl md:text-3xl text-foreground mt-10 mb-2">{b.text}</h2>
              </AnimatedSection>
            ) : (
              <AnimatedSection key={i}>
                <p>{b.text}</p>
              </AnimatedSection>
            )
          )}
          <AnimatedSection>
            <p className="italic border-l-4 border-primary/60 pl-4 mt-8 text-base">
              The Ameliorate Project is a Ghana-based NGO dedicated to improving HIV healthcare access for LGBTQI+ individuals and key populations through community evidence, digital innovation, and radical empathy.
            </p>
          </AnimatedSection>
        </div>
      </article>
    </main>
    <Footer />
  </div>
);

export default BlogPost;
