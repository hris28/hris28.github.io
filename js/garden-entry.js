/* =========================================================
   garden-entry.js
   Renders a single garden entry at garden-entry.html?slug=...
   Uses GARDEN, helpers, and parseMarkdown from garden.js (loaded first).
     - song    -> embeds the YouTube video + any notes
     - md       -> fetches the markdown file and renders it
     - thought  -> shows the inline body
   Entries with their own page (post) or live url (tool) redirect there.
   ========================================================= */
async function initGardenEntry() {
  const root = document.getElementById("entry-root");
  if (!root) return;

  const slug = new URLSearchParams(location.search).get("slug");
  const e = slug ? gardenFindBySlug(slug) : null;

  if (!e) {
    document.title = "Not found · Garden · Hrishika Roychoudhury";
    root.innerHTML =
      `<a class="back-link" href="garden.html">← Back to the garden</a>
       <p>Entry not found.</p>`;
    return;
  }

  // Lives elsewhere? Send them straight there.
  if (e.type === "tool" && e.url) { location.replace(e.url); return; }
  if (e.page) { location.replace(e.page); return; }

  document.title = e.title + " · Garden · Hrishika Roychoudhury";

  const mat = MATURITY[e.maturity];
  const head = `
    <a class="back-link" href="garden.html">← Back to the garden</a>
    <p class="eyebrow">${TYPE_LABEL[e.type] || e.type}${mat ? " · " + mat.icon + " " + mat.label : ""}</p>
    <h1 class="note-h1">${e.title}</h1>
    <p class="note-meta" style="margin: 0.4rem 0 1.75rem;">
      ${gardenFormatDate(e.date)}${e.tags && e.tags.length ? " · " + e.tags.join(", ") : ""}
    </p>`;

  let body = "";
  if (e.youtube) {
    // Accept a raw id, "id&t=90s", "?v=id", a youtu.be/ link, or a full URL.
    const raw = String(e.youtube);
    const idMatch = raw.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    const id = idMatch ? idMatch[1] : raw.split(/[?&]/)[0].trim();
    const startMatch = raw.match(/[?&]t=(\d+)/); // honor a timestamp if present
    const start = startMatch ? `?start=${startMatch[1]}` : "";
    body += `<div class="video-embed">
      <iframe src="https://www.youtube-nocookie.com/embed/${id}${start}"
        title="${e.title}" loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>`;
  }
  if (e.md) {
    try {
      const res = await fetch(e.md);
      if (!res.ok) throw new Error();
      body += parseMarkdown(await res.text());
    } catch {
      body +=
        `<p>Couldn't load this note (<code>${e.md}</code>).</p>` +
        `<p style="color:var(--ink-faint);font-size:0.9rem">Two common reasons: (1) you're opening the site as a <code>file://</code> path--browsers block reading files that way, so preview through a local server (e.g. <code>python -m http.server</code>) or VS Code Live Server; (2) the markdown file isn't committed to the repo yet, so it 404s on the live site.</p>`;
    }
  } else if (e.body) {
    body += e.body;
  }

  root.innerHTML = head + `<div class="note-view">${body}</div>`;
}

document.addEventListener("DOMContentLoaded", initGardenEntry);
