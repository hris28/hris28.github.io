/* garden.js
   The digital garden: a data-driven stream of entries plus a tiny
   Markdown renderer (reused by the entry viewer).

   HOW TO ADD AN ENTRY
   Add an object to the GARDEN array below. Order doesn't matter; the code
   sorts by date. Fields:

     slug      (required)  unique id, kebab-case. Used in the URL.
     type      (required)  "tool" | "song" | "note" | "post" | "thought"
     title     (required)
     date      (required)  "YYYY-MM-DD"
     excerpt   (required)  one-line summary shown on the card
     tags      (optional)  array of strings
     maturity  (optional)  "seedling" | "growing" | "evergreen"  (🌱 🌿 🌳)
     featured  (optional)  true to show it in the Featured row up top

   WHERE THE CONTENT LIVES (pick ONE per entry):
     url   : "Avar/avar.html"               -> tool: card links straight to it
     page  : "garden-post-example.html"      -> post/note: your own HTML page
     md    : "garden/notes/example-note.md"  -> note/post: markdown, auto-rendered
     youtube + body                          -> song: embeds the video + notes
     body  : "<p>...</p>"                     -> thought/note: shown inline

   Anything with url/page links out directly; everything else opens in the
   shared viewer at garden-entry.html?slug=...
   */

