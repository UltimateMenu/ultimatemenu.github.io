import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { VideoShowcase } from "@/components/video-showcase"
import { Stats } from "@/components/stats"
import { CtaBand } from "@/components/cta-band"
import { Divider } from "@/components/divider"
import { Reveal } from "@/components/reveal"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen">
      <Reveal />
      <Hero />
      <Divider />
      <Stats />
      <Divider />
      <Features />
      <VideoShowcase />
      <Divider />
      <CtaBand />
      <Footer />
    </main>
  )
}
