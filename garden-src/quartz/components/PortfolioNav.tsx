import { QuartzComponentConstructor } from "./types"

const PortfolioNav: QuartzComponentConstructor = () => {
  function Nav() {
    return (
      <nav class="nav portfolio-quartz-nav" aria-label="Main navigation">
        <a href="/" class="nav-brand">
          Hrishika Roychoudhury<span class="dot">•</span>
        </a>

        <ul class="nav-links quartz-nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about.html">About</a></li>
          <li><a href="/projects.html">Projects</a></li>
          <li><a href="/resume.html">Résumé</a></li>
          <li><a href="/garden/" class="active">Garden</a></li>
          <li><a href="/interests.html">Interests</a></li>
        </ul>
      </nav>
    )
  }

  return Nav
}

export default PortfolioNav