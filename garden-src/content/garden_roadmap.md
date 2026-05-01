# Garden Content Roadmap and Site Design Notes
### hris28.github.io/garden — Planning Document

*Working reference for content, structure, writing principles, and design decisions. Updated as the garden grows. Not a finished document.*

---

## I. What this document is for

This is the planning layer beneath the garden. It answers three questions: what to write, in what order, and how. It also records what nearby sites do well and where they fail, so the garden learns from them rather than repeating their mistakes. The raw search session that produced much of this document's raw material is appended in the source log; the search itself is as much a data source as the pages it found.

The garden is not a blog. Posts do not expire. The goal is not to publish frequently but to publish accurately, and to mark clearly what is known, what is uncertain, and what is incomplete. A half-finished article that says it is half-finished is more useful than a finished article that omits its own limits.

---

## II. Site design critiques

### PapersFlow (papersflow.ai)

PapersFlow is a research tool product with a blog attached. The blog exists to drive organic search traffic toward the product, and this is visible in almost every design decision. Articles follow a rigid formula: a keyword-dense title, a TL;DR box, a table of contents, a comparison table, a pros-and-cons list, a verdict, a call-to-action for PapersFlow. The writing itself is competent but recognizably templated: the paragraphs follow the same length and pattern across articles, which produces a ceiling on how much thinking the reader can absorb before the repetition becomes noise.

The comparison pages (papersflow.ai/compare) work better than the blog posts. They are structured to answer a genuine question a user might have, and the structure holds: what does each tool do, for whom, in what situation should you choose it. The weakness is that PapersFlow is always the winner, which any experienced reader discounts after the first page. A comparison that consistently declares itself the victor is not a comparison; it is an ad formatted to look like one.

Design strengths: clean typography, clear visual hierarchy, good use of anchor links within long articles, fast load times. Design weaknesses: too many internal links crowding the navigation, the sidebar sometimes competes for attention with the article, and the "Read next" blocks interrupt the text at arbitrary points rather than appearing naturally at the end.

What the garden should take from this: the structured comparison format is genuinely useful, and the article structure of "what it is, for whom, how to use it, what it does poorly" is a good skeleton. What the garden should not take from this: the formula-writing, the self-promotional conclusion, the internal-link saturation that buries content under navigation.

### CitationStyler (citationstyler.com/en/knowledge)

A single-author site by someone who makes custom citation styles and writes about Zotero. This is almost the opposite of PapersFlow in origin and character. The posts are written from direct experience with the tool, the author's name is visible, and the site exists because the person found something genuinely useful to explain. The knowledge section is short but not padded. The writing is functional and honest.

The weakness is visual: the site loads with several frames of blank space before images appear, the font choices are safe but not particularly readable at length, and the card-based layout on the knowledge index gives equal visual weight to every article regardless of its quality or relevance. There is no way to tell which piece a new reader should start with.

What the garden should take from this: the authorial tone, the specialization in something genuinely known, the absence of commercial framing. What the garden should not take from this: the visual parity problem, and the lack of any entry-point guidance for someone arriving without context.

### EFF Surveillance Self-Defense (ssd.eff.org)

Not in the original list but encountered during the search session and worth including here as a design reference, since it is the closest institutional peer to what the garden's privacy cluster is trying to do.

SSD organizes content by threat model and audience first, then by topic. The opening page does not assume the reader knows what they need; it asks who they are ("activist," "journalist," "everyday person") and routes accordingly. Each article links to underlying concepts and to more advanced treatments, creating a natural reading path without forcing it. Sources are cited inline with links, the writing is clear without being condescending, and the site explicitly says when something is out of date.

Design weaknesses: some articles are long enough that the absence of in-page navigation is felt, the visual design is institutional rather than warm, and the threat-model categorization is occasionally difficult to navigate when a reader's situation spans multiple categories.

The garden should aspire to this level of structural honesty and should study how SSD handles the transition from "here is what this is" to "here is what to do about it," since the garden will have to navigate the same transition across most of its security and privacy articles.

### Privacy Guides (privacyguides.org)

