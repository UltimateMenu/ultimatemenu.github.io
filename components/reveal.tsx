"use client"

import { useEffect } from "react"

/** Scroll-reveal for cards, plus pending cross-page anchor scroll. */
export function Reveal() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    try {
      const hash = sessionStorage.getItem("um-scroll")
      if (hash) {
        sessionStorage.removeItem("um-scroll")
        timer = setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 120)
      }
    } catch {
    }
    const els = Array.from(document.querySelectorAll(".um-card, .um-reveal"))
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"))
      return () => clearTimeout(timer)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible")
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      clearTimeout(timer)
    }
  }, [])
  return null
}
