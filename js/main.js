/* =========================================================
   main.js
   Shared behaviors: theme toggle, mobile nav, active link, footer date.
   Loaded on every page.
   ========================================================= */

// --- Theme toggle (light/dark), saved to localStorage ---
(function initTheme() {
  const saved = localStorage.getItem("theme");
  // Respect saved choice, then OS preference, else light
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: next } }));
}

// --- Mobile nav expand/collapse ---
function toggleNav() {
  document.querySelector(".nav-links")?.classList.toggle("open");
}

// --- Mark the current nav link as active based on page URL ---
function highlightActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

// --- Footer: last-updated date + auto copyright year ---
// "Last updated" uses document.lastModified (when the file itself last
// changed), mirroring R.E. Bergquist's script, formatted "Thursday, 28 May 2026".
function stampFooterDate() {
  const el = document.getElementById("page-updated");
  // Only fill it if the build hasn't already baked in a per-page git date.
  // (The deploy workflow injects each page's real last-commit date; locally
  // the span is empty, so we fall back to this file's last-modified time.)
  if (el && !el.textContent.trim()) {
    const d = new Date(document.lastModified);
    const opts = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    el.textContent = isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", opts);
  }
  const yr = document.getElementById("copyright-year");
  if (yr) yr.textContent = new Date().getFullYear();
}

// --- Checklist persistence ---
// Any <ul class="checklist" data-persist="KEY"> will have its checked state
// saved to localStorage under "checklist:KEY". Restores on load, updates on change.
function initChecklists() {
  document.querySelectorAll(".checklist[data-persist]").forEach((list) => {
    const key = "checklist:" + list.dataset.persist;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    // Restore previous state
    list.querySelectorAll("input[type=checkbox]").forEach((cb) => {
      if (saved.includes(cb.id)) cb.checked = true;
      cb.addEventListener("change", () => {
        const current = [...list.querySelectorAll("input[type=checkbox]:checked")].map(c => c.id);
        localStorage.setItem(key, JSON.stringify(current));
      });
    });
  });
}

// --- Respect the user's motion preference everywhere ---
const PREFERS_REDUCED_MOTION = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// --- Scroll reveal: fade + rise sections as they enter the viewport ---
// Elements with class .reveal get .is-visible once seen. If the browser has no
// IntersectionObserver, or the user prefers reduced motion, everything is shown.
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (PREFERS_REDUCED_MOTION || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    // threshold 0 = reveal as soon as any part enters view. (A percentage
    // threshold can never be met by sections taller than the viewport, e.g.
    // the projects timeline, leaving them stuck invisible.)
    { threshold: 0, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

// --- Terminal typewriter: rotates through expertise terms one at a time ---
// Types a term, holds, backspaces, then types the next, looping forever.
// Accessibility: the animated line is aria-hidden and the full list lives in a
// sibling .sr-only span. Reduced motion shows the full list statically, and
// hovering/focusing the terminal reveals the whole list (cycle resumes on exit).
function initTerminalTypewriter() {
  const target = document.getElementById("expertise");
  if (!target) return;

  const terms = (target.dataset.terms || "")
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean);
  if (!terms.length) return;

  const terminal = document.getElementById("terminal");
  const hint = terminal ? terminal.querySelector(".thint") : null;

  // The single animated word + its trailing blinking cursor.
  const word = document.createElement("span");
  word.className = "term";
  const caret = document.createElement("span");
  caret.className = "term-cursor";
  caret.setAttribute("aria-hidden", "true");

  // Render the whole list statically (reduced-motion + hover "show all").
  function showAll() {
    target.textContent = "";
    terms.forEach((term, i) => {
      if (i > 0) {
        const sep = document.createElement("span");
        sep.className = "sep";
        sep.textContent = " · ";
        target.appendChild(sep);
      }
      const span = document.createElement("span");
      span.className = "term";
      span.textContent = term;
      target.appendChild(span);
    });
    target.appendChild(caret);
    target.classList.add("done");
  }

  // Reduced motion: skip the cycling, just show everything (no toggle hint).
  if (PREFERS_REDUCED_MOTION) {
    showAll();
    if (hint) hint.textContent = "";
    return;
  }

  // Rotating cycle: type a term, hold, backspace, advance, loop forever.
  const TYPE = 55; // ms per typed character
  const DELETE = 28; // ms per deleted character
  const HOLD = 1300; // pause once a term is fully typed
  const BETWEEN = 400; // pause after clearing, before the next term

  let i = 0; // current term index
  let pos = 0; // characters currently shown
  let phase = "typing"; // "typing" | "deleting"
  let timer = null;
  let revealed = false;
  let pinned = false; // click locks the full list open until clicked again

  function tick() {
    const term = terms[i];
    if (phase === "typing") {
      pos++;
      word.textContent = term.slice(0, pos);
      if (pos >= term.length) {
        phase = "deleting";
        timer = setTimeout(tick, HOLD);
      } else {
        timer = setTimeout(tick, TYPE + Math.random() * 45);
      }
    } else {
      pos--;
      word.textContent = term.slice(0, pos);
      if (pos <= 0) {
        i = (i + 1) % terms.length;
        phase = "typing";
        timer = setTimeout(tick, BETWEEN);
      } else {
        timer = setTimeout(tick, DELETE);
      }
    }
  }

  function startCycle() {
    target.dataset.started = "1";
    target.classList.remove("done");
    target.textContent = "";
    target.appendChild(word);
    target.appendChild(caret);
    tick();
  }

  // Reveal = show the full list and stop cycling. Resume = go back to cycling.
  function reveal() {
    if (revealed) return;
    revealed = true;
    target.dataset.started = "1";
    clearTimeout(timer);
    showAll();
  }
  function resume() {
    if (pinned) return; // a click is holding it open
    if (!revealed) return;
    revealed = false;
    pos = 0;
    phase = "typing";
    word.textContent = "";
    startCycle();
  }
  // Click (or Enter/Space) pins the full list open; click again resumes cycling.
  function setLabel() {
    if (!terminal) return;
    terminal.setAttribute(
      "aria-label",
      pinned
        ? "Focus areas, showing all. Activate to resume cycling."
        : "Focus areas, cycling. Activate to show the full list."
    );
    if (hint) hint.textContent = pinned ? "click to cycle" : "click to expand";
  }
  function togglePin() {
    pinned = !pinned;
    setLabel();
    if (pinned) {
      reveal();
    } else {
      revealed = true; // let resume() proceed
      resume();
    }
  }
  setLabel();
  if (terminal) {
    terminal.addEventListener("mouseenter", reveal);
    terminal.addEventListener("mouseleave", resume);
    terminal.addEventListener("focusin", reveal);
    terminal.addEventListener("focusout", resume);
    terminal.addEventListener("click", togglePin);
    terminal.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        togglePin();
      }
    });
  }

  // Kick off when the terminal scrolls into view.
  if ("IntersectionObserver" in window && terminal) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!target.dataset.started) startCycle();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(terminal);
  } else if (!target.dataset.started) {
    startCycle();
  }
}

// --- Reading progress bar (Wattpad-style) ---
// Activates on any page that includes <div class="scroll-progress">.
function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  if (!bar) return;
  function update() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + "%";
  }
  window.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
  window.addEventListener("resize", update);
  update();
}

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  stampFooterDate();
  initChecklists();
  initScrollReveal();
  initTerminalTypewriter();
  initScrollProgress();
});
