---
title: "Tool Review: Mullvad VPN"
date: 2026-05-02
lastmod: 2026-05-02
stage: flower
tags: [tools, vpn, privacy, network, review]
description: "Mullvad is consistently the most recommended VPN in privacy communities. Here is the reasoning behind that reputation, what a VPN actually does, and what it does not."
next_review: 2027-05-01
---

<p class="eyebrow">Tool Review · VPN Services</p>

# Mullvad VPN

| | |
|---|---|
| **Type** | Virtual Private Network (VPN) |
| **Developer** | Mullvad VPN AB |
| **Headquarters** | Gothenburg, Sweden |
| **Founded** | 2009 |
| **Funding** | Private company, self-funded through subscriptions |
| **Platforms** | Windows, macOS, Linux, Android, iOS, router |
| **Cost** | €5/month flat; no annual contracts, no discounts for longer periods |
| **License** | Open source (client only) |
| **Source code** | github.com/mullvad/mullvadvpn-app |
| **Audited** | Yes; multiple third-party audits |
| **Last reviewed** | May 2026 |
| **Recommended for** | Users for whom shifting ISP visibility is the relevant threat |

---

## What it is

Mullvad is a VPN service. It routes your internet traffic through an encrypted tunnel to one of Mullvad's servers, which then forwards your requests to the wider internet. From the perspective of the sites you visit, your traffic appears to originate from Mullvad's server rather than your device. From your ISP's perspective, you are connected to a Mullvad server, and they can see the volume and timing of your encrypted traffic but cannot read its contents or determine where you are going.

Understanding what a VPN is requires understanding the trust model it implies: you are not removing a party that can observe your traffic. You are substituting one party for another. Instead of your ISP seeing your traffic, your VPN provider sees it. Whether this is an improvement depends entirely on which party you trust less and what threat you are protecting against.

## Who built it

Mullvad VPN AB is a small Swedish company founded by Fredrik Strömberg and Daniel Berntsson. It employs around thirty people as of 2025. Sweden is subject to European data protection law (GDPR) and has a reasonably strong legal tradition of privacy rights, though it is also a member of the Fourteen Eyes intelligence-sharing arrangement, which matters for users with state-level adversaries.

Mullvad is notable in the VPN market for several specific choices that distinguish it from commercial VPN products with large marketing budgets. It does not offer affiliate programs, which means there are no third-party sites with a financial incentive to recommend it regardless of merit. It does not offer extended subscription discounts, which removes the revenue incentive to lock users in. Its pricing is €5 per month for every customer, whether you pay for one month or twelve.

Mullvad allows account creation without providing an email address. Account numbers are randomly generated 16-digit strings. You can pay with cash by mail or with cryptocurrency. The design philosophy is that the company should not have information about who you are that it could subsequently be compelled to hand over.

## What the audit record shows

Mullvad has been audited by multiple independent security firms. Notable audits include:

A 2020 application audit by Cure53 covered the desktop and mobile clients. The auditors found several vulnerabilities of varying severity, all of which Mullvad patched. The audit report is publicly available.

A 2022 no-logs audit by Cure53 examined Mullvad's infrastructure to assess whether user activity data was being retained. Auditors were given access to the server infrastructure. The audit found no evidence of logging inconsistent with Mullvad's stated policy.

A 2023 audit by Assured AB covered the iOS app specifically.

The existence of audits does not guarantee that no logging ever occurs. An audit is a point-in-time assessment of practices and infrastructure. A company could change its behavior after an audit. What audits do provide is evidence that at the time of the audit, the infrastructure was consistent with the stated claims, and that an independent party with direct server access found no contradicting evidence.

## The RAM-only server disclosure

In 2023, Swedish police raided a Mullvad data center and seized equipment. Mullvad published a statement describing the incident: the police took six servers, but because Mullvad operates all servers in RAM-only mode (no persistent storage on disk), there was no user data on the servers. The raid produced nothing useful to law enforcement because there was nothing to retrieve.

This is the most meaningful real-world test of a VPN's no-logs claim: an actual law enforcement seizure that produced no user data. Mullvad's architecture made the claim verifiable by adversarial means rather than by audit alone.

## What a VPN protects against

