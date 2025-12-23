import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Analytics } from "@vercel/analytics/next"
import { DisableRightClick } from "@/components/disable-right-click"
import { HideLinkPreviews } from "@/components/hide-link-previews"
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
  metadataBase: new URL('https://ultimatemenu.github.io'),
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
        url: "https://ultimatemenu.github.io/UltimateMenu.png",
        width: 1200,
        height: 630,
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
    images: ["https://ultimatemenu.github.io/UltimateMenu.png"],
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
      <head>
        {/* Additional meta tags for better embed support */}
        <meta property="og:image" content="https://ultimatemenu.github.io/UltimateMenu.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="UltimateMenu Interface" />
        <meta name="twitter:image" content="https://ultimatemenu.github.io/UltimateMenu.png" />
        <meta name="theme-color" content="#00FF00" />
      </head>
      <body className={`font-sans antialiased ${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
        <Analytics />

        <DisableRightClick />
        <HideLinkPreviews />
      </body>
    </html>
  )
}