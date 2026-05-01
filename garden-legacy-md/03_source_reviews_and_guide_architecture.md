# Source Reviews and Guide Architecture: Round 2

*Built from the sources you actually visited during your session log, plus a synthesis of the broader guide architecture organized around your stated topic categories. Source reviews follow a consistent structure so they can be lifted as footnotes for the future site. OSINT and open infrastructure are the throughline.*

---

## Part 1: Source Reviews

Each review covers six fields: **what it is**, **what it delivered well**, **where it fell short**, **trustworthiness and verifiability**, **funding and motivation** (since this often determines what the source can and cannot say), and **design lessons** for the future guide site.

Sources are grouped by the role they played in your session: orientation tools, mechanism explainers, and authoritative deep dives.

### Orientation tools

These are pages that helped you understand the *space* of the question rather than answer a specific question. They are the right kind of source for the early exploration phase.

#### givemeyourdata.org

*What it is.* A live-demo educational tool. Open the page and it shows you, in your own browser, what data a website can read about you: User-Agent, screen size, timezone, fonts, canvas fingerprint, hardware concurrency, language preferences, and so on. All processing happens locally; the site explicitly markets itself as not transmitting anything. A "Real Websites Track You" section then lists what commercial sites do beyond what the demo shows.

*What it delivered well.* The conversion from abstract to concrete is the strength. You stopped speculating about what tracking looks like the moment you saw your own attributes listed back to you. The page is honest about the gap between what it demonstrates and what real sites do, which is a rare and important property for an educational tool.

*Where it fell short.* The URL Tracking Demonstration is the documented weakness in your log: it invited an action without telling the user what success looks like. A demo that requires the user to already know what UTM parameters do in order to recognize the demo's behavior is a demo aimed at someone who doesn't need it. Your annotation is correct: when demonstrating something invisible, name the invisibility.

*Trustworthiness and verifiability.* Source code visibility is the test. The site claims everything happens locally, which is verifiable by opening browser developer tools and watching the network tab while the page runs. A user can confirm the claim themselves. This is a strong epistemic posture: don't trust me, observe.

*Funding and motivation.* No visible sponsor, no affiliate links, no product upsell. The footer says "Open source. Educational. User controlled." The motivation appears to be civic-educational rather than commercial. Worth confirming by checking the project's GitHub if linked.

*Design lessons.* Live demonstration with self-verifiability is the gold standard for this kind of content and the model your guide should adopt where possible. The lesson about naming invisibility in demos generalizes: any interactive element where "nothing visible happens" is the educational point needs to *say so*, prominently, before the user starts wondering if their browser is broken.

#### EFF Cover Your Tracks (referenced but not directly tested in your log)

Worth flagging here as a complementary tool you'll likely reach for. Same structural property as givemeyourdata.org (live demo, results visible to the user, methodology published) but with a peer-reviewed academic backing through the Panopticlick research lineage.

### Mechanism explainers

These pages walked you through how a specific mechanism works. The right source for a "what does this do" question.

#### privacy.net, "How cookies track you around the web and how to stop them"

*What it is.* A long-form explainer by Dennis Anon, published February 2018, on privacy.net. Walks through session vs persistent vs third-party cookies, retargeting mechanics, the contents of a cookie file, Do Not Track, browser extensions (Privacy Badger, Disconnect, Adblock Plus), and finally a tour of related tracking methods (IP, referrer URLs, web beacons, fingerprinting, cookie syncing, supercookies).

*What it delivered well.* This is the source where the most genuine integration happened in your session. The XSS-via-cookie connection, the email-pixel mechanics, the description of cookie syncing as the dynamic between competing ad networks: each of these is a piece your earlier sources had not given you, and the article presents them with enough technical specificity that the explanations connect to mechanism rather than handwaving.

*Where it fell short.* It is from 2018, which is a long time in this field. The list of recommended browser extensions is still mostly current, but specific recommendations within them (Adblock Plus's parent company, Disconnect's product status) need verification before being repeated as guidance. The "Do Not Track" recommendation is now somewhat dated; DNT signals have been largely deprecated by major sites and the Global Privacy Control (GPC) has emerged as a more legally-anchored alternative. A reader using this article in 2026 should treat the *mechanisms* as durable and the *tool recommendations* as needing a re-check.

*Trustworthiness and verifiability.* Mixed. Most claims are technically verifiable against MDN, RFC 6265, and EFF documentation. The author is pseudonymous ("Dennis Anon"), which weakens accountability but does not by itself disqualify the source. The article cites The Guardian for its list of major tracking-cookie companies but is light on inline citation overall. The factual accuracy of the technical content is high; the editorial framing is consistent enough across the post that the writer clearly understands what they're describing.

*Funding and motivation.* This is the part to flag clearly. Privacy.net is "reader supported and may receive a commission if you buy through links on the site." The site's broader content roster (you can see this in their Latest Posts: "Best VPNs for Grok," "How to unblock Polymarket," "Best VPN Foxtel") makes clear that affiliate revenue from VPN recommendations is a major revenue stream. This article itself is restrained and does not push a VPN, but the broader content strategy is affiliate-driven. **For the guide site:** when citing this article, cite the cookie-mechanism content. Do not citeprivacy.net as an authority on which VPN to use.

