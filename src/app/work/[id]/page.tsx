import { FEATURED_PROJECTS } from "@/data/projects";
import CaseStudyClient from "./CaseStudyClient";
import { notFound } from "next/navigation";

export const instant = false;

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <CaseStudyClient project={project} />;
}
