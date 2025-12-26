"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Autoplay from "embla-carousel-autoplay"

const screenshots = [
  {
    url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/10.png",
  },
  {
    url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/11.png",
  },
  {
    url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/12.png",
  },
  {
    url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/13.png",
  },
  {
    url: "https://ultimatemenu.github.io/ScreenShots/YimMenu/14.png",
  },
]

export function ScreenshotCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })
  )

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
    } else {
      setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <section className="relative min-h-screen flex items-center bg-background py-20">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance font-mono text-4xl font-bold md:text-5xl animate-text-sweep">
              Interface Showcase
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Below are some screenshots of the latest versions of Ultimate Menu.
            </p>
          </div>

          <div className="relative">
            <Carousel
              setApi={setApi}
              plugins={[plugin.current] as any}
              className="w-full"
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                {screenshots.map((screenshot, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-border bg-muted transition-all hover:border-primary/50"
                      onClick={() => {
                        setCurrentIndex(index)
                        setIsOpen(true)
                      }}
                    >
                      <img
                        src={screenshot.url}
                        alt={screenshot.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-background/90 p-3 text-primary shadow-lg backdrop-blur-sm">
                          <Maximize2 className="h-6 w-6" />
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 border-primary/20 hover:bg-primary/10 hover:text-primary" />
              <CarouselNext className="hidden md:flex -right-12 h-12 w-12 border-primary/20 hover:bg-primary/10 hover:text-primary" />
            </Carousel>
          </div>
        </motion.div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent showCloseButton={false} className="max-w-[95vw] max-h-[95vh] w-auto h-auto border-border bg-background/95 p-0 backdrop-blur-xl flex items-center justify-center">
          <DialogTitle className="sr-only">Screenshot Details</DialogTitle>
          <div className="relative flex items-center justify-center">
            <img
              src={screenshots[currentIndex].url}
              alt={screenshots[currentIndex].alt}
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
        </DialogContent>
      </Dialog>
    </section>
  )
}
