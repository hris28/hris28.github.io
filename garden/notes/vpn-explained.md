---
title: "VPN"
date: 2026-06-20
lastmod: 2026-06-20
stage: seedling
tags: [vpn, privacy, network, term]
description: "A VPN routes your traffic through one server run by a provider, hiding it from your ISP but handing all of it to the provider instead."
---

# VPN

A **VPN** (virtual private network) routes all your internet traffic through a single server run by a provider before it reaches its destination. To anyone watching your local network or your ISP, your traffic now looks like one encrypted tunnel to that provider, and the sites you visit see the provider's address instead of yours.

The catch: you have not removed a watcher, you have **moved** the trust. Your ISP no longer sees your activity, but the VPN provider now sees all of it: your real IP, every destination, and the timing and volume of your traffic. A VPN is only as private as that company's logging policy and the jurisdiction it operates in.

What a VPN does well:

- Hides your browsing from your ISP and from others on the same local network (cafe wifi, etc.).
- Changes the IP address sites see, which shifts your apparent location.

What a VPN does not do:

- It does not make you anonymous. Logins, cookies, and browser fingerprints still identify you. For anonymity, see [Tor](tor-explained).
- It does not stop fingerprinting or tracking inside the page.

