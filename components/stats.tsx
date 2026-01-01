"use client"

import { useEffect, useState, useRef } from "react"
import { Star, GitFork, Globe } from "lucide-react"
import { FreeVisitorCounter } from '@rundevelrun/free-visitor-counter'
import { motion } from "framer-motion"

function AnimatedCounter({ end, duration = 5000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      // easeOutExpo easing function
      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      }

      if (progress < duration) {
        const percentage = progress / duration
        const easedProgress = easeOutExpo(percentage)
        setCount(Math.floor(end * easedProgress))
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return <span ref={ref} className="font-mono text-4xl font-bold text-primary">{count.toLocaleString()}{suffix}</span>
}

async function fetchGitHubStats() {
  try {
    const response = await fetch("https://api.github.com/repos/UltimateMenu/UltimateMenu")
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error)
    return null
  }
}

export function Stats() {
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
  })
  const [totalViews, setTotalViews] = useState(0)
  const [dashboardUrl, setDashboardUrl] = useState("")

  useEffect(() => {
    // Fetch GitHub stats
    fetchGitHubStats().then((data) => {
      if (data) {
        setStats(prev => ({
          ...prev,
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
        }))
      }
    })
  }, [])

  return (
    <section className="min-h-screen flex items-center py-12 md:py-24 snap-start bg-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="mb-4 text-balance text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight animate-text-sweep">
            Trusted by the Community
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of satisfied users who trust UltimateMenu for their gaming experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:scale-105"
          >
            <a
              href="https://github.com/UltimateMenu/UltimateMenu/stargazers"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <AnimatedCounter end={stats.stars} />
                <div className="mt-2 text-sm text-muted-foreground">GitHub Stars</div>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:scale-105"
          >
            <a
              href="https://github.com/UltimateMenu/UltimateMenu/forks"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <GitFork className="h-6 w-6 text-primary" />
                </div>
                <AnimatedCounter end={stats.forks} />
                <div className="mt-2 text-sm text-muted-foreground">GitHub Forks</div>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:scale-105"
          >
            <div style={{ display: "none" }}>
              <FreeVisitorCounter
                onLoad={(data: any) => {
                  setTotalViews(data.totalCount)
                  setDashboardUrl(data.dashboardUrl)
                }}
              />
            </div>
            <a
              href={dashboardUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              style={{ pointerEvents: dashboardUrl ? "auto" : "none" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <AnimatedCounter end={totalViews} />
                <div className="mt-2 text-sm text-muted-foreground">Page Views</div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
