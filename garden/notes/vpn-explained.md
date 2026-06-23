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

- Hides your browsing from your [ISP](isp-layer) and from others on the same local network (cafe wifi, etc.).
- Changes the IP address sites see, which shifts your apparent location.

What a VPN does not do:

- It does not make you anonymous. Logins, cookies, and browser fingerprints still identify you. For anonymity, see [Tor](tor-explained).
- It does not stop fingerprinting or tracking inside the page. Your [browser fingerprint](browser-fingerprinting) is computed from your browser and device (canvas and GPU rendering, fonts, screen size, time zone, and so on), none of which a VPN touches, so it stays identical the moment you connect. Fingerprinting is in fact defined as tracking "by the configuration and settings information [browsers] make visible to websites, rather than traditional tracking methods such as IP addresses and unique cookies": the IP a VPN swaps is not part of the fingerprint at all.

## Sources

- EFF Surveillance Self-Defense, [Choosing the VPN That's Right for You](https://ssd.eff.org/module/choosing-vpn-thats-right-you): confirms a VPN hides traffic from your ISP and local network but exposes all of it to the provider.
- [Virtual private network](https://en.wikipedia.org/wiki/Virtual_private_network) (Wikipedia), for the basic mechanism.
- EFF Cover Your Tracks, [About and Methodology](https://coveryourtracks.eff.org/about): defines fingerprinting as tracking by browser configuration "rather than IP addresses and unique cookies," which is why changing your IP with a VPN does not change your fingerprint.