*Design lessons.* Long-form explainers that cover one mechanism in depth, with clearly-titled sub-sections, are still the right format for this kind of material. Your moment of "I didn't know I should read this; I'm glad I did" is a reminder that your guide site should not assume readers will skip over comprehensive long-form just because newer formats exist. Include long-form explainers, signpost their depth clearly, and earn the long read with structural navigability.

#### Usercentrics, "Tracking pixels vs. cookies"

*What it is.* A blog post by Tom Wilkinson (Senior Marketing Consultant at Usercentrics GmbH), published November 2025, on usercentrics.com. Covers what pixels and cookies are, how they differ, what compliance frameworks apply, and best practices for site operators.

*What it delivered well.* The comparison table is excellent and is exactly the right structure for this kind of mechanical-difference question. Your three takeaways from your log (pixel-types categorization, the storage-location difference, the "harder for users to block" framing) are all the substantive payoff of this article and they survived the source's commercial framing.

*Where it fell short.* The article is written for site operators trying to stay compliant, not for users trying to protect themselves. This shows up most in what's missing: no discussion of what a *user* can do, how blocking works, what extensions catch what, what the limits of consent banners are from the user side, or how to recognize a pixel in the wild. A user reading this comes away with mechanism but not protection.

*Trustworthiness and verifiability.* High on the technical claims (mechanisms are accurate and consistent with primary sources). The compliance claims are accurate as of the article's publication date but compliance law moves fast, and a reader using this in 2027 should re-verify the GDPR/CCPA framings.

*Funding and motivation.* Usercentrics sells a Consent Management Platform. The article ends with a pitch for their CMP. This is a vendor-published explainer in a market where the vendor's product is sold to comply with the laws the article describes. Compliance vendors have the same structural property you flagged in your log: their explanations of mechanism need to be accurate enough to satisfy regulators auditing their customers, so the *technical* content is generally high quality. The *framing* (consent banners are the appropriate response, our CMP is the appropriate tool) is what to discount.

*Design lessons.* Comparison tables with explicit functionality columns are an efficient density for technical-difference content. Borrow the structure. Note also: when a vendor explainer is your best mechanism source, citing it explicitly (with a flag about the vendor relationship) is more honest than paraphrasing it as if from neutral knowledge.

#### learnwebanalytics, "What's the Difference Between a Cookie, a Pixel, and a Tag"

*What it is.* A short explainer post that adds the "tag" concept to the cookie/pixel comparison and provides the diagram you found useful (Thank You page → Random Website → Ad Server, with the cookie passing through).

*What it delivered well.* The diagram. Specifically, the diagram that finally made the cookie-passing mechanism click into place at minute 11:55 of your log. The article succeeded as a *visual* source where the previous sources had succeeded as *text* sources. That's a real and underappreciated form of educational value.

*Where it fell short.* Text content is shallow; the diagram is doing most of the work. The "tags" framing is important but underexplained in the article (the relationship between a tag, a pixel, and the broader Tag Management infrastructure like Google Tag Manager would have been worth a paragraph).

*Trustworthiness and verifiability.* Single-author marketing-industry blog. Technical claims are accurate but the depth is limited to what serves the article's narrative.

*Funding and motivation.* A learning-oriented marketing-industry site. The audience appears to be marketers learning to use these tools, not users defending against them.

*Design lessons.* This page demonstrates a principle worth borrowing: **a good diagram with three labeled actors and three labeled arrows can outperform several paragraphs of text**. Your guide should commission or create simple, technically-accurate diagrams as a first-class deliverable, not as decoration. The Cookie Passing Through Ad Server diagram is the kind of thing you would draw once and reuse across multiple articles in your guide.

### Authoritative deep dives

These are the sources you reach for when you want primary or near-primary technical authority.

#### MDN Web Docs, "Using HTTP cookies"

*What it is.* The Mozilla Developer Network's reference page on HTTP cookies. Walks through Set-Cookie and Cookie headers, the lifecycle of a cookie, attributes (Domain, Path, Expires, Max-Age, Secure, HttpOnly, SameSite), and security considerations (XSS, CSRF, tracking).

*What it delivered well.* This is the "every-request" mechanic finally locking in for you. MDN's treatment is structurally complete: it tells you what the spec says cookies do, when they are sent, and what each attribute changes. The reader builds an accurate mental model that holds up against future encounters with cookie-related material.

*Where it fell short.* MDN is reference documentation, not a tutorial. A reader without prior context will hit terms like "origin" and "same-site" and need to detour. This is appropriate for what MDN is, but readers using it as a first-encounter source can stall. Pair MDN with one of the explainer posts above for someone newer to the space.

*Trustworthiness and verifiability.* MDN is multi-stakeholder edited and freely licensed, with content history visible per page (the Wikipedia model applied to web standards). It is the closest thing to a canonical reference for web technology that exists outside the standards bodies themselves. Claims on MDN can be cross-referenced against the underlying RFCs (for cookies, RFC 6265 and 6265bis); when MDN and an RFC disagree, the RFC wins.

