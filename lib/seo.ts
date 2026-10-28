import type { Metadata } from "next"

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://michellescomputer.com"

export const siteConfig = {
  name: "Michelle’s Computer",
  url: new URL(configuredUrl).origin,
  description: "AI guides, hands-on projects, and creative experiments by Michelle Lawson. Explore Michelle’s Computer, the Girly Guide to AI, magazine, and pen pals.",
  ogImage: "/opengraph-image",
  keywords: ["Michelle Lawson", "Michelle’s Computer", "michellescomputer", "AI education", "The Girly Guide to AI"],
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString()
}

export const personId = absoluteUrl("/#michelle")
export const websiteId = absoluteUrl("/#website")

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: "Michelle Lawson",
  alternateName: ["Michelle’s Computer", "michellescomputer"],
  url: absoluteUrl("/about"),
  image: absoluteUrl("/begin/michelle-photos/michelle-yellow-sweater-portrait.jpeg"),
  jobTitle: "Forward Deployed AI Engineer",
  worksFor: { "@type": "Organization", name: "MongoDB", url: "https://www.mongodb.com/" },
  sameAs: ["https://www.instagram.com/michellescomputer/", "https://github.com/lawsonM525"],
}

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: siteConfig.name,
  url: absoluteUrl(),
  description: siteConfig.description,
  inLanguage: "en-US",
  publisher: { "@id": personId },
}

export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

export function buildPageMetadata(params: {
  title: string
  description: string
  path: string
  keywords?: string[]
  images?: string[]
  robots?: Metadata["robots"]
}): Metadata {
  const images = params.images?.length ? params.images : [siteConfig.ogImage]
  return {
    title: params.title,
    description: params.description,
    keywords: Array.from(new Set([...(params.keywords || []), ...siteConfig.keywords])),
    alternates: { canonical: absoluteUrl(params.path) },
    ...(params.robots ? { robots: params.robots } : {}),
    openGraph: {
      type: "website",
      url: absoluteUrl(params.path),
      title: params.title,
      description: params.description,
      siteName: siteConfig.name,
      images: images.map(image => absoluteUrl(image)),
    },
    twitter: { card: "summary_large_image", title: params.title, description: params.description, images: images.map(image => absoluteUrl(image)) },
  }
}
