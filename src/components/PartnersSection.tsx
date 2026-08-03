import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { Handshake } from "lucide-react";

const partners = [
  { name: "Ghana Health Service", note: "Clinical standards and national HIV guidelines" },
  { name: "Community-based organisations", note: "Peer navigation and grassroots outreach" },
  { name: "Licensed clinicians", note: "Remote consultation and prescribing" },
  { name: "Research collaborators", note: "Evidence generation and evaluation" },
];

const PartnersSection = () => (
  <section id="partners" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8">
      <AnimatedSection>
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Collaboration</p>
          <h2 className="text-3xl md:text-4xl text-foreground mb-4">We build with, not for, communities</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our innovations are shaped alongside the people who use them and the professionals who sustain them.
          </p>
        </div>
      </AnimatedSection>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {partners.map((p) => (
          <motion.div
            key={p.name}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <Handshake className="mb-3 h-5 w-5 text-primary" />
            <h3 className="font-semibold text-card-foreground mb-1">{p.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.note}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default PartnersSection;