Community-maintained, donation-funded, no advertising, transparent editorial policy, named authors. Already identified in the search session as the highest-signal source for the privacy cluster. The recommendation pages show a model for tool reviews the garden should follow: explicit threat-model callouts, short prose explanations of why each recommendation was made, a clearly stated logging policy for any service recommended, and an explicit note when something is only suitable for certain threat levels.

Design strengths: the recommendation structure is honest about tradeoffs in a way most review sites are not, the site renders cleanly at any viewport, and the internal linking structure connects concepts to each other without feeling like an SEO exercise.

Design weakness: the site's community structure means that the voice varies across articles, and some sections are denser than others without clear signposting. Navigation for a first-time user who does not already know what they are looking for is harder than it should be.

### libguides.unm.edu/citation-managers

A library guide: a WordPress or LibGuides CMS page maintained by the University of New Mexico Libraries. LibGuides is a tool many academic libraries use to organize subject guides, and this guide covers citation managers in the typical LibGuides format: tabs across the top, each tab covering one tool, with a mix of embedded video, linked documentation, and brief summary text.

Design observation: LibGuides are almost universally functional and almost never beautiful. The format privileges completeness over clarity, the tab structure makes it easy to miss context that sits in a different tab, and the lack of prose connective tissue between sections means a reader has to hold the organizational logic in their head. The content is accurate and maintained by a professional with access to institutional expertise. The presentation flatters no one.

What the garden takes from this: the comprehensiveness instinct is right, but comprehensive content delivered through flat tabs is not the same as comprehensiveness delivered through readable prose that builds on itself. The garden should cover the same breadth that a good LibGuide covers, in prose a person would actually read.

### Dan's Web Tips (webtips.dan.info/annoying.html)

Reviewed in the guide cluster document. Included here because the page itself is a design example: single long page, no pagination, created and modified dates visible at the bottom, no analytics, no JavaScript required to read. The page loads instantly on any connection and can be read in a text browser.

The garden's own pages should answer the same question this page answers implicitly: "does this page respect the reader's time and browser?" A page that fails to load without JavaScript, shows a cookie consent modal before any content, or takes four seconds to become readable has already signaled something about its values.

---

## III. What the garden should look and behave like

A few principles derived from the site reviews and from the search session observations.

Every article gets a created date and a last-reviewed date. These are not optional. A privacy or security article without a date is a liability. The reader cannot tell whether it describes the state of things in 2018 or 2026, and in this domain the difference is not minor.

Every specific claim that depends on a source gets a link to that source, and that source should be archived. The Ars Technica article encountered during the search session was unreachable because the publisher blocked access. The Bellingcat archiving guide says exactly how to handle this: archive.today and archive.org, with both URLs included. If a claim matters enough to make, it matters enough to preserve its evidence.

Hovering over a link should show a preview. This was identified in the brief as a feature other sites lack that would help users. The implementation is a link-preview library (there are several lightweight JavaScript options, including `predicthq/link-preview-js` and the native `title` attribute for simpler cases). The screenshot-preview version requires generating and storing thumbnails, which is more work but produces a better experience for external links.

No article should be published without a verifiable source for every factual claim. If a claim cannot be sourced, it should be marked explicitly as the author's reasoning or framing rather than a documented fact.

The reading level should be accessible to someone with no technical background. This does not mean avoiding technical detail. It means scaffolding technical detail with enough context that the reader who does not already know the term can follow the argument. The search session demonstrated the cost of the alternative: pages that use correct vocabulary without explaining it produce readers who feel they have read something without having understood anything.

---

## IV. Content roadmap: what to write and in what order

The ordering logic is: foundational concepts first, then mechanisms, then actors, then tools, then edge cases and historical context. Each piece should be readable without assuming the previous ones, but should link to them where they would help.

The questions below are written in the voice of a real reader, because that is who will search for them. Most of the articles do not map one-to-one to a question; they answer a cluster of related questions together.

---

### Cluster 01: What actually happens when I visit a website?

