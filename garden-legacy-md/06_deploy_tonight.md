# Deploying the Garden Tonight: Step by Step

## What we are doing and why

You are going to create a new repository, scaffold Quartz into it, write your front matter and template adjustments, write one real article so the build has something to render, push, and confirm the GitHub Pages action serves it. Then you will update the existing `garden.html` on your portfolio to point at the new URL. By the end of this you have a working garden at a real URL, the publishing pipeline solved, and a template you can keep using.

A note on the URL. When I said last round that a separate repo could be accessed at `hris28.github.io/garden/`, I oversimplified. A separate repo on the same user account publishes to `hris28.github.io/<repo-name>/`. If you name the repo `garden`, the URL becomes `hris28.github.io/garden/`, which is exactly what you wanted. This works because GitHub Pages routes `username.github.io/repo-name/` to the repo named `repo-name` on that user account automatically. We will name the repo `garden` and get the URL for free.

## Step 1: Create the repo

Go to github.com, click New Repository, name it `garden`, set it to public, and do not initialize it with a README. Click Create. The repo URL will be `github.com/hris28/garden`. The published site will live at `hris28.github.io/garden/` once GitHub Pages is enabled, which we will do later.

## Step 2: Scaffold Quartz locally

You need Node.js installed. If you do not have it, install it from nodejs.org. Quartz requires Node 22 or higher as of the current version. Open a terminal and run these commands one at a time, in the directory where you keep your code projects.

```
git clone https://github.com/jackyzha0/quartz.git garden
cd garden
npm install
npx quartz create
```

When `npx quartz create` runs, it asks you a few questions. The defaults are reasonable. When it asks how to initialize content, choose "Empty Quartz" so you start clean rather than with the example notes. When it asks about link resolution, choose "Treat links as shortest path." This makes wiki-link syntax work the way Obsidian users expect.

Now point this directory at your new repo. Run:

```
git remote remove origin
git remote add origin https://github.com/hris28/garden.git
git branch -M main
```

This severs the link to the upstream Quartz repo (so you can push to your own) and renames the default branch.

## Step 3: Configure Quartz for the repo path

Open `quartz.config.ts` in your editor. Find the `baseUrl` field and set it to `hris28.github.io/garden`. This tells Quartz that the site lives at a subpath, which is essential for asset URLs to resolve correctly. It will look something like:

```
baseUrl: "hris28.github.io/garden",
```

While you are in this file, also set `pageTitle` to something like "Hrishika's Garden" or whatever you want to call it, and update `cdnCaching` to `true` so static assets cache properly. You can adjust theme colors here too, but I would leave that for after the first article is up.

## Step 4: Set up the GitHub Actions workflow

In your `garden` directory, create a file at `.github/workflows/deploy.yml`. The contents are standard for Quartz on GitHub Pages and look like this:

```
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
      - name: Install dependencies
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
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Save it.

## Step 5: Write your first article

Create a file at `content/index.md`. This is the home page of the garden. Keep it short for now: a one-paragraph orientation, a sentence about what the garden is for, and a couple of links to articles you will write next. Front matter at the top, between two `---` lines, with title and date.

Then create a file at `content/cookies-and-tracking.md`. This will be your first real article, drawn from the cookies content in your earlier work. The front matter should look like this:

```
---
title: How websites track you, mechanically
description: What actually happens with cookies, pixels, and fingerprints when you visit a site, with sources reviewed.
date: 2026-04-25
lastReviewed: 2026-04-25
nextReview: 2026-10-25
readingTime: 12 minutes
tags:
  - tracking
  - networking
  - foundational
