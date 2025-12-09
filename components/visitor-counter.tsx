"use client"

import { useEffect, useState } from "react"

export function VisitorCounter() {
    const [count, setCount] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Get or initialize visitor count
        const getCount = () => {
            if (typeof window === 'undefined') return 0

            const stored = localStorage.getItem('site-visitor-count')
            const currentCount = stored ? parseInt(stored) : 0

            // Increment count
            const newCount = currentCount + 1
            localStorage.setItem('site-visitor-count', newCount.toString())

            return newCount
        }

        const visitorCount = getCount()
        setCount(visitorCount)
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return <span className="inline-block w-20 h-10 bg-muted/50 animate-pulse rounded" />
    }

    return <>{count.toLocaleString()}</>
}
