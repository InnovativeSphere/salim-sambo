// ============================================================
// src/components/ui/ToggleTabs.tsx
// Overview / Technical tab switcher with sliding indicator
// ============================================================

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function ToggleTabs({
  tabs,
  activeTab,
  onChange,
  className = "",
}: ToggleTabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-full relative",
        className
      )}
      style={{
        backgroundColor: "var(--color-bg-subtle)",
        border: "1px solid var(--color-border)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 md:px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 z-10"
            )}
            style={{
              color: isActive
                ? "var(--color-accent-text)"
                : "var(--color-text-secondary)",
            }}
          >
            {/* Sliding pill indicator */}
            {isActive && (
              <motion.span
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-full -z-10"
                style={{ backgroundColor: "var(--color-accent)" }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 32,
                }}
              />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}