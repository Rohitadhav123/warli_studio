"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StudioIntroductionProps {
  onOpenInquiry: () => void;
}

const PILLARS = [
  {
    num: "01",
    tag: "SYNTHESIS",
    title: "The Cross-Discipline Engine",
    description:
      "Traditional studios compartmentalize live film crews, digital CGI artists, and identity designers. We operate as an integrated unit, allowing ideas to flow seamlessly between physical cameras and digital frontiers.",
    highlight: "Zero handoff loss between physical sets and 3D simulation.",
    icon: Compass,
  },
  {
    num: "02",
    tag: "INTELLIGENCE",
    title: "Art-Directed AI Rigor",
    description:
      "We reject uncurated generative clichés. AI in our studio is treated as an optical lens: calibrated through proprietary fine-tuning, guided by senior directors, and finished with master-level human retouching.",
    highlight: "Proprietary fine-tuned LoRA models guided by master retouchers.",
    icon: Sparkles,
  },
  {
    num: "03",
    tag: "TACTILITY",
    title: "Material Longevity",
    description:
      "From the weight of a debossed ceramic vessel in hands to the micro-texture of a watch dial on an 8K display, we build sensorial brand artifacts designed to outlive ephemeral digital trends.",
    highlight: "Sensorial physical artifacts built to endure beyond trend cycles.",
    icon: ShieldCheck,
  },
];

export default function StudioIntroduction({
  onOpenInquiry,
}: StudioIntroductionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || isMobile) {
      return;
    }

    const ctx = gsap.context(() => {
      // Pinned Storytelling Timeline for Desktop
      const pinTrigger = ScrollTrigger.create({
        trigger: pinSectionRef.current,
        start: "top top+=80",
        end: "+=1200",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) {
            setActivePillarIndex(0);
          } else if (progress < 0.66) {
            setActivePillarIndex(1);
          } else {
            setActivePillarIndex(2);
          }
        },
      });

      return () => {
        pinTrigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="bg-[#171717] text-[#F5F0E8] py-28 md:py-36 border-b border-white/10 overflow-hidden"
      aria-label="Studio Introduction and Philosophy"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 md:mb-12">
          <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
          <span className="eyebrow-label text-[#F5F0E8]/60">
            Studio Manifesto // Point of View
          </span>
        </div>

        {/* Big Editorial Pull-Quote Statement */}
        <div className="max-w-5xl mb-16 md:mb-20">
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

        {/* Pinned Cinematic Pillar Storytelling Module */}
        <div ref={pinSectionRef} className="pt-6 border-t border-white/10">
          {/* Top Progress Bar for Pinned scrub */}
          <div className="hidden lg:flex items-center justify-between pb-6 mb-8 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-6">
              <span className="text-[#D85C3F] font-bold">
                CORE PILLARS SEQUENCE
              </span>
              <span className="text-[#F5F0E8]/50">
                ACTIVE FOCUS: 0{activePillarIndex + 1} {"//"} 03
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activePillarIndex === idx
                      ? "w-12 bg-[#D85C3F]"
                      : "w-4 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Pillars Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {PILLARS.map((pillar, idx) => {
              const isSelected = activePillarIndex === idx;
              const IconComp = pillar.icon;

              return (
                <div
                  key={pillar.num}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`p-6 sm:p-8 rounded-sm border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#201e1d] border-white/40 shadow-2xl ring-1 ring-white/10 -translate-y-1"
                      : "bg-[#141414] border-white/10 opacity-75 hover:opacity-100 hover:border-white/30"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-white/10">
                      <span className="font-bold text-[#D85C3F]">
                        PILLAR // {pillar.num}
                      </span>
                      <span className="text-[#F5F0E8]/50 uppercase tracking-widest text-[10px]">
                        {pillar.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#D85C3F] text-white"
                            : "bg-white/5 text-[#F5F0E8]/70"
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-2xl text-[#F5F0E8] tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#F5F0E8]/75 leading-relaxed font-sans pt-1">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-xs font-mono text-[#D85C3F] leading-snug">
                      ★ {pillar.highlight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Studio Specs Row */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-mono text-[#F5F0E8]/60">
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
