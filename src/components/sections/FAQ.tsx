// ============================================================
// src/components/sections/FAQ.tsx
// "Common Questions" — accordion
// ============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqSection } from "@/data/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: heading (sticky on desktop) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="FAQ"
                title={faqSection.heading}
                description={faqSection.subheading}
              />
            </div>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {faqSection.items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="border-b"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="text-base md:text-lg font-medium tracking-tight transition-colors duration-200 group-hover:opacity-70"
                        style={{
                          color: isOpen
                            ? "var(--color-accent)"
                            : "var(--color-text-primary)",
                        }}
                      >
                        {item.question}
                      </span>

                      {/* Plus/Minus indicator */}
                      <span
                        className="shrink-0 w-7 h-7 mt-0.5 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: isOpen
                            ? "var(--color-accent)"
                            : "var(--color-bg-subtle)",
                          color: isOpen
                            ? "var(--color-accent-text)"
                            : "var(--color-text-secondary)",
                          border: `1px solid ${
                            isOpen ? "var(--color-accent)" : "var(--color-border)"
                          }`,
                        }}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="overflow-hidden"
                        >
                          <p
                            className="text-sm md:text-base leading-relaxed pb-6 pr-12"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}