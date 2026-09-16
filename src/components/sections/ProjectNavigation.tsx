// ============================================================
// src/components/sections/ProjectNavigation.tsx
// Prev / Next navigation — larger, richer cards
// ============================================================

"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Project, StackSlug } from "@/data/stack";

interface ProjectNavigationProps {
  current: Project;
  siblings: Project[];
  stackSlug: StackSlug;
}

export default function ProjectNavigation({
  current,
  siblings,
  stackSlug,
}: ProjectNavigationProps) {
  if (siblings.length < 2) return null;

  const currentIndex = siblings.findIndex((p) => p.slug === current.slug);
  if (currentIndex === -1) return null;

  const prev =
    currentIndex > 0 ? siblings[currentIndex - 1] : siblings[siblings.length - 1];
  const next =
    currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : siblings[0];

  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="text-[11px] font-mono font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            Continue exploring
          </span>
          <span
            className="h-px flex-1"
            style={{ backgroundColor: "var(--color-border)" }}
          />
        </motion.div>

        {/* Nav cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <NavCard
            project={prev}
            stackSlug={stackSlug}
            direction="prev"
            delay={0.1}
          />
          <NavCard
            project={next}
            stackSlug={stackSlug}
            direction="next"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

function NavCard({
  project,
  stackSlug,
  direction,
  delay,
}: {
  project: Project;
  stackSlug: StackSlug;
  direction: "prev" | "next";
  delay: number;
}) {
  const isPrev = direction === "prev";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={`/${stackSlug}/${project.slug}`}
        className="group relative flex flex-col p-7 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
        style={{
          backgroundColor: "var(--color-bg-subtle)",
          border: "1px solid var(--color-border)",
          textAlign: isPrev ? "left" : "right",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent)";
          e.currentTarget.style.boxShadow =
            "0 16px 40px -16px color-mix(in srgb, var(--color-accent) 25%, transparent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Accent bar */}
        <span
          className="absolute top-0 h-[3px] transition-all duration-500 ease-out group-hover:w-full"
          style={{
            width: "0%",
            backgroundColor: "var(--color-accent)",
            [isPrev ? "left" : "right"]: 0,
          }}
        />

        {/* Direction */}
        <div
          className={`flex items-center gap-2 mb-6 ${
            isPrev ? "" : "justify-end"
          }`}
        >
          {isPrev && (
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 group-hover:-translate-x-1"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                color: "var(--color-accent)",
                border: "1px solid var(--color-border)",
              }}
            >
              <ArrowLeft size={14} />
            </span>
          )}
          <span
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            {isPrev ? "Previous" : "Next project"}
          </span>
          {!isPrev && (
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 group-hover:translate-x-1"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                color: "var(--color-accent)",
                border: "1px solid var(--color-border)",
              }}
            >
              <ArrowRight size={14} />
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="text-xl md:text-2xl font-semibold tracking-tight leading-tight mb-2 transition-colors duration-200"
          style={{ color: "var(--color-text-primary)" }}
        >
          {project.name}
        </h3>

        {/* Pitch */}
        <p
          className="text-sm leading-relaxed mb-6 flex-1"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.pitch}
        </p>

        {/* Footer row */}
        <div
          className={`flex items-center gap-3 pt-5 ${
            isPrev ? "" : "justify-end"
          }`}
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <StatusBadge status={project.status} size="sm" />
        </div>
      </Link>
    </motion.div>
  );
}