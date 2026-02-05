import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { generateSEO, generateStructuredData } from "@/lib/seo"
import "./globals.css"
import Script from "next/script"
import { Footer } from "@/components/footer"

export const metadata: Metadata = generateSEO({
  title: "Kasam Bhusal | Curious Technologist & AI Learner",
  description:
    "Kasam Bhusal is a curious technologist and learner exploring AI, software, and human-centered technology. Personal portfolio, projects, and journey.",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generateStructuredData("person", {})

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Essential Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* PWA & Theme */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="color-scheme" content="light dark" />

        {/* Viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RQC1KM7T9G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RQC1KM7T9G', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Suspense fallback={null}>
              <Navbar />
              <main className="pt-20">{children}</main>
              <Toaster />
              <Footer/>
            </Suspense>
          </AuthProvider>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