This is where the garden starts, because everything else builds on it. The raw session discovered that this question, while apparently simple, expands in ways most sources do not follow through on. Most explainers stop at "HTTPS encrypts the connection." The honest answer is more interesting and more alarming.

**Article 01-A: Anatomy of a page load**

Questions it answers: What happens between pressing Enter and seeing a page? What is a DNS query? What is an HTTP request? What is a response? What is a TCP connection? Who is involved at each step? The article should walk through the sequence literally, naming each actor and what they receive, without assuming any prior technical knowledge. It should include a diagram of the resolution chain (the Computer Hope diagram from the session was cited as excellent for this).

Sources to draw from: Computer Hope DNS resolver diagram (computerhope.com/jargon/d/dns-resolver.htm), Hostinger DNS tutorial (hostinger.com/uk/tutorials/what-is-dns), Cloudflare Learning Center, MDN Web Docs. All should be archived at time of citation.

Source notes from session: Computer Hope is unusually clear on resolver terminology. Hostinger is visual and screenshot-rich. Both were found to be accurate and accessible for a non-technical reader.

**Article 01-B: What HTTPS actually protects, and what it does not**

Questions it answers: What does the padlock actually mean? What is encrypted? What is not? What is SNI? What is TLS? Can my ISP see which sites I visit even when HTTPS is in use?

The most important thing this article must not do is leave the reader with the impression that HTTPS equals privacy. The session's key realization at 42:51 was exactly this: HTTPS protects content after the connection opens, but does not protect the DNS lookup that opened it, and does not hide the IP address or the SNI hostname. This article exists to produce that realization in the reader without them having to spend 45 minutes searching for it.

Sources to draw from: https.cio.gov government reference page (authoritative, no commercial interest, explains SNI clearly), Cloudflare TLS and SNI explainers, Techlore forum post "What Your ISP Can See" (which was cited in the session for its step-by-step visibility table). The Vercara/Digicert DoH guide is usable for the HTTPS-DNS relationship but readers should be told it concludes with a product recommendation.

The "Full Visibility Table" copied at 47:46 in the session is a strong model for how to present the information: rows for different actions, columns for what each party can see under different conditions.

**Article 01-C: DNS in depth**

Questions it answers: What is a DNS resolver and why does it matter who runs mine? What is the difference between DNS-over-HTTPS and a VPN? What is QNAME minimization and why does nobody talk about it? What does "changing my DNS" actually change, and what does it not change?

This article should explicitly correct the overclaiming around encrypted DNS. The Internet Society's statement that changing DNS "simply shifts trust from one organization to another" is the key claim the article needs to make, and it should make it early rather than burying it in a qualifications section. Privacy Guides' note that "encrypted DNS will not help you hide any of your browsing activity" should appear and be attributed.

Sources to draw from: Internet Society DNS Privacy Introduction (authoritative, standards-body level, no product to sell), Privacy Guides DNS resolvers page (comparison with explicit logging policies), Cloudflare 1.1.1.1 privacy policy (for what a specific major resolver actually commits to), PrivateInternetAccess blog for DNS attack types (noting that PIA is a VPN company with a commercial framing interest).

---

### Cluster 02: Tracking, mechanically

**Article 02-A: Cookies**

Questions it answers: What is a cookie? What does it literally store? What is the difference between a first-party and third-party cookie, mechanically? What is a session cookie versus a persistent cookie? What does "clearing cookies" actually do, and what does it leave behind? What are cookie flags like Secure, HttpOnly, and SameSite?

The MDN HTTP cookies reference was the best source found in the session and should anchor this article. The session's own synthesis at 11:55 is a good model for how to explain the pixel-fetch-cookie combination in plain terms.

**Article 02-B: Tracking pixels and tags**

Questions it answers: What is a tracking pixel? Why is it called a pixel? What is the difference between a pixel and a cookie? What is the difference between a pixel and a tag? Why does opening an email expose you the same way visiting a website does? What does blocking images actually do?

The Usercentrics article was found to be accurate on mechanism despite its compliance-oriented framing. The session's three numbered observations at 5:23 provide the structure for this article: pixel types by function, server-side versus device-side storage, and the blocker-as-request-prevention insight.

