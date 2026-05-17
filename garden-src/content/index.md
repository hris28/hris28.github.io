---
title: The Garden
date: 2026-05-01
lastmod: 2026-05-01
stage: flower
description: A growing collection of guides, notes, and working thoughts.
---

## Principles

This started as an information security guide--a growing reference site for people who want to understand the systems they live inside online. 

I kept running into the same problem: upon searching for an answer to something, I would find either a marketing page in disguise, a review article that assumed I already knew half the terminology, or a forum thread from 2016 that may or may not still be accurate. The information existed somewhere, but getting to it required trusting sources I had no real way to evaluate, following recommendation chains that turned out to have affiliate links buried in them, or digging through five subpages of a site clearly designed to funnel me toward a product. 

I got frustrated enough that I decided to just write it down myself. If I had to figure it out the hard way, I could at least make it easier for the next person. 

But the more I worked on it, the more it became something broader. Because the problem is not specific to information security. It is the same problem across almost every topic I have tried to learn online: too much content written for search engines, not enough written for actual people. Too many sites that look comprehensive and turn out to be shallow. Too many explainers that use the right vocabulary without explaining the mechanism. Too many recommendations with undisclosed conflicts of interest. And not nearly enough that just answer the questions directly, name what they do not know, and link to something you can actually verify rather than merely trust. 

So this is my attempt at the thing I kept looking for and not finding. A personal archive--part notes, part newsletter, part working reference--written the way I wish more things online were written. Down to earth. Navigatable. Honest about uncertainty. Closer in spirit to Khan Academy or a good Wikipedia article than to a blog post optimized for clicks. The information security thread is still here, and it is probably the most developed part. But the scope is anything I have been curious enough about to actually dig into. The topics follow the questions, not the other way around. 

We live in a world where the smallest overlooked detail can be taken advantage of--a misconfigured setting, a misleading summary, a recommendation you trusted without knowing who paid for it. Staying informed is not paranoia. It is just the cost of living carefully in a world that is not always careful with you. It is the difference between a decision that was yours and one that was made for you without your knowing. Finding places that take this seriously without becoming alarmist is difficult, but I hope to develop such a space where fear does not obstruct curiosity and understanding the world you live inside of feels possible, even when it does not always feel simple.

Some of these notes are finished. Most are working drafts. A few are placeholders where I know a gap exists and intend to come back. I continually update this site with more features for a better user interface and experience. This garden will always prioritize trustworthy, accessible learning.

---

## Tracking and Privacy

- [privacy-basics](privacy-basics) - Cookies, tracking pixels, UTM parameters, and how they combine 
- [browser-fingerprinting](browser-fingerprinting) - What fingerprinting collects, how accurate it is, and what defenses exist 
- [isp-layer](isp-layer) - What your ISP can and cannot see at each layer of encryption 
- [dns-explained](dns-explained) - How DNS works, why it is a privacy problem by default, and what encrypted DNS does and does not fix 
- [the-advertising-ecosystem](the-advertising-ecosystem) - Ad networks, data brokers, real-time bidding, and cookie syncing 
- [source-evaluation-checklist](source-evaluation-checklist) - Questions to ask before trusting any claim about privacy or security

---

## Protective Tools

- [vpn-explained](vpn-explained) - What a VPN does, what it shifts rather than removes, and how to evaluate one
- [tor-explained](tor-explained) - How Tor routes traffic, the trust model, its real limits, and when it beats a VPN
- [dns-resolvers](dns-resolvers) - Comparing resolvers by what each logs, who runs it, and what it costs
- [browser-extensions](browser-extensions) - uBlock Origin, Privacy Badger, Multi-Account Containers: what each blocks and how

---

## Browsers

- [browser-comparison](browser-comparison) - Firefox, Brave, LibreWolf, Chromium: what each does differently and for whom
- [urls-explained](urls-explained) - URL structure, absolute vs. relative addresses, and what each part reveals

---

## How the Web Works

- [start-here](start-here) - What happens between pressing Enter and a page loading
- [metadata-vs-content](metadata-vs-content) - What metadata is, why it survives encryption, and why it matters
- [wifi-and-networks](wifi-and-networks) - How Wi-Fi works, what public networks expose, what upload and download actually measure
- [http-and-https](http-and-https) - The difference between HTTP and HTTPS, what HTTPS encrypts, and what it leaves visible

---

## Hardware

- [hardware-basics](hardware-basics) - CPU, GPU, RAM, SSD, Wi-Fi card, display: what each does and when quality differences actually show up
- [building-a-machine](building-a-machine) - Selecting and assembling a machine from scratch
- [storage-and-filesystems](storage-and-filesystems) - File systems, SSDs vs. HDDs, and what "secure erase" actually means

---

## Software and Operating Systems

- [os-layers](os-layers) - From firmware to application: the layers between a keypress and the network
- [drivers-explained](drivers-explained) - What drivers are, why they matter for security, and how to audit them
- [background-services](background-services) - What services run at boot, which ones to disable, and how to check
- [terminal-vs-gui](terminal-vs-gui) - Why the terminal matters and when to use it over a graphical interface

---

## OSINT and Open Infrastructure

- [osint-fundamentals](osint-fundamentals) - What OSINT is, how it differs from traditional research, and what it can and cannot establish
- [google-dorking](google-dorking) - Advanced search operators and how to force search engines to give you what you asked for
- [whois-and-dns-research](whois-and-dns-research) - Tracing website ownership through WHOIS, DNS records, and IP registration
- [geolocation-and-chronolocation](geolocation-and-chronolocation) - Tools and methods for locating and dating photographs and video
- [connecting-websites](connecting-websites) - Shared analytics IDs, favicons, certificates, and ad tags as infrastructure fingerprints
- [digital-preservation](digital-preservation) - Web archives, the Internet Archive, and the tension between open access and AI scraping

---

## Radio and Wireless

- [radio-spectrum](radio-spectrum) - Licensed vs. unlicensed frequencies, who regulates radio, and what a ham license allows
- [meshtastic-vs-meshcore](meshtastic-vs-meshcore) - LoRa mesh networks, how they differ, and when to use each

---

## Historical and Adjacent Technologies

- [optical-media](optical-media) - How DVDs work, why optical media still appears in archives and evidence chains
- [analog-video](analog-video) - VHS, interlacing, PAL vs. NTSC, and why some archivists still work with magnetic tape

---

## Piracy and File Transfer

- [torrenting-vs-direct-download](torrenting-vs-direct-download) - How torrenting differs from direct downloading at the network level, and what each exposes
- [the-dark-web](the-dark-web) - What the dark web actually is, how it differs from the deep web, and what Tor hidden services are

---
## Things I still want to understand

More topics I have been confused about in the past that I hope to make guides for:

- LF vs CRLF
- What telemetry actually sends
- rfid blocking
- nfc credit card
- merchant mcc
- Brave new feature De-AMP https://brave.com/privacy-updates/18-de-amp/
- https://support.brave.app/hc/en-us/articles/9140465918093-What-is-P3A-in-Brave
- https://support.brave.app/hc/en-us/articles/4409406835469-What-is-the-Web-Discovery-Project
- chromium vs. firefox
- How torrenting differs from direct downloading at the network level
- What a VPN provider can actually see
- The real-time bidding ecosystem
- https://esphome.github.io/esp-web-tools/