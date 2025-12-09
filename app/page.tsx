import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Screenshots } from "@/components/screenshots"
import { VideoShowcase } from "@/components/video-showcase"
import { Stats } from "@/components/stats"
import { ScreenshotCarousel } from "@/components/screenshot-carousel"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Stats />
      <Features />
      <VideoShowcase />
      <ScreenshotCarousel />
      <Screenshots />
      <Footer />
    </main>
  )
}
