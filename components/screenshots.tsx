"use client"

import { useCallback, useEffect, useState } from "react"
import { SectionHead } from "@/components/section-head"
import { Lightbox } from "@/components/lightbox"
import { isActiveSlider, setActiveSlider } from "@/lib/active-slider"
import { LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react"

const screenshots = [
  { url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/7.png", alt: "UltimateMenu gallery — YimMenu build screenshot 7 (older version)" },
  { url: "https://ultimatemenu.github.io/ScreenShots/ModestMenu/8.png", alt: "UltimateMenu gallery — ModestMenu build screenshot 8 (older version)" },
  { url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/9.png", alt: "UltimateMenu gallery — YimMenu build screenshot 9 (older version)" },
  { url: "https://ultimatemenu.github.io/ScreenShots/ModestMenu/11.png", alt: "UltimateMenu gallery — ModestMenu build screenshot 11 (older version)" },
  { url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/12.png", alt: "UltimateMenu gallery — YimMenu build screenshot 12 (older version)" },
  { url: "https://ultimatemenu.github.io/ScreenShots/ModestMenu/13.png", alt: "UltimateMenu gallery — ModestMenu build screenshot 13 (older version)" },
]

export function Screenshots() {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + screenshots.length) % screenshots.length),
    []
  )

  useEffect(() => {
    if (lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (!isActiveSlider("gallery")) return
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, lightbox])

  const cur = screenshots[index]

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="um-section"
      onMouseEnter={() => setActiveSlider("gallery")}
      onFocusCapture={() => setActiveSlider("gallery")}
      onPointerDownCapture={() => setActiveSlider("gallery")}
    >
      <SectionHead
        id="gallery-heading"
        icon={<LayoutGrid aria-hidden="true" />}
        title={
          <>
            Gallery <span className="um-title-highlight">(old versions screenshots)</span>
          </>
        }
        sub="A closer look at How Ultimate Menu works."
      />

      <div className="um-slider um-reveal">
        <button type="button" className="um-slider-side" onClick={() => go(-1)} aria-label="Previous picture">
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

        <button type="button" className="um-slider-side" onClick={() => go(1)} aria-label="Next picture">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      <span className="sr-only" role="status">
        Picture {index + 1} of {screenshots.length}: {cur.alt}
      </span>

      {lightbox && (
        <Lightbox images={screenshots} index={index} onIndex={setIndex} onClose={() => setLightbox(false)} />
      )}
    </section>
  )
}
