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
    slug: "avar-compendium",
    type: "tool",
    title: "Avar Intelligence Compendium",
    date: "2025-12-01",
    maturity: "growing",
    featured: true,
    tags: ["javascript", "d&d", "data-viz"],
    excerpt: "A web-based investigation map + encounter manager I built for a D&D 5e mystery campaign.",
    url: "Avar/avar.html",
  },
  {
    slug: "browser-fingerprinting",
    type: "post",
    title: "What your browser silently sees",
    date: "2026-06-20",
    maturity: "growing",
    featured: true,
    tags: ["privacy", "security", "tool"],
    excerpt: "An interactive look at everything a website can read from your browser (computed locally) plus how to push back.",
    page: "garden/posts/browser-fingerprinting.html",
    tool: true,
  },
  {
    slug: "interacting-with-the-internet",
    type: "post",
    title: "Interacting with the Internet",
    date: "2026-06-20",
    maturity: "growing",
    featured: true,
    tags: ["privacy", "security", "web"],
    excerpt: "A fifteen-minute orientation to how the web works and why it matters for your privacy.",
    page: "garden/posts/internet-interaction.html",
  },
  {
    slug: "evaluating-sources",
    type: "post",
    title: "Evaluating Online Sources",
    date: "2026-06-20",
    maturity: "growing",
    featured: true,
    tags: ["privacy", "security", "web"],
    excerpt: "Privacy and security information comes from sources with very different incentives. Here is how to tell them apart.",
    page: "garden/posts/source-evaluation.html",
  },
  {
    slug: "threat-modeling",
    type: "post",
    title: "Security Basics: Threat Modeling for Ordinary People",
    date: "2026-06-20",
    maturity: "growing",
    featured: true,
    tags: ["privacy", "security", "web"],
    excerpt: "Most security advice is written for an abstract worst-case. Threat modeling is about figuring out which risks actually apply to you.",
    page: "garden/posts/threat-modeling.html",
  },
  {
    slug: "privacy-basics",
    type: "post",
    title: "Privacy Basics: Understanding Your Digital Footprint",
    date: "2026-06-20",
    maturity: "growing",
    featured: true,
    tags: ["privacy", "security", "web"],
    excerpt: "What cookies, tracking pixels, and browser fingerprinting actually are, how they work mechanically, and what blocking them does and does not achieve.",
    page: "garden/posts/privacy-basics.html",
  },
  {
  slug: "vpn-explained",
  type: "note",
  title: "VPNs and how they work (and don't)",
  date: "2026-06-20",
  maturity: "seedling",
  tags: ["vpn", "network", "term"],
  excerpt: "Routes your traffic through one provider, hiding it from your ISP but handing all of it to the provider instead.",
  md: "garden/notes/vpn-explained.md",
},
{
  slug: "tor-explained",
  type: "note",
  title: "Tor: what it is, how it works",
  date: "2026-05-01",
  maturity: "evergreen",
  tags: ["tor", "privacy", "network"],
  excerpt: "What makes Tor different from a VPN, and how it works to protect your privacy.",
  md: "garden/notes/tor-explained.md",
},
{
  slug: "dns-explained",
  type: "note",
  title: "DNS: what it is, what it exposes",
  date: "2026-05-01",
  maturity: "evergreen",
  tags: ["dns", "privacy", "network"],
  excerpt: "Every domain you visit produces a DNS query your ISP can read by default.",
  md: "garden/notes/dns-explained.md",
},
{
  slug: "isp-layer",
  type: "note",
  title: "The ISP Layer: What Your Internet Provider Can See",
  date: "2026-05-01",
  maturity: "growing",
  tags: ["isp", "privacy", "network"],
  excerpt: "How much of your traffic your ISP can see, and what they can do with it.",
  md: "garden/notes/isp-layer.md",
},
{
  slug: "os-layer",
  type: "note",
  title: "The OS Layer: What Your Operating System Sees",
  date: "2026-05-01",
  maturity: "growing",
  tags: ["os", "privacy", "network"],
  excerpt: "What the OS handles for you, and what can be exposed.",
  md: "garden/notes/os-layer.md",
},
{ 
  slug: "hardware-basics", 
  type: "note", 
  title: "Hardware basics", 
  date: "2026-06-20", 
  maturity: "seedling", 
  tags: ["hardware", "gpu", "term"], 
  excerpt: "CPU, RAM, GPU, storage, firmware, etc.", 
  md: "garden/notes/hardware-basics.md" 
},
  {
    slug: "butterfly-effect-an-original-song",
    type: "song",
    title: "Butterfly Effect",
    date: "2022-02-18",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote and recorded.",
    // Replace VIDEO_ID with the id from a YouTube URL (the part after v=).
    youtube: "K2Ytiv_ECvE",
    // body: "<p></p>",
    md: "garden/songs/butterfly-effect.md",
  },
  {
    slug: "linguistic-effect-of-llms",
    type: "note",
    title: "Notes: how LLMs are shifting human language",
    date: "2025-09-15",
    maturity: "seedling",
    tags: ["llms", "linguistics", "research"],
    excerpt: "Working notes from the reading behind my systematic review. Rough and evolving.",
    md: "garden/notes/linguistic-effect-of-llms.md",
  },
  {
    slug: "building-the-terminal",
    type: "post",
    title: "Building the whoami terminal on my homepage",
    date: "2025-11-20",
    maturity: "evergreen",
    featured: true,
    tags: ["webdev", "design", "accessibility"],
    excerpt: "Why I added a little terminal to my homepage, and how I kept the typing animation accessible.",
    page: "garden/posts/terminal-typewriter.html",
    tool: true,
  },
  {
    slug: "pcbp-an-original-song",
    type: "song",
    title: "Peasants Can't Be Princes",
    date: "2022-02-16",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote and recorded.",
    // Replace VIDEO_ID with the id from a YouTube URL (the part after v=).
    youtube: "uxeTWrqlQfQ",
    md: "garden/songs/peasants-cant-be-princes.md",
  },
  {
    slug: "bbb-an-original-song",
    type: "song",
    title: "Beautiful Blanket of Blue",
    date: "2022-01-03",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote.",
    md: "garden/songs/beautiful-blanket-of-blue.md",
  },
  {
    slug: "wlil-an-original-song",
    type: "song",
    title: "What Love Is Like",
    date: "2023-07-20",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote.",
    md: "garden/songs/what-love-is-like.md",
  },
  {
    slug: "insomnia-an-original-song",
    type: "song",
    title: "Insomnia",
    date: "2022-04-15",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote.",
    md: "garden/songs/insomnia.md",
  },
  {
    slug: "rise-an-original-song",
    type: "song",
    title: "Rise",
    date: "2022-03-10",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote for the 2021 TEDx Music Competition. Themed around the phrase 'up from the ashes'.",
    body: "<p>Hello! I'm Hrishika Roychoudhury and I will be performing my original composition called Rise, for the phrase *Up From The Ashes* reminds me of the mythological creature from many stories that have been told for generations: the Phoenix, often depicted as a majestic bird that can die in a show of flames before being reborn from the decomposition of its own ashes. People often find themselves stuck, depressed, unable to reach their goals. This song is a reminder that tough times do occur and it may seem nearly impossible to get out of the 'abyss', but a rise cannot exist without a fall and even a phoenix cannot be reborn from the ashes without first dying. So never give up, because it's only a matter of time until you rise 'up from the ashes.'</p>",
    md: "garden/songs/rise.md",
  },
  {
    slug: "harami-an-original-song",
    type: "song",
    title: "Harami",
    date: "2018-04-20",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote for my 9th grade English final project submission on A Thousand Splendid Suns by Khaled Hosseini.",
    youtube: "nll0UUAyE_k",
    md: "garden/songs/harami.md",
  },
  {
    slug: "alone-an-original-song",
    type: "song",
    title: "Alone",
    date: "2018-04-20",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote for my 8th grade English final project submission on Romeo and Juliet.",
    md: "garden/songs/alone.md",
  },
  {
    slug: "col-an-original-song",
    type: "song",
    title: "City of Lies",
    date: "2017-06-03",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote.",
    md: "garden/songs/city-of-lies.md",
  },
  {
    slug: "closer-an-original-song",
    type: "song",
    title: "Closer",
    date: "2022-04-02",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "A song I wrote and recorded.",
    // Replace VIDEO_ID with the id from a YouTube URL (the part after v=).
    youtube: "OdPnB6DJDNY",
    // body: "<p></p>",
    md: "garden/songs/closer.md",
  },
  {
    slug: "fairytale-an-original-song",
    type: "song",
    title: "Fairytale",
    date: "2016-02-04",
    maturity: "evergreen",
    featured: true,
    tags: ["songwriting", "music"],
    excerpt: "One of the first of my original songs that I performed on stage.",
    // Replace VIDEO_ID with the id from a YouTube URL (the part after v=).
    youtube: "RJ0IjUC2c0s",
    // body: "<p></p>",
    md: "garden/songs/fairytale.md",
  },
  {
  slug: "wcag-contrast-checker",
  type: "post",
  title: "What actually makes text readable? (a contrast checker)",
  date: "2026-02-10",
  maturity: "evergreen",
  featured: true,
  tags: ["accessibility", "design", "tool"],
  excerpt: "A question I kept hitting in my own design work--with a live WCAG contrast checker to answer it.",
  page: "garden/posts/wcag-contrast-checker.html",
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
  const imgHtml = e.image ? `<img class="card-img" src="${e.image}" alt="" loading="lazy" />` : "";
  const kitHtml = (e.tool || e.type === "tool") ? `<span class="card-kit">kit</span>` : "";
  return `
    <a class="garden-card type-${e.type}${isFeature ? " feature" : ""}${e.image ? " has-img" : ""}" href="${href}"${external ? ' target="_blank" rel="noopener"' : ""}${isFeature ? ' role="listitem"' : ""}>
      ${imgHtml}
      <div class="card-top">
        <span class="card-type">${TYPE_LABEL[e.type] || e.type}</span>
        ${kitHtml}
        ${matHtml}
      </div>
      <h3 class="card-title">${e.title}</h3>
      <p class="card-excerpt">${e.excerpt}</p>
      <span class="card-date">${gardenFormatDate(e.date)}</span>
    </a>`;
}

