// ============================================================
// src/components/ui/CountUp.tsx
// Animates a number from 0 to target on first view
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: string;      // e.g., "4+", "24h", "100"
  duration?: number;  // ms
  className?: string;
  style?: React.CSSProperties;
}

export default function CountUp({
  value,
  duration = 1400,
  className = "",
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  // Parse the value ONCE — outside the effect
  // "4+"  -> num: 4,   suffix: "+"
  // "24h" -> num: 24,  suffix: "h"
  // "100" -> num: 100, suffix: ""
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const isNumeric = Boolean(match);

  useEffect(() => {
    // Non-numeric fallback — just show the raw value
    if (!isNumeric) {
      setDisplay(value);
      return;
    }

    // Wait until visible
    if (!isInView) return;

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a natural finish
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * targetNum);

      setDisplay(`${current}${suffix}`);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, targetNum, suffix, duration, isNumeric, value]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}