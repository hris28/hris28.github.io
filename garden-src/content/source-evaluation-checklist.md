---
title: "How to Evaluate a Privacy or Security Source"
date: 2026-05-01
lastmod: 2026-05-01
stage: flower
tags: [research, trust, sources, osint, beginner]
description: "Privacy and security information comes from sources with very different incentives. Here is how to tell them apart."
next_review: 2027-05-01
---

<p class="eyebrow">Research · OSINT · Cluster 00</p>

# How to Evaluate a Privacy or Security Source

The privacy and security information landscape has a structural problem: it is full of accurate-sounding content written by people who benefit from your conclusions. Compliance vendors write about cookie law. Antivirus companies write about malware. A significant portion of what ranks well in search results is written by people who profit from your fear. VPN companies publish guides to ISP surveillance. Password manager companies publish content about credential breaches. The information in these articles is often technically correct and selectively incomplete at the same time. The threat is often real. But the framing systematically overstates urgency, and the conclusion of almost every article is a recommendation to buy or install the author's product.

This is not unique to security. But the domain is one where motivated reasoning and accurate information look identical if you do not know what to look for. Knowing which questions to ask before trusting a source makes the difference between understanding a mechanism and being guided to a product.

This checklist covers what to look for before relying on a source.

## Who wrote this, and why

The first question is about incentive, not competence. A technically expert author with a financial stake in a particular conclusion will produce accurate information framed to support that conclusion. An accurate but incomplete answer can be as misleading as an inaccurate one.

Ask: **does this organization sell a product or service in the category they are writing about?** A VPN company writing about DNS privacy, an antivirus vendor writing about malware, or a hosting company writing about server security all have a structural incentive to make the problem sound more severe than it might be for your specific situation.

This does not mean their content is wrong. It means you should look for the limits they do not mention, because those limits are where their product would be recommended.

**What is the publisher's business model?** A VPN review site that earns affiliate commissions when you buy a VPN has a structural reason to recommend VPNs. A cybersecurity company that sells endpoint protection has a reason to emphasize threats that their product addresses. This does not make their content wrong. It makes it incomplete in a predictable direction.
 
**Who is the intended reader?** Most cookie explainers, tracking pixel explainers, and UTM parameter explainers are written for marketers and developers, not for the people being tracked. The explanation may be accurate while the framing is entirely operator-facing. Check whose interests the recommendations serve.
 
**Is the author named?** Anonymous content is harder to evaluate. Named authors with documented expertise are easier to check.

Look for: nonprofit organizations funded by donations or grants (EFF, Privacy Guides, Internet Society, EPIC), government agencies in their jurisdictions (FTC, NIST, CISA for US standards), academic researchers with no product affiliation, and independent developers who maintain open-source tools.

Be skeptical of: VPN review sites (almost universally affiliate-funded), corporate security blogs, compliance vendor content, and any article where every section ends with a product recommendation.

## Is the date visible, and does it matter for this topic

Privacy and security information ages quickly. A 2019 article about browser privacy may describe a landscape that no longer exists: browsers have added default third-party cookie blocking, new APIs have been introduced, and ad networks have shifted from cookie-based to server-side tracking.

Look for: a clear publication date and ideally a last-updated date. Articles that reference specific products or technical specifications need dates.

Topics that change fast and require recent sources:
 
- VPN logging policies and audit status
- Browser default settings and privacy features
- Advertising regulation (GDPR enforcement, state privacy laws)
- Specific tool recommendations
Topics that change slowly and tolerate older sources:
 
- Protocol mechanics (how DNS works, how TLS works)
- Hardware fundamentals
- Network architecture

For conceptual content (what a cookie is, how DNS works) the publication date matters less because the mechanisms themselves are stable. For specific tool recommendations or legal information the date matters a great deal.

## Does the article name its own limits

A source that explains what a mechanism does without explaining what it does not do is incomplete in a way that can actively mislead. If an article about DNS-over-HTTPS does not mention that the resolver still sees your queries and that SNI still leaks the domain to your ISP, the article is technically accurate but practically misleading.

Look for: articles that explicitly address the limitations of the thing they are recommending. Privacy Guides does this consistently. EFF's Surveillance Self-Defense is built around threat models specifically so that limitations are visible.

Be skeptical of: articles where every section reinforces the same conclusion without qualification. Real privacy tools have trade-offs. An article that presents no trade-offs is not giving you the full picture.

## What is the claim based on

Many privacy articles cite each other in a chain that eventually leads nowhere verifiable. A claim like "ISPs sell your browsing data to advertisers" may be true for some ISPs in some jurisdictions, but needs a primary source to assess scope and accuracy.

**Is there a primary source?** A claim about a VPN's logging policy should cite the provider's own terms of service and any independent audit. A claim about what HTTPS hides should be traceable to an IETF RFC or browser documentation. A claim about ISP data practices should cite actual regulatory filings or legislation.
 
