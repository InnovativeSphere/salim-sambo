// ============================================================
// src/components/sections/Hero.tsx
// The opening statement — pitch + live terminal preview
// ============================================================

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { heroData } from "@/data/content";
import CountUp from "../ui/CountUp";

// Terminal lines — simulated output of the KYC pipeline
const terminalLines = [
  { delay: 0.6, prompt: "$", text: "python kyc_pipeline.py document.jpg", muted: false },
  { delay: 1.2, text: "", muted: true },
  { delay: 1.3, text: "[01] Loading document .......... done", muted: false },
  { delay: 1.5, text: "[02] Detecting face ............ found", muted: false },
  { delay: 1.7, text: "[03] Classifying document ...... NIN_SLIP", muted: false },
  { delay: 1.9, text: "[04] Extracting fields ......... 6 fields", muted: false },
  { delay: 2.1, text: "[05] Running fraud analysis .... clean", muted: false },
  { delay: 2.4, text: "", muted: true },
  { delay: 2.5, text: "✓ Trust score: 92 · Status: CLEARED", muted: false, success: true },
];

export default function Hero() {
  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Subtle dot grid background */}
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

      {/* Accent glow top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ==================== LEFT COLUMN ==================== */}
          <div className="lg:col-span-7">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-8"
              style={{
                backgroundColor: "var(--color-bg-subtle)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full pulse-dot"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              <span
                className="text-xs font-medium tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {heroData.eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-semibold tracking-tight leading-[1.05] mb-7"
              style={{ color: "var(--color-text-primary)" }}
            >
              {heroData.headline}{" "}
              <span
                className="block sm:inline"
                style={{ color: "var(--color-accent)" }}
              >
                {heroData.headlineAccent}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {heroData.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Button
                href={heroData.ctaPrimary.href}
                variant="primary"
                size="lg"
              >
                <Play size={16} className="fill-current" />
                {heroData.ctaPrimary.label}
              </Button>
              <Button
                href={heroData.ctaSecondary.href}
                variant="secondary"
                size="lg"
              >
                {heroData.ctaSecondary.label}
                <ArrowRight size={16} />
              </Button>
            </motion.div>

            {/* Trust badges */}
           {/* Trust badges with count-up */}
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="flex flex-wrap items-center gap-x-8 gap-y-4"
>
  {heroData.trustBadges.map((badge, i) => (
    <div key={i} className="flex items-baseline gap-2">
      <CountUp
        value={badge.value}
        className="text-2xl font-semibold font-mono tracking-tight"
        style={{ color: "var(--color-text-primary)" }}
      />
      <span
        className="text-xs leading-tight max-w-[120px]"
        style={{ color: "var(--color-text-muted)" }}
      >
        {badge.label}
      </span>
    </div>
  ))}
</motion.div>
          </div>

          {/* ==================== RIGHT COLUMN — TERMINAL ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: "var(--color-text-primary)",
                border: "1px solid var(--color-text-primary)",
              }}
            >
              {/* Terminal chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
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
                  className="ml-3 text-xs font-mono"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-bg-primary) 50%, transparent)",
                  }}
                >
                  kyc_pipeline.py
                </span>
                <Sparkles
                  size={12}
                  className="ml-auto"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-bg-primary) 40%, transparent)",
                  }}
                />
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-[13px] leading-relaxed">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: line.delay,
                      ease: "easeOut",
                    }}
                    className="flex items-start gap-2"
                  >
                    {line.prompt && (
                      <span
                        style={{
                          color:
                            "color-mix(in srgb, var(--color-bg-primary) 40%, transparent)",
                        }}
                      >
                        {line.prompt}
                      </span>
                    )}
                    <span
                      style={{
                        color: line.success
                          ? "var(--color-accent)"
                          : line.muted
                          ? "color-mix(in srgb, var(--color-bg-primary) 40%, transparent)"
                          : "color-mix(in srgb, var(--color-bg-primary) 85%, transparent)",
                        fontWeight: line.success ? 600 : 400,
                      }}
                    >
                      {line.text || "\u00A0"}
                    </span>
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 0.3 }}
                  className="flex items-center gap-2 mt-1"
                >
                  <span
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-bg-primary) 40%, transparent)",
                    }}
                  >
                    $
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block w-2 h-4"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Small caption under terminal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="mt-4 text-xs font-mono text-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              Live preview of the KYC verification pipeline
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}