export interface IndustryItem {
  name: string;
  code: string;
  description: string;
}

export const TARGET_INDUSTRIES: IndustryItem[] = [
  {
    name: "Fashion & Lifestyle",
    code: "IND / 01",
    description: "High-end couture, contemporary apparel, leather goods, and timeless accessories.",
  },
  {
    name: "Beauty & Skincare",
    code: "IND / 02",
    description: "Niche perfumery, clean dermatological skincare, and prestige beauty formulations.",
  },
  {
    name: "Food & Beverage",
    code: "IND / 03",
    description: "Artisanal spirits, single-origin provisions, and culinary hospitality concepts.",
  },
  {
    name: "D2C / Consumer Products",
    code: "IND / 04",
    description: "Disruptive physical goods, luxury electronics, and tactile personal hardware.",
  },
  {
    name: "Technology",
    code: "IND / 05",
    description: "Foundational AI infrastructure, spatial computing, and progressive software tools.",
  },
  {
    name: "Real Estate & Architecture",
    code: "IND / 06",
    description: "Sculptural residential developments, heritage restorations, and cultural spaces.",
  },
  {
    name: "Startups & Ventures",
    code: "IND / 07",
    description: "Venture-backed innovators seeking category definition from day one.",
  },
];
