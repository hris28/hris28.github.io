# Tracking and Data Flow: How the Web Knows You

*Cluster 01 of an Internet and Information Security Guide. Centered on OSINT values, open infrastructure, and review-style honesty about sourcing.*

## What this cluster covers and who it's for

This is the first content cluster in a broader guide intended to function as a reference site for everyday people who want to understand the systems they live inside online. The goal is not to recommend a single tool. It is to build enough of a working mental model that any specific recommendation a reader encounters later makes sense rather than requiring blind trust. The cluster is centered on open-source intelligence (OSINT) values, including transparency about how systems work, preference for open infrastructure, and review-style sourcing.

A reader finishing this cluster should be able to answer four questions: what information leaves their machine when they load a web page, who can see it at each hop, how the most common protective mechanisms work at a functional level, and how to evaluate any specific privacy-tool recommendation against that mental model.

## Anatomy of a page load

When you type a URL into a browser and press enter, several things happen that are mostly invisible. Understanding this sequence is the foundation for everything else in this cluster.

**Step one: name resolution.** Your computer does not know where `example.com` lives on the internet. It asks a Domain Name System (DNS) resolver, typically the one your internet service provider (ISP) sets by default. The resolver returns an IP address. By default, this lookup is not encrypted, which means the resolver and any network device along the path can see which sites you ask about, even if the site itself uses HTTPS.

**Step two: connection.** Your browser opens a connection to that IP address. If the URL begins with `https://`, your browser and the server perform a TLS handshake that establishes an encrypted channel. The contents of your request and the server's response are encrypted within that channel. However, the IP address you connect to and historically the hostname you ask for (sent in the Server Name Indication, or SNI, field) are visible to anyone watching the network. [Encrypted Client Hello (ECH)](https://datatracker.ietf.org/doc/draft-ietf-tls-esni/) is a newer extension that hides SNI, but adoption is partial.

**Step three: the request.** Your browser sends an HTTP request that includes your IP address (visible to the server because it is the return path), a User-Agent string identifying your browser and operating system, an Accept-Language header, a Referer header that often reveals where you came from, and any cookies the site has previously set on your machine for this domain.

**Step four: the response.** The server returns HTML. That HTML almost always references additional resources hosted on other domains: scripts, fonts, ads, analytics beacons, iframes, social media buttons. Your browser dutifully fetches each of those. Every fetch is a fresh connection that gives the third party your IP, your User-Agent, the URL of the page that triggered the fetch (Referer), and any cookies that party has set on your machine in the past.

The crucial implication: a single visit to a single site can result in your browser sending your IP and Referer to dozens of unrelated companies, each of whom can quietly stitch your activity together over time.

## First-party versus third-party collection

A first party is the site you intentionally visited. A third party is any other domain that gets contacted as a side effect of loading the first party. The distinction matters legally, since privacy laws sometimes treat them differently, and technically, since browsers increasingly block third-party cookies by default.

When a user notices "I'm being tracked," they sometimes mean the first party logging their behavior on its own site, but more often the surveillance they are noticing is third parties stitching their movement across many first parties. Both happen. The third-party version is the engine of behavioral advertising and the data broker market.

## Identifiers: cookies, local storage, and beyond

