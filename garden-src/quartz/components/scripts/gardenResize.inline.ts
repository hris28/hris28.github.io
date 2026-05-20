// Garden center-column resize handle.
// Adds a vertical drag handle on the right edge of #quartz-body > .center
// and persists the chosen width to localStorage. Double-click resets.
//
// Keyboard: when focused, ArrowLeft / ArrowRight nudge by 16px,
// Shift+Arrow nudges by 64px, Home resets to default.
//
// Runtime safety: the script computes the actual horizontal space the
// center column can occupy on the current viewport and clamps the
// stored width against it, so a value saved on a wide monitor doesn't
// overflow on a narrow one (which used to push the handle off-screen
// and put the article underneath the fixed right rail).

const STORAGE_KEY = "garden:center-width"
const STEP = 16
const STEP_LARGE = 64

// Returns the horizontal space the center column can occupy without
// pushing the grid past the body's content box. The math reads the
// current grid-template-columns to get the live left-rail width
// (already 0 when the rail is collapsed) and subtracts body padding,
// col gap, and the rail. Falls back to a generous value if it can't
// read the body — better to leave the column alone than truncate.
function getAvailableWidth(): number {
  const body = document.getElementById("quartz-body")
  if (!body) return Infinity
  const cs = getComputedStyle(body)
  const padLeft = parseFloat(cs.paddingLeft) || 0
  const padRight = parseFloat(cs.paddingRight) || 0
  const colGap = parseFloat(cs.columnGap) || 0
  const tracks = cs.gridTemplateColumns.trim().split(/\s+/)
  const leftRail = parseFloat(tracks[0]) || 0
  const available = window.innerWidth - padLeft - padRight - leftRail - colGap
  // Leave a couple of pixels of slack so a rounding edge case doesn't
  // tip the layout into a horizontal scrollbar.
  return Math.max(0, Math.floor(available) - 2)
}

function readBounds() {
  const cs = getComputedStyle(document.documentElement)
  const parsePx = (raw: string, fallback: number) => {
    const n = parseInt(raw.trim(), 10)
    return Number.isFinite(n) ? n : fallback
  }
  const declaredMin = parsePx(cs.getPropertyValue("--garden-center-min"), 360)
  const declaredMax = parsePx(cs.getPropertyValue("--garden-center-max-drag"), 1400)
  const available = getAvailableWidth()
  // Cap the max to whatever the viewport can actually fit; if the
  // declared min is larger than what fits, the available width wins.
  const max = Math.max(0, Math.min(declaredMax, available))
  const min = Math.min(declaredMin, max || declaredMin)
  return { min, max }
}

function applyStoredWidth() {
  const stored = localStorage.getItem(STORAGE_KEY)
  const { min, max } = readBounds()
  if (stored) {
    const w = parseInt(stored, 10)
    if (Number.isFinite(w)) {
      const clamped = Math.max(min, Math.min(max, w))
      document.documentElement.style.setProperty("--garden-center-width", `${clamped}px`)
      return
    }
  }
  // No stored value: let the grid use 1fr but cap via max so the column
  // never tries to be wider than the runtime viewport allows.
  document.documentElement.style.setProperty("--garden-center-width", `minmax(0, ${max || 1400}px)`)
  // Actually 1fr is what we want when nothing's stored. minmax(0, max)
  // inside grid-template-columns would change semantics. Stay simple:
  // just remove the inline property so the var falls back to its CSS
  // default of 1fr.
  document.documentElement.style.removeProperty("--garden-center-width")
}

function resetWidth() {
  localStorage.removeItem(STORAGE_KEY)
  document.documentElement.style.removeProperty("--garden-center-width")
}

function saveWidth(px: number) {
  const { min, max } = readBounds()
  const clamped = Math.max(min, Math.min(max, Math.round(px)))
  document.documentElement.style.setProperty("--garden-center-width", `${clamped}px`)
  localStorage.setItem(STORAGE_KEY, String(clamped))
}

function setupHandle() {
  const center = document.querySelector<HTMLElement>("#quartz-body > .center")
  if (!center) return

  // Remove any existing handle (handles SPA re-navigation)
  const existing = center.querySelector(".garden-resize-handle")
  if (existing) existing.remove()

  const handle = document.createElement("div")
  handle.className = "garden-resize-handle"
  handle.setAttribute("role", "separator")
  handle.setAttribute("aria-orientation", "vertical")
  handle.setAttribute("aria-label", "Resize reading column. Double-click to reset.")
  handle.setAttribute("tabindex", "0")
  center.appendChild(handle)

  let dragging = false
  let startX = 0
  let startWidth = 0

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return
    const delta = e.clientX - startX
    saveWidth(startWidth + delta)
  }

  const onMouseUp = () => {
    if (!dragging) return
    dragging = false
    handle.classList.remove("dragging")
    document.body.classList.remove("garden-resizing")
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
  }

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    dragging = true
    startX = e.clientX
    startWidth = center.getBoundingClientRect().width
    handle.classList.add("dragging")
    document.body.classList.add("garden-resizing")
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  handle.addEventListener("mousedown", onMouseDown)
  handle.addEventListener("dblclick", resetWidth)

  // Touch support: mirror mouse handlers
  const onTouchMove = (e: TouchEvent) => {
    if (!dragging || !e.touches[0]) return
    const delta = e.touches[0].clientX - startX
    saveWidth(startWidth + delta)
  }
  const onTouchEnd = () => {
    if (!dragging) return
    dragging = false
    handle.classList.remove("dragging")
    document.body.classList.remove("garden-resizing")
    document.removeEventListener("touchmove", onTouchMove)
    document.removeEventListener("touchend", onTouchEnd)
  }
  handle.addEventListener("touchstart", (e) => {
    if (!e.touches[0]) return
    dragging = true
    startX = e.touches[0].clientX
    startWidth = center.getBoundingClientRect().width
    handle.classList.add("dragging")
    document.body.classList.add("garden-resizing")
    document.addEventListener("touchmove", onTouchMove, { passive: false })
    document.addEventListener("touchend", onTouchEnd)
  })

  // Keyboard support
  handle.addEventListener("keydown", (e) => {
    const current = center.getBoundingClientRect().width
    const step = e.shiftKey ? STEP_LARGE : STEP
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      saveWidth(current - step)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      saveWidth(current + step)
    } else if (e.key === "Home") {
      e.preventDefault()
      resetWidth()
    }
  })

  // Clean up handlers on SPA navigation
  ;(window as any).addCleanup?.(() => {
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
    document.removeEventListener("touchmove", onTouchMove)
    document.removeEventListener("touchend", onTouchEnd)
  })
}

// Re-clamp when the viewport size changes. Throttle to avoid thrashing
// the grid during a window-drag resize. Module-level so the listener
// is registered only once even if nav fires repeatedly.
let resizeTicking = false
function onResize() {
  if (resizeTicking) return
  resizeTicking = true
  window.requestAnimationFrame(() => {
    applyStoredWidth()
    resizeTicking = false
  })
}
window.addEventListener("resize", onResize)

// Apply stored width immediately (before first paint where possible)
applyStoredWidth()

// Re-apply and re-attach on every Quartz SPA navigation
document.addEventListener("nav", () => {
  applyStoredWidth()
  setupHandle()
})
