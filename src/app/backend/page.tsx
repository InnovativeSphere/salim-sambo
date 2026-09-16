// ============================================================
// src/app/backend/page.tsx
// ============================================================

import type { Metadata } from "next";
import StackLayout from "@/components/layout/StackLayout";
import StackPage from "@/components/sections/StackPage";
import { stackRoutes } from "@/data/content";

export const metadata: Metadata = {
  title: "Backend",
  description:
    "RESTful and real-time backends built with NestJS and Express, backed by PostgreSQL, MySQL, or MongoDB. Designed for clarity, testability, and scale.",
};

export default function BackendPage() {
  const stack = stackRoutes.find((s) => s.slug === "backend")!;
  return (
    <StackLayout stackSlug="backend">
      <StackPage stack={stack} />
    </StackLayout>
  );
}