// Garden sidebar toggles.
// Adds two small floating buttons that collapse the left or right rail.
// State persists in localStorage and re-applies on every SPA navigation.
//
// CSS in custom.scss reads body.garden-left-collapsed and
// body.garden-right-collapsed to zero out the rail width vars and hide
// the rail contents.

const LEFT_KEY = "garden:left-collapsed"
const RIGHT_KEY = "garden:right-collapsed"

function applyStored() {
  const left = localStorage.getItem(LEFT_KEY) === "1"
  const right = localStorage.getItem(RIGHT_KEY) === "1"
  document.body.classList.toggle("garden-left-collapsed", left)
  document.body.classList.toggle("garden-right-collapsed", right)
}

function mountToggle(side: "left" | "right") {
  // Remove any existing button (handles SPA re-navigation cleanly)
  const existing = document.querySelector(`.garden-rail-toggle.${side}`)
  if (existing) existing.remove()

  const btn = document.createElement("button")
  btn.className = `garden-rail-toggle ${side}`
  btn.type = "button"
  btn.setAttribute("aria-label", `Toggle ${side} sidebar`)
  btn.setAttribute("aria-pressed", "false")
  document.body.appendChild(btn)

  const key = side === "left" ? LEFT_KEY : RIGHT_KEY
  const cls = side === "left" ? "garden-left-collapsed" : "garden-right-collapsed"

  const sync = () => {
    const collapsed = document.body.classList.contains(cls)
    btn.setAttribute("aria-pressed", collapsed ? "true" : "false")
  }
  sync()

  btn.addEventListener("click", () => {
    const collapsed = document.body.classList.toggle(cls)
    localStorage.setItem(key, collapsed ? "1" : "0")
    sync()
  })
}

function setup() {
  applyStored()
  mountToggle("left")
  mountToggle("right")
}

// Run on initial load and on every Quartz SPA navigation
setup()
document.addEventListener("nav", setup)
