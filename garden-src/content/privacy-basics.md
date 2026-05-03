---
title: "Privacy Basics: Cookies, Pixels, and Fingerprinting"
date: 2026-05-01
lastmod: 2026-05-01
stage: flower
tags: [privacy, tracking, cookies, fingerprinting, beginner]
description: "What cookies, tracking pixels, and browser fingerprinting actually are, how they work mechanically, and what blocking them does and does not achieve."
next_review: 2027-05-01
---

<p class="eyebrow">Tracking · Cluster 02</p>

# Privacy Basics: Cookies, Pixels, and Fingerprinting

The word "tracking" gets used loosely to describe very different technical mechanisms. Someone who says "I got tracked" might mean that a site logged their visit with a cookie, or that an advertising network recognized them across multiple sites using a pixel, or that their browser configuration was identified without any stored data at all. These are not the same thing. They have different threat models and different defenses.

This article explains each mechanism in enough detail that you can evaluate what a given protective tool actually addresses.

## Cookies

A cookie is a small text file. That is the whole mechanism. When you visit a site, the server can instruct your browser to store a piece of text on your device and send it back on every subsequent request to that domain. The instruction arrives in an HTTP response header that looks something like this:

```
Set-Cookie: session_id=abc123; Path=/; Secure; HttpOnly; SameSite=Lax
```

Your browser stores that text. The next time you make any request to that domain — loading a page, submitting a form, fetching an image — your browser automatically includes the cookie in the request header:

```
Cookie: session_id=abc123
```

The server reads it, recognizes you, and knows you are logged in. This is how login sessions work. It is also how tracking works.

### First-party versus third-party cookies

A first-party cookie is set by the domain you are actually visiting. If you visit `example.com`, a cookie set by `example.com` is first-party. The site can only read cookies it set; it cannot read cookies from other sites.

A third-party cookie is set by a different domain from the one you are visiting. Here is how this works in practice: when a page loads, it typically makes requests to external servers to pull in scripts, fonts, ads, analytics, and social media widgets. Each of those requests goes to a third-party server, and that server can set a cookie in your browser. The next time you visit any other site that loads resources from that same third-party server, your browser automatically sends that cookie back.

An advertising network like Google or Meta has code embedded on thousands of websites. Every time you load a page with their code, your browser makes a request to their servers. Your browser carries the cookie they previously set. They now know you visited both sites. Over time, they build a profile of your interests based on the pattern of sites you visit.

This is the engine behind behavioral advertising.

### Cookie flags

The flags in a Set-Cookie header change how a cookie behaves.

**Secure** means the cookie will only be sent over HTTPS connections. A cookie without this flag can be transmitted in plain text.

**HttpOnly** means the cookie cannot be accessed by JavaScript running on the page. This matters for security: without HttpOnly, a cross-site scripting (XSS) attack can steal cookies by injecting malicious script that reads them. With HttpOnly, even if an attacker injects script, they cannot read these particular cookies.

**SameSite** controls when the cookie is sent across sites. `Strict` means the cookie is only sent when you navigate directly to the domain. `Lax` allows the cookie on top-level navigations (clicking a link) but not on embedded resource loads. `None` sends the cookie with every request, which is required for third-party cookies to work at all. Modern browsers are increasingly blocking cookies with `SameSite=None` by default, which is the primary driver of the decline of third-party cookie tracking.

### What "clearing cookies" does

Clearing cookies from your browser deletes the stored files from your device. The next time you visit a site, it no longer recognizes you. This undoes local tracking but does not affect what was logged server-side. The advertising network already recorded your visits. Deleting your local cookies does not delete their records.

### Cookie syncing

An important mechanism that rarely gets explained to users: when two advertising companies want to share their data, they use a technique called cookie syncing. Company A embeds a pixel on a page that Company B also has access to. When you load the page, both companies receive your request. Company A knows your identifier in their system. Company B knows their identifier for your browser. The pixel exchange tells both companies that those two identifiers belong to the same person. Now their datasets can be merged.

