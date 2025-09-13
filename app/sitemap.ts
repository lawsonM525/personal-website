import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const routes = [
    "/",
    "/about",
    "/projects",
    "/research",
    "/talks",
    "/posts",
    "/resources",
    "/reminder",
    "/10apps",
    "/day2tools",
  ]

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }))
}
