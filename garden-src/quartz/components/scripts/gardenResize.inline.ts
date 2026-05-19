// Garden center-column resize handle.
// Adds a vertical drag handle on the right edge of #quartz-body > .center
// and persists the chosen width to localStorage. Double-click resets.
//
// Keyboard: when focused, ArrowLeft / ArrowRight nudge by 16px,
// Shift+Arrow nudges by 64px, Home resets to default.

const STORAGE_KEY = "garden:center-width"
const STEP = 16
const STEP_LARGE = 64

function readBounds() {
  const cs = getComputedStyle(document.documentElement)
  const parsePx = (raw: string, fallback: number) => {
    const n = parseInt(raw.trim(), 10)
    return Number.isFinite(n) ? n : fallback
  }
  return {
    min: parsePx(cs.getPropertyValue("--garden-center-min"), 560),
    max: parsePx(cs.getPropertyValue("--garden-center-max-drag"), 1400),
  }
}

function applyStoredWidth() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return
  const w = parseInt(stored, 10)
  if (!Number.isFinite(w)) return
  const { min, max } = readBounds()
  const clamped = Math.max(min, Math.min(max, w))
  document.documentElement.style.setProperty("--garden-center-width", `${clamped}px`)
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

// Apply stored width immediately (before first paint where possible)
applyStoredWidth()

// Re-apply and re-attach on every Quartz SPA navigation
document.addEventListener("nav", () => {
  applyStoredWidth()
  setupHandle()
})
