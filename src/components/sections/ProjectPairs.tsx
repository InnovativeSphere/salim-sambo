// ============================================================
// src/components/sections/ProjectPairs.tsx
// Cross-stack links — shows projects that pair with this one
// ============================================================

"use client";

import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { motion } from "framer-motion";
import TechPill from "@/components/ui/TechPill";
import StatusBadge from "@/components/ui/StatusBadge";
import { projects as allProjects, stacks } from "@/data/stack";
import type { Project } from "@/data/stack";

interface ProjectPairsProps {
  project: Project;
}

export default function ProjectPairs({ project }: ProjectPairsProps) {
  // Find projects this one is paired with:
  // 1) Same project slug across stacks (e.g., kyc + kyc-frontend)
  // 2) Projects explicitly cross-linked from this stack
  const relatedSlugs = new Set<string>();

  // Find projects that pair with this project via shared slug prefix or explicit link
  const pairs = allProjects.filter((p) => {
    if (p.slug === project.slug) return false;

    // Match by shared root name (kyc ↔ kyc-frontend)
    const rootA = project.slug.split("-")[0];
    const rootB = p.slug.split("-")[0];
    const sameRoot = rootA === rootB;

    // Match by explicit cross-stack link
    const explicitlyLinked =
      project.crossStack?.includes(p.stack) &&
      p.crossStack?.includes(project.stack);

    return sameRoot || explicitlyLinked;
  });

  if (pairs.length === 0) return null;

  return (
    <section
      className="py-20 md:py-24"
      style={{ backgroundColor: "var(--color-bg-subtle)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-accent-light)",
              color: "var(--color-accent)",
              border:
                "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
            }}
          >
            <Layers size={14} />
          </span>
          <div>
            <p
              className="text-[11px] font-mono font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Pairs With
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              This project works alongside these
            </p>
          </div>
        </motion.div>

        {/* Pair cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pairs.slice(0, 4).map((pair, i) => {
            const pairStack = stacks[pair.stack];
            return (
              <motion.div
                key={pair.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/${pair.stack}/${pair.slug}`}
                  className="group relative flex flex-col p-6 md:p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
                  style={{
                    backgroundColor: "var(--color-bg-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                  }}
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {pairStack.label}
                    </span>
                    <StatusBadge status={pair.status} size="sm" />
                  </div>

                  {/* Name */}
                  <h3
                    className="text-lg md:text-xl font-semibold tracking-tight leading-tight mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {pair.name}
                  </h3>

                  {/* Pitch */}
                  <p
                    className="text-sm leading-relaxed mb-5 flex-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {pair.pitch}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {pair.pills.slice(0, 2).map((pill) => (
                        <TechPill key={pill} size="sm" variant="outline">
                          {pill}
                        </TechPill>
                      ))}
                    </div>
                    <span
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-45"
                      style={{
                        backgroundColor: "var(--color-bg-subtle)",
                        color: "var(--color-text-muted)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}