"use client"

import { useEffect } from "react"

/**
 * Console easter egg: logo SVG + gradient text lines (Chrome),
 * per-character gradient fallbacks everywhere else.
 */
export function ConsoleMessage() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const flag = "__ultimatemenu_console_printed__"
    if ((window as unknown as Record<string, unknown>)[flag]) return
    ;(window as unknown as Record<string, unknown>)[flag] = true

    const mono = "Consolas,monaco,monospace"
    const grayBase = `color:#8a8a8a;font-family:${mono};font-weight:bold;`

    function gradGreen(t: number) {
      const stops = [
        [39, 189, 99],
        [201, 247, 214],
        [255, 255, 255],
        [201, 247, 214],
        [39, 189, 99],
      ]
      const seg = Math.min(3, Math.floor(t * 4))
      const f = t * 4 - seg
      const a = stops[seg]
      const b = stops[seg + 1]
      const r = Math.round(a[0] + (b[0] - a[0]) * f)
      const g = Math.round(a[1] + (b[1] - a[1]) * f)
      const bl = Math.round(a[2] + (b[2] - a[2]) * f)
      return `color:rgb(${r},${g},${bl});font-family:${mono};font-weight:bold;`
    }

    function tagline(text: string, hiStart: number, hiEnd: number, loveStart: number) {
      let fmt = ""
      const styles: string[] = []
      for (let i = 0; i < text.length; i++) {
        fmt += "%c" + text[i]
        if (i >= hiStart && i <= hiEnd) {
          styles.push(gradGreen((i - hiStart) / Math.max(1, hiEnd - hiStart)))
        } else if (i >= loveStart) {
          const n = (i - loveStart) / Math.max(1, text.length - 1 - loveStart)
          const l = 1 - Math.abs(2 * n - 1)
          const g = Math.round(60 + 90 * l)
          const b = Math.round(70 + 90 * l)
          styles.push(`color:rgb(255,${g},${b});font-family:${mono};font-weight:bold;`)
        } else {
          styles.push(grayBase)
        }
      }
      return [fmt, styles] as const
    }

    function grayline(text: string, highlight: [number, number] | null) {
      let fmt = ""
      const styles: string[] = []
      for (let i = 0; i < text.length; i++) {
        fmt += "%c" + text[i]
        if (highlight && i >= highlight[0] && i < highlight[1]) {
          const n = (i - highlight[0]) / Math.max(1, highlight[1] - 1 - highlight[0])
          const l = 1 - Math.abs(2 * n - 1)
          const g = Math.round(160 + 60 * l)
          styles.push(`color:rgb(61,220,${g});font-family:${mono};font-weight:bold;`)
        } else {
          styles.push(grayBase)
        }
      }
      return [fmt, styles] as const
    }

    function loadImage(url: string, height: number): Promise<boolean> {
      return new Promise((done) => {
        const show = (dataUrl: string, w: number, h: number) => {
          const hh = height || h
          console.log(
            "%c ",
            `display:inline-block;font-size:0;line-height:0;color:transparent;padding:${hh / 2}px ${((hh * w) / h / 2).toFixed(1)}px;background:url("${dataUrl}") no-repeat;background-size:contain;`
          )
          done(true)
        }
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            const ua = navigator.userAgent || ""
            if (blob.type.indexOf("image") !== 0 || (blob.size > 8192 && (!window.chrome || ua.indexOf("Firefox") > -1))) {
              done(false)
              return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
              const img = new Image()
              img.onload = () => show(reader.result as string, img.naturalWidth || 96, img.naturalHeight || 13)
              img.onerror = () => done(false)
              img.src = reader.result as string
            }
            reader.readAsDataURL(blob)
          })
          .catch(() => done(false))
      })
    }

    const printWordmark = () => {
      // Big-text fallback when the SVG image can't load.
      console.log(
        "%cUltimate%cMenu",
        "color:#ffffff;font-family:Arial,sans-serif;font-style:italic;font-weight:bold;font-size:32px;",
        "color:#3ddc74;font-family:Arial,sans-serif;font-style:italic;font-weight:bold;font-size:32px;"
      )
    }

    const printTagline = () => {
      const [fmt, styles] = tagline("made by UltimateMenu team with love <3", 8, 24, 31)
      console.log(fmt, ...styles)
    }

    const printInvite = () => {
      const text = "got ideas? join us at https://l7neg.uk.to/discord"
      const at = text.indexOf("https://l7neg.uk.to/discord")
      const [fmt, styles] = grayline(text, [at, at + "https://l7neg.uk.to/discord".length])
      console.log(fmt, ...styles)
    }

    const texts = (wordmarkOk: boolean) => {
      if (!wordmarkOk) printWordmark()
      if (window.chrome) {
        const origin = window.location.origin
        loadImage(`${origin}/console/tagline.svg`, 13).then((ok) => {
          if (!ok) printTagline()
          loadImage(`${origin}/console/invite.svg`, 13).then((ok2) => {
            if (!ok2) printInvite()
          })
        })
      } else {
        printTagline()
        printInvite()
      }
    }

    const ua = navigator.userAgent || ""
    if (!window.chrome || ua.indexOf("Firefox") > -1) {
      printWordmark()
      printTagline()
      printInvite()
      return
    }
    let finished = false
    const finish = (ok: boolean) => {
      if (!finished) {
        finished = true
        texts(ok)
      }
    }
    const fallback = setTimeout(() => finish(false), 1500)
    loadImage(`${window.location.origin}/console/wordmark.svg`, 64).then((ok) => {
      clearTimeout(fallback)
      finish(ok)
    })
  }, [])
  return null
}
