import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

// ... (same content as above)

export default function InstallationPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Extract all image URLs from the content
  const imageUrls = installationContent.match(/!\[.*?\]\((.*?)\)/g)?.map(match => {
    const urlMatch = match.match(/\((.*?)\)/)
    return urlMatch ? urlMatch[1] : null
  }).filter(Boolean) || []

  // Convert to the format expected by the lightbox
  const slides = imageUrls.map(url => ({ src: url }))

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container px-4 py-12">
        <Button variant="ghost" className="mb-8 gap-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-balance font-mono text-5xl font-bold animate-text-sweep">
            Installation <span className="text-primary">Guide</span>
          </h1>
          <p className="mb-12 text-balance text-xl text-muted-foreground leading-relaxed">
            Follow these steps to install and configure UltimateMenu for GTA V
          </p>

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ src, alt }) => {
                  const index = imageUrls.indexOf(src)
                  return (
                    <div className="relative group">
                      <img 
                        src={src} 
                        alt={alt} 
                        className="rounded-lg my-4 border border-border cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openLightbox(index)}
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to enlarge
                      </div>
                    </div>
                  )
                },
                blockquote: ({ children }) => {
                  const childrenStr = String(children)
                  if (childrenStr.includes('[!NOTE]')) {
                    return (
                      <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 my-4 rounded-r-lg">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-500 text-xl">ℹ️</span>
                          <div className="text-blue-300">
                            {childrenStr.replace('[!NOTE]', '').trim()}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return (
                    <blockquote className="border-l-4 border-primary pl-4 my-4 bg-secondary/50 p-4 rounded-r-lg">
                      {children}
                    </blockquote>
                  )
                }
              }}
            >
              {installationContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      
      {/* Modern Lightbox with Zoom and Thumbnails */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={currentImageIndex}
        plugins={[Zoom, Thumbnails]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
        }}
      />
      
      <Footer />
    </main>
  )
}
