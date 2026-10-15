"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/**
 * Hides link destinations (no hover preview anywhere).
 * Exempts downloads, # anchors and keyboard focus so those keep working.
 */
export function HideLinkPreviews() {
    const router = useRouter()

    useEffect(() => {
        const stealable = (link: HTMLAnchorElement): string | null => {
            const href = link.getAttribute("href")
            if (!href || link.hasAttribute("data-href")) return null
            if (link.hasAttribute("download")) return null
            if (href.startsWith("#")) return null
            if (href.includes("#")) return null
            if (href.startsWith("/") || /^https?:\/\//i.test(href)) return href
            return null
        }

        const steal = (link: HTMLAnchorElement) => {
            const href = stealable(link)
            if (!href) return
            link.setAttribute("data-href", href)
            link.removeAttribute("href")
        }

        const restore = (link: HTMLAnchorElement) => {
            const original = link.getAttribute("data-href")
            if (!original) return
            link.setAttribute("href", original)
            link.removeAttribute("data-href")
        }

        const isExternal = (url: string) =>
            /^https?:\/\//i.test(url) && !url.includes(window.location.hostname)

        const handleMouseOver = (e: MouseEvent) => {
            const link = (e.target as HTMLElement).closest("a")
            if (link) steal(link)
        }

        const handleMouseOut = (e: MouseEvent) => {
            const link = (e.target as HTMLElement).closest("a")
            if (!link) return
            if (link.contains(e.relatedTarget as Node)) return
            restore(link)
        }

        const handleClick = (e: MouseEvent) => {
            const link = (e.target as HTMLElement).closest("a")
            if (!link) return
            const url = link.getAttribute("data-href")
            if (!url) return
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
                restore(link)
                return
            }
            if (e.defaultPrevented) return
            e.preventDefault()
            if (isExternal(url)) {
                if (link.getAttribute("target") === "_blank") {
                    window.open(url, "_blank", "noopener,noreferrer")
                } else {
                    window.location.href = url
                }
            } else {
                router.push(url)
            }
        }

        const handleFocusIn = (e: FocusEvent) => {
            const link = (e.target as HTMLElement).closest?.("a")
            if (link) restore(link)
        }

        document.addEventListener("mouseover", handleMouseOver)
        document.addEventListener("mouseout", handleMouseOut)
        document.addEventListener("click", handleClick)
        document.addEventListener("focusin", handleFocusIn)

        return () => {
            document.removeEventListener("mouseover", handleMouseOver)
            document.removeEventListener("mouseout", handleMouseOut)
            document.removeEventListener("click", handleClick)
            document.removeEventListener("focusin", handleFocusIn)
        }
    }, [router])

    return null
}
