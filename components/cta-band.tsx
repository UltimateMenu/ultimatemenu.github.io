"use client"

import { useEffect, useRef } from "react"
import { Download } from "lucide-react"
import { FaDiscord } from "react-icons/fa"

const STARS: Array<[number, number, number, number]> = [
  [0.08, 0.2, 1.6, 0.7], [0.16, 0.65, 1.1, 0.5], [0.24, 0.35, 2.0, 0.8],
  [0.33, 0.75, 1.3, 0.55], [0.41, 0.25, 1.0, 0.45], [0.5, 0.55, 1.7, 0.7],
  [0.58, 0.3, 1.2, 0.5], [0.66, 0.7, 1.9, 0.75], [0.74, 0.4, 1.1, 0.5],
  [0.82, 0.62, 1.5, 0.65], [0.9, 0.28, 1.2, 0.55], [0.95, 0.55, 1.6, 0.6],
  [0.12, 0.85, 1.4, 0.5], [0.45, 0.85, 1.1, 0.45], [0.62, 0.88, 1.3, 0.5], [0.88, 0.85, 1.2, 0.5],
]

function CtaStars() {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    let t = 0
    const tick = () => {
      t += 0.03
      ref.current?.querySelectorAll("circle").forEach((c, i) => {
        c.setAttribute("opacity", (STARS[i][3] * (0.55 + 0.45 * Math.sin(t + i * 1.7))).toFixed(2))
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <svg ref={ref} className="um-cta-stars" viewBox="0 0 1153 500" preserveAspectRatio="none" aria-hidden="true">
      {STARS.map(([x, y, r, o], i) => (
        <circle key={i} cx={x * 1153} cy={y * 500} r={r} fill="#c9f7d6" opacity={o} />
      ))}
    </svg>
  )
}

export function CtaBand() {
  return (
    <div className="um-cta-wrap">
      <div className="um-cta-ring">
        <section className="um-cta" aria-labelledby="cta-heading">
          <CtaStars />
          <h2 id="cta-heading" className="um-cta-title">
            Get UltimateMenu Now and explore all{" "}
            <span className="um-title-highlight">206 options</span> today
          </h2>
          <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://github.com/UltimateMenu/UltimateMenu/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="um-cta-btn"
            >
              <Download size={15} aria-hidden="true" /> Download Now
            </a>
            <a href="https://l7neg.uk.to/discord" target="_blank" rel="noopener noreferrer" className="um-cta-btn">
              <FaDiscord size={16} aria-hidden="true" /> Join Discord Server
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
