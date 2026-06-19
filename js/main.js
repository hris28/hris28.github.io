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
  if (el) {
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
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

// --- Terminal typewriter: types out expertise.txt one term at a time ---
// Accessibility: the animated line is aria-hidden and the full list is in a
// sibling .sr-only span. Reduced motion fills it instantly. Hovering the
// terminal (or focusing it) skips straight to the full list.
function initTerminalTypewriter() {
  const target = document.getElementById("expertise");
  if (!target) return;

  const terms = (target.dataset.terms || "")
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean);
  if (!terms.length) return;

  const terminal = document.getElementById("terminal");
  let finished = false;

  // Blinking block cursor that trails the typed text and stays put when done.
  const caret = document.createElement("span");
  caret.className = "term-cursor";
  caret.setAttribute("aria-hidden", "true");

  // Build the finished markup once so "reveal all" is trivial.
  function buildFull() {
    const frag = document.createDocumentFragment();
    terms.forEach((term, i) => {
      if (i > 0) {
        const sep = document.createElement("span");
        sep.className = "sep";
        sep.textContent = " · ";
        frag.appendChild(sep);
      }
      const span = document.createElement("span");
      span.className = "term";
      span.textContent = term;
      frag.appendChild(span);
    });
    return frag;
  }

  function finish() {
    if (finished) return;
    finished = true;
    target.textContent = "";
    target.appendChild(buildFull());
    target.appendChild(caret);
    target.classList.add("done");
  }

  // Skip animation entirely for reduced-motion users.
  if (PREFERS_REDUCED_MOTION) {
    finish();
    return;
  }

  // Let users bail out of the animation by hovering or focusing the terminal.
  if (terminal) {
    terminal.addEventListener("mouseenter", finish, { once: true });
    terminal.addEventListener("focusin", finish, { once: true });
  }

  let termIndex = 0;
  let charIndex = 0;

  function typeStep() {
    if (finished) return;
    const term = terms[termIndex];

    if (charIndex === 0 && termIndex > 0) {
      const sep = document.createElement("span");
      sep.className = "sep";
      sep.textContent = " · ";
      target.insertBefore(sep, caret);
    }

    if (charIndex < term.length) {
      // Group each term's characters under a single .term span.
      let span = caret.previousElementSibling;
      if (!span || !span.classList.contains("term") || charIndex === 0) {
        span = document.createElement("span");
        span.className = "term";
        target.insertBefore(span, caret);
      }
      span.textContent += term.charAt(charIndex);
      charIndex++;
      setTimeout(typeStep, 32 + Math.random() * 34);
    } else {
      termIndex++;
      charIndex = 0;
      if (termIndex < terms.length) {
        setTimeout(typeStep, 220); // brief pause between terms
      } else {
        // Leave the caret blinking at the end of the line.
        target.classList.add("done");
        finished = true;
      }
    }
  }

  function start() {
    if (finished || target.dataset.started) return;
    target.dataset.started = "1";
    target.appendChild(caret);
    typeStep();
  }

  // Begin typing once the terminal scrolls into view.
  if ("IntersectionObserver" in window && terminal) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(terminal);
  } else {
    start();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  stampFooterDate();
  initChecklists();
  initScrollReveal();
  initTerminalTypewriter();
});
