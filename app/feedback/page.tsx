import { FeedbackExchange } from "@/components/feedback/feedback-exchange"
import { absoluteUrl, buildPageMetadata } from "@/lib/seo"

const image = absoluteUrl("/feedback/feedback-exchange-social-v1.png")
const imageAlt = "Feedback exchange — Good projects need fresh eyes. Submit your project on Michelle’s Computer."
const pageMetadata = buildPageMetadata({ title: "The feedback exchange", description: "Make your ideas real. Get feedback and help someone make their project better. Share your build on Michelle’s Computer.", path: "/feedback", images: [image], robots: process.env.FEEDBACK_EXCHANGE_OPEN === "true" ? undefined : { index: false, follow: true } })
export const metadata = {
  ...pageMetadata,
  openGraph: { ...pageMetadata.openGraph, images: [{ url: image, width: 1200, height: 630, type: "image/png", alt: imageAlt }] },
  twitter: { ...pageMetadata.twitter, images: [{ url: image, alt: imageAlt }] },
}
export default function FeedbackPage() { return <FeedbackExchange /> }
