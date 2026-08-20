import { motion } from "framer-motion";
import { Ear, Search, Lightbulb, CheckCircle2, Rocket } from "lucide-react";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";

const steps = [
  {
    icon: Ear,
    title: "1. Listen",
    text: "We listen to the lived experiences and gather evidence from communities.",
    color: "text-brand-blue",
    ring: "border-brand-blue/60",
    glow: "shadow-[0_0_25px_-6px_hsl(var(--brand-blue)/0.7)]",
  },
  {
    icon: Search,
    title: "2. Research",
    text: "We analyse needs, identify gaps and uncover the barriers.",
    color: "text-brand-magenta",
    ring: "border-brand-magenta/60",
    glow: "shadow-[0_0_25px_-6px_hsl(var(--brand-magenta)/0.7)]",
  },
  {
    icon: Lightbulb,
    title: "3. Innovate",
    text: "We design privacy-first innovations that address real challenges.",
    color: "text-primary",
    ring: "border-primary/60",
    glow: "shadow-[0_0_25px_-6px_hsl(var(--primary)/0.7)]",
  },
  {
    icon: CheckCircle2,
    title: "4. Test & Improve",
    text: "We test, learn and refine our solutions with the communities we serve.",
    color: "text-emerald-500",
    ring: "border-emerald-500/60",
    glow: "shadow-[0_0_25px_-6px_hsl(160_84%_39%/0.7)]",
  },
  {
    icon: Rocket,
    title: "5. Scale Impact",
    text: "We expand access, strengthen systems and drive lasting change.",
    color: "text-brand-gold",
    ring: "border-brand-gold/60",
    glow: "shadow-[0_0_25px_-6px_hsl(var(--brand-gold)/0.7)]",
  },
];

const OurJourneySection = () => (
  <section className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8">
      <div className="rounded-2xl bg-card tint-purple border border-border p-8 md:p-12 shadow-sm">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl text-card-foreground text-center mb-3">Our Journey</h2>
          <p className="text-center text-muted-foreground mb-12">
            We listen. We learn. We build solutions with communities, for communities.
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
          {steps.map((s) => (
            <motion.div key={s.title} variants={fadeUp} className="relative text-center">
              <span
                className={`relative z-10 mx-auto grid place-items-center h-[72px] w-[72px] rounded-full border-2 ${s.ring} ${s.glow} bg-card`}
              >
                <s.icon className={s.color} size={30} strokeWidth={1.75} />
              </span>
              <h3 className={`mt-5 font-semibold ${s.color}`}>{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[16rem] mx-auto">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default OurJourneySection;