const GARDEN = [
  {
    slug: "garden-about",
    image: "images/garden.png",
    type: "post",
    title: "The Invisible Infrastructure of Information",
    date: "2026-04-04",
    maturity: "growing",
    featured: true,
    tags: ["meta", "archive", "principles", "philosophy", "security"],
    excerpt: "Why this archive exists, and the principles behind how it is written.",
    md: "garden/posts/garden-about.md",
  },
  {
    slug: "avar-compendium",
    image: "images/garden.png",
    type: "tool",
    label: "project",
    title: "Avar Intelligence Compendium",
    date: "2025-12-01",
    maturity: "growing",
    tags: ["javascript", "d&d", "data-viz"],
    excerpt: "A web-based investigation map + encounter manager I built for a D&D 5e mystery campaign.",
    url: "Avar/avar.html",
  },
  {
    slug: "browser-fingerprinting",
    image: "images/garden.png",
    type: "tool",
    title: "What your browser silently sees",
    date: "2026-06-21",
    maturity: "growing",
    featured: true,
    tags: ["privacy", "security", "tool"],
    excerpt: "An interactive look at everything a website can read from your browser (computed locally), and which settings change what each value reveals.",
    page: "garden/tools/browser-fingerprinting.html",
    tool: true,
    links: ["privacy-basics", "vpn-explained", "isp-layer", "hardware-basics"],
  },
  {
    slug: "interacting-with-the-internet",
    image: "images/garden.png",
    type: "post",
    title: "Interacting with the Internet",
    date: "2026-05-02",
    maturity: "growing",
    tags: ["privacy", "security", "web"],
    excerpt: "A fifteen-minute orientation to how the web works and why it matters for your privacy.",
    md: "garden/posts/internet-interaction.md",
  },
  {
    slug: "evaluating-sources",
    image: "images/garden.png",
    type: "post",
    title: "Evaluating Online Sources",
    date: "2026-05-20",
    maturity: "growing",
    tags: ["privacy", "security", "web"],
    excerpt: "Privacy and security information comes from sources with very different incentives. Here is how to tell them apart.",
    md: "garden/posts/source-evaluation.md",
  },
  {
    slug: "threat-modeling",
    image: "images/garden.png",
    type: "post",
    title: "Security Basics: Threat Modeling for Ordinary People",
    date: "2026-04-10",
    maturity: "growing",
    tags: ["privacy", "security", "web"],
    excerpt: "A lot of security advice is written for an abstract worst-case. Threat modeling is about figuring out which risks actually apply to you.",
    md: "garden/posts/threat-modeling.md",
  },
  {
    slug: "privacy-basics",
    image: "images/garden.png",
    type: "post",
    title: "Privacy Basics: Understanding Your Digital Footprint",
    date: "2026-04-20",
    maturity: "growing",
    tags: ["privacy", "security", "web"],
    excerpt: "What cookies, tracking pixels, and browser fingerprinting actually are, how they work mechanically, and what blocking them does and does not achieve.",
    md: "garden/posts/privacy-basics.md",
  },
  {
    slug: "ai-scraping-archives",
    image: "images/garden.png",
    type: "post",
    label: "project",
    title: "AI Scraping & the Future of Digital Preservation Archives",
    date: "2026-05-06",
    maturity: "growing",
    tags: ["digital preservation", "ai policy", "copyright", "project"],
    excerpt: "A tiered access policy I wrote for the Internet Archive to govern large-scale AI scraping, grounded in fair-use case law.",
    page: "garden/projects/ai-scraping-archives.html",
  },
  {
    slug: "web-archive-forensics",
    image: "images/garden.png",
    type: "post",
    label: "project",
    title: "Web Archive Forensics for NC's Accountability Journalists",
    date: "2026-05-05",
    maturity: "growing",
    tags: ["digital preservation", "service design", "archives", "project"],
    excerpt: "A three-tier reference service for the State Library of NC giving journalists in news-desert counties a durable web-verification tool.",
    page: "garden/projects/web-archive-forensics.html",
  },
  {
    slug: "eye-tracking-ai-search",
    image: "images/garden.png",
    type: "post",
    label: "project",
    title: "Eye Tracking Engagement in AI-Assisted Academic Search",
    date: "2025-12-08",
    maturity: "growing",
    tags: ["hci", "eye tracking", "ux research", "project"],
    excerpt: "A mixed-methods, eye-tracking study of how AI assistance changes the way students search and comprehend scholarly sources.",
    page: "garden/projects/eye-tracking-ai-search.html",
  },
  {
    slug: "d3-receptor-model",
    image: "images/ligand-visualization-3Dprint.jpg",
    type: "post",
    label: "project",
    title: "3D Printed D3 Dopamine Receptor Model",
    date: "2025-12-05",
    maturity: "evergreen",
    tags: ["3d printing", "neuropharmacology", "science communication", "project"],
    excerpt: "A 3D-printed model of how the bitopic ligand FOB02-04A engages the dopamine D3 receptor, built as a communication tool.",
    page: "garden/projects/d3-receptor-model.html",
  },
  {
    slug: "wastewater-bioremediation",
    image: "images/wastewater-poster.JPG",
    type: "post",
    label: "project",
    title: "Wastewater Bioremediation",
    date: "2020-06-01",
    maturity: "evergreen",
    tags: ["environmental", "published", "isef", "project"],
    excerpt: "Self-directed research on using algae to remove nitrate and phosphate from wastewater; ISEF finalist and published in IJHSR.",
    page: "garden/projects/wastewater-bioremediation.html",
  },
  {
    slug: "tracking-the-trackers",
    image: "images/garden.png",
    type: "post",
    label: "project",
    title: "Tracking the Trackers: A Privacy Information-Seeking Study",
    date: "2026-04-20",
    maturity: "growing",
    tags: ["ux research", "privacy", "qualitative", "project"],
    excerpt: "A think-aloud observation analyzing how someone learns about web tracking, mapped onto four information-behavior models.",
    page: "garden/projects/tracking-the-trackers.html",
  },
  {
  slug: "vpn-explained",
  image: "images/garden.png",
  type: "note",
  title: "VPNs and how they work (and don't)",
  date: "2026-03-01",
  maturity: "seedling",
  tags: ["vpn", "network", "term"],
  excerpt: "Routes your traffic through one provider, hiding it from your ISP but handing all of it to the provider instead.",
  md: "garden/notes/vpn-explained.md",
},
{
  slug: "tor-explained",
  image: "images/garden.png",
  type: "note",
  title: "Tor: what it is, how it works",
  date: "2026-03-01",
  maturity: "evergreen",
  tags: ["tor", "privacy", "network"],
  excerpt: "What makes Tor different from a VPN, and how it works to protect your privacy.",
  md: "garden/notes/tor-explained.md",
},
{
  slug: "dns-explained",
  image: "images/garden.png",
  type: "note",
  title: "DNS: what it is, what it exposes",
  date: "2026-03-01",
  maturity: "evergreen",
  tags: ["dns", "privacy", "network"],
  excerpt: "Every domain you visit produces a DNS query your ISP can read by default.",
  md: "garden/notes/dns-explained.md",
},
{
  slug: "isp-layer",
  image: "images/garden.png",
  type: "note",
  title: "The ISP Layer: What Your Internet Provider Can See",
  date: "2026-04-01",
  maturity: "growing",
  tags: ["isp", "privacy", "network"],
  excerpt: "How much of your traffic your ISP can see, and what they can do with it.",
  md: "garden/notes/isp-layer.md",
},
{
  slug: "os-layer",
  image: "images/garden.png",
  type: "note",
  title: "Software Layers: From Firmware to Application",
  date: "2026-03-01",
  maturity: "growing",
  tags: ["os", "privacy", "network"],
  excerpt: "The eleven layers between your hardware and your applications, what each one does, and why the distinctions matter for security and performance.",
  md: "garden/notes/os-layers.md",
},
{ 
  slug: "hardware-basics",
  image: "images/garden.png", 
  type: "note", 
  title: "Hardware basics", 
  date: "2026-03-01", 
  maturity: "seedling", 
  tags: ["hardware", "gpu", "term"], 
  excerpt: "CPU, RAM, GPU, storage, firmware, etc.", 
  md: "garden/notes/hardware-basics.md" 
},
  {
    slug: "butterfly-effect-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "Butterfly Effect",
    date: "2022-02-18",
    maturity: "evergreen",
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote and recorded.",
    // Replace VIDEO_ID with the id from a YouTube URL (the part after v=).
    youtube: "K2Ytiv_ECvE",
    // body: "<p></p>",
    md: "garden/songs/butterfly-effect.md",
  },
  {
    slug: "linguistic-effect-of-llms",
    image: "images/garden.png",
    type: "note",
    title: "Notes: how LLMs are shifting human language",
    date: "2026-01-19",
    maturity: "seedling",
    featured: true,
    tags: ["llms", "linguistics", "research"],
    excerpt: "Working notes from the reading behind my systematic review, with the full review draft embedded.",
    pdf: "assets/papers/llm-language-shift-review.pdf",
    md: "garden/notes/linguistic-effect-of-llms.md",
  },
  {
    slug: "building-the-terminal",
    image: "images/garden.png",
    type: "tool",
    title: "Building the whoami terminal on my homepage",
    date: "2026-06-20",
    maturity: "evergreen",
    tags: ["webdev", "design", "accessibility"],
    excerpt: "Why I added a little terminal to my homepage, and how I kept the typing animation accessible.",
    page: "garden/posts/terminal-typewriter.html",
    tool: true,
  },
  {
    slug: "pcbp-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "Peasants and Princes",
    date: "2022-02-16",
    maturity: "evergreen",
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote and recorded.",
    // Replace VIDEO_ID with the id from a YouTube URL (the part after v=).
    youtube: "uxeTWrqlQfQ",
    md: "garden/songs/peasants-cant-be-princes.md",
  },
  {
    slug: "bbb-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "Beautiful Blanket of Blue",
    date: "2022-06-03",
    maturity: "evergreen",
    featured: true,
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote.",
    md: "garden/songs/beautiful-blanket-of-blue.md",
  },
  {
    slug: "wlil-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "What Love Is Like",
    date: "2023-07-20",
    maturity: "evergreen",
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote.",
    md: "garden/songs/what-love-is-like.md",
  },
  {
    slug: "insomnia-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "Insomnia",
    date: "2022-04-15",
    maturity: "evergreen",
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote.",
    md: "garden/songs/insomnia.md",
  },
  {
    slug: "rise-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "Rise",
    date: "2022-03-10",
    maturity: "evergreen",
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote for the 2021 TEDx Music Competition themed around the phrase 'up from the ashes'. Won first place.",
    body: "<p>Hello! I'm Hrishika Roychoudhury and I will be performing my original composition called Rise, for the phrase *Up From The Ashes* reminds me of the mythological creature from many stories that have been told for generations: the Phoenix, often depicted as a majestic bird that can die in a show of flames before being reborn from the decomposition of its own ashes. People often find themselves stuck, depressed, unable to reach their goals. This song is a reminder that tough times do occur and it may seem nearly impossible to get out of the 'abyss', but a rise cannot exist without a fall and even a phoenix cannot be reborn from the ashes without first dying. So never give up, because it's only a matter of time until you rise 'up from the ashes.'</p>",
    md: "garden/songs/rise.md",
  },
  {
    slug: "harami-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "Harami",
    date: "2019-04-20",
    maturity: "evergreen",
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote for my 9th grade English final project submission on A Thousand Splendid Suns by Khaled Hosseini.",
    youtube: "nll0UUAyE_k",
    md: "garden/songs/harami.md",
  },
  {
    slug: "alone-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "Alone",
    date: "2018-04-20",
    maturity: "evergreen",
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote for my 8th grade English final project submission on Romeo and Juliet.",
    md: "garden/songs/alone.md",
  },
  {
    slug: "col-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "City of Lies",
    date: "2017-06-03",
    maturity: "evergreen",
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote.",
    md: "garden/songs/city-of-lies.md",
  },
  {
    slug: "closer-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "Closer",
    date: "2019-04-02",
    maturity: "evergreen",
    tags: ["original", "songwriting", "music"],
    excerpt: "A song I wrote and recorded.",
    youtube: "OdPnB6DJDNY",
    md: "garden/songs/closer.md",
  },
  {
    slug: "fairytale-an-original-song",
    image: "images/garden.png",
    type: "song",
    title: "Fairytale",
    date: "2016-02-04",
    maturity: "evergreen",
    featured: true,
    tags: ["original", "songwriting", "music"],
    excerpt: "One of the first of my original songs that I performed on stage.",
    // Replace VIDEO_ID with the id from a YouTube URL (the part after v=).
    youtube: "RJ0IjUC2c0s",
    // body: "<p></p>",
    md: "garden/songs/fairytale.md",
  },
  {
  slug: "wcag-contrast-checker",
    image: "images/garden.png",
  type: "tool",
  title: "What actually makes text readable? (a contrast checker)",
  date: "2026-06-18",
  maturity: "evergreen",
  featured: true,
  tags: ["accessibility", "design", "tool"],
  excerpt: "A question I kept hitting in my own design work--with a live WCAG contrast checker to answer it.",
  page: "garden/tools/wcag-contrast-checker.html",
  tool: true,
},
];

