import { FeedbackExchange } from "@/components/feedback/feedback-exchange"
import { buildPageMetadata } from "@/lib/seo"
export const metadata = buildPageMetadata({ title: "The feedback exchange", description: "Get fresh eyes on your web app. The first ten projects can submit for free. Then give three thoughtful reviews to earn a feedback request.", path: "/feedback", robots: process.env.FEEDBACK_EXCHANGE_OPEN === "true" ? undefined : { index: false, follow: true } })
export default function FeedbackPage() { return <FeedbackExchange /> }