This is how smaller ad networks compete with the largest ones. By syncing cookies with enough partners, a network that you have never directly interacted with may have a profile on you assembled from dozens of indirect sources.

## Tracking pixels

A tracking pixel is a resource embedded in a page or email whose primary purpose is to fire a request to a tracking server when loaded. The name comes from the traditional implementation: a 1x1 transparent GIF image that is invisible to the reader but triggers an HTTP request when the page renders it.

The mechanism is simple. Your browser loads the page. It encounters an `<img>` tag pointing to a URL on a third-party server. It fetches that image. That fetch is an HTTP request, which carries your IP address, your User-Agent string, the URL of the page you are on (in the Referer header), and any cookies you have for that domain. The server logs the request. The pixel itself is invisible; only the server-side log record matters.

### Types of pixels

Pixels are differentiated by what they are designed to record.

An **engagement pixel** fires on page load or after some time has passed, recording that you viewed a page and for how long.

A **retargeting pixel** records your visit so the site can show you ads on other sites you subsequently visit. You looked at a product, you did not buy it, and now you see ads for that product on unrelated sites. The retargeting pixel on the product page told the ad network you were there.

A **conversion pixel** fires when you complete a specific action — a purchase, a signup, a form submission. The site uses it to confirm that an ad led to a sale.

### Email tracking pixels

Email clients work the same way as browsers: they render HTML and load external resources. A marketing email typically contains a pixel that fires when you open the message. The sender's server receives your IP address, your email client's User-Agent, and the timestamp. The sender now knows you opened the email, when you opened it, and roughly where you are.

Most modern email clients block remote images by default for this reason. Apple Mail goes further with Mail Privacy Protection, which pre-fetches all images through Apple's servers so that the sender cannot determine whether you actually opened the email or what your IP address is.

Links in marketing emails are also almost always wrapped through a redirect URL that records the click before forwarding you to the destination. The presence of a long, opaque URL when you hover a link in a marketing email is the signal.

### Pixels versus cookies: the critical storage difference

Cookies are stored on your device. You can see them, clear them, or block them.

Pixel data is stored on the tracker's server. You cannot see it, clear it, or know what it contains. Clearing your cookies does not affect what has been logged server-side from pixel requests. This is why clearing your browser history feels thorough but accomplishes less than it seems.

### What blocking pixels means

A content blocker like uBlock Origin works by maintaining lists of known tracker domains. When a page tries to load a resource from a listed domain, uBlock prevents the request from being made at all. The pixel never fires. The server never receives your IP or Referer. Nothing is logged.

This is why content blocking is more powerful than it sounds: it is not just removing visual clutter. It is preventing the tracking event from occurring. The data that would have been collected simply does not exist.

The limitation is that block lists are reactive. They cover known trackers. A new tracker domain, or a first-party tracking implementation where the tracker domain matches the site you are visiting, will not be caught by a list-based blocker.

## Browser fingerprinting

Fingerprinting is tracking without storage. Instead of setting a cookie on your device, the tracker computes an identifier from properties your browser broadcasts as part of normal operation. The result is a value that can be recomputed on every visit and matched against previous values, without storing anything on your device.

### What gets collected

The data points that make up a fingerprint include:

Your **User-Agent string**, which names your browser, version, and operating system. Your **screen resolution and color depth**. Your **timezone and language settings**. Your **installed fonts**, which sites can probe by asking the browser to measure how text renders in different typefaces. Your **canvas fingerprint**, which is computed by asking your browser to draw invisible text or shapes using the Canvas API; different graphics hardware and software produce subtly different pixel outputs, which can be hashed into an identifier. Your **WebGL renderer**, which reveals GPU details. Your **audio fingerprint**, computed similarly to the canvas fingerprint using the AudioContext API. Your **browser plugins and extensions**. Whether you have **Do Not Track** enabled (ironically, enabling this can make you slightly more distinctive in some populations, since fewer people enable it).

