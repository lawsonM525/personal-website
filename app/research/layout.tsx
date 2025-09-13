import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Research — Michelle Lawson",
  description:
    "Undergraduate research in computer science education — The Justification Effect and ASEE publication.",
  path: "/research",
  keywords: [
    "undergraduate research in CS",
    "computer science education",
    "JMCQ",
    "American Society for Engineering Education",
    "The Justification Effect",
  ],
})

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Research", item: absoluteUrl("/research") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