**Your ISP's network-level visibility.** Your ISP can no longer see the IP addresses you connect to, the domains you visit (via SNI), or the volume of traffic to specific destinations. They see only your connection to Mullvad's server.

**Your IP address at destination servers.** Websites you visit see Mullvad's server IP, not yours. This does not prevent tracking by cookies, fingerprinting, or any other in-browser mechanism. A site that already has a cookie identifying you will still recognize you through the VPN.

**Passive network surveillance on untrusted networks.** On public Wi-Fi or other networks where a passive observer could read traffic, the VPN tunnel prevents them from reading the encrypted stream.

## What a VPN does not protect against

**In-browser tracking.** Cookies, fingerprinting, localStorage, and the full range of in-browser tracking mechanisms operate at the application layer, above the network layer where the VPN operates. A VPN changes your apparent IP address. It does nothing to the cookie your browser carries or the canvas fingerprint it broadcasts.

**DNS leaks.** If your device's DNS resolver is configured outside the VPN tunnel, DNS queries may bypass the VPN and go directly to your ISP's resolver, revealing the domains you visit. Mullvad's client handles this by default, routing all DNS through the tunnel and using Mullvad's own resolver. Verifying this on a custom router setup requires explicit configuration.

**Mullvad itself.** You have shifted your ISP's visibility to Mullvad. If Mullvad were compelled to log, was compromised, or made a different choice than its stated policy, they would see the same traffic your ISP saw before. The RAM-only architecture and Swedish police raid provide substantial evidence that Mullvad's stated practices are genuine, but the structural trust dependency remains.

**Timing and volume correlation attacks.** A sophisticated adversary who can observe both the traffic entering Mullvad's network from your device and the traffic leaving Mullvad's servers to the destination can potentially correlate the timing and volume patterns to identify that you are the source of a particular request. This is a state-level attack that most users do not face.

## Mullvad versus other VPN recommendations

Most VPN reviews are written by affiliate marketing sites that earn commissions on subscriptions and therefore optimize for recommending whatever pays the best commission rather than whatever protects users best. The privacy community's repeated identification of Mullvad as the top recommendation is notable precisely because it occurs in contexts where there is no financial incentive to recommend any particular product.

ExpressVPN and NordVPN have large marketing budgets and appear at the top of most commercial VPN rankings. Both have had incidents that raise credibility concerns (ExpressVPN's CIO was identified as having previously worked for a UAE government surveillance program; NordVPN had a server compromised in 2018 and delayed disclosure). Neither is an automatic disqualification, but neither matches Mullvad's audit record, no-affiliate-program policy, or RAM-only architecture.

ProtonVPN is the other commonly recommended option, particularly for users who want a free tier. Proton AG is a Swiss company with a strong privacy focus and has published its own audit results. Its free tier is slower and limited to specific server locations. The paid tier is comparable in trust to Mullvad.

---

### Sources reviewed for this article

**Mullvad VPN privacy policy and transparency reports** (mullvad.net/en/help/privacy-policy and mullvad.net/en/blog/transparency-report) — Primary source. Mullvad publishes a transparency report listing government data requests received and what was produced in response. As of the most recent report, all requests produced no user data because no data was retained.

**Cure53 audit reports** (cure53.de/#publications) — The 2020 and 2022 audit reports are publicly available. Reading these directly is more informative than reading summaries. The 2022 no-logs audit methodology section is particularly relevant.

**Mullvad, "The Swedish police raided our servers and found nothing"** (mullvad.net/en/blog/2023/04/20/mullvad-vpn-was-subject-to-a-search-warrant) — Mullvad's own account of the 2023 police raid. Self-published but corroborated by Swedish press coverage.

**Privacy Guides, VPN Services** (privacyguides.org/en/vpn) — The most credible community-maintained VPN comparison. Explicit criteria for inclusion (no affiliate programs in reviewer's criteria, audits required, no jurisdiction red flags). Lists Mullvad and Proton as current recommendations.

**Tom's Guide / BleepingComputer on ExpressVPN CIO disclosure** (2021) — Reporting on the US government's disclosure that an ExpressVPN executive had previously worked for a UAE surveillance operation. Relevant to comparative trust evaluation.
