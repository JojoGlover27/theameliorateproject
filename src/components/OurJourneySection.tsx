import { motion } from "framer-motion";
import { Ear, Microscope, Smartphone, Bot, ShieldCheck } from "lucide-react";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";

const milestones = [
  {
    icon: Ear,
    title: "1. We Listened",
    text: "We listened to key and marginalised communities, gathering lived experience from people who could not safely seek care.",
    color: "text-brand-blue",
    ring: "border-brand-blue/60",
    glow: "shadow-[0_0_25px_-6px_hsl(var(--brand-blue)/0.7)]",
  },
  {
    icon: Microscope,
    title: "2. We Researched",
    text: "Our needs assessment mapped the real barriers: stigma, fear of exposure and unsafe access to services.",
    color: "text-emerald-500",
    ring: "border-emerald-500/60",
    glow: "shadow-[0_0_25px_-6px_hsl(160_84%_39%/0.7)]",
  },
  {
    icon: Smartphone,
    title: "3. Synapse Was Built",
    text: "A privacy-first offline app that brings HIV prevention, treatment and care to people right where they are.",
    color: "text-primary",
    ring: "border-primary/60",
    glow: "shadow-[0_0_25px_-6px_hsl(var(--primary)/0.7)]",
  },
  {
    icon: Bot,
    title: "4. Orenta Arrived",
    text: "An evidence-aware AI that turns complex health, rights and policy information into clear guidance anyone can trust.",
    color: "text-brand-gold",
    ring: "border-brand-gold/60",
    glow: "shadow-[0_0_25px_-6px_hsl(var(--brand-gold)/0.7)]",
  },
  {
    icon: ShieldCheck,
    title: "5. DigiHub Launched",
    text: "A digital rights and safety hub where communities learn to protect themselves and thrive online.",
    color: "text-brand-magenta",
    ring: "border-brand-magenta/60",
    glow: "shadow-[0_0_25px_-6px_hsl(var(--brand-magenta)/0.7)]",
  },
];

const OurJourneySection = () => (
  <section className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8">
      <div className="rounded-2xl bg-card tint-purple border border-border p-8 md:p-12 shadow-sm">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl text-card-foreground text-center mb-3">Our Journey</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            One question started it all: how do people get care when clinics are not safe for them?
            This is the journey that followed.
          </p>
        </AnimatedSection>

        <motion.div
          className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div
            aria-hidden
            className="hidden lg:block absolute left-[10%] right-[10%] top-9 border-t-2 border-dotted border-border"
          />
          {milestones.map((m) => (
            <motion.div key={m.title} variants={fadeUp} className="relative text-center">
              <span
                className={`relative z-10 mx-auto grid place-items-center h-[72px] w-[72px] rounded-full border-2 ${m.ring} ${m.glow} bg-card`}
              >
                <m.icon className={m.color} size={30} strokeWidth={1.75} />
              </span>
              <h3 className={`mt-5 font-semibold ${m.color}`}>{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[16rem] mx-auto">{m.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default OurJourneySection;