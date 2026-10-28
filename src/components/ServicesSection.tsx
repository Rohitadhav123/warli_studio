"use client";

import React, { useState, useRef } from "react";
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
  Zap,
} from "lucide-react";
import { STUDIO_SERVICES, ServiceDetail } from "@/data/services";
import ServiceDetailModal from "@/components/ServiceDetailModal";
import ServicesMarquee from "@/components/ServicesMarquee";

interface ServicesSectionProps {
  onOpenInquiry: (serviceTitle?: string) => void;
  showAllInitially?: boolean;
}

export default function ServicesSection({
  onOpenInquiry,
}: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const filteredServices = STUDIO_SERVICES.filter((srv) => {
    if (filter === "all") return true;
    if (filter === "film-3d") return srv.filterCategory === "production" || srv.filterCategory === "3d";
    if (filter === "design") return srv.filterCategory === "design";
    if (filter === "digital-ai") return srv.filterCategory === "digital" || srv.filterCategory === "ai";
    return true;
  });

  const handleCardClick = (service: ServiceDetail) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
  };

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
      className="bg-[#171717] text-[#F5F0E8] py-24 md:py-32 border-b border-white/10 relative overflow-hidden"
      aria-label="Studio Services & Capabilities"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#D85C3F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#D85C3F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D85C3F] animate-pulse" />
            <span className="eyebrow-label text-[#F5F0E8]/70">
              03 // What We Do // Production & Creative Disciplines
            </span>
          </div>

          <div className="text-xs font-mono text-[#F5F0E8]/50">
            WARLI STUDIO // CAPABILITIES MATRIX
          </div>
        </div>

        {/* Section Title & Description */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[#F5F0E8] leading-[1.05]">
              Tailored services for{" "}
              <span className="editorial-italic font-normal text-[#D85C3F]">
                uncompromising
              </span>{" "}
              brands.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#F5F0E8]/70 max-w-2xl font-sans">
              No bloated theories or heavy corporate fluff. Click any service card below to inspect
              granular capabilities, delivery timelines, and handoff specifications.
            </p>
          </div>

          {/* Custom Inquire Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenInquiry()}
              className="px-5 py-2.5 rounded-lg border border-white/20 text-xs uppercase font-mono tracking-wider font-semibold hover:border-[#D85C3F] hover:bg-[#D85C3F]/10 transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Custom Engagement</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#D85C3F]" />
            </button>
          </div>
        </div>

        {/* Filter Navigation Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 border-b border-white/10 mb-10">
          {[
            { id: "all", label: "All Disciplines" },
            { id: "film-3d", label: "Film & 3D CGI" },
            { id: "design", label: "Branding & Packaging" },
            { id: "digital-ai", label: "AI & Web Engineering" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all uppercase tracking-wider whitespace-nowrap cursor-pointer ${
                filter === tab.id
                  ? "bg-[#D85C3F] text-white font-semibold shadow-md shadow-[#D85C3F]/20"
                  : "bg-white/5 text-[#F5F0E8]/70 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services High-Impact Grid (3-Column Desktop, 2-Column Tablet, 1-Column Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleCardClick(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(service);
                }
              }}
              className="group relative bg-[#1c1c1c] border border-white/10 hover:border-[#D85C3F]/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#D85C3F]/20 hover:-translate-y-1.5 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F] aspect-square w-full overflow-hidden"
            >
              {/* Dynamic Ambient Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D85C3F]/10 via-transparent to-[#D85C3F]/15 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Card Top: Number, Category Tag, Title & Icon */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#D85C3F]">
                      //{service.number}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#F5F0E8]/50 truncate max-w-[140px] sm:max-w-[170px]">
                      {service.category}
                    </span>
                  </div>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#D85C3F] group-hover:border-[#D85C3F] group-hover:scale-105 transition-all">
                    {renderIcon(service.iconName, "w-4 h-4 sm:w-5 sm:h-5 text-[#D85C3F] group-hover:text-white transition-colors")}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-display font-bold tracking-tight text-[#F5F0E8] group-hover:text-white transition-colors leading-snug line-clamp-2">
                  {service.title}
                </h3>
              </div>

              {/* Card Middle: Punchy Tagline & Key Deliverables */}
              <div className="my-auto py-1">
                <p className="text-xs sm:text-sm text-[#F5F0E8]/70 leading-relaxed font-sans line-clamp-2 mb-3">
                  {service.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {service.deliverableTags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[#F5F0E8]/80 group-hover:border-[#D85C3F]/30 group-hover:text-[#F5F0E8] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Fast Studio Specs & Inspect CTA */}
              <div className="pt-3.5 border-t border-white/10">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#F5F0E8]/60 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>{service.turnaround}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D85C3F] font-semibold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{service.highlightMetric.value}</span>
                  </div>
                </div>

                {/* Compact CTA Row */}
                <div className="w-full py-2 px-3 rounded-lg bg-white/5 group-hover:bg-[#D85C3F] text-[#F5F0E8] group-hover:text-white transition-all duration-200 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold">
                  <span>Inspect Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Horizontal Infinite-Scrolling Services Marquee */}
      <ServicesMarquee
        onSelectService={(serviceId) => {
          const target = STUDIO_SERVICES.find((s) => s.id === serviceId);
          if (target) {
            handleCardClick(target);
          }
        }}
        onOpenInquiry={onOpenInquiry}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Studio Service Footer Callout */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs font-mono text-[#F5F0E8]/60">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>ENGAGEMENTS: DIRECT SPRINT OR RETAINER</span>
            <span>IP OWNERSHIP: 100% CLIENT OWNED</span>
            <span>COMMUNICATION: SLACK + DIRECT FOUNDER ACCESS</span>
          </div>

          <button
            onClick={() => onOpenInquiry()}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#D85C3F] hover:text-[#c44e32] transition-colors cursor-pointer group"
          >
            <span>Commission a Multi-Discipline Campaign</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Deep Specification Modal on Card Click */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedService(null);
        }}
        onInquire={(title) => {
          setIsDetailModalOpen(false);
          setSelectedService(null);
          onOpenInquiry(title);
        }}
      />
    </section>
  );
}
