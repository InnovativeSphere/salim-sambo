// ============================================================
// src/app/mobile/page.tsx
// ============================================================

import type { Metadata } from "next";
import StackLayout from "@/components/layout/StackLayout";
import StackPage from "@/components/sections/StackPage";
import { stackRoutes } from "@/data/content";

export const metadata: Metadata = {
  title: "Mobile",
  description:
    "Cross-platform mobile applications built with Flutter and React Native — one codebase, two platforms, no compromise on feel.",
};

export default function MobilePage() {
  const stack = stackRoutes.find((s) => s.slug === "mobile")!;
  return (
    <StackLayout stackSlug="mobile">
      <StackPage stack={stack} />
    </StackLayout>
  );
}