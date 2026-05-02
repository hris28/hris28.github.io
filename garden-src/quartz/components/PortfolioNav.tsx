import { QuartzComponentConstructor } from "./types"

const PortfolioNav: QuartzComponentConstructor = () => {
  function Nav() {
    return (
      <nav class="nav portfolio-quartz-nav" aria-label="Main navigation">
        <a href="/" class="nav-brand">
          Hrishika Roychoudhury<span class="dot">•</span>
        </a>

        <ul class="nav-links quartz-nav-links">
          <li><a href="https://hris28.github.io/">Home</a></li>
<li><a href="https://hris28.github.io/about.html">About</a></li>
<li><a href="https://hris28.github.io/projects.html">Projects</a></li>
<li><a href="https://hris28.github.io/resume.html">Résumé</a></li>
<li><a href="https://hris28.github.io/garden/" class="active">Garden</a></li>
<li><a href="https://hris28.github.io/interests.html">Interests</a></li>
        </ul>
      </nav>
    )
  }

  return Nav
}

export default PortfolioNav