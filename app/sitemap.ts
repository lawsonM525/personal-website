import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"
import { sanityClient } from "@/sanity/lib/client"
import { SITEMAP_ARTICLES_QUERY } from "@/sanity/lib/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const routes = [
    "/",
    "/about",
    "/learn",
    "/projects",
    "/research",
    "/talks",
    "/posts",
    "/resources",
    "/reminder",
    "/10apps",
    "/day2tools",
  ]

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }))

  try {
    const articles = await sanityClient.fetch<{ slug: string; lastModified?: string }[]>(SITEMAP_ARTICLES_QUERY)
    return [
      ...staticRoutes,
      ...articles.map((article) => ({
        url: absoluteUrl(`/learn/${article.slug}`),
        lastModified: article.lastModified ? new Date(article.lastModified) : lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ]
  } catch {
    return staticRoutes
  }
}
