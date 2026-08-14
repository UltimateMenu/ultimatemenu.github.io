import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const installationContent = `# 1. Make sure **BattlEye** is disabled in the Rockstar Games Launcher settings.
![Screenshot 2024-09-22 174711](https://github.com/user-attachments/assets/ec1b9eb3-113f-4031-b1a7-6d38dad63c69)

# 2. Input the command \`\`-nobattleye\`\` in \`\`commandline.txt\`\` located in your game directory EPIC GAMES/STEAM etc..
![Screenshot 2024-09-22 174643](https://github.com/user-attachments/assets/068df41e-fdda-4cbf-baf4-eb3e638709d1)

# 3. Start The Command Line Prompt as **Administrator** and simply enter **sc delete BEService** to remove BattleEye service completely.
![Screenshot 2024-09-22 172051](https://github.com/user-attachments/assets/a92342fc-4d71-455e-b8ce-feb8eac57a0b)

# 4. Let the game load to the main menu. Do not load story or online mode.

> [!NOTE]  
> # If auto-loading into story or online mode is enabled, disable it in the game settings.
> # After disabling auto-loading, restart the game

# 5. Once the game is at the main menu, inject the **YimMenu** using **[Extreme Injector](https://github.com/master131/ExtremeInjector)** / **[Fate Injector](https://github.com/fligger/FateInjector)** /  **[Xenos](https://github.com/DarthTon/Xenos)** or **[Process Hacker](https://github.com/PKRoma/ProcessHacker)**.
![Screenshot 2024-09-24 080321](https://github.com/user-attachments/assets/1209d715-053c-4ef4-b0f3-6a5f6c8eedc4)

# 6. AFTER THE DLL IS INJECTED SELECT TO GO TO STORY MODE FIRST

# 7. Once you are in the story mode open **YIM menu**, select **Network** and join **invite only sessions**

# 8. FOLLOW THE STEPS CORRECTLY AND CHECK OUT THE IMAGES FOR YOUR REFERENCE

# 9. Use Either **[Ultimate Menu For YimMenu](https://github.com/UltimateMenu/UltimateMenu/)** or **[Silent Night Yim Lua (Discontinued)](https://silent-night.pp.ua)** or **[Any Money Method Script From github.com/YimMenu-Lua](https://github.com/YimMenu-Lua)**

# 10. Done Enjoy 🫡 🤍 

# Tutorial Source Credits: [here](https://www.unknowncheats.me/forum/grand-theft-auto-v/662823-bypass-battle-eye-anti-cheat-gtav.html)

# More Tutorials For Money And Unlocks Are Available in #tutorials Channel On L7NEG Community Discord Server [Join Now](https://l7neg.uk.to/discord)
`

export default function InstallationPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container px-4 py-12">
        <Button variant="ghost" className="mb-8 gap-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-balance font-mono text-5xl font-bold animate-text-sweep">
            Installation <span className="text-primary">Guide</span>
          </h1>
          <p className="mb-12 text-balance text-xl text-muted-foreground leading-relaxed">
            Follow these steps to install and configure UltimateMenu for GTA V
          </p>

          {/* Directly use ReactMarkdown instead of the problematic component */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {installationContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
