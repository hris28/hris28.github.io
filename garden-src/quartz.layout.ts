


import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),

  // This makes your Quartz garden feel like the rest of your portfolio.
  header: [
    Component.PortfolioNav(),
  ],

  afterBody: [],

  // Replace the default Quartz footer with your own site footer.
  footer: Component.PortfolioFooter(),
  // links: {GitHub: "https://github.com/jackyzha0/quartz", "Discord Community": "https://discord.gg/cRFFHYye7t", },
}

// components for pages that display a single page, e.g. a single note
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Show the garden hero only on /garden/
    Component.ConditionalRender({
      component: Component.GardenHero(),
      condition: (page) => page.fileData.slug === "index",
    }),

    // Show breadcrumbs only on article/note pages, not the garden homepage.
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),

    // Hide default article title on the homepage so the hero can own the page title.
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),

    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),

    Component.ConditionalRender({
      component: Component.TagList(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],

  left: [
    // Optional. You can keep this if you want the left sidebar to say Garden.
    // If it feels redundant with your nav, remove this line.
    // Component.PageTitle(),

    Component.MobileOnly(Component.Spacer()),

    // Keep Quartz features.
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),

    Component.Explorer(),
  ],

  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages, e.g. tags or folders
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],

  left: [
    Component.PageTitle(),

    Component.MobileOnly(Component.Spacer()),

    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),

    Component.Explorer(),
  ],

  right: [
    Component.Graph(),
  ],
}