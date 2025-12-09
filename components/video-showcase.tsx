"use client"

import { motion } from "framer-motion"

export function VideoShowcase() {
  return (
    <section className="min-h-screen flex items-center py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-12"
        >
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl animate-text-sweep">
            See It In Action
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch how UltimateMenu transforms your gameplay with its powerful features and intuitive interface.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/c4vbUr7tP_U"
              title="UltimateMenu Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
