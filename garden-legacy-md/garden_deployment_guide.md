# Garden Deployment Guide
### hris28.github.io/garden — From empty to live tonight

---

## A note on habibullah.dev/kits/system

The page could not be fetched during this session due to network-level restrictions. From the search results, Habibullah's site is a portfolio and developer kit reference built with a terminal-aesthetic, real-time dashboard elements, and heavily custom CSS. Features worth borrowing in spirit: the system-status-page design pattern (transparent about what is up and what is not), the kit-as-organized-reference structure rather than blog-post structure, and the CLI-aesthetic typography that makes technical content feel native. The garden should take the organizational logic, not the terminal aesthetic, since the goal is accessibility for non-technical readers.

---

## Step 0: What you are working with right now

Before touching anything, answer these three questions about your existing setup:

**What is hris28.github.io built on?** Go to your GitHub repository (github.com/hris28/hris28.github.io or whatever the repo is named). Look at the root files. If you see a `_config.yml`, it is Jekyll. If you see a `quartz.config.ts`, it is Quartz. If you see an `index.html` with no build system, it is plain HTML. If you see a `package.json` with `next` or `astro` as a dependency, it is one of those.

**Where does the garden tab currently go?** If it is a link in your nav that goes to `/garden`, that path either resolves to a `garden/index.html`, a `garden.md`, or throws a 404. Know which before you start.

**Do you have a local copy of the repository?** If not, clone it now. Everything below assumes you are editing locally and pushing to GitHub.

```bash
git clone https://github.com/hris28/hris28.github.io
cd hris28.github.io
```

---

## Step 1: Choose your stack for the garden

You have three realistic options for tonight. Pick one before reading further.

### Option A: Plain HTML/CSS inside your existing repo (fastest, most control)

If your site is already plain HTML or Jekyll, you can add a `garden/` folder, put an `index.html` in it, and GitHub Pages will serve it immediately. No build step, no dependencies. Every article is its own `.html` file, or you template with Jekyll includes.

Best for: you are comfortable with HTML and CSS, you want full control over the output, and you do not want to learn a new tool tonight.

### Option B: Quartz (recommended if starting the garden from scratch)

Quartz is a static-site generator designed specifically for digital gardens. It turns a folder of Markdown files into a site with backlinks, a graph view, full-text search, and maturity tagging built in. It deploys to GitHub Pages with a single GitHub Actions file. You write in Markdown, which is fast. It does not require a database or a backend.

Best for: you want bidirectional links between articles, a knowledge graph, and search without building those features yourself.

Setup time from zero: about 30 to 45 minutes.

### Option C: Obsidian + obsidian-digital-garden plugin

If you already write your notes in Obsidian, this plugin lets you mark notes with `dg-publish: true` and push them to a GitHub repo that Quartz or the plugin's own template then deploys. You write in Obsidian, you push a button, the note is live.

Best for: you already use Obsidian as your note-taking system.

**This guide proceeds with Option B (Quartz) because it is the most capable and the deployment path is the cleanest. If you are on Option A, the HTML and CSS sections below are still fully applicable.**

---

## Step 2: Set up Quartz locally

Quartz requires Node.js 18 or later. Check yours:

```bash
node --version
```

If the output is below v18, install the current LTS from nodejs.org before continuing.

Clone the Quartz template into a new folder. Do not put it inside your existing site repo yet; you will connect them in Step 4.

```bash
git clone https://github.com/jackyzha0/quartz.git garden
cd garden
npm install
npx quartz create
```

The `npx quartz create` command walks you through the initial setup: it asks for your site title, your base URL, and whether you want to start from an empty vault or with the example content. Choose empty vault. Set the base URL to `hris28.github.io/garden` (or whatever your subdirectory will be).

Start the local development server to confirm it works:

```bash
npx quartz build --serve
```

Open `localhost:8080` in your browser. You should see the Quartz shell with no content yet. If you see an error, check that Node.js is v18 or above and that the `npm install` step completed without errors.

---

## Step 3: Configure Quartz for the garden

Open `quartz.config.ts` in your editor. The settings that matter most for tonight:

```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,       // this enables the built-in hover previews
    baseUrl: "hris28.github.io/garden",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a98c",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a98c",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  // plugins follow below
}
```

