import { FeedbackExchange } from "@/components/feedback/feedback-exchange"
import { buildPageMetadata } from "@/lib/seo"
export const metadata = buildPageMetadata({ title: "The feedback exchange", description: "Get fresh eyes on your web app. Give two thoughtful reviews to earn a feedback request, with practical design feedback from other builders.", path: "/feedback", robots: process.env.FEEDBACK_EXCHANGE_OPEN === "true" ? undefined : { index: false, follow: true } })
export default function FeedbackPage() { return <FeedbackExchange /> }
