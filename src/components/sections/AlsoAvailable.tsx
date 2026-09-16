// ============================================================
// src/components/sections/AlsoAvailable.tsx
// "Also Available" — versatility section, links to stack routes
// ============================================================

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { alsoAvailableSection } from "@/data/content";
import { stackAccents } from "@/data/theme";

export default function AlsoAvailable() {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-subtle)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Capabilities"
          title={alsoAvailableSection.heading}
          description={alsoAvailableSection.intro}
        />

        {/* Offerings grid — each card links to its stack route */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {alsoAvailableSection.offerings.map((offering) => {
            const accent = stackAccents[offering.slug] ?? stackAccents.default;

            return (
              <Link
                key={offering.label}
                href={offering.route}
                className="group relative flex flex-col p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{
                  backgroundColor: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent.accent;
                  e.currentTarget.style.boxShadow = `0 12px 32px -12px ${accent.accent}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Accent top border (always visible) */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ backgroundColor: accent.accent }}
                />

                {/* Header row — number + arrow */}
                <div className="flex items-start justify-between mb-5 pt-1">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-widest"
                    style={{ color: accent.accent }}
                  >
                    {offering.slug}
                  </span>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-45"
                    style={{
                      backgroundColor: "var(--color-bg-subtle)",
                      color: "var(--color-text-muted)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <ArrowUpRight size={14} />
                  </span>
                </div>

                {/* Label */}
                <h3
                  className="text-base font-semibold tracking-tight mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {offering.label}
                </h3>

                {/* Detail */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {offering.detail}
                </p>

                {/* Bottom hint */}
                <div
                  className="mt-5 pt-4 flex items-center gap-1.5 text-xs font-medium transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    borderTop: "1px solid var(--color-border)",
                    color: accent.accent,
                  }}
                >
                  Explore {offering.slug}
                  <ArrowUpRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* C# note */}
        {alsoAvailableSection.csharpNote && (
          <p
            className="mt-8 text-sm text-center"
            style={{ color: "var(--color-text-muted)" }}
          >
            {alsoAvailableSection.csharpNote}
          </p>
        )}

        {/* Closing line */}
        <div
          className="mt-14 p-8 md:p-10 rounded-2xl"
          style={{
            backgroundColor: "var(--color-bg-primary)",
            borderLeft: "3px solid var(--color-accent)",
          }}
        >
          <p
            className="text-lg md:text-xl leading-relaxed font-medium max-w-3xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            {alsoAvailableSection.closingLine}
          </p>
        </div>
      </div>
    </section>
  );
}