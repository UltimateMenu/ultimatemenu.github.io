"use client"

import { Card } from "@/components/ui/card"
import { Zap, Shield, Code, Cpu, Palette, Rocket } from "lucide-react"
import { motion } from "framer-motion"

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
    description: "Over 67+ features including Level Editor, Heist Editor, Money Options and Recovery Options.",
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
    <section className="min-h-screen flex items-center py-12 md:py-24 snap-start">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-8 md:mb-16"
        >
          <h2 className="mb-3 md:mb-4 text-balance text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight animate-text-sweep">
            Why Choose UltimateMenu?
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Experience the next generation of GTA V modding with our cutting-edge features.
          </p>
        </motion.div>

        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)] hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
