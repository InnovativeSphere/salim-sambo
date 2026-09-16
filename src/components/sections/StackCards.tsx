// ============================================================
// src/components/sections/StackCards.tsx
// Rich project cards for stack pages
// ============================================================

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import TechPill from "@/components/ui/TechPill";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Project, StackSlug } from "@/data/stack";

interface StackCardsProps {
  projects: Project[];
  stackSlug: StackSlug;
}

export default function StackCards({ projects, stackSlug }: StackCardsProps) {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-6 h-px"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Selected Work
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            Projects in this stack
          </h2>
          <p
            className="mt-5 text-base md:text-lg leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Each project opens with a full write-up — problem, approach, and
            technical breakdown.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ProjectCard project={project} stackSlug={stackSlug} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Individual project card
// ==========================================
function ProjectCard({
  project,
  stackSlug,
}: {
  project: Project;
  stackSlug: StackSlug;
}) {
  const isCrossLinked = project.stack !== stackSlug;

  return (
    <Link
      href={`/${stackSlug}/${project.slug}`}
      className="group relative flex flex-col p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
      style={{
        backgroundColor: "var(--color-bg-subtle)",
        border: "1px solid var(--color-border)",
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
      {/* Top accent bar — slides in on hover */}
      <span
        className="absolute top-0 left-0 h-[2px] transition-all duration-500 ease-out group-hover:w-full"
        style={{
          width: "0%",
          backgroundColor: "var(--color-accent)",
        }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-mono font-semibold tracking-wider"
            style={{ color: "var(--color-accent)" }}
          >
            {String(project.pills.length > 0 ? project.metrics.length : 0).padStart(2, "0") || "00"}
          </span>
          {isCrossLinked && (
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border)",
              }}
            >
              Cross-stack
            </span>
          )}
        </div>
        <StatusBadge status={project.status} size="sm" />
      </div>

      {/* Name + pitch */}
      <div className="mb-5">
        <h3
          className="text-xl md:text-2xl font-semibold tracking-tight leading-tight mb-1.5"
          style={{ color: "var(--color-text-primary)" }}
        >
          {project.name}
        </h3>
        <p
          className="text-sm font-medium leading-snug"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.pitch}
        </p>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.pills.map((pill) => (
          <TechPill key={pill} size="sm" variant="outline">
            {pill}
          </TechPill>
        ))}
      </div>

      {/* Metrics preview (first 2) */}
      {project.metrics.length > 0 && (
        <div
          className="mt-auto pt-5 flex items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-5">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <p
                  className="text-[10px] font-mono uppercase tracking-widest mb-0.5"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {m.label}
                </p>
                <p
                  className="text-sm font-semibold font-mono"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          <span
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:scale-110"
            style={{
              backgroundColor: "var(--color-bg-primary)",
              color: "var(--color-text-muted)",
              border: "1px solid var(--color-border)",
            }}
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      )}
    </Link>
  );
}