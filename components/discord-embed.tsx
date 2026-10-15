"use client"

import { usePathname } from "next/navigation"

const SITE = "https://ultimatemenu.github.io"
const ACCENT = 2604387 // #27bd63
const LOGO = `${SITE}/UltimateMenu.png`
const SHOWCASE_IMG = "https://ultimatemenu.github.io/ScreenShots/YimMenu/15.png"

const PAGES: Record<string, { title: string; desc: string }> = {
  "/": {
    title: "UltimateMenu v3.0 — 206 Options, Zero Compromises",
    desc: "The most advanced free Lua script for GTA V. Recovery, Money, Heist Editor + 206 options for YimMenu & Nenyoo. Free download.",
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
 * Discord Components V2 rich embed on every page (container + section +
 * gallery + link buttons), with per-route title, description and URL.
 * Component types: 17 Container, 9 Section, 10 Text, 11 Thumbnail,
 * 12 Gallery, 14 Separator, 1 Action Row, 2 + style 5 Link Button.
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
          type: 9,
          components: [
            {
              type: 10,
              content: `# **[${page.title}](${pageUrl})**\n${page.desc}`,
            },
          ],
          accessory: {
            type: 11,
            media: { url: LOGO },
          },
        },
        {
          type: 12,
          items: [{ media: { url: LOGO } }, { media: { url: SHOWCASE_IMG } }],
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
              emoji: { name: "📥" },
            },
            {
              type: 2,
              style: 5,
              label: "discord",
              url: "https://l7neg.uk.to/discord",
              emoji: { name: "💬" },
            },
            {
              type: 2,
              style: 5,
              label: "changelog",
              url: `${SITE}/changelog`,
              emoji: { name: "📜" },
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
