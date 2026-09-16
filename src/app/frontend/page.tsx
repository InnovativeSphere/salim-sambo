// ============================================================
// src/app/frontend/page.tsx
// ============================================================

import type { Metadata } from "next";
import StackLayout from "@/components/layout/StackLayout";
import StackPage from "@/components/sections/StackPage";
import { stackRoutes } from "@/data/content";

export const metadata: Metadata = {
  title: "Frontend",
  description:
    "React and Next.js applications built with attention to detail — clean component architecture, smooth interactions, and designs that don't get in the way of the work.",
};

export default function FrontendPage() {
  const stack = stackRoutes.find((s) => s.slug === "frontend")!;
  return (
    <StackLayout stackSlug="frontend">
      <StackPage stack={stack} />
    </StackLayout>
  );
}