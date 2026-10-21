"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_PROJECTS, Project } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectInquiryModal from "@/components/ProjectInquiryModal";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Case study extended conceptual specifications
const EXTENDED_CASE_STUDIES: Record<
  string,
  {
    client: string;
    timeline: string;
    challenge: string;
    solution: string;
    artDirectionNotes: string[];
    technicalSpecs: { label: string; value: string }[];
  }
> = {
  "aura-parfum": {
    client: "VYNA Botanical Sparkling (Concept Specimen)",
    timeline: "8 Weeks Packaging & Tabletop Campaign",
    challenge:
      "Creating a sun-drenched, architectural visual world for botanical sparkling beverages that elevates aluminum beverage cans into tactile luxury design objects.",
    solution:
      "Engineered a terracotta brutalist plinth setting bathed in Mediterranean noon sun, contrasting clean serif typography with dewy condensation and ripe cross-section botanicals.",
    artDirectionNotes: [
      "Natural sunlit direct-shadow geometry balancing modern packaging with organic warmth",
      "Macro condensation choreography calibrated to realistic moisture droplet tension",
      "Palette anchored by raw terracotta brick, cobalt sky, and citrus pigments",
    ],
    technicalSpecs: [
      { label: "Capture Medium", value: "Hasselblad H6D-100c Medium Format" },
      { label: "Optics Suite", value: "HC Macro 120mm II" },
      { label: "Master Resolution", value: "11,600 x 8,700 px (100MP Master)" },
      { label: "Grading Suite", value: "Capture One Pro + DaVinci ACES" },
    ],
  },
  "chronos-metric": {
    client: "Poploop Confectionery (Concept Specimen)",
    timeline: "6 Weeks 3D CGI Simulation",
    challenge:
      "Visualizing hyper-tactile, mouth-watering candy gummies with kinetic fruit splash simulations that feel dynamic, joyful, and physically plausible.",
    solution:
      "Simulated multi-viscosity fluid dynamics in Houdini with dual-layer subsurface scattering shaders for translucent gummy rings, fresh fruit slices, and gloss splatter ribbons.",
    artDirectionNotes: [
      "Subsurface scattering calibrated to real gelatin transmission and sugar crystal refraction",
      "Explosive radial splash kinematics frozen at peak energetic tension",
      "Hyper-saturated primary yellow backdrop maximizing retail shelf presence",
    ],
    technicalSpecs: [
      { label: "Fluid Engine", value: "SideFX Houdini FLIP Solver (80M Particles)" },
      { label: "Render Engine", value: "Chaos V-Ray GPU / Redshift SSS Engine" },
      { label: "Texture Maps", value: "8K Micro-displacement with sugar crystal maps" },
      { label: "Color Space", value: "Display P3 Wide Gamut" },
    ],
  },
  "synapse-botanica": {
    client: "Aura Forma Spatial Archive (Concept Specimen)",
    timeline: "5 Weeks Abstract 3D Sculpture",
    challenge:
      "Exploring the tension between fluid organic warmth and rigid monolithic weight in a panoramic widescreen CGI centerpiece.",
    solution:
      "Crafted a panoramic 3D composition weaving translucent molten amber glass ribbons through raw porous stone arcs and mirror-polished chrome spheres.",
    artDirectionNotes: [
      "Optical dispersion caustics with thin-film volumetric absorption inside amber glass",
      "Contrast between coarse volcanic rock, textured travertine, and pristine chrome",
      "Dramatic low-key rim lighting accentuating flowing ribbon silhouettes",
    ],
    technicalSpecs: [
      { label: "Synthesis Core", value: "Parametric Spline Simulation + Octane Spectral Path Tracing" },
      { label: "Caustics Simulation", value: "Bi-directional Photon Mapping (32K Samples)" },
      { label: "Widescreen Aspect", value: "2.33:1 Ultra-Panoramic Architectural Scope" },
      { label: "Master Canvas", value: "1916 x 821 px Native Master Widescreen" },
    ],
  },
  "solis-olive": {
    client: "Solace Botanical Skincare (Concept Specimen)",
    timeline: "10 Weeks Packaging & Spatial Identity",
    challenge:
      "Formulating a tactile, serene identity for active botanical skincare rooted in Mediterranean olive extracts, travertine stone, and morning dappled light.",
    solution:
      "Designed frosted matte glass vessels with debossed modern serif typography, staged in an architectural olive courtyard with hand-carved travertine blocks.",
    artDirectionNotes: [
      "Natural olive leaf shadow cast across raw porous limestone plinths",
      "Soft frosted glass diffusion contrasting with brushed champagne-gold droppers",
      "Restrained earth-toned color hierarchy: travertine ivory, sage green, and warm bisque",
    ],
    technicalSpecs: [
      { label: "Substrate", value: "Frosted Recycled Flint Glass + FSC Paperboard" },
      { label: "Label Finish", value: "Debossed Hot Copper Foil on Cotton Paper" },
      { label: "Studio Lighting", value: "Simulated 10:00 AM Mediterranean Sunlight" },
      { label: "Master Stills", value: "Phase One IQ4 150MP Achromatic" },
    ],
  },
  "nocturne-optics": {
    client: "Atelier Form // Kroma (Concept Specimen)",
    timeline: "7 Weeks Spatial & Industrial Design",
    challenge:
      "Creating an architectural dialogue between iconic sculptural seating, technical outerwear apparel, and modern acrylic color accents.",
    solution:
      "Curated a high-contrast architectural set featuring an organic red ribbon chair, technical utilitarian garments, and a luminous cobalt acrylic plinth.",
    artDirectionNotes: [
      "Chiaroscuro architectural shadow geometry through an archway portal",
      "Bold primary color blocking: Studio Red, Cobalt Blue, and Warm Ivory",
      "Tactile garment details: matte technical nylon, waterproof seam taping, and lacquered orange sphere",
    ],
    technicalSpecs: [
      { label: "Set Architecture", value: "Custom Built Brutalist Archway + Cast Concrete Floor" },
      { label: "Apparel Direction", value: "Technical GORE-TEX Pro Specimen Direction" },
      { label: "Lighting Rig", value: "Broncolor Para 222FB + Fresnel Hard Cut" },
      { label: "Master Format", value: "Medium Format Digital (8K Master)" },
    ],
  },
};

