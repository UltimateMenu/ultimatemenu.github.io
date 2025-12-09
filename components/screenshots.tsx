"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Maximize2 } from "lucide-react"

const screenshots = [
  {
    url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/1.png",
  },
  {
    url: "https://ultimatemenu.github.io/ScreenShots/ModestMenu/2.png",
  },
  {
    url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/3.png",
  },
  {
    url: "https://ultimatemenu.github.io/ScreenShots/ModestMenu/4.png",
  },
  {
    url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/5.png",
  },
  {
    url: "https://ultimatemenu.github.io/ScreenShots/ModestMenu/6.png",
  },
]

export function Screenshots() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleImageClick = (url: string) => {
    const index = screenshots.findIndex(s => s.url === url)
    setCurrentIndex(index)
    setSelectedImage(url)
  }

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      const newIndex = currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1
      setCurrentIndex(newIndex)
      setSelectedImage(screenshots[newIndex].url)
    } else {
      const newIndex = currentIndex === screenshots.length - 1 ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
      setSelectedImage(screenshots[newIndex].url)
    }
  }

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
          <h2 className="mb-4 text-balance font-mono text-4xl font-bold md:text-5xl animate-text-sweep">
            Gallery (Old Versions ScreenShots)
          </h2>
          <p className="text-lg text-muted-foreground">
            A closer look at How Ultimate Menu works.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((screenshot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-border bg-muted"
              onClick={() => handleImageClick(screenshot.url)}
            >
              <img
                src={screenshot.url}
                alt={screenshot.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-full bg-background/90 p-3 text-primary shadow-lg backdrop-blur-sm">
                  <Maximize2 className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent showCloseButton={false} className="max-w-[95vw] max-h-[95vh] w-auto h-auto border-border bg-background/95 p-0 backdrop-blur-xl flex items-center justify-center">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          {selectedImage && (
            <div className="relative flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Gallery preview"
                className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
              />

              <Button
                size="icon"
                variant="ghost"
                className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate("prev")
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate("next")
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
