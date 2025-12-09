"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import type { Components } from "react-markdown"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface MarkdownRendererProps {
    content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

    const components: Components = {
        h1: ({ node, ...props }) => <h1 className="text-[2em] font-semibold mt-6 mb-4 pb-2 border-b border-border" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-[1.5em] font-semibold mt-6 mb-4 pb-2 border-b border-border" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-[1.25em] font-semibold mt-6 mb-4" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-[1em] font-semibold mt-6 mb-4" {...props} />,
        h5: ({ node, ...props }) => <h5 className="text-[0.875em] font-semibold mt-6 mb-4" {...props} />,
        h6: ({ node, ...props }) => <h6 className="text-[0.85em] font-semibold mt-6 mb-4 text-muted-foreground" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc my-4 pl-8" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal my-4 pl-8" {...props} />,
        li: ({ node, ...props }) => <li className="mt-1" {...props} />,
        blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-border pl-4 my-4 text-muted-foreground" {...props} />
        ),
        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        hr: ({ node, ...props }) => <hr className="my-6 border-t border-border" {...props} />,
        a: ({ node, ...props }) => (
            <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
            />
        ),
        img: ({ node, ...props }) => (
            <img
                {...props}
                src={props.src || ""}
                alt={props.alt || ""}
                className="rounded-lg border border-border max-w-full h-auto cursor-pointer hover:opacity-80 transition-opacity my-4"
                onClick={() => setSelectedImage({ src: props.src || "", alt: props.alt || "" })}
            />
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
            return !inline ? (
                <pre className="bg-muted rounded-md p-4 overflow-x-auto my-4 text-[85%]">
                    <code className={className} {...props}>
                        {children}
                    </code>
                </pre>
            ) : (
                <code className="bg-muted px-[0.4em] py-[0.2em] rounded text-[85%] font-mono" {...props}>
                    {children}
                </code>
            )
        },
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

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent showCloseButton={false} className="max-w-[95vw] max-h-[95vh] w-auto h-auto border-border bg-background/95 p-0 backdrop-blur-xl flex items-center justify-center">
                    <DialogTitle className="sr-only">{selectedImage?.alt || "Image Preview"}</DialogTitle>
                    {selectedImage && (
                        <div className="relative flex items-center justify-center">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
