/* ═══════════════════════════════════════════════════════════════════
   projects.js — the single source of truth for the Projects timeline
   ═══════════════════════════════════════════════════════════════════

   HOW TO ADD A NEW PROJECT
   ------------------------
   Paste a new object anywhere in the `projects` array below — order
   doesn't matter, the timeline sorts by date. Commit & push, and the
   entry appears on /projects.html.

   FIELDS (all optional except title, start, dateLabel)
   ----------------------------------------------------
     title       Project name.
     subtitle    Short italic tagline.
     type        "research" | "code" | "hardware" | "hackathon" | "startup"
                 Shown as a small eyebrow on the card.
     status      "complete" | "progress" | "archived"  → coloured dot.
     start       "YYYY-MM"  used for sorting.
     end         "YYYY-MM"  — omit (or set null) for ongoing projects.
     dateLabel   Human-readable range, e.g. "Sept 2025 – Present".
     description 1–3 sentences, plain text.
     tags        Array of short strings.
     team        Optional — "PI: Dr. X" or "with A, B". Shown below title.
     award       Optional — recognition/prize (shown with a ★).
     repo        GitHub URL → "Code" link.
     live        Deployed URL → "Live" link.
*/

const projects = [

  {
    title: "Eye-Tracking Engagement in AI-Assisted Academic Search",
    subtitle: "How gaze patterns reveal how students really use AI research tools",
    type: "research",
    status: "progress",
    start: "2025-09",
    end: null,
    dateLabel: "Sept 2025 – Present",
    description:
      "Mixed-methods, between-subjects study (n = 20) comparing ChatGPT-assisted search against unaided UNC Library Search. Pairs Tobii Nano Pro eye-tracking with think-aloud protocols and ML-based fixation clustering to measure cognitive load, source quality, and comprehension across research tasks — translating the findings into UX guidelines for AI tools in educational interfaces.",
    tags: ["HCI", "Eye-tracking", "Mixed-methods", "AI literacy", "UX research"],
    team: "PI: Dr. Fei Yu · with Jaegoo Ha, Johanna Klara Lohmus",
  },

  {
    title: "LLM-Driven Language Shift in Naturalistic Communication",
    subtitle: "PRISMA-guided systematic review",
    type: "research",
    status: "progress",
    start: "2025-08",
    end: "2026-02",
    dateLabel: "Aug 2025 – Feb 2026",
    description:
      "Systematic review across six bibliographic databases and four preprint servers, synthesising evidence on how LLMs are reshaping human language. Built a five-lens conceptual extraction framework capturing study design, LLM exposure mechanism, linguistic features, and trust/authenticity outcomes — surfacing a concentration in text-based settings and clear gaps in spoken-language research.",
    tags: ["Systematic review", "PRISMA", "LLMs", "Linguistics"],
    team: "PI: Dr. Fei Yu",
  },

  {
    title: "BCI Model Card — DREAMS Framework Evaluation",
    subtitle: "Explainability for brain-computer-interface classifiers",
    type: "research",
    status: "complete",
    start: "2025-07",
    end: "2025-12",
    dateLabel: "Jul – Dec 2025",
    description:
      "End-to-end EEG classification pipeline in TensorFlow/Keras/MNE, benchmarking EEGNet, DeepConvNet, and ShallowConvNet on the bigP3BCI P300 dataset across 114 EEG channels at 256 Hz. Generated DREAMS-inspired model cards evaluated with a 13-item System Explainability Scale spanning Trust, Usability, and Understandability — documenting preprocessing, hyperparameters, and limitations under real-world noisy EEG conditions.",
    tags: ["EEG", "TensorFlow", "Keras", "MNE", "CNNs", "Model cards"],
    team: "PI: Dr. Raghavendra Pradyumna Pothukuchi · with Disha Kohal Math",
  },

  {
    title: "Health Chart App",
    subtitle: "Electronic Health Record dashboard with FHIR integration",
    type: "code",
    status: "complete",
    start: "2025-09",
    end: "2025-12",
    dateLabel: "Sept – Dec 2025",
    description:
      "JavaScript web app using Leaflet and AJAX to visualise patient vitals, clinical trends, and care locations. Integrates the FHIR REST API for real-time interoperability with EHR systems like EPIC, layering patient CRUD operations and Highcharts analytics on top — proposed as a clinical decision-support and patient-communication tool.",
    tags: ["JavaScript", "FHIR", "Leaflet", "AJAX", "Healthcare"],
    team: "PI: Jonathan Tweedy",
    repo: "https://github.com/hris28/FHIR-HealthApp",
    live: "https://hris28.github.io/FHIR-HealthApp/index.html",
  },

  {
    title: "3D-Printed D3 Dopamine Receptor Model",
    subtitle: "A physical teaching tool for medicinal chemistry",
    type: "hardware",
    status: "complete",
    start: "2025-08",
    end: "2025-12",
    dateLabel: "Aug – Dec 2025",
    description:
      "Interactive physical model of the D3 dopamine receptor (GPCR), demonstrating conformational change triggered by the bitopic ligand FOB02-04A using cryo-EM structures. Receptor processed in ChimeraX and Blender, binding pockets carved in TinkerCAD and Onshape, printed in PLA/PETG through multiple design iterations. Presented at UNC BeAM Makerfest as a communication tool for medicinal chemists working on Parkinson's therapeutics.",
    tags: ["3D printing", "ChimeraX", "Blender", "CAD", "Neuropharmacology"],
    team: "PI: Dr. Alexandra Nowlan",
  },

  {
    title: "Digital Art Exhibition Catalog",
    subtitle: "An immersive virtual gallery in the browser",
    type: "code",
    status: "complete",
    start: "2024-06",
    end: "2024-07",
    dateLabel: "Jun – Jul 2024",
    description:
      "Explorable 3D gallery built with Three.js and Blender — dynamic lighting, spatial navigation, and layered media transitions. Twine narrative scripting threads an interactive, choice-based storytelling layer through the exhibition.",
    tags: ["Three.js", "Blender", "Twine", "Photoshop", "Web 3D"],
  },

  {
    title: "Temperament Test Website",
    subtitle: "Pearl Hacks hackathon project",
    type: "hackathon",
    status: "complete",
    start: "2023-02",
    end: "2023-02",
    dateLabel: "Feb 2023",
    description:
      "Full-stack personality quiz generating temperament profiles through interactive forms. Built with plain HTML/CSS/JS — local storage, custom animations, and a responsive interface tuned for accessibility across devices.",
    tags: ["JavaScript", "HTML", "CSS", "Hackathon"],
    award: "Highest STEM-Interest Inclusivity Runner-Up (Qorvo Inc.)",
  },

  {
    title: "SkyeLabs Innovation Inc. — EcoGel",
    subtitle: "Sustainable biopolymer aerogel startup",
    type: "startup",
    status: "archived",
    start: "2020-09",
    end: "2024-08",
    dateLabel: "Sept 2020 – Aug 2024",
    description:
      "Co-founded a sustainable materials startup developing EcoGel, a flexible carbon biopolymer aerogel with applications in high-performance apparel, aerospace, and space exploration. Led R&D, business strategy, prototyping, and investor outreach; filed a provisional patent and secured $2,000 from the Bowman-Brockman Endowment for Entrepreneurship and Advanced Research.",
    tags: ["Entrepreneurship", "Materials science", "R&D", "Aerospace"],
    award: "Pete Conrad Scholar, Aerospace & Aviation (2021) · NASA iTech Top 10 Finalist & sole Honorable Mention (2021)",
  },

  {
    title: "Biogenic Silver Nanoparticles for Cancer",
    subtitle: "Computational and wet-lab drug design",
    type: "research",
    status: "complete",
    start: "2021-04",
    end: "2022-05",
    dateLabel: "Apr 2021 – May 2022",
    description:
      "Green-synthesised biogenic silver nanoparticles from agri-food byproducts as a novel anticancer reducing agent. Combined computational chemistry modelling (Schrödinger Maestro, Gaussian, MATLAB, Vortex, WebMO) with wet-lab physicochemical characterisation and 3D-printed ligand models in ChimeraX to illustrate orthosteric binding.",
    tags: ["Nanotechnology", "Computational chemistry", "Cancer research"],
    team: "PIs: Michael Bruno, Tim Anglin",
    award: "Regeneron Science Talent Search Scholar — top 300 of 2,162 applicants (2022) · NC International Science Challenge Winner",
  },

  {
    title: "Noninvasive Diabetes Treatment",
    subtitle: "Chitosan-insulin nanoparticles for oral delivery",
    type: "research",
    status: "complete",
    start: "2019-01",
    end: "2022-06",
    dateLabel: "2019 – 2022",
    description:
      "Multi-year independent project synthesising and self-assembling chitosan-insulin nanoparticles for oral insulin delivery, evaluating stability and release efficiency. Included alpha-amylase inhibition assays on traditional medicinal herbs for hypoglycaemic potential.",
    tags: ["Biomedical nanotech", "Drug delivery", "Wet lab"],
    award: "NC BioGENEius Challenge Winner & International Finalist (2020)",
  },

  {
    title: "Wastewater Bioremediation with Algae",
    subtitle: "Published research — reducing nitrate and phosphate contaminants",
    type: "research",
    status: "complete",
    start: "2018-09",
    end: "2020-07",
    dateLabel: "Sept 2018 – Jul 2020",
    description:
      "Self-directed environmental research on using algae to remediate nitrate and phosphate contaminants from wastewater. Designed the experimental apparatus, ran serial assays measuring nutrient reduction efficiency, and published the results in the International Journal of High School Research (2020).",
    tags: ["Environmental science", "Algae", "Bioremediation", "Publication"],
    award: "Intel ISEF Finalist (2019) · AJAS Delegate (2020 – 2021) · Published in IJHSR (2020)",
  },

];

// Expose to the page's render script
window.__projects = projects;
