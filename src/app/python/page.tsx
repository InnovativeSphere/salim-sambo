// ============================================================
// src/app/python/page.tsx
// ============================================================

import type { Metadata } from "next";
import StackLayout from "@/components/layout/StackLayout";
import StackPage from "@/components/sections/StackPage";
import { stackRoutes } from "@/data/content";

export const metadata: Metadata = {
  title: "Python & AI",
  description:
    "Python systems for automation, machine learning pipelines, and OpenCV-driven computer vision — including the KYC engine running on this site.",
};

export default function PythonPage() {
  const stack = stackRoutes.find((s) => s.slug === "python")!;
  return (
    <StackLayout stackSlug="python">
      <StackPage stack={stack} />
    </StackLayout>
  );
}