---
```

The `lastReviewed`, `nextReview`, and `readingTime` fields are not standard Quartz fields. Quartz will accept them in the front matter without complaint but it will not display them on the rendered page until you tell it to. We will fix that in step 7. For now, write the article body in Markdown. Use wiki links with the `[[ ]]` syntax for any other articles you intend to write later. Quartz will create unresolved links visibly so you can see your own writing backlog.

## Step 6: First push and first build

In the garden directory, run:

```
git add .
git commit -m "Initial Quartz scaffold and first article"
git push -u origin main
```

Now go to your repo on github.com, click Settings, click Pages in the left sidebar, and under Source select "GitHub Actions." This tells GitHub Pages to use the workflow you wrote rather than the default Jekyll behavior. Save.

Click Actions in the top nav of the repo. You should see your push triggered a workflow run. Watch it. If it succeeds, the site is live at `hris28.github.io/garden/`. If it fails, the most common causes are a malformed front-matter block (missing colon or unescaped quote in the description), a baseUrl mismatch in `quartz.config.ts`, or a Node version mismatch. The error log in the Actions tab will tell you which.

Visit `hris28.github.io/garden/` in your browser. You should see your home page with a link to your first article. Click through. Confirm the article renders. If wiki links to articles you have not written yet appear and look broken, that is the expected behavior; Quartz renders them as unresolved.

## Step 7: Make the custom front-matter fields visible

Quartz lets you customize the page header through its component system. The relevant file is `quartz/components/ContentMeta.tsx`. Open it. You will see a function that renders the date, reading time, and tags at the top of each page. Add code that reads `lastReviewed` and `nextReview` from the front matter and renders them. Quartz exposes front matter as `fileData.frontmatter`, so the syntax is `fileData.frontmatter?.lastReviewed`.

Without going into the full TypeScript here, the addition is a few lines. If you push the change and the build succeeds, your articles now show "Last reviewed" and "Next review due" on the page. If you want, I can write out the exact TSX for the modification in a follow-up; it depends on which Quartz version you scaffolded and whether you are comfortable with TypeScript.

## Step 8: Update the portfolio garden.html

Edit `garden.html` in your `hris28.github.io` repo. Replace the placeholder content with a redirect to the new garden, or with a short page that links to it prominently. For a clean redirect, put this in the head of the existing page:

```
<meta http-equiv="refresh" content="0; url=https://hris28.github.io/garden/">
```

Or, if you would rather not redirect and would prefer a small landing page that says "the garden lives here" with a link, that is fine too. Either way, push the change. The reader who clicks Garden in your portfolio nav now ends up at the right place.

## What you have when this is done

A working garden at `hris28.github.io/garden/`. One real article in it. The publishing pipeline is GitHub Pages building Quartz on every push. Wiki links work natively. Pop-over previews on internal links work natively. Backlinks work natively. The graph view is at `/garden/explorer` or wherever Quartz puts it, also working natively. You write a new article by adding a new Markdown file to `content/`, pushing, and waiting two minutes for the build.

That is the floor. The rest is iteration.

---

## Features to add, in order of priority

You named several features you wanted and I want to evaluate each one against your goals and the time it takes. Then I will suggest a few you did not name.

### What you already have or get for free with Quartz

The page-last-updated date you mentioned having on your portfolio is automatic in Quartz; every article shows its last-modified date pulled from git history. The toggleable dark mode is built in. The search bar is built in and works against the full text of all your articles. Tags are built in, including a tag index page that lists every tag and the articles under it. The graph view of related articles is built in and is one of Quartz's distinctive features. You said you wanted these and they are already there.

### Length-of-read

The cleanest way to do this is to put a `readingTime` field in the front matter, since you know your own article better than an automatic word-counter does. The harder way is to compute it automatically based on word count. Quartz has a community plugin for this. I would recommend the manual front-matter approach for the first dozen articles because it is less likely to break, and only switch to automated computation if you find yourself forgetting to set it. Either way, the field needs to be surfaced in the same component you modify in step 7 above.

### Colored tags

Quartz tags are uniform by default. To color them, edit the tag-rendering component and apply a CSS class based on the tag value. There is an obvious way to do this where each tag gets its own class and you write CSS for each, and a slightly cleverer way where tags belong to categories and the categories carry the color. The category approach scales better. If you have tags like "tracking," "networking," "tools," "history," group them into clusters and color the clusters. Tools-related tags one color, networking another, history another. The reader scanning the index can recognize the type of article visually.

### Small navigatable table of contents

Quartz has a table-of-contents component built in. It generates a TOC from the headings of each article and displays it as a sidebar that highlights the current section as the reader scrolls. Enable it in `quartz.config.ts` under the rightSidebar layout. This gives you the small navigatable TOC for free.

### Article version archive

This one needs more thought. You said you wanted to track previous versions of articles and surface them. The good news is that git already does this for you on every push, and Quartz can expose git history as a "history" link on each page through a community plugin, or you can write the link manually. The cleaner version of what you described is a `revision history` link at the bottom of each article that goes to the GitHub commit history for that file. That is one line of HTML in the page footer template. Anyone clicking it sees every version you have published, with timestamps and diffs. This is more honest and more comprehensive than a manual version archive and requires no extra work from you.

### Demonstrations when appropriate

This is content rather than infrastructure. The givemeyourdata.org embed style, where a live demo runs in the reader's own browser to show a concept rather than just describing it, is the gold standard for this kind of content and is exactly the same pattern Habibullah is using on his Kits/System page. You can build similar demos as separate HTML files in your portfolio repo (since the portfolio is hand-written HTML and JavaScript already works there), or as embedded pages in Quartz using its support for HTML in Markdown. Either approach works. The first time you write an article that needs a live demo, we can build the demo as a small standalone page and embed it.

### Hover preview for external links

You asked about a third-party preview API. The two reputable options are microlink.io (free tier, paid tiers for higher volume) and linkpreview.net. Both work the same way: a JavaScript snippet on your page watches for hover events on outgoing links, calls the API with the link URL, and renders the returned screenshot in a tooltip. The privacy cost is real. Every hover sends the URL the reader is hovering over to the API provider. For a privacy-themed garden this is a tension. Two ways to handle it: either accept the trade and disclose it on a privacy page (the garden uses microlink.io for external link previews; here is what they see and why we chose it), or pre-generate previews at build time only for sources you cite frequently and skip the on-demand API entirely. I would do the second for any source review you write yourself, because the screenshot stays consistent and you control it, and skip the on-demand version for now. If at some point you find yourself wanting previews for every external link, the microlink approach with a disclosure is honest enough to fit the garden.

A third option I would not have mentioned earlier: Quartz's native popover already works for internal wiki links, which means that if you write your source reviews as separate pages in the garden and link to them with wiki-link syntax, the reader hovering gets a native preview of your review of the source rather than a screenshot of the source itself. This is arguably better than either alternative because the reader sees what you concluded about the source rather than what the source looks like. Worth considering as a structural choice.

### Things you did not list that might be worth adding

A privacy notice in the footer that affirms the garden does not track readers, links to the article that explains why, and is verifiable through Cover Your Tracks or givemeyourdata.org or any other tool the garden discusses. Walks the talk and turns the site itself into evidence.

A "stub" tag for articles you have started but not finished. Quartz will let you publish them so the wiki links resolve, and the tag tells readers the article is incomplete. This solves the problem of broken wiki links while you are building out the garden, and it tells the reader honestly what they are looking at.

A simple sources index page at `/garden/sources/` that lists every source you have cited across the garden, with the structured review notes attached to each. This is a high-effort feature for the long term, but small to start: just a Markdown file with the source list. As articles cite sources, you append to this page. It is essentially a meta-archive of the source-evaluation work the garden is built on.

A reader-facing "how this site works" page at `/garden/about/` or similar, explaining the source-review template, the last-reviewed dates, the open license, and what makes the garden different from a typical privacy blog. This is one article you should write early because it sets reader expectations and earns trust.

The one feature from Habibullah's Kits page worth adapting: a small set of in-browser tools that double as demonstrations. His password generator, IP subnet calculator, QR code maker. For your garden, the analogues would be a browser fingerprint inspector built on the same patterns as givemeyourdata.org, a UTM parameter inspector that shows what a tracking URL is hiding, a header inspector that shows what your browser is sending. Each one is a single small page and each one demonstrates a concept the garden teaches. Treat this as a Kit category to expand into over time, not as something for tonight.

### Tables for tool reviews

Markdown supports tables natively and Quartz renders them. The syntax is:

```
| Tool | What it does | Cost | Funding |
| --- | --- | --- | --- |
| Tool A | description | free | open source |
| Tool B | description | $20/mo | venture-backed |
```

For more complex comparison matrices, you might eventually want a custom component that renders structured data better than Markdown tables can. For now, Markdown tables are sufficient for the first ten or twenty tool reviews. If you find yourself wanting more, we can add a custom comparison-table component to Quartz.

---

## What you can do tonight, in order

Run steps 1 through 6. That gets you a working garden at the URL you wanted, with one real article in it. Forty-five minutes if everything goes smoothly, two hours if something in the GitHub Actions build fails the first time. Step 7 (custom front matter rendering) and step 8 (updating the portfolio garden.html) are best-saved-for-tomorrow once you have confirmed the basic deployment works.

The features list above is for after the deployment is working. Do not try to set them all up tonight. Get the deployment up first. Once one article is published and visible, the rest of the work is incremental.

If anything in steps 1 through 6 fails, paste the error message and the command you ran into our next message and I will walk you through the fix.

Last reviewed: April 25, 2026.
