# hris28.github.io

Personal portfolio site.

## Structure

```
├── index.html            # Home
├── about.html            # About
├── projects.html         # Timeline — renders from js/projects.js
├── resume.html           # Résumé & CV viewer (embeds both PDFs)
├── interests.html        # Interests
├── css/style.css         # All styles
├── js/projects.js        # ← edit this to add a project
├── files/
│   ├── HrishikaRoychoudhury-Resume.pdf
│   └── HrishikaRoychoudhury-CV.pdf
└── images/
    └── abt_pic.png
```

## Add a new project

1. Open `js/projects.js`.
2. Paste a new object into the `projects` array (order doesn't matter —
   the timeline sorts by date automatically).
3. Fill in `title`, `start` (`YYYY-MM`), `dateLabel`, etc. Field
   reference lives at the top of the file.
4. Commit & push. GitHub Pages redeploys and the entry appears on
   `/projects.html`.

## Update the résumé or CV

Replace the files in `/files/`:

- `HrishikaRoychoudhury-Resume.pdf` — the 2-page industry résumé
- `HrishikaRoychoudhury-CV.pdf` — the detailed academic CV

The résumé page embeds whichever is selected; no code changes needed.

## Local preview

Open `index.html` in a browser, or run any static server from the root:

```bash
python3 -m http.server 8000
```
