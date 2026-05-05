---
title: "Privacy Basics"
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

Open any website with a network inspector active and you will see dozens of requests fire the moment the page loads. Many go to servers you have never heard of. Those requests carry data about you. Some carry data you put there intentionally. Most do not.
 
This article covers three specific mechanisms: [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies), [tracking pixels](https://en.wikipedia.org/wiki/Web_beacon), and [UTM parameters](https://en.wikipedia.org/wiki/UTM_parameters). Each one works differently. Each one is blockable or not blockable for different reasons.

This article explains each mechanism in enough detail that you can evaluate what a given protective tool actually addresses.

## Cookies

A [cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) is a small text file a server tells your browser to store. When you visit a site, the server can instruct your browser to store a piece of text on your device and send it back on every subsequent request to that domain. The instruction arrives in an HTTP response header that looks something like this:

```
Set-Cookie: session_id=abc123; Path=/; Secure; HttpOnly; SameSite=Lax
```

Your browser stores that text. The next time you make any request to that domain--whether it be loading a page, submitting a form, or fetching an image--your browser automatically includes the cookie in the request header:

```
Cookie: session_id=abc123
```

The server reads it, recognizes you, and knows you are logged in. This is how login sessions work. It is also how tracking works.

### Types of Cookies

**Session cookies** have no expiration date. They disappear when you close the browser. A login session typically uses one.
 
**Persistent cookies** have an explicit expiration date. They remain on your device until that date or until you delete them. An advertising cookie that remembers your preferences across visits is a persistent cookie.
 
**First-party cookies** are set by the site/domain you are actually visiting. The cookie domain matches the URL in your address bar. If you visit `example.com`, a cookie set by `example.com` is first-party. The site can only read cookies it set; it cannot read cookies from other sites. These are largely functional: login state, shopping cart, language preference.
 
**Third-party cookies** are set by a different domain embedded in the page you are visiting. Here is how this works in practice: when a page loads, it typically makes requests to external servers to pull in scripts, fonts, ads, analytics, and social media widgets. Each of those requests goes to a third-party server, and that server can set a cookie in your browser. The next time you visit any other site that loads resources from that same third-party server, your browser automatically sends that cookie back.

A Facebook "Like" button on a news article loads a small resource from Facebook's servers. Facebook's server sets a cookie for `facebook.com`. The next time you visit any page with a Facebook embed, your browser sends that cookie to Facebook automatically, because the cookie's domain matches the embed's domain. Facebook now knows you visited both pages.

An advertising network like Google or Meta has code embedded on thousands of websites. Every time you load a page with their code, your browser makes a request to their servers. Your browser carries the cookie they previously set. They now know you visited both sites. Over time, they build a profile of your interests based on the pattern of sites you visit.

This is how a user can be tracked across thousands of websites without ever interacting with a Facebook product on any of them. This is the engine behind behavioral advertising.

**What "blocking third-party cookies" does:** When a browser blocks third-party cookies, it refuses to store or send cookies whose domain does not match the page's domain. The embed still loads. The request still fires. The server at the other end still receives your [IP address](https://en.wikipedia.org/wiki/IP_address), [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent), and other headers. Blocking third-party cookies removes one tracking vector, not all of them.

**What it does not do:** It does not prevent [browser fingerprinting](browser-fingerprinting). It does not prevent first-party tracking. It does not prevent the request from being made at all.

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

A [tracking pixel](https://en.wikipedia.org/wiki/Web_beacon) is a transparent 1x1 image embedded in a page or an email, that is invisible to the reader but triggers an HTTP request when the page renders it. When your browser or email client renders the page, it fetches that image from a remote server. That fetch is a network request. The server receives the request and logs it.
 
The log entry contains: the time of the request, your IP address, your User-Agent, and whatever cookies you have for that domain.
 
The difference from a cookie is where the data lives. A cookie is stored in your browser. You can see it, clear it, and inspect it. A pixel fires a request to someone else's server. You have no access to what is logged there.

The mechanism is simple. Your browser loads the page. It encounters an `<img>` tag pointing to a URL on a third-party server. It fetches that image. That fetch is an HTTP request, which carries your IP address, your User-Agent string, the URL of the page you are on (in the Referer header), and any cookies you have for that domain. The server logs the request. The pixel itself is invisible; only the server-side log record matters.

### Types of pixels

Pixels are differentiated by what they are designed to record.

An **engagement pixel** fires on page load or after some time has passed, recording that you viewed a page and for how long. It can fire when you scroll to a certain point or spend time on a page. It tells the site operator you actually read the content, not just loaded the URL.

A **retargeting pixel**  marks your browser as having visited a particular product page. It records your visit so the site can show you ads on other sites you subsequently visit. Ad networks use this mark to show you ads for that product on other websites.

A **conversion pixel** fires when you complete a specific action: a purchase, a signup, a form submission. The site uses it to confirm that an ad led to a sale.

The mechanism for all three is identical: a request fires, a server logs it.
 
**Pixels in email** work the same way. Most email clients fetch images automatically. When your client loads an email and requests the embedded pixel image, the sender's server knows the email was opened, when it was opened, your approximate location from your IP address, and what client you used. This is why some privacy-focused email clients disable automatic image loading by default.
 
> **What an ad blocker does to pixels:** A content blocker like [uBlock Origin](https://ublockorigin.com/) prevents the request from being made at all. The image never loads. The server never receives the request. No data is logged. This is why blocking at the request level is more effective than simply hiding the visual result.
 
> **What it does not do:** It does not protect you from pixels hosted on the same domain as the page you are visiting. First-party pixels are indistinguishable from any other resource the site loads.


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

## What a UTM parameter is
 
A [UTM parameter](https://en.wikipedia.org/wiki/UTM_parameters) is a tag appended to a URL. It looks like this:
 
```
https://example.com/product?utm_source=newsletter&utm_medium=email&utm_campaign=spring-sale
```
 
The part after `?` is a [query string](https://en.wikipedia.org/wiki/Query_string). The `utm_` prefixes identify these as UTM tags, a standard created by Google for tracking traffic sources.
 
When you click a link with UTM parameters, those parameters travel to the destination server in the URL. The server logs them. They tell whoever runs the site that you arrived from a newsletter, via email, as part of a spring sale campaign. The parameters survive as long as the URL survives. If you copy and share that link, anyone who clicks it also passes those tags to the destination.
 
Nothing changes in your browser. No cookie is set by the URL itself. The logging happens server-side, on a machine you have no access to. This is why the [givemeyourdata.org](https://givemeyourdata.org) UTM demonstration appears to do nothing on screen: it is showing you a mechanism that is entirely invisible because the data went somewhere else.
 
Other tracking parameters follow the same pattern with different names. `gclid` is appended by Google Ads. `fbclid` is appended by Facebook. Both are unique identifiers assigned to a specific ad click. When that identifier later appears associated with a purchase, the ad platform can match the click to the outcome and report it as a conversion.
 
Because `gclid` and `fbclid` values are unique per click, they function as identifiers even without cookies. A user who clears all cookies but retains the URL has not cleared the tracking.
 
> **Limit of URL stripping:** Some browsers and extensions strip known tracking parameters from URLs before navigation. This removes the parameter from the URL in your address bar. It does not remove data that was already logged on the destination server if the page loaded before the strip occurred. Tools that strip on click, before navigation, are more effective than tools that strip after the page loads.
 
## How these mechanisms combine
 
Consider a plausible sequence:
 
1. You click an ad link. The URL contains a `gclid`.
2. The destination page loads. It sets a third-party advertising cookie.
3. The page also contains a retargeting pixel, which fires a request to an ad network.
4. Later, you visit a different site. That site loads the same ad network's script. Your browser sends the third-party cookie. The ad network knows you visited the first site.
5. You make a purchase. A conversion pixel fires on the confirmation page. The ad network logs the purchase as a successful outcome for the click that set the `gclid`.
Each step uses a different mechanism. A cookie blocker disrupts step 2 and step 4. A pixel blocker disrupts step 3 and step 5. A URL stripper disrupts step 1. None of them disrupts all five. No single tool covers the full chain.


## What this means together

The advertising ecosystem uses these three mechanisms in combination. A cookie identifies your browser across visits to sites that share an advertising network. A pixel fires on key pages to log events that matter to advertisers. Fingerprinting re-identifies you if cookies are cleared. Cookie syncing allows networks to merge their datasets.

No single defense addresses all of these. Content blocking handles pixels and known third-party scripts. Cookie settings affect cookie-based tracking. Fingerprinting resistance addresses the stateless layer. For most people, a content blocker plus a browser that blocks third-party cookies by default addresses the majority of the threat surface. Understanding that fingerprinting exists and is not addressed by those tools is important for calibrating what you have and have not protected.

## What you can see for yourself
 
The best way to make this concrete is to open your browser's developer tools before visiting any site.
 
In Firefox or Chrome: press `F12`, click the **Network** tab, then visit a page. Every row is a request your browser made. The **Domain** column shows where each request went. Requests to domains other than the page you are visiting are third-party requests. Many will be to advertising and analytics companies you recognize.
 
[givemeyourdata.org](https://givemeyourdata.org) shows you live what information your browser sends with every request: your IP address, your User-Agent string, your screen resolution, your timezone, and more. The data is displayed before any explanation, which makes the explanation land differently.
 
[EFF Cover Your Tracks](https://coveryourtracks.eff.org/) tests your browser's fingerprint and tells you how unique it is. It is worth running before reading [[browser-fingerprinting]], because seeing your own result makes the subsequent explanation easier to follow.


---

### Sources reviewed for this article

**[MDN Web Docs: HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)** - Authoritative technical reference. The most accurate and consistently maintained reference for cookie behavior. Written for developers but readable for anyone who can follow technical prose. Shows actual Set-Cookie header syntax and explains each flag with code examples. Free, open license, multi-organization maintained. Written for developers; dense for a general reader. When a cookie attribute behaves in an unexpected way, this is the right place to check.
 
**[Usercentrics: Pixels and Cookies](https://usercentrics.com/knowledge-hub/pixel-cookie/)** - Written for site operators navigating privacy compliance law. Accurate on mechanism because regulatory compliance requires it. The comparison table distinguishing where cookie data vs. pixel data is stored is one of the clearest diagrams on this topic. Note that Usercentrics sells a consent management platform, so every conclusion orients to be framed toward regulatory compliance as a product category.
 
**[learnwebanalytics.com: Cookie, Pixel, and Tag](https://learnwebanalytics.com/whats-the-difference-between-a-cookie-a-pixel-and-a-tag/)** - The tag/pixel/pixel-tag distinction is clearly explained here and rarely explained elsewhere. Written for analytics practitioners. The diagrams are useful for visual learners. Limited on anything beyond the definitional level. Cross-check technical claims against MDN.
 
**[privacy.net: Stop Cookies Tracking You](https://privacy.net/stop-cookies-tracking/)** - User-oriented, comprehensive, covers cookie syncing and XSS in the same article. The term "web beacon" for pixels is introduced here and is the correct industry term. The site also runs a privacy test that itself makes HTTP requests, worth knowing about. Credibility is harder to verify than EFF or Mozilla. Tool recommendations should be checked independently.
 
**[givemeyourdata.org](https://givemeyourdata.org)** - Live demonstration of what a server receives. High value for making abstract mechanisms concrete. One significant failure on design-end is that the UTM parameter demonstration does not tell you what you are supposed to notice, leaving users uncertain whether the demo worked. 

**[EFF Cover Your Tracks](coveryourtracks.eff.org)** - Live fingerprinting test with a large test population and documented methodology. Nonprofit, no commercial interest. Run this before reading about fingerprinting; seeing your own result is more persuasive than any prose description. Weakness: brief on defenses.

**Laperdrix, P. et al. (2020). Browser Fingerprinting: A Survey.** *ACM Transactions on the Web, 14*(2). - Peer-reviewed academic source. The most comprehensive study of fingerprinting accuracy and stability available. Technical reading, but sections 4 and 5 on accuracy are accessible.
