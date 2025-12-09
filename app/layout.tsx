import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "UltimateMenu - The Best GTA V Mod Menu Script",
  description: "Experience the ultimate GTA V modding with UltimateMenu. Features include Recovery, Money, Heist Editor, and more.",
  keywords: ["GTA V", "mod menu", "YimMenu", "UltimateMenu", "GTA 5 mods", "game mods"],
  authors: [{ name: "L7NEG" }],
  themeColor: "#00FF00",
  openGraph: {
    title: "UltimateMenu - The Best GTA V Mod Menu Script",
    description: "Experience the ultimate GTA V modding with UltimateMenu. Features include Recovery, Money, Heist Editor, and more.",
    url: "https://ultimatemenu.github.io",
    siteName: "UltimateMenu",
    images: [
      {
        url: "/UltimateMenu.png",
        alt: "UltimateMenu Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UltimateMenu - The Best GTA V Mod Menu Script",
    description: "Experience the ultimate GTA V modding with UltimateMenu. Features include Recovery, Money, Heist Editor, and more.",
    images: ["/UltimateMenu.png"],
  },
  other: {
    "theme-color": "#00FF00",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', (e) => {
                if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
