"use client"

import { useEffect, useRef } from "react"

type Orb = {
  bx: number
  by: number
  r: number
  ax: number
  ay: number
  sx: number
  sy: number
  p: number
  a: number
}

type Mote = { x: number; y: number; r: number; a: number }

/**
 * Calm hero backdrop: slow-breathing green orbs over faint static dust.
 */
export function HeroCanvas({ className = "um-hero-canvas" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let w = 0
    let h = 0
    let raf = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

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

    const orbs: Orb[] = [
      { bx: 0.22, by: 0.3, r: 0.34, ax: 0.03, ay: 0.02, sx: 0.00012, sy: 0.0001, p: 0.0, a: 0.1 },
      { bx: 0.78, by: 0.24, r: 0.28, ax: 0.025, ay: 0.03, sx: 0.0001, sy: 0.00013, p: 2.1, a: 0.08 },
      { bx: 0.5, by: 0.62, r: 0.4, ax: 0.02, ay: 0.02, sx: 0.00009, sy: 0.00011, p: 4.2, a: 0.07 },
      { bx: 0.12, by: 0.75, r: 0.24, ax: 0.03, ay: 0.015, sx: 0.00011, sy: 0.00009, p: 1.3, a: 0.06 },
      { bx: 0.88, by: 0.72, r: 0.26, ax: 0.02, ay: 0.025, sx: 0.00012, sy: 0.0001, p: 5.4, a: 0.06 },
    ]

    const motes: Mote[] = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 0.9,
      a: 0.05 + Math.random() * 0.1,
    }))

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const base = ctx.createRadialGradient(w / 2, h * 0.16, 0, w / 2, h * 0.16, Math.max(w, h) * 0.5)
      base.addColorStop(0, "rgba(39,160,85,0.10)")
      base.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = base
      ctx.fillRect(0, 0, w, h)

      for (const o of orbs) {
        const breathe = 0.82 + 0.18 * Math.sin(t * 0.00016 + o.p)
        const x = (o.bx + o.ax * Math.sin(t * o.sx * 6.28 + o.p)) * w
        const y = (o.by + o.ay * Math.cos(t * o.sy * 6.28 + o.p)) * h
        const r = o.r * Math.max(w, h) * breathe
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, `rgba(46,190,100,${(o.a * breathe).toFixed(3)})`)
        g.addColorStop(1, "rgba(46,190,100,0)")
        ctx.fillStyle = g
        ctx.fillRect(x - r, y - r, r * 2, r * 2)
      }

      ctx.fillStyle = "#c9f7d6"
      for (const m of motes) {
        ctx.globalAlpha = m.a
        ctx.beginPath()
        ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
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

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
