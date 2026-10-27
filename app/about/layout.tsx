import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "About — Michelle Lawson",
  description:
    "Meet Michelle Lawson, AI educator, author, and founder of Computer Science Girlies. Explore her work, biography, headshot, and media resources.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
