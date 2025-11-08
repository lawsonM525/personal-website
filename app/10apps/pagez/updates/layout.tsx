import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Pagez — Updates — Michelle Lawson",
  description:
    "Progress updates for Pagez, a cross‑platform journaling app with AI insights and a knowledge graph. Built with Expo, Clerk, and Convex; exploring Neo4j for interactive graphs.",
  path: "/10apps/pagez/updates",
  keywords: [
    "Pagez app",
    "journaling app",
    "knowledge graph journal",
    "Expo React Native",
    "Clerk auth",
    "Convex backend",
    "Neo4j graph database",
    "AI journaling insights",
  ],
})

export default function PagezUpdatesLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "10 Apps", item: absoluteUrl("/10apps") },
      { "@type": "ListItem", position: 3, name: "Pagez", item: absoluteUrl("/10apps") },
      { "@type": "ListItem", position: 4, name: "Updates", item: absoluteUrl("/10apps/pagez/updates") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
