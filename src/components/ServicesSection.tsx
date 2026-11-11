"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Video,
  Box,
  Sparkles,
  Palette,
  PackageCheck,
  Layout,
  ArrowRight,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { STUDIO_SERVICES } from "@/data/services";
import ServicesMarquee from "@/components/ServicesMarquee";

interface ServicesSectionProps {
  onOpenInquiry: (serviceTitle?: string) => void;
  showAllInitially?: boolean;
  showMarquee?: boolean;
}

export default function ServicesSection({
  onOpenInquiry,
  showMarquee = true,
}: ServicesSectionProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredServices = STUDIO_SERVICES.filter((srv) => {
    if (filter === "all") return true;
    if (filter === "film-3d") return srv.filterCategory === "production" || srv.filterCategory === "3d";
    if (filter === "design") return srv.filterCategory === "design";
    if (filter === "digital-ai") return srv.filterCategory === "digital" || srv.filterCategory === "ai";
    return true;
  });

  const renderIcon = (
    iconName: string,
    className: string = "w-5 h-5 text-[#D85C3F]"
  ) => {
    const props = { className };
    switch (iconName) {
      case "Video":
        return <Video {...props} />;
      case "Box":
        return <Box {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "Palette":
        return <Palette {...props} />;
      case "PackageCheck":
        return <PackageCheck {...props} />;
      case "Layout":
        return <Layout {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section
      id="services"
      className="bg-[#171717] text-[#F5F0E8] py-20 md:py-28 border-b border-white/10 relative overflow-hidden"
      aria-label="Studio Services & Capabilities"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#D85C3F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#D85C3F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
          <span className="eyebrow-label text-[#F5F0E8]/70 text-xs font-mono tracking-widest uppercase">
            Our Disciplines
          </span>
        </div>

        {/* Section Title & Description */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F5F0E8] leading-[1.08]">
              Tailored craft for{" "}
              <span className="editorial-italic font-normal text-[#D85C3F]">
                uncompromising
              </span>{" "}
              brands.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F5F0E8]/70 max-w-2xl font-sans leading-relaxed">
              From cinematic film and photorealistic 3D to tactile packaging, brand systems, and bespoke digital worlds — every discipline is guided by dedicated art direction.
            </p>
          </div>

          {/* Custom Inquire Action */}
          <div className="shrink-0">
            <button
              onClick={() => onOpenInquiry()}
              className="px-5 py-2.5 rounded-full border border-white/20 text-xs uppercase font-mono tracking-wider font-semibold hover:border-[#D85C3F] hover:bg-[#D85C3F]/10 transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#D85C3F]" />
            </button>
          </div>
        </div>

        {/* Filter Navigation Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-white/10 mb-10">
          {[
            { id: "all", label: "All Disciplines" },
            { id: "film-3d", label: "Film & 3D CGI" },
            { id: "design", label: "Brand & Packaging" },
            { id: "digital-ai", label: "Digital & AI" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all tracking-wider whitespace-nowrap cursor-pointer ${
                filter === tab.id
                  ? "bg-[#D85C3F] text-white font-medium shadow-sm"
                  : "bg-white/5 text-[#F5F0E8]/70 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services High-Impact Grid (Direct Link to Dedicated Page - No Popup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group relative bg-[#1c1c1c] border border-white/10 hover:border-[#D85C3F]/70 rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[360px] transition-all duration-300 hover:shadow-xl hover:shadow-[#D85C3F]/10 hover:-translate-y-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F] overflow-hidden block"
            >
              {/* Dynamic Subtle Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D85C3F]/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Card Top: Number, Category Tag, Title & Icon */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#D85C3F]">
                      {service.number}
                    </span>
                    <span className="text-[#F5F0E8]/30 text-xs">/</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#F5F0E8]/60">
                      {service.category}
                    </span>
                  </div>

                  <div className="w-9 h-9 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#D85C3F] group-hover:border-[#D85C3F] transition-all">
                    {renderIcon(service.iconName, "w-4 h-4 text-[#D85C3F] group-hover:text-white transition-colors")}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-[#F5F0E8] group-hover:text-white transition-colors leading-snug mb-3">
                  {service.title}
                </h3>

                {/* Card Tagline */}
                <p className="text-sm text-[#F5F0E8]/70 leading-relaxed font-sans mb-5">
                  {service.tagline}
                </p>
              </div>

              {/* Card Middle: Key Deliverable Tags */}
              <div className="my-auto py-2">
                <div className="flex flex-wrap gap-1.5">
                  {service.deliverableTags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-[#F5F0E8]/75 group-hover:border-white/15 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Timeline & Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[#F5F0E8]/50">
                  <Clock className="w-3.5 h-3.5 text-[#D85C3F]" />
                  <span>{service.turnaround}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-[#D85C3F] group-hover:text-white transition-colors font-medium">
                  <span>Explore discipline</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Optional Horizontal Services Marquee */}
      {showMarquee && <ServicesMarquee onOpenInquiry={onOpenInquiry} />}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Studio Service Footer Callout */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-mono text-[#F5F0E8]/60">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Direct collaboration with creative directors</span>
            <span className="hidden sm:inline">·</span>
            <span>Bespoke art direction</span>
            <span className="hidden sm:inline">·</span>
            <span>Global production</span>
          </div>

          <button
            onClick={() => onOpenInquiry()}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#D85C3F] hover:text-[#c44e32] transition-colors cursor-pointer group"
          >
            <span>Commission a project</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
