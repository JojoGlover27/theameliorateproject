import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import DonateModal from "./DonateModal";

const DonateContext = createContext<{ openDonate: () => void }>({ openDonate: () => {} });

export const useDonate = () => useContext(DonateContext);

export const DonateProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const openDonate = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openDonate }), [openDonate]);

  return (
    <DonateContext.Provider value={value}>
      {children}
      <motion.button
        type="button"
        onClick={openDonate}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Donate to The Ameliorate Project"
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground shadow-lg shadow-primary/25 ring-1 ring-primary/30"
      >
        <Heart className="w-4 h-4" />
        <span className="text-sm font-semibold">Donate</span>
      </motion.button>
      <DonateModal open={open} onOpenChange={setOpen} />
    </DonateContext.Provider>
  );
};
