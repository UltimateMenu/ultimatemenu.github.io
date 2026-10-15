"use client"

import { useEffect, useRef } from "react"

/**
 * Aurora divider: three slow sine waves drifting horizontally.
 */
export function Divider() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, Math.floor(rect.width))
      h = Math.max(1, Math.floor(rect.height))
      canvas.width = w * DPR
      canvas.height = h * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const WAVES = [
      { amp: 10, len: 0.006, speed: 0.00035, phase: 0.0, alpha: 0.5, width: 1.6, yOff: 0 },
      { amp: 16, len: 0.004, speed: -0.00025, phase: 2.1, alpha: 0.28, width: 1.2, yOff: -6 },
      { amp: 22, len: 0.003, speed: 0.00018, phase: 4.4, alpha: 0.16, width: 2.4, yOff: 6 },
    ]

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const mid = h / 2
      for (const wv of WAVES) {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 4) {
          const y =
            mid +
            wv.yOff * Math.sin((x / w) * Math.PI) +
            wv.amp * Math.sin(x * wv.len * 6.28 + t * wv.speed * 6.28 + wv.phase)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const grad = ctx.createLinearGradient(0, 0, w, 0)
        grad.addColorStop(0, "rgba(61,220,116,0)")
        grad.addColorStop(0.2, `rgba(61,220,116,${wv.alpha})`)
        grad.addColorStop(0.8, `rgba(61,220,116,${wv.alpha})`)
        grad.addColorStop(1, "rgba(61,220,116,0)")
        ctx.strokeStyle = grad
        ctx.lineWidth = wv.width
        ctx.shadowColor = "rgba(61,220,116,0.35)"
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    if (reduced) {
      draw(0)
    } else {
      const tick = (t: number) => {
        draw(t)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="um-divider" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  )
}
