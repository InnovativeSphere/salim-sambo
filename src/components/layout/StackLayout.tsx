// ============================================================
// src/components/layout/StackLayout.tsx
// Wraps stack route content with the correct accent theme
// ============================================================

"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { themeToCssVarsObject } from "@/data/theme";

interface StackLayoutProps {
  stackSlug: string;
  children: React.ReactNode;
}

export default function StackLayout({ stackSlug, children }: StackLayoutProps) {
  return (
    <div style={themeToCssVarsObject(stackSlug)}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}