**Article 02-C: Browser fingerprinting**

Questions it answers: What is fingerprinting? What data is collected? Why can't I delete a fingerprint? How accurate is it? What do defenses against it actually do? What does "nearly unique" mean in practice?

The EFF Cover Your Tracks tool should be recommended at the start of this article as the first thing to run before reading, since the live test produces a kind of motivation that no amount of prose description matches. The session's experience at 55:10 demonstrates why: seeing that your own browser has a nearly unique fingerprint is more persuasive than being told fingerprinting is effective.

**Article 02-D: URL parameters and click tracking**

Questions it answers: What is a UTM parameter? What is a GCLID or FBCLID? Who uses these and why? Can I see them in my URL? What happens to the data they carry?

This article exists partly because the session exposed a gap: the givemeyourdata.org demo failed to name what the reader was supposed to notice, and most sources on these identifiers are written for the people deploying them. This article should be written from the reader's side. The session's annotation at 2:39 is the design principle: when demonstrating something invisible, name the invisibility.

---

### Cluster 03: Who can see what

**Article 03-A: Your ISP**

Questions it answers: What can my ISP see by default? What does HTTPS protect me from? What does it leave visible? Does my ISP keep logs? What can they sell, and to whom? What is Deep Packet Inspection and when is it used? Can I opt out?

The Techlore forum post was one of the most practically useful sources in the session precisely because it gave a row-by-row, scenario-by-scenario breakdown rather than a general answer. This article should replicate that structure in prose form with a summary table.

**Article 03-B: The websites you visit**

Questions it answers: What does a website see when I arrive? What is in the HTTP request header? What is a referrer header and where does it come from? What is a User-Agent string? What can the site see that I did not intentionally send?

**Article 03-C: Third parties embedded in a page**

Questions it answers: Why does loading a news site contact dozens of servers I never heard of? Who are these companies? What do they receive? What is cookie syncing and how do ad networks combine their data to compete with Google?

The privacy.net cookies article at 16:48 introduced cookie syncing in a way none of the other sources encountered in the session did. That article's treatment of how advertising companies pool data by merging or partnering should be the basis of this section. The ITIF explainer on how online ads work is a useful policy-side complement.

**Article 03-D: Data brokers**

Questions it answers: What is a data broker? Where do they get their data? Who buys it? What can be inferred from combined records that neither source alone reveals? What are removal options and how effective are they?

EPIC's data broker resource and The Markup are the primary sources. This is also the article where the OSINT-privacy convergence should be addressed directly: the same broker products used in open-source investigations are sold commercially with few barriers to access.

---

### Cluster 04: Privacy tools, mechanically

**Article 04-A: VPNs**

Questions it answers: What does a VPN actually do to my traffic? What does my ISP see when I use one? What does the VPN provider see? What does a "no-logs policy" mean and is it verifiable? What is a DNS leak and why does it matter? What is the difference between a VPN and Tor?

The privacy versus anonymity distinction from the Tor article (24:30 in the session) belongs here as much as in the Tor article. The session's realization at 30:09, that Tor-over-VPN is the recommended configuration and the reasoning is clear once laid out, should be explained in plain terms.

**Article 04-B: Tor**

Questions it answers: What is onion routing? Why does it provide stronger anonymity than a VPN? Who are the node operators? What can the exit node see? What are the practical limitations? What is the relationship between Tor and the dark web?

The privacy.net Tor article was one of the better sources encountered, and the session's observation at 28:50 about its honest downsides section is the model the garden should emulate: name the limits of the tool in the same article that explains its strengths.

**Article 04-C: Content blockers**

Questions it answers: How does a blocklist work? What does uBlock Origin actually do when it blocks a request? What is the difference between uBlock Origin and Privacy Badger? Does blocking ads mean blocking tracking? Does it protect against fingerprinting?

**Article 04-D: DNS-level blocking**

Questions it answers: What is a filtering DNS? What is Pi-hole? What is NextDNS? How is DNS-level blocking different from browser-level blocking? What does it protect against that a browser extension does not?

