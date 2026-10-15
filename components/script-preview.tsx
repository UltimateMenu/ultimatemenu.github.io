"use client"

import { useMemo, useState } from "react"
import { SCRIPT_META, SCRIPT_TABS, type ScriptTab } from "@/lib/script-preview-data"
import { FileCode2, Search, ChevronRight, Copy, Check, MousePointerClick } from "lucide-react"

type Hit = { path: string[]; label: string }

function flatten(tabs: ScriptTab[], path: string[] = []): Hit[] {
  const out: Hit[] = []
  for (const t of tabs) {
    const p = [...path, t.name]
    for (const b of t.buttons) out.push({ path: p, label: b })
    out.push(...flatten(t.children, p))
  }
  return out
}

function Tree({
  tabs,
  depth,
  selected,
  onSelect,
}: {
  tabs: ScriptTab[]
  depth: number
  selected: string | null
  onSelect: (t: ScriptTab) => void
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: depth === 0 ? 0 : "0 0 0 14px" }}>
      {tabs.map((t) => {
        const hasKids = t.children.length > 0
        const isOpen = open[t.id] ?? depth < 1
        const isSel = selected === t.id
        return (
          <li key={t.id} style={{ margin: "2px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {hasKids ? (
                <button
                  type="button"
                  aria-label={isOpen ? `Collapse ${t.name}` : `Expand ${t.name}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpen((o) => ({ ...o, [t.id]: !isOpen }))}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 28, height: 28, borderRadius: 8, border: "none", cursor: "pointer",
                    background: "transparent", color: "var(--text)",
                  }}
                >
                  <ChevronRight
                    size={14}
                    aria-hidden="true"
                    style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s" }}
                  />
                </button>
              ) : (
                <span style={{ width: 28, flexShrink: 0 }} aria-hidden="true" />
              )}
              <button
                type="button"
                onClick={() => onSelect(t)}
                aria-current={isSel || undefined}
                style={{
                  flex: 1, textAlign: "left", cursor: "pointer",
                  border: "1px solid transparent", borderRadius: 10,
                  padding: "7px 10px", fontSize: 13.5, fontWeight: isSel ? 600 : 400,
                  color: isSel ? "#fff" : "var(--text-mid)",
                  background: isSel ? "rgba(39,189,99,.16)" : "transparent",
                  borderColor: isSel ? "rgba(61,220,116,.4)" : "transparent",
                }}
              >
                {t.name}
                <span style={{ opacity: 0.55, fontWeight: 400 }}>
                  {" "}
                  · {t.buttons.length + t.children.reduce((n, c) => n + c.buttons.length, 0)}
                </span>
              </button>
            </div>
            {hasKids && isOpen && (
              <Tree tabs={t.children} depth={depth + 1} selected={selected} onSelect={onSelect} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

function findTab(tabs: ScriptTab[], id: string): ScriptTab | null {
  for (const t of tabs) {
    if (t.id === id) return t
    const f = findTab(t.children, id)
    if (f) return f
  }
  return null
}

export function ScriptPreview() {
  const [selectedId, setSelectedId] = useState<string | null>(SCRIPT_TABS[2]?.id ?? null)
  const [query, setQuery] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const all = useMemo(() => flatten(SCRIPT_TABS), [])
  const hits = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return all.filter((h) => h.label.toLowerCase().includes(q)).slice(0, 60)
  }, [all, query])

  const selected = selectedId ? findTab(SCRIPT_TABS, selectedId) : null

  const copy = async (label: string) => {
    try {
      await navigator.clipboard.writeText(label)
      setCopied(label)
      setTimeout(() => setCopied((c) => (c === label ? null : c)), 1400)
    } catch {
      /* clipboard unavailable */
    }
  }

  const stats: Array<[string, string]> = [
    ["File", SCRIPT_META.file],
    ["Version", `${SCRIPT_META.version} · ${SCRIPT_META.base}`],
    ["Lines", SCRIPT_META.lines.toLocaleString()],
    ["Tabs", String(SCRIPT_META.tabs)],
    ["Buttons", String(SCRIPT_META.buttons)],
  ]

  return (
    <section aria-labelledby="script-preview-heading" style={{ marginBottom: 56 }}>
      <div className="um-card visible" style={{ padding: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div className="um-card-icon" style={{ marginBottom: 0 }}>
            <FileCode2 aria-hidden="true" />
          </div>
          <div>
            <h2 id="script-preview-heading" className="um-card-title" style={{ fontSize: 19 }}>
              Live script preview <span style={{ color: "#3ddc74" }}>· 1.73</span>
            </h2>
            <p className="um-card-desc">
              The real menu tree parsed from the actual .lua file — click any tab, search any
              option, copy its exact in-game label.
            </p>
          </div>
        </div>

        <dl
          style={{
            display: "flex", flexWrap: "wrap", gap: 8, margin: "16px 0 20px",
          }}
        >
          {stats.map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex", gap: 8, alignItems: "baseline",
                fontSize: 12, padding: "6px 12px", borderRadius: 100,
                border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)",
              }}
            >
              <dt style={{ color: "var(--text)", textTransform: "uppercase", letterSpacing: ".08em", fontSize: 10 }}>{k}</dt>
              <dd style={{ color: "var(--text-bright)", fontWeight: 600, margin: 0, fontFamily: k === "File" ? "monospace" : undefined, fontSize: k === "File" ? 11 : 12 }}>{v}</dd>
            </div>
          ))}
        </dl>

        <label
          style={{
            display: "flex", alignItems: "center", gap: 10,
            border: "1px solid rgba(255,255,255,.12)", borderRadius: 12,
            padding: "0 14px", background: "rgba(255,255,255,.04)", marginBottom: 16,
          }}
        >
          <Search size={16} aria-hidden="true" style={{ color: "var(--text)", flexShrink: 0 }} />
          <span className="sr-only">Search script options</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${SCRIPT_META.buttons} options… e.g. “cayo”, “rank”, “ slots”`}
            style={{
              flex: 1, minHeight: 44, background: "transparent", border: "none",
              outline: "none", color: "var(--text-bright)", fontSize: 14,
            }}
          />
        </label>

        {query.trim() ? (
          <div>
            <p style={{ fontSize: 13, color: "var(--text)", marginBottom: 10 }} role="status">
              {hits.length} match{hits.length === 1 ? "" : "es"}
              {hits.length === 60 ? " (showing first 60)" : ""}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {hits.map((h, i) => (
                <li
                  key={`${h.label}-${i}`}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    border: "1px solid rgba(255,255,255,.08)", borderRadius: 12,
                    padding: "9px 12px", background: "rgba(255,255,255,.02)",
                  }}
                >
                  <MousePointerClick size={15} aria-hidden="true" style={{ color: "#3ddc74", flexShrink: 0 }} />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 14, color: "var(--text-bright)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {h.label}
                    </span>
                    <span style={{ display: "block", fontSize: 11.5, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {h.path.join(" › ")}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => copy(h.label)}
                    aria-label={`Copy: ${h.label}`}
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      minWidth: 36, minHeight: 36, borderRadius: 9, cursor: "pointer",
                      color: copied === h.label ? "#3ddc74" : "var(--text)",
                      background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
                    }}
                  >
                    {copied === h.label ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  </button>
                </li>
              ))}
              {hits.length === 0 && (
                <li style={{ fontSize: 14, color: "var(--text)", padding: "12px 4px" }}>
                  No option matches “{query.trim()}”. Try “heist”, “unlock” or “cash”.
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div className="um-script-cols">
            <nav aria-label="Script tabs" className="um-script-tree">
              <Tree tabs={SCRIPT_TABS} depth={0} selected={selectedId} onSelect={(t) => setSelectedId(t.id)} />
            </nav>
            <div className="um-script-options">
              {selected ? (
                <>
                  <p style={{ fontSize: 12, color: "var(--text)", marginBottom: 4 }}>
                    {selected.name} · line {selected.line}
                  </p>
                  <h3 style={{ fontFamily: "'Chillax','Poppins',sans-serif", fontSize: 17, color: "var(--text-bright)", marginBottom: 12 }}>
                    {selected.buttons.length} option{selected.buttons.length === 1 ? "" : "s"}
                    {selected.children.length > 0 && (
                      <span style={{ color: "var(--text)", fontWeight: 400, fontSize: 13 }}>
                        {" "}· {selected.children.length} sub-tab{selected.children.length === 1 ? "" : "s"} — expand the tree →
                      </span>
                    )}
                  </h3>
                  {selected.buttons.length === 0 ? (
                    <p style={{ fontSize: 14, color: "var(--text)" }}>
                      No direct buttons here — everything lives in its sub-tabs. Expand the tree on
                      the left.
                    </p>
                  ) : (
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {selected.buttons.map((b) => (
                        <li
                          key={b}
                          style={{
                            display: "flex", alignItems: "center", gap: 10,
                            border: "1px solid rgba(255,255,255,.08)", borderRadius: 12,
                            padding: "9px 12px", background: "rgba(255,255,255,.02)",
                          }}
                        >
                          <MousePointerClick size={15} aria-hidden="true" style={{ color: "#3ddc74", flexShrink: 0 }} />
                          <span style={{ flex: 1, fontSize: 14, color: "var(--text-bright)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {b}
                          </span>
                          <button
                            type="button"
                            onClick={() => copy(b)}
                            aria-label={`Copy: ${b}`}
                            style={{
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                              minWidth: 36, minHeight: 36, borderRadius: 9, cursor: "pointer",
                              color: copied === b ? "#3ddc74" : "var(--text)",
                              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
                            }}
                          >
                            {copied === b ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p style={{ fontSize: 14, color: "var(--text)" }}>Pick a tab on the left.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
