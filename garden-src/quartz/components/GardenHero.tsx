import { QuartzComponentConstructor } from "./types"

const GardenHero: QuartzComponentConstructor = () => {
  function Hero() {
    return (
      <header class="hero hero-small garden-hero">
        <div
          class="hero-bg"
          style={{
            backgroundImage: "url('/images/pearlhacks2.jpeg')",
          }}
        />

        <div class="garden-hero-content">
          <p class="eyebrow">Notes in progress</p>
          <h1 class="display">Garden</h1>
          <p class="lede">
            A growing collection of notes, sketches, and working thoughts. Obsidian-compatible
            Markdown, wiki links between entries, and a growing information security guide focused
            on trustworthy, accessible learning.
          </p>
        </div>
      </header>
    )
  }

  return Hero
}

export default GardenHero