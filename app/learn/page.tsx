import type { Metadata } from "next"
import { ArticleFeed } from "@/components/learn/article-feed"
import { buildPageMetadata } from "@/lib/seo"
import { sanityFetch } from "@/sanity/lib/live"
import { ARTICLES_QUERY } from "@/sanity/lib/queries"
import type { LearnArticleCard } from "@/sanity/lib/types"

export const metadata: Metadata = buildPageMetadata({title:"Learn",description:"Practical guides from Michelle Lawson about AI, building, college, careers, and using the internet well.",path:"/learn",keywords:["practical AI guides","AI for students","Gen Z career advice","college career guides"]})

export default async function LearnPage() {
  const { data } = await sanityFetch({query:ARTICLES_QUERY})
  return <ArticleFeed articles={data as LearnArticleCard[]} />
}