**Article 04-E: Tor Browser and hardened Firefox**

Questions it answers: What does Tor Browser do that regular Tor does not? What is letterboxing? What is resistFingerprinting? How is a hardened Firefox profile different from installing a privacy extension?

---

### Cluster 05: Browser and search engine comparison

**Article 05-A: Browser comparison**

Questions it answers: What are the meaningful differences between Firefox, Brave, Chrome, and Safari in terms of default tracking behavior? What is browser telemetry? Does a signed-in account change what the browser collects? What configuration matters more than the brand choice?

**Article 05-B: Search engine comparison**

Questions it answers: What does a search engine see when I search? Does DuckDuckGo stop tracking? What is the difference between a search engine not logging queries and a search engine whose results are still served through Google infrastructure? What is Startpage? What is Brave Search?

---

### Cluster 06: Infrastructure and network

**Article 06-A: IP addresses**

Questions it answers: What is an IP address? What does it reveal? How accurately can it locate me geographically? What is the difference between IPv4 and IPv6, and why does that matter for privacy? What is a dynamic versus static IP?

**Article 06-B: Wi-Fi and public networks**

Questions it answers: What can a Wi-Fi administrator see? What does HTTPS protect me from on public Wi-Fi? What can a man-in-the-middle attacker on an open network do? What is the risk of connecting to unknown networks?

**Article 06-C: Hosting your own server**

Questions it answers: What happens when you run a server on a home connection? What is port forwarding? What does exposing a port reveal? What are the minimal security practices for a self-hosted service?

**Article 06-D: Cache and metadata**

Questions it answers: What is browser cache and what does it store? What is metadata in a file and what can it reveal? How do you check and strip file metadata? What does "clearing cache" actually delete?

---

### Cluster 07: Anonymity, identity, and the dark web

**Article 07-A: What anonymity actually means online**

Questions it answers: What is the difference between privacy and anonymity? What is pseudonymity? What does "anonymous" mean in practice versus in principle? What does combining anonymous datasets actually reveal?

**Article 07-B: The dark web**

Questions it answers: What is the dark web? What is the relationship between Tor and .onion sites? Is the dark web the same as the deep web? What is actually on it, and for whom?

**Article 07-C: Piracy: torrenting versus direct downloading**

Questions it answers: What is a torrent? What is a magnet link? What does the DHT network expose? What is the difference between downloading directly and via a torrent in terms of who can see the activity? What is a private tracker?

---

### Cluster 08: Hardware and components for a novice

**Article 08-A: What hardware components actually do and why quality matters**

This is a large article or a series. The goal is to give a reader who is buying or building a computer enough background to evaluate claims about specifications. Questions it answers: What does RAM speed and capacity actually affect in daily use? When does a faster CPU noticeably matter and when does it not? What is the difference between an SSD and an HDD in terms of speed, durability, and data recovery risk? What does GPU matter for outside gaming? What is a Wi-Fi card and what does the Wi-Fi standard (Wi-Fi 6, Wi-Fi 6E) actually change in practice? What is a display refresh rate and when is it perceptible?

The session brief noted that the guide should explain "how much different components and their quality actually matter, why, and how to tell." This article should take exactly that frame: not a spec list but an explanation of which specifications are meaningful for which uses, and how to tell marketing language from genuine performance claims.

**Article 08-B: Operating systems and what they do**

Questions it answers: What is a kernel? What is a driver? What is the difference between Windows, macOS, and Linux as a practical matter for a user concerned about telemetry and control? What is a file system and what does it affect? What is a runtime environment?

---

### Cluster 09: Radio and wireless communication

**Article 09-A: Licensed versus unlicensed spectrum**

Questions it answers: What is the electromagnetic spectrum? What is the difference between licensed and unlicensed frequencies? Who regulates radio? What does a ham radio license allow? What frequencies does Wi-Fi use and why?

**Article 09-B: Meshtastic versus MeshCore**

