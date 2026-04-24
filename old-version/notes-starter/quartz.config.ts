import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 configuration — customised for hris28.github.io/notes
 *
 * Aesthetic: stark black-and-white, Wikipedia/Khan-Academy-adjacent.
 * Serif body for long reading; sans-serif headers for hierarchy.
 * Colour is strictly grayscale — no blue links, no accent tints.
 *
 * To change the look, edit the theme block below.
 * To change layout density, edit quartz.layout.ts.
 * To tweak the finer details, edit quartz/styles/custom.scss.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Notes — Hrishika Roychoudhury",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: { provider: "plausible" },
    locale: "en-US",

    // IMPORTANT: this must match where the site is actually served.
    // A repo named `notes` under the `hris28` user publishes to:
    baseUrl: "hris28.github.io/notes",

    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",

    // Relative link resolution — safer for subpath hosting.
    markdownLinkResolution: "shortest",

    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // Sans-serif headers give the wiki a clean, navigable hierarchy.
        header: "Inter",
        // Serif body because long-form reading deserves it.
        body: "Source Serif 4",
        code: "JetBrains Mono",
      },
      colors: {
        // Strict grayscale — the whole point of the aesthetic.
        lightMode: {
          light:       "#ffffff",   // page background
          lightgray:   "#e6e6e6",   // borders, rules
          gray:        "#9a9a9a",   // graph links, muted text
          darkgray:    "#2b2b2b",   // body text
          dark:        "#111111",   // headers, icons
          secondary:   "#111111",   // links (same as text — underline does the work)
          tertiary:    "#555555",   // hover states, visited nodes
          highlight:   "rgba(0, 0, 0, 0.06)",
          textHighlight: "#ffe98a88",
        },
        darkMode: {
          light:       "#111111",
          lightgray:   "#2a2a2a",
          gray:        "#666666",
          darkgray:    "#e6e6e6",
          dark:        "#fafafa",
          secondary:   "#fafafa",
          tertiary:    "#a8a8a8",
          highlight:   "rgba(255, 255, 255, 0.08)",
          textHighlight: "#b3aa0255",
        },
      },
    },
  },

  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] }),
      Plugin.SyntaxHighlighting({
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [
      Plugin.RemoveDrafts(),
      Plugin.ExplicitPublish(),
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
