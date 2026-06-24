/* =========================================================
   garden-graph.js
   Quartz-style connections, rebuilt dependency-free. A live force
   simulation (charge / link / center / collision) rendered on a 2D
   canvas, with pan, cursor-anchored zoom, node dragging, hover focus,
   labels that fade in as you zoom, and an expand-to-fullscreen modal.

   Used on the garden index (#garden-graph) and on an entry page (a local
   graph + backlinks inside #garden-connections). Edges come from each
   entry's links: [[wiki-links]], [text](slug) bare-slug links, and an
   optional links:[] field. Requires garden.js (GARDEN, helpers). Builds
   by fetching each note's markdown once, so it needs http, not file://.
   ========================================================= */

const TYPE_COLOR = {
  tool: "#3fae7a", song: "#c98bdc", note: "#6b9acb",
  post: "#e0a458", thought: "#8bb0c9", default: "#9aa3ad",
};

function graphColors() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    line: dark ? "rgba(230,216,184,0.16)" : "rgba(31,58,92,0.16)",
    lineHi: dark ? "rgba(143,176,220,0.85)" : "rgba(47,108,171,0.85)",
    label: dark ? "#cfc4ac" : "#1d2e40",
    ring: dark ? "#e6d8b8" : "#1f3a5c",
  };
}

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- edge graph -------------------------------------------------------
// Build the undirected edge list + directed map from all entries' links.
async function buildLinkGraph() {
  const slugSet = new Set(GARDEN.map((e) => e.slug));
  const edgeKeys = new Set();
  const dir = {}; // dir[a] = Set of slugs a links to

  function addEdge(a, b) {
    if (!a || !b || a === b || !slugSet.has(a) || !slugSet.has(b)) return;
    (dir[a] = dir[a] || new Set()).add(b);
    edgeKeys.add([a, b].sort().join(" "));
  }
  function extract(text, from) {
    if (!text) return;
    let m;
    const re1 = /\[\[([^\]|#]+)/g;
    while ((m = re1.exec(text))) addEdge(from, m[1].trim().toLowerCase().replace(/\s+/g, "-"));
    const re2 = /\]\(([a-z0-9][a-z0-9-]*)\)/gi;
    while ((m = re2.exec(text))) addEdge(from, m[1].toLowerCase());
  }

  await Promise.all(
    GARDEN.map(async (e) => {
      if (Array.isArray(e.links)) e.links.forEach((s) => addEdge(e.slug, String(s).toLowerCase()));
      if (e.body) extract(e.body, e.slug);
      if (e.md) {
        try { const r = await fetch(e.md); if (r.ok) extract(await r.text(), e.slug); } catch (_) {}
      }
    })
  );

  const edges = [...edgeKeys].map((k) => { const [a, b] = k.split(" "); return { a, b }; });
  function neighbors(slug) {
    const out = dir[slug] ? [...dir[slug]] : [];
    const inc = Object.keys(dir).filter((k) => dir[k].has(slug));
    return [...new Set([...out, ...inc])];
  }
  function backlinks(slug) { return Object.keys(dir).filter((k) => dir[k].has(slug)); }
  return { edges, dir, neighbors, backlinks };
}

// ---- the live graph ---------------------------------------------------
// createGraph(canvas, nodes, edges, opts) -> { destroy }
// nodes: [{ id, title, type, href }]   edges: [{ a, b }]
function createGraph(canvas, nodes, edges, opts = {}) {
  const focusSlug = opts.focusSlug || null;
  const ctx = canvas.getContext("2d");
  let C = graphColors();
  let dpr = 1, w = 0, h = 0;

  // degree + radius
  const degree = {};
  nodes.forEach((n) => (degree[n.id] = 0));
  edges.forEach((e) => { if (degree[e.a] != null) degree[e.a]++; if (degree[e.b] != null) degree[e.b]++; });
  const radiusOf = (n) => 4 + Math.sqrt(degree[n.id] || 0) * 2.2;

  // simulation state (world coords centered on 0,0)
  const N = nodes.length;
  nodes.forEach((n, i) => {
    const a = (i / N) * Math.PI * 2;
    n.x = Math.cos(a) * 60 + (Math.random() - 0.5) * 30;
    n.y = Math.sin(a) * 60 + (Math.random() - 0.5) * 30;
    n.vx = 0; n.vy = 0; n.fx = null; n.fy = null;
  });
  const byId = {}; nodes.forEach((n) => (byId[n.id] = n));

  // physics constants (world units; auto-fit handles final framing)
  const REPEL = 320, LINK_DIST = 64, LINK_K = 0.5, CENTER_K = 0.045, V_DECAY = 0.6;
  const ALPHA_MIN = 0.002, ALPHA_DECAY = 0.0228;
  let alpha = 1;

  function tick() {
    // charge: pairwise repulsion
    for (let i = 0; i < N; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < N; j++) {
        const b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y, l = dx * dx + dy * dy;
        if (l < 1) { dx = (Math.random() - 0.5); dy = (Math.random() - 0.5); l = dx * dx + dy * dy + 1; }
        const k = (REPEL * alpha) / l;
        a.vx += dx * k; a.vy += dy * k; b.vx -= dx * k; b.vy -= dy * k;
      }
    }
    // links: spring toward rest length
    edges.forEach((e) => {
      const a = byId[e.a], b = byId[e.b]; if (!a || !b) return;
      let dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 0.01;
      const diff = ((l - LINK_DIST) / l) * LINK_K * alpha;
      const hx = dx * diff * 0.5, hy = dy * diff * 0.5;
      a.vx += hx; a.vy += hy; b.vx -= hx; b.vy -= hy;
    });
    // centering + integrate
    nodes.forEach((n) => {
      n.vx += -n.x * CENTER_K * alpha; n.vy += -n.y * CENTER_K * alpha;
      if (n.fx != null) { n.x = n.fx; n.vx = 0; } else { n.x += n.vx; n.vx *= V_DECAY; }
      if (n.fy != null) { n.y = n.fy; n.vy = 0; } else { n.y += n.vy; n.vy *= V_DECAY; }
    });
    // collision: separate overlapping nodes
    for (let i = 0; i < N; i++) {
      const a = nodes[i], ra = radiusOf(a);
      for (let j = i + 1; j < N; j++) {
        const b = nodes[j], min = ra + radiusOf(b) + 2;
        let dx = b.x - a.x, dy = b.y - a.y, l = Math.hypot(dx, dy) || 0.01;
        if (l < min) {
          const push = (min - l) / l / 2;
          const px = dx * push, py = dy * push;
          if (a.fx == null) { a.x -= px; a.y -= py; }
          if (b.fx == null) { b.x += px; b.y += py; }
        }
      }
    }
    alpha += (0 - alpha) * ALPHA_DECAY;
  }

  // view transform: screen = (w/2 + panX + worldX*zoom, h/2 + panY + worldY*zoom)
  let zoom = 1, panX = 0, panY = 0;
  const sx = (n) => w / 2 + panX + n.x * zoom;
  const sy = (n) => h / 2 + panY + n.y * zoom;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth || 600; h = canvas.clientHeight || 360;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  }
  function fitView() {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodes.forEach((n) => { minX = Math.min(minX, n.x); maxX = Math.max(maxX, n.x); minY = Math.min(minY, n.y); maxY = Math.max(maxY, n.y); });
    const spanX = Math.max(maxX - minX, 1), spanY = Math.max(maxY - minY, 1);
    // Zoom in past a pure fit so the connected cluster reads clearly by default;
    // outlying nodes sit just off-frame and you can pan/zoom out to them.
    // DEFAULT ZOOM KNOB: raise DEFAULT_ZOOM for a tighter starting view, lower it
    // to see more of the graph at once (it is clamped to the 0.25–4 range below).
    const DEFAULT_ZOOM = 2.2;
    const fit = Math.min((w * 0.82) / spanX, (h * 0.82) / spanY);
    zoom = Math.max(0.25, Math.min(4, fit * DEFAULT_ZOOM));
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    panX = -cx * zoom; panY = -cy * zoom;
  }

  // interaction state
  let hoverId = null, neighbours = new Set();
  let dragNode = null, panning = false, moved = false, downX = 0, downY = 0, downT = 0;

  function setHover(id) {
    hoverId = id; neighbours = new Set();
    if (id) edges.forEach((e) => { if (e.a === id) neighbours.add(e.b); if (e.b === id) neighbours.add(e.a); });
  }
  const rel = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  function hitAt(px, py) {
    let best = null, bd = Infinity;
    for (const n of nodes) {
      const dx = px - sx(n), dy = py - sy(n), d = dx * dx + dy * dy;
      const r = radiusOf(n) * zoom + 6;
      if (d < r * r && d < bd) { bd = d; best = n; }
    }
    return best;
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const hov = hoverId;
    // edges (gentle highlight on the hovered node's links, no dimming)
    edges.forEach((e) => {
      const a = byId[e.a], b = byId[e.b]; if (!a || !b) return;
      const hot = hov && (e.a === hov || e.b === hov);
      ctx.strokeStyle = hot ? C.lineHi : C.line; ctx.lineWidth = hot ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(sx(a), sy(a)); ctx.lineTo(sx(b), sy(b)); ctx.stroke();
    });
    // nodes (all full opacity)
    nodes.forEach((n) => {
      const r = radiusOf(n) * zoom;
      ctx.beginPath(); ctx.arc(sx(n), sy(n), r, 0, Math.PI * 2);
      ctx.fillStyle = TYPE_COLOR[n.type] || TYPE_COLOR.default; ctx.fill();
      if (n.id === focusSlug) { ctx.lineWidth = 2; ctx.strokeStyle = C.ring; ctx.stroke(); }
    });
    // labels: keep it uncluttered. Small graphs show everything; large graphs
    // show hubs + the focused entry always, the rest fade in as you zoom or hover.
    const fewNodes = nodes.length <= 10;
    const zoomA = Math.max(0, Math.min(1, (zoom - 0.85) / 0.7));
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    ctx.font = "600 11px ui-sans-serif, system-ui, -apple-system, sans-serif";
    ctx.fillStyle = C.label;
    nodes.forEach((n) => {
      let a = fewNodes ? 1 : zoomA;
      if (!fewNodes && (degree[n.id] || 0) >= 3) a = Math.max(a, 0.92);
      if (hov && (n.id === hov || neighbours.has(n.id))) a = 1;
      if (n.id === focusSlug) a = 1;
      if (a <= 0.05) return;
      ctx.globalAlpha = a;
      const t = n.title.length > 24 ? n.title.slice(0, 23) + "…" : n.title;
      ctx.fillText(t, sx(n), sy(n) + radiusOf(n) * zoom + 4);
    });
    ctx.globalAlpha = 1;
  }

  // animation loop
  const reduced = prefersReducedMotion();
  let raf = 0, running = true;
  function frame() {
    if (!running) return;
    if (alpha > ALPHA_MIN || dragNode) tick();
    draw();
    raf = requestAnimationFrame(frame);
  }

  // pointer handlers
  function onDown(e) {
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    const p = rel(e); const n = hitAt(p.x, p.y);
    moved = false; downX = e.clientX; downY = e.clientY; downT = Date.now();
    if (n) { dragNode = n; n.fx = n.x; n.fy = n.y; alpha = Math.max(alpha, 0.3); }
    else panning = true;
  }
  function onMove(e) {
    if (dragNode) {
      const p = rel(e);
      dragNode.fx = (p.x - w / 2 - panX) / zoom;
      dragNode.fy = (p.y - h / 2 - panY) / zoom;
      moved = moved || Math.hypot(e.clientX - downX, e.clientY - downY) > 4;
      alpha = Math.max(alpha, 0.3);
    } else if (panning) {
      panX += e.clientX - downX; panY += e.clientY - downY;
      downX = e.clientX; downY = e.clientY; moved = true; draw();
    } else {
      const p = rel(e); const n = hitAt(p.x, p.y);
      const id = n ? n.id : null;
      canvas.style.cursor = n ? "pointer" : "grab";
      if (id !== hoverId) { setHover(id); if (reduced) draw(); }
    }
  }
  function onUp(e) {
    const quick = Date.now() - downT < 500;
    if (dragNode) {
      if (!moved && quick) { go(dragNode.href); return; }
      dragNode.fx = null; dragNode.fy = null; dragNode = null;
      alpha = Math.max(alpha, 0.1);
    } else if (panning && !moved && quick) {
      const p = rel(e); const n = hitAt(p.x, p.y); if (n) go(n.href);
    }
    panning = false;
  }
  function go(href) { try { location.href = href; } catch (_) {} }
  function onWheel(e) {
    e.preventDefault();
    const p = rel(e);
    const wx = (p.x - w / 2 - panX) / zoom, wy = (p.y - h / 2 - panY) / zoom;
    zoom *= e.deltaY < 0 ? 1.12 : 0.89;
    zoom = Math.max(0.25, Math.min(4, zoom));
    panX = p.x - w / 2 - wx * zoom; panY = p.y - h / 2 - wy * zoom;
    if (reduced) draw();
  }

  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", () => { dragNode = null; panning = false; });
  canvas.addEventListener("mouseleave", () => { if (hoverId) { setHover(null); if (reduced) draw(); } });
  canvas.addEventListener("wheel", onWheel, { passive: false });
  canvas.style.cursor = "grab";
  canvas.style.touchAction = "none";

  const ro = "ResizeObserver" in window ? new ResizeObserver(() => { resize(); fitView(); draw(); }) : null;
  const onTheme = () => { C = graphColors(); draw(); };
  document.addEventListener("themechange", onTheme);

  // warm up the layout so it opens already settled, then fit + run
  resize();
  for (let i = 0; i < 220; i++) tick();
  fitView();
  // Reduced motion: start fully settled so there is no autonomous movement.
  // The render loop still runs (tick is gated on alpha/drag), so hover and
  // user-initiated dragging stay responsive without the graph wiggling on its own.
  if (reduced) alpha = 0;
  raf = requestAnimationFrame(frame);
  if (ro) ro.observe(canvas);

  return {
    destroy() {
      running = false; cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      document.removeEventListener("themechange", onTheme);
    },
  };
}

