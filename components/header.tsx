"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FaDiscord } from "react-icons/fa"
import { Images, CircleHelp, Wrench, ScrollText } from "lucide-react"
// Icon slot: import { LogoMark } from "@/components/logo-mark" and render
// <LogoMark size={28} /> inside .um-nav-brand once real icon art lands.

const NAV_LINKS = [
  { label: "Showcase", href: "/showcase", icon: Images },
  { label: "FAQ", href: "/faq", icon: CircleHelp },
  { label: "Installation", href: "/installation", icon: Wrench },
  { label: "Changelog", href: "/changelog", icon: ScrollText },
]

const MORE_LINKS = [
  { label: "All Features", href: "/features" },
  { label: "Installation", href: "/installation" },
]

function scrollToHash(href: string) {
  const hash = href.includes("#") ? href.slice(href.indexOf("#")) : null
  if (!hash || hash === "#") return
  setTimeout(() => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, 30)
}

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 640) setOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const handleAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setOpen(false)
      if (!href.startsWith("/#")) return
      if (pathname === "/" || pathname === "") {
        e.preventDefault()
        scrollToHash(href)
        return
      }
      e.preventDefault()
      try {
        sessionStorage.setItem("um-scroll", href.slice(href.indexOf("#")))
      } catch {
        return
      }
      router.push("/")
    },
    [pathname, router]
  )

  return (
    <nav className="um-nav" aria-label="Primary">
      <span key={pathname} className="um-route-bar" aria-hidden="true" />
      <Link
        href="/#top"
        className="um-nav-brand"
        onClick={(e) => handleAnchor(e, "/#top")}
        aria-label="UltimateMenu — home"
      >
        {/* Icon slot: <LogoMark size={28} /> goes here when real icon art lands. */}
        <span className="um-nav-brand-text">
          Ultimate<span className="um-text-sweep">Menu</span>
        </span>
      </Link>

      <div className={`um-nav-menu${open ? " open" : ""}`}>
        <div className="um-nav-links">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`um-nav-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleAnchor(e, l.href)}
              >
                <l.icon size={12} aria-hidden="true" />
                {l.label}
              </Link>
            )
          })}
          {MORE_LINKS.map((l) => {
            const isActive = pathname === l.href
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`um-nav-link um-nav-link-more${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {l.label}
              </Link>
            )
          })}
        </div>
        <a
          className="um-btn-support"
          href="https://l7neg.uk.to/discord"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDiscord size={13} aria-hidden="true" />
          Support
        </a>
      </div>

      <button
        type="button"
        className="um-nav-toggle"
        aria-expanded={open}
        aria-controls="um-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          {open ? (
            <path d="M3 3l9 9M12 3l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M2 4h11M2 7.5h11M2 11h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>
    </nav>
  )
}
