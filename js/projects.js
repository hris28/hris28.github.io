/*
   projects.js
   Single source of truth for the Projects page (and homepage Featured strip):
   the PROJECTS + EXPERIENCES data followed by the render logic.
   Exposes window.PROJECTS and window.EXPERIENCES. Experiences render as cards in
   the same timeline as projects (each has a `year`), and can hold nested projects.

   Style rules: lead research/policy items with a question, write in first person,
   keep the expanded `description` distinct from the one-line `blurb` (no repeating),
   and never use a spaced em dash.

   Item fields:
     year, type, title, date        required
     category                       primary filter bucket
     also: []                       extra filter buckets it should also appear under
     question                       optional hook (omit for non-research where it adds nothing)
     blurb                          one-line summary, always visible
     description                    fuller detail shown on expand, must add beyond the blurb
     pi                             course / PI / context line (shown above the question)
     honor: []                      awards, each rendered on its own starred line
     tags: []
     image                          single thumbnail (no caption)
     images: [{src, caption}]       one or more captioned figures, shown larger beside the card
     home, homeDesc, accent         homepage Featured flags
     links: [{label, url, kind}]    kind: code | live | writeup | paper | poster | media | competition | signup

   Experience fields: role, org, date, year, category, also, summary, honor, tags,
     links, projects:[{title, description, tags, links}]
*/

