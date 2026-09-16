// ============================================================
// src/components/sections/About.tsx
// "About" — headshot + short story
// ============================================================

import Image from "next/image";
import { MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutSection, siteConfig } from "@/data/content";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-subtle)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ==================== LEFT — HEADSHOT ==================== */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Headshot with gold-accent frame effect */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "4 / 5",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src="/images/headshot.jpg"
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-5 left-6 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg"
                style={{
                  backgroundColor: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--color-accent-light)",
                    color: "var(--color-accent)",
                  }}
                >
                  <MapPin size={16} />
                </span>
                <div>
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Based in
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {siteConfig.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== RIGHT — STORY ==================== */}
          <div className="lg:col-span-7 lg:pt-4">
            <SectionHeading eyebrow="About" title={aboutSection.heading} />

            <div className="mt-8 space-y-5">
              {aboutSection.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing line — accent block */}
            <div
              className="mt-10 p-6 rounded-2xl"
              style={{
                backgroundColor: "var(--color-bg-primary)",
                borderLeft: "3px solid var(--color-accent)",
              }}
            >
              <p
                className="text-lg md:text-xl font-medium leading-snug"
                style={{ color: "var(--color-text-primary)" }}
              >
                {aboutSection.closingLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}