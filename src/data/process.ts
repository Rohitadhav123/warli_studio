export interface ProcessStep {
  step: string;
  name: string;
  timeline: string;
  summary: string;
  focus: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    name: "Understand",
    timeline: "Phase 01",
    summary:
      "We dissect brand ambition, category conventions, cultural resonance, and technical constraints to establish a singular creative objective.",
    focus: ["Strategic Briefing", "Category Deconstruction", "Audience Semiotics", "Technical Scoping"],
  },
  {
    step: "02",
    name: "Concept",
    timeline: "Phase 02",
    summary:
      "We generate divergent creative territories, scripting, narrative arcs, and structural packaging or film hypotheses without early compromise.",
    focus: ["Mood Worlds & Scripts", "Structural Sketches", "Narrative Archetypes", "Creative Treatment"],
  },
  {
    step: "03",
    name: "Visual Direction",
    timeline: "Phase 03",
    summary:
      "We test-render, build material swatches, frame lighting setups, and draft typographic lockups to achieve alignment before heavy production.",
    focus: ["Look & Feel Bible", "CGI Lighting Proofs", "Color Science & Typography", "Production Plan"],
  },
  {
    step: "04",
    name: "Production",
    timeline: "Phase 04",
    summary:
      "High-calibre execution across live sets, 3D simulation pipelines, custom generative models, and dieline engineering with obsessive precision.",
    focus: ["Principal Filming", "3D CAD & Texturing", "AI Synthesis & Retouch", "Press-Ready Artworking"],
  },
  {
    step: "05",
    name: "Delivery",
    timeline: "Phase 05",
    summary:
      "Master-grade assets color-calibrated for cinema, print, and multi-format digital deployment, packaged with meticulous governance guides.",
    focus: ["Master Deliverables (ProRes/8K)", "Digital Multi-Aspect Toolkits", "Brand Guidelines", "Archive Handover"],
  },
];
