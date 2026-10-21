"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { FEATURED_PROJECTS } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeaturedProjectsProps {
  onOpenInquiry: () => void;
}

export default function FeaturedProjects({ onOpenInquiry }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.from(".work-header-anim", {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      });

      // 2. Sequential Portfolio Card Reveals
      const cards = gsap.utils.toArray<HTMLElement>(".project-card-item");
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          y: 45,
          opacity: 0,
          duration: 0.95,
          delay: (index % 2) * 0.12,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-[#171717] text-[#F5F0E8] py-16 sm:py-24 md:py-36 border-b border-white/10"
      aria-label="Featured Projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 pb-8 border-b border-white/10"
        >
          <div className="max-w-2xl">
            <div className="work-header-anim flex items-center gap-3 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
              <span className="eyebrow-label text-[#F5F0E8]/60 text-xs font-mono tracking-wider">
                Selected Works // 01 — 05
              </span>
            </div>
            <h2 className="work-header-anim editorial-title text-3xl sm:text-5xl md:text-6xl text-[#F5F0E8] font-normal tracking-tight">
              Crafted with intent.{" "}
              <span className="editorial-italic font-normal">
                Impossible to ignore.
              </span>
            </h2>
          </div>

          <div className="work-header-anim flex flex-col items-start md:items-end gap-2 text-xs font-mono text-[#F5F0E8]/60 max-w-xs">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-[#D85C3F] font-semibold uppercase tracking-wider text-[10px] sm:text-xs">
              STUDIO CONCEPT STUDIES
            </span>
            <p className="text-[11px] leading-relaxed text-left md:text-right text-[#F5F0E8]/70">
              Each piece represents an uncompromising standard in live film, 3D simulation, and brand form.
            </p>
          </div>
        </div>

        {/* 
          Master 5-Card Layout:
          - Top Row: 2 cards (same size and shape)
          - Middle Row: 1 wide horizontal rectangular card (same container height on desktop)
          - Bottom Row: 2 cards (same size and shape as top 2 cards)
        */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Row 1: Top 2 Cards (Equal Size & Shape) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            <ProjectCard
              project={FEATURED_PROJECTS[0]}
              index={0}
              layoutVariant="standard"
            />
            <ProjectCard
              project={FEATURED_PROJECTS[1]}
              index={1}
              layoutVariant="standard"
            />
          </div>

          {/* Row 2: Middle Widescreen Rectangular Card */}
          <div className="w-full">
            <ProjectCard
              project={FEATURED_PROJECTS[2]}
              index={2}
              layoutVariant="wide"
            />
          </div>

          {/* Row 3: Bottom 2 Cards (Equal Size & Shape as Top 2 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            <ProjectCard
              project={FEATURED_PROJECTS[3]}
              index={3}
              layoutVariant="standard"
            />
            <ProjectCard
              project={FEATURED_PROJECTS[4]}
              index={4}
              layoutVariant="standard"
            />
          </div>
        </div>

        {/* Centered Action at Bottom: "See more work" */}
        <div className="mt-14 sm:mt-20 md:mt-28 flex flex-col items-center justify-center gap-4 sm:gap-5 text-center">
          <Link
            href="/work"
            className="px-6 py-3 rounded-full border border-white/30 text-[#F5F0E8] text-xs uppercase tracking-[0.22em] font-medium hover:bg-white hover:text-[#171717] transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer group shadow-sm hover:shadow-lg"
            aria-label="See more work"
          >
            <span>See more work</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>


        </div>
      </div>
    </section>
  );
}
