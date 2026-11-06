"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectInquiryModal from "@/components/ProjectInquiryModal";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Clock,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

const SERVICES_LIST = [
  "Live Shoots & Film Production",
  "3D CGI & Product Visualization",
  "AI Content Creation",
  "Branding & Visual Identity",
  "Packaging Design",
  "Website Design & Digital Experience",
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "Behance", href: "https://behance.net" },
];

export default function ContactPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Embedded Form State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("1-3 months");
  const [budget, setBudget] = useState<string>("Standard Production");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [brief, setBrief] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const renderedAtRef = useRef<number>(0);

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("inquiries@warlistudios.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
      setCopiedEmail(false);
    }
  };

  const toggleService = (srv: string) => {
    if (errorMessage) setErrorMessage(null);
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          brand,
          services: selectedServices,
          timeline,
          budget,
          brief,
          website,
          renderedAt: renderedAtRef.current,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(
          result?.error ||
            "Unable to deliver inquiry. Please reach out directly to inquiries@warlistudios.com."
        );
      }
    } catch {
      setErrorMessage(
        "Network connection interrupted. Please check your connection or email inquiries@warlistudios.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setSelectedServices([]);
    setName("");
    setEmail("");
    setBrand("");
    setBrief("");
    setWebsite("");
    renderedAtRef.current = Date.now();
  };

  return (
    <div className="relative min-h-screen bg-[#171717] text-[#F5F0E8] flex flex-col selection:bg-[#D85C3F] selection:text-white">
      {/* Sticky Editorial Navigation */}
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      <main className="flex-1 pt-28 md:pt-36">
        {/* Header Breadcrumb & Section Title */}
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
              Direct Commission // Contact
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F5F0E8] tracking-tight leading-[0.98]">
              Let’s build something{" "}
              <span className="editorial-italic font-normal text-[#D85C3F]">
                impossible
              </span>{" "}
              to ignore.
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-[#F5F0E8]/70 max-w-3xl font-sans leading-relaxed">
              Warli Studio engages directly with founders, creative directors, and ambitious brand leads.
              Whether commissioning commercial live action, high-precision 3D CGI simulations,
              generative AI content, or flagship brand architecture — initiate your brief below.
            </p>
          </div>

          {/* Quick Pillars Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10 text-xs font-mono">
            <div className="p-4 rounded-sm bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-[#D85C3F] uppercase tracking-widest block mb-1">
                Engagement Model
              </span>
              <p className="font-semibold text-[#F5F0E8] text-sm font-sans">Direct-to-Director</p>
              <span className="text-[#F5F0E8]/50 text-[11px]">Zero account manager lag</span>
            </div>
            <div className="p-4 rounded-sm bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-[#D85C3F] uppercase tracking-widest block mb-1">
                Response Protocol
              </span>
              <p className="font-semibold text-[#F5F0E8] text-sm font-sans">24 — 48 Hours</p>
              <span className="text-[#F5F0E8]/50 text-[11px]">Direct brief evaluation</span>
            </div>
            <div className="p-4 rounded-sm bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-[#D85C3F] uppercase tracking-widest block mb-1">
                Geographic Scope
              </span>
              <p className="font-semibold text-[#F5F0E8] text-sm font-sans">Operating Globally</p>
              <span className="text-[#F5F0E8]/50 text-[11px]">Remote & on-set production</span>
            </div>
            <div className="p-4 rounded-sm bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-[#D85C3F] uppercase tracking-widest block mb-1">
                IP Ownership
              </span>
              <p className="font-semibold text-[#F5F0E8] text-sm font-sans">100% Client Owned</p>
              <span className="text-[#F5F0E8]/50 text-[11px]">Complete raw assets handoff</span>
            </div>
          </div>
        </div>

        {/* Main Contact Grid (5 cols Info / 7 cols Form) */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Studio Channels & Specifications (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Channel 1: Primary Email */}
              <div className="p-6 md:p-8 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow-label text-[#D85C3F] text-[11px]">
                    Direct Inquiries // Primary Dispatch
                  </span>
                  <Mail className="w-4 h-4 text-[#D85C3F]" />
                </div>

                <div>
                  <a
                    href="mailto:inquiries@warlistudios.com"
                    className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] hover:text-[#D85C3F] transition-colors break-all"
                  >
                    inquiries@warlistudios.com
                  </a>
                  <p className="text-xs text-[#F5F0E8]/60 mt-2 font-sans leading-relaxed">
                    Preferred for tender documents, comprehensive RFPs, or direct director correspondence.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-[#F5F0E8]/80 hover:text-white hover:border-[#D85C3F] transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D85C3F]" />
                        <span>Address Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href="mailto:inquiries@warlistudios.com"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D85C3F] hover:underline uppercase tracking-wider"
                  >
                    <span>Open Mail App</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Channel 2: Studio Working Principles */}
              <div className="p-6 md:p-8 rounded-sm bg-white/[0.02] border border-white/10 space-y-5">
                <span className="eyebrow-label text-[#F5F0E8]/60 text-[11px] block">
                  Studio Protocols // What to Expect
                </span>

                <div className="space-y-4 font-sans text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#D85C3F] shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-[#F5F0E8]">Direct Director Assessment</p>
                      <p className="text-xs text-[#F5F0E8]/60 mt-0.5 leading-relaxed">
                        Every brief is analyzed for conceptual audacity and technical scope by our founding team.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#D85C3F] shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-[#F5F0E8]">Strict NDA & Confidentiality</p>
                      <p className="text-xs text-[#F5F0E8]/60 mt-0.5 leading-relaxed">
                        Unreleased product launches, proprietary industrial CAD, and strategic brand re-positions are handled under bilateral confidentiality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel 3: Verified Social Archives */}
              <div className="p-6 md:p-8 rounded-sm bg-white/[0.02] border border-white/10 space-y-4">
                <span className="eyebrow-label text-[#F5F0E8]/60 text-[11px] block">
                  Studio Archive // Verified Feeds
                </span>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-sm bg-white/[0.03] border border-white/10 hover:border-[#D85C3F] hover:bg-[#D85C3F]/10 transition-colors flex items-center justify-between text-xs font-mono text-[#F5F0E8]/80 hover:text-white group"
                    >
                      <span>{social.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#F5F0E8]/40 group-hover:text-[#D85C3F] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Project Commission Brief Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#1c1c1c] border border-white/15 rounded-sm p-6 sm:p-10 shadow-2xl relative">
              {isSubmitted ? (
                <div className="py-16 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#D85C3F]/20 border border-[#D85C3F] flex items-center justify-center text-[#D85C3F] mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="eyebrow-label text-[#D8E5D0] mb-2">
                    Inquiry Transmitted Successfully
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F0E8] mb-4">
                    Thank you, {name || "Partner"}.
                  </h2>
                  <p className="text-sm md:text-base text-[#F5F0E8]/75 max-w-md font-sans leading-relaxed mb-8">
                    Your brief for <span className="text-white font-medium">{brand || "your brand"}</span> has been
                    dispatched to our creative directors. We will review your scope and follow up within 24 to 48 hours.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-3 rounded-full bg-white/10 text-white text-xs uppercase font-mono tracking-wider hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      Submit Another Brief
                    </button>
                    <Link
                      href="/work"
                      className="px-6 py-3 rounded-full bg-[#D85C3F] text-white text-xs uppercase font-mono tracking-wider hover:bg-[#BF4C32] transition-colors cursor-pointer"
                    >
                      Explore Selected Works
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="border-b border-white/10 pb-6 mb-8">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="eyebrow-label text-[#D85C3F] text-[11px]">
                        COMMISSION BRIEF // SPECIFICATION
                      </span>
                      <span className="text-xs font-mono text-[#F5F0E8]/50">
                        DIRECT INTAKE
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] tracking-tight">
                      Tell us about your brand ambition.
                    </h2>
                    <p className="text-xs sm:text-sm text-[#F5F0E8]/70 mt-1 font-sans">
                      Select required creative disciplines and outline target timelines below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8 font-sans">
                    {/* Honeypot anti-bot hidden input */}
                    <div
                      className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none"
                      aria-hidden="true"
                    >
                      <label htmlFor="contact_website_verification">Leave this empty</label>
                      <input
                        id="contact_website_verification"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    {/* Server Error Alert Banner */}
                    {errorMessage && (
                      <div
                        role="alert"
                        className="p-4 rounded-sm bg-[#D85C3F]/15 border border-[#D85C3F] text-xs font-mono text-[#F5F0E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200"
                      >
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-[#D85C3F] shrink-0 mt-0.5" />
                          <p className="leading-relaxed">{errorMessage}</p>
                        </div>
                        <a
                          href={`mailto:inquiries@warlistudios.com?subject=Project Inquiry: ${encodeURIComponent(brand || "New Project")}&body=${encodeURIComponent(`Client: ${name}\nEmail: ${email}\nBrand: ${brand}\nTimeline: ${timeline}\nBudget: ${budget}\nDisciplines: ${selectedServices.join(", ")}\n\nBrief:\n${brief}`)}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#D85C3F] text-white text-[11px] font-mono whitespace-nowrap hover:bg-[#c44e32] transition-colors self-start sm:self-auto"
                        >
                          <span>Email Directly</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* 1. Disciplines Multi-Select */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#D8E5D0] mb-3">
                        1. Creative Disciplines (Select all applicable)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES_LIST.map((srv) => {
                          const isSelected = selectedServices.includes(srv);
                          return (
                            <button
                              type="button"
                              key={srv}
                              onClick={() => toggleService(srv)}
                              className={`px-3.5 py-2 rounded-sm text-xs font-mono transition-all border cursor-pointer ${
                                isSelected
                                  ? "bg-[#D85C3F] text-white border-[#D85C3F] shadow-sm"
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

                    {/* 2. Client & Brand Coordinates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                          }}
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
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                          }}
                          placeholder="elena@maison.com"
                          className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-white/30 focus:outline-none focus:border-[#D85C3F] transition-colors"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 mb-2">
                          Brand / Organization Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={brand}
                          onChange={(e) => {
                            setBrand(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                          }}
                          placeholder="e.g. Maison Noire or Series A Healthtech"
                          className="w-full bg-white/5 border border-white/15 rounded-sm px-4 py-2.5 text-sm text-[#F5F0E8] placeholder-white/30 focus:outline-none focus:border-[#D85C3F] transition-colors"
                        />
                      </div>
                    </div>

                    {/* 3. Timeline & Investment Scope */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
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

                    {/* 4. Project Brief */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 mb-2">
                        Project Brief & Ambition
                      </label>
                      <textarea
                        rows={4}
                        value={brief}
                        onChange={(e) => {
                          setBrief(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        placeholder="Detail your category, target audience, core objective, and visual deliverables needed..."
                        className="w-full bg-white/5 border border-white/15 rounded-sm p-4 text-sm text-[#F5F0E8] placeholder-white/30 focus:outline-none focus:border-[#D85C3F] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-[11px] font-mono text-[#F5F0E8]/50">
                        * Confidential. Direct director assessment.
                      </span>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#BF4C32] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#D85C3F]/20"
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Transmitting Inquiry...</span>
                          </span>
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
        </div>
      </main>

      {/* Editorial Studio Footer */}
      <Footer />

      {/* Interactive Modal */}
      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}
