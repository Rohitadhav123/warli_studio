"use client";

import React, { useState, useEffect, useRef } from "react";
import { STUDIO_SERVICES } from "@/data/services";
import { ArrowUpRight, Film, Box, Cpu, PenTool, Package } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesListProps {
  onOpenInquiry: (selectedService?: string) => void;
}

// Custom visual spec data for each service
const SERVICE_VISUAL_IDENTITY: Record<
  string,
  {
    icon: typeof Film;
    badge: string;
    techSpec: string;
    accentColor: string;
    renderSpecimen: () => React.ReactNode;
  }
> = {
  "live-shoots": {
    icon: Film,
    badge: "CINEMA OPTICS // 35MM GRAIN",
    techSpec: "ARRI LF // 4K DCI 2.39:1 // 24 FPS",
    accentColor: "#D85C3F",
    renderSpecimen: () => (
      <div className="relative w-full h-full min-h-[260px] bg-[#0f0e0d] border border-white/10 rounded-sm p-6 flex flex-col justify-between overflow-hidden group">
        {/* Film Viewfinder Crosshairs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/10" />
          <div className="absolute top-4 bottom-4 left-1/2 w-[1px] bg-white/10" />
          <div className="absolute inset-8 border border-white/15 rounded-sm" />
          {/* Lens focus markers */}
          <div className="absolute top-8 left-8 w-3 h-3 border-t-2 border-l-2 border-[#D85C3F]" />
          <div className="absolute top-8 right-8 w-3 h-3 border-t-2 border-r-2 border-[#D85C3F]" />
          <div className="absolute bottom-8 left-8 w-3 h-3 border-b-2 border-l-2 border-[#D85C3F]" />
          <div className="absolute bottom-8 right-8 w-3 h-3 border-b-2 border-r-2 border-[#D85C3F]" />
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
          <span className="flex items-center gap-1.5 text-[#D85C3F]">
            <span className="w-2 h-2 rounded-full bg-[#D85C3F] animate-pulse" />
            REC 00:14:28:06
          </span>
          <span>SHUTTER 1/48 // 800 ISO</span>
        </div>

        <div className="relative z-10 text-center py-8">
          <span className="font-serif italic text-3xl md:text-4xl text-[#F5F0E8] block mb-2">
            Chiaroscuro & Motion
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D8E5D0]">
            Tabletop & Macro Direction
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/10 pt-3">
          <span>COOKE ANAMORPHIC /i</span>
          <span>ACES COLOR MATRIX</span>
        </div>
      </div>
    ),
  },
  "3d-cgi": {
    icon: Box,
    badge: "SUB-D // OCTANE RAYTRACING",
    techSpec: "14.2M QUADS // 8K UDIM // PBR",
    accentColor: "#D8E5D0",
    renderSpecimen: () => (
      <div className="relative w-full h-full min-h-[260px] bg-[#0f0e0d] border border-white/10 rounded-sm p-6 flex flex-col justify-between overflow-hidden">
        {/* 3D Wireframe Perspective Mesh */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D8E5D0_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
          <span className="text-[#D8E5D0]">VIEWPORT: PERSPECTIVE (RAYTRACED)</span>
          <span>SAMPLES: 4096 / PT</span>
        </div>

        <div className="relative z-10 text-center py-8">
          <div className="inline-block relative">
            <span className="font-serif text-3xl md:text-4xl text-[#F5F0E8] block mb-2">
              Micro-Displacement
            </span>
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#D8E5D0] to-transparent" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60 block mt-2">
            Kinetic Mechanical Exploded Loops
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/10 pt-3">
          <span>ANISOTROPIC SHADING</span>
          <span>BVH ACCELERATED</span>
        </div>
      </div>
    ),
  },
  "ai-content": {
    icon: Cpu,
    badge: "SYNTHESIS // HYBRID RETOUCH",
    techSpec: "CUSTOM LORA // 0.82 CFG // 12K RAW",
    accentColor: "#D85C3F",
    renderSpecimen: () => (
      <div className="relative w-full h-full min-h-[260px] bg-[#0f0e0d] border border-white/10 rounded-sm p-6 flex flex-col justify-between overflow-hidden">
        {/* Neural Node Grid Lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-dashed border-[#D85C3F] animate-spin [animation-duration:30s]" />
          <div className="absolute w-32 h-32 rounded-full border border-white/30" />
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
          <span className="text-[#D85C3F]">LATENT DIFFUSION // FINE-TUNED</span>
          <span>STEPS: 50 // DENOISE: 0.35</span>
        </div>

        <div className="relative z-10 text-center py-8">
          <span className="font-serif italic text-3xl md:text-4xl text-[#F5F0E8] block mb-2">
            Algorithmic Worldbuilding
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D8E5D0]">
            Senior Human Finishing & Retouch
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/10 pt-3">
          <span>ZERO-COMPROMISE ETHICS</span>
          <span>16-BIT COMPOSITING</span>
        </div>
      </div>
    ),
  },
  "branding-identity": {
    icon: PenTool,
    badge: "BESPOKE MONOGRAM // GRID SYSTEM",
    techSpec: "RATIO 1:1.618 // VECTOR PRECISION",
    accentColor: "#F5F0E8",
    renderSpecimen: () => (
      <div className="relative w-full h-full min-h-[260px] bg-[#0f0e0d] border border-white/10 rounded-sm p-6 flex flex-col justify-between overflow-hidden">
        {/* Typographic baseline and grid markers */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full grid grid-cols-6 grid-rows-4 divide-x divide-y divide-white/20" />
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
          <span>ANATOMY: CAP-HEIGHT 720</span>
          <span>SWATCH: IVORY / TERRACOTTA</span>
        </div>

        <div className="relative z-10 text-center py-6">
          <div className="font-serif text-5xl md:text-6xl text-[#F5F0E8] tracking-widest mb-1">
            W·S
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
            Enduring Visual Architecture
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/10 pt-3">
          <span>GOLDEN SECTION RULES</span>
          <span>MULTI-CHANNEL GOVERNANCE</span>
        </div>
      </div>
    ),
  },
  "packaging-design": {
    icon: Package,
    badge: "STRUCTURAL DIELINE // TACTILE",
    techSpec: "100% PLASTIC-FREE // HOT FOIL DEBOSS",
    accentColor: "#D85C3F",
    renderSpecimen: () => (
      <div className="relative w-full h-full min-h-[260px] bg-[#0f0e0d] border border-white/10 rounded-sm p-6 flex flex-col justify-between overflow-hidden">
        {/* Dieline Fold Guides */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-6 border border-dashed border-[#D85C3F]/40" />
          <div className="absolute top-1/3 left-6 right-6 border-b border-white/10" />
          <div className="absolute top-2/3 left-6 right-6 border-b border-white/10" />
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
          <span className="text-[#D85C3F]">DIELINE: RIGID SLIPCASE SPEC</span>
          <span>SUBSTRATE: 140GSM COTTON</span>
        </div>

        <div className="relative z-10 text-center py-8">
          <span className="font-serif italic text-3xl md:text-4xl text-[#F5F0E8] block mb-2">
            Sensorial Unboxing
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D8E5D0]">
            Sculptural Ceramic & Foil Craft
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/40 border-t border-white/10 pt-3">
          <span>PRESS-CHECK READY</span>
          <span>FSC CERTIFIED FIBERS</span>
        </div>
      </div>
    ),
  },
};

export default function ServicesList({ onOpenInquiry }: ServicesListProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".services-header-anim", {
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

      gsap.from(".service-row-item", {
        scrollTrigger: {
          trigger: ".services-list-container",
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

  const activeService = STUDIO_SERVICES[activeIndex];
  const activeIdentity =
    SERVICE_VISUAL_IDENTITY[activeService.id] ||
    SERVICE_VISUAL_IDENTITY["live-shoots"];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#171717] text-[#F5F0E8] py-24 md:py-36 border-b border-white/10"
      aria-label="Studio Services"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10"
        >
          <div>
            <div className="services-header-anim flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
              <span className="eyebrow-label text-[#F5F0E8]/60">
                Core Disciplines // 01 — 05
              </span>
            </div>
            <h2 className="services-header-anim editorial-title text-4xl sm:text-5xl md:text-6xl text-[#F5F0E8] font-normal tracking-tight">
              Integrated capabilities,{" "}
              <span className="editorial-italic font-normal">
                singular execution.
              </span>
            </h2>
          </div>

          <p className="services-header-anim text-sm md:text-base text-[#F5F0E8]/70 max-w-md font-sans leading-relaxed">
            From live sets to generative synthesis, we bridge physical production and digital frontier design without fractured handoffs.
          </p>
        </div>

        {/* Master Services Layout: Interactive Service Navigation with Dynamic Specimen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Numbered Services List (7 cols) */}
          <div className="services-list-container lg:col-span-7 divide-y divide-white/10" role="list">
            {STUDIO_SERVICES.map((service, idx) => {
              const isCurrent = activeIndex === idx;

              return (
                <div
                  key={service.id}
                  role="listitem"
                  tabIndex={0}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }
                  }}
                  className={`service-row-item group py-7 md:py-9 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D85C3F] px-4 -mx-4 rounded-sm ${
                    isCurrent ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-6 md:gap-8 flex-1">
                      <span
                        className={`font-mono text-sm md:text-base transition-colors ${
                          isCurrent ? "text-[#D85C3F] font-bold" : "text-[#F5F0E8]/40"
                        }`}
                      >
                        {service.number}
                      </span>

                      <div>
                        <h3
                          className={`font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight transition-colors ${
                            isCurrent
                              ? "text-[#F5F0E8]"
                              : "text-[#F5F0E8]/70 group-hover:text-white"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#F5F0E8]/60 mt-1 line-clamp-1 font-sans">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isCurrent
                          ? "border-[#D85C3F] bg-[#D85C3F] text-white rotate-0 shadow-[0_4px_16px_rgba(216,92,63,0.3)]"
                          : "border-white/20 text-white/50 group-hover:border-white/50 group-hover:text-white"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Distinctive Art-Directed Interactive Specimen Display (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 hidden lg:block">
            <div className="rounded-sm border border-white/15 bg-[#141312] p-6 shadow-2xl space-y-6">
              {/* Header with Active Service Details */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-[#D85C3F] font-semibold tracking-wider">
                  DISCIPLINE SPECIMEN // {activeService.number}
                </span>
                <span className="text-white/60">
                  {activeIdentity.techSpec}
                </span>
              </div>

              {/* Render Distinctive Visual Specimen */}
              <div className="transition-all duration-500 ease-out">
                {activeIdentity.renderSpecimen()}
              </div>

              {/* Description & Output Pills */}
              <div className="space-y-4">
                <p className="text-sm text-[#F5F0E8]/85 font-sans leading-relaxed">
                  {activeService.shortDescription}
                </p>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8E5D0]">
                    Core Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeService.deliverables.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-white/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenInquiry(activeService.title)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#BF4C32] transition-colors cursor-pointer"
                >
                  <span>Inquire About {activeService.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
