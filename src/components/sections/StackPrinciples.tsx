// ============================================================
// src/components/sections/StackPrinciples.tsx
// Three principles per stack — how I think about this discipline
// ============================================================

import type { Stack, StackSlug } from "@/data/stack";

interface StackPrinciplesProps {
  stack: Stack;
}

// Opinionated principles per stack.
// Kept here (not in stack.ts) because these are design/craft opinions,
// not project metadata. If they need to change per coaching, easy to edit.
const principlesMap: Record<
  StackSlug,
  { title: string; body: string }[]
> = {
  python: [
    {
      title: "Automate the boring.",
      body: "If a task runs twice a week, it deserves a script. If it runs twice a day, it deserves a system.",
    },
    {
      title: "Protect the important.",
      body: "Automation moves fast where mistakes are cheap, and slow where mistakes cost trust — verification, payments, identity.",
    },
    {
      title: "Scripts first, services later.",
      body: "Every system I've shipped started as a script that worked. Complexity earns its place one commit at a time.",
    },
  ],
  frontend: [
    {
      title: "Interfaces should feel inevitable.",
      body: "When a user doesn't notice the UI, it's working. When they notice how nice it feels, it's working well.",
    },
    {
      title: "Motion earns its place.",
      body: "Animation isn't decoration — it's information. Every transition should tell the user something about how things relate.",
    },
    {
      title: "No dead ends.",
      body: "Every screen should answer the question 'what now?' — with a clear action, a fallback, or a graceful exit.",
    },
  ],
  backend: [
    {
      title: "Data has a shape. Get it right.",
      body: "Migrations are cheap at the beginning and expensive forever after. Model the domain carefully before you build.",
    },
    {
      title: "Fail loudly, recover quietly.",
      body: "Errors should never be silent. But once logged, the system should recover without the user ever knowing.",
    },
    {
      title: "Boring is a feature.",
      body: "The best APIs are predictable. Novelty belongs in the product, not the infrastructure.",
    },
  ],
  mobile: [
    {
      title: "One codebase, zero compromises.",
      body: "Cross-platform shouldn't mean second-best. If the native version is meaningfully better, that's a design problem to solve.",
    },
    {
      title: "Assume bad networks.",
      body: "Mobile is a hostile environment — patchy signal, dying batteries, mid-session interruptions. Build for offline first.",
    },
    {
      title: "Respect the thumb.",
      body: "The most important pixels are the ones closest to where the thumb naturally rests. Everything else is negotiable.",
    },
  ],
};

export default function StackPrinciples({ stack }: StackPrinciplesProps) {
  const principles = principlesMap[stack.slug];
  if (!principles) return null;

  return (
    <section
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-6 h-px"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              Principles
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            How I think about{" "}
            <span style={{ color: "var(--color-accent)" }}>
              {stack.label.toLowerCase()}
            </span>
          </h2>
          <p
            className="mt-5 text-base md:text-lg leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Three principles that shape every decision I make in this stack.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((principle, i) => (
            <div
              key={i}
              className="relative flex flex-col p-7 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: "var(--color-bg-subtle)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Number */}
              <span
                className="text-xs font-mono font-semibold tracking-wider mb-6"
                style={{ color: "var(--color-accent)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3
                className="text-lg md:text-xl font-semibold tracking-tight leading-snug mb-3"
                style={{ color: "var(--color-text-primary)" }}
              >
                {principle.title}
              </h3>

              {/* Body */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {principle.body}
              </p>

              {/* Accent underline (bottom, appears statically) */}
              <span
                className="absolute bottom-0 left-7 right-7 h-[2px]"
                style={{ backgroundColor: "var(--color-accent)", opacity: 0.15 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}