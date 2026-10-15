import type { ReactNode } from "react"

export function SectionHead({
  icon,
  title,
  sub,
  id,
}: {
  icon: ReactNode
  title: ReactNode
  sub: string
  id: string
}) {
  return (
    <header className="um-section-head">
      <div className="um-section-badge" aria-hidden="true">
        {icon}
      </div>
      <h2 id={id} className="um-section-title">
        {title}
      </h2>
      <p className="um-section-sub">{sub}</p>
    </header>
  )
}
