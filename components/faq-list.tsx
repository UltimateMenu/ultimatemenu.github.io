"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const FAQS = [
  {
    q: "Is it safe?",
    a: "UltimateMenu is an open-source YimMenu Lua script — anyone can audit the code on GitHub. That said, no mod menu is risk-free: Rockstar can ban accounts that mod GTA Online. Reduce risk by using a secondary account, playing in invite-only sessions, disabling BattlEye for story/invite use per the guide, and never paying anyone for this free script. Use at your own risk — see the footer disclaimer.",
  },
  {
    q: "How do I install it?",
    a: "Quick path: 1) Disable BattlEye in the Rockstar Launcher and remove the BEService if needed, 2) Install YimMenu and inject it at the main menu (story mode first), 3) Drop UltimateMenu.lua into YimMenu's scripts folder, 4) Join an invite-only session via YimMenu Network tab. Full step-by-step with screenshots: open the Installation Guide in the nav.",
  },
  {
    q: "Does it work with YimMenu / Nenyoo / latest GTA V?",
    a: "Yes — UltimateMenu ships builds for YimMenu Legacy and Nenyoo (Legacy build 3889 and Enhanced build 1158.13, with matching offsets selected automatically). YimMenu Enhanced (V2) support is waiting on the YimMenuV2 Lua API. If Rockstar pushes an update, wait for the patched release (check Changelog and Discord) rather than forcing an old build.",
  },
  {
    q: "Is it really free? What's the catch?",
    a: "Free forever, no key system. The code is open on GitHub. The only 'catch': you need a PC copy of GTA V plus a supported base (YimMenu or Nenyoo), and support happens in Discord/GitHub Discussions, not via DMs.",
  },
]

export function FaqList({ defaultOpen = 0 }: { defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="um-faq-list">
      {FAQS.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className={`um-faq-item${isOpen ? " open" : ""}`}>
            <button
              type="button"
              className="um-faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              {f.q}
              <Plus size={20} className="um-faq-icon" aria-hidden="true" />
            </button>
            {isOpen && <p className="um-faq-a">{f.a}</p>}
          </div>
        )
      })}
    </div>
  )
}
