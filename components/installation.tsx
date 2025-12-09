import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileCode, FolderOpen, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: Download,
    title: "Download YimMenu",
    description: "Get the latest version of YimMenu from the official repository",
  },
  {
    icon: FolderOpen,
    title: "Install YimMenu",
    description: "Extract and install YimMenu to your GTA V directory",
  },
  {
    icon: FileCode,
    title: "Add UltimateMenu Script",
    description: "Place the UltimateMenu.lua file in your YimMenu scripts folder",
  },
  {
    icon: CheckCircle2,
    title: "Launch & Enjoy",
    description: "Start GTA V and activate the script from YimMenu",
  },
]

export function Installation() {
  return (
    <section className="border-t border-border bg-secondary/30 py-24">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Quick <span className="text-primary">Installation</span>
          </h2>
          <p className="text-balance text-lg text-muted-foreground">
            Get up and running in minutes with our simple installation process.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden border-border bg-card p-6">
                <div className="absolute -right-4 -top-4 text-8xl font-bold text-primary/5">{index + 1}</div>
                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-primary/20 bg-primary/5 p-8">
            <div className="text-center">
              <h3 className="mb-4 text-2xl font-bold">Ready to get started?</h3>
              <p className="mb-6 text-muted-foreground">
                Download UltimateMenu now and experience GTA V like never before.
              </p>
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Download UltimateMenu v2.5.0
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">Compatible with latest GTA V and YimMenu versions</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
