"use client"

import { SectionHead } from "@/components/section-head"
import { Zap, Shield, Code, Cpu, Palette, Rocket, Sparkles } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized performance with minimal impact on game FPS. Experience smooth gameplay without compromises.",
  },
  {
    icon: Shield,
    title: "Secure & Stable",
    description: "Built with security in mind. Regular updates and rigorous testing ensure reliability.",
  },
  {
    icon: Code,
    title: "YimMenu API",
    description: "Leverages the full power of YimMenu Lua API for maximum compatibility and features.",
  },
  {
    icon: Cpu,
    title: "Advanced Options",
    description: "206 options including Level Editor, Heist Editor, Money Options and Recovery Options.",
  },
  {
    icon: Palette,
    title: "YimMenu's Customizable UI",
    description: "Fully customizable interface with multiple themes and layouts to match your style.",
  },
  {
    icon: Rocket,
    title: "Regular Updates",
    description: "Continuous development with new features, improvements, and bug fixes released frequently.",
  },
]

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="um-section">
      <SectionHead
        id="features-heading"
        icon={<Sparkles aria-hidden="true" />}
        title={
          <>
            Why choose <span className="um-title-highlight">UltimateMenu?</span>
          </>
        }
        sub="Experience the next generation of GTA V modding with our cutting-edge features."
      />

      <div className="um-grid">
        {features.map((f) => (
          <article key={f.title} className="um-card">
            <div className="um-card-icon">
              <f.icon aria-hidden="true" />
            </div>
            <h3 className="um-card-title">{f.title}</h3>
            <p className="um-card-desc">{f.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