Questions it answers: What is a mesh network? What is LoRa? What is Meshtastic and who is it for? What is MeshCore and how does it differ? When would you use one versus the other? What are the range and throughput limitations of each?

---

### Cluster 10: Historical and adjacent technologies

**Article 10-A: How DVD and optical media work and why they still appear**

Questions it answers: What is the difference between pressed and burned optical media? How does a disc store data? Why do DVDs still appear in legal archives and evidence preservation contexts? What is region encoding and why does it exist?

**Article 10-B: Analog video formats**

Questions it answers: What is VHS in technical terms? What is interlacing and why does it still matter in digitization? What is the difference between PAL and NTSC? Why do some archivists still work with magnetic tape?

---

## V. Features to build into the site

The following are features noticed as absent on other sites during the search session, or identified through design review as useful gaps.

**Link previews.** When a reader hovers over an external link, a screenshot of the target page appears without the page loading. This costs no bandwidth for the reader and prevents the "I have to leave the article to check if this source is worthwhile" problem. Implementation: archive-time screenshot stored locally, displayed via CSS hover. For internal links, a summary card is sufficient.

**Source date stamps.** Every external source linked in an article should display its publication or last-updated date next to the link. This is especially important for the security and privacy clusters, where a source from 2019 may describe mechanisms that no longer apply. The session encountered this repeatedly: the 2018 privacy.net ISP article contained a VPN recommendation that was clearly affiliate content from before several regulatory changes. A reader who could see "2018" next to that link would weight it appropriately.

**Maturity markers.** Each article should show whether it is a stub, a working draft, or a reviewed piece. The digital garden convention of seedling, sprout, and flower works and communicates immediately. A seedling is notes and a skeleton. A sprout is readable but possibly incomplete. A flower is reviewed, sourced, and stable (subject to next-review date).

**Source review sections.** At the bottom of each article, a short prose review of each major source consulted: what the source does well, what it omits, what its framing interests are, and whether it is recommended for further reading. This is modeled on the source review format developed through the search session and on the Privacy Guides editorial model.

**Next-review dates.** Every article carries a next-review date calculated from the volatility of its content. An article on radio spectrum licensing might be stable for three years. An article on tracking pixels might need reviewing annually. When the review date passes, the article displays a visible notice that it has not been checked recently.

**No tracking.** The site should run no analytics scripts, no advertising pixels, no social media widgets, no cookie consent modal (because there are no cookies to consent to). This is not only an ethical position but a design position: it demonstrates the principles the site explains. A site about tracking that tracks its readers would undermine everything.

---

## VI. Writing principles

Derived from the search session and from the site reviews. These are not rules but habits worth forming.

Write one idea at a time. A sentence that contains two ideas connected by "but," "and," or "however" can almost always be written as two sentences. Long sentences in technical writing are usually confused sentences in disguise.

Name the limit of every mechanism you describe. If an article explains what HTTPS does, it must also explain what HTTPS does not do. A reader who leaves with only the positive account has been misinformed as surely as if the facts were wrong.

Never write for a generic reader. Write for someone who has just spent an hour searching and is tired and frustrated. Write for the person who has read three sites already and found them all too vague or too dense. This reader deserves a direct answer at the top of the article, not after a preamble.

Show the search results, not just the conclusions. Where the research for an article produced a notable observation about how results were distributed, or about who is writing on a given topic and for whom, include that observation in the article. The finding that UTM parameter explanations are overwhelmingly written for deployers rather than for people being tracked is itself useful information for the reader. Include it.

When something cannot be verified, say so. If a claim rests on a single uncorroborated source, mark it as such. If a source has a known commercial interest in a claim, name that interest and let the reader adjust. The Popzazzle 2FA article is a good example of a source that is right about some things and wrong about others in a way that can be separated if the article says so, but not if it is cited without comment.

Do not use bullet points as a substitute for thinking. A list of five items with no explanation of how they relate to each other, or in what order they matter, or what to do with them, is not an explanation. It is a deferral. The session's source at 36:31 (GeeksForGeeks on DNS) demonstrated this failure: comprehensive vocabulary, zero hierarchy.

