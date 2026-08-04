import { Shield, Heart, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";

const aims = [
  { icon: Heart, text: "Expand access to healthcare for people excluded by stigma and fear" },
  { icon: BookOpen, text: "Make trusted knowledge clear, accessible and safe to seek" },
  { icon: Shield, text: "Strengthen digital rights, cybersecurity and safer digital participation" },
  { icon: Users, text: "Design with communities, grounded in lived experience and real needs" },
];

const MissionSection = () => (
  <section className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-6">Our Mission</h2>
        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
          Our mission is to build privacy-first innovations that expand access to healthcare, trusted knowledge, digital rights and cybersecurity for LGBTQI+ communities, key populations and other marginalized populations in Ghana.
        </p>
        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
          We combine technology, research, community insight and human-centred design to remove barriers created by stigma, surveillance, misinformation and digital exclusion.
        </p>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          By building practical, trusted and privacy-respecting solutions, we are creating a future where people can access services, knowledge and opportunities safely, confidently and without barriers.
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
    </div>
  </section>
);

export default MissionSection;
