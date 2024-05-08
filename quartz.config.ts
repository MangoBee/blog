import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🖋 MangoBee",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      typography: {
        header: "Lora",
        body: "Inter",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: '#ECEFF4', // Soft blueish white for page background
          lightgray: '#E5E9F0', // Light gray for borders
          gray: '#D8DEE9', // Gray for graph links and heavier borders
          darkgray: '#4C566A', // Dark slate gray for body text
          dark: '#2E3440', // Near-black for header text and icons
          secondary: '#81A1C1', // Calm blue for link color and current graph nodes
          tertiary: '#88C0D0', // Lighter, icy blue for hover states and visited graph nodes
          highlight: '#8FBCBB' // Muted teal for internal link background and highlighted text
        },
        darkMode: {
          light: '#4C566A', // Dark slate gray for lighter areas (e.g., card backgrounds)
          lightgray: '#434C5E', // Darker gray for subtle borders
          gray: '#3B4252', // Even darker gray for additional elements like inactive states or deeper borders
          darkgray: '#D8DEE9', //Body text
          dark: '#D8DEE9', //Header text and icons
          secondary: '#D8DEE9', // Calm blue for links and interactive elements
          tertiary: '#88C0D0', // Lighter, icy blue for hover states and focus indicators
          highlight: '#5E81AC' // A darker blue for highlighted elements, ensuring good contrast on dark backgrounds
        },
      },
    }
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