*Funding and motivation.* Mozilla Foundation backed, community contributed. Mozilla has its own browser strategic interests, which can show up in framing of edge cases (more emphasis on Firefox-specific behaviors, less on Chrome-specific edge cases), but the core technical content is engine-neutral.

*Design lessons.* Reference documentation needs to be honest about being reference documentation. It does not need to "engage" the reader; it needs to be navigable and accurate. Your guide site should distinguish *reference* sections (navigable, dense, comprehensive) from *explainer* sections (linear, pedagogical, with examples) and signpost the difference clearly. Asking a reference to also be an explainer is what produces the worst of both forms.

#### Cloudflare blog, "DNS Encryption Explained"

*What it is.* A 2019 long-form post by Peter Wu on the Cloudflare blog explaining unencrypted DNS, DoT, DoH, the difference between them, deployment status across operating systems and browsers as of writing, and the limits of what DNS encryption does and doesn't protect against. Includes packet captures showing what an observer sees in each scenario.

*What it delivered well.* This is the canonical layered explanation. The post does not treat encryption as a single magical property; it walks through the layered security model where transport encryption (DoT/DoH), authentication (TLS certs), integrity (DNSSEC), and resolver trust are *separate* problems with *separate* solutions, and where encrypting one layer does not solve another. Several of your formulation moments around DNS came from sources downstream of this article, even when you didn't read it directly.

*Where it fell short.* Length and density. A reader who has not yet built up to the question stalls in the deployment-status section. The deployment status itself is now somewhat outdated (browser and OS support has moved since 2019), so a reader using this post in 2026 should treat the *protocol descriptions* as durable and the *deployment status* as needing a re-check.

*Trustworthiness and verifiability.* Cloudflare operates DNS infrastructure at scale, so the company has direct technical knowledge of what is being described. Claims link to RFCs (RFC 7858 for DoT, RFC 8484 for DoH) so anyone can audit them against the standards. The author has a public engineering profile and is identifiable.

*Funding and motivation.* Cloudflare runs the 1.1.1.1 public resolver and benefits commercially when readers adopt encrypted DNS via their service. The post is restrained: it explains the protocols neutrally, mentions Cloudflare's own implementation alongside Google's, NextDNS and others, and does not treat Cloudflare as the only credible answer. The post does not undersell Cloudflare's role, but it also does not claim other providers are inferior. This is a mature technical-blog posture and is the kind of vendor content the guide can cite without heavy disclaimers, *as long as* the post is identified as Cloudflare-published so readers can apply their own discount.

*Design lessons.* The packet capture screenshots are a critical pedagogical move. They convert "an observer can see your DNS query" from claim into evidence. The guide should consider including evidence of the same kind: a real packet capture (anonymized) showing what unencrypted DNS looks like, alongside a real capture of DoH for comparison. This is not casual to produce, but it is the kind of thing that turns a believer into someone who actually understands.

#### Hostinger, "What is DNS"

*What it is.* A long tutorial by Hasna A. and Simon L. on Hostinger's blog explaining DNS, the four DNS server roles (resolver, root, TLD, authoritative), how to change nameservers (in Hostinger's panel), DNS zone editing, record types, propagation, DNSSEC.

*What it delivered well.* The diagrams are the standout property. You flagged this in your log: this site uses screenshots and visual aids more aggressively than the other DNS sources, and they help. The four-server explanation with a labeled diagram is the right pedagogical structure for someone first learning what DNS resolution looks like.

*Where it fell short.* The post slides between two audiences: someone learning what DNS is (sections 1 and 2) and someone configuring DNS for a Hostinger-hosted site (sections 3 onward). The pivot is unstated. A reader interested only in mechanisms gets dragged through Hostinger panel screenshots. A reader interested only in configuration gets unnecessary protocol detail. This is a recurring pattern in vendor-published tutorial content and is worth naming.

*Trustworthiness and verifiability.* Technical claims are accurate. Hostinger is a hosting provider and operates DNS infrastructure for its customers, so they have working knowledge of the topic. The post lists named authors with bylines, which is better than the pseudonymous-author pattern.

*Funding and motivation.* Customer acquisition. Hostinger sells hosting. The post functions both as education and as a doorway into Hostinger's product. The technical content is not corrupted by this, but the recommended workflows assume Hostinger as the implementation. A reader from Cloudflare-Registrar-and-different-host setup will need to translate.

*Design lessons.* Visual density matters. Mix of diagrams, screenshots, and prose carries more cognitive load than prose-only at the same length. **However**, vendor tutorials should be split into "what is the thing" and "how to do the thing in our product." Mixing them confuses readers who only want one. The guide should keep these separate.

#### Computer Hope, "DNS resolver"

*What it is.* A short jargon-file-style entry by Computer Hope. Quick definition, a small diagram of the resolution process, links to related terms.

*What it delivered well.* Speed. The page does one thing: it tells you what a resolver is, with a clear diagram, in under a minute of reading. That's exactly the right scope for a vocabulary-clarification source, which is what you needed at minute 45.

