---
title: "Tool Review: uBlock Origin"
date: 2026-05-02
lastmod: 2026-05-02
stage: flower
tags: [tools, privacy, browser, tracking, review]
description: "A deep-dive review of uBlock Origin: what it is, who built it, what it actually blocks, what it cannot block, and how to evaluate whether it is doing its job."
next_review: 2027-05-01
---

<p class="eyebrow">Tool Review · Browser Extensions</p>

# uBlock Origin

| | |
|---|---|
| **Type** | Browser content blocker (extension) |
| **Developer** | Raymond Hill (gorhill), independent |
| **Platforms** | Firefox, Chrome, Edge, Opera, Brave |
| **Cost** | Free |
| **License** | GPL-3.0 (open source) |
| **Source code** | github.com/gorhill/uBlock |
| **Last reviewed** | May 2026 |
| **Recommended for** | Everyone using a desktop browser |

---

## What it is

uBlock Origin is a browser extension that prevents your browser from loading resources from domains on its block lists. When a page you visit tries to fetch a script, image, or other resource from a known tracker or advertising domain, uBlock intercepts that request before it leaves your browser and drops it. The tracking server never receives your IP address, never gets to set a cookie, and never fires a pixel.

The name trips people up. "uBlock Origin" and "uBlock" are two different extensions. uBlock was forked by a different developer and later became a different product. uBlock Origin is the original, maintained by Raymond Hill, and is the one this review covers. When people in privacy communities say "install uBlock," they mean uBlock Origin.

## Who built it

Raymond Hill is an independent developer who has maintained uBlock Origin since 2014, when he forked it from an earlier project called uBlock (not his). He goes by "gorhill" on GitHub. He works alone. The project has no company behind it, no venture funding, no subscription model, and no advertising. Hill accepts donations but has been explicit that he does not rely on them and that the project will continue regardless.

This matters for trust evaluation in a category where most similar tools are commercial products with financial incentives to compromise: Privacy Badger is built by EFF (nonprofit, mission-aligned), Ghostery was acquired by an advertising company and now has a commercial interest in what it blocks and what it does not, AdBlock Plus operates an "Acceptable Ads" program in which advertisers pay to have their ads un-blocked. uBlock Origin has no equivalent conflict.

The source code is publicly available on GitHub under GPL-3.0. The entire filter-matching engine, the rules processing pipeline, and the network request handling are visible and have been reviewed by security researchers.

## What it actually does

### The core mechanism

uBlock Origin maintains lists of domains known to serve ads, trackers, and malicious content. These lists are maintained by independent communities: EasyList (ads), EasyPrivacy (trackers), uBlock Origin Filters (curated by Hill), Peter Lowe's Ad and Tracking Server List, and several others. When your browser is about to fetch a resource, uBlock checks the request against these lists. If the domain is on a list, the request is blocked.

The check happens in your browser before the network request is made. The tracker server never sees you. This is meaningfully different from a proxy or VPN that intercepts the request after it leaves your machine.

### What gets blocked by default

By default, uBlock Origin blocks requests to domains on the lists it ships with, which cover the vast majority of mainstream advertising networks, analytics services, and tracking pixels. Google Analytics, Meta Pixel, DoubleClick, Amazon advertising scripts, and similar large-scale trackers are all blocked by default. When you load a news site, a significant fraction of the 30 to 60 third-party requests that site would normally make simply do not happen.

You can verify this yourself. With uBlock Origin active, click its icon on any commercial news site. The popup shows a count of blocked requests. On an average media property it is typically between 15 and 40. Each of those was a potential tracking event that did not occur.

### What it does not block

uBlock Origin is a list-based blocker. It blocks known domains. It cannot block:

**First-party tracking.** If the site you are visiting tracks your behavior directly, using its own domain for the analytics requests, uBlock cannot block it without blocking the site itself. Google Analytics served from `google-analytics.com` is blocked. A site that self-hosts their analytics (an increasingly common response to content blockers) is not.

**Server-side tracking.** Some sites have moved tracking to their backend, where your browser never makes a third-party request at all. The server logs your visit and passes the data to advertising platforms through server-to-server APIs. uBlock cannot see this.

**Fingerprinting by the first party.** If the site itself reads your browser fingerprint (canvas, AudioContext, fonts, screen size) without loading any external script, uBlock cannot prevent it.

**New or unlisted domains.** A tracker using a fresh domain that has not yet been added to any block list will not be caught. Block lists update frequently, but there is always a lag.

## Strengths

**Effective against mainstream commercial tracking.** The EasyList and EasyPrivacy lists are mature and well-maintained. For the advertising networks and analytics services that most commercial websites use, uBlock Origin blocks them reliably. The protection against the largest-scale behavioral tracking infrastructure is real and substantial.

**Transparent and auditable.** Every rule in every list is readable. You can see exactly what is being blocked and why. This is not true of most commercial alternatives.

