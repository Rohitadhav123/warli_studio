"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import ProjectInquiryModal from "@/components/ProjectInquiryModal";
import { ArrowLeft, ArrowUpRight, Sparkles, Compass, ShieldCheck } from "lucide-react";

export default function ServicesPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined
  );

  const handleOpenInquiry = (service?: string) => {
    setSelectedService(service);
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
    setSelectedService(undefined);
  };

  return (
    <div className="relative min-h-screen bg-[#171717] text-[#F5F0E8] flex flex-col selection:bg-[#D85C3F] selection:text-white">
      {/* Editorial Navigation */}
      <Header onOpenInquiry={() => handleOpenInquiry()} />

      <main className="flex-1 pt-28 md:pt-36">
        {/* Dedicated Services Hero Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20 border-b border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F5F0E8]/60 hover:text-[#D85C3F] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Studio Index</span>
            </Link>
            <span className="text-[#F5F0E8]/30">/</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#D85C3F]">
              Services & Disciplines
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#F5F0E8] leading-[1.02]">
              Disciplines crafted to make your brand{" "}
              <span className="editorial-italic font-normal text-[#D85C3F]">
                impossible to ignore.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#F5F0E8]/70 max-w-2xl font-sans leading-relaxed">
              We partner with visionary founders and global brands across six creative disciplines — from cinematic film and 3D spatial design to brand identity, packaging, and bespoke digital experiences.
            </p>
          </div>

          {/* Refined Studio Pillars Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/10">
            <div className="flex items-start gap-3.5">
              <Compass className="w-4 h-4 text-[#D85C3F] shrink-0 mt-1" />
              <div>
                <h2 className="text-sm font-semibold text-[#F5F0E8] mb-1 font-display">
                  Single Creative Vision
                </h2>
                <p className="text-xs text-[#F5F0E8]/60 leading-relaxed font-sans">
                  Art direction and visual design seamlessly aligned across physical and digital mediums.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Sparkles className="w-4 h-4 text-[#D85C3F] shrink-0 mt-1" />
              <div>
                <h2 className="text-sm font-semibold text-[#F5F0E8] mb-1 font-display">
                  Meticulous Craft
                </h2>
                <p className="text-xs text-[#F5F0E8]/60 leading-relaxed font-sans">
                  Obsessive attention to lighting, material tactile qualities, typography, and motion nuance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-4 h-4 text-[#D85C3F] shrink-0 mt-1" />
              <div>
                <h2 className="text-sm font-semibold text-[#F5F0E8] mb-1 font-display">
                  Direct Collaboration
                </h2>
                <p className="text-xs text-[#F5F0E8]/60 leading-relaxed font-sans">
                  Direct partnership with creative directors and craftspeople with zero agency layer overhead.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Interactive Services Showcase (clean cards, without redundant marquee) */}
        <ServicesSection onOpenInquiry={handleOpenInquiry} showMarquee={false} />

        {/* Ways to Work Together (Editorial Collaboration Models) */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12 border-b border-white/10">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow-label text-[#D85C3F] text-xs font-mono tracking-widest uppercase block mb-3">
              Ways We Collaborate
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F5F0E8]">
              Two simple ways to partner with the studio
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#F5F0E8]/70 leading-relaxed font-sans">
              Whether you need a bespoke flagship project or ongoing creative direction, we tailor our involvement to your ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Model 1: Project Commission */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col justify-between hover:border-[#D85C3F]/50 transition-all">
              <div>
                <span className="text-xs font-mono text-[#D85C3F] tracking-widest font-bold block mb-3">
                  01 // BESPOKE ENGAGEMENT
                </span>
                <h3 className="text-2xl font-display font-bold text-[#F5F0E8] mb-3">
                  Project Commission
                </h3>
                <p className="text-sm text-[#F5F0E8]/70 leading-relaxed mb-6 font-sans">
                  Ideal for focused campaigns, brand film launches, spatial 3D render suites, packaging overhauls, or new digital flagship websites.
                </p>
                <div className="space-y-3 text-xs text-[#F5F0E8]/80 font-mono mb-8 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                    <span>Defined scope, milestones & timeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                    <span>Full creative direction from concept to delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                    <span>100% master asset & production handoff</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleOpenInquiry("Project Commission")}
                className="w-full py-3 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider text-[#F5F0E8] hover:bg-[#D85C3F] hover:border-[#D85C3F] transition-all cursor-pointer font-semibold flex items-center justify-center gap-2 group"
              >
                <span>Inquire for a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Model 2: Studio Retainer */}
            <div className="p-8 sm:p-10 rounded-2xl bg-[#1c1c1c] border border-[#D85C3F]/40 flex flex-col justify-between hover:border-[#D85C3F] transition-all shadow-lg shadow-[#D85C3F]/5">
              <div>
                <span className="text-xs font-mono text-[#D85C3F] tracking-widest font-bold block mb-3">
                  02 // CONTINUOUS PARTNERSHIP
                </span>
                <h3 className="text-2xl font-display font-bold text-[#F5F0E8] mb-3">
                  Creative Retainer
                </h3>
                <p className="text-sm text-[#F5F0E8]/70 leading-relaxed mb-6 font-sans">
                  Ongoing creative direction and dedicated design capacity for fast-moving brands that demand regular visual output and cohesive art direction.
                </p>
                <div className="space-y-3 text-xs text-[#F5F0E8]/80 font-mono mb-8 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                    <span>Dedicated monthly production capacity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                    <span>Priority scheduling & rapid turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                    <span>Seamless extension of your internal team</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleOpenInquiry("Creative Retainer")}
                className="w-full py-3 rounded-full bg-[#D85C3F] text-white hover:bg-[#c44e32] transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer font-semibold flex items-center justify-center gap-2 group shadow-md shadow-[#D85C3F]/20"
              >
                <span>Explore Creative Retainer</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <CTASection onOpenInquiry={() => handleOpenInquiry()} />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Interactive Studio Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={handleCloseInquiry}
        preselectedService={selectedService}
      />
    </div>
  );
}
