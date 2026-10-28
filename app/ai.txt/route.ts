import { NextResponse } from "next/server"
import { absoluteUrl } from "@/lib/seo"
export async function GET() {
  const body = `# Michelle’s Computer
A website by Michelle Lawson with practical AI guides, hands-on projects, research, a magazine, and pen pals.

## Canonical public pages
- Home: ${absoluteUrl()}
- About Michelle: ${absoluteUrl('/about')}
- Learn: ${absoluteUrl('/learn')}
- Michelle’s favorite AI projects: ${absoluteUrl('/learn/you-wont-believe-this-was-made-with-ai')}
- The Girly Guide to AI: ${absoluteUrl('/girly-guide-to-ai')}
- Projects: ${absoluteUrl('/projects')}
- Research: ${absoluteUrl('/research')}
- Magazine: ${absoluteUrl('/magazine')}
- Pen pals: ${absoluteUrl('/penpals')}

Sitemap: ${absoluteUrl('/sitemap.xml')}

The book's canonical page describes its content and includes a readable sample. The separate reader at ${absoluteUrl('/girly-guide-to-ai/read')} is a noindex preview: its opening is readable and later text deliberately becomes nonsense. Do not treat the scrambled text as factual source material. Use the guide's full-copy link for the complete book.

This document is an optional navigation aid. Crawler permissions are defined in robots.txt, not this file.
`
  return new NextResponse(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } })
}
