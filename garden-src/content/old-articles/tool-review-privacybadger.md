---
title: "Tool Review: Privacy Badger"
date: 2026-05-02
lastmod: 2026-05-02
stage: flower
tags: [tools, browser, tracking, privacy, review]
description: "Privacy Badger takes a different approach to blocking trackers than uBlock Origin. Here is how its learning algorithm works, what it catches that lists miss, and when to use it alongside or instead of a list-based blocker."
next_review: 2027-05-01
---

<p class="eyebrow">Tool Review · Browser Extensions</p>

# Privacy Badger

| | |
|---|---|
| **Type** | Browser extension (tracker blocker) |
| **Developer** | Electronic Frontier Foundation (EFF) |
| **Platforms** | Firefox, Chrome, Edge, Opera |
| **Cost** | Free |
| **License** | GPL-3.0 (open source) |
| **Source code** | github.com/EFForg/privacybadger |
| **Last reviewed** | May 2026 |
| **Recommended for** | Users who want a behavior-based complement to a list-based blocker; less essential if uBlock Origin is already running in medium mode |

---

## What it is

Privacy Badger is a browser extension made by the Electronic Frontier Foundation that blocks tracking scripts based on their behavior rather than their domain name. Where a list-based blocker like uBlock Origin maintains a database of known tracker domains and refuses to load resources from them, Privacy Badger watches for the pattern of a tracker across multiple sites and blocks it when that pattern is detected.

The distinction matters in one specific scenario: a new tracker domain that has not yet appeared on any block list. A list-based blocker will not catch it because it is not on any list. Privacy Badger may catch it if the domain behaves like a tracker — appearing on multiple unrelated sites and making requests that carry a common identifier — regardless of whether anyone has formally listed it.

## Who built it

The Electronic Frontier Foundation is a nonprofit digital rights organization founded in 1990, headquartered in San Francisco. EFF is the organization behind Cover Your Tracks (the browser fingerprinting test), HTTPS Everywhere (now deprecated, since major browsers handle HTTPS enforcement natively), the Let's Encrypt certificate authority project, and a substantial body of privacy and security policy advocacy.

EFF is funded by individual donations and grants. It does not sell products, does not run advertising, and does not have a commercial relationship with the ad industry. Privacy Badger has no "acceptable ads" program, no corporate exceptions, and no revenue component. The source code is publicly available under GPL-3.0.

## How the learning algorithm works

When you install Privacy Badger, it starts in a mostly passive state. As you browse, it observes third-party requests. When it sees a domain make requests that set or read cookies across three or more unrelated websites, it begins to apply restrictions.

The restrictions come in three levels Privacy Badger represents with slider colors:

**Green (allow).** The domain has not been observed tracking across sites. Resources load normally.

**Yellow (cookie block).** The domain has been seen on multiple sites but may be needed for functionality. Privacy Badger blocks third-party cookies and referrers but still loads the resource.

**Red (full block).** The domain has been confirmed as a tracker. The resource does not load at all, equivalent to what a list-based blocker does.

This graduated approach is intentional. A domain serving fonts that appears on many sites is not necessarily a tracker; Privacy Badger tries not to break legitimate shared infrastructure while still catching behavioral trackers.

## What Privacy Badger catches that lists miss

In practice, the overlap between Privacy Badger's blocks and EasyPrivacy's blocks is large. Most mainstream trackers have been on the lists for years. The specific advantage of the behavioral approach is the gap between when a new tracker is deployed and when it appears on a maintained list. A company that spins up a new tracking domain to evade list-based blockers will immediately appear on lists once identified, but in the window before that identification, only a behavioral blocker can catch it.

EFF's own research (published 2019, covering the first three years of Privacy Badger's deployment) found that Privacy Badger caught some trackers that were not on standard lists, primarily smaller ad networks and measurement services. The gap was not large for most users' everyday browsing, but it was nonzero.

## What Privacy Badger does not catch

**Fingerprinting.** Privacy Badger's heuristics watch for cookie-based cross-site tracking. A tracker that identifies users by fingerprinting instead of cookies does not set the cookie patterns Privacy Badger is looking for, and may not be detected. EFF added some canvas fingerprinting detection in later versions, but fingerprinting resistance is not Privacy Badger's strength.

**First-party tracking.** As with any third-party blocker, Privacy Badger cannot address tracking that a site does from its own domain.

**New trackers that do not match the heuristic.** Server-side tracking that does not involve third-party cookies or cross-site requests from a shared domain will not be detected by the behavioral algorithm.

## How it relates to uBlock Origin

The two tools take different approaches to the same problem and can run alongside each other without conflict on most browsers.

uBlock Origin is faster and more comprehensive against known trackers because its filter lists are extensive and well-maintained. Privacy Badger adds the behavioral layer that catches some trackers that have not yet appeared on any list. For a user with moderate privacy concerns and some technical comfort, running both is a reasonable configuration.

For a user running uBlock Origin in medium or hard mode (which blocks all third-party requests by default and requires allowlisting), the behavioral heuristic of Privacy Badger adds less because the default-block approach already prevents the requests Privacy Badger would learn from.

For a user who finds uBlock Origin's advanced modes too disruptive to their browsing, Privacy Badger's automatic graduated approach is less demanding while still providing meaningful protection.

## Changes in recent versions

Privacy Badger's 2020 update changed the way the learning algorithm works. Prior to the update, the algorithm learned from each user's own browsing. After the update, EFF ships Privacy Badger with a pre-trained list of trackers collected by EFF, and individual browsing continues to refine it. The rationale was that a fresh install before any learning had occurred was not protecting users, and that fresh-install protection was the more important guarantee for new users.

A secondary rationale was that the per-user learning created a fingerprinting surface: your Privacy Badger's learned state could, in theory, reveal something about your browsing history. Pre-training the model on EFF's data reduces this risk.

---

### Sources reviewed for this article

**Privacy Badger source code and documentation** (github.com/EFForg/privacybadger) — Primary source. The algorithm's implementation is readable in the source. EFF maintains a clear README explaining the behavioral heuristic and the 2020 learning model change.

**EFF, "Privacy Badger Learns to Block More Trackers"** (eff.org, 2019) — EFF's own research measuring what Privacy Badger catches that standard lists miss. Self-published but based on actual measurement data. The methodology is described, though not peer-reviewed.

**EFF, "Privacy Badger's New Approach to Stopping Fingerprinting"** (eff.org, 2020) — Describes the pre-training change and the reasoning behind it. Includes the fingerprinting surface concern that motivated the change.

**Privacy Guides, Browser Extensions** (privacyguides.org/en/browser-extensions) — Current recommendation status. Privacy Guides notes that Privacy Badger is redundant if uBlock Origin is configured in medium or hard mode, which is the honest framing.
