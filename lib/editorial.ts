export function authorPath(author?: { name?: string; slug?: string }): string | undefined {
  if (!author?.name || author.name === "Michelle Lawson") return "/about"
  return author.slug ? `/learn/authors/${encodeURIComponent(author.slug)}` : undefined
}

export function articleDate(date: string, style: "short" | "long" = "long"): string {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: style === "short" ? "short" : "long", day: "numeric", timeZone: "America/Los_Angeles" }).format(new Date(date))
}

const searchTitleUpdates: Record<string, { previous: string; title: string }> = {
  "ai-alignment-and-ai-safety": { previous: "AI Alignment and AI Safety: The need to be cautious with AI", title: "AI Alignment and AI Safety: Why They Matter" },
  "digital-conquest-ai-cybersecurity": { previous: "Digital Conquest: What If AI Doesn't Need to Conquer Us Physically?", title: "AI Cybersecurity and Digital Dependence" },
}

export function articleSearchTitle(slug: string, title: string, seoTitle?: string): string {
  const update = searchTitleUpdates[slug]
  // Improve these legacy titles while respecting any subsequent Studio edit.
  return update && (!seoTitle || seoTitle === update.previous) ? update.title : seoTitle || title
}
