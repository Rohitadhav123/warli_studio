export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  discipline: string;
  year: string;
  isConcept: true; // Strict requirement: clearly labeled as Concept Project
  conceptLabel: "Concept Project";
  description: string;
  deliverables: string[];
  imageSrc: string;
  altText: string;
  aspectRatio: "portrait" | "landscape" | "square";
  accentColor: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "deep-impact-protein",
    title: "Deep Impact",
    subtitle: "Plant Based Protein — Mango Vanilla Campaign",
    category: "Brand & Packaging",
    discipline: "Packaging & Visual Direction",
    year: "2025",
    isConcept: true,
    conceptLabel: "Concept Project",
    description:
      "Bold product photography and packaging direction for Deep Impact's Plant Based Protein line — mango vanilla flavour set against vibrant terracotta and tropical fruit styling.",
    deliverables: ["Product Photography", "Packaging Direction", "Campaign Stills", "Flavour Styling"],
    imageSrc: "/work-images/image-1.png",
    altText: "Concept Project: Deep Impact Plant Based Protein mango vanilla packaging campaign",
    aspectRatio: "portrait",
    accentColor: "#D85C3F",
  },
  {
    id: "chronos-metric",
    title: "Poploop",
    subtitle: "Dynamic Confectionery CGI & Hyper-Vibrant Packaging",
    category: "3D CGI & Motion",
    discipline: "Product Visualization & Fluid CGI",
    year: "2025",
    isConcept: true,
    conceptLabel: "Concept Project",
    description:
      "Hyper-tactile 3D fluid simulations and confectionery packaging design exploring kinetic fruit splashes and translucent gummy textures.",
    deliverables: ["3D Fluid Simulation", "Packaging Architecture", "Procedural Candy Shaders", "Motion Vignettes"],
    imageSrc: "/work-images/image-2.png",
    altText: "Concept Project: Poploop confectionery packaging with 3D fluid splashes and candy simulation",
    aspectRatio: "landscape",
    accentColor: "#EAB308",
  },
  {
    id: "synapse-botanica",
    title: "Aura Kinetic // Forma",
    subtitle: "Sensory Material Study & Widescreen Spatial Sculpture",
    category: "3D Art Direction",
    discipline: "Abstract 3D & Procedural Form",
    year: "2026",
    isConcept: true,
    conceptLabel: "Concept Project",
    description:
      "A panoramic material study in optical light refraction, featuring flowing amber glass ribbons, stone spheres, and chrome geometries.",
    deliverables: ["Widescreen Master Stills (8K)", "Optical Refraction Physics", "Procedural Glass Shading", "Spatial Exhibition Loop"],
    imageSrc: "/work-images/image-3.png",
    altText: "Concept Project: Widescreen abstract 3D sculpture with translucent amber glass ribbons and stone spheres",
    aspectRatio: "landscape",
    accentColor: "#D85C3F",
  },
  {
    id: "solis-olive",
    title: "Solace Botanicals",
    subtitle: "Tactile Skincare Identity & Vessel Architecture",
    category: "Packaging & Identity",
    discipline: "Brand Architecture & Packaging",
    year: "2025",
    isConcept: true,
    conceptLabel: "Concept Project",
    description:
      "Frosted glass skincare vessels with debossed serif typography resting on raw travertine plinths and Mediterranean olive foliage.",
    deliverables: ["Custom Glass Vessels", "Debossed Label Typography", "Travertine Editorial Stills", "Box Architecture"],
    imageSrc: "/work-images/image-4.png",
    altText: "Concept Project: Solace Botanical Skincare frosted glass bottles on travertine plinths",
    aspectRatio: "portrait",
    accentColor: "#D8E5D0",
  },
  {
    id: "nocturne-optics",
    title: "Atelier Form // Kroma",
    subtitle: "Sculptural Furniture & Technical Apparel Editorial",
    category: "Spatial & Industrial Design",
    discipline: "Industrial Design & Spatial Editorial",
    year: "2026",
    isConcept: true,
    conceptLabel: "Concept Project",
    description:
      "A spatial dialogue between bold sculptural ergonomic furniture, technical nylon apparel, and vibrant acrylic geometries.",
    deliverables: ["Spatial Set Direction", "Ergonomic Furniture Form", "Material Contrast Study", "Editorial Stills"],
    imageSrc: "/work-images/image-5.png",
    altText: "Concept Project: Red sculptural ergonomic chair, technical jacket, and cobalt acrylic plinth",
    aspectRatio: "landscape",
    accentColor: "#D85C3F",
  },
];
