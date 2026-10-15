import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { ScreenshotCarousel } from "@/components/screenshot-carousel"
import { Screenshots } from "@/components/screenshots"
import { Divider } from "@/components/divider"
import { Reveal } from "@/components/reveal"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Showcase — UltimateMenu v3.0",
  description:
    "Interface showcase: screenshots of the latest UltimateMenu versions running in-game on the YimMenu Lua API.",
  alternates: { canonical: "https://ultimatemenu.github.io/showcase" },
}

export default function ShowcasePage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ paddingTop: 120 }}>
      <Reveal />
      <div className="um-section" style={{ paddingBottom: 0, paddingTop: 0 }}>
        <Link href="/" className="um-btn-glass" style={{ marginBottom: 8 }}>
          <ArrowLeft size={15} aria-hidden="true" /> Back to Home
        </Link>
      </div>
      <ScreenshotCarousel />
      <Divider />
      <Screenshots />
      <p style={{ textAlign: "center", fontSize: 13, paddingBottom: 72 }}>
        Want the video tour?{" "}
        <Link href="/" style={{ color: "var(--accent-soft)" }}>
          Watch it on the homepage
        </Link>
      </p>
      <Footer />
    </main>
  )
}
