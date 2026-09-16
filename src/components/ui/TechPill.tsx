// ============================================================
// src/components/ui/TechPill.tsx
// Capsule tag for tech stacks, skills, and categories
// ============================================================

import { cn } from "@/lib/utils";

interface TechPillProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "solid" | "accent";
  className?: string;
}

export default function TechPill({
  children,
  size = "md",
  variant = "default",
  className = "",
}: TechPillProps) {
  const sizeClasses = {
    sm: "px-2.5 py-1 text-[10px]",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  }[size];

  const base = cn(
    "inline-flex items-center justify-center rounded-full font-medium tracking-wide whitespace-nowrap transition-all duration-200",
    sizeClasses,
    className
  );

  const styles = {
    default: {
      backgroundColor: "var(--color-bg-subtle)",
      color: "var(--color-text-secondary)",
      border: "1px solid var(--color-border)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-text-secondary)",
      border: "1px solid var(--color-border-hover)",
    },
    solid: {
      backgroundColor: "var(--color-text-primary)",
      color: "var(--color-bg-primary)",
      border: "1px solid var(--color-text-primary)",
    },
    accent: {
      backgroundColor: "var(--color-accent-light)",
      color: "var(--color-accent)",
      border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
    },
  }[variant];

  return (
    <span className={base} style={styles}>
      {children}
    </span>
  );
}