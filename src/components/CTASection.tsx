"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Mail, Clock, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CTASectionProps {
  onOpenInquiry: () => void;
}

export default function CTASection({ onOpenInquiry }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".cta-anim-elem", {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#171717] text-[#F5F0E8] py-28 md:py-44 border-b border-white/10 relative overflow-hidden"
      aria-label="Call to Action"
    >
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="border-r border-white/10 h-full" />
          <div className="border-r border-white/10 h-full" />
          <div className="border-r border-white/10 h-full" />
          <div className="border-r border-white/10 h-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          {/* Eyebrow */}
          <div className="cta-anim-elem inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#D85C3F] animate-pulse" />
            <span className="eyebrow-label text-[#F5F0E8]/70">
              Initiate Collaboration // 2026 Direct Engagements
            </span>
          </div>

          {/* Large Headline */}
          <h2 className="cta-anim-elem editorial-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-[#F5F0E8] font-normal tracking-tight leading-[0.98] mb-8">
            Have a project{" "}
            <span className="editorial-italic font-normal text-[#F5F0E8]">
              in mind?
            </span>
          </h2>

          {/* Supporting Statement */}
          <p className="cta-anim-elem text-base sm:text-lg md:text-xl text-[#F5F0E8]/75 max-w-2xl font-sans font-normal leading-relaxed mb-12">
            Whether you are launching an ambitious brand identity, commissioning a cinematic 35mm shoot, or architecting next-generation 3D CGI visuals — let’s build something impossible to ignore.
          </p>

          {/* CTAs */}
          <div className="cta-anim-elem flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#BF4C32] transition-all duration-200 inline-flex items-center justify-center gap-3 shadow-lg group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <a
              href="mailto:inquiries@warlistudios.com"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-[#F5F0E8] text-xs uppercase tracking-[0.2em] font-medium hover:border-white hover:bg-white/5 transition-all duration-200 inline-flex items-center justify-center gap-3 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#D8E5D0]" />
              <span>inquiries@warlistudios.com</span>
            </a>
          </div>

          {/* Studio Principles Micro Bar */}
          <div className="cta-anim-elem mt-16 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-xs font-mono text-[#F5F0E8]/60">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#D85C3F]" />
              <span>Direct founder review within 24h</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D8E5D0]" />
              <span>Confidential NDA on initial brief</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span>Global time-zone operations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
