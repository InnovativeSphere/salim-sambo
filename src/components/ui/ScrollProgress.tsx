// ============================================================
// src/components/ui/ScrollProgress.tsx
// Thin accent line at top of viewport — fills as you scroll
// ============================================================

"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Smooth the value so it doesn't feel jittery
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        backgroundColor: "var(--color-accent)",
        boxShadow:
          "0 0 8px color-mix(in srgb, var(--color-accent) 60%, transparent)",
      }}
      aria-hidden="true"
    />
  );
}