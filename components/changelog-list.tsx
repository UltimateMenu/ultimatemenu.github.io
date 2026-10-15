"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { GitCommit, Calendar, User, ArrowUp, ArrowDown } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"

interface Release {
    id: number
    name: string
    tag_name: string
    published_at: string
    author: {
        login: string
    }
    body: string
    html_url: string
    assets: {
        browser_download_url: string
    }[]
}

interface ChangelogListProps {
    releases: Release[]
}

export function ChangelogList({ releases }: ChangelogListProps) {
    const [showAll, setShowAll] = useState(false)
    const [showTop, setShowTop] = useState(false)
    const [showBottom, setShowBottom] = useState(true)
    const topRef = useRef<HTMLDivElement>(null)

    const displayedReleases = showAll ? releases : releases.slice(0, 1)
    const hasMore = releases.length > 1

    useEffect(() => {
        const onScroll = () => {
            setShowTop(window.scrollY > 600)
            const nearBottom =
                window.innerHeight + window.scrollY >= document.body.scrollHeight - 300
            setShowBottom(!nearBottom)
        }
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
        }
    }, [])

    const toggle = () => {
        const next = !showAll
        setShowAll(next)
        if (next) {
            toast.success("Older changes loaded", {
                description: "Use the down arrow to jump to the end of the list.",
            })
        } else {
            toast("Old versions hidden", {
                description: "Showing the latest release only.",
            })
            setTimeout(() => {
                topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
            }, 150)
        }
    }

    return (
        <div ref={topRef} style={{ scrollMarginTop: 90 }}>
            {releases.length === 0 ? (
                <div className="um-card visible" style={{ textAlign: "center", padding: 48 }}>
                    <p style={{ color: "var(--text-mid)" }}>
                        No releases found. Check back later or visit our{" "}
                        <a
                            href="https://github.com/UltimateMenu/UltimateMenu/releases"
                            style={{ color: "var(--accent-soft)" }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub repository
                        </a>
                        .
                    </p>
                </div>
            ) : (
                <>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                        {hasMore && (
                            <button
                                type="button"
                                className="um-btn-glass"
                                aria-pressed={showAll}
                                onClick={toggle}
                            >
                                {showAll ? "Hide Old Versions" : "Show Old Versions"}
                            </button>
                        )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <AnimatePresence>
                            {displayedReleases.map((release, index) => (
                                <motion.article
                                    key={release.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="um-card visible"
                                >
                                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div className="um-card-icon" style={{ marginBottom: 0 }}>
                                                <GitCommit size={20} aria-hidden="true" />
                                            </div>
                                            <div>
                                                <h2 className="um-card-title" style={{ fontSize: 20 }}>{release.name || release.tag_name}</h2>
                                                <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: "var(--text)" }}>
                                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                                        <Calendar size={12} aria-hidden="true" />
                                                        {new Date(release.published_at).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </span>
                                                    {release.author && (
                                                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                                            <User size={12} aria-hidden="true" />
                                                            {release.author.login}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {index === 0 && (
                                            <span
                                                style={{
                                                    borderRadius: 100, padding: "5px 12px",
                                                    fontSize: 12, fontWeight: 600,
                                                    color: "#3ddc74", border: "1px solid rgba(61,220,116,.4)",
                                                    background: "rgba(61,220,116,.08)",
                                                }}
                                            >
                                                Latest
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        {release.body ? (
                                            <MarkdownRenderer content={release.body} />
                                        ) : (
                                            <p style={{ color: "var(--text)" }}>No release notes available.</p>
                                        )}
                                    </div>

                                    <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 10 }}>
                                        <a href={release.html_url} target="_blank" rel="noopener noreferrer" className="um-btn-glass">
                                            View on GitHub
                                        </a>
                                        {release.assets && release.assets.length > 0 && (
                                            <a href={release.assets[0].browser_download_url} download className="um-btn-primary">
                                                Download {release.tag_name}
                                            </a>
                                        )}
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Floating scroll arrows. */}
                    {(showTop || showBottom) && (
                        <div
                            style={{
                                position: "fixed", right: 20, bottom: 20, zIndex: 90,
                                display: "flex", flexDirection: "column", gap: 10,
                            }}
                        >
                            {showBottom && (
                                <button
                                    type="button"
                                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                                    aria-label="Scroll to bottom"
                                    style={{
                                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                                        width: 48, height: 48, borderRadius: "50%", cursor: "pointer",
                                        color: "#fff", background: "rgba(20,40,28,.85)",
                                        border: "1px solid rgba(61,220,116,.45)",
                                        boxShadow: "0 8px 24px rgba(0,0,0,.5)",
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <ArrowDown size={20} aria-hidden="true" />
                                </button>
                            )}
                            {showTop && (
                                <button
                                    type="button"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    aria-label="Scroll back to top"
                                    style={{
                                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                                        width: 48, height: 48, borderRadius: "50%", cursor: "pointer",
                                        color: "#fff", background: "rgba(20,40,28,.85)",
                                        border: "1px solid rgba(61,220,116,.45)",
                                        boxShadow: "0 8px 24px rgba(0,0,0,.5)",
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <ArrowUp size={20} aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
