// ============================================================
// src/components/sections/StackHero.tsx
// Stack page hero — pitch + stack-aware signature panel
// ============================================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Terminal, Layout, Server, Smartphone } from "lucide-react";
import Button from "@/components/ui/Button";
import TechPill from "@/components/ui/TechPill";
import type { Stack, StackSlug, Project } from "@/data/stack";

interface StackHeroProps {
  stack: Stack;
  projects: Project[];
}

// Icon per stack — used in the signature panel
const stackIcons: Record<StackSlug, React.ReactNode> = {
  python: <Terminal size={18} />,
  frontend: <Layout size={18} />,
  backend: <Server size={18} />,
  mobile: <Smartphone size={18} />,
};

export default function StackHero({ stack, projects }: StackHeroProps) {
  const ownCount = projects.filter((p) => p.stack === stack.slug).length;
  const crossCount = projects.filter(
    (p) => p.crossStack?.includes(stack.slug) && p.stack !== stack.slug
  ).length;

  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Dot grid background */}
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
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
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
            Back to home
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — pitch */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-8"
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
              <span className="text-xs font-mono font-semibold uppercase tracking-widest">
                {stack.label}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-7"
              style={{ color: "var(--color-text-primary)" }}
            >
              {stack.tagline}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {stack.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Button href="#projects" variant="primary" size="lg">
                See the work
                <ArrowRight size={16} />
              </Button>
              <Button href="/#contact" variant="secondary" size="lg">
                Start a project
              </Button>
            </motion.div>
          </div>

          {/* RIGHT — signature panel */}
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
              {/* Panel header */}
              <div
                className="flex items-center gap-3 px-5 py-3.5 border-b"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--color-bg-primary) 10%, transparent)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-bg-primary) 4%, transparent)",
                }}
              >
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-md"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-accent-text)",
                  }}
                >
                  {stackIcons[stack.slug]}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-bg-primary) 60%, transparent)",
                  }}
                >
                  {stack.slug}/overview
                </span>
              </div>

              {/* Panel body — stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-5">
                  <StatBlock
                    label="Projects"
                    value={String(ownCount)}
                    sub="In this stack"
                  />
                  <StatBlock
                    label="Cross-linked"
                    value={String(crossCount)}
                    sub="Shared with other stacks"
                  />
                  <StatBlock
                    label="Skills"
                    value={String(stack.skills.length)}
                    sub="Technologies used"
                  />
                  <StatBlock
                    label="Status"
                    value="Active"
                    sub="Building regularly"
                    accent
                  />
                </div>

                {/* Signature skills row */}
                <div
                  className="mt-6 pt-5"
                  style={{
                    borderTop:
                      "1px solid color-mix(in srgb, var(--color-bg-primary) 10%, transparent)",
                  }}
                >
                  <p
                    className="text-[10px] font-mono uppercase tracking-widest mb-3"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-bg-primary) 40%, transparent)",
                    }}
                  >
                    Core tools
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.skills.slice(0, 6).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-[11px] font-mono"
                        style={{
                          backgroundColor:
                            "color-mix(in srgb, var(--color-bg-primary) 8%, transparent)",
                          color:
                            "color-mix(in srgb, var(--color-bg-primary) 75%, transparent)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Caption below panel */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-4 text-xs font-mono text-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              Stack overview · {stack.label}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Mini stat block inside the signature panel
// ==========================================
function StatBlock({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p
        className="text-[10px] font-mono uppercase tracking-widest mb-1"
        style={{
          color: "color-mix(in srgb, var(--color-bg-primary) 40%, transparent)",
        }}
      >
        {label}
      </p>
      <p
        className="text-2xl font-semibold font-mono tracking-tight"
        style={{
          color: accent
            ? "var(--color-accent)"
            : "color-mix(in srgb, var(--color-bg-primary) 95%, transparent)",
        }}
      >
        {value}
      </p>
      <p
        className="text-[11px] mt-0.5 leading-tight"
        style={{
          color: "color-mix(in srgb, var(--color-bg-primary) 50%, transparent)",
        }}
      >
        {sub}
      </p>
    </div>
  );
}