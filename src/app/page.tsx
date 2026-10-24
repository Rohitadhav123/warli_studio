"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import StudioIntroduction from "@/components/StudioIntroduction";
import IndustriesMarquee from "@/components/IndustriesMarquee";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ProjectInquiryModal from "@/components/ProjectInquiryModal";

export default function Home() {
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
      {/* 1. Sticky Editorial Navigation */}
      <Header onOpenInquiry={() => handleOpenInquiry()} />

      <main className="flex-1">
        {/* 2. Hero Section (Full-viewport dark section) */}
        <Hero onOpenInquiry={() => handleOpenInquiry()} />

        {/* 3. Featured Projects (Editorial asymmetric grid, Warm Ivory section) */}
        <FeaturedProjects onOpenInquiry={() => handleOpenInquiry()} />

        {/* 4. Studio Introduction (Ivory section with pull-quote statement) */}
        <StudioIntroduction onOpenInquiry={() => handleOpenInquiry()} />

        {/* 5. Industries We Aim to Work With (Typographic marquee & curated matrix) */}
        <IndustriesMarquee onOpenInquiry={handleOpenInquiry} />

        {/* 8. Final CTA (Large dark section: "Have a project in mind?") */}
        <CTASection onOpenInquiry={() => handleOpenInquiry()} />
      </main>

      {/* 9. Editorial Studio Footer */}
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
