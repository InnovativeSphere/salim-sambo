// ============================================================
// src/components/sections/Services.tsx
// "What I Build" — three service offerings
// ============================================================
"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { servicesSection } from "@/data/content";

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-subtle)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <SectionHeading
          eyebrow="Services"
          title={servicesSection.heading}
          description={servicesSection.subheading}
        />

        {/* Services grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {servicesSection.services.map((service, index) => (
            <article
              key={service.id}
              className="group relative flex flex-col p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px -12px color-mix(in srgb, var(--color-accent) 25%, transparent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Number + accent line */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-xs font-mono font-semibold tracking-wider"
                  style={{ color: "var(--color-accent)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="h-px flex-1"
                  style={{ backgroundColor: "var(--color-border)" }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-xl font-semibold tracking-tight mb-3 leading-snug"
                style={{ color: "var(--color-text-primary)" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-8 flex-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {service.description}
              </p>

              {/* Pricing row */}
              <div
                className="pt-5 flex items-end justify-between gap-4"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <div>
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Pricing
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {service.pricing}
                  </p>
                  {service.pricingNote && (
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {service.pricingNote}
                    </p>
                  )}
                </div>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-45"
                  style={{
                    backgroundColor: "var(--color-bg-subtle)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}