**Is the source the primary source, or citing another secondary source?** An article that says "according to experts" without naming the experts is not a citable source. An article that links to a study is more trustworthy than one that summarizes a study it does not link.
 
**Can you verify the claim yourself?** For technical claims, this is often possible. If a source claims that your ISP can see your DNS queries, you can verify this against the IETF specification for DNS (RFC 1035) and the documentation for DNS over HTTPS (RFC 8484). If a source claims a specific browser blocks third-party cookies by default, you can check the browser's release notes or settings documentation.

Look for: links to original documentation, primary research, official standards (RFCs), regulatory filings, or first-party policy documents. The Internet Society's DNS privacy documentation links to the relevant RFCs. EPIC's data broker page links to FTC reports and congressional testimony.

Be skeptical of: articles that assert facts without citations, that cite other articles of the same type rather than primary sources, and that use phrases like "experts say" or "studies show" without naming the experts or studies.

## Is the scope of the claim appropriate to the evidence

Privacy coverage frequently slides between individual technical facts and broad societal claims. "This tracker collects your IP address" is a narrow, verifiable claim. "The internet is surveilling your every move" is not. Both may appear in the same paragraph.

Look for: claims that are specific enough to be falsified. "Cloudflare's 1.1.1.1 resolver retains query data for 25 hours per their privacy policy" is specific and verifiable. "Big tech companies spy on you constantly" is not.

Be skeptical of: dramatic language that generalizes from a specific and accurate observation to a broader claim that the specific observation does not actually support.

## Recognizing common patterns of selective accuracy
 
**The compliance explainer:** Written by a vendor selling a compliance solution. Accurate about what the law requires. Silent about whether compliance and actual privacy protection are the same thing. (They often are not.)
 
**The threat inflation piece:** Written by a security company. Accurate about a real threat. Silent about the base rate. A browser vulnerability that requires physical access to your device is a different threat than one that can be exploited remotely at scale.
 
**The affiliate review:** Written by a site that earns commission on purchases. May include accurate product comparisons. The ranking will favor products that pay higher commissions. Look for disclosure of affiliate relationships. Their absence is not evidence of their absence.
 
**The outdated explainer:** Accurately describes how something worked in 2017. Does not note that the mechanism changed. Commonly found for: Flash cookies, [Privacy Shield](https://en.wikipedia.org/wiki/EU%E2%80%93US_Privacy_Shield), early browser fingerprinting techniques, and specific VPN provider practices.
 
**The technically correct but framing-flipped explainer:** Explains UTM parameters from the advertiser's perspective. Explains cookies from the site operator's perspective. The mechanism description is accurate. The reader leaves understanding how to deploy tracking, not how to recognize or resist it.

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

## Reliable reference points by topic
 
These are not endorsements of everything each source publishes. They are organizations and projects whose methodology is documented, whose funding is disclosed, and whose errors are correctable.
 
**Network protocols:** [IETF RFCs](https://www.ietf.org/standards/rfcs/) are the primary source. For anything about how DNS, HTTP, TLS, or any internet protocol actually works, find the RFC. They are free and searchable.
 
**Browser behavior:** [MDN Web Docs](https://developer.mozilla.org/en-US/) is maintained by Mozilla, Google, Microsoft, and Samsung together. It is the most reliable cross-browser reference for web technology.
 
**Privacy and security tools:** [Privacy Guides](https://www.privacyguides.org/) is community-maintained, accepts no advertising, and documents its editorial criteria. The [EFF](https://www.eff.org/) is a nonprofit that publishes its methodology and accepts no payments from the tools it reviews.
 
**Fingerprinting:** [EFF Cover Your Tracks](https://coveryourtracks.eff.org/) and [AmIUnique](https://amiunique.org/) both publish their methodology. The EFF's source code is available for inspection.
 
**OSINT techniques:** [Bellingcat](https://www.bellingcat.com/) documents its methods case by case and publishes tutorials. [Exposing the Invisible](https://kit.exposingtheinvisible.org/) is a training resource maintained by Tactical Tech.
 
**US privacy law and ISP practices:** [EPIC](https://epic.org/issues/consumer-privacy/) and [EFF](https://www.eff.org/issues/privacy) both publish legal analysis with primary sources.

## A note on Wikipedia
 
[Wikipedia](https://en.wikipedia.org/wiki/Main_Page) is not a primary source. It is a useful starting point for finding primary sources, and the citations at the bottom of a well-maintained article often lead directly to the RFC, study, or legal document that establishes the underlying claim. The Wikipedia article itself should not be the end of the chain.
 
Wikipedia's reliability varies significantly by topic. Articles on established technical standards are generally reliable. Articles on active political or commercial controversies are less reliable.
 
## Using this checklist
 
The questions above do not need to be applied in full to every source. Apply them in proportion to the stakes of the claim. A source recommending a specific VPN or claiming that a specific browser is "the most private" warrants more scrutiny than a source explaining how DNS resolution works.
 
When a source fails multiple checks, it does not mean the information is wrong. It means the information needs to be verified against a source that passes more of them.
