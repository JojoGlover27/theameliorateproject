import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const keywords = [
  "Synapse",
  "Telemedicine",
  "PrEP / PEP",
  "ART",
  "Mental Health",
  "Privacy-First",
  "Anonymous Care",
  "Self-Testing",
  "Affirming Support",
  "End-to-End Encrypted",
  "Discreet Delivery",
  "Stigma-Free",
];

const RotatingKeywordsBar = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % keywords.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-[60px] md:top-[68px] left-0 right-0 z-40 bg-primary text-primary-foreground border-b border-primary/30">
      <div className="container mx-auto px-4 md:px-8 py-2 flex items-center justify-center gap-3 text-xs md:text-sm">
        <span className="uppercase tracking-widest font-semibold opacity-80 hidden sm:inline">
          What we do
        </span>
        <span className="opacity-60 hidden sm:inline">•</span>
        <div className="relative h-5 md:h-6 overflow-hidden flex items-center min-w-[160px] md:min-w-[220px] justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={keywords[i]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="font-semibold whitespace-nowrap"
            >
              {keywords[i]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RotatingKeywordsBar;