*Where it fell short.* No depth, no citations, no author byline. This is a strength for the use case (read-and-go) but a weakness if the page is wrong (the reader has nothing to cross-check). The page happens to be correct, but the structure provides no way to verify that.

*Trustworthiness and verifiability.* Computer Hope has been around since 1998 and has a long-running reputation as a basic-glossary resource. It is not an authoritative source but it is a stable one.

*Funding and motivation.* Display-ad supported. Content is written for SEO traffic and tends to be short, clear, glossary-style. Affiliate or product pressure is low because the model is volume-based ad revenue rather than conversion.

*Design lessons.* A glossary-density page that does one definition with one diagram has real value and should be a separate format in your guide. Don't try to make the glossary entries do the work of the explainers, and don't try to make the explainers do the work of the glossary. Cross-link aggressively between them.

#### Vercara, "Encrypted DNS Queries"

*What it is.* A whitepaper-style post by Vercara (a DigiCert company) explaining the limitations of unencrypted DNS, the history and basic mechanics of DoH, the operational challenges of deploying DoH in enterprise environments, and a pitch for Vercara's UltraDNS product.

*What it delivered well.* The enterprise-side honesty. Most pro-encryption explainers stop after "encryption is good." Vercara, because they sell enterprise products to organizations that need to monitor DNS for legitimate security reasons (malware C2 detection, acceptable-use enforcement), spells out the *cost* of DNS encryption from the network-operator perspective. This is genuinely useful context that consumer-focused sources often skip.

*Where it fell short.* Pivots into product pitch in the back half. The opening enterprise-trade-offs framing is sound but is partly there to set up the conclusion that "you need our product to manage this complexity."

*Trustworthiness and verifiability.* Vercara is a real enterprise DNS vendor, descended from Neustar's UltraDNS business. Technical content is reliable. The framing is enterprise-defender, not consumer-privacy.

*Funding and motivation.* Sells enterprise DNS services. Audience is network architects and CISOs, not individual users. This shapes what the post finds important (visibility for security), what it understates (privacy benefits to end users), and what it concludes (centralized DoH services from a managed provider are the answer).

*Design lessons.* When a topic has real trade-offs, you need a source that has the *opposite* perspective from your default audience to surface what that audience underweights. For a consumer-privacy guide, an enterprise-network-defender source is exactly that. Cite it as a perspective-rebalancer, not as a primary recommendation.

#### Techlore Forum, "What Your ISP Can See"

*What it is.* A forum thread on the Techlore community discussion site. The original post enumerates what an ISP sees in four scenarios (HTTP, HTTPS, custom DNS, VPN) with concrete examples. Subsequent comments add detail and link out to other sources including the Cloudflare DNS Encryption post.

*What it delivered well.* Conciseness. The four-scenario enumeration is the cleanest version of the visibility-table you eventually built for yourself. As a reference card it's superior to the longer-form sources because every word is doing work.

*Where it fell short.* No formal citation, single author, no editorial review. The accuracy is high but the structural protections of more authoritative sources are absent. Forum content that happens to be correct still depends on the reader's ability to recognize that.

*Trustworthiness and verifiability.* The Techlore community is a known privacy-focused Discourse forum with an associated YouTube channel. The community has reasonable epistemic standards (claims tend to get pushed back on if wrong), so a top thread that has not been corrected by responders is a soft positive signal. The post you cited is internally consistent and aligns with the Cloudflare and MDN material you read elsewhere, which is itself a verifiability check.

*Funding and motivation.* Community forum. Hard to characterize a single funding source. The community broadly leans pro-privacy and anti-Big-Tech, which shapes the framing but does not directly compromise the technical content.

*Design lessons.* The "what they see in four scenarios" enumeration is reusable as a structure. Your guide should produce a canonical visibility table for ISP, Wi-Fi operator, VPN provider, destination, and third-party-on-page perspectives, as a reference card that other articles link back to. The Techlore post is your first draft of this.

#### Ismyispspying.com, "What an ISP can see"

*What it is.* A purpose-built site whose entire premise is the visibility question. Includes the comparison table you found useful.

*What it delivered well.* The visibility table is a clean refinement of the same structure as the Techlore post but with more rows (volume of traffic, time of activity, real IP). It is the closest thing in your sources to the full-actor visibility map you eventually assembled.

*Where it fell short.* Limited body of work. The site is essentially one comprehensive page on one topic. As a single-page resource it is excellent; as a sustained body of authoritative material it is limited.

*Trustworthiness and verifiability.* Privacy-focused single-purpose site. Technical content is consistent with authoritative sources. Author identity and funding are not prominent on the site, which is a soft negative.

*Funding and motivation.* Likely pro-privacy advocacy or affiliate-supported (these sites often link out to VPN providers). Worth a check before citing prominently.

*Design lessons.* The "Full Visibility Table" format is the design pattern your guide should adopt for this content. Build that table once, refine it over time, link to it from every article that references "what does X see," and treat updates to the table as a core editorial responsibility.

### Sources for ad-targeting mechanics

