"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedNumber({
  end,
  duration = 1800,
  className,
}: {
  end: number
  duration?: number
  className?: string
}) {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let start: number | null = null
    let raf = 0
    const tick = (t: number) => {
      if (start === null) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setCount(Math.floor(end * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, end, duration])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
    </span>
  )
}
