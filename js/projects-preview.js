/* projects-preview.js  —  scratch preview: 3 layout variants + filters + hover link previews.
   Reads window.PROJECTS and window.EXPERIENCES from projects-data.js. Not used by the live site. */
(function () {
  const P = window.PROJECTS || [];
  const XP = window.EXPERIENCES || [];

  const state = { view: "timeline", filter: "All" };

  // ----- link kind metadata (icon glyph + human note) -----
  const KIND = {
    code:        { g: "&lt;/&gt;", note: "GitHub repository" },
    live:        { g: "▶",  note: "Live site" },
    writeup:     { g: "✎",  note: "Project write-up" },
    paper:       { g: "▤",  note: "PDF, full deliverable" },
    poster:      { g: "▦",  note: "Research poster (PDF)" },
    media:       { g: "↗",  note: "External link" },
    competition: { g: "★",  note: "Competition / award" },
    signup:      { g: "✎",  note: "Sign-up form" },
  };
  function dest(url) {
    if (/^https?:/i.test(url)) { try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return url; } }
    return "hris28.github.io";
  }
  function thumbOf(p) {
    if (!p) return "";
    if (p.image) return p.image;
    if (Array.isArray(p.images) && p.images[0]) return p.images[0].src;
    return "";
  }

  // ----- shared card atoms -----
  const esc = (s) => (s || "");
  function metaRow(p) {
    return `<div class="p-meta">
      <span class="p-type">${p.type}</span>
      <span class="p-date">${p.date}</span>
      ${p.tag === "NOW" ? `<span class="p-now">NOW</span>` : ""}
    </div>`;
  }
  function tagsRow(tags) {
    if (!tags || !tags.length) return "";
    return `<div class="p-tags">${tags.map((t) => `<span class="p-tag">${t}</span>`).join("")}</div>`;
  }
  function linksRow(links, p) {
    if (!links || !links.length) return "";
    const img = thumbOf(p);
    return `<div class="p-links">${links.map((l) => {
      const k = KIND[l.kind] || KIND.media;
      return `<a class="p-link" href="${l.url}" target="_blank" rel="noopener"
        data-pv data-label="${esc(l.label)}" data-note="${k.note}" data-dest="${dest(l.url)}"
        data-img="${img}" data-glyph="${k.g}"><span class="ic">${k.g}</span>${esc(l.label)}</a>`;
    }).join("")}</div>`;
  }
  function detailToggle(id) {
    return `<button class="p-more" data-toggle="${id}">Details +</button>`;
  }

  // A single project card; variant tweaks structure.
  function card(p, i, variant) {
    const id = "d" + i;
    const q = p.question ? `<p class="p-q">${p.question}</p>` : "";
    const pi = p.pi ? `<p class="p-pi">${p.pi}</p>` : "";
    const honor = p.honor ? `<p class="p-honor">${p.honor}</p>` : "";
    const desc = `<p class="p-desc" id="${id}" style="display:none">${p.description}${honor ? honor : ""}</p>`;
    const img = thumbOf(p);
    const thumb = img ? `<img class="p-thumb" src="${img}" alt="" loading="lazy" />` : "";

    const core = `
      ${metaRow(p)}
      <h3 class="p-title">${p.title}</h3>
      ${q}
      ${pi}
      <p class="p-blurb">${p.blurb || ""}</p>
      ${desc}
      ${tagsRow(p.tags)}
      ${detailToggle(id)}
      ${linksRow(p.links, p)}`;

    if (variant === "timeline") {
      return `<article class="card${img ? " has-thumb" : ""}"><div>${core}</div>${thumb}</article>`;
    }
    if (variant === "grid") {
      return `<article class="card">${thumb}${core}</article>`;
    }
    // list
    return `<article class="card">
      <div class="col-meta">${metaRow(p)}</div>
      <div class="col-mid"><h3 class="p-title">${p.title}</h3>${q}<p class="p-blurb">${p.blurb || ""}</p>${desc}${tagsRow(p.tags)}${detailToggle(id)}</div>
      <div class="col-links">${linksRow(p.links, p)}</div>
    </article>`;
  }

  // ----- filtering -----
  function categories() {
    const set = [];
    P.forEach((p) => { if (p.category && !set.includes(p.category)) set.push(p.category); });
    return ["All", ...set];
  }
  function filtered() {
    return state.filter === "All" ? P.slice() : P.filter((p) => p.category === state.filter);
  }

  // ----- renderers -----
  function renderFilters() {
    const f = document.getElementById("filters");
    f.innerHTML = categories().map((c) =>
      `<button data-cat="${c}" class="${c === state.filter ? "active" : ""}">${c}</button>`).join("");
  }
  function renderView() {
    const view = document.getElementById("view");
    view.className = state.view;
    const items = filtered();
    document.getElementById("count").textContent =
      `${items.length} project${items.length === 1 ? "" : "s"}`;

    if (state.view === "timeline") {
      const byYear = {};
      items.forEach((p) => { (byYear[p.year] = byYear[p.year] || []).push(p); });
      const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);
      view.innerHTML = years.map((y) => {
        const now = byYear[y].some((p) => p.tag === "NOW");
        return `<h2 class="yr">${y}${now ? ` <span class="p-now">NOW</span>` : ""}</h2>
          <div class="tl">${byYear[y].map((p) => card(p, P.indexOf(p), "timeline")).join("")}</div>`;
      }).join("");
    } else {
      const v = state.view;
      view.innerHTML = items
        .sort((a, b) => b.year - a.year)
        .map((p) => card(p, P.indexOf(p), v)).join("");
    }
  }
  function renderXP() {
    const root = document.getElementById("xp");
    root.innerHTML = XP.map((x) => {
      const nested = (x.projects && x.projects.length) ? `<div class="xp-nested">${x.projects.map((pr) => `
        <div class="xp-proj">
          <h4>${pr.title}</h4>
          <p>${pr.description}</p>
          ${tagsRow(pr.tags)}
          ${linksRow(pr.links, { image: "" })}
        </div>`).join("")}</div>` : "";
      return `<article class="xp-card">
        <div class="p-meta"><span class="p-type">${x.category || "EXPERIENCE"}</span><span class="p-date">${x.date}</span></div>
        <h3 class="xp-role">${x.role}</h3>
        <div class="xp-sub"><span class="xp-org">${x.org}</span></div>
        <p class="xp-summary">${x.summary}</p>
        ${x.honor ? `<p class="p-honor">${x.honor}</p>` : ""}
        ${tagsRow(x.tags)}
        ${linksRow(x.links, { image: "" })}
        ${nested}
      </article>`;
    }).join("");
  }

  // ----- hover link preview -----
  const pv = document.getElementById("linkpv");
  const pvMedia = document.getElementById("pv-media");
  const pvLabel = document.getElementById("pv-label");
  const pvNote = document.getElementById("pv-note");
  const pvDest = document.getElementById("pv-dest");
  let pvTimer;
  function showPV(a) {
    const img = a.getAttribute("data-img");
    if (img) { pvMedia.outerHTML = `<img class="pv-img" id="pv-media" src="${img}" alt="" />`; }
    else { document.getElementById("pv-media").outerHTML = `<div class="pv-ph" id="pv-media">${a.getAttribute("data-glyph") || "◆"}</div>`; }
    pvLabel.textContent = a.getAttribute("data-label");
    pvNote.textContent = a.getAttribute("data-note");
    pvDest.textContent = a.getAttribute("data-dest");
    const r = a.getBoundingClientRect();
    const w = 260, gap = 10;
    let left = r.left; if (left + w > window.innerWidth - 8) left = window.innerWidth - w - 8;
    let top = r.bottom + gap;
    pv.style.left = Math.max(8, left) + "px";
    pv.style.top = top + "px";
    // flip above if near bottom
    if (top + 210 > window.innerHeight) pv.style.top = (r.top - 210) + "px";
    pv.classList.add("on"); pv.setAttribute("aria-hidden", "false");
  }
  function hidePV() { pv.classList.remove("on"); pv.setAttribute("aria-hidden", "true"); }

  function wire() {
    document.getElementById("seg").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-view]"); if (!b) return;
      state.view = b.dataset.view;
      document.querySelectorAll("#seg button").forEach((x) => x.classList.toggle("active", x === b));
      renderView();
    });
    document.getElementById("filters").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-cat]"); if (!b) return;
      state.filter = b.dataset.cat; renderFilters(); renderView();
    });
    document.body.addEventListener("click", (e) => {
      const t = e.target.closest("[data-toggle]"); if (!t) return;
      const el = document.getElementById(t.dataset.toggle);
      if (!el) return;
      const open = el.style.display !== "none";
      el.style.display = open ? "none" : "block";
      t.textContent = open ? "Details +" : "Details −";
    });
    // hover preview via delegation
    document.body.addEventListener("mouseover", (e) => {
      const a = e.target.closest("a.p-link[data-pv]"); if (!a) return;
      clearTimeout(pvTimer); pvTimer = setTimeout(() => showPV(a), 120);
    });
    document.body.addEventListener("mouseout", (e) => {
      const a = e.target.closest("a.p-link[data-pv]"); if (!a) return;
      clearTimeout(pvTimer); pvTimer = setTimeout(hidePV, 100);
    });
    document.body.addEventListener("focusin", (e) => {
      const a = e.target.closest("a.p-link[data-pv]"); if (a) showPV(a);
    });
    document.body.addEventListener("focusout", hidePV);
    window.addEventListener("scroll", hidePV, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderFilters(); renderView(); renderXP(); wire();
  });
})();
