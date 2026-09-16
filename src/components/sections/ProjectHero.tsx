// ============================================================
// src/components/sections/ProjectHero.tsx
// Project detail hero — case study index, title, meta, pills
// ============================================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import TechPill from "@/components/ui/TechPill";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Project, StackSlug } from "@/data/stack";

interface ProjectHeroProps {
  project: Project;
  stackSlug: StackSlug;
  stackLabel: string;
  index?: number;
  total?: number;
}

export default function ProjectHero({
  project,
  stackSlug,
  stackLabel,
  index,
  total,
}: ProjectHeroProps) {
  const scrollToOverview = () => {
    const el = document.getElementById("project-detail");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/${stackSlug}`}
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-200"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            <ArrowLeft size={14} />
            Back to {stackLabel}
          </Link>
        </motion.div>

        {/* Top meta row: case study index + stack badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4 mb-8"
        >
          {index !== undefined && total !== undefined && (
            <span
              className="text-xs font-mono tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              Case Study{" "}
              <span style={{ color: "var(--color-text-primary)" }}>
                {String(index + 1).padStart(2, "0")}
              </span>{" "}
              / {String(total).padStart(2, "0")}
            </span>
          )}
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: "var(--color-accent-light)",
              border:
                "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
              color: "var(--color-accent)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            {stackLabel}
          </span>
          <StatusBadge status={project.status} />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          {project.name}
        </motion.h1>

        {/* Animated accent underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="h-[3px] mb-8 rounded-full"
          style={{ backgroundColor: "var(--color-accent)" }}
        />

        {/* Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl leading-relaxed max-w-3xl mb-10"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.pitch}
        </motion.p>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {project.pills.map((pill) => (
            <TechPill key={pill} size="md" variant="accent">
              {pill}
            </TechPill>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-3"
        >
          {project.externalUrl && (
            <Button
              href={project.externalUrl}
              variant="primary"
              size="lg"
              external
            >
              View live project
              <ArrowUpRight size={16} />
            </Button>
          )}
          <button
            onClick={scrollToOverview}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: "transparent",
              color: "var(--color-text-secondary)",
              border: "1.5px solid var(--color-border-hover)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border-hover)";
              e.currentTarget.style.color = "var(--color-text-secondary)";
            }}
          >
            Read the case study
            <ArrowDown
              size={14}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}