function nodeFor(slug) {
  const e = gardenFindBySlug(slug);
  if (!e) return null;
  return { id: e.slug, title: e.title, type: e.type, href: gardenEntryHref(e) };
}

// Expand-to-fullscreen modal (Quartz's "global graph").
function openGraphModal(buildNodesEdges) {
  let overlay = document.querySelector(".global-graph-outer");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "global-graph-outer";
    overlay.innerHTML =
      `<div class="global-graph-container" role="dialog" aria-modal="true" aria-label="Garden graph">
         <button class="graph-close" aria-label="Close graph">&times;</button>
         <canvas></canvas>
       </div>`;
    document.body.appendChild(overlay);
  }
  const container = overlay.querySelector(".global-graph-container");
  const canvas = overlay.querySelector("canvas");
  let instance = null;
  function close() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    if (instance) { instance.destroy(); instance = null; }
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) { if (e.key === "Escape") close(); }
  overlay.onclick = (e) => { if (e.target === overlay) close(); };
  overlay.querySelector(".graph-close").onclick = close;
  document.addEventListener("keydown", onKey);

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  // build after layout so the canvas has real dimensions
  requestAnimationFrame(() => {
    const { nodes, edges, focusSlug } = buildNodesEdges();
    instance = createGraph(canvas, nodes, edges, { focusSlug });
  });
}

