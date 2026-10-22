"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowUpRight, Search } from "lucide-react"
import { stegaClean } from "@sanity/client/stega"
import { categoryLabels, readingTime, type LearnArticleCard } from "@/sanity/lib/types"
import { LearnThemeToggle } from "./learn-theme"

export function ArticleFeed({ articles }: { articles: LearnArticleCard[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const categories = Array.from(new Set(articles.map(article => stegaClean(article.category))))
  const filtered = useMemo(() => articles.filter(article => (category === "all" || stegaClean(article.category) === category) && `${stegaClean(article.title)} ${stegaClean(article.dek)} ${(article.topics || []).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())), [articles, query, category])

  return <main className="learn-bg article-library">
    <header className="article-library-heading"><div><p className="article-eyebrow">Michelle’s Computer</p><h1>Learn</h1><p>Practical guides for using AI, building projects, and navigating college and your career.</p></div><img src="/homepage/learn-icon-v3.webp" alt="" width="132" height="132" /><LearnThemeToggle /></header>
    <div className="article-library-grid"><section aria-label="Articles">
      <div className="article-feed-tools"><h2>Articles <span>{articles.length}</span></h2><label className="article-search"><Search size={16} aria-hidden="true"/><span className="sr-only">Search articles</span><input type="search" placeholder="Search articles…" value={query} onChange={event => setQuery(event.target.value)} /></label></div>
      {categories.length > 1 && <div className="article-topics" aria-label="Article topics"><button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>All</button>{categories.map(topic => <button key={topic} type="button" aria-pressed={category === topic} onClick={() => setCategory(topic)}>{categoryLabels[topic] || topic}</button>)}</div>}
      <div className="article-feed" aria-live="polite">{filtered.map((article, index) => {
        const slug = stegaClean(article.slug), topic = stegaClean(article.category), date = stegaClean(article.publishedAt)
        return <article className="article-feed-card" key={article._id}><div><p className="article-eyebrow">{categoryLabels[topic] || topic}{index === 0 && !query && category === "all" && <span>Latest</span>}</p><h2><Link href={`/learn/${slug}`}>{article.title}</Link></h2><p className="article-dek">{article.dek}</p><p className="article-byline"><span>{article.author?.name || "Michelle Lawson"}</span><span aria-hidden="true">·</span><time dateTime={date}>{new Intl.DateTimeFormat("en-US", {month:"short",day:"numeric",year:"numeric"}).format(new Date(date))}</time><span aria-hidden="true">·</span><span>{readingTime(article.estimatedWords)} min read</span></p><Link className="article-read" href={`/learn/${slug}`}>Read article <ArrowUpRight size={15} aria-hidden="true"/></Link></div>{article.coverImageUrl && <Link className="article-thumbnail" href={`/learn/${slug}`} aria-label={`Read ${stegaClean(article.title)}`}><img src={stegaClean(article.coverImageUrl)} alt={article.coverImageAlt || ""} width="480" height="320" /></Link>}</article>
      })}{!filtered.length && <div className="article-empty"><p>{articles.length ? "No articles match your search." : "The first guide is almost ready."}</p>{articles.length > 0 && <button type="button" onClick={() => {setQuery("");setCategory("all")}}>Show all articles</button>}</div>}</div>
    </section><aside className="article-library-aside"><div className="article-magazine"><div className="article-magazine-art" aria-hidden="true"/><p className="article-eyebrow">Michelle’s Computer</p><h2>The magazine</h2><p>An artsy magazine about AI and learning—with comics, diary entries, and handwritten pages.</p><Link href="/magazine">Join the waitlist <ArrowUpRight size={15} aria-hidden="true"/></Link></div></aside></div>
  </main>
}
