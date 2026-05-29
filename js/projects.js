/* 
   projects.js
   Edit the PROJECTS array below to update the projects page.
   Each entry renders as a card in the timeline, grouped by year.
   Required: year, type, title, date, description
   Optional: pi, honor, tags, links (array of {label, url})
   */

const PROJECTS = [
  // ---------- 2026 (NOW) ----------
  {
    year: 2026, tag: "NOW",
    type: "RESEARCH", date: "Sept 2025 to Present",
    title: "Eye Tracking Engagement in AI Assisted Academic Search",
    pi: "PI: Dr. Fei Yu · with Jaegoo Ha, Johanna Klara Lohmus",
    description: "Mixed methods between subjects study (target n = 20) comparing ChatGPT assisted search against unaided UNC Library Search (EBSCOhost / Articles+). Pairs Tobii Nano Pro eye tracking, fixation, saccade, and pupil dilation metrics across labeled interface regions, with think aloud protocols and post task instruments adapting Cognitive Load Theory (DCLQ) and the System Usability Scale. A needs assessment of 12 student interviews found 65% struggled with keyword expansion and 38% used ChatGPT without verifying sources; pilot sessions show reduced time to first relevant result with AI assistance. Findings translate into UX guidance for AI tools in educational interfaces, delivered as a slide deck, prompt handout, and screen recorded tutorial.",
    tags: ["HCI", "EYE TRACKING", "MIXED METHODS", "AI LITERACY", "UX RESEARCH"],
  },
  {
    year: 2026, tag: "NOW",
    type: "POLICY", date: "Jan 2026 to May 2026",
    title: "AI Scraping & the Future of Digital Preservation Archives",
    pi: "INLS 690: AI Law & the Struggle for Control of Knowledge · Profs. Will Cross & Dave Hansen",
    description: "Authored a three tier access and use policy for the Internet Archive, Open Access, Credentialed Research, and a Data Trust tier for commercial model training, governing large scale automated and AI scraping, packaged with an implementation guide, a model data use agreement, and a public FAQ. Grounded the framework in a legal analysis synthesizing key fair use and copyright management cases (HathiTrust, Google Books, Thomson Reuters v. Ross, Bartz v. Anthropic, Kadrey v. Meta) and a stakeholder scenario analysis weighing the competing interests of archives, publishers, researchers, and AI developers.",
    tags: ["DIGITAL PRESERVATION", "AI POLICY", "COPYRIGHT", "GOVERNANCE"],
  },
  {
    year: 2026, tag: "NOW",
    type: "ARCHIVES", date: "Dec 2025 to Present",
    title: "Archiving the Now, ILSSA Ad Hoc Archiving Committee",
    pi: "UNC University Archives · with the Information & Library Science Student Association",
    description: "Co founded a student led committee to document UNC's October 2025 merger between the School of Information and Library Science (SILS) with the School for Data Science and Society (SDSS) as it unfolded, capturing student sentiment and experience that might otherwise go unrecorded. In roughly five months the committee grew from three students to a structured effort, formalized a partnership with the UNC University Archives, where the collection is housed, and built an oral history methodology after evaluating several documentation approaches. Received 35 digital survey responses, 15 paper survey responses, 9 SILS stories, and 11 oral histories so far. Presented the project's community driven, real time archival advocacy approach at the SNCA/SCAA 2026 Joint Annual conference.",
    tags: ["DIGITAL PRESERVATION", "ORAL HISTORY", "ARCHIVES", "COMMUNITY ARCHIVING"],
    links: [
      { label: "Conference", url: "https://ncarchivists.org/conference-schedule/2026" },
      { label: "Sign-Up", url: "http://go.unc.edu/SILSOralHistoryScheduling"}
    ],
  },
  {
    year: 2026, tag: "NOW",
    type: "SERVICE DESIGN", date: "Jan 2026 to May 2026",
    title: "Web Archive Forensics for NC's Accountability Journalists",
    pi: "INLS 500: Human Information Interactions · Prof. Leslie Thomson",
    description: "Designed a three tier reference service for the State Library of North Carolina, on demand authenticated web captures, a statewide workshop series via the NC Cardinal partner library consortium, and a curated Archive-It collection, to give independent journalists in news desert counties a durable verification tool as 240+ news sites move to block Internet Archive crawlers. Built on a four stream literature and institutional landscape review and grounded in LIS information behavior theory (Taylor's information use environment, Savolainen's source horizon, Koufogiannakis's evidence based practice) to define the user population and justify each tier.",
    tags: ["DIGITAL PRESERVATION", "SERVICE DESIGN", "INFORMATION BEHAVIOR", "ARCHIVES"],
  },
  {
    year: 2026, tag: "NOW",
    type: "UX RESEARCH", date: "Spring 2026",
    title: "Tracking the Trackers, A Privacy Information Seeking Study",
    pi: "INLS 500: Human Information Interactions · Prof. Leslie Thomson",
    description: "Ran and analyzed a think aloud observation of a self directed session on web tracking and digital privacy, treating the screen recorded transcript as primary qualitative data. Mapped query formulation and source selection behavior onto four information behavior models (Taylor's levels of need, Kuhlthau's Information Search Process, Bates' berrypicking, Bawden & Robinson's information anxiety) and derived concrete design principles for an accessible security guide directly from observed user friction.",
    tags: ["UX RESEARCH", "QUALITATIVE", "THINK ALOUD", "PRIVACY"],
  },
  {
    year: 2026, tag: "NOW",
    type: "CODE", date: "2025 to Present", title: "Avar Intelligence Compendium",
    description: "Information visualization tool for a tabletop rpg system. Built with JavaScript, HTML, and CSS, Avar is a web based investigation map and encounter manager for a Dungeons & Dragons 5e mystery-themed campaign. The project emphasizes user friendly design and modular code architecture for easy expansion to other game systems.",
    tags: ["DUNGEONS & DRAGONS", "IN PROGRESS"],
    links: [
      { label: "Code", url: "https://github.com/hris28/Avar" },
      { label: "Live", url: "https://hris28.github.io/Avar/avar.html" },
    ],
  },

  // ---------- 2025 ----------
  {
    year: 2025,
    type: "RESEARCH", date: "Aug 2025 to Feb 2026",
    title: "LLM Driven Language Shift in Naturalistic Communication",
    pi: "PI: Dr. Fei Yu · Independent Study",
    description: "PRISMA guided systematic review across 6 databases and 4 preprint servers synthesizing evidence for LLM associated changes in human language. Developed a five lens conceptual extraction framework examining how studies operationalize LLM exposure and measure linguistic outcomes, surfacing methodological gaps in spoken language and secondhand diffusion research.",
    tags: ["SYSTEMATIC REVIEW", "PRISMA", "LLMS", "LINGUISTICS"],
  },
  {
    year: 2025,
    type: "RESEARCH", date: "Jul 2025 to Dec 2025",
    title: "Brain Computer Interface Model Card, DREAMS Framework Evaluation",
    pi: "PI: Dr. Raghavendra Pradyumna Pothukuchi · with Disha Kohal Math",
    description: "Built an end to end EEG classification pipeline in TensorFlow, Keras, and MNE. Trained EEGNet, DeepConvNet, and ShallowConvNet on the bigP3BCI P300 dataset and stress tested DREAMS style model cards against a noisy free movement dataset, evaluating them with a 13 item System Explainability Scale across Trust, Usability, and Understandability. Found the cards readable and well visualized but weak on actionable guidance and uncertainty communication; published a reproducible artifact.",
    tags: ["BCI", "TENSORFLOW", "EEG", "CNN", "MODEL CARDS"],
    links: [{ label: "Code", url: "https://github.com/hris28/BCIModelCardEvaluation" }],
  },
  {
    year: 2025,
    type: "CODE", date: "Sept 2025 to Dec 2025",
    title: "Health Chart App",
    pi: "PI: Jonathan Tweedy",
    description: "JavaScript web app using Leaflet and AJAX to visualize patient vitals, clinical trends, and care locations. Integrates the FHIR REST API for real time interoperability with EHR systems like EPIC, layering patient CRUD operations and Highcharts analytics on top. Proposed as a clinical decision support and patient communication tool.",
    tags: ["JAVASCRIPT", "FHIR", "LEAFLET", "AJAX", "HEALTHCARE"],
    links: [
      { label: "Code", url: "https://github.com/hris28/FHIR-HealthApp" },
      { label: "Live", url: "https://hris28.github.io/FHIR-HealthApp/index.html" },
    ],
  },
  {
    year: 2025,
    type: "HARDWARE", date: "Aug 2025 to Dec 2025",
    title: "3D Printed D3 Dopamine Receptor Model",
    pi: "PI: Dr. Alexandra Nowlan · 4 person design team",
    description: "Interactive physical model of the D3 dopamine receptor (GPCR) demonstrating conformational change triggered by the bitopic ligand FOB02 04A using cryo EM structures. Receptor processed in ChimeraX and Blender, binding pockets carved in TinkerCAD and Onshape, printed in PLA and PETG through multiple design iterations. Authored the model specification and prototype documentation, designed poster content, and presented at UNC BeAM Makerfest as a communication tool for medicinal chemists working on Parkinson's therapeutics.",
    tags: ["3D PRINTING", "CHIMERAX", "BLENDER", "CAD", "NEUROPHARMACOLOGY"],
    // To add an image, drop a file in images/projects/ and set the path below
    // image: "images/projects/d3-receptor.jpg",
  },

  // ---------- 2024 ----------
  {
    year: 2024,
    type: "STARTUP", date: "Sept 2020 to Aug 2024",
    title: "SkyeLabs Innovation Inc., EcoGel",
    description: "Co founded a sustainable materials startup developing EcoGel, a flexible carbon biopolymer aerogel with applications in high performance apparel, aerospace, and space exploration. Led R&D, business strategy, prototyping, and investor outreach. Filed a provisional patent and secured $2,000 from the Bowman Brockman Endowment for Entrepreneurship and Advanced Research.",
    honor: "Pete Conrad Scholar, Aerospace and Aviation (2021) · NASA iTech Top 10 Finalist and sole Honorable Mention (2021)",
    tags: ["ENTREPRENEURSHIP", "MATERIALS SCIENCE", "R&D", "AEROSPACE"],
    links: [
      { label: "Competition", url: "https://static1.squarespace.com/static/53cd080fe4b006756b7288ea/t/60a564d925c8aa6d5b4fe6f6/1621451994142/International+Student+Innovators+Awarded+Top+Honors+in.pdf" },
      { label: "Competition", url: "https://www.youtube.com/live/xC5uKDG7gAk?si=QQqyKCo9caM4c9Ts"},
      { label: "Media", url: "https://www.facebook.com/share/1BDVfDYzN6/"},
      { label: "Media", url: "https://blog.naver.com/PostView.nhn?blogId=liebeksk&logNo=222292445662&categoryNo=0&parentCategoryNo=3&viewDate=&currentPage=1&postListTopCurrentPage=1&from=search"},
    ]
    // image: "images/projects/skyelabs-ecogel.jpg",
  },
  {
    year: 2024,
    type: "CODE", date: "Jun 2024 to Jul 2024",
    title: "Digital Art Exhibition Catalog",
    pi: "COMM 150, Introduction to New Media",
    description: "Immersive virtual gallery built with JavaScript Three.js and Blender, implementing an explorable 3D environment with dynamic lighting and spatial navigation. Integrated Twine scripting and Photoshop layered transitions to create an interactive choice based visual novel storytelling experience.",
    tags: ["THREE.JS", "BLENDER", "TWINE", "NEW MEDIA"],
  },

  // ---------- 2023 ----------
  {
    year: 2023,
    type: "CODE", date: "Feb 2023",
    title: "Temperament Test App, Pearl Hacks",
    description: "Full stack JavaScript web app that generated temperament profiles through user interactive forms. Local storage, custom animations, and responsive interface design for accessibility across devices.",
    honor: "Highest STEM Interest Inclusivity Runner Up, Qorvo Inc.",
    tags: ["JAVASCRIPT", "FULL STACK", "HACKATHON", "A11Y"],
    links: [
      { label: "Hackathon", url: "https://pearlhacks2023.devpost.com/project-gallery" },
      { label: "Live", url: "https://devpost.com/software/temperament-test"},
    ],
  },

  // ---------- 2022 ----------
  {
    year: 2022,
    type: "EDITING", date: "Oct 2020 to Jun 2022",
    title: "Broad Street Scientific, Journal Website",
    description: "Designed the website and submission management system for NCSSM Durham's official journal of student STEM research as Editor in Chief. Oversaw a 100 page annual publication and editorial staff of 20+ writers, organized publishing workshops, critiqued student submissions, and chose the annual journal theme (Chaos Theory).",
    tags: ["WORDPRESS", "EDITORIAL", "SEO", "PUBLISHING"],
    links: [
      { label: "Archive", url: "https://broadstreetscientific.ncssm.edu/index.html" },
      { label: "Publication", url: "https://issuu.com/ncssmedu/docs/bss_2022/6"},
    ],
  },
  {
    year: 2022,
    type: "RESEARCH", date: "Apr 2021 to May 2022",
    title: "Nanotechnology Treatment for Cancer",
    pi: "SRIP Research in Chemistry",
    description: "Self synthesized biogenic silver nanoparticles using agri food byproducts as a novel anticancer reducing agent. Employed computational chemistry molecular modeling techniques with Schrödinger Maestro, Gaussian, MATLAB, Vortex, and WebMO alongside wet lab physicochemical analyses. 3D printed ligands modeled in ChimeraX to illustrate orthostatic binding mechanisms.",
    honor: "Regeneron STS Scholar, Top 300 of 2,162 applicants internationally · NC International Science Challenge Winner",
    tags: ["NANOTECH", "COMP CHEM", "SCHRÖDINGER", "MATLAB"],
    links: [
      { label: "Competition", url: "https://www.ncsmt.org/2022-nc-science-challenge-winners/"},
      { label: "Gallery", url: "https://www.ncsmt.org/smt-gallery-archive/"}
    ]
  },

  // ---------- 2020 ----------
  {
    year: 2020,
    type: "RESEARCH", date: "2019 to 2022",
    title: "Noninvasive Diabetes Treatment",
    description: "Multi year independent biomedical nanotechnology project. Synthesized and self assembled chitosan insulin nanoparticles for oral insulin delivery, evaluated stability and release efficiency. Performed alpha amylase inhibition assays on traditional medicinal herbs to assess hypoglycemic potential.",
    honor: "International BioGENEius Challenge Finalist and NC State Winner (2020)",
    tags: ["BIOMEDICAL", "NANOPARTICLES", "DRUG DELIVERY"],
  },
  {
    year: 2019,
    type: "RESEARCH", date: "Sept 2018 to Jul 2020",
    title: "Wastewater Bioremediation",
    description: "Self directed environmental research on the role of algae in remediating nitrate and phosphate contaminants from wastewater. Designed experimental apparatus and conducted serial assays to measure nutrient reduction efficiency.",
    honor: "Intel ISEF Finalist (2019) · Published in the International Journal of High School Research (2020)",
    tags: ["ENVIRONMENTAL", "PUBLISHED", "ISEF"],
    links: [
      { label: "Abstract", url: "https://abstracts.societyforscience.org/Home/FullAbstract?Category=Any%20Category&AllAbstracts=True&FairCountry=Any%20Country&FairState=Any%20State&ProjectId=16993"},
    ],
  },
];

