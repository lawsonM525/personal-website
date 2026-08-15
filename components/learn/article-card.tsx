import Link from "next/link"
import { ArrowUpRight, Clock3 } from "lucide-react"
import { stegaClean } from "@sanity/client/stega"
import { categoryLabels, type LearnArticleCard, readingTime } from "@/sanity/lib/types"

export function ArticleCard({ article }: { article: LearnArticleCard }) {
  const category = stegaClean(article.category)
  const slug = stegaClean(article.slug)
  const publishedAt = stegaClean(article.publishedAt)

  return (
    <article className="learn-border group grid gap-5 border-b-2 py-8 md:grid-cols-[150px_minmax(0,1fr)_48px] md:items-start">
      <div className="text-xs font-black uppercase tracking-[.15em]">
        <p>{categoryLabels[category] || article.category}</p>
        <p className="learn-muted mt-2 inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {readingTime(article.estimatedWords)} min</p>
      </div>
      <div>
        <h3 className="font-serif text-3xl leading-[1.02] tracking-[-.035em] sm:text-4xl">
          <Link href={`/learn/${slug}`} className="decoration-3 underline-offset-5 group-hover:underline">{article.title}</Link>
        </h3>
        <p className="learn-muted mt-3 max-w-2xl leading-7">{article.dek}</p>
        <time dateTime={publishedAt} className="learn-muted mt-4 block text-sm">
          {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(publishedAt))}
        </time>
      </div>
      <ArrowUpRight aria-hidden="true" className="hidden h-7 w-7 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:block" />
    </article>
  )
}
