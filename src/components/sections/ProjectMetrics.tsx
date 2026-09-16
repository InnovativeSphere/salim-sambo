// ============================================================
// src/components/sections/ProjectMetrics.tsx
// Horizontal metrics band — staggered reveal, premium type
// ============================================================

"use client";

import { motion } from "framer-motion";
import type { ProjectMetric } from "@/data/stack";

interface ProjectMetricsProps {
  metrics: ProjectMetric[];
}

export default function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  const display = metrics.slice(0, 4);

  return (
    <section
      className="relative py-14 md:py-20"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0">
          {display.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex flex-col px-0 md:px-6"
              style={{
                borderLeft:
                  i === 0 || (i % 2 === 0 && typeof window === "undefined")
                    ? "none"
                    : "1px solid var(--color-border)",
              }}
            >
              {/* Desktop divider only */}
              <span
                className="hidden md:block absolute left-0 top-0 bottom-0 w-px"
                style={{
                  backgroundColor:
                    i === 0 ? "transparent" : "var(--color-border)",
                }}
              />

              <p
                className="text-3xl md:text-4xl font-semibold font-mono tracking-tight leading-none mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                {metric.value}
              </p>
              <p
                className="text-xs md:text-sm leading-snug font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}