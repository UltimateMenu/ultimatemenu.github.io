"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function HideLinkPreviews() {
    const router = useRouter()

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const link = (e.target as HTMLElement).closest("a")
            if (!link) return

            // Don't modify if already modified
            if (link.getAttribute("data-href")) return

            const href = link.getAttribute("href")
            if (href) {
                link.setAttribute("data-href", href)
                link.removeAttribute("href")
            }
        }

        const handleMouseOut = (e: MouseEvent) => {
            const link = (e.target as HTMLElement).closest("a")
            if (!link) return

            // We only restore if we are actually leaving the link element, not just moving to a child.
            if (link.contains(e.relatedTarget as Node)) {
                return
            }

            // Restore href if we modified it
            const originalHref = link.getAttribute("data-href")
            if (originalHref) {
                link.setAttribute("href", originalHref)
                link.removeAttribute("data-href")
            }
        }

        const handleClick = (e: MouseEvent) => {
            const link = (e.target as HTMLElement).closest("a")
            if (!link) return

            const url = link.getAttribute("data-href")
            if (!url) return

            e.preventDefault()

            const target = link.getAttribute("target")

            if (target === "_blank") {
                window.open(url, "_blank", "noopener,noreferrer")
            } else {
                // If it looks like an external URL
                if (url.startsWith("http") && !url.includes(window.location.hostname)) {
                    window.location.href = url
                } else {
                    // Internal
                    router.push(url)
                }
            }
        }

        document.addEventListener("mouseover", handleMouseOver)
        document.addEventListener("mouseout", handleMouseOut)
        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("mouseover", handleMouseOver)
            document.removeEventListener("mouseout", handleMouseOut)
            document.removeEventListener("click", handleClick)
        }
    }, [router])

    return null
}
