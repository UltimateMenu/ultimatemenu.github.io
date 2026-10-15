"use client"

import { useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import type { Components } from "react-markdown"
import { Lightbox, type LightboxImage } from "@/components/lightbox"

interface MarkdownRendererProps {
    content: string
}

/** Collect every image in the markdown so they open in the full viewer. */
function extractImages(content: string): LightboxImage[] {
    const out: LightboxImage[] = []
    const seen = new Set<string>()
    const push = (url: string, alt: string) => {
        if (!url || seen.has(url)) return
        seen.add(url)
        out.push({ url, alt: alt || "Content image" })
    }
    for (const m of content.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
        push(m[2], m[1])
    }
    for (const tag of content.matchAll(/<img[^>]*>/gi)) {
        const src = tag[0].match(/src=["']([^"']+)["']/i)?.[1] ?? ""
        const alt = tag[0].match(/alt=["']([^"']*)["']/i)?.[1] ?? ""
        push(src, alt)
    }
    return out
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const [lightbox, setLightbox] = useState<number | null>(null)
    const images = useMemo(() => extractImages(content), [content])

    const openAt = (src: string) => {
        const i = images.findIndex((img) => img.url === src)
        setLightbox(i === -1 ? 0 : i)
    }

    const components: Components = {
        h1: ({ node, ...props }) => <h1 style={{ fontFamily: "'Chillax','Poppins',sans-serif", fontSize: "1.7em", fontWeight: 600, color: "var(--text-bright)", margin: "1.2em 0 .6em" }} {...props} />,
        h2: ({ node, ...props }) => <h2 style={{ fontFamily: "'Chillax','Poppins',sans-serif", fontSize: "1.4em", fontWeight: 600, color: "var(--text-bright)", margin: "1.2em 0 .6em" }} {...props} />,
        h3: ({ node, ...props }) => <h3 style={{ fontSize: "1.2em", fontWeight: 600, color: "var(--text-bright)", margin: "1em 0 .5em" }} {...props} />,
        h4: ({ node, ...props }) => <h4 style={{ fontSize: "1em", fontWeight: 600, color: "var(--text-bright)", margin: "1em 0 .5em" }} {...props} />,
        h5: ({ node, ...props }) => <h5 style={{ fontSize: ".9em", fontWeight: 600, color: "var(--text-mid)", margin: "1em 0 .5em" }} {...props} />,
        h6: ({ node, ...props }) => <h6 style={{ fontSize: ".85em", fontWeight: 600, color: "var(--text)", margin: "1em 0 .5em" }} {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" style={{ color: "var(--text-mid)" }} {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc my-4 pl-8" style={{ color: "var(--text-mid)" }} {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal my-4 pl-8" style={{ color: "var(--text-mid)" }} {...props} />,
        li: ({ node, ...props }) => <li className="mt-1" {...props} />,
        blockquote: ({ node, ...props }) => (
            <blockquote style={{ borderLeft: "3px solid #3ddc74", paddingLeft: 16, margin: "1em 0", color: "var(--text-mid)" }} {...props} />
        ),
        strong: ({ node, ...props }) => <strong className="font-semibold" style={{ color: "var(--text-bright)" }} {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        hr: ({ node, ...props }) => <hr className="my-6 border-t border-border" {...props} />,
        a: ({ node, ...props }) => (
            <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent-soft)" }}
            />
        ),
        img: ({ node, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                {...props}
                src={props.src || ""}
                alt={props.alt || ""}
                className="rounded-lg border border-border max-w-full h-auto cursor-zoom-in hover:opacity-80 transition-opacity my-4"
                onClick={() => openAt(props.src || "")}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        openAt(props.src || "")
                    }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Open viewer: ${props.alt || "content image"}`}
            />
        ),
        code: ({ node, className, children, ...props }: any) => {
            return (
                <code className="bg-muted px-[0.4em] py-[0.2em] rounded text-[85%] font-mono" {...props}>
                    {children}
                </code>
            )
        },
        // Fenced blocks arrive as <pre><code> — style the wrapper here so
        // inline <code> never renders a block-level <pre> inside a <p>.
        pre: ({ node, ...props }: any) => (
            <pre className="bg-muted rounded-md p-4 overflow-x-auto my-4 text-[85%]" {...props} />
        ),
        table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse" {...props} />
            </div>
        ),
        thead: ({ node, ...props }) => (
            <thead className="bg-muted" {...props} />
        ),
        tbody: ({ node, ...props }) => (
            <tbody {...props} />
        ),
        tr: ({ node, ...props }) => (
            <tr className="border-b border-border" {...props} />
        ),
        th: ({ node, ...props }) => (
            <th className="px-3 py-2 text-left font-semibold border border-border" {...props} />
        ),
        td: ({ node, ...props }) => (
            <td className="px-3 py-2 border border-border" {...props} />
        ),
    }

    return (
        <>
            <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={components}
                >
                    {content}
                </ReactMarkdown>
            </div>

            {lightbox !== null && images.length > 0 && (
                <Lightbox
                    images={images}
                    index={Math.min(lightbox, images.length - 1)}
                    onIndex={setLightbox}
                    onClose={() => setLightbox(null)}
                />
            )}
        </>
    )
}
