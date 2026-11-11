"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectInquiryModal from "@/components/ProjectInquiryModal";
import { ServiceDetail } from "@/data/services";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
  Video,
  Box,
  Palette,
  PackageCheck,
  Layout,
} from "lucide-react";

interface ServiceDetailClientProps {
  service: ServiceDetail;
  nextService: ServiceDetail;
  prevService: ServiceDetail;
}

export default function ServiceDetailClient({
  service,
  nextService,
  prevService,
}: ServiceDetailClientProps) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const renderIcon = () => {
    const iconProps = { className: "w-5 h-5 text-[#D85C3F]" };
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

  return (
    <div className="relative min-h-screen bg-[#171717] text-[#F5F0E8] flex flex-col selection:bg-[#D85C3F] selection:text-white">
      {/* Editorial Navigation */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      <main className="flex-1 pt-28 md:pt-36">
        {/* Breadcrumb Navigation Strip */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <div className="flex items-center justify-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#F5F0E8]/50">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Studio Index
            </Link>
            <span>/</span>
            <Link
              href="/services"
              className="hover:text-white transition-colors"
            >
              Disciplines
            </Link>
            <span>/</span>
            <span className="text-[#D85C3F] truncate max-w-[200px] sm:max-w-none">
              {service.title}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20 border-b border-white/10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="font-mono text-sm font-bold text-[#D85C3F]">
              //{service.number}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F5F0E8]/60">
              {service.category}
            </span>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#F5F0E8] leading-[1.02] mb-6">
              {service.title}
            </h1>

            <p className="text-xl sm:text-2xl text-[#F5F0E8]/85 font-sans leading-relaxed mb-6 font-light max-w-3xl mx-auto">
              {service.tagline}
            </p>

            <p className="text-base sm:text-lg text-[#F5F0E8]/70 font-sans leading-relaxed max-w-2xl mx-auto mb-10">
              {service.summary}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="px-7 py-3.5 rounded-full bg-[#D85C3F] text-white hover:bg-[#c44e32] transition-colors text-xs font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2 shadow-lg shadow-[#D85C3F]/25 cursor-pointer"
              >
                <span>Start a Project with This Discipline</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <Link
                href="/services"
                className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-xs font-mono uppercase tracking-wider text-[#F5F0E8] transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Disciplines</span>
              </Link>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-14 pt-8 border-t border-white/10 text-xs font-mono max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#D85C3F] block mb-1">
                Typical Timeline
              </span>
              <p className="text-sm font-semibold text-[#F5F0E8]">{service.turnaround}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#D85C3F] block mb-1">
                Standard
              </span>
              <p className="text-sm font-semibold text-[#F5F0E8]">{service.highlightMetric.value}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#D85C3F] block mb-1">
                Ideal For
              </span>
              <p className="text-sm font-semibold text-[#F5F0E8] truncate">{service.idealFor}</p>
            </div>
          </div>
        </section>


        {/* Core Capabilities */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="eyebrow-label text-[#D85C3F] text-xs font-mono tracking-widest uppercase block mb-3">
              Scope & Focus
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F5F0E8]">
              What we create
            </h2>
            <p className="mt-3 text-base text-[#F5F0E8]/70 font-sans leading-relaxed">
              Every deliverable is crafted with singular creative direction, built to give your brand an unmistakable presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-[#D85C3F]/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    {renderIcon()}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-[#F5F0E8] mb-2">
                      {cap.name}
                    </h3>
                    <p className="text-sm text-[#F5F0E8]/70 leading-relaxed font-sans">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Creative Production Process */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="eyebrow-label text-[#D85C3F] text-xs font-mono tracking-widest uppercase block mb-3">
              Production Runway
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F5F0E8]">
              The creative process
            </h2>
            <p className="mt-3 text-base text-[#F5F0E8]/70 font-sans leading-relaxed">
              A transparent, structured four-phase workflow designed for momentum, clarity, and creative excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#D85C3F]">
                      {step.phase}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-[#F5F0E8]/60">
                      {step.timeline}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-[#F5F0E8] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#F5F0E8]/70 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Master Outputs & Deliverables */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="eyebrow-label text-[#D85C3F] text-xs font-mono tracking-widest uppercase block mb-3">
              Master Handoff
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F5F0E8]">
              What you receive
            </h2>
            <p className="mt-3 text-base text-[#F5F0E8]/70 font-sans leading-relaxed">
              Complete raw asset ownership, master-grade files, and full commercial usage rights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.outputFormats.map((format, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3 font-mono text-xs sm:text-sm text-[#F5F0E8]/90"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D85C3F] shrink-0" />
                <span>{format}</span>
              </div>
            ))}
          </div>

          {/* Studio Advantage */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/50 block mb-4">
              The Studio Standard
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.whyWarli.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#F5F0E8]/80 leading-relaxed font-sans flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next / Previous Discipline Switcher */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 border-b border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href={`/services/${prevService.id}`}
              className="p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-[#D85C3F]/50 transition-colors group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5F0E8]/50 block mb-1">
                  ← Previous Discipline
                </span>
                <p className="text-base font-display font-bold text-[#F5F0E8] group-hover:text-white transition-colors">
                  {prevService.title}
                </p>
              </div>
              <ArrowLeft className="w-4 h-4 text-[#D85C3F] group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              href={`/services/${nextService.id}`}
              className="p-6 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-[#D85C3F]/50 transition-colors group flex items-center justify-between text-right"
            >
              <ArrowRight className="w-4 h-4 text-[#D85C3F] group-hover:translate-x-1 transition-transform order-2 sm:order-1" />
              <div className="order-1 sm:order-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5F0E8]/50 block mb-1">
                  Next Discipline →
                </span>
                <p className="text-base font-display font-bold text-[#F5F0E8] group-hover:text-white transition-colors">
                  {nextService.title}
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Dedicated Call to Action */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="eyebrow-label text-[#D85C3F] text-xs font-mono tracking-widest uppercase block mb-3">
            Commission {service.shortTitle || service.title}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-[#F5F0E8] mb-6 max-w-2xl mx-auto">
            Ready to bring your vision to life?
          </h2>
          <p className="text-base sm:text-lg text-[#F5F0E8]/70 max-w-xl mx-auto font-sans leading-relaxed mb-8">
            Tell us about your brand, campaign goals, or timeline. We respond within 24 hours with a direct perspective.
          </p>

          <button
            onClick={() => setIsInquiryOpen(true)}
            className="px-8 py-4 rounded-full bg-[#D85C3F] text-white hover:bg-[#c44e32] transition-colors text-xs font-mono uppercase tracking-wider font-semibold inline-flex items-center gap-2 shadow-xl shadow-[#D85C3F]/25 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </section>
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        preselectedService={service.title}
      />
    </div>
  );
}

