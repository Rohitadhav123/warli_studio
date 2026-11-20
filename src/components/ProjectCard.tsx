"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
  layoutVariant?: "standard" | "wide";
}

export default function ProjectCard({
  project,
  index,
  className = "",
  layoutVariant = "standard",
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isWide = layoutVariant === "wide";

  return (
    <article
      className={`project-card-item group relative flex flex-col justify-between ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/work/${project.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] rounded-sm group/link cursor-pointer"
        aria-label={`View case study for ${project.title}: ${project.subtitle}`}
      >
        {/* Visual Container with Sleek, Reduced Height */}
        <div className={`relative w-full overflow-hidden rounded-[2px] bg-[#171512] border border-white/10 ${isWide ? "h-[260px] sm:h-[340px] lg:h-[430px]" : "h-[240px] sm:h-[300px] lg:h-[360px]"}`}>
          {/* Inner Image with Smooth Subtle Scale */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={project.imageSrc}
              alt={project.altText}
              fill
              sizes={
                isWide
                  ? "(max-width: 768px) 100vw, 1200px"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              }
              className={`object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.035] group-hover:saturate-[1.08] will-change-transform ${isWide ? "object-center" : project.aspectRatio === "portrait" ? "object-[center_42%]" : "object-center"}`}
              priority={index < 2}
            />
          </div>

          {/* Subtle Dark Gradient Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none transition-opacity duration-300 group-hover:opacity-85" />





          {/* Floating Reveal Arrow: persistent on mobile touch, animated on desktop hover */}
          <div
            className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center transition-all duration-300 shadow-xl ${
              isHovered
                ? "opacity-100 scale-100 translate-y-0 shadow-[0_8px_25px_rgba(216,92,63,0.4)]"
                : "opacity-85 sm:opacity-0 scale-95 sm:scale-90 translate-y-0 sm:translate-y-2"
            }`}
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </div>
        </div>

        {/* Editorial Information Beneath Image */}
        <div className="pt-3.5 sm:pt-4 pb-2 flex flex-col gap-1 sm:gap-1.5">

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-1.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.18em] text-[#F5F3EF]/45">
                {project.category} <span className="px-1 text-[#FF5A1F]">/</span> {project.year}
              </p>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F5F0E8] tracking-tight group-hover:text-[#FF7847] transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#F5F3EF]/55 leading-relaxed">
                {project.subtitle}
              </p>
            </div>
            <span className="mt-1 hidden sm:inline-flex shrink-0 items-center rounded-full border border-[#FF5A1F]/35 bg-[#FF5A1F]/[0.08] px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.12em] text-[#FF7847]">
              Concept
            </span>
          </div>

          {/* Deliverables Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.deliverables.slice(0, 3).map((item) => (
              <span
                key={item}
                className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-white/5 text-[#F5F0E8]/70 border border-white/10"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
