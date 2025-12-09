"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [scrolled])

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${scrolled ? "px-0 pt-0" : "px-6 pt-6 md:px-12 md:pt-8"
                }`}
        >
            <div
                className={`border border-border/40 bg-background/95 backdrop-blur-lg transition-all duration-700 ease-out ${scrolled ? "rounded-none shadow-2xl" : "rounded-full shadow-lg"
                    }`}
            >
                <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                        Ultimate<span className="text-primary animate-text-sweep">Menu</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="sm" className="gap-2 font-semibold hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(115,230,126,0.3)] transition-all">
                            <Link href="/installation">
                                <FileText className="h-4 w-4" />
                                Installation
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" size="sm" className="gap-2 font-semibold hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(115,230,126,0.3)] transition-all">
                            <Link href="/changelog">
                                <FileText className="h-4 w-4" />
                                Changelog
                            </Link>
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
