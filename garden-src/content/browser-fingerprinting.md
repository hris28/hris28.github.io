---
title: "Browser Fingerprinting"
date: 2026-05-04
lastmod: 2026-05-04
next-review: 2027-05-04
stage: sprout
tags: [fingerprinting, tracking, browser, privacy]
description: "What browser fingerprinting collects, how unique your browser's fingerprint is, and what defenses actually work."
---

<p class="eyebrow">Tracking and Privacy · Cluster 02</p>

# Browser Fingerprinting

Before reading further: go to [EFF Cover Your Tracks](https://coveryourtracks.eff.org/) and run the test. Come back after seeing your result.

The result tells you whether your browser's fingerprint is unique or common, and whether you have any protection against tracking. What the page shows you is the answer to the question this article answers in the abstract.

---

## What fingerprinting is

[Browser fingerprinting](https://en.wikipedia.org/wiki/Device_fingerprint#Browser_fingerprinting) is a method of identifying a browser by collecting a large number of properties that, taken together, form a combination specific enough to be unique.

No data is stored in your browser. No cookie is set. The fingerprint is assembled from information your browser discloses when it connects to any server, including information it discloses automatically as part of how the web works.

The server assembles these properties, hashes them, and stores the result. When you visit again, the server reassembles the same properties and produces the same hash. You have been recognized without any persistent identifier on your device.

---

## What data makes up a fingerprint

**User-Agent string:** Your browser sends this with every request. It contains the browser name and version, the operating system, and sometimes device information. Example: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`.

**Screen resolution and color depth:** Available to any JavaScript running on the page.

**Installed fonts:** Websites can probe which fonts are installed on your system by rendering text and measuring dimensions. Different operating systems and users have different font sets.

**Canvas fingerprint:** A website can instruct your browser to draw a hidden image using the [HTML Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). The rendered result varies subtly across different [GPUs](hardware-basics), drivers, and operating systems. The variation is consistent for a given device. The hash of the rendered image is a stable identifier.

**WebGL fingerprint:** Similar to canvas fingerprinting, using the [WebGL](https://en.wikipedia.org/wiki/WebGL) API to identify GPU and driver combinations.

**Audio context fingerprint:** The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) processes audio signals slightly differently across hardware. A fingerprint can be derived from those differences without playing any audible sound.

**Timezone and language:** Your timezone and preferred language are disclosed in headers and available to JavaScript.

**Browser plugins and extensions:** The presence of extensions changes how your browser behaves. Some extensions are detectable.

**Do Not Track header:** Ironically, setting the [Do Not Track](https://en.wikipedia.org/wiki/Do_Not_Track) header makes your browser slightly more distinctive, because fewer browsers send it.

**Battery status:** Historically available through the [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API). Most browsers have removed or restricted this due to fingerprinting risk, but it demonstrates how any API that exposes hardware information is a potential fingerprinting vector.

Each of these data points is not particularly unique on its own. Combined, they often produce a fingerprint that identifies a single browser out of millions. The EFF's research found that around 83% of browsers had a unique fingerprint using only the data available without JavaScript.

---

## How accurate fingerprinting is

Fingerprinting is not perfect. Hardware changes, software updates, and browser upgrades all alter the fingerprint. It is probabilistic rather than deterministic.

Its key advantage over cookies is persistence. A user who clears all cookies, installs a VPN, and starts a private browsing session still has the same canvas fingerprint, the same fonts, the same screen resolution. The tracking survives actions that most users think are protective.

A fingerprint is also more difficult to share across devices than a cookie. Two people using the same browser on different computers will have different fingerprints.

---

## What defenses exist

**Use a browser with fingerprint-resistant defaults.** [Firefox](https://www.mozilla.org/en-US/firefox/) with [Resist Fingerprinting](https://wiki.mozilla.org/Security/Fingerprinting) enabled, [LibreWolf](https://librewolf.net/), and [Tor Browser](https://www.torproject.org/download/) all implement defenses that normalize fingerprint values. Rather than trying to block fingerprinting techniques individually, these browsers give all users the same values for canvas output, screen resolution, and timezone. A common fingerprint is an untrackable fingerprint.

**Avoid adding distinguishing extensions.** Each extension you install makes your browser more distinctive. Installing twenty privacy extensions in an attempt to protect yourself may make your browser more fingerprintable than if you had installed none.

**Use Tor Browser for strong protection.** The Tor Browser is specifically built so that all users have the same fingerprint. This provides the strongest available fingerprint protection at the cost of some usability.

**Content blocking helps at the margins.** Blocking known fingerprinting scripts using [uBlock Origin](https://ublockorigin.com/) prevents some fingerprinting attempts by blocking the JavaScript that runs them. It does not prevent fingerprinting techniques that use standard browser APIs, because there is no script to block.

> **What does not work:** Changing your IP address with a VPN does not affect your fingerprint. Clearing cookies does not affect your fingerprint. Private browsing mode does not affect your fingerprint. These actions address different tracking mechanisms.

---

## How to test your own browser

[EFF Cover Your Tracks](https://coveryourtracks.eff.org/) tests your browser and tells you whether your fingerprint is unique, common, or random (indicating fingerprint protection is active). It is operated by the [Electronic Frontier Foundation](https://www.eff.org/), a nonprofit with no commercial interest in the result. The methodology is documented and the source code is published.

[AmIUnique](https://amiunique.org/) is an academic research project with a similar test and a larger fingerprint database. It shows you how your individual attributes compare to the broader population of browsers in their dataset.

Run both. The results often differ because their databases have different compositions.

---

## Sources reviewed

**[EFF Cover Your Tracks](https://coveryourtracks.eff.org/)** — The most credible available tool for testing your own fingerprint. Operated by a nonprofit with documented methodology and published source code. The fingerprint data set is not as large as some commercial tools, but the transparency makes it more trustworthy than proprietary alternatives. Run before reading any fingerprinting article; the personal result grounds the explanation.

**[AmIUnique](https://amiunique.org/)** — Academic research project. Larger database. Also shows you what each individual attribute looks like compared to others in the dataset. Useful for understanding which attributes contribute most to uniqueness.

**[MDN Web Docs: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)** — Primary source for understanding what the canvas API does, which is necessary to understand why canvas fingerprinting works.

**[W3C: Device Fingerprinting Guidance](https://www.w3.org/TR/fingerprinting-guidance/)** — The standards body's own guidance to browser vendors on fingerprinting risk. Useful as a primary source for which APIs are considered high risk. Dry but authoritative.
