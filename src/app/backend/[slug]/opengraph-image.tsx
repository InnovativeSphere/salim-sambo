// ============================================================
// src/app/python/[slug]/opengraph-image.tsx
// ============================================================

import { renderOG } from "@/lib/og";
import { getProjectBySlug, stacks, type StackSlug } from "@/data/stack";
import { stackAccents } from "@/data/theme";
const STACK_SLUG: StackSlug = "backend";
export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const stack = stacks[STACK_SLUG];
  const accent = stackAccents[STACK_SLUG]?.accent ?? "#3B7DD8";

  if (!project) {
    return renderOG({
      eyebrow: stack.label,
      title: "Project not found",
      subtitle: "Explore the rest of the work at " + stack.label + ".",
      accentColor: accent,
    });
  }

  return renderOG({
    eyebrow: stack.label,
    title: project.name,
    subtitle: project.pitch,
    accentColor: accent,
  });
}