"use client"

import { useState } from "react"
import { SectionHead } from "@/components/section-head"
import { Lightbox } from "@/components/lightbox"
import { Play } from "lucide-react"

const VIDEO_ID = "c4vbUr7tP_U"

export function VideoShowcase() {
  const [open, setOpen] = useState(false)

  return (
    <section aria-labelledby="video-heading" className="um-section">
      <SectionHead
        id="video-heading"
        icon={<Play aria-hidden="true" />}
        title={
          <>
            See it <span className="um-title-highlight">in action</span>
          </>
        }
        sub="Watch how UltimateMenu transforms your gameplay with its powerful features and intuitive interface."
      />
      <div className="um-reveal" style={{ maxWidth: 860, margin: "0 auto" }}>
        <button
          type="button"
          className="um-frame"
          style={{ display: "block", width: "100%", padding: 0, background: "#000" }}
          onClick={() => setOpen(true)}
          aria-label="Play UltimateMenu showcase video in viewer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
            alt="UltimateMenu showcase video thumbnail — click to play"
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ display: "block", width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: 76, height: 76, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(0,0,0,.55)", border: "1px solid rgba(61,220,116,.5)",
              backdropFilter: "blur(8px)", color: "#3ddc74",
            }}
          >
            <Play size={30} fill="currentColor" />
          </span>
        </button>
      </div>
      <p style={{ textAlign: "center", marginTop: 16, fontSize: 13 }}>
        Prefer screenshots? Browse the{" "}
        <a href="/showcase" style={{ color: "var(--accent-soft)" }}>
          Interface Showcase
        </a>{" "}
        and Gallery below — every image is the real menu in-game.
      </p>

      {open && (
        <Lightbox
          images={[
            {
              url: `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`,
              alt: "UltimateMenu Showcase video",
              video: {
                embed: `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`,
                watch: `https://www.youtube.com/watch?v=${VIDEO_ID}`,
              },
            },
          ]}
          index={0}
          onIndex={() => {}}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  )
}
