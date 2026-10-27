import { Fragment } from "react"
import artwork from "@/data/books/girly-guide-ai.art.json"
import { ArrowDown, ArrowUpRight, BookOpen, FileText } from "lucide-react"
import { GuideReader } from "@/components/books/guide-reader"
import { aiGuidePath, aiGuidePurchaseUrl, aiGuideRecoveryUrl, type GuidePage } from "@/lib/ai-guide"
import { getAiGuide } from "@/lib/ai-guide.server"
import { buildPageMetadata } from "@/lib/seo"
import styles from "@/components/books/guide.module.css"

export const metadata = buildPageMetadata({ title: "The Girly Guide to Artificial Intelligence", description: "Read a preview of Michelle Lawson’s 267-page illustrated guide to AI. Learn with Mia and Mai, from the foundations to building your own AI project.", path: aiGuidePath })

type BookFigure = { src: string; width: number; height: number; displayWidth: number; beforeBlock: number; alt: string; sourcePage: number }
const pageArt = artwork as Record<string, BookFigure[]>

function renderBlock(page: GuidePage, index: number, fullText: boolean) {
  const block = page.blocks[index]
  if (page.number === 10 && ["meet Mai", "and Mia"].includes(block.text)) return null
  const text = block.kind === "heading" ? <h3>{block.text}</h3> : block.kind === "code" ? <pre><code>{block.text}</code></pre> : block.kind === "callout" ? <blockquote>{block.text}</blockquote> : <p>{block.text}</p>
  const obscured = !fullText && !!page.obscured
  return <div aria-hidden={obscured ? true : undefined} data-nosnippet={obscured ? "" : undefined}>{text}</div>
}

export default async function AiGuidePage({ searchParams }: { searchParams: Promise<{ preview?: string | string[] }> }) {
  const query = await searchParams
  const { book, fullText } = await getAiGuide(query.preview)
  const chapters = book.chapters.map(({ id, number, title, part }) => ({ id, number, title, part }))
  return <main className={styles.book} id="guide-top">
    <section className={styles.coverPage} aria-labelledby="guide-title">
      <h1 id="guide-title" className={styles.screenReaderOnly}>The Girly Guide to Artificial Intelligence</h1>
      <figure className={styles.bookCover}>
        <img src="/books/girly-guide-to-ai/cover.webp" alt="Michelle’s original book cover: The Girly Guide to Artificial Intelligence, with Mia and Mai, written by Michelle Lawson." width="1025" height="1600" fetchPriority="high" />
      </figure>
      <div className={styles.coverControls}>
        <p className={styles.bookFacts}>{book.pageCount} illustrated pages <span>·</span> 12 chapters</p>
        <div className={styles.heroActions}><a className={styles.readButton} href="#guide-introduction"><BookOpen size={17} />Start reading <ArrowDown size={16} /></a><a className={styles.getButton} href={aiGuidePurchaseUrl} target="_blank" rel="noopener noreferrer">Get the full guide <ArrowUpRight size={15} /></a></div>
      </div>
    </section>
    {!fullText && <aside className={styles.previewNote} aria-label="About this reading preview"><FileText size={20} aria-hidden="true" /><div><strong>A little look inside.</strong><p>The opening is yours to read. Farther into the book, the words gradually turn into nonsense. Get the full guide for the readable copy, illustrations, and exercises.</p></div><a href={aiGuidePurchaseUrl} target="_blank" rel="noopener noreferrer">Get your copy <ArrowUpRight size={14} /></a></aside>}
    <GuideReader chapters={chapters} fullText={fullText}>
      {book.chapters.map(chapter => <section id={`guide-${chapter.id}`} key={chapter.id} className={styles.chapter} data-guide-chapter={chapter.id}>
        <header className={styles.chapterHeading}>
          <p className={styles.eyebrow}>{chapter.number > 0 && chapter.number <= 12 ? `Chapter ${String(chapter.number).padStart(2, "0")} · ${chapter.part}` : chapter.part}</p>
          <h2>{chapter.title}</h2>
          {!fullText && chapter.pages.some(page => !!page.obscured) && <p className={styles.chapterNotice}>This chapter is part of the scrambled preview. <a href={aiGuidePurchaseUrl} target="_blank" rel="noopener noreferrer">Read the full guide <ArrowUpRight size={11} /></a></p>}
        </header>
        {chapter.pages.filter(page => page.blocks.length || pageArt[String(page.number)]?.length).map(page => <div key={page.number} className={styles.bookPage} data-guide-page={page.number} data-obscured={fullText ? 0 : Math.round((page.obscured || 0) * 100)}>
          {!fullText && !!page.obscured && <span className={styles.screenReaderOnly}>The text on this page is obscured in the free preview. The complete readable guide is available through Gumroad.</span>}
          {Array.from({ length: page.blocks.length + 1 }, (_, index) => <Fragment key={index}>
            {(pageArt[String(page.number)] || []).filter(figure => figure.beforeBlock === index).map(figure => <figure key={figure.src} className={styles.originalFigure} style={{ width: `${figure.displayWidth}%` }} data-source-page={figure.sourcePage}>
              <a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size illustration: ${figure.alt}`} title="Open illustration at full size"><img src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} loading="lazy" decoding="async" /></a>
            </figure>)}
            {page.blocks[index] && renderBlock(page, index, fullText)}
          </Fragment>)}
        </div>)}
        {!fullText && chapter.number > 0 && chapter.number % 3 === 0 && <aside className={styles.chapterCta}><span>Keep the ideas. Lose the gibberish.</span><a href={aiGuidePurchaseUrl} target="_blank" rel="noopener noreferrer">Get the full guide <ArrowUpRight size={13} /></a></aside>}
      </section>)}
      <footer className={styles.bookEnd}><BookOpen size={26} /><h2>Your turn to build something.</h2><p>Get the illustrated guide, keep it on your computer, and work through it at your own pace.</p><a className={styles.readButton} href={aiGuidePurchaseUrl} target="_blank" rel="noopener noreferrer">Get the full guide <ArrowUpRight size={16} /></a><a className={styles.recovery} href={aiGuideRecoveryUrl} target="_blank" rel="noopener noreferrer">Find a previous download</a></footer>
    </GuideReader>
  </main>
}
