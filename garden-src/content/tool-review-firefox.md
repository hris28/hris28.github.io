---
title: "Tool Review: Mozilla Firefox"
date: 2026-05-02
lastmod: 2026-05-02
stage: sprout
tags: [tools, browser, privacy, review]
description: "Firefox is the only major browser not controlled by an advertising company. Here is what that means in practice, what it does well, and what configuration actually changes."
next_review: 2027-05-01
---

<p class="eyebrow">Tool Review · Browsers</p>

# Mozilla Firefox

| | |
|---|---|
| **Type** | Web browser |
| **Developer** | Mozilla Foundation / Mozilla Corporation |
| **Platforms** | Windows, macOS, Linux, Android, iOS |
| **Cost** | Free |
| **License** | MPL-2.0 (open source) |
| **Source code** | hg.mozilla.org/mozilla-central |
| **Last reviewed** | May 2026 |
| **Recommended for** | Most desktop users who want meaningful default privacy protections |

---

## What it is

Firefox is a web browser. It renders pages, runs JavaScript, stores bookmarks, and does everything users expect of a modern browser. The reason it appears on privacy-oriented tool lists is structural rather than feature-based: Firefox is the only widely-used browser not owned or substantially controlled by a company whose core business model depends on advertising and data collection.

Google Chrome is made by Google. Microsoft Edge is made by Microsoft, whose advertising and cloud businesses depend on behavioral data. Safari is made by Apple, which is the most privacy-aligned of the large platforms but still a hardware-and-services company with its own data interests and walled-garden incentives. Brave is built on Chromium, Google's open-source browser engine, and has its own advertising product. Firefox is made by Mozilla, a nonprofit organization whose stated mission is to keep the internet open and accessible.

This does not make Firefox automatically superior in every measurable dimension. It means the incentive structure is different, and incentives drive defaults.

## Who built it

