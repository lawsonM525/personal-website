import type { Metadata } from "next"
import { stegaClean } from "@sanity/client/stega"
import { ArticleFeed } from "@/components/learn/article-feed"
import { buildPageMetadata } from "@/lib/seo"
import { sanityFetch } from "@/sanity/lib/live"
import { ARTICLES_QUERY } from "@/sanity/lib/queries"
import type { LearnArticleCard } from "@/sanity/lib/types"
import { findsArticle } from "@/lib/michelles-finds"

export const metadata: Metadata = buildPageMetadata({title:"Learn",description:"Practical guides from Michelle Lawson about AI, building, college, careers, and using the internet well.",path:"/learn",keywords:["practical AI guides","AI for students","Gen Z career advice","college career guides"]})

export default async function LearnPage() {
  const { data } = await sanityFetch({query:ARTICLES_QUERY})
  const articles = [findsArticle, ...((data || []) as LearnArticleCard[]).filter(article => stegaClean(article.slug) !== findsArticle.slug)]
  return <ArticleFeed articles={articles} />
}
