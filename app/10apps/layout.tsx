import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "10 Apps — Michelle Lawson",
  description:
    "10 Apps in 10 Weeks — follow Michelle Lawson building Future U and more. Track progress and suggest ideas.",
  path: "/10apps",
  keywords: [
    "10 apps challenge",
    "AI projects portfolio",
    "Future U app",
    "coding projects for beginners",
    "student entrepreneur AI",
  ],
})

export default function TenAppsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "10 Apps", item: absoluteUrl("/10apps") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
