"use client";

/**
 * AnimatedSection - Fade + slide animation for content sections.
 * direction "up" = slide from below; "down" = from above.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down";
  className?: string;
}

export default function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: AnimatedSectionProps) {
  const y = direction === "up" ? 24 : -24;
  return (
    <motion.section
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
