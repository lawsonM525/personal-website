import Link from "next/link"
import { ArrowLeft, Clock3 } from "@/components/retro-icons"
import { LearnThemeToggle } from "./learn-theme"

type ArticleHeaderProps = {
  category: string
  title: string
  description: string
  authorName: string
  publishedAt: string
  readingMinutes: number
}

export function ArticleHeader({ category, title, description, authorName, publishedAt, readingMinutes }: ArticleHeaderProps) {
  return <header className="learn-border border-b-2 px-5 py-10 sm:px-8 sm:py-16">
    <div className="mx-auto max-w-3xl">
      <div className="article-reading-tools"><LearnThemeToggle /></div>
      <Link href="/learn" className="mb-9 inline-flex items-center gap-2 text-sm font-bold decoration-2 underline-offset-4 hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to Learn</Link>
      <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[.17em]"><span className="learn-contrast px-3 py-1.5">{category}</span><span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" aria-hidden="true" />{readingMinutes} min read</span></div>
      <h1 className="mt-7 max-w-5xl font-serif text-[clamp(2rem,4.7vw,3.7rem)] leading-[.88] tracking-[-.055em]">{title}</h1>
      <p className="learn-muted mt-8 max-w-3xl text-lg font-normal leading-8 sm:text-xl sm:leading-8">{description}</p>
      <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"><span className="font-black">By {authorName}</span><span aria-hidden="true">•</span><time dateTime={publishedAt}>{new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(publishedAt))}</time></div>
    </div>
  </header>
}
