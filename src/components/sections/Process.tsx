// ============================================================
// src/components/sections/Process.tsx
// "How It Works" — four-step process
// ============================================================

import SectionHeading from "@/components/ui/SectionHeading";
import { processSection } from "@/data/content";

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <SectionHeading
          eyebrow="Process"
          title={processSection.heading}
          description={processSection.subheading}
        />

        {/* Steps */}
        <div className="mt-16 relative">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-8 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, var(--color-border) 8%, var(--color-border) 92%, transparent)`,
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {processSection.steps.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col"
              >
                {/* Number badge */}
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div
                    className="relative flex items-center justify-center w-16 h-16 rounded-full font-mono font-semibold text-base shrink-0"
                    style={{
                      backgroundColor: "var(--color-bg-primary)",
                      border: "1.5px solid var(--color-accent)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {step.step}
                    {/* Inner dot */}
                    <span
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        bottom: 6,
                      }}
                    />
                  </div>
                  {/* Line to title on mobile */}
                  <span
                    className="md:hidden h-px flex-1"
                    style={{ backgroundColor: "var(--color-border)" }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-semibold tracking-tight mb-2.5"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}