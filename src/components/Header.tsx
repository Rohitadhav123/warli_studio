"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";

interface HeaderProps {
  onOpenInquiry: () => void;
}

export default function Header({ onOpenInquiry }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll and animate mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
        );
        gsap.fromTo(
          ".mobile-nav-link",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.1 }
        );
      }
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Work", href: "/#work", hash: "work" },
    { label: "About", href: "/#about", hash: "about" },
    { label: "Services", href: "/#services", hash: "services" },
    { label: "Contact", href: "/#contact", hash: "contact" },
  ];

  const handleNavClick = (href: string, hash: string) => {
    setMobileMenuOpen(false);

    if (pathname === "/") {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? "bg-[#171717]/92 backdrop-blur-md border-b border-white/10 py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6 md:py-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Company Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F] rounded-sm py-1"
            aria-label="Warli Archives Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/warli-logo-white.png"
              alt="Warli Archviz"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D85C3F] group-hover:scale-125 transition-transform" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-10"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.hash);
                }}
                className="text-xs uppercase tracking-[0.2em] text-[#F5F0E8]/70 hover:text-white transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D85C3F] rounded-sm group cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D85C3F] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#BF4C32] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717] shadow-sm cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenInquiry}
              className="px-3.5 py-1.5 rounded-full bg-[#D85C3F] text-white text-[10px] uppercase tracking-[0.15em] font-medium"
            >
              Start
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F5F0E8] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85C3F] rounded-sm cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay with GSAP Staggered Entrance */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-50 bg-[#171717]/98 backdrop-blur-xl flex flex-col justify-between px-8 py-10 text-[#F5F0E8]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
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
              className="p-2 text-white/80 hover:text-white rounded-full border border-white/10 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-5 my-auto py-8">
            {navLinks.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.hash);
                }}
                className="mobile-nav-link group flex items-baseline justify-between py-3 border-b border-white/10 cursor-pointer"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-[#D85C3F]">0{idx + 1}</span>
                  <span className="font-serif text-4xl text-[#F5F0E8] group-hover:text-[#D85C3F] transition-colors">
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
              </a>
            ))}
          </nav>

          {/* Bottom Actions & Studio Details */}
          <div className="space-y-6 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#D85C3F] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#BF4C32] transition-colors cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#F5F0E8]/60 font-mono">
              <p>inquiries@warlistudios.com</p>
              <p>Independent Creative Production</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
