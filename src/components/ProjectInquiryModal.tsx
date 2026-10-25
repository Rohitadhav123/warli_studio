"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function ProjectInquiryModal({
  isOpen,
  onClose,
  preselectedService,
}: ProjectInquiryModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(() =>
    preselectedService ? [preselectedService] : []
  );
  const [prevService, setPrevService] = useState(preselectedService);

  // Official React pattern for adjusting state when prop changes
  if (preselectedService !== prevService) {
    setPrevService(preselectedService);
    if (preselectedService && !selectedServices.includes(preselectedService)) {
      setSelectedServices((prev) => [...prev, preselectedService]);
    }
  }

  const [timeline, setTimeline] = useState<string>("1-3 months");
  const [budget, setBudget] = useState<string>("Standard Production");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [brief, setBrief] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  if (!isOpen) return null;

  const servicesList = [
    "Live Shoots & Film Production",
    "3D CGI & Product Visualization",
    "AI Content Creation",
    "Branding & Visual Identity",
    "Packaging Design",
    "Website Design & Digital Experience",
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedServices([]);
    setName("");
    setEmail("");
    setBrand("");
    setBrief("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#171717] text-[#F5F0E8] border border-white/15 rounded-sm p-6 sm:p-10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white transition-colors cursor-pointer"
          aria-label="Close inquiry dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#D85C3F]/20 border border-[#D85C3F] flex items-center justify-center text-[#D85C3F] mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="eyebrow-label text-[#D8E5D0] mb-2">
              Inquiry Dispatched
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F0E8] mb-4">
              Thank you, {name || "Partner"}.
            </h3>
            <p className="text-sm md:text-base text-[#F5F0E8]/75 max-w-md font-sans leading-relaxed mb-8">
              Your inquiry has been received. Our directors will review your brief for{" "}
              <span className="text-white font-medium">{brand || "your project"}</span> and connect within 24 to 48 hours.
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#BF4C32] transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/warli-logo-white.png"
                  alt="Warli Archviz"
                  className="h-6 w-auto object-contain opacity-90"
                />
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                  <span className="eyebrow-label text-[#F5F0E8]/60 text-[11px]">
                    Direct Studio Commission
                  </span>
                </div>
              </div>
              <h2
                id="inquiry-modal-title"
                className="font-serif text-3xl sm:text-4xl text-[#F5F0E8] tracking-tight"
              >
                Initiate a Project with Warli Studios
              </h2>
              <p className="text-xs sm:text-sm text-[#F5F0E8]/70 mt-2 font-sans">
                Tell us about your brand vision, target timeline, and desired creative disciplines.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 font-sans">
              {/* Disciplines Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#D8E5D0] mb-3">
                  1. Select Desired Disciplines (Multi-Select)
                </label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`px-3.5 py-2 rounded-sm text-xs font-mono transition-all border cursor-pointer ${isSelected
                            ? "bg-[#D85C3F] text-white border-[#D85C3F]"
                            : "bg-white/5 text-[#F5F0E8]/80 border-white/10 hover:border-white/30"
                          }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Basic Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-white/30 focus:outline-none focus:border-[#D85C3F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@maison.com"
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-white/30 focus:outline-none focus:border-[#D85C3F] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 mb-2">
                    Brand / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Maison Noire or Series A Healthtech"
                    className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-white/30 focus:outline-none focus:border-[#D85C3F] transition-colors"
                  />
                </div>
              </div>

              {/* Timeline & Budget Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 mb-2">
                    Target Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#201e1d] border border-white/15 rounded-sm px-4 py-2.5 text-sm text-[#F5F0E8] focus:outline-none focus:border-[#D85C3F]"
                  >
                    <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                    <option value="1-3 months">1 — 3 months</option>
                    <option value="3-6 months">3 — 6 months</option>
                    <option value="Exploratory / Long-range">Exploratory / Long-range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 mb-2">
                    Investment Scope
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#201e1d] border border-white/15 rounded-sm px-4 py-2.5 text-sm text-[#F5F0E8] focus:outline-none focus:border-[#D85C3F]"
                  >
                    <option value="Concept Phase / Sprint">Concept Phase / Sprint</option>
                    <option value="Standard Production">Standard Production Engagement</option>
                    <option value="Comprehensive Flagship">Comprehensive Flagship Campaign</option>
                    <option value="Retainer / Continuous Direction">Retainer / Continuous Direction</option>
                  </select>
                </div>
              </div>

              {/* Brief Details */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 mb-2">
                  Project Brief & Ambition
                </label>
                <textarea
                  rows={4}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Tell us about the challenge, audience, physical or digital formats, and what success looks like..."
                  className="w-full bg-white/5 border border-white/15 rounded-sm p-4 text-sm text-[#F5F0E8] placeholder-white/30 focus:outline-none focus:border-[#D85C3F] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-[#F5F0E8]/50">
                  * Confidential. Direct director review. No spam.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#BF4C32] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Brief...</span>
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
