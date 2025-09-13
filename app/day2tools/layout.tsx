import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Day 2 Tools — Michelle Lawson",
  description:
    "Tools used to ship apps fast — AI tools for students and developers, from editors to models and APIs.",
  path: "/day2tools",
  keywords: [
    "AI tools for students",
    "developer tools",
    "Gen Z career tools",
    "AI study tools",
  ],
})

export default function Day2ToolsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Day 2 Tools", item: absoluteUrl("/day2tools") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
