"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, ExternalLink, Download } from "lucide-react"

export type LightboxImage = {
  url: string
  alt: string
  /** When set, the stage plays this video instead of an image. */
  video?: { embed: string; watch: string }
}

const MIN_ZOOM = 1
const MAX_ZOOM = 4

/**
 * Full-screen viewer: zoom (buttons / wheel / double-click / pinch),
 * drag-to-pan and swipe navigation, open-raw and download actions.
 */
export function Lightbox({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: LightboxImage[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const stageRef = useRef<HTMLDivElement>(null)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinchDist = useRef(0)
  const dragLast = useRef<{ x: number; y: number } | null>(null)
  const dragStart = useRef<{ x: number; y: number } | null>(null)

  const cur = images[index]
  const isVideo = Boolean(cur.video)
  const multi = images.length > 1
  // Portal to <body>: escapes ancestor stacking contexts so the viewer
  // always sits above nav, CTA and page content. Guarded for prerender.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [index])

  const go = useCallback(
    (dir: 1 | -1) => onIndex((index + dir + images.length) % images.length),
    [index, images.length, onIndex]
  )

  const zoomBy = useCallback((delta: number) => {
    setZoom((z) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(z + delta).toFixed(2)))
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 })
      return next
    })
  }, [])

  // position:fixed + hidden overflow on html and body holds on touch.
  useEffect(() => {
    const y = window.scrollY
    const html = document.documentElement
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: document.body.style.overflow,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      bodyWidth: document.body.style.width,
    }
    html.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `${-y}px`
    document.body.style.width = "100%"
    return () => {
      html.style.overflow = prev.htmlOverflow
      document.body.style.overflow = prev.bodyOverflow
      document.body.style.position = prev.bodyPosition
      document.body.style.top = prev.bodyTop
      document.body.style.width = prev.bodyWidth
      window.scrollTo(0, y)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
      if (e.key === "+" || e.key === "=") zoomBy(0.5)
      if (e.key === "-") zoomBy(-0.5)
      if (e.key === "0") {
        setZoom(1)
        setPan({ x: 0, y: 0 })
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, onClose, zoomBy])

  // 1 finger: pan when zoomed, swipe to navigate at 1x. 2 fingers: pinch.
  const onPointerDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 1) {
      dragLast.current = { x: e.clientX, y: e.clientY }
      dragStart.current = { x: e.clientX, y: e.clientY }
    }
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinchDist.current = Math.hypot(a.x - b.x, a.y - b.y)
      dragLast.current = null
    }
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      if (pinchDist.current > 0) {
        const ratio = d / pinchDist.current
        if (ratio !== 1) {
          setZoom((z) => {
            const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, +(z * ratio).toFixed(2)))
            if (next === MIN_ZOOM) setPan({ x: 0, y: 0 })
            return next
          })
        }
      }
      pinchDist.current = d
      return
    }
    if (zoom > MIN_ZOOM && dragLast.current) {
      const dx = e.clientX - dragLast.current.x
      const dy = e.clientY - dragLast.current.y
      dragLast.current = { x: e.clientX, y: e.clientY }
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }))
    }
  }
  const endPointer = (e: React.PointerEvent) => {
    const wasSingle = pointers.current.size === 1
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinchDist.current = 0
    if (wasSingle && dragStart.current && zoom === MIN_ZOOM) {
      const dx = e.clientX - dragStart.current.x
      if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1)
    }
    if (pointers.current.size === 0) {
      dragLast.current = null
      dragStart.current = null
    }
  }

  return (
    !mounted ? null : createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cur.alt}
      className="um-lightbox"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="um-lightbox-top">
        <span className="um-lightbox-count" role="status">
          {index + 1} / {images.length}
        </span>
        <div className="um-lightbox-actions">
          {!isVideo && (
            <>
              <button type="button" className="um-lightbox-btn" onClick={() => zoomBy(-0.5)} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out">
                <ZoomOut size={18} aria-hidden="true" />
              </button>
              <button type="button" className="um-lightbox-btn" onClick={() => zoomBy(0.5)} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in">
                <ZoomIn size={18} aria-hidden="true" />
              </button>
            </>
          )}
          <a className="um-lightbox-btn" href={isVideo && cur.video ? cur.video.watch : cur.url} target="_blank" rel="noopener noreferrer" aria-label={isVideo ? "Watch on YouTube" : "Open raw image in new tab"}>
            <ExternalLink size={18} aria-hidden="true" />
          </a>
          {!isVideo && (
            <a className="um-lightbox-btn" href={cur.url} download aria-label="Download image">
              <Download size={18} aria-hidden="true" />
            </a>
          )}
          <button type="button" className="um-lightbox-btn" onClick={onClose} aria-label="Close viewer">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className="um-lightbox-stage"
        style={{
          cursor: !isVideo && zoom > MIN_ZOOM ? "grab" : "default",
          touchAction: isVideo ? "pan-y" : "none",
        }}
        onPointerDown={isVideo ? undefined : onPointerDown}
        onPointerMove={isVideo ? undefined : onPointerMove}
        onPointerUp={isVideo ? undefined : endPointer}
        onPointerCancel={isVideo ? undefined : endPointer}
        onDoubleClick={isVideo ? undefined : () => (zoom > MIN_ZOOM ? (setZoom(1), setPan({ x: 0, y: 0 })) : setZoom(2.5))}
        onWheel={isVideo ? undefined : (e) => zoomBy(e.deltaY < 0 ? 0.35 : -0.35)}
      >
        {isVideo && cur.video ? (
          <iframe
            key={cur.video.embed}
            src={cur.video.embed}
            title={cur.alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="um-lightbox-video"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={cur.url}
            src={cur.url}
            alt={cur.alt}
            draggable={false}
            className="um-lightbox-img"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
          />
        )}
      </div>

      {multi && (
        <>
          <button type="button" className="um-lightbox-side left" onClick={() => go(-1)} aria-label="Previous image">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" className="um-lightbox-side right" onClick={() => go(1)} aria-label="Next image">
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </>
      )}
      <p className="um-lightbox-caption">{cur.alt}</p>
    </div>,
    document.body
    )
  )
}
