import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

/**
 * Layout configuration — intentionally minimal.
 *
 * What's here:
 *   Header:     just the page title + read time (essentials only)
 *   Left:       Search + dark mode toggle (no file tree clutter)
 *   Right:      Backlinks + Table of Contents (the wiki essentials)
 *   Footer:     a one-line link back to the portfolio
 *
 * What's NOT here (deliberately removed):
 *   Explorer (file tree), Graph view, RecentNotes, reading-time in body.
 *   These can be re-added later by editing this file.
 */

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Portfolio": "https://hris28.github.io/",
      "GitHub":    "https://github.com/hris28",
      "RSS":       "/index.xml",
    },
  }),
}

// The layout used for individual notes (content pages).
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(),   grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// The layout used for folder pages (e.g. /notes/hci/) and tag pages.
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(),   grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  right: [],
}
