import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChangelogList } from "@/components/changelog-list"

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
    <main className="min-h-screen bg-background pt-24">
      <div className="container px-4 py-12">
        <Button variant="ghost" className="mb-8 gap-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-balance font-mono text-5xl font-bold animate-text-sweep">
            Changelog
          </h1>
          <p className="mb-12 text-balance text-xl text-muted-foreground leading-relaxed">
            Track all updates, improvements, and bug fixes for UltimateMenu
          </p>

          <ChangelogList releases={releases} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
