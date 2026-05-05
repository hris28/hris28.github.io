---
title: "Software Layers: From Firmware to Application"
date: 2026-05-04
lastmod: 2026-05-04
next-review: 2027-05-04
stage: sprout
tags: [operating-system, hardware, software, drivers, security]
description: "The eleven layers between your hardware and your applications, what each one does, and why the distinctions matter for security and performance."
---

<p class="eyebrow">Software and Operating Systems · Cluster 07</p>

# Software Layers: From Firmware to Application

A computer is not one thing. It is a stack of layers, each one running on top of the one below it, each one presenting the layer above it with a simpler interface than what is underneath.

The reason this matters: security vulnerabilities are not generic. A rootkit in layer 2 survives an OS reinstall. A malicious browser extension in layer 8 is isolated from everything below it. The appropriate response to each kind of problem is different. Knowing which layer a threat lives in tells you what can actually fix it.

The layers below apply to a Windows machine. Linux and macOS differ in specifics but follow the same general structure.

---

## Layer 1: Hardware (physical)

The physical components: [CPU](https://en.wikipedia.org/wiki/Central_processing_unit), [GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit), [RAM](https://en.wikipedia.org/wiki/Random-access_memory), [SSD/NVMe](https://en.wikipedia.org/wiki/NVM_Express), [Wi-Fi card](https://en.wikipedia.org/wiki/Network_interface_controller), display, fans.

Every software layer runs on top of this. Hardware bottlenecks are the floor on performance. No amount of software optimization makes a slow SSD fast.

**Why it matters for security:** Hardware-level attacks are rare but persistent. A compromised firmware chip survives any software-level remediation. Physical access to a device changes the threat model entirely.

See [[hardware-basics]] for what each component does and how quality differences show up.

---

## Layer 2: Firmware (BIOS/UEFI)

[Firmware](https://en.wikipedia.org/wiki/Firmware) is software stored on a chip on the motherboard. It runs before the operating system loads. [UEFI](https://en.wikipedia.org/wiki/UEFI) is the modern replacement for the older [BIOS](https://en.wikipedia.org/wiki/BIOS).

UEFI initializes all hardware and hands control to the bootloader. It also enforces [Secure Boot](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface#Secure_boot), which cryptographically verifies that the bootloader has not been tampered with.

**Why it matters for security:** A [bootkit](https://en.wikipedia.org/wiki/Bootkit) that infects the UEFI survives operating system reinstalls, factory resets, and hard drive replacements. It runs before any security software can load. Keeping UEFI updated through the manufacturer's official channels and keeping Secure Boot enabled are the main defenses.

**What to check:** In Windows, run `Confirm-SecureBootUEFI` in an administrator PowerShell window. If it returns `True`, Secure Boot is active.

---

## Layer 3: Kernel and Hardware Abstraction Layer

The [kernel](https://en.wikipedia.org/wiki/Kernel_(operating_system)) is the core of the operating system. It runs in [Ring 0](https://en.wikipedia.org/wiki/Protection_ring), the highest privilege level available to software. Code running in Ring 0 has unrestricted access to all hardware and all memory.

The [Hardware Abstraction Layer (HAL)](https://en.wikipedia.org/wiki/Hardware_abstraction) sits between the kernel and physical hardware. It provides a consistent interface so the OS can run on different hardware configurations without rewriting the kernel for each one.

**Why it matters for security:** Any code running at this level is implicitly trusted. [Rootkits](https://en.wikipedia.org/wiki/Rootkit) and [bootkits](https://en.wikipedia.org/wiki/Bootkit) target this layer. Windows 11 requires [kernel-mode code signing](https://learn.microsoft.com/en-us/windows-hardware/drivers/install/kernel-mode-code-signing-policy--windows-vista-and-later-): all code running in Ring 0 must be cryptographically signed. [Hypervisor-Protected Code Integrity (HVCI)](https://learn.microsoft.com/en-us/windows/security/hardware-security/enable-virtualization-based-protection-of-code-integrity), also called Memory Integrity, enforces this even against attackers with administrative access.

**What to check:** In Windows Settings, go to Privacy and security, Windows Security, Device Security, Core isolation details. If Memory integrity is on, HVCI is active.

---

## Layer 4: Kernel-mode drivers

[Drivers](https://en.wikipedia.org/wiki/Device_driver) are the translation layer between the operating system and specific hardware. GPU drivers, audio drivers, network card drivers, storage drivers. They run in Ring 0, alongside the kernel.

A buggy driver can crash the entire system. A malicious driver can intercept any data that flows through it.

[Filter drivers](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/filter-drivers) attach to an existing driver stack and intercept data passing through. A filter driver on the network stack sees all network traffic before it reaches any application. A filter driver on the storage stack sees all file reads and writes.

**Why it matters for security:** There is no user-space application that can detect or block what a kernel-mode filter driver does. It operates below that level. Attackers use a technique called [Bring Your Own Vulnerable Driver (BYOVD)](https://attack.mitre.org/techniques/T1068/): install an old, legitimately signed driver that has a known vulnerability, then exploit that vulnerability to run arbitrary code in Ring 0.

**What to check:** Run `driverquery /v` in an administrator Command Prompt to list all loaded drivers. In [Sysinternals Autoruns](https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns), look at the Drivers tab for anything unsigned or from an unknown publisher.

---

## Layer 5: Windows services (user mode)

[Services](https://en.wikipedia.org/wiki/Windows_service) run in [user space](https://en.wikipedia.org/wiki/User_space_and_kernel_space) (Ring 3) but under privileged system accounts (SYSTEM, LOCAL SERVICE, NETWORK SERVICE). They start automatically at boot and run continuously in the background.

Most run inside `svchost.exe`, which is why Task Manager often shows many `svchost.exe` processes. Each one may be hosting multiple services.

Examples: Windows Defender, the Print Spooler, Windows Update, telemetry services, OEM-specific services from the device manufacturer (Lenovo Vantage, Nahimic, AISpeech).

**Why it matters for performance:** Every service set to Automatic start consumes RAM and CPU from the moment Windows loads. Many OEM services run continuously for features that most users never use.

**Why it matters for privacy:** [DiagTrack](https://learn.microsoft.com/en-us/windows/privacy/manage-connections-from-windows-operating-system-components-to-microsoft-services) (Connected User Experiences and Telemetry) sends usage data to Microsoft. It runs as a service. You can disable it, though it may be re-enabled by Windows Updates.

**What to check:** In PowerShell: `Get-Service | Where-Object {$_.StartType -eq 'Automatic' -and $_.Status -eq 'Running'}` lists every service currently running that is set to start automatically.

---

## Layer 6: Scheduled tasks and registry run keys

[Scheduled tasks](https://en.wikipedia.org/wiki/Windows_Task_Scheduler) run programs on a schedule, at login, at boot, or on specific events. [Registry Run keys](https://learn.microsoft.com/en-us/windows/win32/setupapi/run-and-runonce-registry-keys) launch programs when a user logs in.

These are the two main ways software persists beyond its initial installation. An application you uninstall through Settings may leave a scheduled task or registry entry that continues to run code.

**Why it matters:** Malware commonly uses scheduled tasks because they are less visible than services and are often not checked during incident response. OEM applications and update services also use them.

**What to check:** Open Task Scheduler (search in Start) and browse the Task Scheduler Library. In PowerShell: `Get-ScheduledTask | Where-Object {$_.State -eq "Ready"} | Select TaskName, TaskPath | Sort TaskPath`. [Sysinternals Autoruns](https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns) shows everything set to run at startup, including scheduled tasks and run keys, in one interface.

---

## Layer 7: Runtime environments

Many applications do not run directly on Windows. They run inside a [runtime environment](https://en.wikipedia.org/wiki/Runtime_system) that provides a managed execution layer.

[Visual C++ Redistributables](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist) are libraries required by applications compiled with Microsoft's C++ compiler. Multiple versions can coexist. They are used by many applications and should not be removed manually.

[.NET](https://dotnet.microsoft.com/) provides a managed runtime for C# and other .NET applications.

[WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) embeds a Chromium browser engine inside desktop applications. Applications that use WebView2 effectively contain a web browser that can load arbitrary web content. This is relevant for understanding what those applications can potentially access.

**Why it matters:** A vulnerability in a runtime affects every application that uses it. Runtime security updates are important for the same reason OS updates are.

---

## Layer 8: Applications (user space)

Regular applications running in Ring 3, the lowest privilege level. They cannot directly access hardware or other processes' memory without going through kernel-provided [system calls](https://en.wikipedia.org/wiki/System_call). This isolation is the fundamental security boundary.

[Electron](https://www.electronjs.org/) applications (Discord, Slack, VS Code, Spotify) embed a full Chromium browser engine. They are memory-heavy (a single Electron app may use 300-500MB of RAM) and have access to the local filesystem and network by default.

[MSIX packages](https://learn.microsoft.com/en-us/windows/msix/overview), installed from the Microsoft Store, run in a [sandboxed container](https://en.wikipedia.org/wiki/Sandbox_(computer_security)) with restricted access to the filesystem and registry.

---

## Layer 9: Network stack

Everything between an application making a network request and data arriving from the internet.

The sequence: application code, [Windows Sockets (Winsock)](https://learn.microsoft.com/en-us/windows/win32/winsock/windows-sockets-start-page-2), [TCP/IP driver](https://en.wikipedia.org/wiki/TCP/IP), network filter drivers, physical Wi-Fi or Ethernet adapter, router, internet.

**Why it matters for privacy:** [DNS](dns-explained) resolution happens at this layer. By default, DNS queries go to your ISP unencrypted. Changing this requires configuring encrypted DNS either in the browser (for browser traffic) or at the OS level (for all traffic).

**What to check:** In an administrator Command Prompt, `netsh wfp show filters` lists everything registered to inspect or modify network traffic through the [Windows Filtering Platform](https://learn.microsoft.com/en-us/windows/win32/fwp/windows-filtering-platform-start-page). A clean system shows only Windows Defender and Windows Firewall entries.

---

## Layer 10: Storage and filesystem

[NTFS](https://en.wikipedia.org/wiki/NTFS) is Windows' filesystem. It manages file permissions, metadata, crash recovery, and compression.

[NVMe SSDs](https://en.wikipedia.org/wiki/NVM_Express) are orders of magnitude faster than [HDDs](https://en.wikipedia.org/wiki/Hard_disk_drive) but have a finite number of write cycles. When RAM fills up, Windows moves infrequently used memory pages to a [page file](https://en.wikipedia.org/wiki/Paging) on the SSD. This is much faster than on an HDD but still far slower than RAM.

**Why it matters for security:** [Full disk encryption](https://en.wikipedia.org/wiki/Disk_encryption) (via [BitLocker](https://en.wikipedia.org/wiki/BitLocker) on Windows) encrypts the contents of the drive so that physical access to the hardware does not grant access to the data. Without disk encryption, anyone who physically removes your drive can read its contents. BitLocker status can be checked by running `manage-bde -status C:` in an administrator Command Prompt.

---

## Layer 11: Security and attestation

A cross-cutting layer that operates across all the others.

[Virtualization-Based Security (VBS)](https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/oem-vbs) uses the CPU's [hypervisor](https://en.wikipedia.org/wiki/Hypervisor) to create an isolated environment that even the kernel cannot access. [Credential Guard](https://learn.microsoft.com/en-us/windows/security/identity-protection/credential-guard/credential-guard) stores credential hashes in this isolated environment. HVCI (from Layer 3) runs there too.

[TPM 2.0](https://en.wikipedia.org/wiki/Trusted_Platform_Module) is a hardware chip that stores cryptographic keys and provides attestation. BitLocker uses it to seal the encryption key to a specific hardware configuration, so the drive cannot be decrypted on a different machine.

**What to check:** In PowerShell: `Get-Tpm` returns the status of your TPM chip. Windows Settings, Privacy and security, Windows Security, Device Security shows the status of all security layers in one view.

---

## Sources reviewed

**[Windows Internals, 7th edition (Russinovich, Solomon, Ionescu)](https://www.microsoftpressstore.com/store/windows-internals-part-1-system-architecture-processes-9780735684188)** — The definitive reference for Windows kernel architecture. Technical reading. Use it when you need to verify a claim about how a specific layer actually works.

**[MITRE ATT&CK](https://attack.mitre.org/)** — The most comprehensive public taxonomy of attacker techniques, organized by what they do and what layer they target. T1053 (scheduled task persistence), T1068 (privilege escalation via drivers), and T1014 (rootkits) are the most relevant for this article.

**[Microsoft Documentation](https://learn.microsoft.com/en-us/windows/)** — Primary source for specific Windows components. Accurate, but documentation quality varies by topic and is sometimes incomplete on security implications.

**[Sysinternals](https://learn.microsoft.com/en-us/sysinternals/)** — The tool suite (Autoruns, Process Monitor, Process Explorer, ProcMon) developed by Mark Russinovich and now maintained by Microsoft. The tools make the layers visible in practice. Autoruns in particular shows everything set to run at startup across all persistence mechanisms simultaneously.
