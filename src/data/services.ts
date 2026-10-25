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
    category: "CINEMATOGRAPHY & CAMPAIGN DIRECTION",
    filterCategory: "production",
    tagline: "Commercial ads, narrative brand films, and sensory product cinematography.",
    summary:
      "From high-velocity commercial spots to evocative brand documentaries, we manage full-lifecycle cinematic production — directing, lighting, specialized camera movement, and high-end post-color grading.",
    accent: "#D85C3F",
    iconName: "Video",
    turnaround: "2 – 4 Weeks",
    idealFor: "Commercial Brand Campaigns, Product Launches & Television Spots",
    highlightMetric: {
      label: "Capture Standard",
      value: "8K Cinema Raw",
    },
    deliverableTags: [
      "Commercial Spots",
      "Macro Product Shoots",
      "Art Direction & Sets",
      "Color Grade & Sound",
    ],
    capabilities: [
      {
        name: "Commercial Film Direction",
        desc: "Script-to-screen creative direction engineered to grip audience attention in the first 2 seconds.",
      },
      {
        name: "High-Speed & Macro Cinematography",
        desc: "Ultra-precise fluid splashes, tactile product interactions, and hyper-detailed pack captures.",
      },
      {
        name: "Custom Set Design & Styling",
        desc: "Bespoke architectural environments, lighting rigs, and physical props tailored to brand identity.",
      },
      {
        name: "Post-Production & ACES Color Pipeline",
        desc: "Hollywood-standard DaVinci Resolve color grading, dynamic sound design, and broadcast exports.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Script & Treatment",
        timeline: "Week 1",
        description: "Storyboarding, shot-lists, visual treatments, location scouting, and talent casting.",
      },
      {
        phase: "Phase 02",
        title: "Principal Photography",
        timeline: "Week 2",
        description: "Studio or on-location shoot with RED/ARRI cinema packages, precision gimbals, and high-speed motion rigs.",
      },
      {
        phase: "Phase 03",
        title: "Edit, Grade & VFX",
        timeline: "Week 3",
        description: "Editorial assembly, sound mix, custom motion graphics, cleanups, and cinematic color grading.",
      },
      {
        phase: "Phase 04",
        title: "Master Delivery",
        timeline: "Week 4",
        description: "DCI 4K masters, 9:16 vertical cuts for paid social, compressed web teasers, and broadcast spec packages.",
      },
    ],
    outputFormats: [
      "ProRes 4444 XQ / 422 HQ",
      "DCI 4K & UHD 3840x2160",
      "9:16 Vertical Cutdowns (Reels / TikTok)",
      "Uncompressed 5.1 & Stereo Audio",
    ],
    toolsAndTech: [
      "ARRI Alexa Mini LF",
      "RED V-Raptor 8K",
      "Phantom Flex 4K High-Speed",
      "DaVinci Resolve Studio",
      "Cooke & Atlas Anamorphic Glass",
    ],
    whyWarli: [
      "Direct-to-director communication without agency overhead bloat.",
      "In-house studio styling with obsessive lighting control.",
      "Optimized cuts formatted directly for high-converting social campaigns.",
    ],
  },
  {
    id: "3d-cgi-product-visualization",
    number: "02",
    title: "3D CGI & Product Visualization",
    shortTitle: "3D CGI & Visualization",
    category: "SPATIAL COMPUTING & HYPER-REALISM",
    filterCategory: "3d",
    tagline: "Unconstrained photorealistic renders, kinetic fluid simulations, and exploded views.",
    summary:
      "Physical limits do not apply. We craft jaw-dropping 3D models, microscopic materials, complex physics simulations, and hyper-tactile animations that showcase your product with impossible precision.",
    accent: "#E27B58",
    iconName: "Box",
    turnaround: "1 – 3 Weeks",
    idealFor: "Hardlines, Consumer Tech, Luxury Bottles, Footwear & Cosmetic Lines",
    highlightMetric: {
      label: "Fidelity",
      value: "Sub-Micron PBR",
    },
    deliverableTags: [
      "Photoreal 3D Stills",
      "Fluid & Particle VFX",
      "Exploded Tech Renders",
      "Real-time 3D Web Assets",
    ],
    capabilities: [
      {
        name: "Photorealistic CAD & Mesh Modeling",
        desc: "Precision NURBS or polygonal modeling from physical blueprints or raw concept sketches.",
      },
      {
        name: "Physically Based Shading (PBR)",
        desc: "Custom glass refraction, brushed aluminium, soft-touch matte plastics, and liquid viscosity.",
      },
      {
        name: "Dynamic Particle & Fluid FX",
        desc: "Realistic confectionery splashes, water droplets, smoke plumes, and cosmic disintegration effects.",
      },
      {
        name: "Interactive WebGL & 3D Embeds",
        desc: "Lightweight GLTF/GLB models optimized for smooth 60fps interaction on e-commerce sites.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "CAD Ingestion & Retopo",
        timeline: "Days 1–3",
        description: "Transforming engineering files into clean, animation-ready topological geometry.",
      },
      {
        phase: "Phase 02",
        title: "Look-Dev & Lighting",
        timeline: "Days 4–7",
        description: "Dialing in bespoke studio lighting, surface imperfections, micro-scratches, and material tactile qualities.",
      },
      {
        phase: "Phase 03",
        title: "Kinetic Animation & Physics",
        timeline: "Week 2",
        description: "Rigging movements, camera choreographies, exploded assemblies, and particle interactions.",
      },
      {
        phase: "Phase 04",
        title: "Multipass Render & Compositing",
        timeline: "Week 3",
        description: "EXR render farming, optical bloom, depth of field passes, and razor-sharp color grading.",
      },
    ],
    outputFormats: [
      "High-Res 16-Bit TIFF / PNG Stills (8K+)",
      "ProRes 4444 Transparent Alpha Sequences",
      "Interactive GLTF / GLB 3D Files",
      "High-Frame-Rate 60fps Motion Clips",
    ],
    toolsAndTech: [
      "Blender 4.x & Houdini FX",
      "Maxon Cinema 4D & Redshift",
      "Octane Render & Unreal Engine 5.5",
      "Substance 3D Painter & Designer",
    ],
    whyWarli: [
      "Eliminates the cost and scheduling delays of physical prototype photography.",
      "Enables infinite camera angles and impossible zero-gravity perspectives.",
      "Ready-to-use digital assets that seamlessly plug into web 3D viewers.",
    ],
  },
  {
    id: "ai-content-creation",
    number: "03",
    title: "AI Content Creation & Synthetic Media",
    shortTitle: "AI Content Creation",
    category: "SYNTHETIC PIPELINE & GENERATIVE ART",
    filterCategory: "ai",
    tagline: "Hyper-accelerated concept development, custom LoRA models, and synthetic worlds.",
    summary:
      "We fuse state-of-the-art diffusion models, custom brand LoRA training, and high-fidelity post-compositing to generate campaign-ready visuals and endless creative variations in days, not months.",
    accent: "#81B29A",
    iconName: "Sparkles",
    turnaround: "3 – 7 Days",
    idealFor: "Rapid Market Testing, High-Frequency Social Drops & Moodboard Exploration",
    highlightMetric: {
      label: "Velocity Boost",
      value: "5x Speed to Market",
    },
    deliverableTags: [
      "Brand-Trained LoRAs",
      "Surreal Concept Art",
      "Generative Video Loops",
      "High-Frequency Variations",
    ],
    capabilities: [
      {
        name: "Custom Brand Model Fine-Tuning",
        desc: "We train private checkpoints on your actual product assets to preserve visual consistency across 100s of shots.",
      },
      {
        name: "Synthetic Location Generation",
        desc: "Place your product in surreal, futuristic, or ultra-luxurious environments without travel logistics.",
      },
      {
        name: "AI Video Motion Synthesis",
        desc: "Kinetic animation loops, frame interpolation, and fluid morphing effects powered by cutting-edge neural models.",
      },
      {
        name: "Hybrid AI + Human Retouching",
        desc: "Every AI output is meticulously polished by master digital painters to eliminate artifacts and ensure commercial perfection.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Dataset Curation & Training",
        timeline: "Days 1–2",
        description: "Curating high-resolution product angles and fine-tuning custom LoRA weights with rigorous prompt engineering.",
      },
      {
        phase: "Phase 02",
        title: "Generative Exploration",
        timeline: "Days 3–4",
        description: "Producing 200+ aesthetic variations, mood styles, lighting schemes, and cinematic compositions.",
      },
      {
        phase: "Phase 03",
        title: "Curatorial Downselection",
        timeline: "Day 5",
        description: "Filtering the strongest concepts that strictly align with brand guidelines and campaign objectives.",
      },
      {
        phase: "Phase 04",
        title: "Neural Upscaling & Retouch",
        timeline: "Days 6–7",
        description: "Commercial upscaling to print-ready resolution, typography integration, and defect removal.",
      },
    ],
    outputFormats: [
      "Ultra-High-Resolution 300DPI Print Masters",
      "Animated MP4 / WebM Motion Loops",
      "Bespoke Trained LoRA Checkpoint Files",
      "Omnichannel Aspect Ratio Packs (1:1, 4:5, 9:16, 16:9)",
    ],
    toolsAndTech: [
      "Custom ComfyUI Node Pipelines",
      "Stable Diffusion XL & FLUX.1 Pro",
      "Runway Gen-3 Alpha & Kling AI",
      "Magnific AI & Topaz Gigapixel",
      "Adobe Photoshop Generative Neural Tools",
    ],
    whyWarli: [
      "Zero generic 'AI look' — refined by senior art directors for bespoke luxury quality.",
      "10x higher volume of creative testing variants for paid acquisition funnels.",
      "Guaranteed brand safety and IP-compliant workflows.",
    ],
  },
  {
    id: "branding-visual-identity",
    number: "04",
    title: "Branding & Visual Identity",
    shortTitle: "Branding & Identity",
    category: "STRATEGIC ARCHITECTURE & GRAPHIC SYSTEMS",
    filterCategory: "design",
    tagline: "Timeless logomarks, architectural typography, and cohesive brand design systems.",
    summary:
      "We build iconic visual identities that give brands an unmistakable aura. We balance timeless typographical rigor with modern digital flexibility to make your company stand apart in crowded industries.",
    accent: "#F2CC8F",
    iconName: "Palette",
    turnaround: "3 – 6 Weeks",
    idealFor: "New Category Creators, Seed-to-Series B Rebrands & Luxury Ventures",
    highlightMetric: {
      label: "System Depth",
      value: "Full Brand OS",
    },
    deliverableTags: [
      "Logomark & Wordmark",
      "Typography System",
      "Comprehensive Guidelines",
      "Brand Asset Library",
    ],
    capabilities: [
      {
        name: "Brand Positioning & Narrative Strategy",
        desc: "Clarifying your core ethos, brand tone of voice, visual manifesto, and competitive distinction.",
      },
      {
        name: "Custom Logotype & Symbol Design",
        desc: "Precision geometric symbols, custom lettering, and versatile lockups for physical and digital touchpoints.",
      },
      {
        name: "Color Psychology & Type Hierarchy",
        desc: "Curated HSL color palettes and pairings of architectural display typefaces with ultra-readable body text.",
      },
      {
        name: "Living Digital Brand Guidelines",
        desc: "An intuitive web-based design manual complete with downloadable vectors, templates, and rules of use.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Strategic Discovery",
        timeline: "Week 1",
        description: "Market audits, competitor deconstruction, stakeholder interviews, and visual mood landscapes.",
      },
      {
        phase: "Phase 02",
        title: "Identity Concept Pathways",
        timeline: "Weeks 2–3",
        description: "Three distinct creative directions presented in real-world mockups (packaging, digital, print).",
      },
      {
        phase: "Phase 03",
        title: "Refinement & Extension",
        timeline: "Week 4",
        description: "Fine-tuning bezier curves, defining sub-brands, iconography suites, and social media layout rules.",
      },
      {
        phase: "Phase 04",
        title: "Production & Brand Manual",
        timeline: "Weeks 5–6",
        description: "Vector asset production across SVG, EPS, PDF, Figma UI kits, and comprehensive brand book delivery.",
      },
    ],
    outputFormats: [
      "Vector Logomarks (SVG, EPS, PDF, AI)",
      "Web & Print Ready Color Palettes (Pantone, CMYK, RGB, HEX)",
      "Interactive Figma Design Tokens & Component Library",
      "Complete Brand Guidelines Book (PDF & Web Link)",
    ],
    toolsAndTech: [
      "Figma Enterprise",
      "Adobe Illustrator & InDesign",
      "Glyphs App (Custom Type Tuning)",
      "Pantone Color Matching Systems",
    ],
    whyWarli: [
      "Rooted in both cultural heritage and cutting-edge brutalist editorial design.",
      "Built for effortless implementation across web, packaging, and marketing teams.",
      "Comprehensive asset handoff so your brand looks consistent forever.",
    ],
  },
  {
    id: "packaging-design",
    number: "05",
    title: "Packaging Design & Physical Experience",
    shortTitle: "Packaging Design",
    category: "STRUCTURAL PACK & SHELF IMPACT",
    filterCategory: "design",
    tagline: "Unboxing rituals, tactile substrates, and shelf-dominating structural packaging.",
    summary:
      "Packaging is the only marketing channel with a 100% open rate. We craft structural die-lines, sustainable substrate choices, and striking label art that convert shelf-browsers into lifelong loyalists.",
    accent: "#E07A5F",
    iconName: "PackageCheck",
    turnaround: "2 – 5 Weeks",
    idealFor: "CPG Brands, Food & Beverage, Cosmetics, Supplements & Luxury Goods",
    highlightMetric: {
      label: "Shelf Conversion",
      value: "+40% Visual Lift",
    },
    deliverableTags: [
      "Custom Dielines",
      "Foil & Emboss Finishes",
      "Sustainable Materials",
      "Ready-to-Print Files",
    ],
    capabilities: [
      {
        name: "Structural Dieline Engineering",
        desc: "Custom box geometries, tamper-evident seals, inner trays, and sensory unboxing choreography.",
      },
      {
        name: "Label Design & Typographic Artwork",
        desc: "Flawless nutritional compliance, regulatory barcoding, and show-stopping front-of-pack graphics.",
      },
      {
        name: "Specialty Finishes & Tactile Specs",
        desc: "Holographic hot-stamp foils, blind embossing, spot UV varnishes, and soft-touch laminates.",
      },
      {
        name: "Production Vendor Liaison",
        desc: "Direct coordination with your packaging printers to review pre-press proofs and ensure color fidelity.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Shelf & Substrate Audit",
        timeline: "Week 1",
        description: "Evaluating category shelf presence, material eco-standards, and container dimensions.",
      },
      {
        phase: "Phase 02",
        title: "Dieline & Artwork Concepting",
        timeline: "Weeks 2–3",
        description: "Prototyping multiple label architectures, colorways, and finish treatments.",
      },
      {
        phase: "Phase 03",
        title: "3D Virtual Proofing",
        timeline: "Week 4",
        description: "Rotating 3D virtual mockups under realistic retail lighting to catch issues before printing.",
      },
      {
        phase: "Phase 04",
        title: "Pre-Press & Print Coordination",
        timeline: "Week 5",
        description: "Preparing 100% print-ready layered PDF files with exact Pantone inks and die layers.",
      },
    ],
    outputFormats: [
      "Print-Ready Press PDFs with Bleeds & Crop Marks",
      "Layered Vector Master Dielines (.AI / .EPS)",
      "Pantone Spot Color Channel Separations",
      "High-Fidelity 3D Pack Renders for E-Commerce",
    ],
    toolsAndTech: [
      "Adobe Illustrator & Esko Studio",
      "ArtiosCAD Dieline Structuring",
      "Keyshot & Redshift Virtual Proofing",
      "Pantone Formula Guide & Capsure",
    ],
    whyWarli: [
      "Engineered for both physical shelf dominance and Instagram unboxing moments.",
      "Zero printer headaches: we speak the technical language of packaging manufacturers.",
      "Strict compliance verification for ingredients, barcoding, and legibility.",
    ],
  },
  {
    id: "website-design-digital-experience",
    number: "06",
    title: "Website Design & Digital Experience",
    shortTitle: "Website & Digital Design",
    category: "CREATIVE ENGINEERING & INTERACTIVE WEB",
    filterCategory: "digital",
    tagline: "High-performance digital flagship sites, WebGL micro-interactions, and headless code.",
    summary:
      "We design and engineer bespoke web experiences that merge editorial typography, liquid micro-animations, and blistering page speeds. We turn visitors into captivated brand evangelists.",
    accent: "#3D5A80",
    iconName: "Layout",
    turnaround: "3 – 6 Weeks",
    idealFor: "Modern E-Commerce, Digital Studios, SaaS Flagships & Portfolio Showcases",
    highlightMetric: {
      label: "Performance",
      value: "99+ Lighthouse Score",
    },
    deliverableTags: [
      "Responsive UI/UX",
      "Next.js & WebGL 3D",
      "Micro-Interactions",
      "SEO & High Speed",
    ],
    capabilities: [
      {
        name: "Editorial Web Design (Figma)",
        desc: "Award-caliber visual art direction, responsive grids, and design systems built for scale.",
      },
      {
        name: "High-Performance Next.js Engineering",
        desc: "Lightning-fast static site generation, server components, and clean modern architecture.",
      },
      {
        name: "WebGL 3D & GSAP Animations",
        desc: "Fluid kinetic scroll effects, canvas shader art, and tactile interactive elements.",
      },
      {
        name: "Conversion Architecture & Technical SEO",
        desc: "Frictionless checkout paths, semantic schema metadata, and optimized Core Web Vitals.",
      },
    ],
    process: [
      {
        phase: "Phase 01",
        title: "Wireframing & IA",
        timeline: "Week 1",
        description: "Information architecture, conversion funnel mapping, and interactive wireframes.",
      },
      {
        phase: "Phase 02",
        title: "Visual Art Direction",
        timeline: "Weeks 2–3",
        description: "Bespoke high-fidelity Figma designs, typography scale, dark/light nuances, and motion prototypes.",
      },
      {
        phase: "Phase 03",
        title: "Creative Frontend Build",
        timeline: "Weeks 4–5",
        description: "Next.js, Tailwind CSS, GSAP, and Three.js implementation with pixel-perfect attention to detail.",
      },
      {
        phase: "Phase 04",
        title: "Optimization & Deployment",
        timeline: "Week 6",
        description: "Lighthouse optimization, cross-browser stress testing, analytics setup, and global CDN launch.",
      },
    ],
    outputFormats: [
      "Production-Ready Next.js / React Codebase",
      "Complete Figma Design System & Prototype",
      "Fully Responsive Mobile, Tablet & Desktop Layouts",
      "Clean Git Repository with CI/CD Deployment Setup",
    ],
    toolsAndTech: [
      "Next.js 15+ & React 19",
      "Tailwind CSS & Vanilla CSS",
      "GSAP / ScrollTrigger & Framer Motion",
      "Three.js & React Three Fiber",
      "Figma Enterprise & Vercel Edge",
    ],
    whyWarli: [
      "Designers who code: no translation loss between Figma mockups and live browser experience.",
      "Blistering fast load times without sacrificing cinematic visual flair.",
      "Built for enterprise SEO and uncompromising accessibility standards.",
    ],
  },
];
