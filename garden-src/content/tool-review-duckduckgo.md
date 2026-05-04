---
title: "Tool Review: DuckDuckGo"
date: 2026-05-02
lastmod: 2026-05-02
stage: flower
tags: [tools, search, privacy, review]
description: "DuckDuckGo is the most commonly recommended private search engine. Here is what it actually protects, what it does not, and what its business model means for the user."
next_review: 2027-05-01
---

<p class="eyebrow">Tool Review · Search Engines</p>

# DuckDuckGo

| | |
|---|---|
| **Type** | Search engine and browser (separate products) |
| **Developer** | Duck Duck Go, Inc. |
| **Headquarters** | Paoli, Pennsylvania, USA |
| **Founded** | 2008 by Gabriel Weinberg |
| **Funding** | Venture-backed; profitable through contextual advertising |
| **Platforms** | Web (duckduckgo.com), iOS, Android, macOS, Windows (browser) |
| **Cost** | Free |
| **Source code** | Partially open source (browser); search engine is proprietary |
| **Last reviewed** | May 2026 |
| **Recommended for** | Most users as a default search engine; evaluate the browser separately |

---

## What it is

DuckDuckGo is primarily a search engine that does not build a behavioral profile on its users. When you search on DuckDuckGo, the company does not store your IP address, does not create a persistent identifier for your session, and does not use your past searches to personalize future results. You get the same results whether you have searched once or ten thousand times.

DuckDuckGo has also released a browser for mobile and desktop, a browser extension, an email forwarding service that strips tracking pixels, and an app tracker blocker for mobile. These are separate products with different properties and should be evaluated separately from the search engine.

## Who built it

Gabriel Weinberg founded Duck Duck Go as a one-person project in 2008, at a time when Google had already established itself as the dominant search engine. The company received venture funding from Union Square Ventures in 2011 and has grown to several hundred employees.

DuckDuckGo is a private company and does not publish financial statements. It has stated publicly that it is profitable through contextual advertising: ads based on the words in your current search query rather than your behavioral history. When you search for "best hiking boots," you see ads for hiking gear. Those ads are based on the search, not on a profile of your past behavior across the web.

The search engine itself is proprietary. DuckDuckGo licenses index data from Bing (Microsoft) and its own crawler, combines them, and applies its own ranking. This means that Microsoft has some degree of visibility into DuckDuckGo's traffic, a relationship that came under scrutiny in 2022 when a security researcher demonstrated that DuckDuckGo's browser was allowing Microsoft trackers to load on third-party sites. DuckDuckGo subsequently updated its browser to block those trackers, and the company's CEO acknowledged the prior exception publicly.

## What it actually protects

**Search query privacy.** DuckDuckGo does not log your searches against your identity. It does not know what you searched yesterday, last week, or last year. There is no "search history" for DuckDuckGo to hand to a government subpoena or to sell to a data broker.

**No behavioral targeting.** Ads are contextual, not behavioral. A DuckDuckGo ad network profile of you does not exist because no profile is built.

**Referrer header stripping.** When you click a result on DuckDuckGo and visit the destination site, DuckDuckGo rewrites the request so that the destination site does not receive a referrer header showing you came from DuckDuckGo. The destination still gets your IP address, but does not know what you searched to find it.

## What it does not protect

**Your IP address on the DuckDuckGo server.** DuckDuckGo receives your IP address when you make a search request. The company states it does not log it persistently, but the request still travels to their infrastructure over an HTTPS connection your ISP can see was made to DuckDuckGo's servers.

**Your ISP's view.** Your ISP can see that you connected to DuckDuckGo's IP addresses. With an encrypted DNS configuration, they cannot see the domain name; with standard DNS, they can. DuckDuckGo does not change anything about what your ISP observes at the network layer.

**Tracking on the sites you visit.** DuckDuckGo is a search engine. Once you click a result and land on a third-party site, DuckDuckGo has no further involvement. That site can track you with cookies, pixels, and fingerprinting using its own systems. The search was private; the subsequent browsing is not.

**What Bing sees.** DuckDuckGo sources a portion of its search index from Microsoft's Bing API. The precise nature of what Microsoft observes from DuckDuckGo's use of that API is not fully public. DuckDuckGo states that it does not send personally identifiable information to Bing, but the relationship introduces Microsoft as a party adjacent to the search pipeline.

## The 2022 tracker exception

In 2022, security researcher Zach Edwards documented that DuckDuckGo's browser was loading Microsoft trackers (specifically bat.bing.com and other Microsoft advertising properties) on third-party websites, while blocking equivalent Google and Facebook trackers. This was subsequently confirmed. The cause was a contractual exception in DuckDuckGo's agreement with Microsoft that permitted certain Microsoft tracking scripts to run.

DuckDuckGo's CEO acknowledged the issue and stated that the company was working to remove the exception. The behavior has since been corrected in the browser. The episode is worth knowing about for two reasons: it demonstrated that "privacy" tools can have commercial exceptions that are not fully disclosed, and it illustrates why third-party audits of browser extension and browser behavior are more reliable than company statements alone.

This applies to the browser product specifically. The search engine's non-logging behavior is a server-side property and not affected by client-side tracker exceptions.

## DuckDuckGo versus Google: what the difference actually is

The difference is not that DuckDuckGo is more anonymous in a network sense. A Google search and a DuckDuckGo search look similar to your ISP: an HTTPS request to an IP address. The difference is in what happens on the server after the request arrives.

Google stores your query, associates it with your account or a persistent anonymous identifier, uses it to build an advertising profile, and potentially retains it indefinitely. DuckDuckGo states that it does not store the query against any identity and does not use it to build a profile. The search result quality is somewhat different (DuckDuckGo is generally considered slightly less capable for ambiguous queries and local results), but the privacy improvement is real for users whose primary concern is what the search company knows about them.

## The DuckDuckGo browser and extensions

The DuckDuckGo browser and extensions are separate products from the search engine and have a different trust history given the 2022 exception. Privacy Guides no longer includes the DuckDuckGo browser in its recommendations as of 2024, partly as a consequence of the tracker exception and partly because of concerns about the company's use of the proprietary Bing-based tracking protection list rather than community-maintained lists like EasyPrivacy.

For a browser with strong content blocking, [[tool-review-firefox]] with [[tool-review-ublockorigin]] is the more auditable combination. For the search engine specifically, DuckDuckGo remains a reasonable default for users who want to stop handing their search history to Google.

---

### Sources reviewed for this article

**DuckDuckGo privacy policy** (duckduckgo.com/privacy) — Primary source on what DuckDuckGo logs and does not log. Self-published; no third-party audit of compliance is available for the search engine's logging practices. Worth reading directly.

**Zach Edwards, 2022 tracker exception documentation** (twitter.com/thezedwards, May 2022) — Original documentation of the Microsoft tracker exception in the DuckDuckGo browser. The thread includes screenshots of network traffic. This is the primary record of the issue; DuckDuckGo CEO Gabriel Weinberg's response is also on the same thread.

**Privacy Guides, Search Engines** (privacyguides.org/en/search-engines) — Current recommendation status for DuckDuckGo and alternatives. Community-maintained; check the date.

**Privacy Guides, Mobile Browsers** — Documents the removal of DuckDuckGo browser from recommendations and the reasoning.

**BleepingComputer, "DuckDuckGo browser allows Microsoft trackers"** (bleepingcomputer.com, May 2022) — News coverage of the tracker exception with technical detail. More accessible than the original Twitter thread.
