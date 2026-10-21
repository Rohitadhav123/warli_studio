"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
    { label: "Behance", href: "https://behance.net" },
  ];

  return (
    <footer
      className="bg-[#121212] text-[#F5F0E8] pt-20 pb-12 border-t border-white/10"
      aria-label="Studio Footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Studio Brand & Wordmark (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="group inline-flex items-baseline gap-2 mb-6"
                aria-label="Warli Studios"
              >
                <span className="font-serif text-3xl md:text-4xl tracking-tight text-[#F5F0E8] group-hover:text-white transition-colors">
                  Warli Studios
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D85C3F]" />
              </Link>

              <p className="text-sm text-[#F5F0E8]/70 max-w-sm font-sans leading-relaxed mb-8">
                An independent creative production and brand design studio. We produce film, 3D CGI, AI content, visual identity, and packaging for brands seeking category dominance.
              </p>
            </div>

            <div className="text-xs font-mono text-[#F5F0E8]/50 space-y-1">
              <p>Tagline: “Make Your Brand Impossible to Ignore.”</p>
              <p>Operating Globally // Inquiries: direct-to-director</p>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3">
            <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#D85C3F] mb-6">
              Navigation
            </span>
            <ul className="space-y-3 font-sans text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#F5F0E8]/70 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D85C3F]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#D85C3F] mb-6">
                Inquiries & Social
              </span>

              <div className="mb-6">
                <a
                  href="mailto:inquiries@warlistudios.com"
                  className="font-serif text-xl sm:text-2xl text-[#F5F0E8] hover:text-[#D85C3F] transition-colors underline decoration-white/20 underline-offset-4"
                >
                  inquiries@warlistudios.com
                </a>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#F5F0E8]/70">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors border-b border-transparent hover:border-[#D85C3F] pb-0.5"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <div className="pt-8">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F5F0E8]/60 hover:text-white transition-colors cursor-pointer group"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D85C3F] group-hover:text-[#D85C3F] transition-colors">
                  <ArrowUp className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Studio Note */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#F5F0E8]/50">
          <p>© 2026 Warli Studios. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Independent Creative Practice</span>
            <span>•</span>
            <span>All Featured Works: Concept Projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
