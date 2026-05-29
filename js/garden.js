/* =========================================================
   garden.js
   Loads a JSON manifest of notes from /garden/index.json,
   renders a searchable + tag-filterable list.
   When URL has ?note=slug, fetches /garden/<slug>.md and renders it.
   Obsidian wiki-links [[note-name]] resolve to ?note=note-name.
   ========================================================= */

let NOTES = [];
let activeTag = null;

async function initGarden() {
  const params = new URLSearchParams(location.search);
  const noteSlug = params.get("note");

  if (noteSlug) {
    await renderNote(noteSlug);
  } else {
    await loadManifest();
    renderList();
    attachFilters();
  }
}

async function loadManifest() {
  try {
    const res = await fetch("garden/index.json");
    NOTES = await res.json();
  } catch (e) {
    document.getElementById("garden-root").innerHTML =
      `<p>Could not load notes. Check that garden/index.json exists.</p>`;
  }
}

function renderList() {
  const q = (document.getElementById("search")?.value || "").toLowerCase();
  const filtered = NOTES.filter((n) => {
    const matchesQuery =
      !q || n.title.toLowerCase().includes(q) || (n.desc || "").toLowerCase().includes(q);
    const matchesTag = !activeTag || (n.tags || []).includes(activeTag);
    return matchesQuery && matchesTag;
  });

  // Collect unique tags for the filter bar
  const allTags = [...new Set(NOTES.flatMap((n) => n.tags || []))];

  const tagBar = allTags.map((t) =>
    `<button data-tag="${t}" class="${activeTag === t ? "active" : ""}">${t}</button>`
  ).join("");

  const list = filtered.length
    ? `<ul class="note-list">${filtered.map(renderNoteRow).join("")}</ul>`
    : `<p style="color: var(--ink-faint); padding: 2rem 0;">No notes match.</p>`;

  document.getElementById("tag-filter").innerHTML = tagBar;
  document.getElementById("garden-root").innerHTML = list;

  // Wire up tag buttons
  document.querySelectorAll("#tag-filter button").forEach((b) => {
    b.addEventListener("click", () => {
      const t = b.dataset.tag;
      activeTag = activeTag === t ? null : t;
      renderList();
    });
  });
}

function renderNoteRow(n) {
  return `
    <li>
      <div>
        <a class="note-title" href="?note=${n.slug}">${n.title}</a>
        ${n.desc ? `<div class="note-desc">${n.desc}</div>` : ""}
      </div>
      <div class="note-meta">${n.date || ""}</div>
    </li>
  `;
}

function attachFilters() {
  document.getElementById("search")?.addEventListener("input", renderList);
}

// ----- Individual note view -----
async function renderNote(slug) {
  const root = document.getElementById("garden-root");
  document.getElementById("garden-controls")?.style.setProperty("display", "none");
  try {
    const res = await fetch(`garden/${slug}.md`);
    if (!res.ok) throw new Error("not found");
    const md = await res.text();
    root.innerHTML = `
      <a class="back-link" href="garden.html">← All notes</a>
      <div class="note-view">${parseMarkdown(md)}</div>
    `;
  } catch {
    root.innerHTML = `
      <a class="back-link" href="garden.html">← All notes</a>
      <p>Note not found: <code>${slug}</code></p>
    `;
  }
}

/* --- Minimal Markdown parser.
   Covers headings, bold, italic, inline code, code blocks, blockquotes,
   lists, links, and Obsidian-style [[wiki-links]]. Kept tiny on purpose. --- */
function parseMarkdown(src) {
  let out = src;

  // Escape raw HTML first
  out = out.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Fenced code blocks
  out = out.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);

  // Headings
  out = out.replace(/^###### (.+)$/gm, "<h6>$1</h6>");
  out = out.replace(/^##### (.+)$/gm, "<h5>$1</h5>");
  out = out.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  out = out.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  out = out.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  out = out.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Blockquotes
  out = out.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");

  // Unordered lists (simple, single level)
  out = out.replace(/(?:^- .+(?:\n|$))+?/gm, (block) => {
    const items = block.trim().split("\n").map(l => `<li>${l.replace(/^- /, "")}</li>`).join("");
    return `<ul>${items}</ul>`;
  });

  // Wiki-style internal links [[slug]] or [[slug|label]]
  out = out.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, slug, label) => {
    const clean = slug.trim().toLowerCase().replace(/\s+/g, "-");
    return `<a class="wiki-link" href="?note=${clean}">${label || slug}</a>`;
  });

  // Markdown links [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Inline formatting
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Paragraph breaks: split on double newlines, wrap loose lines in <p>
  out = out.split(/\n{2,}/).map((chunk) => {
    if (/^\s*<(h[1-6]|ul|ol|pre|blockquote)/.test(chunk)) return chunk;
    return `<p>${chunk.replace(/\n/g, " ")}</p>`;
  }).join("\n");

  return out;
}

document.addEventListener("DOMContentLoaded", initGarden);