A cookie is a small piece of data the server tells your browser to store and send back on every subsequent request to that same domain. Cookies are how a site remembers you are logged in. They are also how an advertising network running on hundreds of sites can recognize that the same browser visited each of them. The full mechanics live in [RFC 6265](https://datatracker.ietf.org/doc/html/rfc6265) and the [MDN Cookies reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).

Browsers offer several other storage mechanisms that work similarly: localStorage and sessionStorage (key-value stores accessible to scripts), IndexedDB (a richer client-side database), and Cache Storage (used by service workers). All can be used as identifiers. Clearing cookies without clearing the others leaves common identification paths intact.

ETags and cached resources can also serve as quasi-identifiers. If a tracker serves you a unique image with a unique ETag, your browser will send that ETag back on the next request, recognizing you even if cookies are cleared.

## Fingerprinting: identification without storage

Even if you block cookies and clear all storage, the combination of attributes your browser exposes (screen resolution, installed fonts, time zone, language, GPU and audio quirks, canvas rendering peculiarities) is often unique enough to identify you. The Electronic Frontier Foundation's [Cover Your Tracks](https://coveryourtracks.eff.org/) tool measures how distinctive your browser is in the population that has run the test. Most readers will be surprised by their result.

Fingerprinting is harder to defend against than cookies because each individual signal is legitimately needed for the web to work. The Tor Browser's strategy is to make all users look identical (same fonts, same screen size, same User-Agent), which trades convenience for anonymity in a deliberate way.

## The actor chain: who actually gets your data

A typical commercial website includes scripts and pixels from analytics vendors (Google Analytics, Adobe), advertising networks (Google Ads, Meta, Amazon, The Trade Desk), session replay vendors, A/B testing tools, customer data platforms, tag managers (Google Tag Manager often loads still more scripts), and content delivery networks. Each of these can collect at least your IP, User-Agent, and the URL of the page they were loaded on. Many can read or set their own cookies.

Behind these visible technical actors sit data brokers, which aggregate signals from many sources and resell profiles. The Electronic Privacy Information Center maintains a continually-updated [resource on data brokers](https://epic.org/issues/consumer-privacy/data-brokers/) covering the industry's structure and policy responses. Brokers typically combine online behavioral data with offline records (property, voter, court, retail loyalty) to build composite profiles sold to advertisers, employers, insurers, debt collectors, and in many cases law enforcement, often without warrant requirements that would apply to direct collection.

This is where OSINT and consumer privacy meet directly. The same broker products that an investigative journalist might use to research a corporate beneficial owner are sold to anyone who pays. The investigative-OSINT and personal-privacy questions are the same question seen from opposite sides of the data flow.

## DNS: what it is and what "changing it" actually does

A DNS resolver translates names to IP addresses. By default, your operating system uses whichever resolver your network hands it (usually your ISP's). Three properties of DNS matter for privacy: the resolver sees every name you look up, traditional DNS queries are sent in clear text and visible to anyone on the network path, and resolvers often log queries.

"Changing your DNS" can mean three different things, and the difference matters.

*Switching providers* (for example, from your ISP's resolver to Cloudflare's `1.1.1.1` or Quad9's `9.9.9.9`) changes who logs your queries. It does not encrypt them on the wire by default. Whether this is a privacy improvement depends on whether you trust the new provider more than the old one, and on whether they have a credible logging policy.

*Encrypting your DNS queries* via DNS-over-HTTPS ([DoH, RFC 8484](https://datatracker.ietf.org/doc/html/rfc8484)) or DNS-over-TLS ([DoT, RFC 7858](https://datatracker.ietf.org/doc/html/rfc7858)) hides the queries from observers on your local network and your ISP, but the resolver you chose still sees them. Modern browsers can do DoH directly, bypassing the operating system.

*Using a filtering DNS* (such as NextDNS or a self-hosted [Pi-hole](https://pi-hole.net/)) blocks lookups for known tracker and ad domains at the resolver level. This blocks much of the third-party fan-out described earlier, which can both improve privacy and speed up pages.

A practical caveat: changing DNS does not hide the IP addresses you connect to, it does not encrypt your traffic to the destination beyond what HTTPS already does, and it does not affect SNI leakage unless ECH is also in use.

## TLS and HTTPS: what they hide and what they don't

HTTPS encrypts the contents of your communication with a website. An observer on the network can see that you connected to a particular IP address, can usually see the hostname (via SNI), can see the rough size and timing of your traffic, but cannot read the URL paths, headers, cookies, or response bodies.

This is a significant protection against passive surveillance and against most network attackers. It is not anonymity. The destination server still sees everything about your request, and any third-party scripts running in your browser still see what they were going to see.

## VPNs: what they shift, not what they solve

A VPN routes your traffic through an encrypted tunnel to a server you choose, which then makes requests to the wider internet on your behalf. From the destination's perspective, your apparent IP is the VPN server's IP. From your ISP's perspective, your traffic looks like an encrypted stream to the VPN provider, with no visibility into the destinations.

The trust model matters a great deal. You are not eliminating a party that can see your activity, you are substituting your VPN provider for your ISP. If your VPN provider keeps logs, sells data, or is compelled by a government, you have moved your trust, not removed it. Reputable VPN reviews focus heavily on jurisdiction, audit history, and ownership transparency. [Privacy Guides' VPN recommendations](https://www.privacyguides.org/en/vpn/) are a reasonable starting point, with the caveat that any single source has biases and the field changes quickly.

A note on browser-bundled VPNs. [Firefox's built-in VPN](https://support.mozilla.org/en-US/kb/firefox-built-in-vpn) is a Mozilla-branded service running on Mullvad infrastructure in some regions. The convenience is real; the privacy properties depend on Mozilla's and Mullvad's policies and on whether you trust the bundle. The general principle holds: a VPN is a trust-shift tool, not a magic privacy solution.

## Tor and onion routing

Tor (The Onion Router) routes your traffic through three volunteer-operated relays, encrypted in layers so that no single relay sees both who you are and what you are accessing. The exit relay sees what you are accessing but not who you are. The entry relay sees who you are but not what. The middle relay sees neither. This is a stronger anonymity property than any VPN, because no single party can correlate both endpoints. The [Tor Project's own documentation](https://support.torproject.org/) is the canonical primary source.

Tor is slower than direct browsing, and many sites either block Tor exits or treat them as suspicious. The Tor Browser also includes aggressive anti-fingerprinting measures that make all users look alike, which is a meaningful protection but an unfamiliar experience for most users. For people at higher risk, the live operating system [Tails](https://tails.net/) routes all traffic through Tor by default and leaves no traces on the host machine.

## Browser choice and configuration

Browsers differ in default tracking behavior. Safari, Firefox, and Brave block many third-party cookies and trackers out of the box. Chromium-based browsers including Chrome have moved more slowly and remain the default targets for ad-tech telemetry. Configuration matters more than brand, however; a hardened Firefox profile and a default Chrome profile produce very different observed behaviors regardless of which engine is "more private" in principle.

Useful starting categories of extension are content blockers ([uBlock Origin](https://github.com/gorhill/uBlock) is the canonical free, open-source option), container or temporary-container tabs to isolate identity between sites, and HTTPS enforcement (now built into most browsers). Each extension is also a permission grant, so the source and maintenance status of an extension matter. uBlock Origin is unusual for being maintained by a single, credible developer with a transparent ruleset and no monetization.

## Email tracking: a small worked example

Marketing emails frequently include a tiny invisible image (a "tracking pixel") whose URL contains a unique identifier. When your email client renders the email and fetches the image, the sender's server learns that you opened the message, when, your IP, and your User-Agent. Many email clients now block remote images by default for this reason. Apple Mail's Mail Privacy Protection takes the additional step of pre-fetching all images via Apple's servers so that everyone "looks like" they opened the message at the same time from the same IP, neutralizing the signal.

Links in marketing emails are usually wrapped through a redirect domain that records the click before forwarding you. The presence of long, opaque tracking URLs in your inbox is a useful diagnostic.

## Mobile and app-level collection

The web tracking story above is incomplete on mobile, where apps run outside the browser sandbox and integrate software development kits (SDKs) that send telemetry to advertising and analytics networks directly. Apple's App Tracking Transparency and Android's Privacy Sandbox are operating-system-level attempts to bring some of the browser-style protections to apps, with mixed effectiveness depending on the platform's enforcement. The advertising identifier (IDFA on iOS, AAID on Android) is a per-device persistent ID that, although resettable, functions for most users as a stable cross-app handle. The Markup's [Blacklight](https://themarkup.org/blacklight) tool, while web-focused, illustrates the kind of reproducible scanning that is harder to do on mobile because apps are opaque in ways pages are not.

## Data brokers and the offline-online merge

Data brokers occupy the position furthest from the user in the data flow. They buy, license, scrape, and aggregate signals from a long list of sources: site analytics, ad-tech logs, app SDK telemetry, public records (property, voter, court, marriage, business filings), retail loyalty programs, credit bureau adjacencies, and bankruptcy filings. They sell profiles for marketing, identity verification, fraud detection, and increasingly law enforcement and immigration enforcement. EPIC, [The Markup](https://themarkup.org/), and the Center on Privacy & Technology at Georgetown Law have published extensively on this; the [EPIC data brokers page](https://epic.org/issues/consumer-privacy/data-brokers/) is a good entry point.

The defensive question for an individual is which brokers hold records about them and what removal options exist. Tools like Optery, DeleteMe, and Privacy Bee automate broker removal requests. Manual removal via state-level privacy rights (California's CCPA/CPRA, Virginia's CDPA, others) is also possible but tedious.

## What "tracking protection" actually does, by mechanism

This is the answer to a question many people have when they encounter a privacy tool: when something claims to block trackers, what is it doing?

A *blocklist-based extension* such as uBlock Origin consults a list of known tracker and ad domains and refuses to fetch resources from them. It works at the browser level, before any request leaves your machine. Strengths: blocks both data exfiltration and visual ad clutter, with full transparency in its rules. Weaknesses: depends on the quality of the list, can break sites that depend on the blocked resources, and cannot stop a first-party site from logging your activity.

A *DNS-level blocker* such as NextDNS, Pi-hole, or AdGuard DNS intercepts the name resolution itself. The browser asks for `tracker.example` and the resolver returns a non-routable answer. Strengths: works for all applications on the device, not just the browser. Weaknesses: cannot block tracking that happens via direct IP or via the same domain as the page itself, and cannot strip identifiers from requests it does not block.

A *fingerprinting-resistance feature* such as Firefox's resistFingerprinting or the Tor Browser's letterboxing standardizes the values your browser exposes so you blend into a crowd. Strengths: addresses the cookie-less identification problem. Weaknesses: can break sites and reduces convenience.

A *container or compartmentalization tool* such as Firefox Multi-Account Containers keeps cookies and storage separate per identity, so your Facebook session cannot follow you across the web. Strengths: simple model, addresses cross-site stitching. Weaknesses: requires user discipline and does not address fingerprinting.

A *VPN or Tor* shifts or anonymizes the IP layer but does nothing to address in-page tracking by scripts the user voluntarily loads.

The honest takeaway: there is no single tool that solves tracking. Privacy is layered, and the right layers depend on what threats matter to a given person. The next cluster will cover threat modeling explicitly so that this layering can be approached deliberately rather than as an arms race.

## Where reasonable people disagree

Two-factor authentication is broadly recommended by mainstream security organizations (NIST, CISA, every major incident-response team) on the grounds that it prevents the overwhelming majority of credential-stuffing and password-reuse attacks. A minority privacy-rights critique, exemplified by [Bob Leggitt's 2022 post](https://popzazzle.blogspot.com/2022/10/ten-important-things-you-should-tell-your-friends-about-2fa.html), argues that SMS-based 2FA is primarily a phone-number harvesting program. Both views contain truths. SMS 2FA is genuinely the worst form of 2FA, and there is real evidence of phone-number commercialization. Hardware security keys and time-based one-time-password (TOTP) authenticator apps offer the security benefits without the data-collection cost. The constructive synthesis: avoid SMS 2FA where alternatives exist, prefer FIDO2/WebAuthn (passkeys, hardware keys) or TOTP apps, and treat any service that mandates a phone number as a service whose data practices warrant scrutiny.

Whether DuckDuckGo is a meaningful privacy-search alternative, whether browser-bundled VPNs are net positive, whether content blocking constitutes ethical use of advertising-supported sites: all of these have genuine arguments on multiple sides. This guide will flag such disagreements explicitly rather than pretend a consensus exists.

## Sources reviewed for this cluster

The intent of this section is to make sourcing legible and to demonstrate the kind of evaluation a thoughtful information professional applies. Both content quality and design lessons are noted.

**Privacy Guides, "[CryptPad Review: Replacing Google Docs](https://www.privacyguides.org/articles/2025/02/07/cryptpad-review/)"** (Em, Privacy Guides staff writer, Feb 2025). A non-profit, donation-funded privacy advocacy site with stated [editorial policy](https://www.privacyguides.org/articles/editorial/) and named authors. Strong on structure (clear pros/cons, threat-model awareness, links to underlying cryptographic primitives via Wikipedia and primary sources). Honest about downsides such as slowness and the absence of an offline app. Disclosure-clean (no ads, no affiliate links, donations disclosed). Verifiability is high because every cryptographic claim links to either Wikipedia or the project's own white paper. *Design lesson:* this is the structural template the guide site should emulate, especially the inline threat-model callouts that adapt advice to context ("if you are at risk of targeted attacks, consider Tails").

**Bellingcat, "[How to Archive Open Source Materials](https://www.bellingcat.com/resources/how-tos/2018/02/22/archive-open-source-materials/)"** (Aric Toler, Feb 2018). The canonical OSINT-community piece on web archiving. Strong on the practical mechanics of Archive.today and Archive.org, walks through which platforms work and which don't. Now eight years old, which matters: the social-media handling sections are partially outdated (Twitter is now X with different access dynamics, several recommended download tools have died or pivoted). *Design lesson:* the underlying logic is durable, the specific tool list is not. The guide site should build in last-checked dates per section and a visible deprecation pathway for stale tool recommendations.

**Popzazzle, "[Ten Important Things You Should Tell Your Friends About 2FA](https://popzazzle.blogspot.com/2022/10/ten-important-things-you-should-tell-your-friends-about-2fa.html)"** (Bob Leggitt, Oct 2022). A privacy-rights blog with a strong, ideologically committed voice. The site is openly anti-Big-Tech and self-identifies as such ("no funders, no bullshit"). Some claims are well-grounded (SMS 2FA is genuinely weak, phone numbers are a high-value broker signal, 2FA mandates can be coercive). Some over-reach (the post conflates SMS 2FA with all 2FA and dismisses the security value entirely, which is at odds with mainstream incident data). Few citations, mostly assertion. *Design lesson:* a privacy-rights critique can sharpen attention to data-collection motives even when its security conclusions overshoot. The guide should explicitly hold both the security mainstream and the privacy-rights critique in view, attributing each. This piece is a good example of why we need that pairing structure.

**Dan's Web Tips, "[Things on the Web That Annoy Me](https://webtips.dan.info/annoying.html)"** (Dan Tobias, 2012, last updated 2014). A long-running personal site by a developer with active opinions about how the web should work. Not a privacy or security source per se. The post is itself an argument against listicles, against artificial pagination, against caching abuse, against link rot, all of which are values the guide should embody. The page's own design (single page, real created and modified dates at the bottom, transparent author email, no analytics scripts) demonstrates its own principles. *Design lesson:* this is what an opinionated, durable, low-overhead web page looks like. Worth studying for the guide site's own constraints, especially the "real created and modified dates" practice.

**Planet Botch, "[Top Ten Most Annoying Things on the Internet](https://planetbotch.blogspot.com/2012/11/top-ten-most-annoying-things-on-internet.html)"** (2012). The companion piece to Dan's Web Tips, written in the same period and explicitly cross-linked. Listed here as a paired source rather than re-reviewed in detail. *Design lesson:* community-of-bloggers cross-linking is a model the modern guide-site can borrow from. Independent voices that link to each other transparently produce a more legible information environment than a single corporate hub.

**The Any Browser Campaign FAQ, [anybrowser.org](http://www.anybrowser.org/campaign/abfaq.html)**. A late-1990s and early-2000s campaign for browser-agnostic web design. Now mostly of historical interest, but the underlying principle (write to web standards, not to a specific browser, so the page works for the widest possible audience including assistive technology and minority browsers) is the direct ancestor of contemporary accessibility advocacy. *Design lesson:* the guide site should be written in semantic HTML or plain Markdown that any user agent can render, not gated behind a JavaScript framework that breaks on Lynx, screen readers, or print. This goal aligns directly with FAIR's Accessible principle.

**EPIC, [Consumer Privacy: Data Brokers](https://epic.org/issues/consumer-privacy/data-brokers/)**. EPIC is a Washington-based public-interest research center founded in 1994, focused on privacy and civil liberties in the digital age. Their data broker hub aggregates legislative tracking, FTC complaints they have filed, congressional testimony, and explainers. Strengths: institutional, durable, citation-rich, transparent funding (donations and foundation grants disclosed in their 990 filings). Weaknesses: advocacy framing (which they openly own), and some sections are dense legalistic writing. The page returned a 403 to automated fetchers during initial review, which is itself a data point about access. *Design lesson:* policy-tracking pages need a "what changed and when" log to remain useful; without it, the reader cannot tell whether a section reflects 2018 law or 2026 law.

**Ars Technica, "How our digital devices are putting our right to privacy at risk"** (April 2026, URL on file). Could not be retrieved during the session because the publisher returned a "site blocked" error. Notable as a real-world data point: well-known technical news sources are not always accessible on demand, especially through tools and mirrors. *Design lesson:* durable references should not depend on a single publisher's availability. Where a piece is important to the guide's argument, it should be archived to archive.org or archive.today at the time of citation, with both URLs included in the source line.

**Stronger sources added to extend the cluster.** [EFF's Cover Your Tracks](https://coveryourtracks.eff.org/) for hands-on fingerprinting demonstration with publicly documented methodology. [EFF's Surveillance Self-Defense](https://ssd.eff.org/) as the closest peer institution doing what this guide aims to do, well worth reading both for content and for tone. [MDN Web Docs](https://developer.mozilla.org/) for the underlying technical mechanics of cookies, headers, and storage; multi-stakeholder edited and freely licensed. [The Markup](https://themarkup.org/) for investigative reporting on tracking, ad-tech, and platform behavior, with their methodology disclosure and the Blacklight scanning tool. [The Tor Project documentation](https://support.torproject.org/) for primary-source explanation of onion routing. The Internet Engineering Task Force RFCs (notably [RFC 6265](https://datatracker.ietf.org/doc/html/rfc6265) for cookies, [RFC 8484](https://datatracker.ietf.org/doc/html/rfc8484) for DoH, [RFC 7858](https://datatracker.ietf.org/doc/html/rfc7858) for DoT) for the actual specifications when fine-grained accuracy matters.

The natural next clusters in the guide are: 02 Threat modeling for ordinary people; 03 Hardware and component literacy (RAM, CPU, GPU, SSD, displays, wifi cards, with the terminology a buyer needs); 04 Networking and self-hosting (IP addresses, hosting on your own connection, browser comparison, cache and metadata); 05 Anonymity and circumvention (extending Tor and the dark web treatment here); 06 Adjacent and historical (radio, Meshtastic versus Meshcore, licensed versus unlicensed spectrum, file systems, kernels, drivers, and how older formats like DVD and VHS still appear in modern infrastructure); and 07 Site architecture proposal and design principles drawn from the source reviews above.

---

*Last reviewed: April 25, 2026. Next review due: October 2026 or sooner if any cited tool, RFC, or institution changes substantively.*
