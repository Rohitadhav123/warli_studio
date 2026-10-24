import type { Metadata } from "next";
import "./globals.css";
import ColorBlendingCursor from "@/components/ColorBlendingCursor";

export const metadata: Metadata = {
  title: "Warli Studios — Independent Creative Production & Brand Design",
  description:
    "Make Your Brand Impossible to Ignore. Independent creative production and brand design studio specializing in Live Shoots, 3D CGI, AI Content, Branding, and Packaging.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: [
    "Warli Studios",
    "Creative Production",
    "Brand Design",
    "3D CGI",
    "Film Production",
    "Packaging Design",
    "Visual Identity",
  ],
  authors: [{ name: "Warli Studios" }],
  openGraph: {
    title: "Warli Studios — Make Your Brand Impossible to Ignore",
    description:
      "A creative studio for live production, 3D CGI, AI-powered content, branding and packaging.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Browser Tab Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon.png" />

        {/* Instant Hero Video Preload: Starts streaming bytes at millisecond zero */}
        <link rel="preload" href="/hero_vedio/hero-poster.jpg" as="image" />
        <link
          rel="preload"
          href="/hero_vedio/hero-stream.mp4"
          as="video"
          type="video/mp4"
        />

        {/* Fontshare: Cabinet Grotesk (Architectural Display) + Neue Montreal (Body) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&f[]=neue-montreal@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* Google Fonts: Space Mono (Technical Optics & Coordinates) + Syne (Architectural Grotesque) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#171717] text-[#F5F0E8] font-sans antialiased selection:bg-[#D85C3F] selection:text-white">
        {children}
        <ColorBlendingCursor />
      </body>
    </html>
  );
}
