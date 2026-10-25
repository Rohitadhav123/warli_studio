"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import ProjectInquiryModal from "@/components/ProjectInquiryModal";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Shield, Sparkles, Terminal } from "lucide-react";

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
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-16 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F5F0E8]/60 hover:text-[#D85C3F] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Studio Index</span>
            </Link>
            <span className="text-[#F5F0E8]/30">/</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#D85C3F]">
              Services & Capabilities
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#F5F0E8] leading-[0.98]">
              Disciplines built to command{" "}
              <span className="editorial-italic font-normal text-[#D85C3F]">
                market dominance.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#F5F0E8]/70 max-w-2xl font-sans leading-relaxed">
              We specialize in 6 high-leverage creative disciplines — from cinema-grade
              live production and 3D fluid simulations to AI-accelerated assets, iconic packaging,
              and blistering Next.js flagship websites.
            </p>
          </div>

          {/* Quick Pillars Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D85C3F] block mb-1">
                Turnaround Speed
              </span>
              <p className="text-sm font-semibold text-[#F5F0E8]">1 to 4 Weeks</p>
              <span className="text-xs text-[#F5F0E8]/50">Sprint delivery cycles</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D85C3F] block mb-1">
                Team Model
              </span>
              <p className="text-sm font-semibold text-[#F5F0E8]">Direct to Founders</p>
              <span className="text-xs text-[#F5F0E8]/50">Zero account manager lag</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D85C3F] block mb-1">
                Standard
              </span>
              <p className="text-sm font-semibold text-[#F5F0E8]">8K Cinema & PBR</p>
              <span className="text-xs text-[#F5F0E8]/50">Industry gold standard</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D85C3F] block mb-1">
                Ownership
              </span>
              <p className="text-sm font-semibold text-[#F5F0E8]">100% Client IP</p>
              <span className="text-xs text-[#F5F0E8]/50">Complete raw asset handoff</span>
            </div>
          </div>
        </div>

        {/* Full Interactive Services Showcase */}
        <ServicesSection onOpenInquiry={handleOpenInquiry} />

        {/* Engagement Models Breakdown */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-12 border-b border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="eyebrow-label text-[#D85C3F] block mb-3">
              COLLABORATION MODELS // TRANSPARENT PROTOCOL
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#F5F0E8]">
              How we partner with visionary teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col justify-between hover:border-[#D85C3F]/40 transition-colors">
              <div>
                <span className="text-xs font-mono text-[#D85C3F] font-bold block mb-2">
                  01 // SPRINT COMMISSION
                </span>
                <h3 className="text-xl font-display font-bold text-[#F5F0E8] mb-2">
                  Fixed Scope Project
                </h3>
                <p className="text-xs text-[#F5F0E8]/70 leading-relaxed mb-6">
                  Perfect for focused campaigns: a 3D product render pack, a hero commercial film,
                  or a new packaging line launch.
                </p>
                <ul className="space-y-2.5 text-xs text-[#F5F0E8]/80 font-mono mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>Fixed timeline (2–4 weeks)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>Guaranteed deliverable milestones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>100% master file handoff</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleOpenInquiry("Sprint Commission")}
                className="w-full py-2.5 rounded-lg border border-white/20 text-xs font-mono uppercase tracking-wider text-[#F5F0E8] hover:bg-[#D85C3F] hover:border-[#D85C3F] transition-all cursor-pointer font-semibold"
              >
                Inquire For A Sprint
              </button>
            </div>

            <div className="p-7 rounded-2xl bg-[#1c1c1c] border-2 border-[#D85C3F] flex flex-col justify-between shadow-xl shadow-[#D85C3F]/10 relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#D85C3F] text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-mono text-[#D85C3F] font-bold block mb-2">
                  02 // FULL FLAGSHIP LAUNCH
                </span>
                <h3 className="text-xl font-display font-bold text-[#F5F0E8] mb-2">
                  Multi-Disciplinary Brand OS
                </h3>
                <p className="text-xs text-[#F5F0E8]/70 leading-relaxed mb-6">
                  Complete end-to-end launch: Brand identity, physical packaging, 3D CGI assets,
                  live commercial shoot, and bespoke Next.js website.
                </p>
                <ul className="space-y-2.5 text-xs text-[#F5F0E8]/80 font-mono mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>Holistic cross-discipline cohesion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>Unified art direction from one studio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>Dedicated creative lead access</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleOpenInquiry("Multi-Disciplinary Brand OS")}
                className="w-full py-2.5 rounded-lg bg-[#D85C3F] text-white hover:bg-[#c44e32] transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer font-semibold shadow-md shadow-[#D85C3F]/30"
              >
                Book Flagship Launch
              </button>
            </div>

            <div className="p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 flex flex-col justify-between hover:border-[#D85C3F]/40 transition-colors">
              <div>
                <span className="text-xs font-mono text-[#D85C3F] font-bold block mb-2">
                  03 // EMBEDDED STUDIO RETAINER
                </span>
                <h3 className="text-xl font-display font-bold text-[#F5F0E8] mb-2">
                  Continuous Creative Partner
                </h3>
                <p className="text-xs text-[#F5F0E8]/70 leading-relaxed mb-6">
                  Ongoing high-tempo creative production for high-growth brands: monthly 3D content drops,
                  AI variations, packaging revisions, and web optimizations.
                </p>
                <ul className="space-y-2.5 text-xs text-[#F5F0E8]/80 font-mono mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>Dedicated monthly production capacity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>Private Slack channel & priority turnaround</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                    <span>Discounted multi-month commitment</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleOpenInquiry("Embedded Studio Retainer")}
                className="w-full py-2.5 rounded-lg border border-white/20 text-xs font-mono uppercase tracking-wider text-[#F5F0E8] hover:bg-[#D85C3F] hover:border-[#D85C3F] transition-all cursor-pointer font-semibold"
              >
                Apply For Retainer
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
