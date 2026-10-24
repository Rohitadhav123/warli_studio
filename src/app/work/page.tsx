"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "Brand & Packaging", label: "Branding & Visual Identity" },
  { id: "3D CGI & Motion", label: "3D CGI & Product Visualisation" },
  { id: "3D Art Direction", label: "3D Art Direction" },
  { id: "Packaging & Identity", label: "Packaging Design" },
  { id: "Spatial & Industrial Design", label: "Spatial & Industrial Design" },
];

function matchesFilter(category: string, filterId: string): boolean {
  if (filterId === "all") return true;
  return category === filterId;
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = FEATURED_PROJECTS.filter((p) =>
    matchesFilter(p.category, activeFilter)
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-label", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.65,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll(".work-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    );
  }, [activeFilter]);

  return (
    <div
      className="min-h-screen bg-[#050505] text-white selection:bg-[#D85C3F] selection:text-white"
      style={{ fontFamily: "'Neue Montreal', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6">
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F] rounded-sm py-1"
          aria-label="Warli Archives Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/warli-logo-white.png"
            alt="Warli Archviz"
            className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D85C3F] group-hover:scale-125 transition-transform" />
        </Link>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
          >
            Home
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-white border-b border-white/50 pb-0.5">
            Work
          </span>
          <button
            onClick={() => router.push("/#services")}
            className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => router.push("/#contact")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#BF4C32] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Start a Project
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        <button
          className="md:hidden p-2 text-white cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/98 backdrop-blur-xl flex flex-col px-8 py-10">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/warli-logo-white.png"
                alt="Warli Archviz"
                className="h-7 w-auto object-contain"
              />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {[
              { label: "Home", href: "/" },
              { label: "Work", href: "/work" },
              { label: "Services", href: "/#services" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl text-white/70 hover:text-white transition-colors border-b border-white/10 pb-4 font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="pt-40 md:pt-52 pb-16 md:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="hero-label flex items-center gap-2 mb-10 md:mb-14">
          <span className="text-xs md:text-sm font-mono uppercase tracking-[0.22em] text-white/35">
            Our Work
          </span>
          <span className="text-white/35 text-sm">↘</span>
        </div>

        <h1 aria-label="We create distinctive brand worlds, bold visuals and experiences that make brands impossible to ignore.">
          {[
            { white: "We create", grey: "distinctive" },
            { white: null, grey: "brand worlds,", white2: "bold visuals" },
            { white: null, grey: "and experiences", white2: "that make" },
            { white: "brands", grey: "impossible", white2: "to ignore." },
          ].map((line, i) => (
            <div key={i} className="hero-line overflow-hidden leading-none">
              <span
                style={{
                  fontSize: "clamp(2.6rem, 6vw, 6.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.0,
                  display: "block",
                  paddingBottom: "0.08em",
                }}
              >
                {i === 0 && (
                  <>
                    <span className="text-white">{line.white} </span>
                    <span className="text-white/20">{line.grey}</span>
                  </>
                )}
                {i === 1 && (
                  <>
                    <span className="text-white/20">{line.grey} </span>
                    <span className="text-white">{line.white2}</span>
                  </>
                )}
                {i === 2 && (
                  <>
                    <span className="text-white/20">{line.grey} </span>
                    <span className="text-white">{line.white2}</span>
                  </>
                )}
                {i === 3 && (
                  <>
                    <span className="text-white">{line.white} </span>
                    <span className="text-white/20">{line.grey} </span>
                    <span className="text-white">{line.white2}</span>
                  </>
                )}
              </span>
            </div>
          ))}
        </h1>

        <div className="hero-sub mt-10 md:mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/8 pt-8">
          <p className="text-sm md:text-base text-white/35 max-w-md leading-relaxed">
            Concept specimens designed to demonstrate Warli Studios&apos; creative
            capability across film, 3D, AI and brand.
          </p>
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-white/20 whitespace-nowrap">
            {FEATURED_PROJECTS.length} Projects
          </span>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-16 md:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/25">
            Filter by
          </span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        <div className="overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex items-center gap-2 w-max md:w-auto md:flex-wrap">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.id;
              const count =
                f.id === "all"
                  ? FEATURED_PROJECTS.length
                  : FEATURED_PROJECTS.filter((p) =>
                    matchesFilter(p.category, f.id)
                  ).length;

              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  aria-pressed={isActive}
                  className={`group flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full border text-xs md:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F] ${isActive
                    ? "border-white bg-white text-black"
                    : "border-white/12 text-white/35 hover:border-white/35 hover:text-white/65"
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${isActive
                      ? "bg-black/40"
                      : "bg-white/20 group-hover:bg-white/45"
                      }`}
                  />
                  {f.label}
                  {count > 0 && (
                    <span
                      className={`text-[10px] font-mono tabular-nums ${isActive ? "text-black/40" : "text-white/20"
                        }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section
        className="px-6 md:px-12 max-w-[1400px] mx-auto pb-32"
        aria-label="Project portfolio"
      >
        {filtered.length === 0 ? (
          <div className="py-40 text-center">
            <p className="text-white/25 text-base font-mono tracking-wider">
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-20 lg:gap-x-10">
            {filtered.map((project, index) => (
              <WorkCard
                key={project.id}
                project={project}
                index={index}
                totalFiltered={filtered.length}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── FOOTER BAR ── */}
      <div className="border-t border-white/8 px-6 md:px-12 py-10 max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm text-white/35 hover:text-white transition-colors flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Studio
        </Link>
        <p className="text-xs font-mono text-white/20 uppercase tracking-wider">
          © 2026 Warli Studios — Independent Creative Production
        </p>
      </div>
    </div>
  );
}

// ── WORK CARD ──
interface WorkCardProps {
  project: (typeof FEATURED_PROJECTS)[0];
  index: number;
  totalFiltered: number;
}

function WorkCard({ project, index, totalFiltered }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);

  // Make first card span full width if odd total
  const isFullWidth = index === 0 && totalFiltered % 2 !== 0;

  return (
    <Link
      href={`/work/${project.id}`}
      className={`work-card group block relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F] rounded-xl ${isFullWidth ? "md:col-span-2" : ""
        }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View ${project.title}: ${project.subtitle}`}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden rounded-xl bg-[#111]"
        style={{
          aspectRatio: isFullWidth
            ? "21/9"
            : project.aspectRatio === "portrait"
              ? "4/5"
              : "16/10",
        }}
      >
        <Image
          src={project.imageSrc}
          alt={project.altText}
          fill
          sizes={
            isFullWidth
              ? "100vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] will-change-transform"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Hover reveal arrow */}
        <div
          className={`absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          aria-hidden="true"
        >
          <ArrowUpRight className="w-4 h-4 text-black" />
        </div>
      </div>

      {/* Meta */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/25">
              {project.category}
            </span>
            <span className="text-white/15 text-xs">·</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/18">
              {project.year}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-white/60 transition-colors leading-tight tracking-tight">
            {project.title}
          </h2>
          <p className="mt-1.5 text-sm text-white/35 leading-relaxed line-clamp-2">
            {project.subtitle}
          </p>
        </div>
        <ArrowUpRight
          className={`w-5 h-5 shrink-0 mt-1 transition-all duration-200 ${hovered
            ? "text-white translate-x-0.5 -translate-y-0.5"
            : "text-white/20"
            }`}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
