---
title: "What Your ISP Can See"
date: 2026-05-04
lastmod: 2026-05-04
next-review: 2027-05-04
stage: sprout
tags: [ISP, DNS, HTTPS, privacy, network]
description: "A layer-by-layer account of what your Internet Service Provider can observe, under what conditions, and what actually changes when you use HTTPS, encrypted DNS, or a VPN."
---

<p class="eyebrow">Tracking and Privacy · Cluster 03</p>

# What Your ISP Can See

Your [Internet Service Provider](https://en.wikipedia.org/wiki/Internet_service_provider) (ISP) is the company whose infrastructure your traffic travels through to reach the internet. In the US, major ISPs include Comcast, AT&T, Verizon, and similar companies. The same role is filled internationally by telecoms.

Because your traffic flows through their infrastructure before reaching any destination, ISPs have a structural position to observe it. What they can actually see depends on what layer of encryption is in use. The following table summarizes this. Each row below expands on it.

---

## The visibility table

| What you do | ISP DNS server | ISP network | With DoH | With VPN |
|---|---|---|---|---|
| Visit example.com (HTTPS) | Sees domain | Sees IP + hostname (SNI) | Hidden | Hidden |
| Visit example.com (HTTP) | Sees domain | Sees full URL + content | Hidden | Hidden |
| Pages you visit on HTTPS | Not visible | Content encrypted | Not visible | Not visible |
| Passwords you type | Not visible | Encrypted | Not visible | Not visible |
| Every domain you look up | Full log | Not applicable | Encrypted | Hidden |
| Volume of traffic | Not visible | Always visible | Not visible | Sees VPN server |
| Time of activity | Not visible | Always visible | Not visible | Sees VPN server |
| Your real IP address | Always visible | Always visible | Visible | Hidden |

*Adapted from the Techlore community forum visibility breakdown.*

---

## Layer 1: HTTP (unencrypted)

[HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) is the original web transfer protocol. It sends everything in plaintext.

When you visit an HTTP page, your ISP can see the full URL, the content of the page, everything you submit in forms, and everything the server sends back. There is no encryption at the transport layer.

Very few sites still serve HTTP for their main content. Most have switched to HTTPS. But HTTP still appears in internal tools, legacy systems, and occasionally in redirects that briefly expose a request before the HTTPS connection is established.

---

## Layer 2: HTTPS (encrypted content, visible domain)

[HTTPS](https://en.wikipedia.org/wiki/HTTPS) adds [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) encryption to the HTTP connection. The content of the page is encrypted. Your ISP cannot read what you submitted in a form or what the server sent back.

What your ISP can still see:

**The domain name.** DNS lookups happen before the HTTPS connection is established. When you type `example.com`, your browser asks a [DNS resolver](https://en.wikipedia.org/wiki/Domain_Name_System#DNS_resolvers) to translate that name to an IP address. By default, that resolver belongs to your ISP. Your ISP logs every domain you look up.

**The hostname via SNI.** Even after the DNS lookup, the hostname appears again during the [TLS handshake](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_handshake) in a field called [Server Name Indication (SNI)](https://en.wikipedia.org/wiki/Server_Name_Indication). SNI exists because many websites can share a single IP address. The client has to tell the server which site it wants before the encrypted channel is established. That disclosure happens in plaintext.

This means HTTPS hides what you did on a page but does not hide which page you visited.

> **Common misconception:** VPN advertisements often claim HTTPS provides "military-grade encryption." This is accurate for the content of the connection. It is misleading as a complete description of what HTTPS hides. Your ISP cannot read your messages or see your passwords. Your ISP can see that you visited a site, when you visited it, and approximately how much data you exchanged.

---

## Layer 3: DNS and what changing it does

Every domain name lookup goes to a [DNS resolver](https://en.wikipedia.org/wiki/Domain_Name_System#DNS_resolvers). By default, your ISP provides that resolver. Your ISP logs the lookup.

Changing your DNS resolver to a third-party service like [Cloudflare (1.1.1.1)](https://1.1.1.1/) or [Quad9 (9.9.9.9)](https://www.quad9.net/) shifts who can see your lookups. It does not hide them. Your ISP now sees an IP address but must perform a reverse DNS lookup to determine the domain name. Some ISPs do this. Most do not bother for routine traffic.

[Encrypted DNS](https://en.wikipedia.org/wiki/DNS_over_HTTPS) goes further. [DNS over HTTPS (DoH)](https://en.wikipedia.org/wiki/DNS_over_HTTPS) wraps your DNS queries inside ordinary HTTPS traffic. Your ISP cannot distinguish a DNS query from any other web request. They cannot see the domain name you are looking up.

[DNS over TLS (DoT)](https://en.wikipedia.org/wiki/DNS_over_TLS) does the same thing over a dedicated encrypted port (TCP 853) rather than the standard HTTPS port.

**What encrypted DNS does not do:**

Encrypting your DNS queries does not hide your activity from the DNS resolver you are using. Cloudflare, NextDNS, Quad9, or any other resolver you switch to can still see every domain you look up. You have shifted trust from your ISP to the resolver operator. Whether that is an improvement depends on the resolver's logging policy and your threat model. The Privacy Guides [DNS resolver comparison](https://www.privacyguides.org/en/dns/) is the most useful current reference for evaluating this.

Encrypted DNS also does not fix the SNI problem. Your ISP can still see the hostname in the TLS handshake. [Encrypted Client Hello (ECH)](https://blog.cloudflare.com/encrypted-client-hello/) is an extension that encrypts the SNI field, but it requires support from both the client and the server and is not yet universally deployed.

---

## Layer 4: VPN

A [VPN (Virtual Private Network)](https://en.wikipedia.org/wiki/Virtual_private_network) creates an encrypted tunnel between your device and a server operated by the VPN provider. All your traffic travels through that tunnel. Your ISP sees only that you are connected to the VPN server.

What changes: your ISP cannot see your DNS lookups or which sites you visit. The destination servers see the VPN server's IP address, not yours.

What does not change: your VPN provider now occupies the position your ISP previously held. The provider can see every domain you visit, the volume and timing of your traffic, and your real IP address. The question is not whether someone can see your traffic. The question is who you would rather have that position.

**Evaluating a VPN:**

A VPN provider's most important property is its logging policy. A provider that logs nothing has nothing to hand over to authorities or sell to advertisers. A provider that keeps connection logs knows when you connected and from where. A provider that keeps traffic logs knows everything your ISP used to know.

Logging policies are self-reported. Independent audits are more reliable. Look for providers that have been audited by a recognized third party, that publish the methodology and scope of the audit, and that have had their no-logs claims tested by a real legal demand.

> **What a VPN does not fix:** VPNs do not prevent tracking by [cookies](privacy-basics), [fingerprinting](browser-fingerprinting), or [tracking pixels](privacy-basics). A site that has set a cookie in your browser will recognize you regardless of which IP address your connection comes from. VPNs operate at the network layer. Most tracking operates at the application layer.

See [[vpn-explained]] for a more detailed treatment of VPN mechanics and evaluation criteria.

---

## Layer 5: Tor

[Tor](https://www.torproject.org/) routes your traffic through three randomly selected nodes before it reaches the destination. Each node knows only the previous and next hop. No single node knows both who you are and where you are going.

Your ISP knows you are using Tor. They cannot see your destination or your traffic content.

Tor is meaningfully different from a VPN in one key respect: there is no single provider who sees your full traffic. The trust model is distributed across three independent nodes. Compromising one does not break anonymity. Compromising all three at once would, which is why the random selection matters.

See [[tor-explained]] for mechanics, limits, and when Tor is the right choice over a VPN.

---

## US-specific: ISP data practices

In the United States, [ISPs have been legally permitted to sell customer browsing data to advertisers since 2017](https://epic.org/issues/consumer-privacy/data-brokers/), when Congress repealed FCC rules that would have required opt-in consent. Major ISPs including Verizon and AT&T have documented opt-out procedures, though their effectiveness varies and the data practices themselves are rarely audited by independent parties.

US ISPs are also subject to legal demands for traffic data from law enforcement under a range of authorities, including [National Security Letters](https://en.wikipedia.org/wiki/National_security_letter), which do not require judicial review and typically include a gag order preventing the ISP from disclosing the demand to the customer.

This is a policy and legal situation, not a technical one. No encryption scheme changes what a government can compel an ISP to disclose about data it has already collected.

---

## Sources reviewed

**[Techlore Forum: What Your ISP Can See](https://discuss.techlore.tech/t/what-your-isp-can-see/12157)** — The visibility table in this article is adapted from a community forum post. The step-by-step breakdown by scenario is cleaner than most professional explainers. It is a forum post rather than a primary source. Use it for the structure; verify technical claims against IETF RFCs or EFF documentation.

**[Cloudflare: DNS Encryption Explained](https://blog.cloudflare.com/dns-encryption-explained/)** — Good on the mechanics of DoH and DoT. Note that Cloudflare operates 1.1.1.1, so they have a commercial interest in DNS encryption adoption. The technical content is accurate and verifiable against the [IETF RFC 8484](https://datatracker.ietf.org/doc/html/rfc8484).

**[ismyispspying.com: What Can Your ISP See](https://ismyispspying.com/blog/what-isp-can-see)** — Comprehensive and readable. The full visibility table is one of the better formatted ones available. No obvious commercial interest. Cross-check against primary sources before citing.

**[Vercara/Digicert: Encrypted DNS Queries](https://vercara.digicert.com/resources/encrypted-dns-queries)** — Good history and mechanics of DoH. Honest about implementation challenges. Concludes with a product recommendation for their own resolver, which should be noted when evaluating any conclusions about what DoH does or does not solve.

**[EFF: Understanding Network Censorship](https://ssd.eff.org/module/understanding-and-circumventing-network-censorship)** — EFF is a nonprofit with no commercial interest in the tools they discuss. The threat model framing here is reliable. The tool recommendations are more cautious and methodology-driven than most VPN review sites.

**[EPIC: Data Brokers](https://epic.org/issues/consumer-privacy/data-brokers/)** — Source for US ISP data sale policy. EPIC is a privacy advocacy nonprofit. Their legal analysis of the 2017 rollback is accurate and cited with primary sources.
