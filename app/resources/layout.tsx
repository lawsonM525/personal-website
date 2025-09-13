import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Resources — Michelle Lawson",
  description:
    "AI and computer science resources for students — textbooks, tutorials, tools, and productivity guides.",
  path: "/resources",
  keywords: [
    "CS education resources",
    "AI resources for students",
    "Python tutorials for Gen Z",
    "coding resources for students",
    "AI tools for students",
  ],
})

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Resources", item: absoluteUrl("/resources") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
