import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"
import { sanityClient } from "@/sanity/lib/client"
import { SITEMAP_ARTICLES_QUERY, SITEMAP_AUTHORS_QUERY } from "@/sanity/lib/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "/",
    "/magazine",
    "/penpals",
    "/about",
    "/learn",
    "/learn/you-wont-believe-this-was-made-with-ai",
    "/girly-guide-to-ai",
    "/explore",
    "/projects",
    ...(process.env.FEEDBACK_EXCHANGE_OPEN === "true" ? ["/feedback"] : []),
    "/projects/rag-in-practice",
    "/projects/delta-stock-pitch",
    "/research",
    "/talks",
    "/posts",
    "/reminder",
    "/10apps",
    "/day2tools",
  ]

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }))

  try {
    const [articles, authors] = await Promise.all([
      sanityClient.fetch<{ slug: string; lastModified?: string }[]>(SITEMAP_ARTICLES_QUERY),
      sanityClient.fetch<{ slug: string; lastModified?: string }[]>(SITEMAP_AUTHORS_QUERY),
    ])
    return [
      ...staticRoutes,
      ...articles.map((article) => ({
        url: absoluteUrl(`/learn/${article.slug}`),
        ...(article.lastModified && !Number.isNaN(Date.parse(article.lastModified)) ? { lastModified: new Date(article.lastModified) } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...authors.map(author => ({ url: absoluteUrl(`/learn/authors/${author.slug}`), ...(author.lastModified && !Number.isNaN(Date.parse(author.lastModified)) ? { lastModified: new Date(author.lastModified) } : {}), changeFrequency: "monthly" as const, priority: 0.6 })),
    ]
  } catch {
    return staticRoutes
  }
}
