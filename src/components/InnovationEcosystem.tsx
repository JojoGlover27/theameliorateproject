import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import synapseLogo from "@/assets/synapse-logo.png.asset.json";
import orentaLogo from "@/assets/orenta-logo.jpg.asset.json";
import digihubLogo from "@/assets/digihub-logo.png.asset.json";

export const innovations = [
  {
    id: "synapse",
    emoji: "❤️",
    name: "Synapse",
    tagline: "Anonymous healthcare access",
    logo: synapseLogo.url,
    href: "/synapse",
    ring: "hsl(var(--destructive))",
    summary:
      "An offline-first telemedicine platform delivering anonymous HIV prevention and care, PrEP, PEP, ART, self-testing, mental wellness and discreet delivery, without exposure.",
    points: ["Works offline", "No identity required to start", "Free at every phase"],
  },
  {
    id: "orenta",
    emoji: "💜",
    name: "Orenta",
    tagline: "Evidence-aware AI companion",
    logo: orentaLogo.url,
    href: "/orenta",
    ring: "hsl(var(--primary))",
    summary:
      "A privacy-respecting AI companion offering trusted health knowledge, human rights guidance and research intelligence in plain, judgement-free language.",
    points: ["Evidence-aware answers", "Rights and legal literacy", "No profiling"],
  },
  {
    id: "digihub",
    emoji: "💙",
    name: "DigiHub",
    tagline: "Digital safety academy",
    logo: digihubLogo.url,
    href: "/digihub",
    ring: "hsl(var(--brand-blue))",
    summary:
      "A cybersecurity and digital rights academy teaching device safety, secure communication, threat awareness and protection skills for people most at risk online.",
    points: ["Practical safety training", "Digital Rights & Safety Clinics", "Free learning resources"],
  },
];

const InnovationEcosystem = () => (
  <section id="innovations" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8">
      <AnimatedSection>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Our Innovation Ecosystem</p>
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">Three innovations, one commitment to privacy</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Access to care, access to knowledge and protection from harm are inseparable. Each innovation solves one of
            those barriers, and together they form a single protective ecosystem.
          </p>
        </div>
      </AnimatedSection>

      <motion.div
        className="grid md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        {innovations.map((n) => (
          <motion.div key={n.id} variants={fadeUp}>
            <Link
              to={n.href}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ boxShadow: undefined }}
            >
              <div
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 ring-1"
                style={{ borderColor: n.ring, ["--tw-ring-color" as string]: n.ring }}
              >
                <img src={n.logo} alt={`${n.name} logo`} loading="lazy" className="h-12 w-12 rounded-xl object-contain" />
              </div>
              <h3 className="text-2xl font-serif text-card-foreground mb-1">
                <span className="mr-1.5">{n.emoji}</span>
                {n.name}
              </h3>
              <p className="text-sm font-medium mb-3" style={{ color: n.ring }}>
                {n.tagline}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{n.summary}</p>
              <ul className="space-y-1.5 mb-6">
                {n.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: n.ring }} />
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default InnovationEcosystem;
