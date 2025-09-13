import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Projects — Michelle Lawson",
  description:
    "AI projects portfolio — Future U, ML, research, sentiment analysis, and more by Michelle Lawson.",
  path: "/projects",
  keywords: [
    "AI projects portfolio",
    "coding side projects",
    "GitHub projects showcase",
    "AI agent project",
    "Future U app",
    "Sprite Sheet Generator",
    "building AI from scratch",
  ],
})

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
