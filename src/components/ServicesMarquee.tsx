"use client";

import React, { useState } from "react";
import {
  Video,
  Box,
  Sparkles,
  Palette,
  PackageCheck,
  Layout,
  Sparkle,
  Pause,
  Play,
} from "lucide-react";

interface MarqueeServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  metric: string;
  metricLabel: string;
  iconName: "Video" | "Box" | "Sparkles" | "Palette" | "PackageCheck" | "Layout";
  accent: string;
}

const MARQUEE_SERVICES: MarqueeServiceItem[] = [
  {
    id: "live-shoots-film-production",
    number: "01",
    title: "Live Shoots & Film Production",
    category: "Cinematography & Direction",
    tagline: "Commercial ads, narrative brand films, and sensory cinematography.",
    metric: "8K Cinema Raw",
    metricLabel: "Standard",
    iconName: "Video",
    accent: "#D85C3F",
  },
  {
    id: "3d-cgi-product-visualization",
    number: "02",
    title: "3D CGI & Product Visualization",
    category: "Spatial & Hyper-Realism",
    tagline: "Photorealistic renders, fluid physics, and exploded tech views.",
    metric: "Sub-Micron PBR",
    metricLabel: "Fidelity",
    iconName: "Box",
    accent: "#E27B58",
  },
  {
    id: "ai-content-creation",
    number: "03",
    title: "AI Content Creation",
    category: "Synthetic Generative Pipeline",
    tagline: "Custom brand LoRA models, synthetic environments, and rapid loops.",
    metric: "5x Velocity",
    metricLabel: "Speed",
    iconName: "Sparkles",
    accent: "#81B29A",
  },
  {
    id: "branding-visual-identity",
    number: "04",
    title: "Branding & Visual Identity",
    category: "Strategic Architecture",
    tagline: "Architectural typography, geometric logomarks, and complete brand OS.",
    metric: "Living Brand OS",
    metricLabel: "Deliverable",
    iconName: "Palette",
    accent: "#F2CC8F",
  },
  {
    id: "packaging-design",
    number: "05",
    title: "Packaging Design",
    category: "Structural Pack & Unboxing",
    tagline: "Tactile substrates, specialty foil dies, and shelf-dominating form.",
    metric: "+40% Visual Lift",
    metricLabel: "Impact",
    iconName: "PackageCheck",
    accent: "#E07A5F",
  },
  {
    id: "website-design-digital-experience",
    number: "06",
    title: "Website Design & Digital Experience",
    category: "Creative Engineering & WebGL",
    tagline: "High-performance Next.js flagships, kinetic motion, and headless speed.",
    metric: "99+ Lighthouse",
    metricLabel: "Score",
    iconName: "Layout",
    accent: "#3D5A80",
  },
];

interface ServicesMarqueeProps {
  onSelectService?: (serviceId: string) => void;
  onOpenInquiry?: (serviceTitle?: string) => void;
}

