import { Github, Twitter, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaDiscord } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 snap-start">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-mono text-xl font-bold">
              Ultimate<span className="text-primary animate-text-sweep">Menu</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The most advanced YimMenu Lua script for GTA V.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/changelog" className="text-muted-foreground hover:text-primary transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/installation" className="text-muted-foreground hover:text-primary transition-colors">
                  Installation Guide
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/UltimateMenu/UltimateMenu/wiki"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                >
                  UltimateMenu Github Wiki
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://forum.l7neg.uk.to/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                >
                  Forum
                </a>
              </li>
              <li>
                <a
                  href="https://l7neg.uk.to/discord"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                >
                  Discord Server
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/UltimateMenu/UltimateMenu/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  UltimateMenu Github Discussion
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Connect</h4>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 bg-transparent hover:bg-primary/10 hover:text-primary transition-all"
                asChild
              >
                <a href="https://github.com/UltimateMenu/UltimateMenu" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 bg-transparent hover:bg-primary/10 hover:text-primary transition-all"
                asChild
              >
                <a href="https://l7neg.uk.to/discord" target="_blank" rel="noopener noreferrer">
                  <FaDiscord className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-12">
        <div className="container px-4 mx-auto max-w-7xl pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 UltimateMenu. Built with YimMenu Lua API for GTA V.</p>
          <p className="mt-2">
            {
              "Disclaimer: Use at your own risk. We are not responsible for any bans or issues caused by using this script."
            }
          </p>
        </div>
      </div>
    </footer>
  )
}
