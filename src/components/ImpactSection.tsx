import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { Users, ShieldCheck, HeartPulse, GraduationCap } from "lucide-react";

const metrics = [
  { icon: Users, value: "3", label: "Innovations in active development" },
  { icon: HeartPulse, value: "100%", label: "Free services across every phase" },
  { icon: ShieldCheck, value: "0", label: "User identities shared with our team" },
  { icon: GraduationCap, value: "16", label: "Regions targeted for national reach" },
];

const pillars = [
  {
    title: "Access without exposure",
    body:
      "Synapse brings HIV prevention and treatment to people who avoid facilities because of stigma, distance or fear, including lost-to-follow-up individuals.",
  },
  {
    title: "Knowledge without judgement",
    body:
      "Orenta answers the questions people cannot safely ask elsewhere, using evidence-aware guidance on health, rights and available services.",
  },
  {
    title: "Protection without dependence",
    body:
      "DigiHub equips communities with the digital safety skills to protect themselves long after any single programme ends.",
  },
];

const ImpactSection = () => (
  <section id="impact" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8">
      <AnimatedSection>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Our Impact</p>
          <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-4">Measured by barriers removed</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We are an early-stage organisation, and we report honestly. These are the commitments and the reach we are
            building towards as our innovations move from pilot to national scale.
          </p>
        </div>
      </AnimatedSection>

      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
          >
            <m.icon className="mx-auto mb-3 h-6 w-6 text-primary" />
            <p className="font-serif text-3xl md:text-4xl text-card-foreground">{m.value}</p>
            <p className="mt-1 text-sm text-muted-foreground leading-snug">{m.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {pillars.map((p) => (
          <motion.div key={p.title} variants={fadeUp} className="rounded-2xl bg-card border border-border p-6 shadow-sm">
            <h3 className="font-semibold text-lg text-card-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ImpactSection;
