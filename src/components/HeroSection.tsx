import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-image.jpg";
import { Button } from "@/components/ui/button";

const rotating = [
  "You Are",
  "You Need It",
  "You're Safe",
  "Community Finds You",
];

const HeroSection = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % rotating.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden"
      style={{ background: "var(--hero-gradient)" }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              Safe, Anonymous Access to HIV Care — Right Where{" "}
              <span className="relative inline-block align-baseline">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotating[i]}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-block text-primary"
                  >
                    {rotating[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              The Ameliorate Project empowers hidden LGBTQI+ communities, lost-to-follow-up individuals, and people who avoid traditional health facilities across Ghana with confidential telemedicine for PrEP, PEP, ART, mental wellness, and ongoing support. No judgment. No exposure. Just care.
            </p>
            <Button variant="default" size="lg" className="rounded-md text-base px-8" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src={heroImage}
              alt="Diverse hands holding a padlock symbolizing privacy and care"
              width={1280}
              height={960}
              className="w-full max-w-lg rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