Mozilla Corporation is a wholly-owned subsidiary of the Mozilla Foundation, a nonprofit organization incorporated in 2003. The Foundation owns the trademarks and sets the mission. The Corporation employs most of the engineers and generates revenue, primarily through search engine default agreements (the Google default search in Firefox has historically been Mozilla's largest revenue source, a dependency that has drawn legitimate criticism).

Mozilla publishes its financial records. Its 990 tax filings are publicly available and show that the majority of revenue comes from royalties and search partnerships. The organization is not large by tech-company standards: a few hundred full-time engineers, compared with thousands at Google or Apple. This scale affects how quickly Firefox can implement new web standards and how thoroughly it can respond to security vulnerabilities.

The browser engine, Gecko, is entirely Mozilla's own development. This is significant because every Chromium-based browser (Chrome, Edge, Brave, Opera, Vivaldi) uses Google's Blink rendering engine. Firefox is the only major browser that provides a non-Chromium implementation of the web, which matters for web standards diversity: a world where all browsers share one engine is a world where Google effectively controls what the web can do.

## What it does that other browsers do not by default

### Enhanced Tracking Protection

Firefox ships with Enhanced Tracking Protection (ETP) enabled by default in Standard mode. ETP blocks third-party cookies from known trackers, blocks tracking scripts identified in Disconnect.me's block list, blocks cryptominers and fingerprinters identified by the same list, and isolates cookies per site (Total Cookie Protection) to prevent cross-site tracking even from trackers that are not on the block list.

Total Cookie Protection, introduced in 2021 and enabled by default since Firefox 86, is the most significant privacy feature here. In every other browser, cookies are stored in a shared jar. A third-party cookie set on Site A is available when Site B loads a resource from the same domain. Total Cookie Protection gives each site its own separate cookie jar, so the third-party cookie set on Site A when loading an advertiser's script is not visible when you visit Site B later. The cross-site tracking mechanism that has driven behavioral advertising for two decades simply does not work in the same way.

### First-party isolation on request headers

Firefox strips tracking parameters from URLs when navigating between pages in certain contexts. UTM parameters, GCLID, FBCLID, and similar values are not stripped automatically in default mode, but Firefox's URL handling is more conservative than Chrome's in several respects.

### Manifest V2 extension support

Firefox continues to support the Manifest V2 extension API, which allows content blockers like uBlock Origin to use the full declarative and dynamic network request filtering interface. Chrome has moved to Manifest V3, which limits what content blockers can do and has been criticized as a change that serves Google's advertising business as much as it serves security. Firefox's maintenance of MV2 means full-capability uBlock Origin can only run on Firefox among the major browsers.

## Configuration that matters

Default Firefox is meaningfully better than default Chrome for privacy. Hardened Firefox is considerably stronger. The most impactful configuration changes are:

**Switch ETP to Strict mode.** Settings, Privacy and Security, Enhanced Tracking Protection, select Strict. This enables blocking of more fingerprinters and cross-site tracking cookies. Some sites may break; most do not.

**Enable DNS-over-HTTPS.** Settings, Privacy and Security, scroll to DNS over HTTPS, enable it and select a provider. This encrypts your DNS queries so your ISP cannot read them in transit. The trade-off is that the DoH provider you choose can see your queries. Cloudflare and Mullvad are common choices; Privacy Guides compares their logging policies.

**Install uBlock Origin.** This is not a Firefox-specific recommendation but it is enabled by full capability only on Firefox. See the [[tool-review-ublockorigin]] review.

**Consider `about:config` settings for fingerprinting resistance.** Setting `privacy.resistFingerprinting` to `true` enables a mode where Firefox standardizes or randomizes many values used for browser fingerprinting: canvas output, screen size, timezone, and others. This is the same approach Tor Browser uses. It can break sites and changes the user experience noticeably; it is recommended for users with higher threat models rather than general use.

**Disable telemetry.** Settings, Privacy and Security, Firefox Data Collection and Use, uncheck all options. Firefox collects telemetry by default. It is less extensive than Chrome's and Mozilla states it is not linked to individual identities, but disabling it is simple and complete.

## Strengths

**Gecko engine independence.** The only major non-Chromium browser. Firefox being healthy matters for web standards beyond any individual privacy feature.

**Total Cookie Protection.** The most effective default anti-cross-site-tracking feature in any major browser. It addresses the structural mechanism that makes third-party tracking possible without requiring the user to manage anything.

**Full uBlock Origin support.** The Manifest V2 preservation decision means Firefox provides the strongest environment for content blocking among widely-used browsers.

**Open source.** The source code is publicly auditable. Security researchers can and do review it.

**Customizability.** Firefox's extension ecosystem, `about:config` settings, and user-facing privacy controls give technically inclined users more direct control over browser behavior than any other major browser.

## Weaknesses

**Google revenue dependency.** Mozilla's financial reliance on Google for search revenue is a structural conflict of interest. Google funds the development of a browser that limits Google's tracking capabilities. This tension has not visibly compromised Firefox's privacy features, but it creates a risk that observers are right to note.

**Performance.** On some benchmark categories Firefox is behind Chromium-based browsers. For most everyday browsing this is not perceptible, but on JavaScript-heavy applications or when many tabs are open, the difference can be felt.

**Mobile.** Firefox on Android is a full browser with extension support including uBlock Origin, which no other mobile browser offers. Firefox on iOS is more limited: Apple's App Store policies require all iOS browsers to use the WebKit engine, so Firefox for iOS is effectively a re-skinned Safari for rendering purposes, though Mozilla's privacy features still apply at the network and storage layer.

**Site compatibility.** Occasionally a site is tested only against Chrome or Safari and behaves incorrectly in Firefox. This is less common than it was in 2015 but still happens.

## How it is used in practice

Firefox is the browser of choice in most privacy and security community tool stacks. EFF's Surveillance Self-Defense recommends it. Privacy Guides recommends it as the desktop browser for most users. Tails, the privacy-focused live operating system, ships Firefox ESR (Extended Support Release) as the default browser. The Tor Browser is built on Firefox.

Among journalists, researchers, and security professionals who need a privacy-oriented browser without the significant trade-offs of Tor Browser or the Brave advertising product, Firefox with ETP in Strict mode and uBlock Origin installed is the standard baseline configuration.

---

### Sources reviewed for this article

**Mozilla Firefox release notes and privacy documentation** (mozilla.org) — Primary source for Total Cookie Protection, ETP modes, and telemetry settings. Mozilla publishes detailed documentation on each privacy feature with implementation notes.

**Privacy Guides, Desktop Browsers** (privacyguides.org/en/desktop-browsers) — Community-maintained comparison of browser privacy defaults and configurations. Distinguishes clearly between what browsers do by default and what requires configuration. Current as of 2025.

**Mozilla's 990 filings** (available via ProPublica Nonprofit Explorer) — Public tax filings showing Mozilla Corporation and Foundation financials. Used for the revenue dependency analysis.

**EFF Surveillance Self-Defense, Choose Your Browser** (ssd.eff.org) — Threat-model-aware browser comparison. Good on the question of which browser is appropriate for which threat level.

**Manifest V3 and content blocking** (blog.mozilla.org/en/products/firefox/firefox-manifest-v3) — Mozilla's own explanation of why they continue to support Manifest V2 and what this means for extensions. Self-published but directly relevant to the uBlock Origin capability distinction.

(https://gist.github.com/RubenKelevra/fd66c2f856d703260ecdf0379c4f59db?utm_source=pocket_saves) - I haven't reveiwed this one too deeply yet because it takes a while to understand what everything means. But it does appear to have some very useful information for firefox users.