#### ITIF, "How Do Online Ads Work?"

*What it is.* A technology explainer by the Information Technology and Innovation Foundation, published 2021, last updated August 2025. Covers contextual versus personalized ads, the cookie history of online advertising, FLoC and the Privacy Sandbox, IDFA changes, OTT advertising, and policy implications.

*What it delivered well.* The policy-aware framing. ITIF's role in this content is unusual: most ad-tech explainers come from advertisers (which understate trade-offs) or privacy advocates (which overstate them). ITIF is a Washington think tank that sits in the middle and explicitly weighs both. The article describes targeted advertising's benefits to consumers, businesses, and publishers, and then describes the privacy and discrimination concerns, in the same register. This is rare and useful.

*Where it fell short.* The framing has a thumb on the scale toward continued targeted advertising. The "restricting targeted advertising would greatly hurt businesses" framing is policy advocacy, not neutral analysis. The reader gets a balanced description of mechanism and a less-balanced interpretation of policy.

*Trustworthiness and verifiability.* High on mechanism. ITIF is a credentialed think tank with named staff, congressional testimony record, and traceable funding. Citations in the article link to PwC/IAB revenue reports and Google's developer documentation.

*Funding and motivation.* ITIF is funded by tech companies including Google, Meta, Amazon, Microsoft, and others, in addition to foundation grants. This is disclosed on their site (and is verifiable through their public supporters page). The funding profile shapes the policy framing toward "innovation-friendly" positions, which on this issue means defending the targeted-advertising business model. **For the guide site:** cite ITIF for mechanism and policy-context, but pair with a privacy-side source (EFF, EPIC, Center on Privacy & Technology) when the question is "should this be regulated."

*Design lessons.* The "Why Now / Prospects / Applications / Policy Implications" structure is a useful template for explainer articles. Borrow it. Also borrow the explicit "Last Updated" date prominently displayed; this is rare on the web and dramatically improves a reader's ability to calibrate freshness.

### Source assessments at a glance

Sources you would cite confidently in the guide for the noted purpose:

- **MDN Web Docs** for cookie and HTTP mechanics (reference)
- **Cloudflare blog (DNS Encryption Explained)** for DNS encryption layered model (explainer with vendor flag)
- **givemeyourdata.org** for live demo of browser exposure (tool)
- **EFF Cover Your Tracks** for fingerprinting (tool with peer-reviewed methodology)
- **ITIF** for ad-tech mechanism and policy-context with funding disclosure (explainer with funding flag)

Sources that are genuinely useful but require flagging:

- **privacy.net** for cookie and tracking mechanism content, *not* for VPN recommendations (reader-supported with affiliate revenue)
- **Usercentrics** for pixel/cookie comparison (vendor-published, technical content reliable, framing for site operators)
- **Vercara** for the enterprise-network-defender perspective (vendor-published, useful as perspective-rebalancer)
- **Hostinger** for DNS basics with diagrams (vendor tutorial, reliable mechanism, separate the "what is" from the "how to do in our product")
- **Hostinger / learnwebanalytics / Computer Hope** for diagrams that make a mechanism click (visual explainers, low depth)

Sources that are useful but should not anchor an argument:

- **Techlore forum / ismyispspying.com** for clean enumerations of who sees what (community/single-purpose, accurate but informal)

The pattern across all of these: technical content survives commercial framing as long as you read for mechanism and discount for funding-shaped framing. The guide should make this distinction explicit in its source-citation style.

---

## Part 2: Topic Outline for the Guide Site

Organized around your stated topic categories. OSINT and open infrastructure are treated as horizontal themes, woven through every cluster rather than siloed.

### Cluster 01: Tracking and Data Flow

The cluster you've already started. Now mature enough that the content from your session log fits cleanly into it.

- *01.1 Anatomy of a page load.* The DNS lookup, TCP/TLS handshake, request, response, cascade of third-party fetches.
- *01.2 What's in a request.* IP, User-Agent, Accept-Language, Referer, cookies; what each reveals.
- *01.3 First-party vs third-party collection.* The structural difference that does most of the work in tracking discussions.
- *01.4 Cookies in depth.* Session, persistent, first-party, third-party. Attributes (Secure, HttpOnly, SameSite). When cookies are sent. Why "every request" matters.
- *01.5 Pixels and web beacons.* What they are mechanically, the email-tracking case, why they are harder to block than cookies.
- *01.6 Tags and tag managers.* The infrastructure layer that loads pixels and cookies. Google Tag Manager as the canonical example.
- *01.7 Fingerprinting.* Canvas, WebGL, audio, font enumeration, hardware concurrency. Why blocking cookies doesn't fix fingerprinting. The crowd-blending strategy of Tor Browser.
- *01.8 The actor chain.* Visible third parties (analytics, ads, embeds), invisible ones (data brokers, identity providers, RTB participants), how they aggregate.
- *01.9 The full visibility table.* The Techlore-style cross-reference of "who sees what" for each combination of (HTTP/HTTPS), (default DNS / encrypted DNS / VPN / Tor), (logged in / logged out).
- *01.10 OSINT lens.* The broker products that journalists use to investigate corporate beneficial owners are the same products sold to anyone who pays. The investigative-OSINT and personal-privacy questions are the same question viewed from opposite sides.