None of these are stored on your device. Each is a property your browser exposes during normal operation, and a remote server can compute a hash and compare it to previous sessions.

### How accurate is it

The EFF's Cover Your Tracks project runs a live test that shows how distinctive your browser is in their test population. Most readers who run it find that their browser is either unique or within a very small group. A 2020 academic study by Laperdrix et al. found fingerprints stable enough to re-identify users across sessions even when cookies were cleared.

Fingerprinting alone is not perfect — browser updates, new hardware, and privacy features that randomize fingerprint values all degrade accuracy. But combined with other signals, it substantially closes the gap that cookie-blocking leaves open.

### What defenses exist

**Tor Browser** standardizes the fingerprint across all users. Every Tor Browser instance presents the same screen size, the same fonts, the same User-Agent. The goal is not to hide the fingerprint but to make every user look identical, so an individual fingerprint is meaningless.

**Brave** adds randomized noise to canvas and audio fingerprinting outputs. Each site gets a slightly different value, so the fingerprint cannot be matched across sites.

**Firefox's resistFingerprinting** setting does something similar to Brave's approach, reducing the precision of the values exposed to scripts.

**uBlock Origin** in advanced mode can block known fingerprinting scripts, but this only works against scripts from known domains on block lists. First-party fingerprinting — where the site itself fingerprints you without loading any third-party script — is not addressed by list-based blocking.

The honest assessment: fingerprinting is the mechanism that makes the privacy advice "just block cookies and clear your history" incomplete. A site that fingerprints you directly does not need a cookie. There is nothing to delete.

## What this means together

The advertising ecosystem uses these three mechanisms in combination. A cookie identifies your browser across visits to sites that share an advertising network. A pixel fires on key pages to log events that matter to advertisers. Fingerprinting re-identifies you if cookies are cleared. Cookie syncing allows networks to merge their datasets.

No single defense addresses all of these. Content blocking handles pixels and known third-party scripts. Cookie settings affect cookie-based tracking. Fingerprinting resistance addresses the stateless layer. For most people, a content blocker plus a browser that blocks third-party cookies by default addresses the majority of the threat surface. Understanding that fingerprinting exists and is not addressed by those tools is important for calibrating what you have and have not protected.

---

### Sources reviewed for this article

**Usercentrics knowledge hub** (usercentrics.com/knowledge-hub) — Written for site operators navigating privacy compliance law. Accurate on mechanism because regulatory compliance requires it. The comparison table of cookies versus pixels is among the clearest available. Framing is toward compliance-as-product-opportunity; read for facts, disregard conclusions about what your site should do. Strength: accessible and precise on taxonomy. Weakness: operator-facing, not reader-facing.

**learnwebanalytics.com** — The tag/pixel/pixel-tag distinction is clearly explained here and rarely explained elsewhere. Good diagram. Limited on anything beyond the definitional level.

**MDN Web Docs: HTTP cookies** (developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) — Authoritative technical reference. Shows actual Set-Cookie header syntax and explains each flag with code examples. Best reference for the cookie specification. Written for developers; dense for a general reader.

**privacy.net/stop-cookies-tracking** — User-oriented, comprehensive, covers cookie syncing and XSS in the same article. The term "web beacon" for pixels is introduced here and is the correct industry term. The site also runs a privacy test that itself makes HTTP requests, worth knowing about.

**EFF Cover Your Tracks** (coveryourtracks.eff.org) — Live fingerprinting test with a large test population and documented methodology. Nonprofit, no commercial interest. Run this before reading about fingerprinting; seeing your own result is more persuasive than any prose description. Weakness: brief on defenses.

**Laperdrix, P. et al. (2020). Browser Fingerprinting: A Survey.** *ACM Transactions on the Web, 14*(2). — Peer-reviewed academic source. The most comprehensive study of fingerprinting accuracy and stability available. Technical reading, but sections 4 and 5 on accuracy are accessible.
