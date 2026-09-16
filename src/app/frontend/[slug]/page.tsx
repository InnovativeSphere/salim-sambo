import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StackLayout from "@/components/layout/StackLayout";
import ProjectHero from "@/components/sections/ProjectHero";
import ProjectMetrics from "@/components/sections/ProjectMetrics";
import ProjectDetail from "@/components/sections/ProjectDetail";
import ProjectPairs from "@/components/sections/ProjectPairs";
import ProjectNavigation from "@/components/sections/ProjectNavigation";
import {
  getProjectBySlug,
  getProjectsByStack,
} from "@/data/stack";

const STACK_SLUG = "frontend" as const;
const STACK_LABEL = "Frontend";

export async function generateStaticParams() {
  return getProjectsByStack(STACK_SLUG).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (
    !project ||
    (project.stack !== STACK_SLUG &&
      !project.crossStack?.includes(STACK_SLUG))
  ) {
    return { title: "Project not found" };
  }

  return {
    title: project.name,
    description: project.pitch,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const isInStack =
    project &&
    (project.stack === STACK_SLUG ||
      project.crossStack?.includes(STACK_SLUG));

  if (!project || !isInStack) notFound();

  // Siblings for prev/next (own stack only)
  const siblings = getProjectsByStack(STACK_SLUG).filter(
    (p) => p.stack === STACK_SLUG
  );

  // Index of current project within siblings (own stack)
  const index = siblings.findIndex((p) => p.slug === project.slug);

  return (
    <StackLayout stackSlug={STACK_SLUG}>
      <ProjectHero
        project={project}
        stackSlug={STACK_SLUG}
        stackLabel={STACK_LABEL}
        index={index >= 0 ? index : undefined}
        total={siblings.length}
      />
      <ProjectMetrics metrics={project.metrics} />
      <ProjectDetail project={project} />
      <ProjectPairs project={project} />
      <ProjectNavigation
        current={project}
        siblings={siblings}
        stackSlug={STACK_SLUG}
      />
    </StackLayout>
  );
}