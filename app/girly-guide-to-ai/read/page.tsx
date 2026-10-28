import Link from "next/link"
import { BookOpen, ArrowUpRight, FileText } from "@/components/retro-icons"
import { GuideCover } from "@/components/books/guide-cover"
import { GuideReader } from "@/components/books/guide-reader"
import { GuideChapterView } from "@/components/books/guide-chapter"
import { ProgressiveGuide } from "@/components/books/progressive-guide"
import { aiGuidePath, aiGuideReaderPath, aiGuidePurchaseUrl, aiGuideRecoveryUrl } from "@/lib/ai-guide"
import { getAiGuide, guideChapterPayload } from "@/lib/ai-guide.server"
import { buildPageMetadata } from "@/lib/seo"
import styles from "@/components/books/guide.module.css"

export const metadata = buildPageMetadata({ title: "Read The Girly Guide to AI", description: "Read Michelle Lawson’s illustrated AI book preview with Mia and Mai. Later preview text is intentionally scrambled.", path: aiGuideReaderPath, images: ["/books/girly-guide-to-ai/cover.webp"], robots: { index: false, follow: true } })

export default async function GuideReadingPage({ searchParams }: { searchParams: Promise<{ preview?: string | string[] }> }) {
  const query = await searchParams
  const { book, fullText } = await getAiGuide(query.preview)
  const chapters = book.chapters.map(({ id, number, title, part }) => ({ id, number, title, part }))
  const initial = book.chapters.slice(0, 2).map(chapter => guideChapterPayload(chapter, book.freeThroughPage))
  const previewStartChapter = book.chapters.find(chapter => chapter.pages.some(page => page.number === book.freeThroughPage + 1))?.id || "chapter-1"
  return <main className={styles.book} id="guide-top">
    <Link className={styles.readerBackLink} href={aiGuidePath}>← About the book</Link>
    <GuideCover startHref="#guide-introduction" />
    {!fullText && <aside className={styles.previewNote} aria-label="About this reading preview"><FileText size={28} aria-hidden="true" /><div><strong>A little look inside.</strong><p>The opening is yours to read. From section 1.3 onward, the preview gradually turns into scrambled text. Get the full guide to read every page without the scrambling.</p></div><a href={aiGuidePurchaseUrl} data-analytics-goal="guide_purchase_click" target="_blank" rel="noopener noreferrer">Get the full guide <ArrowUpRight size={14} /></a></aside>}
    <GuideReader chapters={chapters} fullText={fullText} firstPage={10} lastPage={book.pageCount}>
      {fullText ? book.chapters.map(chapter => <GuideChapterView key={chapter.id} payload={guideChapterPayload(chapter, book.freeThroughPage)} fullText />) : <ProgressiveGuide chapters={chapters} initial={initial} previewStartChapter={previewStartChapter} />}
      <footer className={styles.bookEnd}><BookOpen size={26} /><h2>{fullText ? "Your turn to build something." : "Want to read this without scrambled text?"}</h2><p>Get the full illustrated guide, keep it on your computer, and work through every page at your own pace.</p><a className={styles.readButton} href={aiGuidePurchaseUrl} data-analytics-goal="guide_purchase_click" target="_blank" rel="noopener noreferrer">Get the full guide <ArrowUpRight size={16} /></a><a className={styles.recovery} href={aiGuideRecoveryUrl} target="_blank" rel="noopener noreferrer">Find a previous download</a></footer>
    </GuideReader>
  </main>
}