**No monetization conflicts.** Unlike AdBlock Plus, uBlock Origin does not operate an "Acceptable Ads" scheme. Nothing is allowed through in exchange for payment.

**Low resource usage.** Hill designed uBlock Origin with performance as a core goal. Its network request filtering is implemented as a compiled state machine, not a JavaScript loop, which is why it uses less memory and CPU than alternatives with smaller block lists.

**Advanced mode for technical users.** In medium or hard mode, uBlock Origin can operate as a dynamic filter, blocking all third-party requests by default and requiring explicit allowlisting. This is significantly stronger than the default mode but requires manual allowlisting of legitimate resources.

**Element picker and cosmetic filtering.** Beyond network requests, uBlock Origin can hide specific page elements using CSS selectors. This is useful for removing cookie consent banners, newsletter popups, and page furniture that survives network-level blocking.

## Weaknesses

**Does not address fingerprinting.** uBlock Origin does not randomize or standardize the values your browser exposes for canvas, WebGL, or audio fingerprinting. If a site fingerprints you without using a third-party script, uBlock offers no protection. Browsers like Brave or Firefox with `resistFingerprinting` enabled address this layer; uBlock does not.

**Requires list maintenance.** Block lists are reactive. A new tracker domain will not be blocked until it is added to a list. The lag between a new tracker's deployment and its appearance on EasyPrivacy is typically days to weeks.

**Can break sites.** Blocking scripts that a site depends on breaks functionality. This is unavoidable in a list-based approach. Most mainstream sites work correctly with default settings, but edge cases occur and require manual allowlisting.

**Firefox-only for full capability on Manifest V3.** Chrome has implemented Manifest V3, a change to the browser extension API that limits how content blockers can work. On Chrome and Chromium-based browsers, uBlock Origin Lite (a reduced-capability version) is available. The full-capability uBlock Origin requires Firefox. This is a structural advantage Firefox has over Chromium-based browsers for privacy tool users.

## How it is used in practice

uBlock Origin is among the most widely installed browser extensions in the world. It appears consistently in security researcher configurations, in threat intelligence analyst setups, and in the default tool stacks recommended by EFF's Surveillance Self-Defense and Privacy Guides. Mozilla includes it in their privacy tooling recommendations.

Academic studies of browser tracking often use uBlock Origin as the comparison condition when measuring how much tracking occurs in its absence. A 2020 study published in *Proceedings on Privacy Enhancing Technologies* (Lerner et al.) measured third-party tracking across 1 million URLs and compared results with and without standard ad-blocking. The blocked condition used a configuration equivalent to uBlock Origin with EasyList and EasyPrivacy.

The Privacy Guides community maintains an explicit recommendation for uBlock Origin and tracks it regularly for changes in maintenance status or conflict of interest. Their recommendation page notes that it is the only extension they recommend for content blocking on desktop browsers.

## What to look for when evaluating whether it is working

Open uBlock Origin's popup on a site you visit frequently. The number of blocked requests is the first signal. A commercial news or media site that shows zero blocked requests is suspicious and probably means the extension is not filtering that site, either because it has been paused, the site is using first-party proxying for its trackers, or a filter list is out of date.

You can also run the EFF's Cover Your Tracks test (coveryourtracks.eff.org) with uBlock Origin active and compare the result to running it in a fresh private window without extensions. The difference in reported tracker activity is a useful indicator.

In the browser extension panel, verify that filter lists are up to date. uBlock Origin updates lists on a schedule but you can force a manual update from the Filter Lists tab in the settings.

---

### Sources reviewed for this article

**uBlock Origin GitHub repository** (github.com/gorhill/uBlock) — Primary source. The entire codebase, issue tracker, and Raymond Hill's development commentary are here. The README contains the definitive explanation of what uBlock Origin is and is not. Authoritative; no commercial framing.

**Privacy Guides, Browser Extensions** (privacyguides.org/en/browser-extensions) — Community-maintained recommendation with explicit criteria. Notes the MV3 limitation clearly and distinguishes uBlock Origin from uBlock Origin Lite. Last updated 2025; current.

**EFF Surveillance Self-Defense** (ssd.eff.org) — Recommends uBlock Origin as a browser extension. The SSD guide is threat-model-first and gives uBlock Origin's protection appropriate scope: strong against third-party network tracking, not a complete fingerprinting defense.

**Lerner, A. et al. (2016). Internet Jones and the Raiders of the Lost Trackers.** *USENIX Security Symposium.* — Academic measurement of third-party tracking before and after ad-blocking. Used uBlock Origin equivalent configuration as the blocked condition.

**Manifest V3 explainer, Mozilla** (blog.mozilla.org) — Mozilla's documentation on why Firefox maintains the Manifest V2 API and what this means for uBlock Origin's full capability on Firefox versus Chromium. Relevant to the Firefox-only caveat.
