// ============================================================
// src/components/sections/ProjectDetail.tsx
// The toggle-view: Overview (editorial) / Technical (console)
// Includes redesigned Field Note for the technical panel
// ============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Terminal, Check, Pin } from "lucide-react";
import ToggleTabs from "@/components/ui/ToggleTabs";
import type { Project } from "@/data/stack";

interface ProjectDetailProps {
  project: Project;
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "technical", label: "Technical" },
];

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section
      id="project-detail"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "var(--color-bg-subtle)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <ToggleTabs
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Panel area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "overview" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <OverviewPanel project={project} />
              </motion.div>
            ) : (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <TechnicalPanel project={project} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// OVERVIEW PANEL
// ==========================================
function OverviewPanel({ project }: { project: Project }) {
  const sections = [
    {
      number: "01",
      label: "The Problem",
      icon: <FileText size={14} />,
      body: project.overview.problem,
    },
    {
      number: "02",
      label: "The Solution",
      icon: <Check size={14} />,
      body: project.overview.solution,
    },
    {
      number: "03",
      label: "Why I Built It",
      icon: <FileText size={14} />,
      body: project.overview.story,
    },
    {
      number: "04",
      label: "The Outcome",
      icon: <Check size={14} />,
      body: project.overview.outcome,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col gap-14">
        {sections.map((section, i) => (
          <motion.article
            key={section.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[11px] font-mono font-semibold tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                {section.number}
              </span>
              <span
                className="h-px"
                style={{
                  backgroundColor: "var(--color-accent)",
                  opacity: 0.4,
                  width: "24px",
                }}
              />
              <span
                className="text-[11px] font-mono font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}
              >
                {section.label}
              </span>
            </div>

            <p
              className="text-lg md:text-xl leading-[1.7] font-normal"
              style={{ color: "var(--color-text-primary)" }}
            >
              {section.body}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// TECHNICAL PANEL
// ==========================================
function TechnicalPanel({ project }: { project: Project }) {
  const tech = project.technical;

  const manifestRows = [
    { key: "project", value: project.slug },
    { key: "stack", value: project.stack },
    { key: "status", value: project.status },
    { key: "languages", value: tech.languages.join(", ") },
    { key: "frameworks", value: tech.frameworks.join(", ") },
    { key: "database", value: tech.database.join(", ") },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Dark manifest console */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl mb-8"
        style={{
          backgroundColor: "var(--color-text-primary)",
          border: "1px solid var(--color-text-primary)",
        }}
      >
        <div
          className="flex items-center gap-2 px-5 py-3.5 border-b"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-bg-primary) 10%, transparent)",
            backgroundColor:
              "color-mix(in srgb, var(--color-bg-primary) 4%, transparent)",
          }}
        >
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FF5F56" }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#27C93F" }} />
          <span
            className="ml-3 text-xs font-mono flex items-center gap-2"
            style={{
              color: "color-mix(in srgb, var(--color-bg-primary) 50%, transparent)",
            }}
          >
            <Terminal size={12} />
            {project.slug}.manifest
          </span>
        </div>

        <div className="p-6 md:p-7 font-mono text-[13px] md:text-sm leading-[1.9]">
          <div
            className="mb-5"
            style={{
              color: "color-mix(in srgb, var(--color-bg-primary) 40%, transparent)",
            }}
          >
            {"// project configuration"}
          </div>

          {manifestRows.map((row) => (
            <div key={row.key} className="flex flex-wrap gap-x-2">
              <span style={{ color: "var(--color-accent)" }}>{row.key}:</span>
              <span
                style={{
                  color:
                    "color-mix(in srgb, var(--color-bg-primary) 85%, transparent)",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}

          {tech.packages.length > 0 && (
            <div className="mt-5">
              <span style={{ color: "var(--color-accent)" }}>packages:</span>
              <div className="mt-2 pl-4 flex flex-col gap-0.5">
                {tech.packages.map((pkg, i) => (
                  <span
                    key={pkg}
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-bg-primary) 75%, transparent)",
                    }}
                  >
                    {i === tech.packages.length - 1 ? "└─ " : "├─ "}
                    {pkg}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-[11px] font-mono font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-accent)" }}
          >
            Architecture
          </span>
          <span
            className="h-px flex-1"
            style={{ backgroundColor: "var(--color-border)" }}
          />
        </div>
        <div
          className="p-6 md:p-7 rounded-2xl"
          style={{
            backgroundColor: "var(--color-bg-primary)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p
            className="text-sm md:text-base leading-[1.8]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {tech.architecture}
          </p>
        </div>
      </motion.div>

      {/* FIELD NOTE — redesigned */}
      {tech.notes && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-bg-primary)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Dot-grid texture — the notebook feel */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Top accent strip */}
          <div
            className="h-[3px] w-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          />

          <div className="relative p-6 md:p-8">
            {/* Field Note header */}
            <div className="flex items-center gap-2.5 mb-5">
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{
                  backgroundColor: "var(--color-accent-light)",
                  color: "var(--color-accent)",
                }}
              >
                <Pin size={12} />
              </span>
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--color-accent)" }}
              >
                Field Note
              </span>
              <span
                className="flex-1 h-px"
                style={{
                  backgroundColor: "var(--color-accent)",
                  opacity: 0.2,
                }}
              />
            </div>

            {/* Body */}
            <p
              className="text-base md:text-lg leading-[1.75] italic"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {tech.notes}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}