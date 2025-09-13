import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "About — Michelle Lawson",
  description:
    "About Michelle Lawson — AI educator and Smith College CS student. Founder of Computer Science Girlies. Bio, headshot, and media resources.",
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