Quartz's `enablePopovers: true` gives you the hover preview of internal links automatically. You still need to handle external link previews separately, which is covered in Step 7.

---

## Step 4: Write your first articles in Markdown

Quartz reads from the `content/` folder. Each `.md` file becomes a page. Frontmatter at the top of each file sets the metadata.

Create your first article:

```
content/index.md                 (the garden home page)
content/01-web-request.md        (Cluster 01-A: Anatomy of a page load)
content/01-https.md              (Cluster 01-B: What HTTPS protects)
content/01-dns.md                (Cluster 01-C: DNS in depth)
```

Every article starts with this frontmatter block:

```yaml
---
title: "Anatomy of a Page Load"
date: 2026-05-01
lastmod: 2026-05-01
draft: false
tags:
  - web
  - tracking
  - cluster-01
stage: seedling
description: "What literally happens between pressing Enter and seeing a page, and who is involved at each step."
---
```

The `stage` field is custom. You will use it for the maturity markers (seedling, sprout, flower). Add a CSS class or a shortcode in the layout to display it as a badge. More on this in Step 6.

For the home page (`content/index.md`), write a short paragraph saying what the garden is, who it is for, and how to navigate it. Do not start with a list of articles; write prose that tells the reader what they are looking at and gives them one clear starting point.

Example home page opening:

```markdown
---
title: The Garden
---

This is a reference site for people who want to understand the systems 
they already live inside. It covers how the internet works, who can see 
what you do online, what privacy tools actually change, and how the 
hardware and software beneath everyday computing fits together.

Start with [Anatomy of a Page Load](01-web-request.md) if you have 
never thought about what happens between pressing Enter and seeing a 
website. Start with [What HTTPS Actually Protects](01-https.md) if you 
already know what a URL is and want to know what the padlock actually 
means. Both are written for readers with no technical background.
```

---

## Step 5: The tool review table format

For every tool review, use this table structure at the top of the article, before the prose. The table answers the four questions every reader has immediately: what is it, who is it for, what does it cost, and is it recommended.

```markdown
| Field | Detail |
|---|---|
| **What it is** | Content blocker that prevents known third-party trackers from loading |
| **Made by** | Raymond Hill (gorhill), independent developer |
| **Platform** | Browser extension: Firefox, Chrome, Edge, Safari |
| **Cost** | Free, open source (GPL-3.0) |
| **Source available** | Yes: github.com/gorhill/uBlock |
| **Logging policy** | Processes locally; sends nothing to a server |
| **Last reviewed** | May 2026 |
| **Recommended for** | Everyone using a desktop browser |
```

Then write the prose review below it. The table is a quick-reference card; the prose is the explanation of why the table says what it says. End every tool review article with a source review section: a short paragraph on each source consulted, noting strengths, weaknesses, and commercial interests.

For cluster-level comparison tables (comparing multiple tools at once), use this structure:

```markdown
| Tool | Type | Blocks trackers | Blocks fingerprinting | Logs queries | Open source | Cost |
|---|---|---|---|---|---|---|
| uBlock Origin | Browser extension | Yes (lists) | Partial | No | Yes | Free |
| Privacy Badger | Browser extension | Yes (learned) | No | No | Yes | Free |
| NextDNS | DNS filter | Yes (lists) | No | Optional | No | Free tier |
| Pi-hole | DNS filter (self-hosted) | Yes (lists) | No | Configurable | Yes | Free |
| Mullvad VPN | VPN | No | No | Claims none | Yes (client) | Paid |
```

Quartz renders Markdown tables natively. No plugin needed.

---

## Step 6: Maturity markers

Add a CSS class to each article based on its `stage` frontmatter value. In Quartz, you can do this by adding a custom layout component.

Create a file at `quartz/components/ArticleStage.tsx`:

```tsx
import { QuartzComponent, QuartzComponentProps } from "./types"

const stageEmoji: Record<string, string> = {
  seedling: "🌱",
  sprout: "🌿",
  flower: "🌻",
}

const stageLabel: Record<string, string> = {
  seedling: "Stub or early notes. Incomplete.",
  sprout: "Readable draft. May have gaps.",
  flower: "Reviewed and sourced. Stable until next-review date.",
}

export const ArticleStage: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const stage = (fileData.frontmatter?.stage as string) ?? "seedling"
  const emoji = stageEmoji[stage] ?? "🌱"
  const label = stageLabel[stage] ?? ""
  return (
    <div class={`article-stage stage-${stage}`} title={label}>
      {emoji} {stage.charAt(0).toUpperCase() + stage.slice(1)}
    </div>
  )
}

export default ArticleStage
```