const PROJECTS = [
  // ---------- 2026 ----------
  {
    year: 2026, type: "POLICY", category: "Archives",
    date: "Jan 2026 to May 2026",
    title: "AI Scraping and the Future of Digital Preservation Archives",
    pi: "INLS 690: AI Law and the Struggle for Control of Knowledge · Profs. Will Cross and Dave Hansen",
    question: "Who gets to train on the archive?",
    blurb: "A tiered access policy for the Internet Archive that governs AI-scale mass scraping.",
    description: "AI crawlers are pulling from public-good archives like the Internet Archive at a scale their terms of service were never written for, and the fallout is already visible: news sites have started blocking archive crawlers outright. I wrote a tiered access policy, an open tier, a credentialed research tier, and a commercial data trust for model training, packaged with an implementation guide, a model data-use agreement, and a public FAQ. To defend each provision I built a legal analysis across the cases that define this fight (HathiTrust, Google Books, Thomson Reuters v. Ross, Bartz v. Anthropic, Kadrey v. Meta) and a scenario analysis weighing five stakeholder groups against one another.",
    tags: ["AI POLICY", "COPYRIGHT", "DIGITAL PRESERVATION", "GOVERNANCE", "LEGAL ANALYSIS"],
    image: "images/project-thumbs/ai-scraping.png",
    links: [
      { label: "Write-up", url: "garden/projects/ai-scraping-archives.html", kind: "writeup" },
      { label: "Policy memo", url: "assets/papers/ai-scraping-policy-memo.pdf", kind: "paper" },
      { label: "Scenario analysis", url: "assets/papers/ai-scraping-scenario-analysis.pdf", kind: "paper" },
    ],
  },
  {
    year: 2026, type: "ARCHIVES", category: "Archives",
    date: "Dec 2025 to Present",
    title: "Archiving the Now",
    pi: "UNC University Archives · Information and Library Science Student Association",
    question: "How do we preserve the human record?",
    blurb: "Developed the ILSSA Ad Hoc Archiving Committee, a student-led effort to record the experience of a campus transition in real time.",
    description: "Institutional archives tend to preserve the decisions made at the top and lose the experience of the people those decisions were made about, and student-organization material is rarely donated at all. So much of what happens around us is charted by people with titles and institutional memory, and it is easy to end up a spectator to your own experience. We co-founded a committee, partnering with UNC University Archivesto capture the unfiltered student record of a major campus transition as it happened. In about five months we grew from three students to a structured effort, built an oral-history methodology, and gathered 35 digital surveys, 15 paper surveys, 9 written stories, and 11 oral histories, then presented this model of real-time, community-driven archival advocacy at the SNCA/SCAA 2026 conference.",
    tags: ["ARCHIVES", "ORAL HISTORY", "COMMUNITY ARCHIVING", "DIGITAL PRESERVATION"],
    links: [
      { label: "Conference", url: "https://ncarchivists.org/conference-schedule/2026", kind: "media" },
      { label: "Sign-up", url: "http://go.unc.edu/SILSOralHistoryScheduling", kind: "signup" },
    ],
  },
  {
    year: 2026, type: "SERVICE DESIGN", category: "Research", also: ["Archives"],
    date: "Jan 2026 to May 2026",
    title: "Web Archive Forensics for NC's Accountability Journalists",
    pi: "INLS 500: Human Information Interactions · Prof. Leslie Thomson",
    question: "How does an under-resourced local journalist preserve and verify the web sources their accountability reporting depends on?",
    blurb: "A three-tier web-capture reference service for the State Library of North Carolina.",
    description: "Freelance accountability reporters in North Carolina's news-desert counties work without the time, tools, or newsroom infrastructure to preserve and verify the web sources their reporting depends on. I designed a three-tier reference and capture service for the State Library of North Carolina, capture-on-demand, a statewide verification workshop series through the NC Cardinal library consortium, and a curated NC accountability web collection, and assessed institutional capacity against Archive-It infrastructure and WARC / ISO 28500 standards. I grounded the user population and every tier in an information-needs analysis and LIS information-behavior theory (Taylor, Savolainen, Koufogiannakis).",
    tags: ["SERVICE DESIGN", "DIGITAL PRESERVATION", "INFORMATION BEHAVIOR", "ARCHIVES", "JOURNALISM"],
    image: "images/project-thumbs/web-archive.png",
    links: [
      { label: "Write-up", url: "garden/projects/web-archive-forensics.html", kind: "writeup" },
      { label: "Proposal", url: "assets/papers/web-archive-forensics-proposal.pdf", kind: "paper" },
    ],
  },
  {
    year: 2026, type: "UX RESEARCH", category: "Research",
    date: "Spring 2026",
    title: "Tracking the Trackers, a Privacy Information-Seeking Study",
    pi: "INLS 500: Human Information Interactions · Prof. Leslie Thomson",
    question: "Where does a motivated person get stuck trying to teach themselves a concept online?",
    blurb: "A think-aloud study of one person teaching themselves how web tracking works, mapped against four information-behavior models.",
    description: "I treated one person's self-directed session on web tracking and digital privacy as primary qualitative data, recording their think-aloud as they tried to understand how tracking works. Mapping how they formed queries and chose sources against four information-behavior models (Taylor, Kuhlthau, Bates' berrypicking, and Bawden and Robinson's information anxiety) let me pinpoint exactly where the privacy information environment creates friction, and turn each stuck point into a concrete design principle for an accessible security guide.",
    tags: ["UX RESEARCH", "QUALITATIVE", "THINK ALOUD", "PRIVACY", "INFORMATION BEHAVIOR"],
    image: "images/project-thumbs/tracking-trackers.png",
    links: [
      { label: "Write-up", url: "garden/projects/tracking-the-trackers.html", kind: "writeup" },
      { label: "Analysis", url: "assets/papers/tracking-the-trackers-analysis.pdf", kind: "paper" },
    ],
  },
  {
    year: 2026, type: "RESEARCH", category: "Research",
    date: "Aug 2025 to Feb 2026",
    title: "LLM-Driven Language Shift in Naturalistic Communication",
    pi: "PI: Dr. Fei Yu · Independent Study",
    question: "Is talking to AI quietly changing how humans write and speak?",
    blurb: "A PRISMA systematic review of whether LLM exposure is reshaping human language.",
    description: "I ran a PRISMA-guided systematic review across 6 databases and 4 preprint servers, synthesizing the evidence for LLM-associated shifts in human language and building a framework for comparing studies that measure that shift in very different ways. My five-lens extraction framework (study design, communication context, exposure mechanism, linguistic features, and trust or authenticity) turned a scattered literature into an evidence map, showing how concentrated the work is in text and how little exists on spoken language and secondhand diffusion.",
    tags: ["SYSTEMATIC REVIEW", "PRISMA", "LLMS", "LINGUISTICS", "AI LITERACY"],
    image: "images/project-thumbs/llm-review.png",
    links: [
      { label: "Notes and draft", url: "garden-entry.html?slug=linguistic-effect-of-llms", kind: "writeup" },
      { label: "Paper", url: "assets/papers/llm-language-shift-review.pdf", kind: "paper" },
    ],
  },
  {
    year: 2026, type: "POLICY", category: "Archives", also: ["Creative"],
    date: "Fall 2025",
    title: "Authorship and Creativity in the Age of Generative AI",
    pi: "Graduate seminar facilitation · co-designed and co-led",
    question: "When the AI makes the image, who is the author?",
    blurb: "A graduate seminar I co-designed on authorship, credit, and creative labor under generative AI.",
    description: "I co-designed and co-led a 75-minute graduate seminar arguing that authorship under generative AI is not settled by who owns the output; it is contested among human intention, the labor and data that models are trained on, and what the law will actually recognize. I built the session around a small-group comparison of two very different case studies, a major corporation and a group of independent artists, so the class had to reason concretely about who does the creative work and who gets credit or paid.",
    tags: ["AI POLICY", "COPYRIGHT", "CREATIVITY", "TEACHING"],
    links: [
      { label: "Facilitation", url: "assets/papers/genai-authorship-facilitation.pdf", kind: "paper" },
    ],
  },

  // ---------- 2025 ----------
  {
    year: 2025, type: "RESEARCH", category: "Research",
    date: "Sept 2025 to Present",
    title: "Eye-Tracking Engagement in AI-Assisted Academic Search",
    pi: "PI: Dr. Fei Yu · with Jaegoo Ha",
    question: "When students research with AI, how do their comprehension, cognitive load, verification habits, and understanding actually change?",
    blurb: "A Tobii eye-tracking study of AI-assisted versus unaided academic search in library databases.",
    description: "I designed a between-subjects mixed-methods study (target n = 20) that pairs Tobii Pro Nano eye tracking, fixation, saccade, and pupil dilation across labeled interface regions, with think-aloud protocols and post-task instruments adapting Cognitive Load Theory and the System Usability Scale, so the design measures comprehension and mental effort rather than time alone. A needs assessment of 12 student interviews found 65% struggled to expand keywords and 38% used ChatGPT without verifying sources. The findings translate into UX guidance for AI tools in educational interfaces, delivered as a slide deck, prompt handout, and screen-recorded tutorial.",
    tags: ["HCI", "EYE TRACKING", "MIXED METHODS", "AI LITERACY", "UX RESEARCH"],
    image: "images/project-thumbs/eye-tracking.png",
    home: true, accent: true,
    homeDesc: "Mixed-methods study with the Tobii Pro Nano comparing ChatGPT against unaided UNC Library Search.",
    links: [
      { label: "Write-up", url: "garden/projects/eye-tracking-ai-search.html", kind: "writeup" },
      { label: "Report", url: "assets/papers/ai-literacy-report.pdf", kind: "paper" },
    ],
  },
  {
    year: 2025, type: "HARDWARE", category: "Hardware", also: ["Creative"],
    date: "Aug 2025 to Dec 2025",
    title: "3D-Printed D3 Dopamine Receptor Model",
    pi: "PI: Dr. Alexandra Nowlan · NSCI 405 · 4-person design team",
    question: "Making an invisible allosteric drug mechanism into something you can hold and explain.",
    blurb: "Designed and 3D-printed a communication tool for researchers working on Parkinson's therapeutics.",
    description: "Working from cryo-EM structures, my team built a physical model of the D3 dopamine receptor that visibly changes conformation when the bitopic ligand FOB02-04A binds. I processed the receptor in ChimeraX and Blender, carved the binding pockets in TinkerCAD and Onshape, and printed it in PLA and PETG across several design iterations. I authored the design dossier and presented the model at UNC BeAM Makerfest as a communication tool for medicinal chemists working on Parkinson's therapeutics.",
    tags: ["3D PRINTING", "CHIMERAX", "BLENDER", "CAD", "NEUROPHARMACOLOGY"],
    images: [
      { src: "images/ligand-visualization-chimerax.jpeg", caption: "D3 receptor and bitopic ligand in ChimeraX" },
      { src: "images/ligand-visualization-3Dprint.jpg", caption: "The 3D-printed model" },
    ],
    links: [
      { label: "Write-up", url: "garden/projects/d3-receptor-model.html", kind: "writeup" },
      { label: "Design brief", url: "assets/papers/d3-receptor-design-brief.pdf", kind: "paper" },
    ],
  },
  {
    year: 2025, type: "CODE", category: "Code",
    date: "Sept 2025 to Dec 2025",
    title: "Health Chart App",
    pi: "PI: Jonathan Tweedy · Health Informatics",
    question: "Turning fragmented patient data into an interoperable view a clinician can act on.",
    blurb: "A FHIR-integrated EHR dashboard with Leaflet maps, AJAX, and Highcharts analytics.",
    description: "I built a JavaScript app that visualizes patient vitals, clinical trends, and care locations with Leaflet and AJAX, and connected it to live EHR systems like EPIC through the FHIR REST API. On top of that interoperability layer I added patient CRUD operations and Highcharts analytics, then scoped how the tool could extend into clinical decision support and patient communication.",
    tags: ["JAVASCRIPT", "FHIR", "LEAFLET", "AJAX", "HEALTHCARE"],
    home: true,
    homeDesc: "FHIR-integrated EHR dashboard with Leaflet maps, AJAX, and Highcharts analytics.",
    links: [
      { label: "Code", url: "https://github.com/hris28/FHIR-HealthApp", kind: "code" },
      { label: "Live", url: "https://hris28.github.io/FHIR-HealthApp/index.html", kind: "live" },
    ],
  },
  {
    year: 2025, type: "RESEARCH", category: "Research", also: ["Hardware"],
    date: "Jul 2025 to Dec 2025",
    title: "Brain-Computer Interface Model Card, DREAMS Framework Evaluation",
    pi: "PI: Dr. Raghavendra Pradyumna Pothukuchi · with Disha Kohal Math",
    question: "Model cards are supposed to make ML systems accountable, but do they survive contact with messy real-world data?",
    blurb: "An EEG pipeline built from scratch to stress-test whether DREAMS-style model cards hold up on real-world data.",
    description: "I built an EEG classification pipeline from scratch (TensorFlow, Keras, and MNE; EEGNet, DeepConvNet, and ShallowConvNet on the bigP3BCI P300 dataset), generated DREAMS-style model cards for it, then stress-tested whether those cards survive contact with a noisy free-movement dataset, scoring them with a 13-item System Explainability Scale across Trust, Usability, and Understandability. The cards scored well on readability and visualization but weak on actionable guidance and uncertainty communication, and DREAMS needed substantial refactoring to fit a custom pipeline at all. I published it all as a reproducible artifact.",
    tags: ["BCI", "TENSORFLOW", "EEG", "CNN", "MODEL CARDS", "EXPLAINABILITY"],
    links: [
      { label: "Code", url: "https://github.com/hris28/BCIModelCardEvaluation", kind: "code" },
      { label: "Paper", url: "assets/papers/bci-dreams-evaluation.pdf", kind: "paper" },
    ],
  },
  {
    year: 2025, type: "CODE", category: "Code", also: ["Creative"],
    date: "Ongoing since 2024",
    title: "The Garden",
    blurb: "A Quartz digital garden of notes, posts, mini-tools, and songs, sorted by growth stage.",
    description: "The Garden is where I think in public. It is a Quartz-based digital garden of markdown notes, hand-built posts, embedded mini-tools, and the occasional song, sorted by how finished each piece is, seedling, growing, or evergreen, and browsable through search or a live graph explorer. It also quietly hosts many of the project write-ups linked across this page.",
    tags: ["DIGITAL GARDEN", "QUARTZ", "WRITING", "KNOWLEDGE MANAGEMENT", "JAVASCRIPT"],
    links: [
      { label: "Live", url: "garden.html", kind: "live" },
      { label: "About", url: "garden-entry.html?slug=garden-about", kind: "writeup" },
    ],
  },
  {
    year: 2025, type: "CODE", category: "Code", also: ["Creative"],
    date: "Jun 2025 to Present",
    title: "Avar Intelligence Compendium",
    blurb: "A web-based investigation map and encounter manager for a D&D 5e mystery campaign.",
    description: "Avar is an information-visualization tool for the tabletop game I run: a browser-based investigation map and encounter manager for a Dungeons and Dragons 5e mystery campaign. I built it in vanilla JavaScript, HTML, and CSS with a modular architecture so the same engine can be dropped onto other game systems, and I keep expanding it as the campaign grows.",
    tags: ["JAVASCRIPT", "INFORMATION VISUALIZATION", "DUNGEONS AND DRAGONS", "IN PROGRESS"],
    links: [
      { label: "Code", url: "https://github.com/hris28/Avar", kind: "code" },
      { label: "Live", url: "https://hris28.github.io/Avar/avar.html", kind: "live" },
    ],
  },

  // ---------- 2024 ----------
  {
    year: 2024, type: "CODE", category: "Creative",
    date: "2024",
    title: "Branching Visual Novel",
    pi: "COMM 150: Introduction to New Media · Prof. Joyce Rudinsky",
    question: "Can a branching story teach media theory by letting you live it?",
    blurb: "An interactive, choice-based visual novel built with Twine.",
    description: "For COMM 150 I built a reader-driven visual novel in Twine, using branching paths and layered Photoshop transitions so the reader moves through new-media concepts by making choices instead of reading about them.",
    tags: ["TWINE", "INTERACTIVE FICTION", "NEW MEDIA", "CREATIVE CODE"],
    links: [
      { label: "Code", url: "https://github.com/hris28/twine-story", kind: "code" },
      { label: "Live", url: "https://hris28.github.io/twine-story/", kind: "live" },
    ],
  },

  // ---------- 2023 ----------
  {
    year: 2023, type: "CODE", category: "Creative",
    date: "Spring 2023",
    title: "Ackland Virtual 3D Art Gallery",
    pi: "ENGL 105: English Composition and Rhetoric · Ackland Art Museum",
    question: "What if you could walk through a museum, right from where you are?",
    blurb: "A gallery you walk through instead of scroll: a first-person explorable 3D exhibition built in Three.js.",
    description: "What started as an ENGL 105 assignment to visualize and analyze themed pieces from UNC's Ackland Art Museum, I turned into a passion project for teaching myself Blender. I modeled a museum from scratch and built a first-person explorable 3D exhibition in Three.js, with dynamic lighting, spatial navigation, and art you can interact with, so you walk through the show instead of scrolling past it.",
    tags: ["THREE.JS", "BLENDER", "WEBGL", "ART ANALYSIS", "CREATIVE CODE"],
    links: [
      { label: "Code", url: "https://github.com/hris28/3D-gallery", kind: "code" },
      { label: "Live", url: "https://hris28.github.io/3D-gallery/", kind: "live" },
    ],
  },
  {
    year: 2023, type: "CODE", category: "Code", also: ["Creative"],
    date: "Feb 2023",
    title: "Temperament Test, Pearl Hacks",
    question: "Which of the four classical temperaments are you, and can a quiz teach the theory while you find out?",
    blurb: "A full-stack quiz that builds a temperament profile through interactive, accessible forms.",
    description: "Built at Pearl Hacks, this full-stack JavaScript quiz walks you through interactive forms and returns a temperament profile, with local storage, custom animations, and a responsive, accessible interface. I recently rescued it from the shut-down Glitch platform and rehosted it on its own site.",
    honor: ["Highest STEM-Interest Inclusivity Runner-Up, Qorvo Inc."],
    tags: ["JAVASCRIPT", "FULL STACK", "HACKATHON", "ACCESSIBILITY", "EDUCATIONAL"],
    links: [
      { label: "Live", url: "https://hris28.github.io/Temperament-Test/", kind: "live" },
      { label: "Code", url: "https://github.com/hris28/Temperament-Test", kind: "code" },
      { label: "Hackathon", url: "https://devpost.com/software/temperament-test", kind: "competition" },
    ],
  },

  // ---------- 2022 ----------
  {
    year: 2022, type: "RESEARCH", category: "Research",
    date: "Apr 2021 to May 2022",
    title: "Nanoparticle Anticancer Agent",
    pi: "SRIP Research in Chemistry",
    question: "Can an anticancer nanoparticle be made from what a food supply chain throws away?",
    blurb: "Biogenic silver nanoparticles synthesized from agri-food byproducts as the reducing agent.",
    description: "I synthesized biogenic silver nanoparticles using agri-food byproducts as the reducing agent, testing whether an effective anticancer nanoparticle could be made from what a food supply chain throws away. The work was wet-lab-forward, physicochemical characterization of the particles, supported by computational modeling in Schrödinger Maestro, Gaussian, MATLAB, Vortex, and WebMO, and I 3D-printed ChimeraX-modeled ligands to make the binding mechanism tangible.",
    honor: [
      "Regeneron STS Scholar, Top 300 of 2,162 applicants internationally",
      "NC International Science Challenge Winner",
    ],
    tags: ["NANOTECH", "COMPUTATIONAL CHEMISTRY", "SCHRÖDINGER", "MATLAB", "DRUG DESIGN"],
    links: [
      { label: "Poster", url: "assets/papers/nanoparticle-anticancer-poster.pdf", kind: "poster" },
      { label: "Competition", url: "https://www.ncsmt.org/2022-nc-science-challenge-winners/", kind: "competition" },
    ],
  },

  // ---------- 2020 / 2019 ----------
  {
    year: 2020, type: "RESEARCH", category: "Research",
    date: "2019 to 2022",
    title: "Noninvasive Diabetes Treatment",
    question: "Insulin you can swallow.",
    blurb: "Chitosan-insulin nanoparticles engineered for oral insulin delivery.",
    description: "Over several years I synthesized and self-assembled chitosan-insulin nanoparticles designed to survive digestion and deliver insulin orally, then measured their stability and release efficiency. I also ran alpha-amylase inhibition assays on traditional medicinal herbs to test their hypoglycemic potential.",
    honor: ["International BioGENEius Challenge Finalist and NC State Winner (2020)"],
    tags: ["BIOMEDICAL", "NANOPARTICLES", "DRUG DELIVERY"],
    links: [
      { label: "Poster", url: "assets/papers/oral-insulin-poster.pdf", kind: "poster" },
      { label: "Competition", url: "https://youtu.be/Aw31zX-d5mw?si=LDtB71TvFTKBEu-g", kind: "competition" },
    ],
  },
  {
    year: 2019, type: "RESEARCH", category: "Research",
    date: "Sept 2018 to Jul 2020",
    title: "Wastewater Bioremediation",
    question: "Using algae as a low-cost way to pull nitrate and phosphate pollution out of wastewater.",
    blurb: "Published high-school research on algae as a low-cost wastewater remediator.",
    description: "This self-directed project asked whether algae could cheaply strip nitrate and phosphate pollution from wastewater. I designed an experimental apparatus to measure how effectively algae remove the contaminants, then ran serial assays to quantify the reduction. It became an Intel ISEF Finalist project and my first peer-reviewed publication.",
    honor: [
      "Intel ISEF Finalist (2019)",
      "Published in the International Journal of High School Research (2020)",
    ],
    tags: ["ENVIRONMENTAL", "PUBLISHED", "ISEF", "BIOLOGY"],
    images: [
      { src: "images/wastewater-poster.JPG", caption: "ISEF research poster" },
      { src: "images/isef-name.jpg", caption: "At Intel ISEF, 2019" },
    ],
    links: [
      { label: "Write-up", url: "garden/projects/wastewater-bioremediation.html", kind: "writeup" },
      { label: "Report", url: "assets/papers/bioremediation-report.pdf", kind: "paper" },
      { label: "Abstract", url: "https://abstracts.societyforscience.org/Home/FullAbstract?Category=Any%20Category&AllAbstracts=True&FairCountry=Any%20Country&FairState=Any%20State&ProjectId=16993", kind: "media" },
    ],
  },
];

