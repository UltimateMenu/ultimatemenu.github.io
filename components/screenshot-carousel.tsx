"use client"

import { useCallback, useEffect, useState } from "react"
import { SectionHead } from "@/components/section-head"
import { Lightbox } from "@/components/lightbox"
import { isActiveSlider, setActiveSlider } from "@/lib/active-slider"
import { Images, ChevronLeft, ChevronRight } from "lucide-react"

const screenshots = [
  { url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/15.png", alt: "UltimateMenu v3 YimMenu interface — main menu overview (screenshot 15)" },
  { url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/16.png", alt: "UltimateMenu v3 YimMenu interface — feature submenu (screenshot 16)" },
  { url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/17.png", alt: "UltimateMenu v3 YimMenu interface — recovery options (screenshot 17)" },
  { url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/18.png", alt: "UltimateMenu v3 YimMenu interface — heist editor (screenshot 18)" },
  { url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/19.png", alt: "UltimateMenu v3 YimMenu interface — settings and themes (screenshot 19)" },
]

export function ScreenshotCarousel() {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + screenshots.length) % screenshots.length),
    []
  )

  useEffect(() => {
    if (lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (!isActiveSlider("showcase")) return
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, lightbox])

  const cur = screenshots[index]

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="um-section"
      onMouseEnter={() => setActiveSlider("showcase")}
      onFocusCapture={() => setActiveSlider("showcase")}
      onPointerDownCapture={() => setActiveSlider("showcase")}
    >
      <SectionHead
        id="showcase-heading"
        icon={<Images aria-hidden="true" />}
        title={
          <>
            Interface <span className="um-title-highlight">showcase</span>
          </>
        }
        sub="Below are some screenshots of the latest versions of Ultimate Menu."
      />

      <div className="um-slider um-reveal">
        <button type="button" className="um-slider-side" onClick={() => go(-1)} aria-label="Previous screenshot">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="um-frame um-slider-frame"
          style={{ padding: 0, background: "#000" }}
          onClick={() => setLightbox(true)}
          aria-label={`Open viewer: ${cur.alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={cur.url}
            src={cur.url}
            alt={cur.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ display: "block", width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute", top: 14, left: 14,
              fontFamily: "Poppins, sans-serif", fontSize: 12, fontWeight: 600,
              color: "#fff", background: "rgba(0,0,0,.6)", border: "1px solid rgba(255,255,255,.14)",
              padding: "5px 12px", borderRadius: 100,
            }}
          >
            {index + 1} / {screenshots.length}
          </span>
        </button>

        <button type="button" className="um-slider-side" onClick={() => go(1)} aria-label="Next screenshot">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      <span className="sr-only" role="status">
        Screenshot {index + 1} of {screenshots.length}: {cur.alt}
      </span>

      {lightbox && (
        <Lightbox images={screenshots} index={index} onIndex={setIndex} onClose={() => setLightbox(false)} />
      )}
    </section>
  )
}
