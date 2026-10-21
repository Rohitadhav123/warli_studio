"use client";

import React, { useState, useEffect, useRef } from "react";
import { PROCESS_STEPS } from "@/data/process";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".process-header-anim", {
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

      gsap.from(".process-card-anim", {
        scrollTrigger: {
          trigger: ".process-cards-grid",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="bg-[#171717] text-[#F5F0E8] py-24 md:py-36 border-b border-white/10"
      aria-label="Creative Approach and Process"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10"
        >
          <div className="max-w-2xl">
            <div className="process-header-anim flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
              <span className="eyebrow-label text-[#D8E5D0] font-semibold">
                Methodology // 05 Distinct Phases
              </span>
            </div>
            <h2 className="process-header-anim editorial-title text-4xl sm:text-5xl md:text-6xl text-[#F5F0E8] font-normal tracking-tight">
              Our creative approach.{" "}
              <span className="editorial-italic font-normal">
                Rigorous from day one.
              </span>
            </h2>
          </div>

          <p className="process-header-anim text-sm md:text-base text-[#F5F0E8]/75 max-w-md font-sans leading-relaxed">
            A linear, high-velocity methodology ensuring conceptual audacity is anchored by surgical technical execution.
          </p>
        </div>

        {/* Stepped Process Pipeline Bar (Desktop Visual Stepper) */}
        <div className="hidden lg:grid grid-cols-5 gap-3 mb-10">
          {PROCESS_STEPS.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 text-left rounded-sm border transition-all duration-200 cursor-pointer ${
                activeStep === idx
                  ? "bg-[#252220] text-[#F5F0E8] border-[#D85C3F] shadow-sm"
                  : "bg-white/[0.02] text-[#F5F0E8]/70 border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className={activeStep === idx ? "text-[#D85C3F]" : "text-[#F5F0E8]/50"}>
                  {step.step}
                </span>
                <span className="text-[10px] uppercase tracking-wider opacity-75">
                  {step.timeline}
                </span>
              </div>
              <h3 className="font-serif text-xl tracking-tight leading-snug">
                {step.name}
              </h3>
            </button>
          ))}
        </div>

        {/* Detailed Horizontal / Stepped Process Cards */}
        <div className="process-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`process-card-anim relative flex flex-col justify-between p-6 sm:p-7 rounded-sm border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#201e1d] border-[#D85C3F] shadow-xl ring-1 ring-[#D85C3F]/30"
                    : "bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.04]"
                }`}
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-white/10 mb-5">
                    <span className="font-bold text-[#D85C3F] text-sm">
                      {step.step}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#F5F0E8]/50">
                      {step.timeline}
                    </span>
                  </div>

                  {/* Step Name */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8] tracking-tight mb-4">
                    {step.name}
                  </h3>

                  {/* Step Summary */}
                  <p className="text-xs sm:text-sm text-[#F5F0E8]/75 font-sans leading-relaxed mb-6">
                    {step.summary}
                  </p>
                </div>

                {/* Focus Areas List */}
                <div className="pt-4 border-t border-white/10">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#D8E5D0] mb-2">
                    Key Focus Areas
                  </span>
                  <ul className="space-y-1.5">
                    {step.focus.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 text-xs font-mono text-[#F5F0E8]/85"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#D85C3F]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Flow Annotation */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#F5F0E8]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
            <span>PIPELINE: UNDERSTAND → CONCEPT → VISUAL DIRECTION → PRODUCTION → DELIVERY</span>
          </div>
          <span>AVERAGE SPRINT DURATION: 4 — 12 WEEKS</span>
        </div>
      </div>
    </section>
  );
}
