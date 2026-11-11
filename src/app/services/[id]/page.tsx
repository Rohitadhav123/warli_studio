import { STUDIO_SERVICES } from "@/data/services";
import ServiceDetailClient from "./ServiceDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const instant = false;

export function generateStaticParams() {
  return STUDIO_SERVICES.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const service = STUDIO_SERVICES.find((s) => s.id === id);
  if (!service) return { title: "Discipline Not Found | Warli Studio" };

  return {
    title: `${service.title} — Disciplines | Warli Studio`,
    description: service.tagline,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = STUDIO_SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const currentIndex = STUDIO_SERVICES.findIndex((s) => s.id === id);
  const nextService =
    STUDIO_SERVICES[(currentIndex + 1) % STUDIO_SERVICES.length];
  const prevService =
    STUDIO_SERVICES[(currentIndex - 1 + STUDIO_SERVICES.length) % STUDIO_SERVICES.length];

  return (
    <ServiceDetailClient
      service={service}
      nextService={nextService}
      prevService={prevService}
    />
  );
}

