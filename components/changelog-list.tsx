"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GitCommit, Calendar, User, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
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

    // Show first 1 release by default
    const displayedReleases = showAll ? releases : releases.slice(0, 1)
    const hasMore = releases.length > 1

    return (
        <div className="space-y-8">
            {releases.length === 0 ? (
                <div className="rounded-lg border border-border bg-card p-12 text-center">
                    <p className="text-muted-foreground">
                        No releases found. Check back later or visit our{" "}
                        <a
                            href="https://github.com/UltimateMenu/UltimateMenu/releases"
                            className="text-primary hover:underline"
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
                    <div className="flex justify-end mb-4">
                        {hasMore && (
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="show-old-versions"
                                    checked={showAll}
                                    onCheckedChange={setShowAll}
                                />
                                <label
                                    htmlFor="show-old-versions"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    Show Old Versions
                                </label>
                            </div>
                        )}
                    </div>

                    <AnimatePresence>
                        {displayedReleases.map((release, index) => (
                            <motion.div
                                key={release.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50"
                            >
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <GitCommit className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{release.name || release.tag_name}</h2>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(release.published_at).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                                {release.author && (
                                                    <span className="flex items-center gap-1">
                                                        <User className="h-3 w-3" />
                                                        {release.author.login}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {index === 0 && (
                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                                            Latest
                                        </span>
                                    )}
                                </div>

                                <div className="max-w-none">
                                    {release.body ? (
                                        <MarkdownRenderer content={release.body} />
                                    ) : (
                                        <p className="text-muted-foreground">No release notes available.</p>
                                    )}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Button asChild variant="outline" size="sm">
                                        <a href={release.html_url} target="_blank" rel="noopener noreferrer">
                                            View on GitHub
                                        </a>
                                    </Button>
                                    {release.assets && release.assets.length > 0 && (
                                        <Button asChild size="sm" className="gap-2">
                                            <a href={release.assets[0].browser_download_url} download>
                                                Download {release.tag_name}
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>


                </>
            )}
        </div>
    )
}
