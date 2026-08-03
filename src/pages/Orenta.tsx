import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnovationPageHero from "@/components/InnovationPageHero";
import SupportOurWork from "@/components/SupportOurWork";
import NewsletterSection from "@/components/NewsletterSection";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { BookOpen, Scale, Search, ShieldOff, MessageCircle, Sparkles } from "lucide-react";
import orentaLogo from "@/assets/orenta-logo.jpg.asset.json";

const accent = "hsl(var(--primary))";

const features = [
  {
    icon: BookOpen,
    title: "Trusted health knowledge",
    body:
      "Plain-language answers on HIV prevention, testing, treatment, sexual health and mental wellness, grounded in current clinical guidance rather than rumour.",
  },
  {
    icon: Scale,
    title: "Human rights literacy",
    body:
      "Guidance on your rights, what to do after discrimination or violence, and how to reach community organisations that can support you safely.",
  },
  {
    icon: Search,
    title: "Research intelligence",
    body:
      "Summaries of the evidence behind our programmes, so community members, partners and funders can see what works and why.",
  },
  {
    icon: ShieldOff,
    title: "No profiling",
    body:
      "Orenta does not require your identity, does not build a profile of you and is designed so that conversations cannot be traced back to a person.",
  },
  {
    icon: MessageCircle,
    title: "Judgement-free by design",
    body:
      "You can ask the questions you cannot safely ask a clinic receptionist, a family member or a search engine you share with others.",
  },
  {
    icon: Sparkles,
    title: "Evidence-aware, not absolute",
    body:
      "Orenta signals uncertainty and points to human support. It informs decisions, it never replaces a clinician.",
  },
];

const Orenta = () => (
  <div className="min-h-screen">
    <Navbar />
    <InnovationPageHero
      emoji="💜"
      name="Orenta"
      tagline="Evidence-aware AI companion"
      accent={accent}
      logo={orentaLogo.url}
      description="Orenta is a privacy-respecting AI companion built for people who need reliable answers about health, rights and services but cannot risk asking openly. It combines trusted health knowledge, human rights guidance and research intelligence in language anyone can act on."
      cta={{ label: "Try the Orenta prototype", href: "https://orenta-ai-prototype.lovable.app" }}
    />

    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">What Orenta does</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Misinformation and fear keep people away from care as effectively as distance does. Orenta closes the
              knowledge gap without ever asking who you are.
            </p>
          </div>
        </AnimatedSection>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <f.icon className="mb-3 h-6 w-6" style={{ color: accent }} />
              <h3 className="font-semibold text-lg text-card-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    <SupportOurWork />
    <NewsletterSection />
    <Footer />
  </div>
);

export default Orenta;
