// ============================================================
// src/components/sections/CaseStudies.tsx
// "Selected Work" — four project cards
// ============================================================

"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { caseStudiesSection } from "@/data/content";

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <SectionHeading
          eyebrow="Selected Work"
          title={caseStudiesSection.heading}
          description={caseStudiesSection.subheading}
        />

        {/* Project grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {caseStudiesSection.projects.map((project, index) => (
            <article
              key={project.id}
              className="group relative flex flex-col p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
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
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 h-[2px] transition-all duration-500 ease-out"
                style={{
                  width: "0%",
                  backgroundColor: "var(--color-accent)",
                }}
                data-accent-bar
              />

              {/* Header row: number + arrow */}
              <div className="flex items-start justify-between mb-6">
                <span
                  className="text-xs font-mono font-semibold tracking-wider"
                  style={{ color: "var(--color-accent)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-45"
                  style={{
                    backgroundColor: "var(--color-bg-primary)",
                    color: "var(--color-text-muted)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <ArrowUpRight size={16} />
                </span>
              </div>

              {/* Project name + tagline */}
              <div className="mb-5">
                <h3
                  className="text-xl md:text-2xl font-semibold tracking-tight leading-tight mb-1.5"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-6 flex-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Live status */}
              {project.liveSince && (
                <div
                  className="flex items-center gap-2 pt-5"
                  style={{ borderTop: "1px solid var(--color-border)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full pulse-dot"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                  <span
                    className="text-xs font-mono"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {project.liveSince}
                  </span>
                </div>
              )}

              {/* Hover accent bar expander */}
              <style jsx>{`
                article:hover [data-accent-bar] {
                  width: 100% !important;
                }
              `}</style>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}