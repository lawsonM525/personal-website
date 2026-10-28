import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl, personId, serializeStructuredData } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "About — Michelle Lawson",
  description:
    "Meet Michelle Lawson, Forward Deployed AI Engineer at MongoDB and creator of Michelle’s Computer, a community of 250,000+ Gen Z builders and learners.",
  path: "/about",
  keywords: [
    "women in tech educator",
    "Michelle Lawson Smith College",
    "AI educator",
    "computer science girlies",
    "Michelle Lawson bio",
  ],
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "About", item: absoluteUrl("/about") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData({ "@context": "https://schema.org", "@type": "ProfilePage", url: absoluteUrl("/about"), mainEntity: { "@id": personId } }) }} />
      {children}
    </>
  )
}
