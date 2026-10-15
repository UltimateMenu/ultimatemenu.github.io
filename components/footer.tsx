import Link from "next/link"
import { Github } from "lucide-react"
import { FaDiscord } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="um-footer">
      <div className="um-footer-inner">
        <div className="um-footer-grid">
          <div>
            <p className="um-footer-name">
              Ultimate<span style={{ color: "var(--accent-soft)" }}>Menu</span>
            </p>
            <p className="um-footer-tagline">
              The most advanced Lua script for GTA V.
            </p>
          </div>

          <nav aria-label="Resources">
            <p className="um-footer-col-title">Resources</p>
            <ul className="um-footer-links">
              <li>
                <Link href="/features">Features</Link>
              </li>
              <li>
                <Link href="/changelog">Changelog</Link>
              </li>
              <li>
                <Link href="/installation">Installation Guide</Link>
              </li>
              <li>
                <a
                  href="https://github.com/UltimateMenu/UltimateMenu/wiki"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UltimateMenu Github Wiki
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Community">
            <p className="um-footer-col-title">Community</p>
            <ul className="um-footer-links">
              <li>
                <a href="https://l7neg.uk.to/discord" target="_blank" rel="noopener noreferrer">
                <FaDiscord size={14} aria-hidden="true" style={{ marginRight: 8 }} />  Discord Server
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/UltimateMenu/UltimateMenu/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <Github size={14} aria-hidden="true" style={{ marginRight: 8 }} /> UltimateMenu Github Discussion
                </a>
              </li>
            </ul>
          </nav>

        <div className="um-footer-bottom">
          <p>© 2026 UltimateMenu.</p>
          <p>Disclaimer: Use at your own risk. We are not responsible for any bans or issues caused by using this script.</p>
        </div>
      </div>
    </footer>
  )
}
