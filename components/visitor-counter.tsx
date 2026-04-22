"use client"

import { useEffect, useState } from "react"

export function VisitorCounter() {
    const [count, setCount] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch("https://ghvc.vercel.app/api?username=ultimatemenu&format=json")
                if (!response.ok) throw new Error('API Error')
                const data = await response.json()
                setCount(data.value)
            } catch (error) {
                console.error('Counter Fetch Error:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCount()
    }, [])

    if (isLoading) {
        return <span className="inline-block w-20 h-10 bg-muted/50 animate-pulse rounded" />
    }

    return <>{count.toLocaleString()}</>
}
