import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { funds, payment, givingNote } from "@/data/giving";
import { useDonate } from "@/components/DonateProvider";

const SupportOurWork = () => {
  const { openDonate } = useDonate();

  return (
    <section id="donate" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Support Our Work</p>
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">Fund the innovation that matters to you</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{givingNote}</p>
          </div>
        </AnimatedSection>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {funds.map((f) => (
            <motion.div
              key={f.id}
              variants={fadeUp}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-2xl mb-3">{f.emoji}</span>
              <h3 className="font-semibold text-lg text-card-foreground mb-2">{f.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{f.description}</p>
              <Button variant="outline" className="mt-auto rounded-full" onClick={openDonate}>
                Give to this fund
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection>
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-secondary p-6 md:p-8 text-center">
            <h3 className="font-serif text-2xl text-secondary-foreground mb-2">Ready to give?</h3>
            <p className="text-muted-foreground mb-5">
              Mobile Money and bank transfer details, with the reference{" "}
              <strong className="text-secondary-foreground">{payment.reference}</strong>, are one click away.
            </p>
            <Button size="lg" className="rounded-full px-8" onClick={openDonate}>
              <Heart className="mr-2 h-4 w-4" />
              Donate now
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SupportOurWork;
