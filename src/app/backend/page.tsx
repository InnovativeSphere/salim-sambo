import type { Metadata } from "next";
import StackLayout from "@/components/layout/StackLayout";
import StackPage from "@/components/sections/StackPage";
import { stacks, getProjectsByStack } from "@/data/stack";

export const metadata: Metadata = {
  title: "Backend",
  description:
    "RESTful and real-time backends built with NestJS and Express, backed by PostgreSQL, MySQL, or MongoDB. Designed for clarity, testability, and scale.",
};

export default function BackendPage() {
  const stack = stacks.backend;
  const projects = getProjectsByStack("backend");
  return (
    <StackLayout stackSlug="backend">
      <StackPage stack={stack} projects={projects} />
    </StackLayout>
  );
}