Add CSS in `quartz/styles/custom.scss`:

```scss
.article-stage {
  display: inline-block;
  font-size: 0.85rem;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-weight: 500;
}

.stage-seedling {
  background: #e8f5e9;
  color: #2e7d32;
}

.stage-sprout {
  background: #f1f8e9;
  color: #558b2f;
}

.stage-flower {
  background: #fff9c4;
  color: #f57f17;
}
```

Register it in your layout file (`quartz/components/ArticleLayout.tsx` or wherever your article template lives) by importing `ArticleStage` and placing it directly below the article title.

---

## Step 7: Link previews for external links

Do not use Microlink if privacy matters to your site's principles. Microlink is a third-party service that your reader's browser contacts when they hover a link, which means Microlink can log that request. For a site about tracking, that is a problem worth naming.

The right approach for this site is build-time preview fetching: at build time, Quartz fetches the Open Graph metadata for every external link in your content and bakes the preview data into the static HTML. The reader's browser never contacts the preview API. This is called a static preview approach.

Here is how to implement it:

**Step 7a: Get a Microlink API key (free tier, 50 req/day)**

Go to microlink.io and sign up. The free tier is enough for a garden at this scale. Note that you are fetching at build time, not per-visitor, so 50 requests per day covers many articles.

Alternatively, use `open-graph-scraper` as an npm package directly if you want zero third-party dependency:

```bash
npm install open-graph-scraper
```

**Step 7b: Create a build-time link preview script**

Create `scripts/fetch-previews.mjs` in your Quartz root:

```javascript
import ogs from 'open-graph-scraper'
import fs from 'fs/promises'
import path from 'path'

// Collect all external links from built HTML
// This is a simplified version; a full implementation would parse
// every HTML file in the output directory

const linksToPreview = [
  "https://coveryourtracks.eff.org",
  "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies",
  "https://www.privacyguides.org/en/dns/",
  "https://epic.org/issues/consumer-privacy/data-brokers/",
  // Add all external links you use across your articles
]

const previews = {}

for (const url of linksToPreview) {
  try {
    const { result } = await ogs({ url, timeout: 5000 })
    previews[url] = {
      title: result.ogTitle ?? result.dcTitle ?? new URL(url).hostname,
      description: result.ogDescription ?? "",
      image: result.ogImage?.[0]?.url ?? null,
      domain: new URL(url).hostname,
    }
    console.log(`Fetched: ${url}`)
  } catch (e) {
    console.warn(`Failed: ${url}`, e.message)
    previews[url] = { title: new URL(url).hostname, description: "", image: null, domain: new URL(url).hostname }
  }
}

await fs.writeFile(
  path.join(process.cwd(), 'public/link-previews.json'),
  JSON.stringify(previews, null, 2)
)
console.log(`Wrote ${Object.keys(previews).length} previews.`)
```

Run this before your build step. Add it to your `package.json` build script:

```json
"scripts": {
  "preview": "node scripts/fetch-previews.mjs",
  "build": "npm run preview && npx quartz build"
}
```

**Step 7c: Load the previews in JavaScript and show them on hover**

Add this to your custom JavaScript (create `quartz/static/link-preview.js`):

