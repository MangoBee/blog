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
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          --color-red-rgb:                 var(--red_x);
          --color-red:                     var(--red);
          --color-purple-rgb:              var(--purple_x);
          --color-purple:                  var(--purple);
          --color-green-rgb:               var(--green_x);
          --color-green:                   var(--green);
          --color-cyan-rgb:                var(--frost1_x);
          --color-cyan:                    var(--frost1);
          --color-blue-rgb:                var(--frost3_x);
          --color-blue:                    var(--frost3);
          --color-yellow-rgb:              var(--yellow_x);
          --color-yellow:                  var(--yellow);
          --color-orange-rgb:              var(--orange_x);
          --color-orange:                  var(--orange);
          /* --color-pink:                    var(--purple); */
      
          --background-primary:            var(--dark0);
          --background-primary-alt:        var(--dark0);
          --background-secondary:          var(--dark1);
          --background-secondary-alt:      var(--dark2);
          --background-modifier-border:    var(--dark2);
      
          --cursor-line-background:        rgba(var(--red_x), 0.2);
      
          --text-normal:                   var(--light2);
          --text-faint:                    var(--light0);
          --text-muted:                    var(--light1);
      
          --link-url:                      var(--purple);
      
          --h1-color:                      var(--red);
          --h2-color:                      var(--yellow);
          --h3-color:                      var(--green);
          --h4-color:                      var(--purple);
          --h5-color:                      var(--frost0);
          --h6-color:                      var(--frost2);
      
          --text-highlight-bg:             var(--frost1);
          --text-highlight-fg:             var(--dark0);
      
          --text-accent:                   var(--orange);
          --text-accent-hover:             var(--frost2);
      
          --tag-color:                     var(--frost0);
          --tag-background:                var(--dark2);
          --tag-background-hover:          var(--dark1);
      
          --titlebar-text-color-focused:   var(--red);
      
          --inline-title-color:            var(--yellow);
      
          --bold-color:                    var(--yellow);
          --italic-color:                  var(--yellow);
      
          --checkbox-color:                var(--frost0);
          --checkbox-color-hover:          var(--frost0);
          --checkbox-border-color:         var(--frost0);
          --checkbox-border-color-hover:   var(--frost0);
          --checklist-done-color:          rgba(var(--light2_x), 0.5);
      
          --table-header-background:       hsl(220, 16%, 16%);
          --table-header-background-hover: var(--dark3);
          --table-row-even-background:     hsl(220, 16%, 20%);
          --table-row-odd-background:      hsl(220, 16%, 24%);
          --table-row-background-hover:    var(--dark3);
      
          --text-selection:                rgba(var(--red_x), 0.6);
          --flashing-background:           rgba(var(--red_x), 0.3);
      
          --code-normal:                   var(--frost1);
          --code-background:               var(--dark1);
      
          --mermaid-note:                  var(--frost3);
          --mermaid-loopline:              var(--frost1);
          --mermaid-exclude:               var(--dark3);
          --mermaid-seqnum:                var(--dark0);
      
          --icon-color-hover:              var(--red);
          --icon-color-focused:            var(--frost2);
      
          --nav-item-color-hover:          var(--red);
          --nav-item-color-active:         var(--frost2);
          --nav-file-tag:                  rgba(var(--yellow_x), 0.9);
      
          --graph-line:                    var(--dark3);
          --graph-node:                    var(--light3);
          --graph-node-tag:                var(--red);
          --graph-node-attachment:         var(--green);
      
          --calendar-hover:                var(--red);
          --calendar-background-hover:     var(--dark3);
          --calendar-week:                 var(--yellow);
          --calendar-today:                var(--yellow);
      
          --dataview-key:                  var(--text-faint);
          --dataview-key-background:       rgba(var(--frost2_x), 0.3);
          --dataview-value:                var(--text-faint);
          --dataview-value-background:     rgba(var(--red_x), 0.3);
      
          --tab-text-color-focused-active:         var(--frost2);
          --tab-text-color-focused-active-current: var(--red);
        },
      },
    },
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
