---
title: "DNS Explained"
date: 2026-05-01
lastmod: 2026-05-01
stage: flower
tags: [dns, privacy, network, beginner, intermediate]
description: "Every domain you visit produces a DNS query your ISP can read by default. Here is what DNS is, who sees it, and what encrypted DNS actually protects."
next_review: 2027-05-01
---

<p class="eyebrow">Network · How the Web Works · Cluster 01-C</p>

# DNS: What It Is, What It Exposes, and What Changing It Actually Does

Privacy advice often includes "change your DNS to 1.1.1.1 or 8.8.8.8" without explaining what this changes or why. The recommendation is not wrong, but it is systematically incomplete in a way that produces false confidence. This article covers what DNS is, what it exposes by default, and what "changing your DNS" does and does not fix.

## What DNS is

[DNS](https://en.wikipedia.org/wiki/Domain_Name_System) stands for Domain Name System. It is a lookup service: It is a lookup service: every time you type a domain name into a browser, your device runs a lookup before anything else happens. By default, it goes to a server run by your [ISP](isp-layer). The ISP logs it, returning an IP Address.

Computers route traffic by [IP address](https://en.wikipedia.org/wiki/IP_address), not by name. `172.217.7.238` is an IP address. `google.com` is a domain name. DNS is the system that translates one into the other.

Your computer does not know where `duckduckgo.com` lives on the internet. It only knows how to reach numerical addresses like `52.149.246.39`. Before your browser can connect to any site, it has to ask something to translate the name into an address. That ask is a DNS query.

The resolution process works like this. Your device sends the query to a DNS resolver, which is a server that handles translation requests. By default, this is a resolver your ISP provides. If the resolver has the answer cached from a recent query, it returns it immediately. If not, it works through a chain: it asks a root nameserver which TLD server handles `.com` domains, then asks that TLD server which authoritative nameserver handles `duckduckgo.com`, then asks the authoritative server for the actual record. The final answer comes back to your device, and your browser can now open a connection to the right IP address.

This translation step happens before your browser makes any connection to the destination site. It happens before [HTTPS](http-and-https) encryption starts. It is a separate request, sent separately, logged separately.

This resolution typically takes tens of milliseconds and happens invisibly before every page load.

## The resolution chain
 
The lookup is not a single step. Here is the sequence:
 
1. Your browser checks its local [cache](https://en.wikipedia.org/wiki/Cache_(computing)). If it has looked up this domain recently and the answer has not expired, it uses the cached result.
2. If not cached, the browser asks your operating system's resolver, which has its own cache.
3. If not there, the query goes to a **recursive resolver**, usually your ISP's server. This is the machine that does the actual work.
4. The recursive resolver asks a [root nameserver](https://en.wikipedia.org/wiki/Root_name_server) where to find the authoritative nameserver for `.com`.
5. The root nameserver replies with the address of a [TLD nameserver](https://en.wikipedia.org/wiki/Top-level_domain) for `.com`.
6. The TLD nameserver says which nameserver is authoritative for `example.com`.
7. The authoritative nameserver for `example.com` returns the IP address.
8. The recursive resolver returns that IP to your browser and caches it for future lookups.
So your ISP's recursive resolver sees every domain you look up. Steps 4 through 7 happen between the resolver and various nameservers, not between you and them directly.

---
 
## What your ISP sees from DNS
 
The query goes to the recursive resolver in plaintext. By default there is no encryption. Anyone who can observe the traffic between your device and the resolver can see:
 
- Every domain name you look up
- The time of each lookup
- Your IP address
Your ISP is in the position to observe all three because the resolver is on their network.
 
HTTPS does not protect DNS queries. The [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) connection that makes a web page secure starts after the DNS lookup succeeds. The lookup itself is separate and unencrypted unless you specifically configure encrypted DNS.


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

You can change your resolver in your operating system's network settings. Common alternatives:
 
- [Cloudflare 1.1.1.1](https://1.1.1.1/) — operated by Cloudflare, claims no query logging
- [Quad9 9.9.9.9](https://www.quad9.net/) — operated by a nonprofit, blocks known malicious domains
- [NextDNS](https://nextdns.io/) — configurable filtering, query log available to user
Changing your resolver moves the log from your ISP to the resolver operator. Your ISP now sees a connection to an IP address. They may be able to identify that IP as belonging to Cloudflare or Quad9 and infer you are using an alternate resolver. They can also perform a [reverse DNS lookup](https://en.wikipedia.org/wiki/Reverse_DNS_lookup) on the IP to recover the domain name in some cases.
 
The key point: changing resolvers shifts who logs your queries. It does not prevent logging. The resolver you switch to can still see everything your ISP used to see.

There are three distinct things people mean when they say "change your DNS," and they have different effects.

### Switching providers

Moving from your ISP's resolver to a third-party resolver like Cloudflare (`1.1.1.1`), Google (`8.8.8.8`), or Quad9 (`9.9.9.9`) changes who receives your queries. The queries are still sent in plain text. The ISP can no longer read them, but the new provider can. Whether this is an improvement depends on whether you trust the new provider more than your ISP.

The Internet Society puts this clearly: "the selection and preference of a third-party privacy-enhanced recursive resolver over an ISP-provided recursive resolver simply shifts trust from one organization to another, and does not really eliminate the possible information leakage."

Quad9 (`9.9.9.9`) is nonprofit and has a strong stated commitment to non-logging. Google's DNS (`8.8.8.8`) is operated by a company whose core business model involves advertising and data collection. Cloudflare's `1.1.1.1` claims not to retain query data beyond 25 hours. Privacy Guides maintains a comparison of resolver logging policies that is worth consulting before choosing one.

### Encrypting your queries

[DNS over HTTPS (DoH)](https://en.wikipedia.org/wiki/DNS_over_HTTPS) wraps DNS queries inside ordinary HTTPS traffic. The query travels over port 443, the same port used for all HTTPS connections. Your ISP sees HTTPS traffic to an IP address. They cannot tell whether it is a web request or a DNS query, and they cannot read the query either way.
 
[DNS over TLS (DoT)](https://en.wikipedia.org/wiki/DNS_over_TLS) does the same thing over a dedicated port (TCP 853). It is slightly easier for ISPs to identify and block because it uses a distinct port.
 

This is a meaningful privacy improvement over default plaintext DNS. But Privacy Guides states directly: "Encrypted DNS will not help you hide any of your browsing activity." Both protect your queries in transit. Neither protects them at the resolver. The resolver you use with DoH or DoT can still see every query you send. You are encrypting the channel, not hiding the destination. The resolver still sees every query. If your DoH provider is Cloudflare, Cloudflare sees your queries instead of your ISP. You have improved your privacy against passive ISP surveillance; you have not become unobservable.

Modern browsers support DoH natively. In Firefox: Settings, Privacy and Security, scroll to DNS over HTTPS, enable it and choose a provider.

**To enable DoH in Firefox:** Settings, Privacy and Security, scroll to DNS over HTTPS, enable and choose a provider.
 
**To enable DoH in Chrome/Edge:** Settings, Privacy and security, Security, enable "Use secure DNS."

### Using a filtering resolver

Tools like NextDNS, Pi-hole (self-hosted), and AdGuard DNS operate as DNS resolvers that also maintain block lists of known tracker and advertising domains. When you look up a domain on the block list, the resolver returns a non-routable answer instead of the real IP address. Your browser then cannot connect to the tracker because it never receives a valid address.

This works for all applications on your device, not just the browser. A mobile app that tries to phone home to a known tracker domain will fail the DNS lookup and cannot connect.

The limitation: DNS-level blocking only works against requests that use DNS. Trackers that use hardcoded IP addresses, or that operate from the same domain as the content you are trying to access (first-party tracking), cannot be blocked at the DNS layer.

## What DNS does not fix regardless of your settings

Changing your DNS does not hide the IP addresses you connect to. After the DNS lookup, your browser opens a connection to the resolved IP address. Your ISP can see that connection regardless of how the DNS query was handled.

Changing your DNS does not encrypt your traffic to the destination. HTTPS handles that, and it is a separate system. DNS resolution and HTTP encryption operate independently.

**SNI.** Changing your DNS does not address SNI leakage. Even with DoH active, when your browser connects to a website, it discloses the site's hostname during the [TLS handshake](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_handshake) in a field called [Server Name Indication (SNI)](https://en.wikipedia.org/wiki/Server_Name_Indication). Your browser sends the hostname it is connecting to in a field called Server Name Indication. This field has historically been sent in plain text, meaning your ISP and network observers can see the domain name even when the connection is encrypted. DoH hides the DNS query but does not hide the SNI field.
 
[Encrypted Client Hello (ECH)](https://blog.cloudflare.com/encrypted-client-hello/) is a newer extension that encrypts the SNI field. It requires both the browser and the server to support it. As of 2026, Firefox and Chrome support ECH, but server-side support is still partial.
 
**The resolver itself.** Any resolver you use, encrypted or not, can log your queries. A resolver with a strong no-logging policy is better than one with a weak one. An audited policy is better than an unaudited self-reported one. The [Privacy Guides DNS resolver comparison](https://www.privacyguides.org/en/dns/) lists providers with their logging policies and audit status. This is the most reliable current source for evaluating resolvers.
 
**Government access.** US-based DNS providers are subject to legal demands. If a resolver operator is compelled to log and hand over queries by a court order, the encryption of the channel is irrelevant. Some providers are based in jurisdictions with stronger privacy law. Jurisdiction matters when evaluating a resolver's actual protection against legal compulsion.

## DNSSEC: a separate problem
 
[DNSSEC](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) addresses a different problem from encrypted DNS. It verifies that DNS responses have not been tampered with in transit. A resolver can lie to you, redirecting `bank.com` to a phishing site. DNSSEC allows your resolver to verify that the answer came from the legitimate authority for that domain.
 
DNSSEC does not encrypt queries. It is about authenticity, not confidentiality. Both problems are real. They require different solutions.

## Running a quick check
 
To see which resolver your device is currently using:
 
**On Mac or Linux:** open Terminal and run `scutil --dns` (Mac) or `resolvectl status` (Linux).
 
**On Windows:** open Command Prompt and run `ipconfig /all`. Look for "DNS Servers."
 
To check if your DNS is leaking even with a VPN or alternate resolver active, use [dnsleaktest.com](https://dnsleaktest.com). It shows which servers are actually receiving your queries.

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

**Internet Society, DNS Privacy Introduction** (internetsociety.org) - Standards-body source, no commercial interest, no product to sell. The statement about "simply shifting trust" is from this document. Covers QNAME minimization in a way almost no other accessible source does. Dense; written for a technical-policy audience. The highest-quality single source on DNS privacy found during research. Recommended for readers who want the full picture.

**[Privacy Guides: DNS Resolvers](https://www.privacyguides.org/en/dns/)** - The most useful current comparison of resolvers by logging policy, jurisdiction, and audit status. Community-maintained, no advertising, transparent editorial policy. The blunt statement that "encrypted DNS will not help you hide any of your browsing activity" is characteristic of the site's approach: correcting overclaiming rather than amplifying it. Best resource for choosing a specific resolver.

**[Computer Hope: DNS Resolver](https://www.computerhope.com/jargon/d/dns-resolver.htm)** - Short, clear definition with a useful diagram. No commercial interest apparent. Good first read if the DNS resolution process is unfamiliar. Limited on privacy implications.

**[Hostinger DNS tutorial](hostinger.com/uk/tutorials/what-is-dns)** — Strong on visual explanation of the resolution sequence. More diagrams than most sources on this topic. May be marketing-adjacent depending on section.

**[Cloudflare: DNS Encryption Explained](https://blog.cloudflare.com/dns-encryption-explained/)** - Clear on the distinction between encrypted and unencrypted DNS, and on what plaintext DNS exposes to ISPs. Accurate on mechanics, verifiable against IETF RFCs. Cloudflare operates 1.1.1.1 and has a commercial interest, as they operate a major DNS resolver, in DNS encryption adoption. Use for technical explanation; read their resolver policy separately rather than taking their word for it.

**[PrivateInternetAccess: What is DNS](https://www.privateinternetaccess.com/blog/what-is-dns/)** - Good FAQ structure, clear step-by-step explanation of resolution. PIA is a VPN company. Every conclusion orients toward "use a VPN." The mechanistic description of DNS is reliable. The recommendations are commercially motivated.

**[Techlore Forum, What Your ISP Can See](discuss.techlore.tech)** - Community forum. The step-by-step breakdown of ISP visibility by scenario (HTTP, HTTPS, different DNS, VPN) is among the clearest practical explanations of these distinctions. Community source; verify specific claims against primary references.

**[GeeksForGeeks: DNS in the Application Layer](https://www.geeksforgeeks.org/computer-networks/domain-name-system-dns-in-application-layer/)** - Comprehensive vocabulary coverage. Zero hierarchy. Useful as a reference for terms after you already somewhat have a mental model. Not necessarily useful as a first read. The source demonstrates a recurring failure mode in technical writing: every term explained, no explanation of which terms matter most or why.

**[IETF RFC 8484: DNS over HTTPS](https://datatracker.ietf.org/doc/html/rfc8484)** - Primary source for DoH specification. Dry reading. Use it when a claim about DoH behavior needs verification against the actual standard.
