import type { Metadata } from "next"
import { stegaClean } from "@sanity/client/stega"
import { ArticleFeed } from "@/components/learn/article-feed"
import { buildPageMetadata } from "@/lib/seo"
import { sanityFetch } from "@/sanity/lib/live"
import { ARTICLES_QUERY } from "@/sanity/lib/queries"
import type { LearnArticleCard } from "@/sanity/lib/types"
import { findsArticle } from "@/lib/michelles-finds"

export const metadata: Metadata = buildPageMetadata({title:"Learn — AI guides and creative projects",description:"Practical AI guides, creative projects, and ideas from Michelle’s Computer, with Michelle Lawson and guest writers.",path:"/learn",keywords:["practical AI guides","AI for beginners","creative AI projects"]})

export default async function LearnPage() {
  const { data } = await sanityFetch({query:ARTICLES_QUERY})
  const articles = [findsArticle, ...((data || []) as LearnArticleCard[]).filter(article => stegaClean(article.slug) !== findsArticle.slug)]
  return <ArticleFeed articles={articles} />
}
