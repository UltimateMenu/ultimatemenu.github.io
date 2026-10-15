import Link from "next/link"
import type { ReactNode } from "react"
import { Footer } from "@/components/footer"
import { SectionHead } from "@/components/section-head"
import { ArrowLeft } from "lucide-react"

/** Shared shell so changelog / installation / docs / features / faq all look the same. */
export function PageShell({
  icon,
  title,
  sub,
  headingId,
  children,
}: {
  icon: ReactNode
  title: ReactNode
  sub: string
  headingId: string
  children: ReactNode
}) {
  return (
    <main id="main-content" className="min-h-screen" style={{ paddingTop: 120 }}>
      <div className="um-section" style={{ paddingBottom: 0 }}>
        <Link href="/" className="um-btn-glass" style={{ marginBottom: 28 }}>
          <ArrowLeft size={15} aria-hidden="true" /> Back to Home
        </Link>
        <SectionHead id={headingId} icon={icon} title={title} sub={sub} />
        <div style={{ maxWidth: 860, margin: "0 auto" }}>{children}</div>
        <div style={{ height: 72 }} />
      </div>
      <Footer />
    </main>
  )
}
