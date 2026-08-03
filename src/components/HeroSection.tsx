import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/file_00000000b79c71f4bc1f94b483860931.png";
import { Button } from "@/components/ui/button";

const rotating = ["Health", "Rights", "Digital Safety", "Dignity"];

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
            <span className="inline-block mb-5 rounded-full border border-primary/25 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Privacy-first innovation from Ghana
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              Privacy-First Innovation for{" "}
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
            <p className="text-lg md:text-xl text-muted-foreground mb-3 leading-relaxed">
              We build technology, knowledge and protection systems that remove barriers for LGBTQI+ communities, key
              populations and other marginalized populations across Ghana. Our innovations work anonymously, offline and
              on the terms of the people who use them.
            </p>
            <p className="text-lg md:text-xl text-primary italic mb-8 leading-relaxed">
              Better, Without Barriers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full text-base px-6" asChild>
                <Link to="/synapse">❤️ Explore Synapse</Link>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full text-base px-6" asChild>
                <Link to="/orenta">💜 Meet Orenta</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base px-6" asChild>
                <Link to="/digihub">💙 Visit DigiHub</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src={heroImage}
              alt="Cupped hands protecting a glowing digital padlock, symbolising safe and confidential digital innovation"
              width={1000}
              height={1000}
              loading="eager"
              decoding="async"
              {...({ fetchpriority: "high" } as any)}
              className="w-full max-w-md aspect-square object-cover rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
