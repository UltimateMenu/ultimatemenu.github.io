"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

/**
 * Every route change remounts this wrapper (keyed by pathname),
 * replaying a soft fade-rise so page navigations feel smooth
 * instead of snapping. Header/nav live outside it and stay put.
 */
export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="um-route">
      {children}
    </div>
  )
}
