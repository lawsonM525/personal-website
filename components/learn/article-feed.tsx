"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo, useState } from "react"
import { ArrowUpRight, Search } from "@/components/retro-icons"
import { stegaClean } from "@sanity/client/stega"
import { categoryLabels, readingTime, type LearnArticleCard } from "@/sanity/lib/types"
import { LearnThemeToggle } from "./learn-theme"
import styles from "./article-feed.module.css"
import { articleDate, authorPath } from "@/lib/editorial"

type LibraryEntry = {
  id: string
  title: string
  dek: string
  category: string
  topics: string[]
  href: string
  image?: string
  imageAlt: string
  article?: LearnArticleCard
}

const guideEntry: LibraryEntry = {
  id: "girly-guide-to-ai",
  title: "The Girly Guide to AI",
  dek: "267 illustrated pages, 12 chapters, and your first AI project.",
  category: "ai",
  topics: ["book", "artificial intelligence", "beginner", "guide"],
  href: "/girly-guide-to-ai",
  image: "/books/girly-guide-to-ai/illustrations/art-d4df0c3d2d14ec99.webp",
  imageAlt: "Mia and her robot friend Mai wave hello, from The Girly Guide to AI.",
}

export function ArticleFeed({ articles }: { articles: LearnArticleCard[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const entries = useMemo(() => {
    const items: LibraryEntry[] = articles.map(article => ({
      id: article._id,
      title: article.title,
      dek: article.dek,
      category: stegaClean(article.category),
      topics: article.topics || [],
      href: `/learn/${stegaClean(article.slug)}`,
      image: article.coverImageUrl ? stegaClean(article.coverImageUrl) : undefined,
      imageAlt: article.coverImageAlt || "",
      article,
    }))
    items.splice(Math.min(1, items.length), 0, guideEntry)
    return items
  }, [articles])
  const categories = Array.from(new Set(entries.map(entry => entry.category)))
  const filtered = useMemo(() => entries.filter(entry =>
    (category === "all" || entry.category === category) &&
    stegaClean(`${entry.title} ${entry.dek} ${entry.topics.join(" ")} ${entry.article?.author?.name || ""}`).toLowerCase().includes(query.trim().toLowerCase())
  ), [entries, query, category])
  const isBrowsing = !query.trim() && category === "all"

  return <main className={`learn-bg ${styles.library}`}>
    <header className={styles.header}>
      <div className={styles.heading}><p className={styles.eyebrow}>Michelle’s Computer</p><h1>Learn</h1></div>
      <div className={styles.topics} role="group" aria-label="Article topics">
        <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>All</button>
        {categories.map(topic => <button key={topic} type="button" aria-pressed={category === topic} onClick={() => setCategory(topic)}>{categoryLabels[topic] || topic}</button>)}
      </div>
      <label className={styles.search}><Search size={18} aria-hidden="true"/><span className="sr-only">Search articles</span><input type="search" placeholder="Search articles…" value={query} onChange={event => setQuery(event.target.value)} /></label>
    </header>

    <div className={styles.columns}>
      <section aria-label="Articles" className={styles.feed}>
        <div aria-live="polite" aria-atomic="true" className="sr-only">{!isBrowsing && `${filtered.length} ${filtered.length === 1 ? "result" : "results"}`}</div>
        {filtered.map((entry, index) => {
          const featured = isBrowsing && index === 0 && !!entry.article
          const date = entry.article ? stegaClean(entry.article.publishedAt) : undefined
          return <article className={`${styles.entry}${featured ? ` ${styles.featured}` : ""}${!entry.article ? ` ${styles.guideEntry}` : ""}${!entry.image ? ` ${styles.textOnly}` : ""}`} key={entry.id}>
            {entry.image && <Link className={styles.image} href={entry.href} aria-label={`Read ${stegaClean(entry.title)}`}><Image src={entry.image} alt={entry.imageAlt} width={featured ? 1280 : 480} height={featured ? 720 : 320} priority={featured} unoptimized={false} sizes={featured ? "(max-width: 850px) 90vw, (max-width: 1440px) 65vw, 940px" : "(max-width: 540px) 104px, (max-width: 850px) 30vw, 300px"} /></Link>}
            <div className={styles.copy}>
              <p className={styles.eyebrow}>{categoryLabels[entry.category] || entry.category}{featured && <span>Latest</span>}</p>
              <h2><Link href={entry.href}>{entry.title}</Link></h2>
              <p className={styles.dek}>{entry.dek}</p>
              {entry.article && date && <p className={styles.byline}><span>{authorPath(entry.article.author) ? <Link href={authorPath(entry.article.author)!}>{entry.article.author?.name || "Michelle Lawson"}</Link> : entry.article.author?.name}</span><span aria-hidden="true">·</span><time dateTime={date}>{articleDate(date,"short")}</time><span aria-hidden="true">·</span><span>{readingTime(entry.article.estimatedWords)} min read</span></p>}
              <Link className={styles.read} href={entry.href}>{entry.article ? "Read article" : "Read preview"} <ArrowUpRight size={16} aria-hidden="true"/></Link>
            </div>
          </article>
        })}
        {!filtered.length && <div className={styles.empty}><p>No articles match your search.</p><button type="button" onClick={() => {setQuery("");setCategory("all")}}>Show everything</button></div>}
        <footer className={styles.tools}><Link href="/learn/submit" className={styles.read}>Submit an article <ArrowUpRight size={15} aria-hidden="true" /></Link><LearnThemeToggle /></footer>
      </section>

      <aside className={styles.aside} aria-label="More from Michelle">
        <section className={styles.book}>
          <p className={styles.eyebrow}>My book</p>
          <h2><Link href="/girly-guide-to-ai">The Girly Guide to AI</Link></h2>
          <Link href="/girly-guide-to-ai" className={styles.bookCover} aria-label="Preview The Girly Guide to AI"><Image src="/books/girly-guide-to-ai/cover.webp" alt="The Girly Guide to Artificial Intelligence book cover" width={1025} height={1600} unoptimized={false} sizes="160px" /></Link>
          <p className={styles.asideDescription}>{guideEntry.dek}</p>
          <Link href="/girly-guide-to-ai" className={styles.read}>Read preview <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </section>
        <section className={styles.magazine}>
          <p className={styles.eyebrow}>Michelle’s Computer</p>
          <h2><Link href="/magazine">The magazine</Link></h2>
          <Link href="/magazine" className={styles.magazineArt} aria-label="Discover the magazine"><span aria-hidden="true" /></Link>
          <p className={styles.asideDescription}>An artsy magazine about AI and learning—with comics, diary entries, and handwritten pages.</p>
          <Link href="/magazine" className={styles.read}>Join the waitlist <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </section>
      </aside>
    </div>
  </main>
}
