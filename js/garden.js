/* =========================================================
   garden.js
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
   ========================================================= */

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
    slug: "what-your-browser-knows",
    type: "post",
    title: "What your browser quietly reveals",
    date: "2026-06-20",
    maturity: "growing",
    featured: true,
    tags: ["privacy", "security", "tool"],
    excerpt: "An interactive look at everything a website can read from your browser (computed locally) plus how to push back.",
    page: "garden/posts/what-your-browser-knows.html",
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
    slug: "llm-language-shift-notes",
    type: "note",
    title: "Notes: how LLMs are shifting human language",
    date: "2025-09-15",
    maturity: "seedling",
    tags: ["llms", "linguistics", "research"],
    excerpt: "Working notes from the reading behind my systematic review. Rough and evolving.",
    md: "garden/notes/example-note.md",
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
  },
  {
    slug: "rabbit-hole-dancing-plague",
    type: "thought",
    title: "Rabbit hole: the 1518 dancing plague",
    date: "2026-01-02",
    maturity: "seedling",
    tags: ["rabbit-hole", "history"],
    excerpt: "Fell into an hour-long hole about people who danced themselves to exhaustion in Strasbourg.",
    body: "<p>Replace this with the actual thought. Inline HTML is fine — a couple of paragraphs, a link or two, whatever. Short, unpolished, fun.</p>",
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
    excerpt: "A song I wrote for my 9th grade english final project submission on A Thousand Splendid Suns by Khaled Hosseini.",
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
    excerpt: "A song I wrote for my 8th grade english final project submission on Romeo and Juliet.",
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
    ? `<span class="maturity" title="${mat.label}" aria-label="maturity: ${mat.label}">${mat.icon}</span>`
    : "";
  return `
    <a class="garden-card${isFeature ? " feature" : ""}" href="${href}"${external ? ' target="_blank" rel="noopener"' : ""}${isFeature ? ' role="listitem"' : ""}>
      <div class="card-top">
        <span class="card-type">${TYPE_LABEL[e.type] || e.type}</span>
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
    if (activeType !== "all" && e.type !== activeType) return false;
    if (!query) return true;
    const hay = (e.title + " " + e.excerpt + " " + (e.tags || []).join(" ")).toLowerCase();
    return hay.includes(query);
  }
  function draw() {
    const list = sorted.filter(matches);
    grid.innerHTML = list.length
      ? list.map((e) => renderGardenCard(e, false)).join("")
      : `<p class="garden-empty">No entries here yet — check back as the garden grows.</p>`;
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

document.addEventListener("DOMContentLoaded", initGardenIndex);

/* =========================================================
   Minimal Markdown parser (reused by garden-entry.js for `md` entries).
   Covers headings, bold, italic, inline code, code blocks, blockquotes,
   lists, links, and Obsidian-style [[wiki-links]]. Kept tiny on purpose.
   Note: it escapes raw HTML, so Markdown files are display-only (safe).
   ========================================================= */
function parseMarkdown(src) {
  let out = src;
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
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.split(/\n{2,}/).map((chunk) => {
    if (/^\s*<(h[1-6]|ul|ol|pre|blockquote)/.test(chunk)) return chunk;
    return `<p>${chunk.replace(/\n/g, " ")}</p>`;
  }).join("\n");
  return out;
}
