import React from "react"
import type { Metadata } from "next"
import { buildPageMetadata, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Posts — Michelle Lawson",
  description:
    "Content and posts from @michellextech and @michellexcomputer — AI tutorials, resources, and inspiration.",
  path: "/posts",
  keywords: [
    "Michelle Lawson blog",
    "AI coding tutorials",
    "michellescomputer Instagram",
    "michellexcomputer TikTok",
    "AI education platform",
  ],
})

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Posts", item: absoluteUrl("/posts") },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  )
}
