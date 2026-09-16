// ============================================================
// src/components/sections/CrossStackPills.tsx
// Global pill strip — foundations across every stack
// ============================================================

"use client";

import { motion } from "framer-motion";
import TechPill from "@/components/ui/TechPill";
import { crossStackPills } from "@/data/stack";

export default function CrossStackPills() {
  return (
    <section
      className="relative py-20 md:py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-6 h-px"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Everywhere
            </span>
          </div>
          <h2
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Foundations across every stack
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Regardless of the discipline — these are the tools I use daily.
          </p>
        </motion.div>

        {/* Pill grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2.5"
        >
          {crossStackPills.map((pill, i) => (
            <motion.div
              key={pill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.03 }}
            >
              <TechPill size="md" variant="default">
                {pill}
              </TechPill>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}