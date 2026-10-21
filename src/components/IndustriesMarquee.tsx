"use client";

import React, { useState, useEffect, useRef } from "react";
import { TARGET_INDUSTRIES } from "@/data/industries";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface IndustriesProps {
  onOpenInquiry: (industry?: string) => void;
}

export default function IndustriesMarquee({ onOpenInquiry }: IndustriesProps) {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Duplicate the industry array for a seamless marquee loop
  const marqueeItems = [...TARGET_INDUSTRIES, ...TARGET_INDUSTRIES];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".marquee-header-anim", {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".industry-card-anim", {
        scrollTrigger: {
          trigger: ".industries-grid",
          start: "top 85%",
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#171717] text-[#F5F0E8] py-24 md:py-36 border-b border-white/10 overflow-hidden"
      aria-label="Industries We Aim To Work With"
    >
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-12 md:mb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="marquee-header-anim flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
              <span className="eyebrow-label text-[#F5F0E8]/60">
                Strategic Sectors // Ambition
              </span>
            </div>
            <h2 className="marquee-header-anim editorial-title text-4xl sm:text-5xl md:text-6xl text-[#F5F0E8] font-normal tracking-tight">
              Industries we aim to{" "}
              <span className="editorial-italic font-normal text-[#D85C3F]">
                work with.
              </span>
            </h2>
          </div>

          <p className="marquee-header-anim text-sm text-[#F5F0E8]/70 max-w-sm font-sans leading-relaxed">
            We partner with visionary founders, category disruptors, and luxury houses that value uncompromising brand distinction.
          </p>
        </div>
      </div>

      {/* Elegant Typographic Marquee Banner */}
      <div className="relative w-full py-6 bg-white/[0.02] border-y border-white/10 overflow-hidden mb-16">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="inline-flex items-center gap-8 md:gap-14 mx-4 md:mx-7 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#F5F0E8]/75 hover:text-white transition-colors"
            >
              <span>{item.name}</span>
              <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
            </div>
          ))}
        </div>
      </div>

      {/* Curated Editorial Industry Matrix */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="industries-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TARGET_INDUSTRIES.map((industry) => {
            const isHovered = activeIndustry === industry.code;

            return (
              <div
                key={industry.code}
                onMouseEnter={() => setActiveIndustry(industry.code)}
                onMouseLeave={() => setActiveIndustry(null)}
                onClick={() => onOpenInquiry(industry.name)}
                className={`industry-card-anim group p-6 rounded-sm border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isHovered
                    ? "border-[#D85C3F] bg-white/[0.06] shadow-lg shadow-[#D85C3F]/5"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/40 pb-4 border-b border-white/10 mb-4">
                    <span className="text-[#D85C3F] font-semibold">{industry.code}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-[#D85C3F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="font-serif text-2xl text-[#F5F0E8] group-hover:text-white transition-colors mb-3">
                    {industry.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#F5F0E8]/70 font-sans leading-relaxed">
                    {industry.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#D8E5D0]">
                  <span>Inquire Sector Fit</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Note Respecting Content Rule */}
        <div className="mt-12 text-center text-xs font-mono text-[#F5F0E8]/50">
          <span>* Dedicated studio production pipelines tailored to physical goods, luxury lifestyle, and digital venture horizons.</span>
        </div>
      </div>
    </section>
  );
}