// ---------- Render function ----------
function renderProjects() {
  const root = document.getElementById("projects-root");
  if (!root) return;

  // Group by year, preserving input order within each year
  const byYear = {};
  PROJECTS.forEach((p) => {
    if (!byYear[p.year]) byYear[p.year] = { tag: p.tag, items: [] };
    byYear[p.year].items.push(p);
  });

  // Sort years descending so newest appears first
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  root.innerHTML = years.map((year) => {
    const { tag, items } = byYear[year];
    const yearHeader = `
      <h2 class="year-marker">${year}${tag ? `<span class="year-tag">${tag}</span>` : ""}</h2>
    `;
    const cards = items.map(renderCard).join("");
    return yearHeader + cards;
  }).join("");
}

function renderCard(p) {
  // If the project has an image, add the modifier class and render the img
  const hasImg = Boolean(p.image);
  const imgEl = hasImg ? `<img class="project-image" src="${p.image}" alt="${p.title}" loading="lazy" />` : "";

  const body = `
    <div>
      <div class="project-meta">
        <span class="project-type">${p.type}</span>
        <span class="project-date">${p.date}</span>
      </div>
      <h3 class="project-title">${p.title}</h3>
      ${p.pi ? `<p class="project-pi">${p.pi}</p>` : ""}
      <p class="project-desc">${p.description}</p>
      ${p.honor ? `<p class="project-honor">${p.honor}</p>` : ""}
      ${p.tags ? `<div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>` : ""}
      ${p.links ? `<div class="project-links">
        ${p.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join("")}
      </div>` : ""}
    </div>
  `;

  return `<article class="project-card${hasImg ? " has-image" : ""}">${body}${imgEl}</article>`;
}

document.addEventListener("DOMContentLoaded", renderProjects);