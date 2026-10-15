import { PageShell } from "@/components/page-shell"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { BookOpen } from "lucide-react"

const sampleMarkdown = `# Documentation

Welcome to the **UltimateMenu** documentation!

## Features

- Vehicle spawner
- Weapon manager
- Teleportation system
- Player customization

## Installation

1. Download the latest release
2. Extract to your scripts folder
3. Load the script in-game

## Code Example

\`\`\`lua
-- Example code
function spawnVehicle(model)
    local vehicle = CreateVehicle(model, x, y, z, heading)
    return vehicle
end
\`\`\`

## Links

Visit our [GitHub Repository](https://github.com/ultimatemenu/ultimatemenu) for more information.

## Tables

| Feature | Status |
|---------|--------|
| Vehicles | ✅ |
| Weapons | ✅ |
| Teleport | ✅ |

---

*Last updated: 2025*
`

export default function DocsPage() {
    return (
        <PageShell
            headingId="docs-heading"
            icon={<BookOpen aria-hidden="true" />}
            title={
                <>
                    <span className="um-title-highlight">Docs</span>
                </>
            }
            sub="Developer notes and reference for UltimateMenu."
        >
            <div className="um-card visible">
                <MarkdownRenderer content={sampleMarkdown} />
            </div>
        </PageShell>
    )
}
