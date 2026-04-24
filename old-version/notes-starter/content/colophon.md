---
title: "Colophon"
date: 2026-04-23
tags:
  - meta
description: "How this site is built."
---

This site is built with [Quartz](https://quartz.jzhao.xyz), a static
site generator designed for digital gardens. Notes are plain markdown
files in a GitHub repo; a GitHub Actions workflow rebuilds the site on
every push.

## Stack

- **Quartz 4** for the build
- **GitHub Pages** for hosting, at `hris28.github.io/notes`
- **Obsidian** for writing locally (optional — any markdown editor works)

## Design

The visual language is intentionally minimal — black text on white,
one serif for reading, one sans-serif for headers, nothing else. Links
are underlined without colour, because colour in a knowledge garden
should mean something specific, and here it doesn't need to.

The layout hides the file-tree explorer and graph view that Quartz
offers by default. What's left: a search box, a dark-mode toggle,
backlinks, and a table of contents when the page is long enough to
need one.

## Source

The notes themselves live at
[github.com/hris28/notes](https://github.com/hris28/notes). Everything
— config, layout, styles — is in that same repository, so the whole
site is reproducible from the repo alone.

The portfolio site at [hris28.github.io](https://hris28.github.io/) is
a separate project in a separate repository. This is deliberate: the
portfolio is curated, and this space is allowed to be rough.
