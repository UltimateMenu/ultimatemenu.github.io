import Link from "next/link"
import { Footer } from "@/components/footer"
import { Ghost } from "lucide-react"

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen" style={{ paddingTop: 120 }}>
      <div className="um-section" style={{ textAlign: "center", paddingBottom: 0 }}>
        <div className="um-section-badge" aria-hidden="true">
          <Ghost />
        </div>
        <p
          aria-hidden="true"
          className="um-text-sweep"
          style={{
            fontFamily: "'Chillax','Poppins',sans-serif",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            fontSize: "clamp(5rem, 18vw, 11rem)",
            margin: "8px 0 4px",
          }}
        >
          404
        </p>
        <h1
          className="um-section-title"
          style={{ fontSize: "clamp(22px, 3.4vw, 32px)" }}
        >
          This page <span className="um-title-highlight">went offline</span>
        </h1>
        <p className="um-section-sub">
          The link is broken, moved, or never existed — like a heist setup that
          desynced. Head back and try another route.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 30,
          }}
        >
          <Link href="/" className="um-btn-primary">
            Back to Home
          </Link>
          <Link href="/features" className="um-btn-glass">
            Browse Features
          </Link>
        </div>
        <div style={{ height: 80 }} />
      </div>
      <Footer />
    </main>
  )
}
