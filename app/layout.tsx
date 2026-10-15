import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { RouteTransition } from "@/components/route-transition"
import { DiscordEmbed } from "@/components/discord-embed"
import { Toaster } from "@/components/ui/sonner"
import { DisableRightClick } from "@/components/disable-right-click"
import { HideLinkPreviews } from "@/components/hide-link-previews"
import { ConsoleMessage } from "@/components/console-message"
import "./globals.css"

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ultimatemenu.github.io"),
  title: "UltimateMenu — Unlock the Full Potential of GTA V (206 Options, Free)",
  description:
    "UltimateMenu is the most advanced free Lua script for GTA V. Recovery, Money, Heist Editor, Level Editor + 206 options across YimMenu and Nenyoo. Fast, stable, updated. Download v3.0 free.",
  keywords: ["GTA V", "mod menu", "YimMenu", "Nenyoo", "UltimateMenu", "GTA 5 mods", "Heist Editor", "Recovery"],
  authors: [{ name: "L7NEG", url: "https://github.com/UltimateMenu" }],
  creator: "L7NEG",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ultimatemenu.github.io/",
  },
  openGraph: {
    title: "UltimateMenu",
    description:
      "The most advanced Lua script for GTA V. Recovery, Money, Heist Editor, and more.",
    url: "https://ultimatemenu.github.io",
    siteName: "UltimateMenu",
    images: [
      {
        url: "https://ultimatemenu.github.io/UltimateMenu.png",
        width: 1200,
        height: 630,
        alt: "UltimateMenu interface showcase for GTA V YimMenu script",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UltimateMenu — Unlock the Full Potential of GTA V",
    description: "206 options. Free. Built for YimMenu, Nenyoo & more.",
    images: ["https://ultimatemenu.github.io/UltimateMenu.png"],
  },
}

export const viewport = {
  themeColor: "#22b45e",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=chillax@300,400,500,600,700&display=swap"
        />
        <link rel="preconnect" href="https://ultimatemenu.github.io" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-title" content="UltimateMenu" />
        <meta property="og:site_name" content="UltimateMenu" />
        <meta property="og:image:secure_url" content="https://ultimatemenu.github.io/UltimateMenu.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="UltimateMenu Interface" />
        <meta name="twitter:image:alt" content="UltimateMenu Interface" />
        <meta name="author" content="L7NEG" />
        <meta property="og:image" content="https://ultimatemenu.github.io/UltimateMenu.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="UltimateMenu Interface" />
        <meta name="twitter:image" content="https://ultimatemenu.github.io/UltimateMenu.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "UltimateMenu",
              operatingSystem: "Windows",
              applicationCategory: "GameApplication",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "2314" },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased ${fontMono.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <Header />
          <RouteTransition>{children}</RouteTransition>
          <Toaster theme="dark" position="bottom-center" />
          <DiscordEmbed />
        </ThemeProvider>
        <ConsoleMessage />
        <DisableRightClick />
        <HideLinkPreviews />
      </body>
    </html>
  )
}
