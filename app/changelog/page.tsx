import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { ChangelogList } from "@/components/changelog-list"
import { ScrollText } from "lucide-react"

export const metadata: Metadata = {
  title: "Changelog — UltimateMenu v3.0",
  description: "Track all updates, improvements, and bug fixes for UltimateMenu.",
  alternates: { canonical: "https://ultimatemenu.github.io/changelog" },
}

async function getChangelog() {
  try {
    const response = await fetch("https://api.github.com/repos/UltimateMenu/UltimateMenu/releases", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch changelog:", error)
    return []
  }
}

export default async function ChangelogPage() {
  const releases = await getChangelog()

  return (
    <PageShell
      headingId="changelog-heading"
      icon={<ScrollText aria-hidden="true" />}
      title={
        <>
          <span className="um-title-highlight">Changelog</span>
        </>
      }
      sub="Track all updates, improvements, and bug fixes for UltimateMenu."
    >
      <ChangelogList releases={releases} />
    </PageShell>
  )
}
