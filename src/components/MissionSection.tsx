import { Shield, Heart, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";

const aims = [
  { icon: Heart, text: "Reduce fear and stigma that keeps people from seeking care" },
  { icon: Shield, text: "Increase timely access to prevention and treatment" },
  { icon: Users, text: "Support adherence and overall wellbeing through discreet, reliable tools" },
  { icon: BookOpen, text: "Empower hidden communities with knowledge, resources, and connection" },
];

const MissionSection = () => (
  <section className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-6">Our Mission</h2>
        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">Our mission is simple yet powerful:</p>
        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
          To ensure that every LGBTQI+ person in Ghana can access life-saving HIV services, PrEP, PEP, ART, testing, counseling, and support, anonymously, safely, and without judgment.
        </p>
        <p className="text-lg font-semibold text-secondary-foreground mb-8">
          We believe health is a right, not a risk.
        </p>
        <p className="text-muted-foreground mb-6">
          By building an integrated, anonymity-first digital health ecosystem, we aim to:
        </p>
      </AnimatedSection>
      <motion.div
        className="grid sm:grid-cols-2 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {aims.map((a) => (
          <motion.div key={a.text} variants={fadeUp} className="flex items-start gap-3 bg-card p-5 rounded-xl shadow-sm">
            <a.icon className="text-primary mt-1 shrink-0" size={22} />
            <p className="text-card-foreground">{a.text}</p>
          </motion.div>
        ))}
      </motion.div>
      <AnimatedSection>
        <p className="mt-8 text-muted-foreground leading-relaxed">
          We work quietly but relentlessly, because your health matters, and your privacy is non-negotiable.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default MissionSection;
