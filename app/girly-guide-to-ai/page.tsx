import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowUpRight, BookOpen } from "@/components/retro-icons"
import { GuideCover } from "@/components/books/guide-cover"
import { GuideLegacyLink } from "@/components/books/guide-legacy-link"
import { aiGuidePath, aiGuideReaderPath, aiGuidePurchaseUrl } from "@/lib/ai-guide"
import { getAiGuide } from "@/lib/ai-guide.server"
import { absoluteUrl, buildPageMetadata, personId, serializeStructuredData } from "@/lib/seo"
import styles from "@/components/books/guide.module.css"

export const metadata = buildPageMetadata({ title: "The Girly Guide to Artificial Intelligence", description: "An illustrated introduction to AI by Michelle Lawson: 267 pages, 12 chapters, and your first AI project. Meet Mia and Mai and read a free sample.", path: aiGuidePath, images: ["/books/girly-guide-to-ai/cover.webp"], keywords: ["AI book for beginners", "illustrated artificial intelligence guide", "The Girly Guide to AI"] })

const questions = [
  { question: "Is The Girly Guide to AI for beginners?", answer: "The guide starts with what artificial intelligence is, then introduces machine learning, neural networks, computer vision, language models, and the tools used to build AI projects. Mia and Mai explain the ideas through examples, illustrations, and exercises." },
  { question: "What can I read for free?", answer: "The online reader includes a readable opening. From section 1.3, Narrow, General and Superintelligence, the preview gradually becomes scrambled. The full guide contains all 267 illustrated pages without scrambled text." },
  { question: "When did Michelle write the book?", answer: "Michelle wrote the book in 2023. AI has changed a lot since then, and more updates are planned. The magazine waitlist is the place to join for more recent AI updates." },
  { question: "Where can I get the complete guide?", answer: "The full illustrated guide is available through Michelle’s Gumroad page. The Get the full guide link takes you to the current purchase page." },
]

export default async function AiGuidePage({ searchParams }: { searchParams: Promise<{ preview?: string | string[] }> }) {
  const query = await searchParams
  if (process.env.NODE_ENV === "development" && query.preview === "full") redirect(`${aiGuideReaderPath}?preview=full`)
  const { book } = await getAiGuide(undefined)
  const chapters = book.chapters.filter(chapter => chapter.number >= 1 && chapter.number <= 12)
  const sample = book.chapters[0].pages[0].blocks.find(block => block.text.startsWith("Hiya reader!"))?.text
  const bookData = { "@context": "https://schema.org", "@type": "Book", "@id": absoluteUrl(`${aiGuidePath}#book`), name: book.title, author: { "@id": personId }, inLanguage: "en", bookFormat: "https://schema.org/EBook", numberOfPages: book.pageCount, url: absoluteUrl(aiGuidePath), image: absoluteUrl("/books/girly-guide-to-ai/cover.webp"), sameAs: aiGuidePurchaseUrl, mainEntityOfPage: absoluteUrl(aiGuidePath), description: "An illustrated introduction to artificial intelligence by Michelle Lawson, from the foundations to building an AI project. Written in 2023, with a free online reading preview." }
  const faqData = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
  return <main className={styles.book} id="guide-top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(bookData) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(faqData) }} />
    <GuideLegacyLink chapterIds={book.chapters.map(chapter => chapter.id)} />
    <GuideCover startHref={`${aiGuideReaderPath}#guide-introduction`} />
    <div className={styles.bookLanding}>
      <section aria-labelledby="book-about-title">
        <p className={styles.eyebrow}>An illustrated guide by Michelle Lawson</p>
        <h2 id="book-about-title">Get to know artificial intelligence.</h2>
        <p>What is AI, how does it learn, and what could you build with it? The Girly Guide to Artificial Intelligence explores those questions with Mia and her robot friend Mai, through 267 illustrated pages, 12 chapters, exercises, and a project of your own.</p>
        <p>Start with the foundations, then explore machine learning, neural networks, computer vision, natural language processing, reinforcement learning, and the ethical questions behind the technology.</p>
        <aside className={styles.authorNote} aria-label="A note from Michelle"><strong>A note from Michelle</strong><p>I wrote this book in 2023. A lot has changed in AI since then, so you can definitely expect more updates to this guide.</p><p>For more recent AI updates, <Link href="/magazine">join the magazine waitlist</Link>. We’ll be covering what’s happening in AI there.</p></aside>
      </section>
      <section className={styles.landingSample} aria-labelledby="book-sample-title">
        <div><p className={styles.eyebrow}>A little look inside</p><h2 id="book-sample-title">Meet Mia and Mai.</h2>{sample && <blockquote>{sample}</blockquote>}<Link className={styles.readButton} href={`${aiGuideReaderPath}#guide-introduction`} data-analytics-goal="guide_preview_start"><BookOpen size={22} />Read the free sample <ArrowUpRight size={16} /></Link><p className={styles.sampleNote}>The opening is readable. From section 1.3 onward, the online preview gradually becomes scrambled.</p></div>
        <img src="/books/girly-guide-to-ai/illustrations/art-d4df0c3d2d14ec99.webp" alt="Mia and her robot friend Mai wave hello in an original illustration from The Girly Guide to AI." width="911" height="497" loading="lazy" decoding="async" />
      </section>
      <section aria-labelledby="book-chapters-title"><p className={styles.eyebrow}>Inside the book</p><h2 id="book-chapters-title">From the first question to your own project.</h2><ol className={styles.landingChapters}>{chapters.map(chapter => <li key={chapter.id}><Link href={`${aiGuideReaderPath}#guide-${chapter.id}`}><span>{String(chapter.number).padStart(2,"0")}</span>{chapter.title}<ArrowUpRight size={14} aria-hidden="true" /></Link></li>)}</ol></section>
      <section className={styles.landingFaq} aria-labelledby="book-questions-title"><h2 id="book-questions-title">Before you start.</h2>{questions.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}<a className={styles.readButton} href={aiGuidePurchaseUrl} data-analytics-goal="guide_purchase_click" target="_blank" rel="noopener noreferrer">Get the full guide <ArrowUpRight size={16} /></a></section>
      <section aria-labelledby="book-keep-learning"><p className={styles.eyebrow}>Keep exploring</p><h2 id="book-keep-learning">More to try and think about.</h2><ul className={styles.landingRelated}><li><Link href="/learn/how-to-build-ai-wardrobe-digital-closet">Build your own AI wardrobe</Link><span>A practical project using the clothes you already own.</span></li><li><Link href="/learn/ai-alignment-and-ai-safety">AI alignment and AI safety</Link><span>Leesha Mogha on the gap between what we ask for and what we mean.</span></li><li><Link href="/learn/digital-conquest-ai-cybersecurity">AI, cybersecurity, and digital dependence</Link><span>Leesha explores the systems we rely on and what it takes to control them.</span></li></ul></section>
    </div>
  </main>
}