/* Experiences: roles where I built things. They sit in the same timeline (by `year`)
   and can hold nested projects. Add roles or nested items freely. */
const EXPERIENCES = [
  {
    year: 2025, role: "Co-President", org: "UNC Zero Degrees",
    date: "Aug 2025 to Present · Technology Officer 2023 to 2024",
    category: "Leadership", also: ["Code"],
    summary: "I scaled UNC's largest interdisciplinary social organization to 200+ active members and secured $1,800 in Undergraduate Senate funding. The automation I built grew student engagement by 85%.",
    tags: ["LEADERSHIP", "COMMUNITY", "AUTOMATION", "PYTHON"],
    projects: [
      {
        title: "AlertCarolina Webhooks Notification System",
        description: "I built a webhook system that pushes UNC AlertCarolina emergency alerts straight into the club's Discord in real time, alongside moderation bots and event analytics that drove the engagement growth.",
        tags: ["PYTHON", "WEBHOOKS", "DISCORD API"],
        links: [{ label: "Code", url: "https://github.com/hris28/0-Degrees", kind: "code" }],
      },
    ],
  },
  {
    year: 2025, role: "Ambassador and New School Advisory Board", org: "UNC School of Information and Library Science",
    date: "Aug 2025 to Present",
    category: "Leadership",
    summary: "I represent SILS to prospective students and advise leadership on curriculum and student experience through the SILS and SDSS merger, pushing for connections across libraries, data science, AI, UX, and informatics.",
    tags: ["LEADERSHIP", "ADVOCACY", "HIGHER EDUCATION"],
    projects: [],
  },
  {
    year: 2024, role: "Co-Founder and Chief Operating Officer", org: "SkyeLabs Innovation Inc.",
    date: "Sept 2020 to Aug 2024",
    category: "Entrepreneurship", also: ["Code"],
    summary: "I co-founded a sustainable-materials startup and ran its R&D, strategy, prototyping, and investor outreach. I filed a provisional patent, built the product website in HTML and CSS with SEO, and secured $2,000 from the Bowman-Brockman Endowment for Entrepreneurship and Advanced Research.",
    honor: [
      "Pete Conrad Scholar, Aerospace and Aviation (2021)",
      "NASA iTech Top 10 Finalist and sole Honorable Mention (2021)",
    ],
    tags: ["ENTREPRENEURSHIP", "MATERIALS SCIENCE", "R&D", "AEROSPACE"],
    projects: [
      {
        title: "EcoGel",
        description: "Our flagship product: a flexible carbon biopolymer aerogel aimed at high-performance apparel, aerospace, and space exploration. I helped carry it from lab prototype to a NASA iTech pitch.",
        tags: ["MATERIALS SCIENCE", "AEROSPACE", "PATENT"],
        links: [
          { label: "Competition", url: "https://www.youtube.com/live/xC5uKDG7gAk?si=QQqyKCo9caM4c9Ts", kind: "competition" },
          { label: "Press", url: "https://static1.squarespace.com/static/53cd080fe4b006756b7288ea/t/60a564d925c8aa6d5b4fe6f6/1621451994142/International+Student+Innovators+Awarded+Top+Honors+in.pdf", kind: "media" },
        ],
      },
    ],
  },
  {
    year: 2024, role: "Facilitator and College Loop President", org: "Girls Who Code, UNC and NCSSM",
    date: "2020 to 2024",
    category: "Leadership",
    summary: "I taught Python to 50+ students a week using Turtle for visual learning, mentored semester-long app projects, and co-founded chapters at both NCSSM and UNC to widen CS access for students who rarely see it.",
    tags: ["TEACHING", "PYTHON", "MENTORSHIP", "CURRICULUM"],
    projects: [],
  },
  {
    year: 2022, role: "Editor-in-Chief", org: "Broad Street Scientific, NCSSM",
    date: "Oct 2020 to Jun 2022",
    category: "Editorial", also: ["Creative"],
    summary: "I led NCSSM's official journal of student STEM research, directing an editorial staff of 20+, running publishing workshops, critiquing submissions, and choosing the annual theme (Chaos Theory).",
    tags: ["EDITORIAL", "PUBLISHING", "WORDPRESS", "SEO"],
    projects: [
      {
        title: "2022 Annual Publication",
        description: "I oversaw the 100-page Chaos Theory issue end to end and interviewed Dr. Amay Bandodkar (NC State ECE) for a feature.",
        tags: ["EDITORIAL", "PUBLISHING"],
        links: [
          { label: "Publication", url: "https://issuu.com/ncssmedu/docs/bss_2022/6", kind: "media" },
          { label: "Journal site", url: "https://broadstreetscientific.ncssm.edu/index.html", kind: "live" },
        ],
      },
    ],
  },
];


