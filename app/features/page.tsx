import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { SectionHead } from "@/components/section-head"
import {
  HeartPulse,
  Banknote,
  Briefcase,
  Vault,
  Medal,
  Clapperboard,
  Globe2,
  Snowflake,
  LifeBuoy,
  LayoutGrid,
  Gamepad2,
  CircleCheck,
  Clock,
  Archive,
} from "lucide-react"

export const metadata: Metadata = {
  title: "All Features — UltimateMenu v3.0",
  description:
    "Browse every UltimateMenu category: Recovery, Money Methods, Businesses, Heist Editor, Unlocks, and more. Supports YimMenu Legacy and Nenyoo (Legacy & Enhanced).",
  alternates: { canonical: "https://ultimatemenu.github.io/features" },
}

/**
 * Categories mirror the real in-script tabs (extracted from
 * YimMenu/Ultimate_Menu_Legacy.lua). Keep names in sync with the script.
 */
const CATEGORIES = [
  {
    icon: HeartPulse,
    title: "Recovery & Rank",
    desc: "Fix a broken account or build a fresh one — stats, rank and skills in one place.",
    items: ["Recovery Menu", "Set Rank Menu", "Set Crew Rank Menu", "Skills Menu", "Full Account Unlock Menu"],
  },
  {
    icon: Banknote,
    title: "Money Methods",
    desc: "Tested money loops and helpers with built-in reporting.",
    items: ["Ultimate Money Methods Menu", "NightClub Safe Loop Menu", "Gun Van Menu", "YimResupplier", "Reports Menu"],
  },
  {
    icon: Briefcase,
    title: "Businesses & Cargo",
    desc: "Run and tune every business from CEO work to warehouses.",
    items: ["Businesses Menu", "CEO Manager Menu", "Air Cargo Menu", "Air Cargo Data Editor", "Warehouse Data Editor"],
  },
  {
    icon: Vault,
    title: "Heist Editor",
    desc: "The signature toolkit — edit, teleport and chain every major heist.",
    items: [
      "Apartment Heist",
      "Diamond Casino Heist",
      "Cayo Perico Heist",
      "Doomsday Heist",
      "Heists Data Editor Menu",
      "Missions Selector & Cooldown Menu",
      "Mission Cracker",
      "Heist Teleports",
    ],
  },
  {
    icon: Medal,
    title: "Awards & Unlocks",
    desc: "One-by-one or bulk unlocks for awards, achievements and DLC.",
    items: [
      "Awards Unlocker Menu",
      "Heists Awards Unlocker",
      "Doomsday Heist Awards",
      "DLC Awards Menu",
      "Achievements",
      "One By One Menu",
      "LSCM Unlocker Menu",
    ],
  },
  {
    icon: Clapperboard,
    title: "Story & DLC Jobs",
    desc: "Agency, auto shop, salvage yard and the newest story heists.",
    items: ["Agency", "Autoshop", "Salvage Yard", "Cluckin Bell Heist", "Kortz Center Heist", "Extras"],
  },
  {
    icon: Globe2,
    title: "Online Services",
    desc: "Everyday online utilities — services, casino, character and collectibles.",
    items: ["Online Services Menu", "Casino Services Menu", "Character", "Collectibles", "Events Menu"],
  },
  {
    icon: Snowflake,
    title: "Seasonal & Fun",
    desc: "Weather toggles, holiday hunts and sandbox toys.",
    items: [
      "Snow Toggle Menu",
      "Halloween Weather Toggle Menu",
      "Trick or Treat Menu",
      "Snowmen Collectibles",
      "Yeti Hunt Menu",
      "Self Menu",
      "Story Mode",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Safety & Help",
    desc: "Read-before-you-click guides built into the menu.",
    items: ["Use At Your Own Risk Menu", "Read Me Tutorial", "Credits"],
  },
]

const SUPPORT = [
  {
    icon: CircleCheck,
    base: "YimMenu",
    edition: "Legacy",
    status: "Fully supported",
    note: "Drop Ultimate_Menu_Legacy.lua into the YimMenu scripts folder. Updated Jul 24, 2026.",
    live: true,
  },
  {
    icon: CircleCheck,
    base: "Nenyoo",
    edition: "Legacy 3889 & Enhanced 1158.13",
    status: "Fully supported",
    note: "Copy the Nenyoo folder to %LOCALAPPDATA%\\Nenyoo\\Plus\\Scripts\\User\\UltimateMenu\\. Matching offsets are selected automatically.",
    live: true,
  },
  {
    icon: Clock,
    base: "YimMenu",
    edition: "Enhanced (V2)",
    status: "Coming soon",
    note: "Waiting on the YimMenuV2 Lua API. Watch the Changelog and Discord.",
    live: false,
  },
  {
    icon: Archive,
    base: "Kiddions",
    edition: "Modest Menu",
    status: "Final update Dec 12, 2024",
    note: "Legacy Modest Menu build. Still downloadable, no further updates planned.",
    live: false,
  },
]

export default function FeaturesPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ paddingTop: 120 }}>
      <div className="um-section" style={{ paddingBottom: 0 }}>
        <SectionHead
          id="features-page-heading"
          icon={<LayoutGrid aria-hidden="true" />}
          title={
            <>
              Every feature, <span className="um-title-highlight">by category</span>
            </>
          }
          sub="The real menu structure from the script — 206 options across 9 tabs. Names match what you see in-game."
        />
      </div>

      <div className="um-section" style={{ paddingTop: 0 }}>
        <div className="um-grid">
          {CATEGORIES.map((c) => (
            <article key={c.title} className="um-card visible">
              <div className="um-card-icon">
                <c.icon aria-hidden="true" />
              </div>
              <h2 className="um-card-title">{c.title}</h2>
              <p className="um-card-desc" style={{ marginBottom: 12 }}>
                {c.desc}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: 6 }}>
                {c.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 12,
                      padding: "5px 10px",
                      borderRadius: 100,
                      border: "1px solid rgba(255,255,255,.1)",
                      background: "rgba(255,255,255,.04)",
                      color: "var(--text-mid)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="um-section" style={{ paddingTop: 0 }}>
        <SectionHead
          id="support-heading"
          icon={<Gamepad2 aria-hidden="true" />}
          title={
            <>
              Supported <span className="um-title-highlight">bases & builds</span>
            </>
          }
          sub="One script, multiple homes. Pick the row that matches your setup."
        />
        <div className="um-grid um-grid-2">
          {SUPPORT.map((s) => (
            <article key={`${s.base}-${s.edition}`} className="um-card visible">
              <div className="um-card-icon">
                <s.icon aria-hidden="true" />
              </div>
              <h2 className="um-card-title">
                {s.base} · {s.edition}
              </h2>
              <p style={{ fontSize: 13, fontWeight: 600, color: s.live ? "#3ddc74" : "var(--amber)", marginBottom: 8 }}>
                {s.status}
              </p>
              <p className="um-card-desc">{s.note}</p>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Link href="/installation" className="um-btn-primary" style={{ marginRight: 10 }}>
            Installation Guide
          </Link>
          <a
            href="https://github.com/UltimateMenu/UltimateMenu/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="um-btn-glass"
          >
            Download v3.0 (Free)
          </a>
          <p style={{ marginTop: 14, fontSize: 13 }}>
            <Link href="/" style={{ color: "var(--accent-soft)" }}>
              ← Back to home
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
