import type { Metadata } from "next"
import { ArticleSubmission } from "@/components/learn/article-submission"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({ title: "Submit an article for Learn", description: "Share an article or draft for review on Michelle’s Computer Learn page.", path: "/learn/submit" })
export default function SubmitArticlePage() { return <ArticleSubmission /> }
