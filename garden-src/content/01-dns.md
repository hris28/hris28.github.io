---
title: "DNS: What It Is, What It Exposes, and What Changing It Actually Does"
date: 2026-05-01
lastmod: 2026-05-01
stage: flower
tags: [dns, privacy, network, beginner, intermediate]
description: "Every domain you visit produces a DNS query your ISP can read by default. Here is what DNS is, who sees it, and what encrypted DNS actually protects."
next_review: 2027-05-01
---

<p class="eyebrow">Network · Cluster 01-C</p>

# DNS: What It Is, What It Exposes, and What Changing It Actually Does

Privacy advice often includes "change your DNS to 1.1.1.1 or 8.8.8.8" without explaining what this changes or why. The recommendation is not wrong, but it is systematically incomplete in a way that produces false confidence. This article covers what DNS is, what it exposes by default, and what "changing your DNS" does and does not fix.

## What DNS is

DNS stands for Domain Name System. It is a lookup service: you give it a domain name, it gives you back an IP address.

Your computer does not know where `duckduckgo.com` lives on the internet. It only knows how to reach numerical addresses like `52.149.246.39`. Before your browser can connect to any site, it has to ask something to translate the name into an address. That ask is a DNS query.

The resolution process works like this. Your device sends the query to a DNS resolver, which is a server that handles translation requests. By default, this is a resolver your ISP provides. If the resolver has the answer cached from a recent query, it returns it immediately. If not, it works through a chain: it asks a root nameserver which TLD server handles `.com` domains, then asks that TLD server which authoritative nameserver handles `duckduckgo.com`, then asks the authoritative server for the actual record. The final answer comes back to your device, and your browser can now open a connection to the right IP address.

The resolution typically takes tens of milliseconds and happens invisibly before every page load.

## What this exposes by default

The critical privacy implication: **traditional DNS queries are sent in plain text.**

Every domain you look up is transmitted as an unencrypted text string over the network. This means:

Your ISP's resolver receives every domain you query. They can log it. In the US, ISPs are legally permitted to sell this data for advertising purposes. Some do.

Anyone on the network path between you and the resolver can also read the queries. On a home network this is usually just your router and your ISP. On a public Wi-Fi network, this could include the network operator and anyone who has compromised the network.

This happens regardless of whether HTTPS is in use. HTTPS encrypts the content of what passes between your browser and a web server after the connection is made. It does not encrypt the DNS lookup that made the connection possible. If you visit a medical information site over HTTPS, your ISP cannot read what you looked at — but they can read the DNS query that preceded the visit, which tells them you visited the site at all.

## QNAME minimization

Standard DNS sends the full domain name at every step of the resolution chain. The root nameserver, the TLD nameserver, and the authoritative nameserver all see the full query — `duckduckgo.com` — even though only the authoritative nameserver needs it. The root server only needs to know the TLD (`.com`), and the TLD server only needs to know the second-level domain (`duckduckgo`).

QNAME minimization is a standard (RFC 7816) that addresses this by sending only the portion of the query each server needs. This meaningfully reduces how many servers learn about your browsing habits during each resolution. It is not widely discussed in mainstream privacy advice, but it is a real improvement that does not require any user action — resolvers implement it server-side.

## What "changing your DNS" does

There are three distinct things people mean when they say "change your DNS," and they have different effects.

### Switching providers

Moving from your ISP's resolver to a third-party resolver like Cloudflare (`1.1.1.1`), Google (`8.8.8.8`), or Quad9 (`9.9.9.9`) changes who receives your queries. The queries are still sent in plain text. The ISP can no longer read them, but the new provider can. Whether this is an improvement depends on whether you trust the new provider more than your ISP.

The Internet Society puts this clearly: "the selection and preference of a third-party privacy-enhanced recursive resolver over an ISP-provided recursive resolver simply shifts trust from one organization to another, and does not really eliminate the possible information leakage."

Quad9 (`9.9.9.9`) is nonprofit and has a strong stated commitment to non-logging. Google's DNS (`8.8.8.8`) is operated by a company whose core business model involves advertising and data collection. Cloudflare's `1.1.1.1` claims not to retain query data beyond 25 hours. Privacy Guides maintains a comparison of resolver logging policies that is worth consulting before choosing one.

### Encrypting your queries

DNS-over-HTTPS (DoH, RFC 8484) and DNS-over-TLS (DoT, RFC 7858) encrypt the DNS query between your device and the resolver. Your ISP can no longer read the query in transit; they can only see that you are making HTTPS requests to a DNS provider's IP address.