### Cluster 02: Threat Modeling

Foundational and currently missing. Without an explicit threat model, every recommendation in the rest of the guide is unanchored.

- *02.1 What a threat model is.* Adversary, asset, capability, mitigation. The "what are you protecting from whom" frame.
- *02.2 Common consumer threat models.* Casual surveillance, targeted by an abusive ex, journalist source, dissident in a hostile state, employee of a surveilled employer. Each gets different recommendations.
- *02.3 The risk of one-size-fits-all advice.* Why the same recommendation that helps a journalist source can hurt a domestic-violence survivor and vice versa.
- *02.4 How to read a privacy recommendation.* Spot the implicit threat model and adjust.

### Cluster 03: Networking Layers

The "what does each layer hide and reveal" deep dive.

- *03.1 IP addresses.* What an IP reveals. IPv4 vs IPv6. Static vs dynamic. CGNAT and what it means for tracking.
- *03.2 DNS.* The four-server resolution chain. What plain-text DNS leaks. DoH and DoT. Filtering DNS (NextDNS, Pi-hole) as a client-side defense layer.
- *03.3 TLS and HTTPS.* The handshake. Certificates and authority. SNI, ECH, and what's still visible.
- *03.4 Hosting your own server.* What you actually expose when you run a service on your home connection. NAT, port forwarding, dynamic DNS, the case for a small VPS instead.
- *03.5 Browsers compared.* Default tracking behavior of Firefox, Safari, Chrome, Brave, Tor Browser. Configurations and extensions that change the behavior.
- *03.6 Wi-Fi and bandwidth.* How Wi-Fi standards (802.11ax/be) interact with throughput. Why "your wifi is slow" is often not about your wifi.
- *03.7 Metadata and cache.* What survives clearing your history. Browser cache, DNS cache, OS cache, ETags, service worker storage.
- *03.8 URLs in detail.* Relative vs absolute, fragment identifiers, query strings, UTM and click identifiers (gclid, fbclid).
- *03.9 OSINT lens.* The same network signals that you are trying to hide are what investigators trace. Understanding what leaks is symmetric to understanding what can be found.

### Cluster 04: Anonymity and Circumvention

- *04.1 The trust-shift framework.* Why privacy is layered, not solved. What a VPN is and isn't. The single-party-sees-both problem.
- *04.2 Tor and onion routing.* Three-relay topology. Entry, middle, exit. Why no single party knows both ends. Tor over VPN, VPN over Tor, when each makes sense.
- *04.3 Tails and operating-system-level anonymity.* When the threat model justifies the additional friction.
- *04.4 The dark web.* What .onion services actually are. The misconceptions worth correcting. Legitimate uses (whistleblowing, censorship circumvention) versus the exaggerated criminal-uses framing.
- *04.5 Torrenting and direct downloads.* Mechanics of BitTorrent, what trackers and peers see, how this differs from a direct download. Legal context.
- *04.6 The limits of anonymity.* Account login defeats anonymity tools. Behavioral fingerprinting (typing rhythm, writing style) defeats network-level tools. The threat model determines whether these matter.
- *04.7 OSINT lens.* The defender's playbook is also the investigator's failure mode list. A site like Bellingcat's archiving how-to is, from the other side, a guide to what the surveilled person should be alert to.

### Cluster 05: Hardware and Component Literacy

- *05.1 Mental model.* The CPU computes, the GPU computes specialized things (graphics and parallel math), RAM holds working data, storage holds persistent data, the network card moves bits, the display shows them, the battery powers them. Other components (fans, sensors) support these.
- *05.2 CPU.* Cores, threads, clock speed, cache. What "more cores" actually buys you. Single-threaded vs multi-threaded workloads.
- *05.3 GPU.* What integrated vs discrete means. VRAM. Why GPUs do machine learning. The G-Sync / FreeSync / VRR family.
- *05.4 RAM.* Capacity vs speed. DDR generations. Why "more RAM" sometimes does and sometimes doesn't matter.
- *05.5 Storage.* HDD vs SATA SSD vs NVMe. File systems (NTFS, APFS, ext4, btrfs, ZFS) and what each is good at.
- *05.6 Networking hardware.* Wi-Fi cards (standards, antennas), Bluetooth (versions and what they support), Ethernet.
- *05.7 Display.* Resolution, refresh rate, response time (ms), panel types (IPS, OLED, TN, VA), HDR. What FPS means and how it relates to ms and Hz.
- *05.8 Thermals and power.* Fans, heat dissipation, TGP for laptop GPUs. Why a laptop with the same chip as another can perform differently.
- *05.9 Battery.* Wh capacity, charge cycles, what "fast charging" means.
- *05.10 Reading a spec sheet.* What to look for, what marketing buzzwords obscure, what to actually compare across products.
- *05.11 OSINT lens.* Hardware leaves traces. The MAC address of your wifi card, the HWID of your machine, the unique bitwise quirks of how your GPU renders a canvas. Knowing what hardware exposes is part of knowing what to do about it.

