import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeIn";
  as?: "section" | "div";
}

const variantMap = { fadeUp, fadeIn };

const AnimatedSection = ({ children, className, variant = "fadeUp", as = "div" }: AnimatedSectionProps) => {
  const Component = motion[as];
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variantMap[variant]}
      className={className}
    >
      {children}
    </Component>
  );
};

export { AnimatedSection, fadeUp, fadeIn, staggerContainer };
