---
title: "How to Evaluate a Privacy or Security Source"
date: 2026-05-01
lastmod: 2026-05-01
stage: flower
tags: [research, trust, sources, osint, beginner]
description: "Privacy and security information comes from sources with very different incentives. Here is how to tell them apart."
next_review: 2027-05-01
---

<p class="eyebrow">Research · OSINT</p>

# How to Evaluate a Privacy or Security Source

The privacy and security information landscape has a structural problem: a significant portion of what ranks well in search results is written by people who profit from your fear. VPN companies publish guides to ISP surveillance. Antivirus vendors publish articles about malware. Password manager companies publish content about credential breaches. The information in these articles is often technically accurate. The threat is often real. But the framing systematically overstates urgency, and the conclusion of almost every article is a recommendation to buy or install the author's product.

This is not unique to security. But the domain is one where motivated reasoning and accurate information look identical if you do not know what to look for.

This checklist covers what to look for before relying on a source.

## Who wrote this, and why

The first question is about incentive, not competence. A technically expert author with a financial stake in a particular conclusion will produce accurate information framed to support that conclusion. An accurate but incomplete answer can be as misleading as an inaccurate one.

Ask: does this organization sell a product or service in the category they are writing about? A VPN company writing about DNS privacy, an antivirus vendor writing about malware, or a hosting company writing about server security all have a structural incentive to make the problem sound more severe than it might be for your specific situation.

This does not mean their content is wrong. It means you should look for the limits they do not mention, because those limits are where their product would be recommended.

Look for: nonprofit organizations funded by donations or grants (EFF, Privacy Guides, Internet Society, EPIC), government agencies in their jurisdictions (FTC, NIST, CISA for US standards), academic researchers with no product affiliation, and independent developers who maintain open-source tools.

Be skeptical of: VPN review sites (almost universally affiliate-funded), corporate security blogs, compliance vendor content, and any article where every section ends with a product recommendation.

## Is the date visible, and does it matter for this topic

Privacy and security information ages quickly. A 2019 article about browser privacy may describe a landscape that no longer exists: browsers have added default third-party cookie blocking, new APIs have been introduced, and ad networks have shifted from cookie-based to server-side tracking.

Look for: a clear publication date and ideally a last-updated date. Articles that reference specific products or technical specifications need dates.

Be skeptical of: undated content, especially for tool recommendations. An undated VPN recommendation may be three years old.

For conceptual content (what a cookie is, how DNS works) the publication date matters less because the mechanisms themselves are stable. For specific tool recommendations or legal information the date matters a great deal.

## Does the article name its own limits

A source that explains what a mechanism does without explaining what it does not do is incomplete in a way that can actively mislead. If an article about DNS-over-HTTPS does not mention that the resolver still sees your queries and that SNI still leaks the domain to your ISP, the article is technically accurate but practically misleading.

Look for: articles that explicitly address the limitations of the thing they are recommending. Privacy Guides does this consistently. EFF's Surveillance Self-Defense is built around threat models specifically so that limitations are visible.

Be skeptical of: articles where every section reinforces the same conclusion without qualification. Real privacy tools have trade-offs. An article that presents no trade-offs is not giving you the full picture.

## Can the claims be traced to a primary source

Many privacy articles cite each other in a chain that eventually leads nowhere verifiable. A claim like "ISPs sell your browsing data to advertisers" may be true for some ISPs in some jurisdictions, but needs a primary source to assess scope and accuracy.

Look for: links to original documentation, primary research, official standards (RFCs), regulatory filings, or first-party policy documents. The Internet Society's DNS privacy documentation links to the relevant RFCs. EPIC's data broker page links to FTC reports and congressional testimony.

Be skeptical of: articles that assert facts without citations, that cite other articles of the same type rather than primary sources, and that use phrases like "experts say" or "studies show" without naming the experts or studies.

## Is the scope of the claim appropriate to the evidence

Privacy coverage frequently slides between individual technical facts and broad societal claims. "This tracker collects your IP address" is a narrow, verifiable claim. "The internet is surveilling your every move" is not. Both may appear in the same paragraph.

Look for: claims that are specific enough to be falsified. "Cloudflare's 1.1.1.1 resolver retains query data for 25 hours per their privacy policy" is specific and verifiable. "Big tech companies spy on you constantly" is not.

Be skeptical of: dramatic language that generalizes from a specific and accurate observation to a broader claim that the specific observation does not actually support.

## A practical workflow

When you encounter a privacy or security recommendation:

Find out who is making it and whether they sell a product in this category. If yes, note the conflict of interest and look for the limits they do not mention.

Find the publication date. If it is more than two years old and involves specific tools or regulations, treat it as a starting point rather than a conclusion.

Search for a source that disagrees with the recommendation and understand why. The counterargument usually reveals what the original article omitted.

Trace one specific claim to its primary source. If you cannot find the chain, that is informative.

Ask what the recommendation does not protect against. Every security or privacy tool has a specific threat model. A tool that is excellent against one threat may be irrelevant to another.

## Sources that consistently apply these standards

**Privacy Guides** (privacyguides.org) — Community-maintained, no advertising, transparent editorial policy, named authors. Explicitly states threat models for each recommendation. When a tool is only useful for some users, they say so. When something is commonly overclaimed, they push back. The closest thing to a rigorous consumer-facing reference in this space.

**EFF Surveillance Self-Defense** (ssd.eff.org) — Organized by threat model and audience. Nonprofit, no product to sell. Some sections less current than others; check dates.

**Internet Society** (internetsociety.org) — Standards-focused nonprofit. Reliable on protocol-level questions. Less accessible than the above but authoritative.

**MDN Web Docs** (developer.mozilla.org) — Multi-stakeholder technical reference for web standards. Authoritative on how browsers and web protocols actually work. Written for developers.

**The Markup** (themarkup.org) — Investigative journalism with disclosed methodology. Publishes original research on tracking, ad-tech, and platform behavior. Sources its claims and publishes methods.

**EPIC** (epic.org) — Digital rights advocacy organization. Advocacy framing they are open about. Policy-focused rather than technical. Good for understanding the legal and regulatory landscape around data collection.
