import type { Metadata } from "next"
import "./globals.css"
import { LayoutClient } from "./layout-client"
import favicon from "@/assets/mia-icon-big.png"
import Script from 'next/script';
import { siteConfig } from "@/lib/seo"
import { Inter, Playfair_Display, Caveat } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Michelle Lawson — AI Educator & Computer Science",
    template: "%s | Michelle Lawson",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "Michelle Lawson — AI Educator & Computer Science",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michelle Lawson — AI Educator & Computer Science",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@michellextech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: favicon.src,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${caveat.variable}`}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JDSM0Q7X0G"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());

            gtag('config', 'G-JDSM0Q7X0G');
          `}
        </Script>
        <Script
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
          data-website-id="68b655f869db4035eb9dde6a"
          data-domain="michellelawson.me"
        />
        {/* JSON-LD: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Michelle Lawson",
              alternateName: [
                "michellescomputer",
                "@michellescomputer",
                "@michellexcomputer"
              ],
              jobTitle: ["AI Educator", "Computer Science Student"],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Smith College"
              },
              url: siteConfig.url,
              sameAs: [
                "https://www.linkedin.com/in/michelle-o-lawson/",
                "https://twitter.com/michellextech",
                "https://www.instagram.com/michellexcomputer/",
                "https://www.tiktok.com/@michellexcomputer",
                "https://github.com/lawsonm525",
                siteConfig.url
              ]
            })
          }}
        />
        {/* JSON-LD: Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Website",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Person",
                name: "Michelle Lawson"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