/* ---------- Rendering: timeline / grid / list, filters, hover link previews ----------
   Projects page uses #view + #seg + #filters + #linkpv. Homepage uses #home-featured.
   Experiences render inline as cards in the same views. */
(function () {
  const ITEMS = [
    ...PROJECTS.map((p) => Object.assign({ _kind: "project" }, p)),
    ...EXPERIENCES.map((x) => Object.assign({ _kind: "experience" }, x)),
  ];
  // Policy / Leadership / Editorial / Entrepreneurship stay as card headers, not filters.
  const FILTERS = ["All", "Research", "Code", "Hardware", "Archives", "Creative"];
  const state = { view: "timeline", filter: "All" };

  const KIND = {
    code:        { g: "&lt;/&gt;", note: "GitHub repository" },
    live:        { g: "▶", note: "Live site" },
    writeup:     { g: "✎", note: "Project write-up" },
    paper:       { g: "▤", note: "PDF, full deliverable" },
    poster:      { g: "▦", note: "Research poster (PDF)" },
    media:       { g: "↗", note: "External link" },
    competition: { g: "★", note: "Competition / award" },
    signup:      { g: "✎", note: "Sign-up form" },
  };
  const dest = (url) => (/^https?:/i.test(url)
    ? (() => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return url; } })()
    : "hris28.github.io");
  const figsOf = (p) => (Array.isArray(p.images) && p.images.length)
    ? p.images : (p.image ? [{ src: p.image }] : []);

  const metaRow = (type, date) =>
    `<div class="p-meta"><span class="p-type">${type}</span><span class="p-date">${date || ""}</span></div>`;
  const honorsRow = (honor) => {
    if (!honor) return "";
    const list = Array.isArray(honor) ? honor : [honor];
    return `<div class="p-honors">${list.map((h) => `<p class="p-honor">${h}</p>`).join("")}</div>`;
  };
  const tagsRow = (tags) => (!tags || !tags.length) ? "" :
    `<div class="p-tags">${tags.map((t) => `<span class="p-tag">${t}</span>`).join("")}</div>`;
  const linksRow = (links, thumb) => (!links || !links.length) ? "" :
    `<div class="p-links">${links.map((l) => {
      const k = KIND[l.kind] || KIND.media;
      return `<a class="p-link" href="${l.url}" target="_blank" rel="noopener"
        data-pv data-label="${l.label}" data-note="${k.note}" data-dest="${dest(l.url)}"
        data-img="${thumb || ""}" data-glyph="${k.g}"><span class="ic">${k.g}</span>${l.label}</a>`;
    }).join("")}</div>`;
  const figsCol = (figs) => (!figs.length) ? "" :
    `<div class="p-figs">${figs.map((f) => `<figure><img src="${f.src}" alt="${f.caption || ""}" loading="lazy" />${f.caption ? `<figcaption>${f.caption}</figcaption>` : ""}</figure>`).join("")}</div>`;

  function projectCard(p, i, variant) {
    const id = "pd" + i;
    const figs = figsOf(p);
    const thumb = figs[0] ? figs[0].src : "";
    const pi = p.pi ? `<p class="p-pi">${p.pi}</p>` : "";
    const q = p.question ? `<p class="p-q">${p.question}</p>` : "";
    // On grid, tags fold into the collapsible details to keep card heights even.
    const detailInner = `${p.description}${variant === "grid" ? tagsRow(p.tags) : ""}`;
    const details = `<div class="p-desc" id="${id}" style="display:none">${detailInner}</div>`;
    const more = `<button class="p-more" data-toggle="${id}">Details +</button>`;
    const visibleTags = variant === "grid" ? "" : tagsRow(p.tags);

    if (variant === "list") {
      return `<article class="card">
        <div class="col-meta">${metaRow(p.type, p.date)}</div>
        <div class="col-mid"><h3 class="p-title">${p.title}</h3>${pi}${q}
          <p class="p-blurb">${p.blurb || ""}</p>${details}${honorsRow(p.honor)}${more}${visibleTags}</div>
        <div class="col-links">${linksRow(p.links, thumb)}</div>
      </article>`;
    }
    const content = `${metaRow(p.type, p.date)}<h3 class="p-title">${p.title}</h3>${pi}${q}
      <p class="p-blurb">${p.blurb || ""}</p>${details}${honorsRow(p.honor)}${more}
      ${linksRow(p.links, thumb)}${visibleTags}`;
    if (variant === "grid") return `<article class="card">${figsCol(figs)}${content}</article>`;
    return `<article class="card${figs.length ? " has-figs" : ""}"><div>${content}</div>${figsCol(figs)}</article>`;
  }

  function experienceCard(x) {
    const nested = (x.projects && x.projects.length)
      ? `<div class="xp-nested">${x.projects.map((pr) => `<div class="xp-proj">
          <h4>${pr.title}</h4><p>${pr.description}</p>${tagsRow(pr.tags)}${linksRow(pr.links, "")}</div>`).join("")}</div>`
      : "";
    return `<article class="card xp-card">
      ${metaRow(x.category || "EXPERIENCE", x.date)}
      <h3 class="p-title">${x.role}</h3><div class="xp-org">${x.org}</div>
      <p class="p-blurb">${x.summary}</p>${honorsRow(x.honor)}
      ${linksRow(x.links, "")}${tagsRow(x.tags)}${nested}
    </article>`;
  }

  const renderItem = (it, variant) =>
    it._kind === "experience" ? experienceCard(it) : projectCard(it, ITEMS.indexOf(it), variant);

  const matches = (it) => state.filter === "All"
    || it.category === state.filter || (it.also || []).includes(state.filter);
  const filtered = () => ITEMS.filter(matches);

  function renderFilters() {
    const f = document.getElementById("filters"); if (!f) return;
    f.innerHTML = FILTERS.map((c) =>
      `<button data-cat="${c}" class="${c === state.filter ? "active" : ""}">${c}</button>`).join("");
  }
  function renderView() {
    const view = document.getElementById("view"); if (!view) return;
    view.className = state.view;
    const items = filtered();
    const count = document.getElementById("count");
    if (count) {
      const pc = items.filter((it) => it._kind === "project").length;
      count.textContent = `${pc} project${pc === 1 ? "" : "s"}` +
        (items.length - pc ? ` · ${items.length - pc} roles` : "");
    }
    if (state.view === "timeline") {
      const byYear = {};
      items.forEach((it) => { (byYear[it.year] = byYear[it.year] || []).push(it); });
      const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);
      view.innerHTML = years.map((y) =>
        `<h2 class="yr">${y}</h2><div class="tl">${byYear[y].map((it) => renderItem(it, "timeline")).join("")}</div>`
      ).join("");
    } else {
      view.innerHTML = items.slice().sort((a, b) => b.year - a.year)
        .map((it) => renderItem(it, state.view)).join("");
    }
  }

  // Hover link preview
  function initPreview() {
    const pv = document.getElementById("linkpv"); if (!pv) return;
    const pvLabel = document.getElementById("pv-label");
    const pvNote = document.getElementById("pv-note");
    const pvDest = document.getElementById("pv-dest");
    let timer;
    function show(a) {
      const img = a.getAttribute("data-img");
      const cur = document.getElementById("pv-media");
      if (img) cur.outerHTML = `<img class="pv-img" id="pv-media" src="${img}" alt="" />`;
      else cur.outerHTML = `<div class="pv-ph" id="pv-media">${(a.getAttribute("data-glyph") || "◆").replace("&lt;", "<").replace("&gt;", ">")}</div>`;
      pvLabel.textContent = a.getAttribute("data-label");
      pvNote.textContent = a.getAttribute("data-note");
      pvDest.textContent = a.getAttribute("data-dest");
      const r = a.getBoundingClientRect(), w = 260;
      let left = Math.min(r.left, window.innerWidth - w - 8);
      let top = r.bottom + 10;
      if (top + 210 > window.innerHeight) top = r.top - 210;
      pv.style.left = Math.max(8, left) + "px";
      pv.style.top = top + "px";
      pv.classList.add("on");
    }
    const hide = () => pv.classList.remove("on");
    document.body.addEventListener("mouseover", (e) => {
      const a = e.target.closest("a.p-link[data-pv]"); if (!a) return;
      clearTimeout(timer); timer = setTimeout(() => show(a), 120);
    });
    document.body.addEventListener("mouseout", (e) => {
      const a = e.target.closest("a.p-link[data-pv]"); if (!a) return;
      clearTimeout(timer); timer = setTimeout(hide, 100);
    });
    document.body.addEventListener("focusin", (e) => {
      const a = e.target.closest("a.p-link[data-pv]"); if (a) show(a);
    });
    document.body.addEventListener("focusout", hide);
    window.addEventListener("scroll", hide, { passive: true });
  }

  function wire() {
    const seg = document.getElementById("seg");
    if (seg) seg.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-view]"); if (!b) return;
      state.view = b.dataset.view;
      seg.querySelectorAll("button").forEach((x) => x.classList.toggle("active", x === b));
      renderView();
    });
    const filters = document.getElementById("filters");
    if (filters) filters.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-cat]"); if (!b) return;
      state.filter = b.dataset.cat; renderFilters(); renderView();
    });
    document.body.addEventListener("click", (e) => {
      const t = e.target.closest("[data-toggle]"); if (!t) return;
      const el = document.getElementById(t.dataset.toggle); if (!el) return;
      const open = el.style.display !== "none";
      el.style.display = open ? "none" : "block";
      t.textContent = open ? "Details +" : "Details −";
    });
    initPreview();
  }

  // Homepage "Featured work" strip, drawn from the same PROJECTS list.
  function renderHomeFeatured() {
    const root = document.getElementById("home-featured"); if (!root) return;
    root.innerHTML = PROJECTS.filter((p) => p.home).slice(0, 3).map((p) =>
      `<article class="project-card"${p.accent ? ' style="border-left-color: var(--accent);"' : ""}>
        <div class="project-meta"><span class="project-type">${p.type}</span><span class="project-date">${p.date}</span></div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.homeDesc || p.blurb || p.description}</p>
      </article>`).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("view")) { renderFilters(); renderView(); wire(); }
    renderHomeFeatured();
  });
})();
