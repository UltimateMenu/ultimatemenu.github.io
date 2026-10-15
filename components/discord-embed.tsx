"use client"

import { usePathname } from "next/navigation"

const SITE = "https://ultimatemenu.github.io"
const ACCENT = 2604387 // #27bd63
const LOGO = `${SITE}/UltimateMenu.png`

// Custom emojis (Application emojis uploaded by l7neg)
// telegram: 1551093032739278939
// github:   1551092539166040225
// earth:    1551083938766782596
// discord:  1551083599846056016

const PAGES: Record<string, { title: string; desc: string }> = {
  "/": {
    title: "UltimateMenu",
    desc: "The most advanced free Lua script for GTA V. Recovery, Money, Heist Editor + 206 options for YimMenu & Nenyoo.",
  },
  "/features": {
    title: "Every Feature — UltimateMenu",
    desc: "Browse all 206 real options by category: Recovery, Money, Heists, Unlocks + supported bases (YimMenu Legacy, Nenyoo Legacy & Enhanced).",
  },
  "/showcase": {
    title: "Showcase — UltimateMenu",
    desc: "Screenshots of the latest UltimateMenu versions running in-game, plus the old-versions gallery.",
  },
  "/faq": {
    title: "FAQ — UltimateMenu",
    desc: "Is it safe? How do I install it? Does it work with YimMenu & Nenyoo? Answered.",
  },
  "/changelog": {
    title: "Changelog — UltimateMenu",
    desc: "Track every UltimateMenu update, improvement and bug fix.",
  },
  "/installation": {
    title: "Installation Guide — UltimateMenu",
    desc: "Install UltimateMenu for GTA V in minutes: BattlEye off, inject YimMenu, drop in the script.",
  },
  "/docs": {
    title: "Docs — UltimateMenu",
    desc: "Developer notes and reference for UltimateMenu.",
  },
}

/**
 * Discord Components V2 rich embed on every page (container + text +
 * single-image gallery + link buttons), with per-route title, description and URL.
 * Component types: 17 Container, 10 Text,
 * 12 Gallery (single website image only), 14 Separator,
 * 1 Action Row, 2 + style 5 Link Button.
 */
export function DiscordEmbed() {
  const pathname = usePathname() || "/"
  const page = PAGES[pathname] ?? PAGES["/"]
  const pageUrl = `${SITE}${pathname === "/" ? "/" : pathname}`

  const payload = {
    component: {
      type: 17,
      accent_color: ACCENT,
      components: [
        {
          type: 10,
          content: `# **[${page.title}](${pageUrl})**\n${page.desc}`,
        },
        {
          type: 12,
          items: [{ media: { url: LOGO } }],
        },
        { type: 14, spacing: 1 },
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: "download",
              url: "https://github.com/UltimateMenu/UltimateMenu/releases/latest",
              emoji: { id: "1551092539166040225", name: "github", animated: false },
            },
            {
              type: 2,
              style: 5,
              label: "discord",
              url: "https://l7neg.uk.to/discord",
              emoji: { id: "1551083599846056016", name: "discord", animated: false },
            },
            {
              type: 2,
              style: 5,
              label: "changelog",
              url: `${SITE}/changelog`,
              emoji: { id: "1551083938766782596", name: "earth", animated: false },
            },
          ],
        },
      ],
    },
  }

  return (
    <script
      id="discord:component-embed"
      type="application/json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
