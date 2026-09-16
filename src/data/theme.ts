// ============================================================
// src/data/theme.ts
// DESIGN SYSTEM — colors, tokens, and per-stack accents
//
// Base palette is monochrome. Each stack route overrides the 
// accent color via CSS variables applied to a wrapper element.
// Home page uses the "default" accent (Python blue).
// ============================================================

import type { CSSProperties } from "react";

// ==========================================
// 1. BASE PALETTE
// ==========================================

export const basePalette = {
  black: "#1A1A1A",
  blackSoft: "#2D2D2D",
  greyDark: "#4A4A4A",
  greyMid: "#6B6B6B",
  greyLight: "#9A9A9A",
  greyFaint: "#E5E5E5",
  offWhite: "#FAFAFA",
  white: "#FFFFFF",
};

// ==========================================
// 2. STACK ACCENTS
// Each stack has a signature color. When a user lands on that 
// route, the accent shifts — like walking into a different room.
// ==========================================

export interface StackAccent {
  accent: string;
  accentLight: string;
  accentHover: string;
  accentText: string;
}

export const stackAccents: Record<string, StackAccent> = {
  default: {
    accent: "#3B7DD8",
    accentLight: "#E5F0FF",
    accentHover: "#2D63B0",
    accentText: "#FFFFFF",
  },
  frontend: {
    accent: "#E8A020",
    accentLight: "#FFF4E0",
    accentHover: "#C78519",
    accentText: "#1A1A1A",
  },
  backend: {
    accent: "#C0392B",
    accentLight: "#FDEDEC",
    accentHover: "#9B2C21",
    accentText: "#FFFFFF",
  },
  mobile: {
    accent: "#14B8A6",
    accentLight: "#E6FFFA",
    accentHover: "#0F9488",
    accentText: "#FFFFFF",
  },
  python: {
    accent: "#3B7DD8",
    accentLight: "#E5F0FF",
    accentHover: "#2D63B0",
    accentText: "#FFFFFF",
  },
  // Future — Research (medical AI)
  // research: {
  //   accent: "#7D3C98",
  //   accentLight: "#F4ECF7",
  //   accentHover: "#5E2D73",
  //   accentText: "#FFFFFF",
  // },
};

// ==========================================
// 3. SEMANTIC TOKENS
// ==========================================

export interface SemanticTheme {
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  bgPrimary: string;
  bgSubtle: string;
  bgInverse: string;

  borderDefault: string;
  borderHover: string;

  accent: string;
  accentLight: string;
  accentHover: string;
  accentText: string;
}

export function getTheme(stackSlug?: string): SemanticTheme {
  const accent = stackAccents[stackSlug ?? "default"] ?? stackAccents.default;

  return {
    textPrimary: basePalette.black,
    textSecondary: basePalette.greyDark,
    textMuted: basePalette.greyLight,
    textInverse: basePalette.white,

    bgPrimary: basePalette.white,
    bgSubtle: basePalette.offWhite,
    bgInverse: basePalette.black,

    borderDefault: basePalette.greyFaint,
    borderHover: basePalette.greyLight,

    accent: accent.accent,
    accentLight: accent.accentLight,
    accentHover: accent.accentHover,
    accentText: accent.accentText,
  };
}

// ==========================================
// 4. CSS VARIABLE GENERATOR
// ==========================================

export function themeToCssVars(stackSlug?: string): Record<string, string> {
  const theme = getTheme(stackSlug);
  return {
    "--color-text-primary": theme.textPrimary,
    "--color-text-secondary": theme.textSecondary,
    "--color-text-muted": theme.textMuted,
    "--color-text-inverse": theme.textInverse,

    "--color-bg-primary": theme.bgPrimary,
    "--color-bg-subtle": theme.bgSubtle,
    "--color-bg-inverse": theme.bgInverse,

    "--color-border": theme.borderDefault,
    "--color-border-hover": theme.borderHover,

    "--color-accent": theme.accent,
    "--color-accent-light": theme.accentLight,
    "--color-accent-hover": theme.accentHover,
    "--color-accent-text": theme.accentText,
  };
}

// ==========================================
// Helper: turn a theme into a React style object
// Usage: <div style={themeToCssVarsObject("python")}> ... </div>
// ==========================================

export function themeToCssVarsObject(stackSlug?: string): CSSProperties {
  return themeToCssVars(stackSlug) as CSSProperties;
}

// ==========================================
// 5. TYPOGRAPHY
// ==========================================

export const typography = {
  bodyFont: "var(--font-inter)",
  monoFont: "var(--font-jetbrains-mono)",
};

// ==========================================
// 6. SPACING SCALE
// ==========================================

export const spacingScale = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
};