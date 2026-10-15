"use client"

import { useEffect, useState } from "react"
import { HeroCanvas } from "@/components/hero-canvas"
import { AnimatedNumber } from "@/components/animated-number"
import { Download, Github, ChevronDown } from "lucide-react"

export function Hero() {
  const [gh, setGh] = useState({ stars: 0, forks: 0 })
  const [views, setViews] = useState(0)

  useEffect(() => {
    fetch("https://api.github.com/repos/UltimateMenu/UltimateMenu")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setGh({ stars: d.stargazers_count || 0, forks: d.forks_count || 0 }))
      .catch(() => {})
    fetch("https://ghvc.vercel.app/api?username=ultimatemenu&format=json")
      .then((r) => r.json())
      .then((d) => typeof d.value === "number" && setViews(d.value))
      .catch(() => {})
  }, [])

  return (
    <section id="top" aria-labelledby="hero-heading" className="um-hero">
      <HeroCanvas />

      <p className="um-hero-badge">
        <span className="dot" aria-hidden="true" />
        Now Available — Version 3
      </p>

      <h1 id="hero-heading" className="um-hero-title">
        <span>Unlock the full potential of GTA V</span>
        <span className="um-hero-title-brand">
          {/* Icon slot: render <LogoMark size={44} /> here once real icon art lands. */}
          with <span>Ultimate<span className="um-text-sweep">Menu</span></span>
        </span>
      </h1>

      <p className="um-hero-sub">
        The most advanced Lua script for GTA V. Recovery, Money, Heist Editor and 206
        options — built for{" "}
        <a href="/features" style={{ color: "var(--accent-soft)", fontWeight: 600 }}>
          YimMenu, Nenyoo &amp; more
        </a>
        .
      </p>

      <p className="um-hero-stats">
        <span className="um-hero-stat-num">
          {views > 0 ? <AnimatedNumber end={views} /> : "—"}
        </span>{" "}
        page views &middot;{" "}
        <span className="um-hero-stat-num">
          {gh.stars > 0 ? <AnimatedNumber end={gh.stars} /> : "—"}
        </span>{" "}
        stars &middot; <AnimatedNumber end={206} className="um-hero-stat-num" /> options
      </p>

      <div className="um-hero-btns">
        <a
          id="download"
          href="https://github.com/UltimateMenu/UltimateMenu/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="um-btn-primary"
        >
          <Download size={15} aria-hidden="true" /> Download Now
        </a>
        <a
          href="https://github.com/UltimateMenu/UltimateMenu"
          target="_blank"
          rel="noopener noreferrer"
          className="um-btn-white"
        >
          <Github size={15} aria-hidden="true" /> View Source
        </a>
      </div>

      <button
        type="button"
        className="um-scroll-cue"
        onClick={() => document.querySelector("#stats")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        aria-label="Scroll to content"
      >
        <span>scroll</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
    </section>
  )
}
