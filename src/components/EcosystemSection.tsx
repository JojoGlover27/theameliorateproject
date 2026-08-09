import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import synapseLogo from "@/assets/synapse-logo.png";
import orentaLogo from "@/assets/orenta-logo.png";
import digihubLogo from "@/assets/digihub-logo.png";

type Item = {
  name: string;
  logo: string;
  tagline: string;
  description: string;
  cta: string;
  to?: string;
  href?: string;
};

const items: Item[] = [
  {
    name: "Synapse",
    logo: synapseLogo,
    tagline: "No Judgement. No Exposure. Just Care.",
    description:
      "A privacy-first telemedicine platform providing anonymous HIV prevention, treatment and care through secure digital access. Synapse combines telemedicine, HIV self-testing, PrEP, PEP, ART support, mental wellness, discreet medication delivery and adherence support to remove barriers created by stigma, discrimination and fear.",
    cta: "Explore Synapse",
    to: "/synapse",
  },
  {
    name: "Orenta",
    logo: orentaLogo,
    tagline: "Find Clarity. Navigate Safely.",
    description:
      "A privacy-first evidence-aware AI that helps people understand health, human rights, digital rights, research and public policy through trusted evidence, multiple perspectives and plain-language explanations. Orenta transforms complex information into clear, accessible knowledge people can trust.",
    cta: "Meet Orenta",
    href: "https://orenta-ai-prototype.lovable.app",
  },
  {
    name: "DigiHub",
    logo: digihubLogo,
    tagline: "Learn. Protect. Thrive.",
    description:
      "A privacy-first digital rights and cybersecurity learning platform helping individuals and communities build safer digital lives through practical education, trusted resources, Digital Action Plans, Digital Rights & Safety Clinics, secure technology recommendations and threat awareness.",
    cta: "Visit DigiHub",
    to: "/digihub",
  },
];

const EcosystemSection = () => (
  <section id="ecosystem" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-6xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-foreground mb-4 text-center">Our Innovation Ecosystem</h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center mb-12">
          Access to healthcare, trusted knowledge, digital safety and digital rights are deeply
          connected. The Ameliorate Project is building an integrated ecosystem of privacy-first
          innovations that help people access services safely, learn with confidence, and participate
          in the digital world without fear.
        </p>
      </AnimatedSection>

      <motion.div
        className="grid md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        {items.map((item) => (
          <motion.div
            key={item.name}
            variants={fadeUp}
            className="flex flex-col bg-card border border-border rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow"
          >
            <img src={item.logo} alt={`${item.name} logo`} className={`object-contain mb-5 rounded-xl shadow-md ${item.name === "Synapse" ? "h-16 w-16 md:h-20 md:w-20 bg-black p-2" : "h-14 w-14"}`} loading="lazy" />
            <h3 className="text-2xl font-semibold text-card-foreground mb-1">{item.name}</h3>
            <p className="text-sm font-medium text-primary mb-4">{item.tagline}</p>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.description}</p>
            <Button variant="outline" className="mt-6 self-start rounded-md" asChild>
              {item.to ? (
                <Link to={item.to}>
                  {item.cta} <ArrowRight size={16} className="ml-1" />
                </Link>
              ) : (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.cta} <ArrowRight size={16} className="ml-1" />
                </a>
              )}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default EcosystemSection;
