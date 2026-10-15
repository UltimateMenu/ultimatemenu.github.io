/**
 * Site icon placeholder.
 *
 * NEXT FEATURE: drop your real icon art here. Replace the <path>/<text>
 * below with the final <svg> artwork (or an <image>) — every usage
 * (nav, hero, splash, footer) updates automatically since they all
 * render <LogoMark />. Keep the same viewBox + rounded-square frame
 * so layout never shifts.
 */
export function LogoMark({ size = 28, label = "UltimateMenu logo" }: { size?: number; label?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={label}
      style={{ borderRadius: size * 0.28, display: "block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="um-logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#27bd63" />
          <stop offset="100%" stopColor="#0c2f1c" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#um-logo-bg)" />
      <rect x="2" y="2" width="60" height="60" rx="16" fill="none" stroke="#3ddc74" strokeOpacity="0.45" strokeWidth="2" />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="Poppins, Arial, sans-serif"
        fontWeight="700"
        fontSize="34"
        fill="#ffffff"
      >
        U
      </text>
    </svg>
  )
}
