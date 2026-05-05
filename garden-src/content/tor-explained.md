---
title: "Tor Explained"
date: 2026-05-04
lastmod: 2026-05-04
next-review: 2027-05-04
stage: sprout
tags: [Tor, anonymity, privacy, network]
description: "How Tor routes traffic, why it is different from a VPN, its real limits, and when to use it."
---

<p class="eyebrow">Protective Tools · Cluster 04</p>

# Tor Explained

[Tor](https://www.torproject.org/) is open-source software that routes your traffic through a network of volunteer-operated servers before it reaches the destination. It was originally developed by the [US Naval Research Laboratory](https://en.wikipedia.org/wiki/United_States_Naval_Research_Laboratory) in the 1990s for protecting government communications. It was later released publicly. The irony that an anti-surveillance tool came from the military is real and documented.

This article covers how Tor works mechanically, how it differs from a VPN, what it does not protect, and when it is the right choice.

---

## The mechanism

When you use the [Tor Browser](https://www.torproject.org/download/), your traffic does not go directly to the destination. It travels through three randomly selected nodes, called relays:

**Entry node (Guard):** Knows your real IP address. Does not know your destination.

**Middle node:** Knows the entry node and the exit node. Knows neither your IP nor your destination.

**Exit node:** Knows the destination. Does not know your real IP address.

Each relay decrypts one layer of encryption before passing the traffic to the next relay. This is the origin of the name: [The Onion Router](https://en.wikipedia.org/wiki/Tor_(network)), because the encryption is layered like an onion. The data leaves your machine wrapped in three layers. Each node peels one.

The destination site sees only the exit node's IP address. It has no direct way to connect the request to your real IP.

---

## Why this is different from a VPN

A [VPN](vpn-explained) routes your traffic through one server operated by the VPN provider. The provider sees your real IP, sees your destination, and sees your traffic volume and timing. You trust one company with all of it.

Tor distributes that trust across three independent nodes. No single relay has the complete picture. The entry node sees who you are but not where you are going. The exit node sees where you are going but not who you are.

This distinction matters in two ways:

**The trust model is different.** A VPN provider can be compelled by legal authorities or can simply choose to sell your data. A single Tor relay operator being compromised or compelled does not break your anonymity, because they only hold one piece of the picture.

**The vocabulary is different.** A VPN primarily offers [privacy](https://en.wikipedia.org/wiki/Privacy): it hides the content of your traffic from observers on the local network and from your ISP. Tor primarily offers [anonymity](https://en.wikipedia.org/wiki/Anonymity): it severs the link between your identity and your activity. These are different goals addressed by different mechanisms.

---

## What Tor does not protect

**Your ISP knows you are using Tor.** The connection to the entry node is visible to your ISP. They cannot see your destination or your traffic. They can see that you are connecting to known Tor infrastructure. In some contexts, this visibility is itself a problem.

**The exit node can see unencrypted traffic.** The exit node decrypts the final layer and sends the request to the destination in plaintext if you are using HTTP. HTTPS still matters on Tor. If you access an HTTPS site, the exit node sees the destination domain (via SNI) and encrypted content. If you access an HTTP site, the exit node sees everything.

**Tor does not prevent application-level tracking.** If you log into a Google account while using Tor, Google knows who you are regardless of your IP address. Cookies, browser fingerprints, and login credentials all operate at the application layer, above the anonymization Tor provides at the network layer.

**Tor is slow.** Traffic takes a multi-hop detour through volunteer relays. Latency is high. Bandwidth is limited. Streaming video is impractical. Downloads are slow. This is an inherent property of the multi-relay architecture, not a bug that updates can fix.

**Determined state-level adversaries have had successes against Tor.** The [Silk Road takedown in 2013](https://en.wikipedia.org/wiki/Silk_Road_(marketplace)) demonstrated that Tor is not bulletproof against a motivated, well-resourced adversary who can observe large portions of the network. The research on [traffic correlation attacks](https://en.wikipedia.org/wiki/Traffic_analysis) is ongoing. Tor provides strong anonymity against most adversaries. It does not provide absolute anonymity against all adversaries.

---

## Tor-over-VPN

One configuration that strengthens the ISP visibility problem: connect to a VPN first, then use Tor.

In this setup:
- Your ISP sees only the VPN connection. They cannot see that you are using Tor.
- The VPN server sees that you are connecting to Tor. They cannot see your traffic inside Tor.
- The Tor entry node sees the VPN server's IP, not your real IP.

This protects against an ISP that monitors Tor usage and also against an entry node that logs IPs. The VPN provider now holds your real IP. Whether this is an improvement depends on the VPN provider's logging policy and jurisdiction compared to your ISP's.

This is not the same as using a VPN inside Tor (VPN-over-Tor), which routes your VPN traffic through Tor first. That configuration is more complex to set up correctly and is recommended against for most users.

---

## When to use Tor

Tor is appropriate when anonymity is the goal rather than just privacy. Specific cases:

- Visiting a site without any record linking your real IP to the visit
- Accessing resources blocked by your ISP or in your region
- Communicating with sources as a journalist or researcher who needs to protect source identity
- Accessing [.onion services](https://en.wikipedia.org/wiki/.onion), which are services that exist only inside the Tor network and never expose a destination IP address

Tor is not appropriate as a general-purpose browsing tool for speed-sensitive tasks, authenticated sessions, or circumstances where its slowness would cause you to make shortcuts that undermine the anonymity it provides.

---

## Getting Tor

Use the [Tor Browser](https://www.torproject.org/download/), which is a hardened version of Firefox pre-configured to route traffic through Tor and to resist fingerprinting. Do not configure a regular browser to use Tor manually unless you are certain you understand what you are changing. The Tor Browser includes specific settings that prevent fingerprinting and other application-level deanonymization attacks.

The EFF has installation guides for [Linux](https://ssd.eff.org/module/how-use-tor-linux), [macOS](https://ssd.eff.org/module/how-use-tor-mac), [Windows](https://ssd.eff.org/module/how-use-tor-windows), and [smartphones](https://ssd.eff.org/module/how-use-tor-mobile).

---

## Sources reviewed

**[privacy.net: Everything You Wanted to Know About Tor](https://privacy.net/what-is-tor/)** — User-oriented, covers the anonymity vs. privacy distinction cleanly. The trust model explanation is one of the clearest available for a non-technical audience. The downsides section is honest about speed, ISP visibility, and the limits against state-level adversaries. Credibility is harder to verify than EFF or the Tor Project's own documentation.

**[Tor Project: Documentation](https://tb-manual.torproject.org/)** — Primary source for Tor Browser behavior. No commercial interest. Written by the team that builds the software.

**[EFF: Tor Guides](https://ssd.eff.org/)** — Platform-specific installation guides and threat-model framing. EFF is a nonprofit with no commercial interest in the tools they recommend.

**[Wikipedia: Tor (network)](https://en.wikipedia.org/wiki/Tor_(network))** — Useful for historical context (Naval Research Laboratory origin, Silk Road, academic research on traffic analysis). Cited research papers are verifiable independently.
