"use client"

import { Button } from "@/components/ui/button"
import { Download, Github, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-24 md:py-32 snap-start">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "center",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
          animation: "gridMove 15s linear infinite",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-primary/[0.004] rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] bg-primary/[0.003] rounded-full blur-[100px] animate-[pulse_3s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-primary/[0.003] rounded-full blur-[100px] animate-[pulse_4s_ease-in-out_infinite]" />

      <div className="container relative z-10 max-w-7xl mx-auto">
        <div className="mx-auto max-w-5xl text-center">
          <div
            className={`mb-6 sm:mb-8 md:mb-10 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 text-xs sm:text-sm backdrop-blur-sm transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-primary">Now Available - Version 2.8</span>
          </div>

          <h1
            className={`mb-6 sm:mb-8 md:mb-10 flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono font-bold leading-tight tracking-tight transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 6rem)" }}
          >
            <span className="animate-[fadeInUp_0.8s_ease-out]">Ultimate</span>
            <span className="text-primary animate-text-sweep">
              Menu
            </span>
          </h1>

          <p
            className={`mb-4 sm:mb-6 md:mb-8 text-balance text-muted-foreground transition-all duration-1000 delay-200 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            style={{ fontSize: "clamp(1rem, 1.5vw + 0.5rem, 1.5rem)" }}
          >
            {"The most advanced YimMenu Lua script for GTA V"}
          </p>

          <p
            className={`mx-auto mb-8 sm:mb-10 md:mb-12 max-w-2xl text-balance leading-relaxed text-muted-foreground transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            style={{ fontSize: "clamp(0.875rem, 1vw + 0.5rem, 1.125rem)" }}
          >
            Unlock the full potential of GTA V with our feature-rich menu system. Built with the YimMenu Lua API for
            maximum performance and stability.
          </p>

          <div
            className={`flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 transition-all duration-1000 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            <Button
              size="lg"
              className="group relative w-full sm:w-auto gap-2 text-sm md:text-base transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] overflow-hidden"
              asChild
            >
              <a href="https://github.com/UltimateMenu/UltimateMenu/releases/latest" target="_blank" rel="noopener noreferrer">
                <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                <Download className="h-4 w-4 md:h-5 md:w-5" />
                Download Now
              </a>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 text-sm md:text-base bg-white text-black hover:bg-white/90 transition-all hover:scale-105"
              asChild
            >
              <a href="https://github.com/UltimateMenu/UltimateMenu" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 md:h-5 md:w-5" />
                View on GitHub
              </a>
            </Button>
          </div>

          <div
            className={`mt-5 sm:mt-6 md:mt-7 transition-all duration-1000 delay-600 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm md:text-base transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(88,101,242,0.5)]"
              asChild
            >
              <a href="https://l7neg.uk.to/discord" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                Join Discord Server
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted &&
          [...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-[float_2s_ease-in-out_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
      </div>
    </section>
  )
}
