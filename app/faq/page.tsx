import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { SectionHead } from "@/components/section-head"
import { FaqList } from "@/components/faq-list"
import { CircleHelp } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ — UltimateMenu v3.0",
  description:
    "Is UltimateMenu safe? How do I install it? Does it work with YimMenu and Nenyoo? Answers here.",
  alternates: { canonical: "https://ultimatemenu.github.io/faq" },
}

export default function FaqPage() {
  return (
    <main id="main-content" className="min-h-screen" style={{ paddingTop: 120 }}>
      <div className="um-section" style={{ paddingBottom: 0 }}>
        <SectionHead
          id="faq-page-heading"
          icon={<CircleHelp aria-hidden="true" />}
          title={
            <>
              Questions, <span className="um-title-highlight">answered</span>
            </>
          }
          sub="The things every mod-menu player asks before downloading."
        />
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FaqList />
        </div>
        <p style={{ textAlign: "center", marginTop: 28, fontSize: 13 }}>
          Still stuck?{" "}
          <a
            href="https://l7neg.uk.to/discord"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent-soft)" }}
          >
            Ask on Discord
          </a>{" "}
          ·{" "}
          <Link href="/" style={{ color: "var(--accent-soft)" }}>
            ← Back to home
          </Link>
        </p>
      </div>
      <div style={{ height: 72 }} />
      <Footer />
    </main>
  )
}
