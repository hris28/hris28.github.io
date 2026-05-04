---
title: "Tool Review: Proton Mail"
date: 2026-05-02
lastmod: 2026-05-02
stage: flower
tags: [tools, email, privacy, encryption, review]
description: "Proton Mail offers end-to-end encrypted email for messages between Proton users and zero-access encryption for stored messages. Here is what that means technically, where it applies, and where it does not."
next_review: 2027-05-01
---

<p class="eyebrow">Tool Review · Email Services</p>

# Proton Mail

| | |
|---|---|
| **Type** | Email service with end-to-end encryption |
| **Developer** | Proton AG |
| **Headquarters** | Geneva, Switzerland |
| **Founded** | 2014 by CERN researchers |
| **Funding** | Venture-backed; profitable through subscriptions |
| **Platforms** | Web, iOS, Android, macOS (desktop app), Windows (desktop app) |
| **Cost** | Free (1GB storage); Proton Mail Plus ($3.99/month); Proton Unlimited ($9.99/month) |
| **License** | Open source (clients); server is not open source |
| **Source code** | github.com/ProtonMail |
| **Audited** | Yes |
| **Last reviewed** | May 2026 |
| **Recommended for** | Users who want encrypted email with a trusted provider; best value when used with other Proton services |

---

## What it is

Proton Mail is an email service based in Switzerland. It provides end-to-end encryption for messages sent between Proton Mail users and zero-access encryption for all stored messages, meaning the emails on Proton's servers are encrypted in a way that Proton itself cannot read. When you compose a message in Proton Mail's web interface, the message is encrypted in your browser before being transmitted. Proton's servers receive only ciphertext.

Email has historically been one of the most surveilled forms of digital communication, largely because the email protocol was designed in an era when internet traffic was not expected to be hostile. Standard email travels in plain text between servers, is readable by the email providers on both ends, and is trivially accessible via legal process. Proton Mail attempts to solve the provider-access problem within the constraints of what email as a protocol permits.

## Who built it

Proton Mail was created in 2013 by a group of researchers who met at CERN, the European particle physics laboratory in Geneva. The founding team included Andy Yen, Jason Stockman, and Wei Sun. The service launched publicly in 2014 after a beta period.

Proton AG is headquartered in Geneva and subject to Swiss law, which provides some legal protections beyond what US or EU providers face: Swiss law requires a higher standard of legal process for data disclosure and has no mass surveillance statute equivalent to the US FISA court. Switzerland is not a member of the European Union, which means EU data-sharing agreements do not automatically apply, though Proton complies with GDPR for EU users.

The company received venture funding from Proton has grown to cover a suite of services: Proton Drive (file storage), Proton Calendar, Proton VPN, and Proton Pass (password manager). The shared subscription model (Proton Unlimited) covers all services at a single price, which is what makes Proton most cost-effective for users who would use multiple products.

The clients are open source. The server software is not. This is the primary gap in independent auditability: you can verify how the client encrypts data before sending it to Proton's servers, but you cannot independently verify server-side behavior.

## How the encryption model works

Proton Mail uses PGP (Pretty Good Privacy) as its underlying encryption standard. Each Proton Mail account has a PGP keypair: a public key (shared with correspondents) and a private key (stored encrypted in your account, accessible only with your login credentials).

**Proton-to-Proton encryption.** When you send a message to another Proton Mail user, your client encrypts the message with the recipient's public key before sending it to Proton's servers. Proton's servers hold only the encrypted message. When the recipient opens it, their client decrypts it with their private key. This is genuine end-to-end encryption: Proton cannot read these messages.

**Zero-access storage.** Messages you receive from non-Proton senders (standard email from Gmail, Outlook, etc.) arrive as standard email and are readable by Proton before storage. Proton re-encrypts them with your public key before storing them, so they are encrypted at rest on Proton's servers. However, Proton could theoretically read these messages before encrypting them, during transit. Zero-access storage means stored messages are protected; it does not mean the transmission was end-to-end encrypted.

**Sending to non-Proton recipients.** Messages sent to non-Proton addresses travel as standard email unless you use Proton's "Send with a password" feature, which encrypts the message and requires the recipient to enter a password you share out-of-band to read it.

