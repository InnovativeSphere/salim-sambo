// ============================================================
// src/components/ui/Badge.tsx
// Small labeled pill — three variants: default, accent, outline
// ============================================================

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  className = "",
}: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs";

  const base = cn(
    "inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide whitespace-nowrap",
    sizeClasses,
    className
  );

  const styles = {
    default: {
      backgroundColor: "var(--color-bg-subtle)",
      color: "var(--color-text-secondary)",
      border: "1px solid var(--color-border)",
    },
    accent: {
      backgroundColor: "var(--color-accent-light)",
      color: "var(--color-accent)",
      border: "1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-text-secondary)",
      border: "1px solid var(--color-border-hover)",
    },
  }[variant];

  return (
    <span className={base} style={styles}>
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </span>
  );
}