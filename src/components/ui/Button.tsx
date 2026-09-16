// ============================================================
// src/components/ui/Button.tsx
// Reusable button — variants: primary, secondary, ghost
// Renders as <a> if href is provided, otherwise <button>
// ============================================================

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  external = false,
  disabled = false,
  type = "button",
}: ButtonProps) {
  // Base classes shared across all variants
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium",
    "transition-all duration-300 ease-out cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    disabled && "opacity-50 pointer-events-none",
    sizeClasses[size],
    className
  );

  // Variant-specific styles
  const variantStyles = {
    primary: {
      backgroundColor: "var(--color-accent)",
      color: "var(--color-accent-text)",
      boxShadow: "0 4px 14px color-mix(in srgb, var(--color-accent) 25%, transparent)",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "var(--color-text-primary)",
      border: "1.5px solid var(--color-border-hover)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--color-text-secondary)",
    },
  }[variant];

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (variant === "primary") {
      el.style.backgroundColor = "var(--color-accent-hover)";
      el.style.transform = "translateY(-2px)";
      el.style.boxShadow = "0 8px 20px color-mix(in srgb, var(--color-accent) 35%, transparent)";
    } else if (variant === "secondary") {
      el.style.borderColor = "var(--color-accent)";
      el.style.color = "var(--color-accent)";
    } else {
      el.style.color = "var(--color-text-primary)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (variant === "primary") {
      el.style.backgroundColor = "var(--color-accent)";
      el.style.transform = "translateY(0)";
      el.style.boxShadow = "0 4px 14px color-mix(in srgb, var(--color-accent) 25%, transparent)";
    } else if (variant === "secondary") {
      el.style.borderColor = "var(--color-border-hover)";
      el.style.color = "var(--color-text-primary)";
    } else {
      el.style.color = "var(--color-text-secondary)";
    }
  };

  // Render as link
  if (href) {
    return (
      <Link
        href={href}
        className={base}
        style={variantStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={onClick}
      className={base}
      style={variantStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {children}
    </button>
  );
}