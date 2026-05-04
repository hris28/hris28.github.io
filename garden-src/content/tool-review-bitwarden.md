---
title: "Tool Review: Bitwarden"
date: 2026-05-02
lastmod: 2026-05-02
stage: flower
tags: [tools, passwords, security, review]
description: "Bitwarden is the most commonly recommended open-source password manager. Here is what it actually does, how its encryption model works, and why the open-source and self-hosting options matter."
next_review: 2027-05-01
---

<p class="eyebrow">Tool Review · Password Managers</p>

# Bitwarden

| | |
|---|---|
| **Type** | Password manager |
| **Developer** | Bitwarden, Inc. |
| **Headquarters** | Santa Barbara, California, USA |
| **Founded** | 2016 by Kyle Spearrin |
| **Funding** | Venture-backed (PSG, Battery Ventures); also profitable |
| **Platforms** | Windows, macOS, Linux, iOS, Android, browser extensions, web vault |
| **Cost** | Free (personal); $10/year (Premium); $3/user/month (Teams) |
| **License** | GPL-3.0 (clients and server) |
| **Source code** | github.com/bitwarden |
| **Audited** | Yes; annual third-party audits |
| **Last reviewed** | May 2026 |
| **Recommended for** | Most users as a default password manager |

---

## What it is

Bitwarden is a password manager: software that generates, stores, and fills strong unique passwords for every service you use. The premise is that the security failure mode of password management for most people is reuse: the same password across multiple services, which means one breach compromises many accounts. A password manager replaces this with a vault of unique random passwords, protected by a single master password that only you know.

Bitwarden stores your vault in encrypted form on their servers. The encryption happens on your device before anything is transmitted. Bitwarden's servers hold ciphertext that cannot be decrypted without your master password, which Bitwarden never receives and does not store.

## Who built it

Kyle Spearrin built the first version of Bitwarden as a side project in 2015 and released it publicly in 2016. The company is based in Santa Barbara and employs around one hundred people as of 2025. It received venture funding from PSG in 2019 and Battery Ventures in 2021, which gives it the runway to develop sustainably but also introduces investors with return expectations.

The company has maintained its open-source commitment through its funding stages, which is unusual. The server, clients, and browser extensions are all GPL-3.0 licensed and publicly available on GitHub. You can read the code, audit it, or run your own instance.

## How the encryption model works

Bitwarden uses a zero-knowledge encryption model. When you set your master password, Bitwarden uses PBKDF2-SHA256 (with a configurable iteration count) to derive an encryption key from it. Your vault is encrypted with AES-256 using this key. Only the ciphertext is stored on Bitwarden's servers. The master password itself is never transmitted.

This means:

Bitwarden employees cannot read your passwords. If a Bitwarden server is compromised, the attacker gets encrypted data that is useless without your master password. If Bitwarden receives a government subpoena for your vault, they can provide only ciphertext.

The weakness in this model is your master password. If your master password is weak or reused and it is compromised, everything in your vault is accessible. This is why Bitwarden encourages enabling two-factor authentication (2FA) for the vault itself, which provides a second layer of protection even if the master password is somehow obtained.

## What the audit record shows

Bitwarden has been audited annually by Cure53 since 2018. The audits cover the browser extensions, mobile clients, desktop application, and web vault. Auditors consistently find some issues; Bitwarden consistently patches them before the next release. The audit reports are publicly available on Bitwarden's website.

A 2023 security assessment by Cure53 noted issues of low to medium severity, all addressed. No critical vulnerabilities have been found in the core encryption implementation, which is the highest-stakes component.

The open-source codebase allows independent researchers to audit specific concerns without waiting for a formal engagement. Several security researchers have reviewed the implementation and published their findings publicly.

## Self-hosting

Bitwarden can be self-hosted. You can run the entire stack on your own server, at which point Bitwarden's servers have no involvement in your vault at all. The data lives on infrastructure you control.

Self-hosting is not the right choice for most users because it requires maintaining a server, keeping it updated, and managing backups. A misconfigured or unpatched self-hosted instance is more dangerous than Bitwarden's maintained cloud service. But for users who want complete control over where their data lives, the option is genuine and the documentation for running it is publicly available.

An alternative that requires less infrastructure expertise is Vaultwarden, a community-maintained Bitwarden-compatible server written in Rust. Vaultwarden implements the Bitwarden API and works with all official Bitwarden clients. It is significantly lighter weight than the official server and can run on a Raspberry Pi. Like all self-hosting options, it transfers the security responsibility to the person running it.

## Free tier versus Premium

The free tier covers unlimited passwords on unlimited devices, secure notes, a basic two-factor authentication (TOTP) code generator within the vault, and end-to-end encrypted sharing with one other user. This covers what most individuals need.

The Premium tier ($10/year) adds advanced 2FA options (FIDO2 hardware keys, Duo), Bitwarden's own TOTP code generator (so you can store both the password and the TOTP secret in one place), encrypted file attachments up to 1GB, vault health reports identifying weak or reused passwords, and priority customer support.

The TOTP feature in Premium deserves a specific note: storing both a password and the corresponding TOTP secret in the same vault is a convenience-security trade-off. If your Bitwarden vault is compromised, the attacker has both factors. For most users, the convenience outweighs this risk, particularly since Bitwarden's own 2FA still protects vault access. For users with higher threat models who use hardware security keys, the concern is moot.

## Bitwarden versus 1Password versus KeePass

**1Password** is closed-source, audited, and has a strong security reputation. Its Travel Mode feature (which can hide specific vaults when crossing borders) is unique. It is more expensive ($3/month personal) and not open source. For users who want an audited, polished commercial product and are comfortable with closed-source software, 1Password is a reasonable choice. For users who want to audit the code themselves or run their own server, it is not an option.

**KeePass** is fully open source and stores the vault locally as a file rather than in the cloud. There is no central server. The vault file can be synced via any file sync service you choose (Syncthing, Nextcloud, cloud storage). KeePass itself has a poor user experience; KeePassXC is the most recommended fork with a better interface. For users who are unwilling to trust any cloud service with an encrypted copy of their vault, KeePass/KeePassXC is the established option. The trade-off is more complexity: you manage sync, backup, and device access yourself.

Bitwarden sits between these: it is open source and audited like KeePass/KeePassXC but has cloud sync and a polished cross-platform experience like 1Password. It is the option that offers the most transparency at the least operational complexity, which is why it appears at the top of most privacy-oriented recommendations.

---

### Sources reviewed for this article

**Bitwarden security documentation** (bitwarden.com/help/bitwarden-security-white-paper) — Bitwarden's own security white paper covering the cryptographic model in detail. Self-published but technically specific; the encryption primitives described match what independent auditors have verified.

**Cure53 audit reports** (bitwarden.com/help/is-bitwarden-audited) — Annual third-party audit results, publicly linked from Bitwarden's own documentation. The 2022 and 2023 reports are most current. Cure53 is a reputable security consultancy; their reports are specific and credible.

**Privacy Guides, Passwords** (privacyguides.org/en/passwords) — Community recommendation with explicit criteria for inclusion. Bitwarden meets all criteria. The page also covers KeePassXC as an alternative for users who prefer local-only storage.

**Vaultwarden GitHub** (github.com/dani-garcia/vaultwarden) — Community-maintained Bitwarden-compatible server. The README explains the compatibility scope and the caveats about unofficial status.

**Security Now podcast, episode 932** (grc.com/sn) — Steve Gibson's technical analysis of Bitwarden's encryption model. Detailed and accurate; useful for readers who want the cryptographic primitives explained accessibly.
