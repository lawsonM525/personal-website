import { SlideDeck } from "@/components/slides/slide-deck"
import { beautifulWomanDeckPath, beautifulWomanDeckTitle } from "@/lib/beautiful-woman-slides"
import { buildPageMetadata, absoluteUrl, personId, serializeStructuredData } from "@/lib/seo"

export const metadata = buildPageMetadata({
  title: `${beautifulWomanDeckTitle} — The Beautiful Woman`,
  description: "A beginner-friendly session with Michelle Lawson: what AI can help you make and learn, what to be careful about, and keeping faith, values, and judgment at the center. Shareable slides for The Beautiful Woman.",
  path: beautifulWomanDeckPath,
  images: [`${beautifulWomanDeckPath}/opengraph-image`],
})

export default function BeautifulWomanSlidesPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData({
      "@context": "https://schema.org", "@type": "PresentationDigitalDocument",
      name: `${beautifulWomanDeckTitle} — The Beautiful Woman`,
      description: "Nineteen slides on AI possibilities, practical cautions, faith, and judgment.",
      author: { "@id": personId }, inLanguage: "en", url: absoluteUrl(beautifulWomanDeckPath),
    }) }} />
    <SlideDeck />
  </>
}