---

## VII. Source log for this planning document

**givemeyourdata.org** -- Live demo of what a server receives from a browser visit. High value for making abstract tracking mechanisms concrete. The URL tracking demonstration failed to name what the reader was supposed to notice, which is both a UX failure and a design lesson. Accessible, honest, well-explained. Best use: entry point for Cluster 01 articles.

**privacy.net (cookies, Tor, ISP articles)** -- User-oriented, comprehensive, covers cookie syncing and the privacy/anonymity distinction clearly. The 2018 ISP article is dated and contains affiliate content. Credibility harder to verify than EFF or Mozilla. Best use: conceptual explanations of cookies, Tor mechanics. Discount tool recommendations.

**Usercentrics (pixel/cookie explainer)** -- Accurate on mechanism, written for compliance officers. The comparison table is genuinely useful. Framing is toward regulatory compliance as a sales opportunity. Best use: pixel taxonomy and cookie type distinctions.

**MDN Web Docs (HTTP cookies)** -- Authoritative, multi-stakeholder maintained, free license. Best technical reference for cookie behavior. Written for developers but accurate for any audience that can follow technical prose. Bookmark and cite frequently.

**GeeksForGeeks (DNS)** -- Comprehensive vocabulary coverage, zero hierarchy, overwhelming for first read. Best used as a reference after the reader already has a mental model.

**PrivateInternetAccess (DNS)** -- Good FAQ structure, covers DNS attack types. PIA is a VPN company; every conclusion orients toward "use a VPN." Use for attack taxonomy, discount conclusions.

**Hostinger (DNS)** -- Strong visual and screenshot-rich design. One of the few sources in the session to use diagrams extensively for network concepts. Best use: visual reference for DNS resolution chain. Check whether it is maintained or static content.

**Internet Society (DNS privacy introduction)** -- Standards-body level. No commercial interest. Directly addresses the "trust shift" problem with DNS resolver changes, and covers QNAME minimization, which almost no other source does. Highest-quality single source on DNS privacy found in the session. Archive and cite prominently.

**Privacy Guides (DNS resolvers, CryptPad review)** -- Community-maintained, no advertising, transparent editorial policy. The resolver comparison with explicit logging policies per provider is unique and highly useful. The CryptPad review is the structural model for how to write a tool review. The blunt correction that "encrypted DNS will not help you hide any of your browsing activity" is exactly what the garden should emulate.

**EFF Cover Your Tracks** -- Live fingerprinting test with documented methodology. Nonprofit, no commercial interest. Essential for Cluster 02-C. Run the test before writing the fingerprinting article; the personal experience of seeing the result is the best explanation of why the article is necessary.

**Techlore Forum (What Your ISP Can See)** -- Community forum post, structured step-by-step by scenario. The visibility table (ISP DNS, ISP network, with DoH, with VPN) is one of the most useful single diagrams found in the session. Attribution should note that it is a community forum rather than a primary source.

**Vercara/Digicert (DoH guide)** -- Good on history and mechanics of DoH, honest about challenges of encrypted DNS. Concludes with a product recommendation. Note the commercial framing at time of citation.

**ITIF (How Online Ads Work)** -- Policy-side explainer from a technology policy think tank. The only source in the session that discussed ad-tech from a position not directly aligned with either operator or advertiser. The FLoC section (noted at 58:10) is now somewhat outdated since Google abandoned FLoC for the Privacy Sandbox, but the contextual-versus-behavioral-advertising analysis is still current.

**PapersFlow (multiple articles)** -- Useful structural model for comparison pages. Writing is formulaic and product-promotional. Do not emulate the writing; study the structure of "what it is, for whom, how to use it, what it does poorly."

**CitationStyler** -- Single-author, specialist, honest. Good model for authorial tone. Weak on visual design and entry-point guidance.

**Dan's Web Tips / Planet Botch** -- Design philosophy references more than content sources. Dan's Web Tips demonstrates that a functional, durable, opinionated page can be a single HTML file with a real creation date and no tracking scripts. This is a principle, not just a page.
