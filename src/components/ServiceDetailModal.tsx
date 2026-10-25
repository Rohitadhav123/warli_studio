"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  ArrowRight,
  Clock,
  Target,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Video,
  Box,
  Palette,
  PackageCheck,
  Layout,
  ExternalLink,
} from "lucide-react";
import { ServiceDetail } from "@/data/services";

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onInquire: (serviceTitle: string) => void;
}

export default function ServiceDetailModal({
  service,
  isOpen,
  onClose,
  onInquire,
}: ServiceDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "process" | "deliverables">(
    "overview"
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset tab when service changes
  useEffect(() => {
    setActiveTab("overview");
  }, [service]);

  if (!isOpen || !service) return null;

  const renderIcon = () => {
    const iconProps = { className: "w-6 h-6 text-[#D85C3F]" };
    switch (service.iconName) {
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
        return <Sparkles {...iconProps} />;
    }
  };

  const handleStartInquiry = () => {
    onClose();
    onInquire(service.title);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200"
    >
      {/* Dark blur backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0d0d0d]/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#1a1a1a] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 text-[#F5F0E8] animate-in zoom-in-95 duration-200">
        {/* Top Accent Stripe */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, #D85C3F, ${service.accent || "#D85C3F"}, #171717)`,
          }}
        />

        {/* Modal Header */}
        <div className="p-6 md:p-8 pb-4 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              {renderIcon()}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-[#D85C3F] tracking-widest font-semibold uppercase">
                  Service {service.number} // {service.category}
                </span>
              </div>
              <h2
                id="service-modal-title"
                className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-[#F5F0E8]"
              >
                {service.title}
              </h2>
              <p className="text-sm text-[#F5F0E8]/70 mt-1 max-w-2xl leading-relaxed">
                {service.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close service details"
            className="p-2 rounded-lg text-[#F5F0E8]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Spec Metrics Bar */}
        <div className="bg-white/[0.02] border-b border-white/10 px-6 md:px-8 py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D85C3F]" />
            <span className="text-[#F5F0E8]/50">TIMELINE:</span>
            <span className="text-[#F5F0E8] font-semibold">{service.turnaround}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#D85C3F]" />
            <span className="text-[#F5F0E8]/50">IDEAL FOR:</span>
            <span className="text-[#F5F0E8] font-semibold truncate">
              {service.idealFor.split(",")[0]}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <Sparkles className="w-4 h-4 text-[#D85C3F]" />
            <span className="text-[#F5F0E8]/50">{service.highlightMetric.label.toUpperCase()}:</span>
            <span className="text-[#D85C3F] font-bold">
              {service.highlightMetric.value}
            </span>
          </div>
        </div>

        {/* Interactive Tabs Header */}
        <div className="px-6 md:px-8 pt-4 border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase font-semibold transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
              activeTab === "overview"
                ? "border-[#D85C3F] text-[#F5F0E8] bg-white/5 rounded-t-lg"
                : "border-transparent text-[#F5F0E8]/60 hover:text-[#F5F0E8]"
            }`}
          >
            01 // Scope & Capabilities
          </button>
          <button
            onClick={() => setActiveTab("process")}
            className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase font-semibold transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
              activeTab === "process"
                ? "border-[#D85C3F] text-[#F5F0E8] bg-white/5 rounded-t-lg"
                : "border-transparent text-[#F5F0E8]/60 hover:text-[#F5F0E8]"
            }`}
          >
            02 // 4-Step Production Runway
          </button>
          <button
            onClick={() => setActiveTab("deliverables")}
            className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase font-semibold transition-all border-b-2 -mb-px whitespace-nowrap cursor-pointer ${
              activeTab === "deliverables"
                ? "border-[#D85C3F] text-[#F5F0E8] bg-white/5 rounded-t-lg"
                : "border-transparent text-[#F5F0E8]/60 hover:text-[#F5F0E8]"
            }`}
          >
            03 // Deliverables & Tech Stack
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D85C3F] block mb-2 font-semibold">
                  Executive Studio Synopsis
                </span>
                <p className="text-sm md:text-base text-[#F5F0E8]/90 leading-relaxed font-sans">
                  {service.summary}
                </p>
              </div>

              {/* Granular Capabilities Grid */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/50 mb-3">
                  Core Capabilities & Scope Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {service.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D85C3F]/40 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D85C3F] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-[#F5F0E8]">
                            {cap.name}
                          </h4>
                          <p className="text-xs text-[#F5F0E8]/70 mt-1 leading-relaxed">
                            {cap.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Warli Studio Advantage */}
              <div className="pt-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/50 mb-3">
                  The Warli Advantage
                </h3>
                <div className="space-y-2">
                  {service.whyWarli.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-xs md:text-sm text-[#F5F0E8]/80 bg-white/[0.02] px-4 py-2.5 rounded-lg border border-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "process" && (
            <div className="space-y-6">
              <div className="text-xs font-mono text-[#F5F0E8]/60 mb-2">
                TYPICAL DELIVERY SPRINT // STRUCTURED MILESTONES
              </div>
              <div className="relative border-l border-white/15 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
                {service.process.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Step marker */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full bg-[#171717] border-2 border-[#D85C3F] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#D85C3F] font-bold">
                          {step.phase}
                        </span>
                        <h4 className="text-base font-semibold text-[#F5F0E8]">
                          {step.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-[#F5F0E8]/60 w-fit">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="text-sm text-[#F5F0E8]/70 leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "deliverables" && (
            <div className="space-y-6">
              {/* Output Formats */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-[#D85C3F]" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/70">
                    Hand-off Deliverables & File Formats
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.outputFormats.map((fmt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs md:text-sm text-[#F5F0E8]/90 bg-white/5 border border-white/10 px-4 py-3 rounded-xl font-mono"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D85C3F] shrink-0" />
                      <span>{fmt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Technical Pipeline */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-4 h-4 text-[#D85C3F]" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/70">
                    Industry Tools & Production Standards
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.toolsAndTech.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-[#F5F0E8]/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-[#F5F0E8]/60 font-mono">
            <span>READY TO COMMISSION // DIRECT FOUNDER COLLABORATION</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-white/15 text-xs uppercase font-mono tracking-wider hover:bg-white/5 transition-colors cursor-pointer text-[#F5F0E8]/80"
            >
              Close
            </button>
            <button
              onClick={handleStartInquiry}
              className="px-6 py-2.5 rounded-lg bg-[#D85C3F] text-white hover:bg-[#c44e32] transition-colors text-xs uppercase font-mono tracking-wider font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-[#D85C3F]/20"
            >
              <span>Inquire For This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
