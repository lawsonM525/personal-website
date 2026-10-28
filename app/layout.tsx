import type { Metadata } from "next"
import "./globals.css"
import "./computer.css"
import "./interaction.css"
import { LayoutClient } from "./layout-client"
import favicon from "@/assets/mia-icon-big.png"
import Script from 'next/script';
import { siteConfig, personStructuredData, websiteStructuredData, serializeStructuredData } from "@/lib/seo"
import { Inter, Playfair_Display, Caveat } from "next/font/google"
import { draftMode } from "next/headers"
import { VisualEditing } from "next-sanity/visual-editing"
import { SanityLive } from "@/sanity/lib/live"
import { SiteAnalytics } from "@/components/site-analytics"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  preload: false,
  variable: "--font-serif",
})
const caveat = Caveat({
  subsets: ["latin"],
  preload: false,
  variable: "--font-handwriting",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Michelle’s Computer | Michelle Lawson",
    template: "%s | Michelle’s Computer",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "Michelle’s Computer | Michelle Lawson",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michelle’s Computer | Michelle Lawson",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${caveat.variable}`}>
      <head>
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-JDSM0Q7X0G"
            />
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-JDSM0Q7X0G');
              `}
            </Script>
            <Script
              id="datafast-queue"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{ __html: "window.datafast=window.datafast||function(){window.datafast.q=window.datafast.q||[];window.datafast.q.push(arguments)}" }}
            />
            <Script
              defer
              src="https://datafa.st/js/script.js"
              strategy="afterInteractive"
              data-website-id="dfid_gnPpnmddrlFsxJ4e9ZBvm"
              data-domain="michellescomputer.com"
            />
          </>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(personStructuredData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(websiteStructuredData) }} />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <LayoutClient>{children}</LayoutClient>
        <SiteAnalytics />
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