### Cluster 06: Software Stack

- *06.1 Operating systems.* Windows, macOS, Linux distributions, BSD. What an OS does and what differs. What "open source" means for the OS layer.
- *06.2 The kernel.* What the kernel is and why it matters. Kernel space vs user space. Why "kernel-level anti-cheat" is controversial.
- *06.3 Drivers.* What a driver is. Different types (kernel-mode vs user-mode, signed vs unsigned). Why driver updates matter for security.
- *06.4 Background services and daemons.* What's running on your machine that you didn't start. Telemetry. Auto-updaters.
- *06.5 Runtime environments.* What a runtime is (the JVM, Node, .NET, Python interpreter). Why "you need to install Java" was once a sentence everyone heard.
- *06.6 Applications.* Where applications live, what permissions they have, the difference between an installed application and a web application running in a browser.
- *06.7 Tools versus manual.* When to use a high-level tool versus when to do it manually. Trade-offs of automation. Terminal versus GUI versus PowerShell, with practical entry points.
- *06.8 OSINT lens.* The metadata embedded in files (EXIF in photos, document metadata in Word/PDF) is a recurring OSINT signal. Understanding what your software writes into your files is part of self-defense.

### Cluster 07: Security Posture and Practical Defense

- *07.1 Authentication.* Passwords, password managers, hardware keys (FIDO2/WebAuthn, passkeys), TOTP, SMS. The 2FA debate honestly handled (mainstream-security view + the privacy-rights critique).
- *07.2 Encryption at rest.* What full-disk encryption does and doesn't protect against. Sleep state vs powered-off state.
- *07.3 Encryption in transit.* What HTTPS, VPN, Tor, and end-to-end-encrypted apps protect at each layer.
- *07.4 Phishing and social engineering.* The attacks where the technical layer doesn't help. What recognizable cues look like.
- *07.5 Software supply chain.* Why open-source is auditable in principle and how to read a project's trust signals (maintenance activity, code review, signing).
- *07.6 Backups.* The 3-2-1 rule. Why "I have it in the cloud" is not a backup. Encrypted offline backups for sensitive material.

### Cluster 08: Radio and Spectrum

- *08.1 The spectrum.* What "frequency" means in plain language. The bands and what's allocated to what.
- *08.2 Licensed vs unlicensed spectrum.* What a license buys (protection from interference, bandwidth assurance) and what unlicensed lets you do (innovate, fail, compete). Wifi (unlicensed) vs cellular (licensed) as the canonical comparison.
- *08.3 Amateur radio.* What an amateur license actually is, what it lets you do, and why the unlicensed alternatives exist.
- *08.4 Mesh networking.* Meshtastic vs Meshcore, what each does, who uses them, what the trade-offs look like (range, message volume, durability under congestion).
- *08.5 LoRa and similar.* The class of long-range low-bandwidth radio that mesh networks are built on.
- *08.6 OSINT lens.* Radio is a transparency boundary. Anyone with an antenna can listen to broadcast frequencies; this is both a public good (open communication) and an exposure (unencrypted radio is observable). The same property is what makes amateur radio valuable for emergency communication and risky for sensitive content.

### Cluster 09: Historical Tech and Continuity

- *09.1 Why historical tech still matters.* Some old technologies are still in use, some are still in your devices in vestigial form, and some inform how current systems work.
- *09.2 Print.* Document formats, FTP-era distribution, why PDF persists.
- *09.3 Optical and tape media.* DVD, CD, VHS, magnetic tape. Where each is still used and why (long-term cold archival).
- *09.4 Older protocols.* FTP, telnet, IRC, NNTP. What they do and why they survive in niches.
- *09.5 Older file systems.* FAT and what "format my drive" used to mean. Why USB drives still ship FAT32 by default.
- *09.6 OSINT lens.* Older technologies are often less monitored and more transparent. Investigators sometimes find paydirt in formats that current adversaries assume nobody checks anymore.

### Cluster 10: Building From the Bottom Up

- *10.1 Why build your own.* What you learn, what you control, what you don't have to trust.
- *10.2 A first PC.* Selecting a CPU, motherboard, RAM, storage, GPU, PSU, case. What compatibility matrices to read.
- *10.3 A first home server.* Repurposing an old laptop or buying a small ARM board (Raspberry Pi, similar). What "self-hosting" actually means.
- *10.4 A first network.* Routers, switches, what your ISP supplies and what you can replace. Bypassing the ISP-provided modem-router combo.
- *10.5 OSINT lens.* Self-hosting is the OSINT-aligned pattern. Open infrastructure, in your own hands, with no third party between you and the data.

### Cluster 11: Site Architecture and Site Lessons

The meta-cluster, separate from content but part of the project.