This is a meaningful privacy improvement over default plaintext DNS. But Privacy Guides states directly: "Encrypted DNS will not help you hide any of your browsing activity." The resolver still sees every query. If your DoH provider is Cloudflare, Cloudflare sees your queries instead of your ISP. You have improved your privacy against passive ISP surveillance; you have not become unobservable.

Modern browsers support DoH natively. In Firefox: Settings, Privacy and Security, scroll to DNS over HTTPS, enable it and choose a provider.

### Using a filtering resolver

Tools like NextDNS, Pi-hole (self-hosted), and AdGuard DNS operate as DNS resolvers that also maintain block lists of known tracker and advertising domains. When you look up a domain on the block list, the resolver returns a non-routable answer instead of the real IP address. Your browser then cannot connect to the tracker because it never receives a valid address.

This works for all applications on your device, not just the browser. A mobile app that tries to phone home to a known tracker domain will fail the DNS lookup and cannot connect.

The limitation: DNS-level blocking only works against requests that use DNS. Trackers that use hardcoded IP addresses, or that operate from the same domain as the content you are trying to access (first-party tracking), cannot be blocked at the DNS layer.

## What DNS does not fix regardless of your settings

Changing your DNS does not hide the IP addresses you connect to. After the DNS lookup, your browser opens a connection to the resolved IP address. Your ISP can see that connection regardless of how the DNS query was handled.

Changing your DNS does not encrypt your traffic to the destination. HTTPS handles that, and it is a separate system. DNS resolution and HTTP encryption operate independently.

Changing your DNS does not address SNI leakage. During the TLS handshake, your browser sends the hostname it is connecting to in a field called Server Name Indication. This field has historically been sent in plain text, meaning your ISP and network observers can see the domain name even when the connection is encrypted. Encrypted Client Hello (ECH) is a newer extension that hides SNI, but deployment is still partial as of early 2026.

## The honest picture

Default DNS: your ISP sees every domain you visit, in plain text, and can log and sell it.

Changed to third-party resolver (plain text): a different company sees your queries instead. Your ISP sees only the IP address of the resolver you are using.

Encrypted DNS (DoH/DoT): your ISP can no longer read your queries in transit. The resolver you chose still sees them. SNI still leaks the domain to your ISP during TLS handshakes.

DNS plus ECH (where supported): significantly reduces what your ISP can observe. The resolver still sees everything.

VPN: your ISP sees only that you are connected to the VPN server. The VPN provider sees your DNS queries and connections. You have shifted all observation to the VPN provider.

Tor: your ISP sees that you are using Tor. No single party sees both your identity and your destination.

Each step reduces what one specific party can observe. None of them produce invisibility. Understanding which step addresses which party is what allows you to choose tools that match your actual situation.

---

### Sources reviewed for this article

**Internet Society, DNS Privacy Introduction** (internetsociety.org) — Standards-body source, no commercial interest, no product to sell. The statement about "simply shifting trust" is from this document. Covers QNAME minimization in a way almost no other accessible source does. Dense; written for a technical-policy audience. The highest-quality single source on DNS privacy found during research. Recommended for readers who want the full picture.

**Privacy Guides, DNS resolvers page** (privacyguides.org/en/dns) — Community-maintained comparison with explicit logging policies per resolver. The blunt statement that "encrypted DNS will not help you hide any of your browsing activity" is characteristic of the site's approach: correcting overclaiming rather than amplifying it. Best resource for choosing a specific resolver.

**Computer Hope, DNS resolver** (computerhope.com/jargon/d/dns-resolver.htm) — Accessible definition-level explanation with a clear diagram of the resolution chain. Good first read if the DNS resolution process is unfamiliar. Limited on privacy implications.

**Hostinger DNS tutorial** (hostinger.com/uk/tutorials/what-is-dns) — Strong on visual explanation of the resolution sequence. More diagrams than most sources on this topic. May be marketing-adjacent depending on section.

**Cloudflare, DNS encryption explained** (blog.cloudflare.com/dns-encryption-explained) — Clear on the distinction between encrypted and unencrypted DNS, and on what plaintext DNS exposes to ISPs. Cloudflare operates a major DNS resolver and has a business interest in encrypted DNS adoption. Technical content is accurate; note the commercial context.

**Techlore Forum, What Your ISP Can See** (discuss.techlore.tech) — Community forum. The step-by-step breakdown of ISP visibility by scenario (HTTP, HTTPS, different DNS, VPN) is among the clearest practical explanations of these distinctions. Community source; verify specific claims against primary references.

**RFC 8484** (IETF) — The actual DNS-over-HTTPS specification. Cited for completeness; not required reading unless you need the technical details of the protocol.
