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

// --- Write last-updated date into footer (preserves original feature) ---
function stampFooterDate() {
  const el = document.getElementById("page-updated");
  if (!el) return;
  const d = new Date();
  const opts = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  el.textContent = d.toLocaleDateString("en-US", opts);
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

document.addEventListener("DOMContentLoaded", () => {
  highlightActiveNav();
  stampFooterDate();
  initChecklists();
});