export default function ServicesMarquee({
  onSelectService,
  onOpenInquiry,
}: ServicesMarqueeProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPausedManually, setIsPausedManually] = useState(false);

  // Duplicate items array for continuous, seamless looping
  const repeatedServices = [...MARQUEE_SERVICES, ...MARQUEE_SERVICES];

  const renderIcon = (name: string, accent: string) => {
    const iconProps = { className: "w-4 h-4 transition-transform duration-300 group-hover:scale-110", style: { color: accent } };
    switch (name) {
      case "Video":
        return <Video {...iconProps} />;
      case "Box":
        return <Box {...iconProps} />;
      case "Sparkles":
        return <Sparkles {...iconProps} />;
      case "Palette":
        return <Palette {...iconProps} />;
      case "PackageCheck":
        return <PackageCheck {...iconProps} />;
      case "Layout":
        return <Layout {...iconProps} />;
      default:
        return <Sparkle {...iconProps} />;
    }
  };

  return (
    <div className="w-full my-12 md:my-16 relative">
      {/* Editorial Header Bar above the Marquee */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D85C3F] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D85C3F]" />
          </span>
          <span className="tracking-widest uppercase text-[#F5F0E8]/70">
            // Infinite Capabilities Stream // 6 Core Disciplines
          </span>
        </div>

        <div className="flex items-center gap-4 text-[#F5F0E8]/50 text-[11px]">
          <span className="hidden md:inline-flex items-center gap-1.5">
            <span className="text-[#D85C3F]">✦</span> Hover to pause & reveal specs
          </span>
          <button
            onClick={() => setIsPausedManually(!isPausedManually)}
            aria-label={isPausedManually ? "Resume scrolling marquee" : "Pause scrolling marquee"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer border border-white/10 text-[10px] uppercase tracking-wider"
          >
            {isPausedManually ? (
              <>
                <Play className="w-3 h-3 text-[#D85C3F]" />
                <span>Resume Stream</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-[#D85C3F]" />
                <span>Pause</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Marquee Track Container with Edge Fades */}
      <div
        className="relative w-full py-6 md:py-8 bg-gradient-to-r from-white/[0.01] via-white/[0.03] to-white/[0.01] border-y border-white/10 overflow-hidden group/marquee"
        role="region"
        aria-label="Continuous Services Carousel"
      >
        {/* Left & Right Cinematic Vignette Fades */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-[#171717] via-[#171717]/80 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-[#171717] via-[#171717]/80 to-transparent pointer-events-none z-20"
          aria-hidden="true"
        />

        {/* Scrolling Strip */}
        <div
          className={`flex items-center whitespace-nowrap will-change-transform ${isPausedManually ? "" : "animate-marquee"
            } group-hover/marquee:[animation-play-state:paused]`}
        >
          {repeatedServices.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const hasAnyHover = hoveredIndex !== null;
            const isSibling = hasAnyHover && !isHovered;

            return (
              <div
                key={`${service.id}-${index}`}
                className="inline-flex items-center"
              >
                {/* Interactive Service Pill Card */}
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (onSelectService) {
                      onSelectService(service.id);
                    } else if (onOpenInquiry) {
                      onOpenInquiry(service.title);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      if (onSelectService) onSelectService(service.id);
                    }
                  }}
                  className={`group relative mx-3 md:mx-4 px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 md:py-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none flex items-center gap-3.5 sm:gap-5 ${isHovered
                    ? "bg-gradient-to-r from-[#1f1a18] via-[#241d1a] to-[#1f1a18] border-[#D85C3F] shadow-xl shadow-[#D85C3F]/20 scale-[1.03] z-10"
                    : isSibling
                      ? "bg-white/[0.015] border-white/5 opacity-40 hover:opacity-100"
                      : "bg-white/[0.025] border-white/10 hover:border-white/20"
                    }`}
                >
                  {/* Subtle Accent Glow Ring on Hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100 ring-1 ring-[#D85C3F]/50" : "opacity-0"
                      }`}
                  />

                  {/* Left: Icon Badge */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${isHovered
                      ? "bg-[#D85C3F]/20 border-[#D85C3F]/50 rotate-3"
                      : "bg-white/5 border-white/10"
                      }`}
                  >
                    {renderIcon(service.iconName, service.accent)}
                  </div>

                  {/* Center: Service Name */}
                  <div className="flex flex-col text-left">
                    <span
                      className={`font-display text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-300 whitespace-nowrap ${isHovered
                        ? "text-white drop-shadow-[0_2px_8px_rgba(216,92,63,0.3)]"
                        : "text-[#F5F0E8]/85"
                        }`}
                    >
                      {service.title}
                    </span>

                    {/* Revealing Subtitle / Micro Category on Hover */}
                    <span
                      className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 overflow-hidden ${isHovered
                        ? "max-h-5 opacity-100 text-[#D85C3F] mt-0.5"
                        : "max-h-0 opacity-0"
                        }`}
                    >
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Minimalist Studio Delimiter Between Service Cards */}
                <div className="flex items-center gap-2 px-2 text-[#D85C3F]/40 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]/40" />
                  <span className="font-mono text-xs text-white/20">✦</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Bottom Meta Caption */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-3 flex items-center justify-between text-[11px] font-mono text-[#F5F0E8]/40">
        <span className="hidden sm:inline">
          STREAM DIRECTION: RIGHT → LEFT // CONTINUOUS LOOP
        </span>
        <span className="text-right ml-auto">
          CLICK ANY SERVICE TO INSPECT CAPABILITIES & SPECS
        </span>
      </div>
    </div>
  );
}
