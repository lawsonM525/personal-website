import { Fragment } from "react"
import Link from "next/link"
import { ArrowUpRight } from "@/components/retro-icons"
import { aiGuidePurchaseUrl, type GuideChapterPayload, type GuidePage } from "@/lib/ai-guide"
import styles from "./guide.module.css"

export function GuidePurchaseBanner({ id }: { id: string }) {
  return <aside id={id} className={styles.chapterCta} aria-label="Read without scrambled text" data-guide-purchase-banner>
    <div><strong>Want to read this without scrambled text?</strong><p>Get the full guide for all 267 illustrated pages, exercises, and projects.</p></div>
    <a className={styles.readButton} href={aiGuidePurchaseUrl} data-analytics-goal="guide_purchase_click" target="_blank" rel="noopener noreferrer">Get the full guide <ArrowUpRight size={15} /></a>
  </aside>
}

function renderBlock(page: GuidePage, index: number, fullText: boolean) {
  const block = page.blocks[index]
  if (page.number === 10 && ["meet Mai", "and Mia"].includes(block.text)) return null
  const text = block.kind === "heading" ? <h3>{block.text}</h3> : block.kind === "code" ? <pre><code>{block.text}</code></pre> : block.kind === "callout" ? <blockquote>{block.text}</blockquote> : <p>{block.text}</p>
  const obscured = !fullText && !!page.obscured
  return <div aria-hidden={obscured ? true : undefined} data-nosnippet={obscured ? "" : undefined}>{text}</div>
}

export function GuideChapterView({ payload, fullText = false }: { payload: GuideChapterPayload; fullText?: boolean }) {
  const { chapter, figures, freeThroughPage } = payload
  return <section id={`guide-${chapter.id}`} className={styles.chapter} data-guide-chapter={chapter.id}>
    {!fullText && chapter.number >= 2 && chapter.number <= 12 && chapter.number % 2 === 0 && <GuidePurchaseBanner id={`guide-preview-${chapter.id}`} />}
    <header className={styles.chapterHeading}><p className={styles.eyebrow}>{chapter.number > 0 && chapter.number <= 12 ? `Chapter ${String(chapter.number).padStart(2, "0")} · ${chapter.part}` : chapter.part}</p><h2>{chapter.title}</h2></header>
    {chapter.id === "introduction" && <aside className={styles.authorNote} aria-label="A note from Michelle"><strong>A note from Michelle</strong><p>I wrote this book in 2023. A lot has changed in AI since then, so you can definitely expect more updates to this guide.</p><p>For more recent AI updates, <Link href="/magazine">join the magazine waitlist</Link>. We’ll be covering what’s happening in AI there.</p></aside>}
    {chapter.pages.filter(page => page.blocks.length || figures[String(page.number)]?.length).map(page => <div key={page.number} className={styles.bookPage} data-guide-page={page.number} data-obscured={fullText ? 0 : Math.round((page.obscured || 0) * 100)}>
      {!fullText && !!page.obscured && <span className={styles.screenReaderOnly}>The text on this page is obscured in the free preview. The complete readable guide is available through Gumroad.</span>}
      {Array.from({ length: page.blocks.length + 1 }, (_, index) => <Fragment key={index}>
        {(figures[String(page.number)] || []).filter(figure => figure.beforeBlock === index).map(figure => <figure key={figure.src} className={styles.originalFigure} style={{ width: `${figure.displayWidth}%` }} data-source-page={figure.sourcePage}><a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size illustration: ${figure.alt}`} title="Open illustration at full size"><img src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} loading="lazy" decoding="async" /></a></figure>)}
        {!fullText && page.number === freeThroughPage + 1 && index === 0 && <GuidePurchaseBanner id="guide-preview-start" />}
        {page.blocks[index] && renderBlock(page, index, fullText)}
      </Fragment>)}
    </div>)}
  </section>
}