The practical implication: Proton Mail's strongest privacy properties apply to communications between Proton users. For communications with non-Proton users, the protections are meaningful for stored messages but limited at the transport layer.

## The 2021 IP address disclosure

In 2021, Proton received a legally binding order from Swiss authorities, obtained through Swiss courts and pursuant to Europol assistance, requiring Proton to provide IP address logging for a specific account connected to a French climate activist group. Proton complied. The IP address data was used to identify an individual.

Proton subsequently updated their privacy policy to clarify that they could be compelled to log IP addresses for specific accounts under Swiss law, and that their default no-logging policy does not apply when a binding Swiss court order requires otherwise. They also adjusted their onboarding to more clearly convey that Proton is not a fully anonymous service.

This incident is important to understand accurately. Proton was not caught secretly logging; they disclosed the legal process in their transparency report. The underlying point is that "Swiss jurisdiction" does not mean "immune from law enforcement." It means "a higher procedural barrier and no mass surveillance programs." Targeted legal process against specific accounts can succeed.

For users who need anonymity in addition to encrypted content, accessing Proton Mail through Tor eliminates the IP address problem: Proton would receive the Tor exit relay's IP, not yours.

## What Proton Mail protects against

**Provider access to stored messages.** Proton cannot read your stored email. A government subpoena to Proton for message content will produce encrypted data that is useless without your decryption key.

**Server compromise.** If Proton's servers are compromised, the attacker gets encrypted data. The messages themselves are protected by your keypair.

**End-to-end encryption for Proton-to-Proton messages.** These messages cannot be read by Proton in transit or at rest.

## What Proton Mail does not protect against

**Your IP address by default.** Proton logs IP addresses associated with accounts when legally required. Using Proton Mail over Tor or a trusted VPN prevents your real IP from being logged.

**Non-Proton recipients.** Standard email to Gmail or Outlook users is not end-to-end encrypted. The message arrives at Google's or Microsoft's servers and is readable by them.

**Metadata.** Who you communicate with, when, and how frequently is metadata. Proton can see this and may be required to provide it under legal process. End-to-end encryption protects message content, not communication patterns.

**Phishing and social engineering.** Encryption does not protect against you sending email to a malicious recipient or downloading a malicious attachment. The protections are at the infrastructure layer; the user layer is outside Proton's scope.

## Proton Mail versus Gmail and standard email

Gmail is free and accessible, but Google reads your email to serve advertising and has compliance with US government requests under FISA and other statutes. The email is stored in Google's systems in a form Google can read.

Proton Mail's free tier costs you nothing except the smaller storage allocation (1GB versus Gmail's 15GB). In exchange, Proton cannot read your stored email and is subject to a higher legal standard for disclosure. For users who primarily communicate with other Proton users, the privacy improvement is substantial. For users who primarily correspond with Gmail, Outlook, or corporate email users, the improvement is meaningful for stored messages but limited at the transport layer.

Migrating from Gmail is the main practical friction. Proton provides an import tool (Easy Switch) but migrating years of existing email is a time-consuming process.

---

### Sources reviewed for this article

**Proton Mail security documentation** (proton.me/security) — Primary source for the cryptographic model. Describes the PGP implementation, zero-access encryption model, and key management. Self-published; consistent with client-side code that can be independently verified.

**Proton transparency reports** (proton.me/legal/transparency) — Proton publishes annual transparency reports listing legal requests received and responses. The 2021 IP address disclosure is documented here. Worth reading to understand the actual legal exposure.

**EFF coverage of the 2021 IP disclosure** (eff.org) — EFF's analysis framing the incident in terms of what was disclosed versus what was implied. More balanced than some coverage that treated the incident as a straightforward breach of trust.

**Security audit by SEC Consult** (available via proton.me/blog) — Third-party security audit of the web clients and iOS/Android apps. SEC Consult is a reputable European security firm.

**Privacy Guides, Email Services** (privacyguides.org/en/email) — Community recommendation with explicit criteria. Proton Mail meets all criteria. The page also covers Tutanota/Tuta as an alternative with a different technical approach (custom encryption rather than PGP).