function initGardenIndex() {
  const grid = document.getElementById("garden-grid");
  if (!grid) return; // not on the index page

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
    grid.innerHTML = list.length
      ? list.map((e) => renderGardenCard(e, false)).join("")
      : `<p class="garden-empty">No entries here yet. Check back as the garden grows.</p>`;
  }

  const filters = document.getElementById("garden-filters");
  if (filters) {
    filters.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button[data-type]");
      if (!btn) return;
      activeType = btn.dataset.type;
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
      draw();
    });
  }

  // Explorer rail (entries grouped by type)
  const explorer = document.getElementById("garden-explorer-list");
  if (explorer) {
    const ORDER = ["tool", "song", "note", "post", "thought"];
    const byType = {};
    sorted.forEach((e) => (byType[e.type] = byType[e.type] || []).push(e));
    explorer.innerHTML = ORDER.filter((t) => byType[t])
      .map((t) => {
        const items = byType[t]
          .map((e) => `<li><a href="${gardenEntryHref(e)}">${e.title}</a></li>`)
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

  if (dotsWrap) {
    dotsWrap.innerHTML = cards
      .map((_, i) => `<button type="button" aria-label="Go to featured ${i + 1}"></button>`)
      .join("");
  }
  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

  const step = () =>
    cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth;
  const currentIndex = () => Math.round(track.scrollLeft / step());
  const go = (i) => {
    const idx = Math.max(0, Math.min(cards.length - 1, i));
    track.scrollTo({ left: idx * step(), behavior: "smooth" });
  };

  function syncUI() {
    const i = currentIndex();
    dots.forEach((d, di) => d.classList.toggle("active", di === i));
    if (prev) prev.disabled = i <= 0;
    if (next) next.disabled = i >= cards.length - 1;
  }

  if (prev) prev.addEventListener("click", () => go(currentIndex() - 1));
  if (next) next.addEventListener("click", () => go(currentIndex() + 1));
  dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
  track.addEventListener("scroll", () => window.requestAnimationFrame(syncUI), { passive: true });
  window.addEventListener("resize", syncUI);
  syncUI();
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
  const SEL = 'a.wiki-link, a[href*="garden-entry.html?slug="]';
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
    const meta = (TYPE_LABEL[e.type] || e.type) + (mat ? " · " + mat.icon + " " + mat.label : "");
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
    if (/^\s*<(h[1-6]|ul|ol|pre|blockquote)/.test(chunk)) return chunk;
    // Blank lines = new paragraphs; single newlines = hard line breaks
    // (matches Obsidian's default reading view, important for song lyrics).
    return `<p>${chunk.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
  return out;
}
