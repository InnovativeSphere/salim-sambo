// ============================================================
// src/app/not-found.tsx
// Custom 404 — on-brand, terminal-inspired, escapes gracefully
// ============================================================
"use client"
import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className="relative min-h-[85vh] flex items-center justify-center px-6 py-32 overflow-hidden"
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* Giant background 404 */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="font-mono font-bold tracking-tighter leading-none"
            style={{
              fontSize: "clamp(200px, 40vw, 500px)",
              color: "var(--color-accent)",
              opacity: 0.05,
            }}
          >
            404
          </span>
        </div>

        {/* Content */}
        <div className="relative max-w-2xl mx-auto text-center">
          {/* Mono badge */}
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-8 font-mono text-xs"
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
            404 · NOT FOUND
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6"
            style={{ color: "var(--color-text-primary)" }}
          >
            This page doesn&rsquo;t exist.
          </h1>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12"
            style={{ color: "var(--color-text-secondary)" }}
          >
            The link you followed may be broken, or the page has moved.
            Let&rsquo;s get you back to something real.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="primary" size="lg">
              <ArrowLeft size={16} />
              Back to home
            </Button>
            <Button href="/#case-studies" variant="secondary" size="lg">
              <Compass size={16} />
              See the work
            </Button>
          </div>

          {/* Terminal hint */}
          <p
            className="mt-16 text-xs font-mono"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span style={{ color: "var(--color-accent)" }}>$</span>{" "}
            cd ~/salim-sambo
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}