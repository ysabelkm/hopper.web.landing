"use client";

import { motion, useScroll } from 'motion/react';

export const TopScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-foreground)] z-[100] origin-left shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
