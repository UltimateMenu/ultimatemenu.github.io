"use client"

import { useEffect, useState } from "react"
import { SectionHead } from "@/components/section-head"
import { AnimatedNumber } from "@/components/animated-number"
import { Star, GitFork, Globe, Users } from "lucide-react"

export function Stats() {
  const [stars, setStars] = useState(0)
  const [forks, setForks] = useState(0)
  const [views, setViews] = useState(0)

  useEffect(() => {
    fetch("https://api.github.com/repos/UltimateMenu/UltimateMenu")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setStars(d.stargazers_count || 0)
          setForks(d.forks_count || 0)
        }
      })
      .catch(() => {})
    fetch("https://ghvc.vercel.app/api?username=ultimatemenu&format=json")
      .then((r) => r.json())
      .then((d) => typeof d.value === "number" && setViews(d.value))
      .catch(() => {})
  }, [])

  return (
    <section id="stats" aria-labelledby="trust-heading" className="um-section" style={{ paddingTop: 32 }}>
      <SectionHead
        id="trust-heading"
        icon={<Users aria-hidden="true" />}
        title={
          <>
            Trusted by the <span className="um-title-highlight">Community</span>
          </>
        }
        sub="Join thousands of satisfied users who trust UltimateMenu for their gaming experience."
      />

      <div className="um-grid">
        <article className="um-card" style={{ textAlign: "center" }}>
          <a
            href="https://github.com/UltimateMenu/UltimateMenu/stargazers"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block" }}
            aria-label="View UltimateMenu stargazers on GitHub"
          >
            <div className="um-card-icon" style={{ margin: "0 auto 14px" }}>
              <Star aria-hidden="true" />
            </div>
            <AnimatedNumber end={stars} className="um-stat-num" />
            <p style={{ fontSize: 13, marginTop: 4 }}>GitHub Stars</p>
          </a>
        </article>

        <article className="um-card" style={{ textAlign: "center" }}>
          <a
            href="https://github.com/UltimateMenu/UltimateMenu/forks"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block" }}
            aria-label="View UltimateMenu forks on GitHub"
          >
            <div className="um-card-icon" style={{ margin: "0 auto 14px" }}>
              <GitFork aria-hidden="true" />
            </div>
            <AnimatedNumber end={forks} className="um-stat-num" />
            <p style={{ fontSize: 13, marginTop: 4 }}>GitHub Forks</p>
          </a>
        </article>

        <article className="um-card" style={{ textAlign: "center" }}>
          <div className="um-card-icon" style={{ margin: "0 auto 14px" }}>
            <Globe aria-hidden="true" />
          </div>
          <AnimatedNumber end={views} className="um-stat-num" />
          <p style={{ fontSize: 13, marginTop: 4 }}>Page Views</p>
        </article>
      </div>
    </section>
  )
}
