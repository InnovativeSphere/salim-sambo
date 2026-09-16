import type { Metadata } from "next";
import StackLayout from "@/components/layout/StackLayout";
import StackPage from "@/components/sections/StackPage";
import { stacks, getProjectsByStack } from "@/data/stack";

export const metadata: Metadata = {
  title: "Python & AI",
  description:
    "Python systems for automation, machine learning pipelines, and OpenCV-driven computer vision — including the KYC engine running on this site.",
};

export default function PythonPage() {
  const stack = stacks.python;
  const projects = getProjectsByStack("python");
  return (
    <StackLayout stackSlug="python">
      <StackPage stack={stack} projects={projects} />
    </StackLayout>
  );
}