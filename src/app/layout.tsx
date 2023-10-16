import "@/styles/globals.css"

import * as React from "react"
import type { Metadata } from "next"
import { env } from "@/env.mjs"
import { Toaster } from "sonner"

import { fontInter, fontJetBrainsMono, fontSpaceGrotesk } from "@/config/fonts"
import { siteConfig } from "@/config/site"
import { AuthProvider } from "@/providers/auth-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["SaaS", "Next.js", "Template"],
  authors: [
    {
      name: "pjborowiecki",
      url: "https://github.com/pjborowiecki",
    },
  ],
  creator: "pjborowiecki",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    // images: [`${siteConfig.url}/og.jpg`],
    creator: "@pjborowiecki",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontInter.variable,
          fontSpaceGrotesk.variable,
          fontJetBrainsMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
          <TailwindIndicator />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