// shared lookups + helpers (used by index and viewer)
const MATURITY = {
  seedling: { icon: "🌱", label: "seedling" },
  growing: { icon: "🌿", label: "growing" },
  evergreen: { icon: "🌳", label: "evergreen" },
};
const TYPE_LABEL = { tool: "tool", song: "song", note: "note", post: "post", thought: "thought" };
// Display order for the homepage cards and the explorer rail.
const TYPE_ORDER = ["tool", "post", "note", "thought", "song"];

function gardenEntryHref(e) {
  if (e.type === "tool" && e.url) return e.url;
  if (e.page) return e.page;
  return "garden-entry.html?slug=" + encodeURIComponent(e.slug);
}
function gardenFindBySlug(slug) {
  return GARDEN.find((e) => e.slug === slug);
}
function gardenFormatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// index page rendering (no-ops on pages without #garden-grid)
function renderGardenCard(e, isFeature) {
  const href = gardenEntryHref(e);
  const external = (e.type === "tool" && e.url) || /^https?:/.test(href);
  const mat = MATURITY[e.maturity];
  const matHtml = mat
    ? `<span class="maturity" title="maturity: ${mat.label}">${mat.icon}</span>`
    : "";
  const showImg = isFeature && e.image;  // covers only on featured cards
  const imgHtml = showImg ? `<img class="card-img" src="${e.image}" alt="" />` : "";
  return `
    <a class="garden-card type-${e.type}${isFeature ? " feature" : ""}${showImg ? " has-img" : ""}" href="${href}"${external ? ' target="_blank" rel="noopener"' : ""}${isFeature ? ' role="listitem"' : ""}>
      ${imgHtml}
      <div class="card-body">
        <div class="card-top">
          <span class="card-type">${e.label || TYPE_LABEL[e.type] || e.type}</span>
          ${matHtml}
        </div>
        <h3 class="card-title">${e.title}</h3>
        <p class="card-excerpt">${e.excerpt}</p>
        <span class="card-date">${gardenFormatDate(e.date)}</span>
      </div>
    </a>`;
}

