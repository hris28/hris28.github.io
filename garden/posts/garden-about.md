---
title: "About the Garden"
date: 2026-04-04
stage: sprout
tags: [information, archive, search, security]
description: "Why I created this page."
---
## The Invisible Infrastructure of Information

Most of what makes modern life work is invisible.

You open a browser and type a name into the address bar. Somewhere, a DNS resolver translates that name into an IP address. Routers choose a path across thousands of networks. TLS negotiates encryption. HTTP sends requests. The page renders. JavaScript runs. Dozens of APIs quietly expose information about your browser.

All of this happens before you've read the first sentence on the page.

Most people never notice.
It's not necessarily hidden, but it works well enough to disappear.

The same is true outside computing.

Libraries look like buildings full of books, but underneath them are classification systems, catalogues, metadata standards, archives, preservation policies, and librarians who spend years learning how information should be described so that someone else can eventually find it.

Scientific papers look like discoveries, but underneath them are peer review, statistical assumptions, replication, citation networks, funding decisions, and decades of accumulated work.

Cities look like streets and buildings.
Underneath are electrical grids, sewer systems, zoning laws, logistics networks, traffic engineering, and supply chains.

Science fiction writer Arthur C. Clarke once wrote, 
> "Any sufficiently advanced technology is indistinguishable from magic."

The world is full of magic. But I don't think understanding these systems makes the world less magical. Rather, it allows us to discover and create even more magic.

Knowledge itself has infrastructure.

Most of it is invisible.

This garden is my attempt to make some of it visible.

## Principles

This started as an information security guide--a growing reference site for people who want to understand the systems they live inside online. 

I kept running into the same problem: upon searching for an answer to something, I would find either a marketing page in disguise, a review article that assumed I already knew half the terminology, or a forum thread from 2016 that may or may not still be accurate. The information existed somewhere, but getting to it required trusting sources I had no real way to evaluate, following recommendation chains that turned out to have affiliate links buried in them, or digging through five subpages of a site clearly designed to funnel me toward a product. 

I got frustrated enough that I decided to just write it down myself. If I had to figure it out the hard way, I could at least make it easier for the next person. 

But the more I worked on it, the more it became something broader. Because the problem is not specific to information security. It is the same problem across almost every topic I have tried to learn online: too much content written for search engines, not enough written for actual people. Too many sites that look comprehensive and turn out to be shallow. Too many explainers that use the right vocabulary without explaining the mechanism. Too many recommendations with undisclosed conflicts of interest. And not nearly enough that just answer the questions directly, name what they do not know, and link to something you can actually verify rather than merely trust. 

So this is my attempt at a personal archive--part informational notes, part newsletter, part working reference--written the way I wish more things online were written. The information security thread is still here, and it is probably the most developed part. But the true scope is anything I have been curious enough about to actually dig into. The topics follow the questions, not the other way around. 

We live in a world where the smallest overlooked detail can be taken advantage of--a misconfigured setting, a misleading summary, a recommendation you trusted without knowing who paid for it. Staying informed is not paranoia. It is just the cost of living carefully in a world that is not always careful with you. It is the difference between a decision that was yours and one that was made for you without your knowing. Finding places that take this seriously without becoming alarmist is difficult, but I hope to develop such a space where fear does not obstruct curiosity and understanding the world you live inside of feels possible, even when it does not always feel simple.

Some of these notes are finished. Most are working drafts. A few are placeholders where I know a gap exists and intend to come back. I continually update this site with more features for a better user interface and experience. This garden will always prioritize trustworthy, accessible learning. It is also hand-built from scratch: no website framework, just HTML, CSS, and vanilla JavaScript, with accessibility as a first principle (keyboard operability, reduced-motion fallbacks, and screen-reader text throughout).

## Design Decisions

This is the planning layer beneath the garden. It answers three questions: what to write, in what order, and how. It also records what nearby sites do well and where they fail, so the garden learns from them rather than repeating their mistakes.

### Lessons

Show before you explain. Put the interactive element or the concrete example at the top, before the explanatory prose. The reader has something to think about while they read.

Explain what the reader just saw. After the demo, explain each data point: what it is, where it comes from, and how it can be used. 

### Content roadmap

The ordering logic is: foundational concepts first, then mechanisms, then actors, then tools, then edge cases and historical context. Each piece should be readable without assuming the previous ones, but should link to them where they would help. Most of the articles do not map one-to-one to a question; they answer a cluster of related questions together.