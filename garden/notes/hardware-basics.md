---
title: "Hardware basics"
date: 2026-06-20
stage: seedling
tags: [hardware, gpu, cpu, term]
description: "The few hardware parts worth knowing when you read about performance or fingerprinting: CPU, RAM, GPU, storage, firmware, and why the GPU is so identifying."
---

# Hardware basics

The parts of a computer that come up most when reading about performance or tracking. Just enough to make the other notes make sense.

- **CPU (processor):** the general-purpose brain that runs your programs. "Cores" are independent workers; more cores means more things can run at once. A browser exposes the [logical core count](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency) to scripts.
- **RAM (memory):** fast, temporary working space for whatever is open right now. It is wiped on power-off. Distinct from storage, which is permanent.
- **GPU (graphics processor):** specialized hardware for drawing images and running parallel math. Originally for games and video; now also used for machine learning.
- **Storage:** the permanent disk (SSD or hard drive) where files and the operating system live.
- **Firmware:** tiny software baked into a chip that lets hardware start up before any operating system loads (for example the [BIOS or UEFI](https://en.wikipedia.org/wiki/UEFI) on a PC).

## Why the GPU matters for privacy

The combination of your exact **GPU model plus its driver version** is unusually identifying. When a page renders graphics, the result varies in tiny, consistent ways across different GPU and driver combinations, and a script can read the precise model string through a WebGL extension called [WEBGL_debug_renderer_info](https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info). That makes it one of the strongest single signals in a browser [fingerprint](browser-fingerprinting). Privacy-focused browsers like Brave and Tor deliberately blank or standardize it for that reason.

