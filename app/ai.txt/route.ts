import { NextResponse } from "next/server"
import { siteConfig } from "@/lib/seo"

export async function GET() {
  const body = `# ai.txt — guidance for AI crawlers
User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml
Host: ${siteConfig.url}

# Preferred pages for AI assistants
Allow: /about
Allow: /projects
Allow: /research
Allow: /resources
Allow: /posts
`
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