interface CaseStudyClientProps {
  project: Project;
}

export default function CaseStudyClient({ project }: CaseStudyClientProps) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Entrance reveal
      gsap.from(".case-hero-text", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".case-hero-image-wrap", {
        scale: 0.96,
        opacity: 0,
        duration: 1.1,
        ease: "power3.inOut",
        delay: 0.2,
      });

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".case-scroll-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [project.id]);

  const details = EXTENDED_CASE_STUDIES[project.id] || {
    client: "Warli Concept Specimen",
    timeline: "Custom Sprint",
    challenge: "Engineering visual distinction in an oversaturated market.",
    solution: "Unified physical craftsmanship with high-fidelity digital execution.",
    artDirectionNotes: ["Art-directed lighting", "Meticulous color calibration"],
    technicalSpecs: [{ label: "Execution", value: "Proprietary Studio Pipeline" }],
  };

  // Find index and next project
  const currentIndex = FEATURED_PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject =
    FEATURED_PROJECTS[(currentIndex + 1) % FEATURED_PROJECTS.length];

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#171717] text-[#F5F0E8] flex flex-col selection:bg-[#D85C3F] selection:text-white"
    >
      <Header onOpenInquiry={() => setIsInquiryOpen(true)} />

      <main className="flex-1 pt-28 md:pt-36">
        {/* Navigation Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <div className="flex items-center justify-between py-4 border-b border-white/10 text-xs font-mono">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-[#F5F0E8]/70 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>RETURN TO WORK</span>
            </Link>

            <span className="text-[#D85C3F] uppercase tracking-wider">
              {project.conceptLabel} {"//"} 0{currentIndex + 1} OF 0{FEATURED_PROJECTS.length}
            </span>
          </div>
        </div>

        {/* Case Study Hero Header */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
          <div className="case-hero-text flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
            <span className="eyebrow-label text-[#F5F0E8]/60">
              {project.discipline} {"//"} {project.year}
            </span>
          </div>

          <h1 className="case-hero-text editorial-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F5F0E8] font-normal tracking-tight mb-6">
            {project.title}
          </h1>

          <p className="case-hero-text text-xl md:text-2xl text-[#D8E5D0] font-serif max-w-3xl leading-relaxed mb-10">
            {project.subtitle}
          </p>

          {/* Quick Meta Grid */}
          <div className="case-hero-text grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10 text-xs font-mono">
            <div>
              <span className="text-white/40 block mb-1">CLIENT {"//"} SPECIMEN</span>
              <span className="text-[#F5F0E8] font-medium">{details.client}</span>
            </div>
            <div>
              <span className="text-white/40 block mb-1">DISCIPLINE</span>
              <span className="text-[#D85C3F] font-medium">{project.discipline}</span>
            </div>
            <div>
              <span className="text-white/40 block mb-1">TIMELINE</span>
              <span className="text-[#F5F0E8] font-medium">{details.timeline}</span>
            </div>
            <div>
              <span className="text-white/40 block mb-1">CLASSIFICATION</span>
              <span className="text-[#F5F0E8] font-medium">{project.category}</span>
            </div>
          </div>
        </section>

        {/* Main Artwork Feature Visual */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="case-hero-image-wrap relative w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden border border-white/15 bg-[#1f1d1b] shadow-2xl">
            <Image
              src={project.imageSrc}
              alt={project.altText}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Corner Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171717]/85 backdrop-blur-sm text-[10px] font-mono uppercase tracking-[0.16em] text-[#F5F0E8] border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                {project.conceptLabel}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-[#D8E5D0] tracking-widest uppercase mb-1">
                  CORE SPECIMEN FOCUS
                </p>
                <p className="font-serif text-2xl text-white">
                  {project.subtitle}
                </p>
              </div>
              <span className="text-xs font-mono text-white/60">
                WARLI ARCHIVE {"//"} REF: {project.id.toUpperCase()}
              </span>
            </div>
          </div>
        </section>

        {/* Narrative Deep Dive: Challenge & Solution */}
        <section className="case-scroll-section max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="eyebrow-label text-[#D85C3F] block mb-3">
                THE OBJECTIVE {"//"} BRIEF
              </span>
              <h2 className="editorial-title text-3xl sm:text-4xl md:text-5xl text-[#F5F0E8] font-normal mb-6">
                Redefining category expectations through sensory form.
              </h2>
              <p className="text-base text-[#F5F0E8]/80 leading-relaxed font-sans mb-8">
                {project.description}
              </p>
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#BF4C32] transition-colors cursor-pointer"
              >
                <span>Commission Similar Work</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="lg:col-span-7 space-y-10 pl-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
              {/* Challenge */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D8E5D0]">
                  01. The Strategic Challenge
                </span>
                <p className="text-lg text-[#F5F0E8]/90 font-serif leading-relaxed">
                  {details.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D85C3F]">
                  02. Studio Execution & Solution
                </span>
                <p className="text-lg text-[#F5F0E8]/90 font-serif leading-relaxed">
                  {details.solution}
                </p>
              </div>

              {/* Art Direction Notes */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  Curated Art Direction Points
                </span>
                <div className="space-y-2">
                  {details.artDirectionNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-sm bg-white/[0.03] border border-white/5"
                    >
                      <span className="text-xs font-mono text-[#D85C3F] mt-0.5">
                        0{idx + 1}
                      </span>
                      <p className="text-sm text-[#F5F0E8]/85 font-sans">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Deliverables & Specifications Matrix */}
        <section className="case-scroll-section bg-[#1c1a19] py-20 border-y border-white/10 mb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
              <div>
                <span className="eyebrow-label text-[#D85C3F] block mb-2">
                  TECHNICAL MASTERY
                </span>
                <h3 className="editorial-title text-3xl sm:text-4xl text-[#F5F0E8]">
                  Production Deliverables & Engineering
                </h3>
              </div>
              <p className="text-xs font-mono text-white/60 max-w-xs">
                Zero compromised handoffs. Every specification calibrated for multi-channel luxury deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {details.technicalSpecs.map((spec, i) => (
                <div
                  key={i}
                  className="p-5 rounded-sm bg-white/[0.02] border border-white/10"
                >
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block mb-2">
                    {spec.label}
                  </span>
                  <p className="text-sm font-mono text-[#D8E5D0] font-medium">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Deliverables List */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 block mb-4">
                Delivered Assets Suite:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {project.deliverables.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-[#F5F0E8]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85C3F]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sequential Next Project Transition Footer */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="p-8 md:p-14 rounded-sm border border-white/15 bg-gradient-to-br from-[#22201e] to-[#171717] flex flex-col md:flex-row md:items-center justify-between gap-8 group">
            <div className="max-w-xl">
              <span className="eyebrow-label text-[#D85C3F] block mb-2">
                NEXT CASE STUDY {"//"} 0{((currentIndex + 1) % FEATURED_PROJECTS.length) + 1}
              </span>
              <h4 className="editorial-title text-4xl sm:text-5xl text-[#F5F0E8] group-hover:text-white transition-colors mb-2">
                {nextProject.title}
              </h4>
              <p className="text-sm text-white/70 font-sans">
                {nextProject.subtitle} — {nextProject.discipline}
              </p>
            </div>

            <Link
              href={`/work/${nextProject.id}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#171717] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#D85C3F] hover:text-white transition-all duration-300 self-start md:self-auto cursor-pointer"
            >
              <span>Explore Next Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        preselectedService={project.discipline}
      />
    </div>
  );
}
