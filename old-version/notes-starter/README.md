# Notes starter — setup

A pre-configured overlay for [Quartz 4](https://quartz.jzhao.xyz) that
gives you a stark black-and-white digital garden, ready to publish at
`hris28.github.io/notes/`.

The files in this folder are **overlays** — they replace or add to
specific files in a fresh Quartz install. The workflow is:

1. Clone a fresh Quartz.
2. Copy these files over it.
3. Push to a new GitHub repo named `notes`.
4. Turn on GitHub Pages.
5. Add one line to the portfolio nav.

Total time: about 15 minutes.

---

## One-time setup

### Prerequisites

- Node.js v22+ and npm v10.9+ installed
  (Quartz's only hard requirement — check with `node -v`)
- A GitHub account (you've got this one)
- Git on your machine

### Step 1 — Scaffold Quartz

In a terminal, in whichever folder you keep projects:

```bash
git clone https://github.com/jackyzha0/quartz.git notes
cd notes
npm i
npx quartz create
```

When `npx quartz create` asks, pick:
- **Empty Quartz** (we'll supply the content)
- **"Treat links as shortest path"** for link resolution

### Step 2 — Overlay this starter

Copy the files from this starter into the `notes` folder, overwriting
where they collide. From inside the `notes` folder:

```bash
# Replace these with the path to wherever you extracted this starter.
cp /path/to/notes-starter/quartz.config.ts              ./quartz.config.ts
cp /path/to/notes-starter/quartz.layout.ts              ./quartz.layout.ts
cp /path/to/notes-starter/quartz/styles/custom.scss     ./quartz/styles/custom.scss

# Replace default content with the seed notes:
rm -rf content/*
cp /path/to/notes-starter/content/*.md                  ./content/

# Add the deploy workflow:
mkdir -p .github/workflows
cp /path/to/notes-starter/.github/workflows/deploy.yml  ./.github/workflows/deploy.yml
```

### Step 3 — Preview locally

```bash
npx quartz build --serve
```

Open http://localhost:8080 and confirm it looks right. You should see
three notes: the landing page, `welcome`, and `colophon`.

### Step 4 — Push to GitHub

Create a new repository on GitHub named exactly **`notes`**, under
your `hris28` account. Do NOT initialise it with a README.

Back in the terminal:

```bash
# Point the repo at your new remote and switch to the v4 branch
# (which is what the deploy workflow listens on)
git remote set-url origin https://github.com/hris28/notes.git
git checkout -b v4
git add -A
git commit -m "initial commit — notes garden"
git push -u origin v4
```

### Step 5 — Turn on Pages

1. Go to `https://github.com/hris28/notes/settings/pages`
2. Under **Source**, pick **GitHub Actions**
3. Wait ~2 minutes for the first build

Your site is now live at **https://hris28.github.io/notes/**.

### Step 6 — Link it from the portfolio

See `PORTFOLIO-NAV-PATCH.txt`. One line added to each of the five
portfolio HTML files. No other changes.

---

## Writing workflow

Once it's set up, adding a note is just:

```bash
# in the notes repo
echo "---
title: My new note
date: $(date +%F)
tags: [hci]
---

Body goes here. Link to other notes with [[double-brackets]].
" > content/my-new-note.md

git add content/my-new-note.md
git commit -m "new note"
git push
```

GitHub Actions rebuilds and redeploys in ~90 seconds.

### Using Obsidian (optional but nice)

The `content/` folder is a valid Obsidian vault. Open it directly in
Obsidian and get WYSIWYG editing, graph view, and live-preview
wikilinks while you write. Everything is still plain markdown — no
lock-in.

### Frontmatter fields

```yaml
---
title:       "Display title of the note"   # required
date:        2026-04-23                     # published date
tags:        [hci, ux-research]             # any number
description: "One-line summary for previews"
draft:       true                           # hides from build
---
```

---

## Customising further

- **Colours / fonts** — `quartz.config.ts`, under `theme`.
- **What's in the sidebar** — `quartz.layout.ts`. For example, to
  re-enable the file tree, add `Component.Explorer()` to `left[]`.
- **Fine style details** — `quartz/styles/custom.scss`.
- **Plugins** — `quartz.config.ts`, under `plugins`. The Quartz
  plugin list is at <https://quartz.jzhao.xyz/plugins>.

---

## Updating Quartz later

When Quartz releases a new version, pull updates from the upstream
repo without touching your content or config:

```bash
git remote add upstream https://github.com/jackyzha0/quartz.git
git fetch upstream
git merge upstream/v4
```

Git will merge the Quartz internals cleanly; your three overlay files
(`quartz.config.ts`, `quartz.layout.ts`, `quartz/styles/custom.scss`)
are the only places conflicts could happen — and those you control.