- *11.1 FAIR principles.* Findable, Accessible, Interoperable, Reusable. How they apply.
- *11.2 Source-citation style.* Every cited source carries a structured review (the format from Part 1).
- *11.3 Last-reviewed dates.* Every section dated, with a re-review schedule.
- *11.4 Versioning.* When a tool recommendation changes, the old version remains accessible with a deprecation note rather than being silently overwritten.
- *11.5 Accessibility.* Semantic HTML, no required JavaScript for the static text content, screen-reader compatible, image alt text, color contrast.
- *11.6 Open licensing.* Creative Commons (CC BY-SA most likely) so the content can be reused with attribution.
- *11.7 Design influences.* The lessons-pulled-from-source-reviews pass produces a design-principles document.

---

## Part 3: FAIR Applied

The FAIR principles were originally written for research data but apply cleanly to a guide site. Here is how they map.

**Findable.** Every cluster, every article within a cluster, and every major section within an article has a stable, descriptive URL fragment. Search is not the only entry point; an explicit topic index and a glossary index both exist. Every article has a unique persistent identifier (URL with versioned slug) so that external links remain valid as content evolves. The site is open to indexing by general search engines and includes a sitemap.xml.

**Accessible.** Content is readable without JavaScript for the static text. Diagrams have descriptive alt text. The site renders cleanly in text-mode browsers (Lynx, w3m), which is also a litmus test for screen-reader usability. Color is not the sole carrier of any information. The site does not put content behind a wall (no login required, no paywall, no region block).

**Interoperable.** Content is authored in plain Markdown so the source can be exported and reused. Source-link metadata follows a consistent structure (author, publication, date, last-checked-date, notes). Where a piece of content has a structured equivalent (a comparison table, a glossary entry), that structured form is exposed as a separate downloadable artifact.

**Reusable.** All content is licensed under Creative Commons Attribution-ShareAlike (CC BY-SA 4.0) so it can be reused, translated, adapted, with attribution. Every article has a stable revision history. Source reviews are kept separate from content reviews so they can be updated without rewriting articles. Major dependencies (the Visibility Table, the Threat Model templates, the Source Review template) are themselves first-class artifacts that other articles cite, not buried passages.

The deeper FAIR commitment is that the guide treats *its own knowledge production* as transparent. Why we say what we say, where we got it, when we last checked it, and how to update it should all be visible. That commitment is itself the OSINT throughline: open infrastructure, transparent sourcing, methodology in the open.

---

## Part 4: OSINT and Open Infrastructure as Throughline

OSINT is not a topic cluster. It is a way of building. A few practical commitments make the throughline concrete:

**Transparent sourcing.** Every claim cites a source. Every cited source has a review. Every review names the funding and motivation of the source. This is the opposite of the "trust me, I'm an expert" register that dominates consumer privacy advice and marketing.

**Open infrastructure preferences.** When recommending tools, prefer open-source over proprietary, federated over centralized, audited over unaudited. State this as a preference rather than a rule, since there are real cases where the proprietary tool is the better practical choice; but make the preference visible so readers can apply their own weighting.

**Self-hosting as default mental model.** Articles on tools should always answer the implicit question: "could the user do this themselves?" Sometimes the answer is no (operating Tor, running a major email service). Sometimes the answer is yes and the alternative is genuinely simpler (Pi-hole instead of NextDNS, Bitwarden self-hosted instead of cloud). Naming the option matters even when most readers will not take it.

**Symmetric framing.** Every defensive technique (this is how to avoid being tracked) has an offensive twin (this is what an investigator can find), and vice versa. Articles should make the symmetry explicit. This is how the guide stays honest about being centered on OSINT: it is the same knowledge from both sides.

**No paywalls, no proprietary platforms.** The site is hosted on infrastructure the project controls, with content in open formats, served as static HTML. No Substack, no Medium, no Discord-only docs.

---

## Part 5: How This Builds On Your Session

Your session was successful in the way the assignment is meant to test. You did not learn everything; you built a structural map you can keep filling in. The question map you produced at the end of the session (Cluster A on what happens when you visit a website, Cluster B on who sees what) is a working draft of the guide architecture. The clusters above are a refinement of that, expanded to the full topic surface you specified, with explicit OSINT and open-infrastructure throughlines that your initial framing implied but did not yet name.

A few specific pieces from your log that should make it into the guide:

The annotation **"when demonstrating something invisible, name the invisibility"** is a reusable design principle and belongs in Cluster 11.

The observation that **search results were heavily commercial early in the session and got cleaner as your queries got more technical** is itself an information-literacy lesson worth its own short article. This is the same pattern as the Cluster 04 trust-shift framing for VPNs: who is paying to rank for the keywords you are searching shapes what you find.

The pattern of **deferring technical chases to keep the session moving** (canvas fingerprinting mechanics, port semantics, what TGP means, what cache really is) is the natural way comprehension proceeds at this stage. The deferred items are honest research backlog, not gaps to be embarrassed about. The guide should treat them as Cluster 02 sub-questions and produce them in turn.

The **shift from "VPN equals privacy" to "privacy is layered, VPN affects one layer"** is the canonical formulation moment for this domain. The fact that you reached it by the end of the session means the guide can build on that formulation; it does not need to spend pages re-establishing it.

Last reviewed: April 25, 2026. Next review due: October 2026.
