---
title: "Start Here"
date: 2026-05-01
lastmod: 2026-05-01
stage: flower
tags: [beginner, web, privacy, orientation]
description: "A fifteen-minute orientation to how the web works and why it matters for your privacy."
next_review: 2027-05-01
---

<p class="eyebrow">Notes in progress</p>
# Start Here

This article exists because most privacy advice assumes you already understand the thing it is trying to protect you from. "Use a VPN." "Block third-party cookies." "Switch to an encrypted DNS." These are reasonable suggestions. But if you do not know what a DNS query is, or what a third-party cookie actually does, or what a VPN changes and does not change, the advice requires blind trust. You are installing tools you cannot evaluate.

This article will not make you an expert. It will give you enough of a mental model that when you encounter a specific recommendation later, you can ask the right questions about it.

## What actually happens when you visit a website

When you type a URL into a browser and press Enter, several things happen before you see anything on screen.

**Step one: your browser asks where the site lives.** The URL you typed is a human-readable name. The internet does not use names; it uses numerical addresses called IP addresses. Your browser has to translate the name into an address before it can connect to anything. It does this by sending a request to a Domain Name System (DNS) resolver, which is essentially a directory service. By default, this resolver is operated by your internet service provider (ISP). The resolver returns the IP address of the server you asked about.

This matters for privacy because that DNS query, by default, is sent in plain text. Your ISP can read every domain name you look up, regardless of whether the site itself is encrypted. This is not fixed by HTTPS alone.

**Step two: your browser connects to that address.** If the URL begins with `https://`, your browser and the server perform a handshake that establishes an encrypted channel. This is TLS encryption, and it protects the contents of your request from being read by anyone watching the network between you and the server. Your ISP can see that you connected to a particular IP address, and can usually see the domain name via a field called SNI, but cannot read what you did once connected.

**Step three: your browser sends a request.** That request contains your IP address, a User-Agent string that identifies your browser and operating system, an Accept-Language header, a Referer header that often reveals which page you came from, and any cookies the site has previously stored on your machine. You did not consciously send most of this. Your browser sends it automatically.

**Step four: the server responds, and then your browser keeps fetching.** The page the server returns contains references to dozens of other resources: fonts, images, analytics scripts, advertising code, social media widgets. Your browser fetches each of these from the servers that host them. Every fetch is a new request, and every request gives that third-party server your IP address, your User-Agent, and the URL of the page that triggered the request. A single visit to a single site can result in your browser silently contacting thirty or forty unrelated companies.

## What each actor in this chain can see

It helps to think of the chain as a series of observers, each of whom can see different things.

**Your ISP** sees the IP addresses you connect to, the domain names you look up (via DNS), the volume and timing of your traffic, and the SNI field during TLS handshakes. With HTTPS, they cannot read your page content, search queries, or form submissions. Without HTTPS, they can see everything.

**The DNS resolver** sees every domain name you look up. If you use your ISP's resolver, your ISP sees this. If you change to a third-party resolver like Cloudflare or Google, that company sees it instead. Changing resolvers shifts the observer; it does not eliminate one.

**The website you visit** sees your IP address, your browser and operating system, where you came from, and everything you do on their site. They can set cookies that will be sent back on every future visit.

**Third-party scripts embedded in the page** can see your IP, your User-Agent, and the URL of the page they were loaded on. If the same script is embedded on many different sites, it can track your movement across all of them by matching a cookie it previously set in your browser.

**Data brokers** sit behind all of this. They purchase, aggregate, and resell behavioral data from advertising networks, combined with offline records from public filings, retail loyalty programs, and other commercial sources. The profile a data broker holds about you may contain far more than any single site ever collected.

## What the most common protective mechanisms actually do

This is where privacy advice usually fails: tools are described by what they do, not by what they leave unchanged.

**HTTPS** encrypts the content of the connection between your browser and the server. It does not hide the domain name, the IP address, or the DNS lookup that preceded the connection. It does not protect you from tracking by the site itself or by embedded third-party scripts.

**Changing your DNS resolver** shifts who sees your DNS queries. If you move from your ISP's resolver to Cloudflare's 1.1.1.1, Cloudflare now sees your queries instead of your ISP. This may or may not be an improvement depending on which you trust more. It does not encrypt the queries unless you also enable DNS-over-HTTPS.

**DNS-over-HTTPS (DoH)** encrypts DNS queries so that your ISP cannot read them in transit. The resolver you chose still sees the queries. DoH protects your DNS traffic from passive observation by your ISP. It does not hide your browsing from the resolver, and it does not affect what sites you visit can see about you.

**A VPN** routes your traffic through an encrypted tunnel to a server operated by the VPN provider. Your ISP sees only that you are connected to that server. The websites you visit see the VPN server's IP address, not yours. The VPN provider, however, can see everything your ISP used to see. You are not removing a party that can observe your traffic; you are substituting one party for another. Whether this is an improvement depends on whether you trust the VPN provider more than your ISP.

**Content blockers like uBlock Origin** maintain lists of known tracker and advertising domains. When a page tries to load a resource from a listed domain, the request is blocked before it leaves your browser. The tracker never receives the request, which means it cannot log your visit, set a cookie, or fire a tracking pixel. This is the most direct and controllable form of protection against third-party tracking. It works by preventing the request from being made, not by hiding it.

**Browser fingerprinting** is worth understanding because it is what makes cookie-blocking insufficient on its own. Your browser broadcasts a combination of properties on every request: screen resolution, installed fonts, timezone, language, GPU characteristics, canvas rendering behavior. Together these can form a combination that is statistically unique to your device. Fingerprinting does not store anything on your machine, so there is nothing to delete. Content blockers can block known fingerprinting scripts, but cannot prevent a first-party site from fingerprinting you directly.

## The key insight

Privacy tools do not make you invisible. They shift where visibility sits. Each tool prevents a specific party from observing a specific thing. The question to ask of any tool is: what does this prevent, who does it transfer that observation to, and is that a better situation for me?

That question requires understanding what each actor in the chain can see by default. This article is meant to give you enough of that picture to start asking it.

## What to read next

[[privacy-basics]] covers cookies, tracking pixels, and browser fingerprinting in more depth. [[01-dns]] covers DNS and what changing it actually changes. [[01-https]] covers TLS in more detail, including SNI and what remains visible even over encrypted connections.

---

### Sources reviewed for this article

**MDN Web Docs** (developer.mozilla.org) — Multi-stakeholder maintained, freely licensed technical reference. Used for the HTTP cookies specification and TLS handshake mechanics. Authoritative and accurate; written for developers, so some terminology assumes background knowledge. No commercial interest in the content.

**EFF Surveillance Self-Defense** (ssd.eff.org) — Nonprofit digital rights organization. Excellent for threat-model framing and clear explanation of what each tool does and does not protect. No advertising or affiliate content. Some sections less current than others; check article dates.

**Privacy Guides** (privacyguides.org) — Community-maintained, no advertising, transparent editorial policy. Best source for tool recommendations with explicit threat-model context. Directly corrects common overclaiming, including on DNS and VPNs. Highly recommended as a follow-on resource.

**Techlore Forum** (discuss.techlore.tech) — Community forum. The "What Your ISP Can See" thread contains an unusually clear step-by-step breakdown of ISP visibility under different conditions. Community source, so verify specific claims against primary references.
