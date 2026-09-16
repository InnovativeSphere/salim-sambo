// ============================================================
// src/components/sections/StackPage.tsx
// Composes all stack page sections — used by all 4 stack routes
// ============================================================

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import StackHero from "@/components/sections/StackHero";
import StackCards from "@/components/sections/StackCards";
import StackCapabilities from "@/components/sections/StackCapabilities";
import StackPrinciples from "@/components/sections/StackPrinciples";
import Button from "@/components/ui/Button";
import type { Stack, Project } from "@/data/stack";

interface StackPageProps {
  stack: Stack;
  projects: Project[];
}

export default function StackPage({ stack, projects }: StackPageProps) {
  return (
    <>
      <StackHero stack={stack} projects={projects} />
      <StackCards projects={projects} stackSlug={stack.slug} />
      <StackCapabilities stack={stack} />
      <StackPrinciples stack={stack} />

      {/* CTA */}
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