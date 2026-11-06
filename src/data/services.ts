export interface ServiceMilestone {
  phase: string;
  title: string;
  timeline: string;
  description: string;
}

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  filterCategory: "production" | "3d" | "ai" | "design" | "digital";
  tagline: string;
  summary: string;
  accent: string;
  iconName: "Video" | "Box" | "Sparkles" | "Palette" | "PackageCheck" | "Layout";
  turnaround: string;
  idealFor: string;
  highlightMetric: {
    label: string;
    value: string;
  };
  deliverableTags: string[];
  capabilities: {
    name: string;
    desc: string;
  }[];
  process: ServiceMilestone[];
  outputFormats: string[];
  toolsAndTech: string[];
  whyWarli: string[];
}

export const STUDIO_SERVICES: ServiceDetail[] = [
  {
    id: "live-shoots-film-production",
    number: "01",
    title: "Live Shoots & Film Production",
    shortTitle: "Live Shoots & Film",
    category: "Cinematography & Direction",
    filterCategory: "production",
    tagline: "Narrative brand films, commercial campaigns, and sensory product cinematography.",
    summary:
      "We direct and produce cinematic films designed to connect with audiences on an emotional level. From commercial spots to macro product captures, we craft imagery that lingers in memory.",
    accent: "#D85C3F",
    iconName: "Video",
    turnaround: "2 – 4 Weeks",
    idealFor: "Brand Campaigns, Product Launches & Television Spots",
    highlightMetric: {
      label: "Standard",
      value: "Cinema Grade",
    },
    deliverableTags: [
      "Commercial Films",
      "Product Cinematography",
      "Creative Direction",
      "Color & Sound",
    ],
    capabilities: [
      {
        name: "Commercial Film Direction",
        desc: "Script-to-screen creative direction engineered to grip audience attention and tell a compelling story.",
      },
      {
        name: "Macro & Product Cinematography",
        desc: "Tactile textures, fluid movements, and exquisite detail that make products come alive.",
      },
      {
        name: "Set Design & Styling",
        desc: "Bespoke architectural environments, lighting rigs, and styling tailored to your brand identity.",
      },
      {
        name: "Editorial & Color Grading",
        desc: "Cinematic color grading, dynamic sound design, and master finishing for broadcast and web.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Concept & Treatment",
        timeline: "Week 1",
        description: "Storyboarding, visual treatments, styling direction, location scouting, and talent casting.",
      },
      {
        phase: "Phase 02",
        title: "Principal Filming",
        timeline: "Week 2",
        description: "Studio or on-location production with cinema packages, precision rigs, and tailored lighting.",
      },
      {
        phase: "Phase 03",
        title: "Editorial & Color",
        timeline: "Week 3",
        description: "Editorial assembly, bespoke sound mix, motion graphics, and rich cinematic color grading.",
      },
      {
        phase: "Phase 04",
        title: "Master Delivery",
        timeline: "Week 4",
        description: "Full resolution master films, vertical cuts for social, and optimized web teaser cuts.",
      },
    ],
    outputFormats: [
      "Master Films (4K ProRes)",
      "Social Cutdowns (9:16)",
      "Cinematic Teasers",
      "Spatial & Stereo Audio",
    ],
    toolsAndTech: [
      "Cinema Cameras",
      "Prime Anamorphic Lenses",
      "Studio Lighting Rigs",
      "DaVinci Resolve Studio",
    ],
    whyWarli: [
      "Direct collaboration with creative directors — no agency layers.",
      "In-house studio styling with meticulous lighting control.",
      "Versatile cuts formatted directly for high-impact brand campaigns.",
    ],
  },
  {
    id: "3d-cgi-product-visualization",
    number: "02",
    title: "3D CGI & Spatial Design",
    shortTitle: "3D CGI & Spatial",
    category: "Photorealism & Motion",
    filterCategory: "3d",
    tagline: "Photorealistic spatial renders, fluid simulations, and kinetic motion.",
    summary:
      "Free from physical limitations, we craft hyper-realistic 3D scenes, tactile materials, and fluid motion animations that showcase your product with extraordinary artistry.",
    accent: "#E27B58",
    iconName: "Box",
    turnaround: "1 – 3 Weeks",
    idealFor: "Consumer Goods, Architecture, Luxury Packaging & Hardware",
    highlightMetric: {
      label: "Fidelity",
      value: "Ultra Photoreal",
    },
    deliverableTags: [
      "Photoreal Stills",
      "Kinetic Animations",
      "Material Design",
      "Spatial Renders",
    ],
    capabilities: [
      {
        name: "Photorealistic 3D Modeling",
        desc: "Precise digital modeling crafted from physical samples, blueprints, or concept sketches.",
      },
      {
        name: "Material & Texture Craft",
        desc: "Tactile glass refractions, brushed metals, organic surfaces, and bespoke liquid viscosity.",
      },
      {
        name: "Motion & Dynamic Simulation",
        desc: "Choreographed camera movements, exploded view sequences, and fluid physics.",
      },
      {
        name: "Interactive 3D Assets",
        desc: "Lightweight 3D models optimized for seamless interaction on modern websites.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "3D Modeling & Framing",
        timeline: "Days 1–3",
        description: "Building clean digital geometry and framing optimal camera perspectives.",
      },
      {
        phase: "Phase 02",
        title: "Materials & Lighting",
        timeline: "Days 4–7",
        description: "Crafting bespoke lighting environments and realistic tactile surface textures.",
      },
      {
        phase: "Phase 03",
        title: "Animation & Dynamics",
        timeline: "Week 2",
        description: "Choreographing camera moves, exploded parts, and dynamic physics simulations.",
      },
      {
        phase: "Phase 04",
        title: "Master Compositing",
        timeline: "Week 3",
        description: "High-resolution rendering, optical grading, and delivering print and digital masters.",
      },
    ],
    outputFormats: [
      "Ultra-High-Res Print Stills",
      "Seamless Motion Animations",
      "Transparent Asset Cutouts",
      "Interactive 3D Web Models",
    ],
    toolsAndTech: [
      "Cinema 4D & Houdini",
      "Redshift & Octane Render",
      "Substance 3D Materials",
      "Unreal Engine 5",
    ],
    whyWarli: [
      "Bypasses physical manufacturing delays with stunning pre-launch imagery.",
      "Enables impossible camera angles and weightless spatial perspectives.",
      "Assets built once and reused across web, video, and print.",
    ],
  },
  {
    id: "ai-content-creation",
    number: "03",
    title: "AI Visuals & Generative Art",
    shortTitle: "AI Visuals & Art",
    category: "Concept Art & Generative Media",
    filterCategory: "ai",
    tagline: "Rapid concept exploration, synthetic environments, and campaign visual iterations.",
    summary:
      "We fuse generative models with human art direction to explore endless aesthetic possibilities, crafting campaign visuals and conceptual imagery with exceptional agility.",
    accent: "#81B29A",
    iconName: "Sparkles",
    turnaround: "3 – 7 Days",
    idealFor: "Creative Ideation, Social Campaigns & High-Volume Content",
    highlightMetric: {
      label: "Advantage",
      value: "Rapid Iteration",
    },
    deliverableTags: [
      "Concept Art",
      "Campaign Variations",
      "Surreal Worlds",
      "Generative Motion",
    ],
    capabilities: [
      {
        name: "Custom Brand Fine-Tuning",
        desc: "Tailoring generative models to align precisely with your brand visual language and color ethos.",
      },
      {
        name: "Surreal World Creation",
        desc: "Placing your products into imaginative, luxurious, or futuristic environments.",
      },
      {
        name: "Generative Motion Loops",
        desc: "Hypnotic animated loops and fluid visual transformations that stop the scroll.",
      },
      {
        name: "Human Art Direction & Retouching",
        desc: "Every visual is refined by experienced artists to ensure flawless luxury finish.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Style & Direction",
        timeline: "Days 1–2",
        description: "Defining mood boards, aesthetic parameters, and reference visual palettes.",
      },
      {
        phase: "Phase 02",
        title: "Generative Exploration",
        timeline: "Days 3–4",
        description: "Producing dozens of artistic directions, lighting moods, and unique compositions.",
      },
      {
        phase: "Phase 03",
        title: "Curation & Selection",
        timeline: "Day 5",
        description: "Selecting the strongest concepts that elevate the campaign narrative.",
      },
      {
        phase: "Phase 04",
        title: "High-Res Finishing",
        timeline: "Days 6–7",
        description: "Hand-retouching, upscaling to print quality, and final color polish.",
      },
    ],
    outputFormats: [
      "High-Resolution Print Files",
      "Animated Motion Loops",
      "Social-Ready Aspect Packs",
      "Brand Concept Galleries",
    ],
    toolsAndTech: [
      "Advanced Diffusion Models",
      "Custom Generative Workflows",
      "Adobe Photoshop Retouching",
      "High-Fidelity AI Upscalers",
    ],
    whyWarli: [
      "Art-directed by senior creatives — never looks like generic, raw AI.",
      "Enables rapid creative testing and rich visual variation.",
      "Substantially faster concept turnaround without compromising quality.",
    ],
  },
  {
    id: "branding-visual-identity",
    number: "04",
    title: "Brand Identity & Design Systems",
    shortTitle: "Brand Identity",
    category: "Visual Identity & Art Direction",
    filterCategory: "design",
    tagline: "Distinctive logomarks, architectural typography, and cohesive brand systems.",
    summary:
      "We build timeless brand identities that give visionary companies an unmistakable presence. Balancing typographical rigor with emotional resonance, we craft identities that endure.",
    accent: "#F2CC8F",
    iconName: "Palette",
    turnaround: "3 – 6 Weeks",
    idealFor: "New Category Creators, Modern Ventures & Comprehensive Rebrands",
    highlightMetric: {
      label: "Depth",
      value: "Full Brand System",
    },
    deliverableTags: [
      "Logomark & Identity",
      "Typography Systems",
      "Brand Guidelines",
      "Design Systems",
    ],
    capabilities: [
      {
        name: "Positioning & Creative Direction",
        desc: "Clarifying your brand essence, visual tone of voice, and distinct market positioning.",
      },
      {
        name: "Logotype & Symbol Design",
        desc: "Custom symbols, refined lettering, and versatile marks across physical and digital media.",
      },
      {
        name: "Typography & Color Architecture",
        desc: "Curated type pairings and distinctive color palettes that express brand character.",
      },
      {
        name: "Living Brand Guidelines",
        desc: "Clear, practical guidelines covering visual rules, layout principles, and asset libraries.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Discovery & Alignment",
        timeline: "Week 1",
        description: "Uncovering your brand story, competitive landscape, and visual aspirations.",
      },
      {
        phase: "Phase 02",
        title: "Creative Pathways",
        timeline: "Weeks 2–3",
        description: "Presenting distinct visual directions brought to life across key brand touchpoints.",
      },
      {
        phase: "Phase 03",
        title: "System Refinement",
        timeline: "Week 4",
        description: "Fleshing out the chosen direction: typography, secondary marks, and icon suites.",
      },
      {
        phase: "Phase 04",
        title: "Guidelines & Asset Handoff",
        timeline: "Weeks 5–6",
        description: "Delivering complete vector master packages, design tokens, and comprehensive brand books.",
      },
    ],
    outputFormats: [
      "Master Vector Packages (SVG, PDF, EPS)",
      "Print & Digital Color Swatches",
      "Figma Design Systems",
      "Comprehensive Brand Book",
    ],
    toolsAndTech: [
      "Figma Design Systems",
      "Adobe Illustrator & InDesign",
      "Custom Typographic Tools",
      "Pantone Color Matching",
    ],
    whyWarli: [
      "Rooted in both cultural heritage and timeless editorial minimalism.",
      "Designed for practical, effortless rollout across all marketing channels.",
      "Complete master files and asset ownership from day one.",
    ],
  },
  {
    id: "packaging-design",
    number: "05",
    title: "Packaging Design & Physical Experience",
    shortTitle: "Packaging Design",
    category: "Physical & Structural Design",
    filterCategory: "design",
    tagline: "Tactile materials, specialty print finishes, and memorable unboxing experiences.",
    summary:
      "Packaging is the most tangible expression of a brand. We craft custom dielines, curated sustainable materials, and striking label art that turn everyday packaging into an unboxing ritual.",
    accent: "#E07A5F",
    iconName: "PackageCheck",
    turnaround: "2 – 5 Weeks",
    idealFor: "CPG Brands, Food & Beverage, Cosmetics & Luxury Goods",
    highlightMetric: {
      label: "Impact",
      value: "Shelf Distinction",
    },
    deliverableTags: [
      "Structural Dielines",
      "Specialty Finishes",
      "Sustainable Materials",
      "Print-Ready Masters",
    ],
    capabilities: [
      {
        name: "Structural Dieline Engineering",
        desc: "Custom box geometries, tactile unboxing flows, and functional product protection.",
      },
      {
        name: "Label Design & Typographic Art",
        desc: "Striking front-of-pack graphics harmonized with regulatory details and barcode integration.",
      },
      {
        name: "Specialty Finishes & Foil Specs",
        desc: "Foil hot-stamping, blind embossing, spot varnishes, and soft-touch tactile coatings.",
      },
      {
        name: "Print Production Coordination",
        desc: "Direct communication with packaging manufacturers to inspect proofs and ensure color perfection.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Shelf Audit & Substrates",
        timeline: "Week 1",
        description: "Assessing shelf context, tactile paper stocks, and sustainable material options.",
      },
      {
        phase: "Phase 02",
        title: "Dieline & Artwork Concepts",
        timeline: "Weeks 2–3",
        description: "Iterating on label architecture, hierarchy, and physical packaging form factors.",
      },
      {
        phase: "Phase 03",
        title: "3D Virtual Proofing",
        timeline: "Week 4",
        description: "Evaluating 3D renders of the package in realistic retail lighting before pressing.",
      },
      {
        phase: "Phase 04",
        title: "Print Production Ready",
        timeline: "Week 5",
        description: "Preparing layered print-ready files with exact Pantone inks and dielines.",
      },
    ],
    outputFormats: [
      "Print-Ready Press PDFs",
      "Layered Vector Dielines",
      "Pantone Spot Color Specs",
      "3D Renders for E-Commerce",
    ],
    toolsAndTech: [
      "Packaging CAD Software",
      "Adobe Illustrator Master Files",
      "3D Photorealistic Proofing",
      "Pantone Formula Guides",
    ],
    whyWarli: [
      "Engineered for both physical shelf impact and social unboxing moments.",
      "Direct printer coordination to eliminate manufacturing surprises.",
      "Meticulous attention to paper weight, foil registration, and tactile finish.",
    ],
  },
  {
    id: "website-design-digital-experience",
    number: "06",
    title: "Digital Flagships & Web Experiences",
    shortTitle: "Web & Digital Experience",
    category: "Interactive & Digital Design",
    filterCategory: "digital",
    tagline: "Bespoke digital flagships with editorial typography, fluid motion, and swift performance.",
    summary:
      "We design and build bespoke web experiences that merge editorial beauty with fluid interactions. Immersive, intuitive, and designed to turn visitors into dedicated brand advocates.",
    accent: "#3D5A80",
    iconName: "Layout",
    turnaround: "3 – 6 Weeks",
    idealFor: "Modern Brands, Creative Studios, Portfolios & Direct-to-Consumer",
    highlightMetric: {
      label: "Experience",
      value: "Fluid & Tactile",
    },
    deliverableTags: [
      "Editorial UI/UX",
      "Interactive Web",
      "Micro-Interactions",
      "Responsive Design",
    ],
    capabilities: [
      {
        name: "Editorial Web Design",
        desc: "Design art direction, responsive grids, and typography systems tailored to your brand story.",
      },
      {
        name: "High-Performance Modern Development",
        desc: "Clean, performant web engineering with instant page transitions and high reliability.",
      },
      {
        name: "Interactive Motion & Micro-Delights",
        desc: "Subtle kinetic animations, scroll interactions, and tactile UI feedback.",
      },
      {
        name: "Search Optimization & Accessibility",
        desc: "Modern semantic structure, fast loading times, and full mobile optimization.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Architecture & User Journey",
        timeline: "Week 1",
        description: "Structuring narrative flow, page hierarchies, and content framework.",
      },
      {
        phase: "Phase 02",
        title: "Art Direction & Figma Design",
        timeline: "Weeks 2–3",
        description: "Crafting bespoke typography, responsive layouts, and interactive design prototypes.",
      },
      {
        phase: "Phase 03",
        title: "Development & Motion",
        timeline: "Weeks 4–5",
        description: "Writing clean code, implementing fluid transitions, and testing across all devices.",
      },
      {
        phase: "Phase 04",
        title: "Optimization & Launch",
        timeline: "Week 6",
        description: "Performance audits, cross-browser verification, and seamless launch deployment.",
      },
    ],
    outputFormats: [
      "Complete Figma Design System",
      "Production-Ready Codebase",
      "Interactive Motion Assets",
      "Content Management Guide",
    ],
    toolsAndTech: [
      "Figma UI/UX Systems",
      "Modern Web Technologies",
      "Tailwind CSS & Motion",
      "Global Edge Deployment",
    ],
    whyWarli: [
      "Seamless marriage of artistic editorial design and fluid digital performance.",
      "Tailored interactions that feel natural and elevate your brand stature.",
      "Meticulous cross-device responsiveness from mobile to wide cinema screens.",
    ],
  },
];
