---
title: "Garden Design Notes: How to Write Articles with Demos, Comparisons, and Layered Explanations"
date: 2026-05-02
lastmod: 2026-05-02
stage: seedling
tags: [meta, design, writing]
description: "Design patterns for articles that include live demonstrations, structured comparisons, and layered technical explanations."
---

<p class="eyebrow">Meta · Garden Design</p>

# Garden Design Notes: Demos, Comparisons, and Layered Explanations

This is a working document for how to structure articles that do more than explain. It draws from sites that do this well and from patterns that came up during the research sessions that seeded the garden.

The three reference points are:

- **givemeyourdata.org** — shows the reader their own data live, then explains what each field means
- **tldp.org/HOWTO/Unix-and-Internet-Fundamentals-HOWTO** — steps through a complex technical topic with a clear sequential structure and no assumed knowledge
- **privacyguides.org/en/basics/** — uses callout boxes, structured criteria tables, and explicit threat-model framing to make tool comparisons navigable

---

## Pattern 1: The live demonstration

### What givemeyourdata.org does

The page shows you the data immediately, before any explanation. The reader's IP address, User-Agent, browser capabilities, and referrer are all displayed at the top. Only after you have seen your own data does the page explain what each field means and how it can be used.

This order matters. Explanation after evidence is more effective than evidence after explanation. The reader has a concrete, personal thing to understand before they are told what to think about it. The explanation lands differently when you have already seen your IP address sitting on the page.

The site has one significant failure: the UTM parameter demonstration invites the user to do something without explaining what success looks like. The reader tries the demo, notices nothing changed, and concludes either that the demo broke or that nothing was supposed to change. There is no feedback. This is a design error that can be avoided by naming the invisibility explicitly: "you will not see anything change on screen — that is the point. The change happened on the server that logged your visit."

### How to implement this in Quartz

Quartz does not have a native interactive component system, but you can embed a simple HTML/JavaScript block in a Markdown file using a raw HTML passthrough. For a demonstration showing what a site can see from your browser, a small inline script can read and display browser properties:

```html
<div class="demo-block" id="browser-demo">
  <p class="demo-label">What this page can see about your browser right now:</p>
  <dl id="demo-output"></dl>
</div>

<script>
(function() {
  var data = {
    "User-Agent": navigator.userAgent,
    "Language": navigator.language,
    "Screen resolution": screen.width + " x " + screen.height,
    "Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    "Do Not Track": navigator.doNotTrack || "not set",
    "Cookies enabled": navigator.cookieEnabled ? "yes" : "no"
  };
  var dl = document.getElementById("demo-output");
  for (var key in data) {
    var dt = document.createElement("dt");
    dt.textContent = key;
    var dd = document.createElement("dd");
    dd.textContent = data[key];
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
})();
</script>
```

Add this CSS in `custom.scss`:

```scss
.demo-block {
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  font-family: var(--font-mono);
  font-size: 0.88rem;
}

.demo-label {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 0.75rem;
}

.demo-block dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 1.5rem;
  row-gap: 0.35rem;
  margin: 0;
}

.demo-block dt {
  color: var(--ink-soft);
  font-weight: 500;
}

.demo-block dd {
  color: var(--ink);
  margin: 0;
  word-break: break-all;
}
```

### Rules for demonstration articles

Name the invisibility. If a demo shows something the reader cannot see, say explicitly what is not visible and why. "Nothing changed in your browser — the change happened on a server you have no access to" is not obvious to a reader unfamiliar with the concept.

Show before you explain. Put the interactive element or the concrete example at the top, before the explanatory prose. The reader has something to think about while they read.

Explain what the reader just saw. After the demo, explain each data point: what it is, where it comes from, and how it can be used. The givemeyourdata.org approach of scrolling explanations beneath the data display is the right structure.

---

## Pattern 2: The layered technical explanation

### What tldp.org does

The Linux Documentation Project HOWTO series was written in the early 2000s for readers who were technically curious but had no assumed background. The anatomy of a computer article starts with the processor and memory, adds the bus, then describes how devices attach to the bus, then describes how they communicate. Each paragraph adds one concept and assumes everything introduced before it.

The structural discipline is what makes it readable. There is no jargon without an immediate definition. There is no forward reference. When the article says "controller card," it defines it in the same sentence. When the article later refers to the bus, the reader already has a working model of it.

The article is also honest about scope. It says "here are a few basic things to keep in mind about how they work together" before summarizing, not "here is everything you need to know."

### How to implement this in articles

Structure articles for a reader who does not know the term you are about to use. The test is: if someone stopped reading after the first occurrence of a technical term, would they have enough to understand what you just told them?

Use definition lists for terms being introduced. In Markdown:

```markdown
DNS resolver
: A server that handles the translation of domain names into IP addresses. Your device sends a DNS query to the resolver; the resolver returns the IP address of the server you asked about.
```

Quartz renders this as a styled definition list. Add CSS:

```scss
dl dt {
  font-weight: 700;
  margin-top: 1rem;
  color: var(--ink);
}

dl dd {
  margin-left: 1.5rem;
  color: var(--ink-soft);
  line-height: 1.65;
}
```

Use numbered steps for sequential processes. The DNS resolution chain, the TLS handshake, the sequence of events during a page load — these are all processes with a fixed order. Numbered lists preserve the order and make the sequence legible.

Use a "what you need to know first" callout at the top of articles that assume prior reading:

```markdown
> **Before this article:** This assumes you know what a DNS query is and why it matters for privacy. If you do not, read [[01-dns]] first.
```

---

## Pattern 3: Structured comparisons with explicit criteria

### What Privacy Guides does

The Privacy Guides recommendations pages do something most tool comparison articles do not: they state the criteria upfront, before the recommendations. The Cloud Storage page lists minimum requirements (must enforce E2EE, must offer a free plan, must support TOTP or FIDO2, must allow export of all files) and best-case criteria (should be open source, should be audited by an independent third party, should have native clients across platforms) before naming any specific tool. The reader can evaluate the recommendations against the criteria rather than just accepting the conclusion.

Each tool entry follows the same structure: a short prose description, a card with homepage link, source link, and download link, then supporting evidence for the recommendation (audit results, certifications, specific technical properties).

The page also includes a "Was this page helpful?" feedback mechanism at the bottom, which is simple and provides signal.

### How to implement this in Quartz

For tool comparison articles, use this structure:

**1. Threat model up front.** Which specific threats does this category of tool protect against? Which does it not?

**2. Criteria table.** Minimum requirements and best-case features, before any tool is named.

**3. Per-tool card.** Use the tool review table format established in [[tool-review-ublockorigin]]: type, developer, platforms, cost, license, source, logging policy, last reviewed, recommended for.

**4. Per-tool prose.** What it does, what makes it strong, what it leaves unaddressed.

**5. Comparison table.** For three or more tools in the same category, a summary table at the end allows side-by-side comparison of the properties that matter.

Example comparison table structure in Markdown:

```markdown
| Tool | Open source | Audited | Logs queries | Cost | Recommended |
|---|---|---|---|---|---|
| Mullvad VPN | Yes (client) | Yes (2024) | Claims no | Paid | Yes |
| ProtonVPN | Yes | Yes (2022) | Claims no | Free tier | Yes |
| ExpressVPN | No | Partial | Claims no | Paid | No |
```

**6. Criteria disclosure.** At the bottom: "We included tools in this comparison if they met the minimum criteria above. We removed tools if they failed any minimum requirement or if we could not verify their claims against primary sources."

---

## Visual patterns worth implementing

### Callout boxes

Privacy Guides uses four callout types: tip (blue), info (teal), warning (orange), danger (red). In Quartz, you can implement these with Obsidian-style callout syntax which Quartz renders natively:

```markdown
> [!tip] Enable Strict mode
> Firefox's default Enhanced Tracking Protection is Standard, not Strict. Strict mode blocks more fingerprinters. Go to Settings, Privacy and Security, and switch the mode.

> [!warning] This does not fix fingerprinting
> Content blockers prevent third-party tracking scripts from loading. They do not stop a site from fingerprinting your browser directly. See [[privacy-basics]] for what fingerprinting is and what defenses exist.

> [!info] Before you continue
> This article assumes you know what cookies are. If not, [[privacy-basics]] covers them.
```

### The "what this protects against" badge system

For tool reviews and articles about protective mechanisms, a small structured block at the top naming the specific threats addressed is more honest than a prose summary. Modeled on Privacy Guides' threat tagging:

```html
<div class="protects-against">
  <span class="protect-label">Protects against</span>
  <span class="protect-tag">Third-party tracking scripts</span>
  <span class="protect-tag">Tracking pixels</span>
  <span class="protect-tag">Known fingerprinting scripts</span>
</div>
<div class="protects-against does-not-protect">
  <span class="protect-label">Does not protect against</span>
  <span class="protect-tag unprotected">First-party fingerprinting</span>
  <span class="protect-tag unprotected">Server-side tracking</span>
</div>
```

CSS:

```scss
.protects-against {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.protect-label {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
  min-width: 12rem;
}

.protect-tag {
  font-size: 0.72rem;
  background: color-mix(in srgb, var(--accent) 15%, var(--bg));
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-pill);
}

.protect-tag.unprotected {
  background: color-mix(in srgb, #c0392b 10%, var(--bg));
  color: color-mix(in srgb, #c0392b 80%, var(--ink));
  border-color: color-mix(in srgb, #c0392b 25%, transparent);
}
```

### Inline "how we know this" links

For claims that require verification, the source can be linked inline with a small callout. This does not require a separate footnote system; it works by keeping source links in the prose itself and reserving the end-of-article "sources reviewed" section for qualitative assessment of each source's strengths and limits.

The rule: every claim that could be wrong should have a link to the primary source. Not a link to another article that makes the same claim. A link to the RFC, the audit report, the policy document, the academic study, or the official documentation that establishes the claim.

---

## What to avoid, drawn from specific failures observed during research

**Demos that do not tell you what success looks like.** The givemeyourdata.org UTM demo failure. Every demo needs a "here is what you should notice" instruction.

**Vocabulary without definitions.** The GeeksForGeeks DNS article introduced every DNS term correctly but without the hierarchy that would tell a reader which terms matter and which are reference material. A first read needs hierarchy; the reference layer can exist separately.

**Operator-facing explanations presented as user-facing ones.** Most cookie and pixel explainers are written for marketers achieving compliance. Their framing assumes you want to deploy tracking. Rewriting from the reader's perspective requires actively switching the subject of every sentence.

**Undated tool recommendations.** A 2018 article recommending a VPN based on a 2018 no-logs audit is not safe to republish without date-checking. Every tool recommendation in this garden has a last-reviewed date and a next-review date in its frontmatter.

**Conclusions without criteria.** "We recommend X" without stating what we evaluated X against. The criteria are the accountability mechanism.
