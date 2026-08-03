import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

type Props = {
  emoji: string;
  name: string;
  tagline: string;
  accent: string;
  logo: string;
  description: string;
  cta?: { label: string; href: string };
};

const InnovationPageHero = ({ emoji, name, tagline, accent, logo, description, cta }: Props) => (
  <section className="relative pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mb-6 flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background/70 ring-1"
            style={{ ["--tw-ring-color" as string]: accent }}
          >
            <img src={logo} alt={`${name} logo`} className="h-12 w-12 rounded-xl object-contain" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl leading-tight text-foreground">
              <span className="mr-2">{emoji}</span>
              {name}
            </h1>
            <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: accent }}>
              {tagline}
            </p>
          </div>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{description}</p>
        {cta && (
          <Button size="lg" className="mt-8 rounded-full px-7" asChild>
            <a href={cta.href} target="_blank" rel="noopener noreferrer">
              {cta.label}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </motion.div>
    </div>
  </section>
);

export default InnovationPageHero;
