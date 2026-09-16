// ============================================================
// src/components/sections/StackPage.tsx
// Shared content for all stack routes — accents shift via theme
// ============================================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { StackRoute, caseStudiesSection } from "@/data/content";

interface StackPageProps {
  stack: StackRoute;
}

export default function StackPage({ stack }: StackPageProps) {
  // Filter projects that share at least one tech with this stack
  const relatedProjects = caseStudiesSection.projects.filter((project) =>
    project.tech.some((tech) =>
      stack.skills.some((skill) =>
        tech.toLowerCase().includes(skill.toLowerCase())
      )
    )
  );

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
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

          {/* Eyebrow badge */}
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

          {/* Big tagline as H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-7 max-w-4xl"
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
            <Button href="/#contact" variant="primary" size="lg">
              Start a project
              <ArrowRight size={16} />
            </Button>
            <Button href="/#case-studies" variant="secondary" size="lg">
              See all work
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ==================== SKILLS ==================== */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "var(--color-bg-subtle)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="Toolbox"
            title="Skills & technologies"
            description={`The tools I use when building in ${stack.label.toLowerCase()}.`}
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {stack.skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                style={{
                  backgroundColor: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {skill}
                </span>
                <span
                  className="text-[10px] font-mono transition-colors duration-200"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RELATED WORK ==================== */}
      {relatedProjects.length > 0 && (
        <section
          className="py-20 md:py-28"
          style={{ backgroundColor: "var(--color-bg-primary)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading
              eyebrow="Selected work"
              title={`Projects built with ${stack.label.toLowerCase()}`}
              description="A sample of what I've shipped using this part of the stack."
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedProjects.map((project, i) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex flex-col p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1"
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
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="text-xs font-mono font-semibold"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
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

                  <h3
                    className="text-xl md:text-2xl font-semibold tracking-tight mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-sm font-medium mb-5"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {project.tagline}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-6 flex-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== CTA ==================== */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: "var(--color-bg-subtle)" }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight mb-6"
            style={{ color: "var(--color-text-primary)" }}
          >
            Have a{" "}
            <span style={{ color: "var(--color-accent)" }}>
              {stack.label.toLowerCase()}
            </span>{" "}
            project?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Tell me what you're building. I'll tell you honestly if I can
            help — and how.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button href="/#contact" variant="primary" size="lg">
              Get in touch
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}