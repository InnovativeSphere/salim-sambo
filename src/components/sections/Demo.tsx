// ============================================================
// src/components/sections/Demo.tsx
// "See It in Action" — video preview + live demo CTA
// ============================================================

"use client";

import { useRef, useState } from "react";
import { Play, ExternalLink, Pause } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { demoSection } from "@/data/content";

export default function Demo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      id="demo"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-subtle)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ==================== LEFT — VIDEO ==================== */}
          <div className="lg:col-span-7">
            <div
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{
                backgroundColor: "var(--color-text-primary)",
                border: "1px solid var(--color-border)",
                aspectRatio: "16 / 10",
              }}
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src={demoSection.previewVideo}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
                onEnded={() => setIsPlaying(false)}
              />

              {/* Play / Pause overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
                style={{
                  backgroundColor: isPlaying
                    ? "rgba(0,0,0,0)"
                    : "rgba(0,0,0,0.35)",
                }}
              >
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xl"
                  style={{ backgroundColor: "var(--color-bg-primary)" }}
                >
                  {isPlaying ? (
                    <Pause
                      size={26}
                      style={{
                        color: "var(--color-text-primary)",
                        fill: "var(--color-text-primary)",
                      }}
                    />
                  ) : (
                    <Play
                      size={26}
                      className="ml-1"
                      style={{
                        color: "var(--color-text-primary)",
                        fill: "var(--color-text-primary)",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Corner tag */}
              <div
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-bg-primary) 90%, transparent)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span
                  className="text-[10px] font-mono font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Demo Recording
                </span>
              </div>
            </div>
          </div>

          {/* ==================== RIGHT — COPY + CTA ==================== */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Live Demo"
              title={demoSection.heading}
              description={demoSection.description}
            />

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={demoSection.ctaHref}
                variant="primary"
                size="lg"
                external
              >
                {demoSection.ctaLabel}
                <ExternalLink size={16} />
              </Button>
            </div>

            {/* Footnote with accent bar */}
            <div
              className="mt-8 pl-4 py-1"
              style={{
                borderLeft: "2px solid var(--color-accent)",
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {demoSection.footnote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}