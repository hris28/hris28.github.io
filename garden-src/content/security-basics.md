---
title: "Security Basics: Threat Modeling for Ordinary People"
date: 2026-05-01
lastmod: 2026-05-01
stage: sprout
tags: [security, beginner, threat-modeling]
description: "Most security advice is written for an abstract worst-case. Threat modeling is about figuring out which risks actually apply to you."
next_review: 2027-05-01
---

<p class="eyebrow">Security · Cluster 02</p>

# Security Basics: Threat Modeling for Ordinary People

Most security advice treats every reader as if they face the same risks. "Use a password manager." "Enable two-factor authentication." "Use a VPN." These are reasonable defaults. But they are chosen for an imaginary average person, not for you.

Threat modeling is the practice of figuring out which risks actually apply to your situation, so you can prioritize the defenses that matter rather than spending effort on defenses that do not.

## The four questions

Security practitioners use a few standard questions to build a threat model. They work just as well for ordinary people thinking about their own digital life.

**What do you want to protect?** This is your list of assets. It might include your financial accounts, your location, your communications, your identity, your health records, or your public reputation. Not everything matters equally.

**Who might want it, and why?** This is your adversary list. Different adversaries have different capabilities and motivations. A commercial data broker wants your behavioral data to sell. A targeted stalker wants your location. A government agency may want your communications. A random credential-stuffing attack wants any working username-password combination it can find to resell. These require very different responses.

**What happens if they get it?** This is your consequence assessment. Some breaches cause inconvenience. Some cause financial loss. Some cause physical danger. The severity of the consequence should inform how much effort you invest in the defense.

**What can you do about it?** This is your countermeasures list. Defenses have costs: money, time, convenience, and sometimes privacy trade-offs of their own. A defense that is too inconvenient will be abandoned.

## The three threat actors most people face

In practice, most people's threats come from one of three categories. Understanding them separately matters because the defenses are different.

### Commercial surveillance

ISPs, advertising networks, data brokers, and the large platform companies collect data about your browsing, purchases, location, and behavior as a routine business activity. This is not targeted; it happens to everyone who uses commercial internet services. The data is used for advertising, sold to other companies, and sometimes shared with law enforcement without a warrant requirement in many jurisdictions.

The defenses against commercial surveillance are primarily technical: content blockers, encrypted DNS, browsers that default to blocking third-party cookies, email clients that block remote images, and awareness of what you hand over through app permissions. [[privacy-basics]] and [[01-dns]] cover the technical layer in detail.

### Credential attacks

Most online account compromises are not targeted. They are automated attacks that try large lists of stolen username-password combinations against popular services. If you used the same password on a site that was breached, that credential will eventually be tried against your banking site, your email, and anything else where the attacker can get a payout.

The defenses here are well-established and effective. A password manager generates and stores a unique random password for every site. A compromised credential from one site cannot be used anywhere else because no other site uses the same password. Two-factor authentication (2FA) ensures that even a correct password is not enough to access an account. A hardware security key or a TOTP authenticator app (like Aegis on Android or Raivo on iOS) are significantly stronger than SMS-based 2FA, which is vulnerable to SIM-swapping attacks and is effectively a phone-number harvesting mechanism for the service requesting it.

### Targeted adversaries

A targeted adversary is someone or something specifically trying to access your data, as opposed to you being one victim in a mass operation. Targeted threats include domestic abusers with physical access to your devices, stalkers, journalists' sources being investigated, activists under surveillance by governments, and corporate espionage. The defenses required for targeted threats are substantially more involved than those for the commercial or credential categories, and they involve operational security considerations beyond technical tools. [[start-here]] is not the right resource for these situations; the EFF's Surveillance Self-Defense (ssd.eff.org) organizes its content by threat model specifically to address this.

## Practical minimums for most people

Given that most people face commercial surveillance and credential attacks rather than targeted adversaries, a practical minimum looks like this.

A password manager for every account. Unique, randomly generated passwords. Bitwarden is open-source, audited, and free for personal use. 1Password is a well-regarded paid option.

2FA on every account that supports it, using an authenticator app rather than SMS wherever available. FIDO2 hardware keys (passkeys, YubiKey) are stronger still and increasingly supported by major services.

A browser that blocks third-party cookies by default. Firefox, Brave, and Safari all do this. Chrome does not, though this is changing incrementally.

uBlock Origin on desktop browsers. It prevents the majority of third-party tracking by blocking requests to known tracker domains before they leave your browser.

Email with remote image blocking enabled. This prevents email tracking pixels from recording when you open messages.

These five things address the majority of what most people face. They are not difficult to set up, they do not require ongoing maintenance, and they have minimal cost in convenience once in place.

## Where reasonable people disagree

**SMS 2FA.** Mainstream security organizations including NIST and CISA strongly recommend enabling any form of 2FA, including SMS, on the grounds that it prevents the overwhelming majority of credential attacks. A privacy-rights critique argues that requiring a phone number for 2FA is primarily a mechanism for harvesting phone numbers, and that SMS 2FA's security value is overstated given its vulnerability to SIM-swapping. Both views contain truths. The constructive synthesis: use an authenticator app or hardware key where available; use SMS 2FA where it is the only option rather than leaving the account unprotected; treat any service that mandates a phone number and offers no alternative as a service whose data practices warrant scrutiny.

**VPNs.** VPNs are frequently recommended as general privacy tools. They shift your ISP's network-level visibility to the VPN provider, which may or may not be an improvement. A VPN does not protect against in-browser tracking, fingerprinting, or third-party cookies. For most people whose threat model is commercial surveillance, a content blocker accomplishes more at the tracking layer than a VPN does, at no cost and with no trust dependency on a third-party provider. VPNs are most valuable when your ISP is a more significant threat than a VPN provider would be, or when you need to obscure your IP address from a specific service.

---

### Sources reviewed for this article

**EFF Surveillance Self-Defense** (ssd.eff.org) — The canonical resource for threat-model-first security thinking for individuals. Organizes content by audience and risk level. No advertising or affiliate content. Some sections more current than others; check article dates. Strongly recommended as a companion to this guide.

**NIST Digital Identity Guidelines** (pages.nist.gov/800-63-3) — The US federal standard for authentication, including treatment of SMS OTP and authenticator apps. Technical, but section 5.1 on authenticator types is accessible. Authoritative on the security hierarchy of 2FA methods.

**Popzazzle, "Ten Important Things You Should Tell Your Friends About 2FA"** (popzazzle.blogspot.com, 2022) — Privacy-rights blog with a strong critical voice. Correct that SMS 2FA is weak and that phone-number mandates function as data collection. Overstates the case against all 2FA. Useful for identifying the data-collection dimension of phone-number requirements; check specific security claims against NIST.

**Bitwarden security audit** (bitwarden.com/resources/bitwarden-security-whitepaper) — Bitwarden's own security documentation. Includes third-party audit results. Self-published, but the audits are conducted by independent firms and the results are disclosed.