function initGardenIndex() {
  const grid = document.getElementById("garden-grid");
  if (!grid) return; // not on the index page

  // Cards are chronological: most recent first, driven entirely by each
  // entry's `date`. Change a date and it re-sorts on the next reload.
  const sorted = [...GARDEN].sort((a, b) => (a.date < b.date ? 1 : -1));

  const featuredEl = document.getElementById("garden-featured");
  if (featuredEl) {
    const feats = sorted.filter((e) => e.featured);
    if (feats.length) {
      featuredEl.innerHTML = feats.map((e) => renderGardenCard(e, true)).join("");
      initFeaturedSlider(featuredEl);
    } else {
      featuredEl.closest("section")?.remove();
    }
  }

  let activeType = "all";
  let query = "";
  let pageSize = 9;  // entries shown at once; adjustable via the pager
  let page = 1;
  const pager = document.getElementById("garden-pagination");

  function matches(e) {
    if (activeType !== "all") {
      if (activeType === "tool") {
        if (!(e.type === "tool" || e.tool)) return false; // interactive posts surface here too
      } else if (e.type !== activeType) {
        return false;
      }
    }
    if (!query) return true;
    const hay = (e.title + " " + e.excerpt + " " + (e.tags || []).join(" ")).toLowerCase();
    return hay.includes(query);
  }
  function draw() {
    const list = sorted.filter(matches);
    const total = list.length;
    const allMode = pageSize === "all";
    const pages = allMode ? 1 : Math.max(1, Math.ceil(total / pageSize));
    if (page > pages) page = pages;
    if (page < 1) page = 1;
    const visible = allMode ? list : list.slice((page - 1) * pageSize, page * pageSize);
    grid.innerHTML = visible.length
      ? visible.map((e) => renderGardenCard(e, false)).join("")
      : `<p class="garden-empty">No entries here yet. Check back as the garden grows.</p>`;
    renderPager(total, pages, allMode);
  }

  function renderPager(total, pages, allMode) {
    if (!pager) return;
    const sizes = [6, 9, 12, 24];
    const opts =
      sizes.map((s) => `<option value="${s}"${!allMode && s === pageSize ? " selected" : ""}>${s}</option>`).join("") +
      `<option value="all"${allMode ? " selected" : ""}>All</option>`;
    const left =
      `<label class="pager-size">Show
        <select id="pager-size" aria-label="Entries per page">${opts}</select>
        per page</label>` +
      (total ? `<span class="pager-count">${total} ${total === 1 ? "entry" : "entries"}</span>` : "");

    let nav = "";
    if (!allMode && pages > 1) {
      const btn = (p, label, o = {}) =>
        `<button type="button" class="pager-btn${o.active ? " active" : ""}" data-page="${p}"${o.disabled ? " disabled" : ""}${o.active ? ' aria-current="page"' : ""} aria-label="${o.aria || "Page " + label}">${label}</button>`;
      nav += btn(page - 1, "‹", { disabled: page <= 1, aria: "Previous page" });
      for (let p = 1; p <= pages; p++) nav += btn(p, String(p), { active: p === page });
      nav += btn(page + 1, "›", { disabled: page >= pages, aria: "Next page" });
    }
    pager.innerHTML = `<div class="pager-left">${left}</div><div class="pager-nav">${nav}</div>`;

    const sizeSel = pager.querySelector("#pager-size");
    if (sizeSel) sizeSel.addEventListener("change", () => {
      pageSize = sizeSel.value === "all" ? "all" : parseInt(sizeSel.value, 10);
      page = 1; draw();
    });
    pager.querySelectorAll(".pager-btn[data-page]").forEach((b) => {
      if (b.disabled) return;
      b.addEventListener("click", () => {
        const p = parseInt(b.dataset.page, 10);
        if (!isNaN(p) && p !== page) {
          page = p; draw();
          document.querySelector(".garden-controls")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  const filters = document.getElementById("garden-filters");
  if (filters) {
    filters.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button[data-type]");
      if (!btn) return;
      activeType = btn.dataset.type;
      page = 1;
      filters.querySelectorAll("button").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      draw();
    });
  }

  const search = document.getElementById("garden-search");
  if (search) {
    search.addEventListener("input", () => {
      query = search.value.trim().toLowerCase();
      page = 1;
      draw();
    });
  }

  // Explorer rail (entries grouped by type)
  const explorer = document.getElementById("garden-explorer-list");
  if (explorer) {
    const ORDER = TYPE_ORDER;
    const byType = {};
    sorted.forEach((e) => (byType[e.type] = byType[e.type] || []).push(e));
    explorer.innerHTML = ORDER.filter((t) => byType[t])
      .map((t) => {
        const items = byType[t]
          .map((e) => `<li><a class="exp-link" href="${gardenEntryHref(e)}">${e.title}</a></li>`)
          .join("");
        const label = (TYPE_LABEL[t] || t) + "s";
        return `<details class="exp-group" open>
            <summary>${label}<span class="exp-count">${byType[t].length}</span></summary>
            <ul>${items}</ul>
          </details>`;
      })
      .join("");
  }

  // Explorer rail collapse toggle (persisted in localStorage)
  const layout = document.getElementById("garden-layout");
  const railBtn = document.getElementById("explorer-toggle");
  if (layout && railBtn) {
    const applyRail = (isCollapsed) => {
      layout.classList.toggle("collapsed", isCollapsed);
      railBtn.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
    };
    applyRail(localStorage.getItem("garden-explorer") === "collapsed");
    railBtn.addEventListener("click", () => {
      const nowCollapsed = !layout.classList.contains("collapsed");
      applyRail(nowCollapsed);
      localStorage.setItem("garden-explorer", nowCollapsed ? "collapsed" : "open");
    });
  }

  draw();
}

// Wires prev/next + dots for the featured slider and keeps the active dot synced.
function initFeaturedSlider(track) {
  const prev = document.getElementById("slider-prev");
  const next = document.getElementById("slider-next");
  const dotsWrap = document.getElementById("slider-dots");
  const cards = Array.from(track.children);
  if (!cards.length) return;

  // One dot per *scroll position* (page), not per card, so the dots always map
  // to somewhere you can actually scroll to.
  const step = () =>
    cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth;
  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
  const pageCount = () => Math.max(1, Math.round(maxScroll() / step()) + 1);

  let cur = 0;
  let dots = [];

  function buildDots() {
    if (!dotsWrap) return;
    dots = [];
    dotsWrap.innerHTML = Array.from({ length: pageCount() }, (_, i) =>
      `<button type="button" aria-label="Go to featured page ${i + 1}"></button>`).join("");
    dots = Array.from(dotsWrap.children);
    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
  }
  function syncDots() { dots.forEach((d, di) => d.classList.toggle("active", di === cur)); }

  // Wrap around so the slider loops forever (next past the end returns to start).
  function go(i) {
    const n = pageCount();
    cur = ((i % n) + n) % n;
    track.scrollTo({ left: Math.min(cur * step(), maxScroll()), behavior: "smooth" });
    syncDots();
  }

  if (prev) prev.addEventListener("click", () => go(cur - 1));
  if (next) next.addEventListener("click", () => go(cur + 1));
  track.addEventListener("scroll", () => window.requestAnimationFrame(() => {
    cur = Math.min(pageCount() - 1, Math.max(0, Math.round(track.scrollLeft / step())));
    syncDots();
  }), { passive: true });
  window.addEventListener("resize", () => { buildDots(); cur = Math.min(cur, pageCount() - 1); syncDots(); });

  buildDots();
  syncDots();
}

// Resolve a link's href to a GARDEN entry (for hover previews).
function entryFromHref(href) {
  try {
    const u = new URL(href, location.href);
    const slug = u.searchParams.get("slug");
    if (slug) return gardenFindBySlug(slug);
    const path = u.pathname.replace(/^\//, "");
    return GARDEN.find(
      (e) =>
        (e.page && path.endsWith(e.page.replace(/^\//, ""))) ||
        (e.url && path.endsWith(e.url.replace(/^\//, "")))
    );
  } catch (e) {
    return null;
  }
}

// Hover/focus previews for internal links (wiki-links and ?slug= links).
function initGardenHovercards() {
  if (typeof GARDEN === "undefined") return;
  // Inline links only: the big cards already show their own preview, so we
  // exclude .garden-card to avoid a redundant popup firing on hover.
  const SEL = 'a.wiki-link:not(.garden-card), a.exp-link, a[href*="garden-entry.html?slug="]:not(.garden-card)';
  let card = null, hideTimer = null, current = null;

  function ensureCard() {
    if (card) return card;
    card = document.createElement("div");
    card.className = "garden-hovercard";
    card.hidden = true;
    card.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    card.addEventListener("mouseleave", scheduleHide);
    document.body.appendChild(card);
    return card;
  }
  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { if (card) card.hidden = true; current = null; }, 180);
  }
  function show(link, e) {
    clearTimeout(hideTimer);
    if (current === e && card && !card.hidden) return;
    current = e;
    const c = ensureCard();
    const mat = MATURITY[e.maturity];
    const meta = (e.label || TYPE_LABEL[e.type] || e.type) + (mat ? " · " + mat.icon + " " + mat.label : "");
    c.innerHTML =
      (e.image ? `<img class="hc-img" src="${e.image}" alt="" />` : "") +
      `<div class="hc-body"><div class="hc-meta">${meta}</div>` +
      `<div class="hc-title">${e.title}</div>` +
      `<div class="hc-excerpt">${e.excerpt || ""}</div></div>`;
    c.hidden = false;
    const r = link.getBoundingClientRect();
    const cw = c.offsetWidth, ch = c.offsetHeight;
    let top = window.scrollY + r.bottom + 8;
    if (r.bottom + ch + 12 > window.innerHeight) top = window.scrollY + r.top - ch - 8;
    let left = Math.min(window.scrollX + r.left, window.scrollX + window.innerWidth - cw - 12);
    if (left < window.scrollX + 8) left = window.scrollX + 8;
    c.style.top = top + "px";
    c.style.left = left + "px";
  }
  function onEnter(ev) {
    const link = ev.target.closest(SEL);
    if (!link) return;
    const e = entryFromHref(link.getAttribute("href"));
    if (e) show(link, e);
  }
  document.addEventListener("mouseover", onEnter);
  document.addEventListener("focusin", onEnter);
  document.addEventListener("mouseout", (ev) => { if (ev.target.closest(SEL)) scheduleHide(); });
  document.addEventListener("focusout", (ev) => { if (ev.target.closest(SEL)) scheduleHide(); });
}

document.addEventListener("DOMContentLoaded", () => {
  initGardenIndex();
  initGardenHovercards();
});

/*
   Minimal Markdown parser (reused by garden-entry.js for `md` entries).
   Covers headings, bold, italic, inline code, code blocks, blockquotes,
   lists, links, and Obsidian-style [[wiki-links]]. Kept tiny on purpose.
   Note: it escapes raw HTML, so Markdown files are display-only (safe).
   */
function parseMarkdown(src) {
  let out = src;
  // Obsidian/Quartz compatibility: drop YAML frontmatter, a leftover eyebrow
  // <p> line, and the first H1 (the viewer already shows the title + maturity).
  out = out.replace(/^﻿?---\r?\n[\s\S]*?\r?\n---[ \t]*\r?\n?/, "");
  out = out.replace(/^\s*<p[^>]*>[\s\S]*?<\/p>[ \t]*\r?\n?/, "");
  out = out.replace(/^\s*#\s+.*\r?\n?/, "");
  out = out.replace(/^\s+/, ""); // drop any leftover leading blank lines
  out = out.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  out = out.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
  out = out.replace(/^###### (.+)$/gm, "<h6>$1</h6>");
  out = out.replace(/^##### (.+)$/gm, "<h5>$1</h5>");
  out = out.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  out = out.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  out = out.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  out = out.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  out = out.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");
  out = out.replace(/^(?:---|\*\*\*|___)[ \t]*$/gm, "<hr>");
  out = out.replace(/(?:^- .+(?:\n|$))+/gm, (block) => {
    const items = block.trim().split("\n").map((l) => `<li>${l.replace(/^- /, "")}</li>`).join("");
    return `<ul>${items}</ul>`;
  });
  out = out.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, slug, label) => {
    const clean = slug.trim().toLowerCase().replace(/\s+/g, "-");
    return `<a class="wiki-link" href="garden-entry.html?slug=${clean}">${label || slug}</a>`;
  });
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => {
    // A bare slug like [VPN](vpn-explained) links to an internal garden entry
    // (and gets a hover preview); anything with a scheme/slash/dot is external.
    if (/^[a-z0-9][a-z0-9-]*$/i.test(url)) {
      return `<a class="wiki-link" href="garden-entry.html?slug=${url}">${text}</a>`;
    }
    const ext = /^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${url}"${ext}>${text}</a>`;
  });
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.split(/\n{2,}/).map((chunk) => {
    if (/^\s*<(h[1-6]|ul|ol|pre|blockquote|hr)/.test(chunk)) return chunk;
    // Blank lines = new paragraphs; single newlines = hard line breaks
    // (matches Obsidian's default reading view, important for song lyrics).
    return `<p>${chunk.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
  return out;
}
