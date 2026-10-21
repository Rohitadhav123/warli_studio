export interface ServiceItem {
  number: string;
  id: string;
  title: string;
  shortDescription: string;
  deliverables: string[];
  capabilities: string[];
}

export const STUDIO_SERVICES: ServiceItem[] = [
  {
    number: "01",
    id: "live-shoots",
    title: "Live Shoots & Film Production",
    shortDescription:
      "Narrative-driven brand films, commercial cinematography, and high-fashion table-top productions executed with cinematic lighting and meticulous art direction.",
    deliverables: [
      "Brand Hero Films (4K/6K)",
      "High-Speed Tabletop & Macro",
      "Talent Casting & Art Direction",
      "Full Post-Production & Color Grade",
      "Spatial & Original Sound Design",
    ],
    capabilities: [
      "Concept treatment & storyboards",
      "On-set crew & equipment direction",
      "Custom set styling & tactile props",
      "DaVinci Resolve mastering",
    ],
  },
  {
    number: "02",
    id: "3d-cgi",
    title: "3D CGI & Product Visualization",
    shortDescription:
      "Photorealistic digital recreations, kinetic mechanical deconstructions, and surreal luxury product staging unbound by physical physics.",
    deliverables: [
      "Sub-Millimeter CAD Retopology",
      "Photorealistic 8K Stills",
      "Exploded Mechanism Animations",
      "Fluid, Cloth & Smoke Dynamics",
      "AR / Real-Time 3D Web Assets",
    ],
    capabilities: [
      "Subsurface scattering & complex materials",
      "Micro-displacement & fine textures",
      "Dynamic lighting environments",
      "Custom procedural shaders",
    ],
  },
  {
    number: "03",
    id: "ai-content",
    title: "AI Content Creation",
    shortDescription:
      "Art-directed hybrid workflows blending fine-tuned generative models with master retouching to expand creative bandwidth and craft novel visual territories.",
    deliverables: [
      "Custom Brand Model LoRAs",
      "Algorithmic Concept Key Visuals",
      "Rapid Visual Worldbuilding",
      "High-Fidelity AI Retouching & Upscaling",
      "Generative Video Micro-Loops",
    ],
    capabilities: [
      "Proprietary prompt architecture",
      "Style consistency across hero frames",
      "Photorealistic composite finishing",
      "Ethical data training protocols",
    ],
  },
  {
    number: "04",
    id: "branding-identity",
    title: "Branding & Visual Identity",
    shortDescription:
      "Holistic identity architectures built to endure: bespoke typography, modular visual systems, strategic positioning, and art-directed brand collateral.",
    deliverables: [
      "Brand Positioning & Manifesto",
      "Bespoke Monogram & Wordmark",
      "Comprehensive Design System",
      "Custom Editorial Typography",
      "Guidelines & Multi-Channel Toolkits",
    ],
    capabilities: [
      "Semiotic analysis & competitive audit",
      "Vector mastery & grid rules",
      "Editorial print & digital specs",
      "Internal design governance",
    ],
  },
  {
    number: "05",
    id: "packaging-design",
    title: "Packaging Design",
    shortDescription:
      "Tactile, unboxing-obsessed packaging design pairing sustainable structural innovation with sculptural luxury finishes and precision print production.",
    deliverables: [
      "Custom Structural Diellines",
      "Substrate & Paper Stock Sourcing",
      "Deboss, Emboss & Foil Stamping",
      "Secondary Rigid Box Engineering",
      "Vendor-Ready Production Artworking",
    ],
    capabilities: [
      "Material recyclability advisory",
      "Weight distribution & shelf presence",
      "Color separation & press checks",
      "Tactile unboxing choreography",
    ],
  },
];
