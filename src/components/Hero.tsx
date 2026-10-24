"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from "lucide-react";

interface HeroProps {
  onOpenInquiry: () => void;
}

export default function Hero({ onOpenInquiry }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Exact public URL for existing local video in public/hero_vedio
  const videoSrc = "/hero_vedio/WhatsApp%20Video%202026-10-24%20at%209.17.34%20AM.mp4";

  const handleScrollToWork = () => {
    const workElem = document.getElementById("work");
    if (workElem) {
      workElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    } else if (videoRef.current) {
      videoRef.current.muted = true;
      if (videoRef.current.paused) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { });
        }
      }
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-[#171717] text-[#F5F0E8] pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden border-b border-white/10"
      aria-label="Warli Studio Cinematic Hero Showcase"
    >
      {/* Background Architectural Grid Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="border-r border-white/10 h-full" />
          <div className="border-r border-white/10 h-full hidden md:block" />
          <div className="border-r border-white/10 h-full hidden md:block" />
          <div className="border-r border-white/10 h-full" />
        </div>
      </div>

      {/* Main Hero Container with Breathing Margins */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        {/* Cinematic Video Card with Radical Rounded Border (Instant Zero-Delay Presentation) */}
        <div
          className="relative w-full h-[72vh] sm:h-[80vh] md:h-[85vh] max-h-[860px] min-h-[480px] rounded-2xl sm:rounded-3xl lg:rounded-[36px] overflow-hidden border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_60px_rgba(216,92,63,0.12)] bg-[#121212] flex flex-col justify-between p-6 sm:p-8 md:p-12"
        >
          {/* High-Definition Background Video Element - Instant Load with Faststart and 0ms Poster */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero_vedio/hero-poster.jpg"
            onCanPlay={(e) => {
              const vid = e.currentTarget;
              if (vid.paused) {
                vid.play().catch(() => { });
              }
            }}
            onError={() => setHasError(true)}
            style={{
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none contrast-[1.04] brightness-[1.02]"
          >
            {/* Ultra-responsive fast-start stream for immediate playback */}
            <source src="/hero_vedio/hero-stream.mp4" type="video/mp4" />
            {/* Existing local video fallback */}
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Fallback only in rare case of media decode error */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#141414] text-white/50 z-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/warli-logo-white.png"
                alt="Warli Archviz"
                className="h-10 w-auto object-contain opacity-30 mb-3"
              />
              <span className="text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/40">
                Cinematic Showcase Active
              </span>
            </div>
          )}

          {/* Minimalist Studio Vignettes: Keeps 80% of video 100% crystal clear while preserving text legibility */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

          {/* Top Bar inside Video Frame */}
          <div className="relative z-20 flex items-center justify-between gap-4">
            {/* Reel Status Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#D85C3F] animate-pulse" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/warli-logo-white.png"
                alt="Warli Archviz"
                className="h-3.5 w-auto object-contain opacity-95"
              />
            </div>

            {/* Accessible Audio Control (Speaker Icon Only) */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 hover:text-white hover:bg-black/80 transition-all flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F]"
                aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
                title={isMuted ? "Sound Off (Click to unmute)" : "Sound On (Click to mute)"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-white/70" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#D85C3F]" />
                )}
              </button>
            </div>
          </div>

          {/* Bottom Content inside Video Frame */}
          <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pt-12">
            <div className="max-w-2xl">
              {/* Oversized Headline */}
              <h1 className="editorial-title text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] text-[#F5F0E8] font-extrabold tracking-[-0.04em] leading-[0.96] mb-2 sm:mb-3">
                Make Your Brand{" "}
                <span className="editorial-italic font-extrabold text-[#F5F0E8]">
                  Impossible
                </span>{" "}
                to{" "}
                <span className="text-[#D85C3F] relative inline-block">
                  Ignore.
                </span>
              </h1>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
              <button
                onClick={handleScrollToWork}
                className="px-6 py-3 rounded-full bg-white text-[#171717] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#F5F0E8] transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F]"
              >
                <span>View Work</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenInquiry}
                className="px-6 py-3 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#BF4C32] transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Generous Margin and Bottom Scroll Meta Strip */}
        <div className="mt-8 md:mt-12 flex items-center justify-between text-xs text-[#F5F0E8]/50 font-mono">
          <button
            onClick={handleScrollToWork}
            className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group"
            aria-label="Scroll down to featured projects"
          >
            <span className="w-5 h-[1.5px] bg-[#D85C3F] group-hover:w-8 transition-all" />
            <span className="uppercase tracking-[0.2em] text-[11px]">
              Scroll to explore
            </span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#D85C3F]" />
          </button>

          <div className="hidden sm:flex items-center gap-4 text-[11px] uppercase tracking-wider">
            <span>Operating Globally</span>
            <span>{"//"}</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
