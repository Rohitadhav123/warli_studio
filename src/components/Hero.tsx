"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, RotateCcw } from "lucide-react";
import gsap from "gsap";

// Dynamically import Three.js 3D Scene with ssr: false for optimal performance and no hydration mismatches
const HeroScene3D = dynamic(() => import("./HeroScene3D"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#1f1d1b] text-white/40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/placeholders/hero-art.svg"
        alt="Warli Studios 3D Specimen"
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-[#171717]/40 backdrop-blur-[2px] flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#F5F0E8]/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F] animate-ping" />
          <span>INITIALIZING 3D ENGINE...</span>
        </div>
      </div>
    </div>
  ),
});

interface HeroProps {
  onOpenInquiry: () => void;
}

export default function Hero({ onOpenInquiry }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const visualCardRef = useRef<HTMLDivElement>(null);
  const [sceneKey, setSceneKey] = useState(0);

  const handleScrollToWork = () => {
    const workElem = document.getElementById("work");
    if (workElem) {
      workElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetScene = () => {
    setSceneKey((prev) => prev + 1);
  };

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Simple instant opacity reveal without heavy motion
        gsap.to(".gsap-hero-anim", {
          opacity: 1,
          y: 0,
          duration: 0.1,
          stagger: 0.05,
        });
        gsap.to(visualCardRef.current, {
          opacity: 1,
          duration: 0.2,
        });
        return;
      }

      // Cinematic Editorial Master Entrance Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. Initial states
      gsap.set(".gsap-hero-anim", { opacity: 0, y: 28 });
      gsap.set(visualCardRef.current, {
        opacity: 0,
        scale: 0.94,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      });

      // 2. Coordinated Staggered Reveal
      tl.to(".gsap-hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.15,
      })
        .to(
          ".gsap-hero-title",
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power4.out",
          },
          "-=0.6"
        )
        .to(
          ".gsap-hero-sub",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.7"
        )
        .to(
          ".gsap-hero-actions",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.6"
        )
        .to(
          ".gsap-hero-ticker",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .to(
          visualCardRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          "-=1.1"
        )
        .to(
          ".gsap-hero-scroll",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert(); // GSAP Clean-up on unmount
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-[#171717] text-[#F5F0E8] flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden border-b border-white/10"
      aria-label="Hero Introduction"
    >
      {/* Background Architectural Grid Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="border-r border-white/10 h-full" />
          <div className="border-r border-white/10 h-full hidden md:block" />
          <div className="border-r border-white/10 h-full hidden md:block" />
          <div className="border-r border-white/10 h-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Studio Eyebrow Tag */}
            <div className="gsap-hero-anim gsap-hero-eyebrow flex items-center gap-3 mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
              <span className="eyebrow-label text-[#F5F0E8]/70">
                Independent Creative Production & Brand Design
              </span>
            </div>

            {/* Oversized Headline */}
            <h1 className="gsap-hero-anim gsap-hero-title editorial-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#F5F0E8] font-normal tracking-[-0.03em] leading-[0.96] mb-8">
              Make Your Brand{" "}
              <span className="editorial-italic font-normal text-[#F5F0E8]">
                Impossible
              </span>{" "}
              to{" "}
              <span className="text-[#D85C3F] relative inline-block">
                Ignore.
              </span>
            </h1>

            {/* Subline */}
            <p className="gsap-hero-anim gsap-hero-sub text-base sm:text-lg md:text-xl text-[#F5F0E8]/80 max-w-xl font-normal leading-relaxed mb-10 font-sans">
              A creative studio for live production, 3D CGI, AI-powered content,
              branding and packaging.
            </p>

            {/* Two CTAs */}
            <div className="gsap-hero-anim gsap-hero-actions flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={handleScrollToWork}
                className="px-7 py-3.5 rounded-full bg-white text-[#171717] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#F5F0E8] transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F]"
              >
                <span>View Our Work</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenInquiry}
                className="px-7 py-3.5 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#BF4C32] transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Studio Capabilities Micro Ticker */}
            <div className="gsap-hero-anim gsap-hero-ticker mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-[#F5F0E8]/50">
              <span>01 FILM & LIVE</span>
              <span>•</span>
              <span>02 3D HYPER-CGI</span>
              <span>•</span>
              <span>03 AI SYNTHESIS</span>
              <span>•</span>
              <span>04 IDENTITY</span>
              <span>•</span>
              <span>05 PACKAGING</span>
            </div>
          </div>

          {/* Right Column: Cinematic Art-Directed 3D Visual Area (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div
              ref={visualCardRef}
              className="relative w-full max-w-[480px] aspect-[4/5] rounded-sm overflow-hidden border border-white/15 bg-[#171717] shadow-2xl group transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(216,92,63,0.15)]"
            >
              {/* Interactive Three.js R3F Canvas */}
              <div className="absolute inset-0 z-10">
                <HeroScene3D key={sceneKey} />
              </div>

              {/* Fine Editorial Corner Coordinates Overlaid (Non-blocking) */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#D85C3F] animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-[#F5F0E8]/80 uppercase">
                  WARLI 3D // SPECIMEN 01
                </span>
              </div>

              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={handleResetScene}
                  title="Reset 3D Perspective"
                  className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-black/60 transition-colors cursor-pointer"
                  aria-label="Reset 3D Perspective"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest text-[#F5F0E8]/60">
                  REF: CINEMA // CGI // AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="gsap-hero-anim gsap-hero-scroll relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 flex items-center justify-between text-xs text-[#F5F0E8]/50 font-mono">
        <button
          onClick={handleScrollToWork}
          className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll down to featured projects"
        >
          <span className="w-4 h-[1px] bg-[#D85C3F] group-hover:w-8 transition-all" />
          <span className="uppercase tracking-[0.2em] text-[11px]">
            Scroll to explore
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>

        <div className="hidden sm:flex items-center gap-4 text-[11px] uppercase tracking-wider">
          <span>Operating Globally</span>
          <span>{"//"}</span>
          <span>Est. 2026</span>
        </div>
      </div>
    </section>
  );
}
