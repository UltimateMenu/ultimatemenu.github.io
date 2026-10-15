import type { Metadata } from "next"
import { PageShell } from "@/components/page-shell"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "Installation Guide — UltimateMenu v3.0",
  description: "Follow these steps to install and configure UltimateMenu for GTA V.",
  alternates: { canonical: "https://ultimatemenu.github.io/installation" },
}

const installationContent = `# 1. Make sure **BattlEye** is disabled in the Rockstar Games Launcher settings.
<img width="1084" alt="Screenshot 2024-09-22 174711" src="https://github.com/user-attachments/assets/ec1b9eb3-113f-4031-b1a7-6d38dad63c69" />

# 2. Input the command [B]-nobattleye[/B] in 'commandline.txt' located in your game directory EPIC GAMES/STEAM etc..
<img width="1271" alt="Screenshot 2024-09-22 174643" src="https://github.com/user-attachments/assets/068df41e-fdda-4cbf-baf4-eb3e638709d1" />

# 3. Start The Command Line Prompt as **Administrator** and simply enter **sc delete BEService** to remove BattleEye service completely.
<img width="673" alt="Screenshot 2024-09-22 172051" src="https://github.com/user-attachments/assets/a92342fc-4d71-455e-b8ce-feb8eac57a0b" />

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
    <PageShell
      headingId="installation-heading"
      icon={<Wrench aria-hidden="true" />}
      title={
        <>
          Installation <span className="um-title-highlight">Guide</span>
        </>
      }
      sub="Follow these steps to install and configure UltimateMenu for GTA V."
    >
      <div className="um-card visible">
        <MarkdownRenderer content={installationContent} />
      </div>
    </PageShell>
  )
}
