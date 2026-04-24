# hris28.github.io

Personal portfolio. Static site, no build step. Drop it into any GitHub Pages repo and it runs.

## File map

```
site/
├── index.html           Homepage with hero, eyebrow, display headline, featured projects
├── about.html           About page with flex TOC container (preserves original layout)
├── projects.html        Projects timeline (content comes from js/projects.js)
├── resume.html          Résumé / CV toggle with embedded PDF viewer
├── garden.html          Searchable Obsidian-compatible notes archive
├── interests.html       Books, dance, hobbies
├── 404.html             Friendly not-found page
├── css/
│   └── style.css        Full design system. Edit :root tokens to rebrand.
├── js/
│   ├── main.js          Theme toggle, mobile nav, active link, page-updated date
│   ├── projects.js      PROJECTS array + render function (THE file to edit)
│   └── garden.js        Manifest loader + minimal markdown parser
├── garden/
│   ├── index.json       Manifest of notes. Add entries here to list new notes.
│   ├── welcome.md
│   ├── osint-intro.md
│   └── hci-eye-tracking.md
├── images/              Hero, portrait, project images go here
│   └── projects/        Per-project images (see below)
└── assets/              Résumé and CV PDFs go here
    ├── HrishikaResume.pdf
    └── HrishikaCV.pdf
```

## Quick edits

### Add a new project
Open `js/projects.js`. Add one object to the `PROJECTS` array:

```js
{
  year: 2026,
  type: "CODE",                  // CODE, RESEARCH, HARDWARE, STARTUP, EDITING
  date: "Jan 2026 to Present",
  title: "My new thing",
  pi: "PI: Dr. Example",         // optional
  description: "What it does, why it matters.",
  honor: "Some award",           // optional, renders with a star
  tags: ["PYTHON", "ML"],        // optional
  links: [{ label: "Code", url: "https://..." }], // optional
  image: "images/projects/thing.jpg",             // optional, see below
}
```

### Add an image to a project card
1. Drop the image in `images/projects/`. Square-ish looks best, roughly 600x600.
2. Add an `image:` field to the project entry pointing to that path.
3. The card automatically switches to a 2-column layout on desktop and stacks on mobile.

Good image sources for each project would include:
- A product photo for SkyeLabs EcoGel
- A photo of the 3D printed D3 receptor model
- A screenshot of the Health Chart App dashboard
- A render from the Three.js Digital Art Exhibition
- The Broad Street Scientific journal cover
- A gaze-heatmap rendering for the eye-tracking study

### Add a garden note
1. Write the markdown in `garden/new-note.md`. Supports headings, lists, bold/italic,
   code, blockquotes, regular links, and Obsidian wiki-links like `[[other-note]]`.
2. Add an entry to `garden/index.json`:

```json
{
  "slug": "new-note",
  "title": "Readable title",
  "desc": "One line summary for the list view.",
  "tags": ["HCI", "RESEARCH"],
  "date": "Apr 2026"
}
```

### Update the résumé or CV
Replace `assets/HrishikaResume.pdf` or `assets/HrishikaCV.pdf` with new files of the
same name. The toggle buttons on `resume.html` will pick them up automatically.

### Rebrand colors
Open `css/style.css`. All colors live in `:root` at the top (light theme) and
`html[data-theme="dark"]` (dark theme). Change the hex values and the whole site
updates.

## Features preserved from the original site
- Parallax hero background (fixed attachment, falls back on mobile)
- Page Last Updated timestamp in footer
- `mailto:` contact links
- Flex container TOC on About page

## New features
- Light / dark mode toggle, saved in localStorage and respects OS preference
- Data-driven project cards with optional images
- Résumé vs CV toggle with embedded viewer and download links
- Expandable mobile nav (hamburger)
- Obsidian-compatible garden with client-side search and tag filter
- Wiki-links between garden notes via `[[slug]]` syntax