```javascript
let previews = null

async function loadPreviews() {
  if (previews) return previews
  const res = await fetch('/link-previews.json')
  previews = await res.json()
  return previews
}

function createPreviewCard(data) {
  const card = document.createElement('div')
  card.className = 'link-preview-card'
  card.innerHTML = `
    <div class="lp-domain">${data.domain}</div>
    ${data.image ? `<img class="lp-image" src="${data.image}" alt="" loading="lazy">` : ''}
    <div class="lp-title">${data.title}</div>
    ${data.description ? `<div class="lp-desc">${data.description.slice(0, 120)}${data.description.length > 120 ? '...' : ''}</div>` : ''}
  `
  return card
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadPreviews()

  document.querySelectorAll('a[href^="http"]').forEach(link => {
    const url = link.href
    if (!data[url]) return

    let card = null
    let timeout = null

    link.addEventListener('mouseenter', (e) => {
      timeout = setTimeout(() => {
        card = createPreviewCard(data[url])
        card.style.position = 'fixed'
        card.style.left = `${e.clientX + 12}px`
        card.style.top = `${e.clientY + 12}px`
        document.body.appendChild(card)
      }, 300)
    })

    link.addEventListener('mousemove', (e) => {
      if (card) {
        card.style.left = `${e.clientX + 12}px`
        card.style.top = `${e.clientY + 12}px`
      }
    })

    link.addEventListener('mouseleave', () => {
      clearTimeout(timeout)
      if (card) { card.remove(); card = null }
    })
  })
})
```

Add the CSS for the preview card in your `custom.scss`:

```scss
.link-preview-card {
  position: fixed;
  z-index: 9999;
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 12px;
  max-width: 280px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  pointer-events: none;

  .lp-domain {
    font-size: 0.72rem;
    color: var(--gray);
    margin-bottom: 4px;
    text-transform: lowercase;
  }

  .lp-image {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 6px;
    max-height: 140px;
    object-fit: cover;
  }

  .lp-title {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--dark);
    line-height: 1.3;
  }

  .lp-desc {
    font-size: 0.78rem;
    color: var(--darkgray);
    margin-top: 4px;
    line-height: 1.4;
  }
}
```

This approach: reader never contacts a third-party API. Preview data is baked into a static JSON file at build time. No tracking, no latency on hover, no external dependency at runtime.

---

## Step 8: Source date stamps on external links

This is simpler to implement. Whenever you write an external link in Markdown, use this custom format and a script will annotate it at build time.

In your Markdown, write links normally:

```markdown
The EFF's [Cover Your Tracks](https://coveryourtracks.eff.org) tool...
```

Then add dates to your `link-previews.json` manually when you first fetch them:

```json
"https://coveryourtracks.eff.org": {
  "title": "Cover Your Tracks",
  "description": "See how trackers view your browser",
  "domain": "coveryourtracks.eff.org",
  "image": null,
  "fetched": "2026-05-01",
  "sourcePublished": "2024"
}
```

In the preview card JavaScript, add a line showing the `fetched` date:

```javascript
card.innerHTML += `<div class="lp-fetched">Checked ${data[url].fetched}</div>`
```

This produces a card that shows the reader both a preview and when the link was last verified, which is the exact feature missing from most reference sites.

---

## Step 9: Next-review date notice

Add a frontmatter field `next_review` to every article:

```yaml
---
title: "DNS in Depth"
date: 2026-05-01
lastmod: 2026-05-01
next_review: 2027-01-01
stage: flower
---
```

Add a component that checks whether `next_review` is in the past and renders a warning banner if so.

In `quartz/components/ReviewNotice.tsx`:

```tsx
import { QuartzComponent, QuartzComponentProps } from "./types"

export const ReviewNotice: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const nextReview = fileData.frontmatter?.next_review as string | undefined
  if (!nextReview) return null

  const reviewDate = new Date(nextReview)
  const now = new Date()
  if (reviewDate > now) return null

  return (
    <div class="review-notice">
      This article was due for review on {reviewDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}.
      It may describe outdated tools, APIs, or practices.
    </div>
  )
}
```

CSS in `custom.scss`:

```scss
.review-notice {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 0.85rem;
  color: #664d03;
  margin-bottom: 1.5rem;
}
```

---

## Step 10: Deploy to GitHub Pages

Quartz ships with a GitHub Actions workflow file. When you push to `main`, it builds and deploys automatically.

**If your garden is a subfolder of an existing GitHub Pages site** (hris28.github.io), you have two options:

Option A: Put the Quartz build output into a `garden/` subfolder of your existing repo using the GitHub Actions `working-directory` setting.

Option B (cleaner): Create a separate repository named `garden`, configure GitHub Pages for it, and link to it from your main site. The URL becomes `hris28.github.io/garden` if you set the repo name to `garden` and enable Pages on it.

For Option B:

