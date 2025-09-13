import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Talks — Michelle Lawson",
  description:
    "Talks and speaking — inspiring Gen Z coders, women in tech, AI education, and career journeys.",
  path: "/talks",
  keywords: [
    "women in tech educator",
    "inspiring Gen Z coders",
    "conference speaker",
    "AI education platform",
    "motivational computer science educator",
  ],
})

export default function TalksLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Talks", item: absoluteUrl("/talks") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
