import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import ColorBlendingCursor from "@/components/ColorBlendingCursor";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Warli Studios — Independent Creative Production & Brand Design",
  description:
    "Make Your Brand Impossible to Ignore. Independent creative production and brand design studio specializing in Live Shoots, 3D CGI, AI Content, Branding, and Packaging.",
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
    <html
      lang="en"
      className={`${instrumentSerif.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=neue-montreal@400,500,600,700&display=swap"
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