1. Create a new repo at github.com/new. Name it `garden`.
2. Copy your Quartz project into it and push.
3. On GitHub, go to the repo Settings, then Pages, then set Source to "GitHub Actions."
4. Quartz's `.github/workflows/deploy.yml` handles the rest.

The deploy file Quartz provides looks like this (already included when you cloned):

```yaml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install Dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-22.04
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Push everything:

```bash
git add .
git commit -m "Initial garden setup with Quartz"
git push origin main
```

GitHub Actions will run. Go to the Actions tab of your repo to watch the build. When it shows a green checkmark, your site is live.

---

## Step 11: What to write tonight, in order

You cannot write everything tonight. Here is what to do to have a meaningful garden live by the end of the session.

**First: the index page.** Write 200 to 300 words of honest prose explaining what the garden is, who it is for, and where to start. Do not use a list of articles as the entire home page. Give the reader two clear entry points and tell them which to choose based on what they know.

**Second: one complete article.** The DNS article (01-C) is the right choice for first publication because it is the most practically useful thing you learned in the search session and the most systematically underprovided by mainstream sources. The Internet Society's "shifts trust rather than removes it" insight is the article's core claim. Write 800 to 1200 words, include the visibility table from the Techlore forum post (rewritten in your own words), end with a source review section covering the Internet Society, Privacy Guides, and Cloudflare.

**Third: two or three stubs.** Create the files for 01-A (page load anatomy) and 02-A (cookies) with full frontmatter and a one-paragraph summary of what each will cover when complete. Mark them as `stage: seedling`. This communicates to early readers that the garden is actively growing without making you publish half-finished work as finished.

**Fourth: push and verify.** Confirm the live site renders correctly on mobile and on a text-only browser if you can. Confirm the maturity badges display. Confirm internal links between pages resolve.

---

## Step 12: After tonight — the first two weeks

Week one: finish articles 01-A and 01-B. These three DNS and HTTPS articles together form a complete answer to the single most important question a privacy-curious reader is likely to arrive with. Once all three are live, the garden has a functional core.

Week two: write 02-A (cookies) and 02-B (pixels). These are the articles that explain the advertising layer. Together with the network cluster, they give a reader a complete picture of who sees what and how. After these five articles, the garden is usable as a standalone reference.

The tool review tables can be populated progressively. Start with the tools you are already using (uBlock Origin, Privacy Badger, Multi-Account Containers, DuckDuckGo) because you have direct experience with them. Do not publish a tool review without having run the tool and read its privacy policy and audit history.

---

## Full tonight checklist

```
[ ] Confirm existing site structure and garden path
[ ] Clone Quartz and run locally
[ ] Configure quartz.config.ts (baseUrl, fonts, colors, enablePopovers)
[ ] Write content/index.md (garden home page, 200-300 words of prose)
[ ] Write content/01-dns.md (complete, ~1000 words, source review section)
[ ] Write content/01-web-request.md (stub with frontmatter, one paragraph)
[ ] Write content/02-cookies.md (stub with frontmatter, one paragraph)
[ ] Add ArticleStage component
[ ] Add ReviewNotice component
[ ] Add custom.scss styles for stage badges and review notice
[ ] Run npm run build locally and verify output
[ ] Create GitHub repo named 'garden' (or configure subfolder)
[ ] Enable GitHub Pages with Actions source
[ ] Push and confirm GitHub Actions workflow runs green
[ ] Open the live URL and confirm index and DNS article render correctly
[ ] Add three links to link-previews.json and verify hover preview works
[ ] Share the URL
```

---

## Quick reference: link preview API comparison

For the record, here are your options if you later want to move from the build-time approach to a lightweight API:

| Service | Free tier | Screenshot support | Privacy model | Notes |
|---|---|---|---|---|
| **Build-time (ogs npm)** | Unlimited | No (metadata only) | Reader contacts nobody | Recommended for this site |
| **Microlink** | 50 req/day | Yes | Logs requests | Good for screenshots; third-party |
| **OpenGraph.io** | 100 req/month | Yes | Logs requests | Lower free tier |
| **LinkPeek** | 100 req/day | SVG cards only | Logs requests | Cloudflare Workers, newer |
| **linkpreview.net** | 60 req/hour | No | Logs requests | Simple, no key needed for basic |

For a site whose content is about tracking, build-time fetching is the only approach that does not undermine the site's own principles.