// Adds an expand icon to a graph wrapper that opens the fullscreen modal.
function addExpandButton(wrap, buildNodesEdges) {
  if (!wrap || wrap.querySelector(".graph-expand")) return;
  const btn = document.createElement("button");
  btn.className = "graph-expand";
  btn.type = "button";
  btn.setAttribute("aria-label", "Expand graph to fullscreen");
  btn.title = "Expand";
  btn.innerHTML =
    `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`;
  btn.addEventListener("click", () => openGraphModal(buildNodesEdges));
  wrap.appendChild(btn);
}

async function initGardenGraph() {
  const globalCanvas = document.getElementById("garden-graph");
  let connections = document.getElementById("garden-connections");
  // Standalone article pages (the HTML tool/project pages) have no graph
  // container of their own. If this page's URL maps to a garden entry, inject a
  // connections section at the end of the article so it gets the same map.
  if (!globalCanvas && !connections && typeof entryFromHref === "function") {
    const e = entryFromHref(location.href);
    const host = document.querySelector(".note-view") || document.querySelector(".wrap-narrow");
    if (e && host) {
      connections = document.createElement("div");
      connections.id = "garden-connections";
      connections.className = "garden-connections";
      connections.dataset.slug = e.slug;
      host.appendChild(connections);
    }
  }
  if (!globalCanvas && !connections) return;
  if (typeof GARDEN === "undefined") return;

  let graph;
  try { graph = await buildLinkGraph(); }
  catch (_) { return; }

  // Index: the full graph + an expand button
  if (globalCanvas) {
    const buildAll = () => ({
      nodes: GARDEN.map((e) => nodeFor(e.slug)).filter(Boolean),
      edges: graph.edges,
      focusSlug: null,
    });
    const wrap = globalCanvas.closest(".garden-graph-wrap");
    const start = () => { const d = buildAll(); createGraph(globalCanvas, d.nodes, d.edges, {}); };
    addExpandButton(wrap, buildAll);
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (en) => en.forEach((x) => { if (x.isIntersecting) { start(); obs.disconnect(); } }),
        { threshold: 0.1 }
      );
      obs.observe(globalCanvas);
    } else start();
  }

  // Entry page: backlinks + a local graph focused on this entry
  if (connections) {
    const slug = new URLSearchParams(location.search).get("slug") || connections.dataset.slug;
    if (!slug || !gardenFindBySlug(slug)) { connections.remove(); return; }
    const nbrs = graph.neighbors(slug);
    const back = graph.backlinks(slug);
    const outl = graph.dir[slug] ? [...graph.dir[slug]] : [];
    if (!nbrs.length) {
      // No links to other entries: show the whole garden map instead, with this
      // entry highlighted, so the page still offers a way to explore.
      connections.innerHTML =
        `<h2>Garden map</h2>
         <div class="localgraph-wrap"><canvas id="garden-localgraph" aria-label="Map of the whole garden"></canvas></div>`;
      const allCanvas = document.getElementById("garden-localgraph");
      const buildAll = () => ({
        nodes: GARDEN.map((e) => nodeFor(e.slug)).filter(Boolean),
        edges: graph.edges,
        focusSlug: slug,
      });
      addExpandButton(allCanvas.closest(".localgraph-wrap"), buildAll);
      const a = buildAll();
      createGraph(allCanvas, a.nodes, a.edges, { focusSlug: slug });
      return;
    }

    const list = (slugs) =>
      slugs.map((s) => { const e = gardenFindBySlug(s); return e ? `<li><a class="wiki-link" href="${gardenEntryHref(e)}">${e.title}</a></li>` : ""; }).join("");
    connections.innerHTML =
      `<h2>Connections</h2>
       <div class="localgraph-wrap"><canvas id="garden-localgraph" aria-label="Local graph of related entries"></canvas></div>
       <div class="conn-lists">
         ${outl.length ? `<div><h4>Links to</h4><ul>${list(outl)}</ul></div>` : ""}
         ${back.length ? `<div><h4>Linked from</h4><ul>${list(back)}</ul></div>` : ""}
       </div>`;

    const localCanvas = document.getElementById("garden-localgraph");
    const buildLocal = () => ({
      nodes: [slug, ...nbrs].map(nodeFor).filter(Boolean),
      edges: graph.edges.filter((e) => e.a === slug || e.b === slug),
      focusSlug: slug,
    });
    const wrap = localCanvas.closest(".localgraph-wrap");
    addExpandButton(wrap, () => ({
      nodes: GARDEN.map((e) => nodeFor(e.slug)).filter(Boolean),
      edges: graph.edges,
      focusSlug: slug,
    }));
    const d = buildLocal();
    createGraph(localCanvas, d.nodes, d.edges, { focusSlug: slug });
  }
}

document.addEventListener("DOMContentLoaded", initGardenGraph);
