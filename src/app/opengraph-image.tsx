// ============================================================
// src/app/opengraph-image.tsx
// Default OG image — home page + any page without a specific one
// ============================================================

import { renderOG } from "@/lib/og";
import { siteConfig } from "@/data/content";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOG({
    eyebrow: "Available for freelance work",
    title: "Python Automation & KYC Systems",
    subtitle:
      "Building tools that eliminate manual work for fintechs, banks, and businesses.",
    accentColor: "#3B7DD8",
  });
}