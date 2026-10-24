"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface StudioIntroductionProps {
  onOpenInquiry: () => void;
}

export default function StudioIntroduction({
  onOpenInquiry,
}: StudioIntroductionProps) {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="about"
      className="bg-[#171717] text-[#F5F0E8] py-24 md:py-32 border-b border-white/10 overflow-hidden"
      aria-label="Studio Introduction and Philosophy"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
          <span className="eyebrow-label text-[#F5F0E8]/60">
            Studio Manifesto // Point of View
          </span>
        </div>

        {/* Big Editorial Pull-Quote Statement */}
        <div className="max-w-5xl mb-12 md:mb-16">
          <blockquote className="editorial-title text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-[#F5F0E8] font-normal tracking-tight leading-[1.08]">
            “We combine{" "}
            <span className="editorial-italic font-normal text-[#D85C3F]">
              original ideas
            </span>{" "}
            with thoughtful, obsessive execution across live action, 3D CGI,
            AI-assisted creation, and graphic design — engineering work that
            commands attention in a noisy world.”
          </blockquote>
        </div>

        {/* Studio Specs Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-mono text-[#F5F0E8]/60">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <span>STUDIO STRUCTURE: INDEPENDENT</span>
            <span>ENGAGEMENTS: DIRECT-TO-FOUNDER & BRAND LEAD</span>
          </div>

          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#F5F0E8] hover:text-[#D85C3F] transition-colors cursor-pointer group"
          >
            <span>Learn About Studio Engagements</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
