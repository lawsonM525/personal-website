import Image from "next/image"
import { ArrowUpRight, BookOpen } from "@/components/retro-icons"
import { aiGuidePurchaseUrl } from "@/lib/ai-guide"
import styles from "./guide.module.css"

export function GuideCover({ startHref }: { startHref: string }) {
  return <section className={styles.coverPage} aria-labelledby="guide-title">
    <h1 id="guide-title" className={styles.screenReaderOnly}>The Girly Guide to Artificial Intelligence</h1>
    <figure className={styles.bookCover}><Image src="/books/girly-guide-to-ai/cover.webp" alt="Michelle’s original book cover: The Girly Guide to Artificial Intelligence, with Mia and Mai, written by Michelle Lawson." width={1025} height={1600} priority unoptimized={false} sizes="(orientation: landscape) 54vw, (max-width: 760px) 85vw, 410px" /></figure>
    <div className={styles.coverControls}>
      <p className={styles.bookFacts}>267 illustrated pages <span>·</span> 12 chapters</p>
      <div className={styles.heroActions}><a className={styles.readButton} href={startHref} data-analytics-goal="guide_preview_start"><BookOpen size={26} />Start reading <ArrowUpRight size={16} /></a><a className={styles.getButton} href={aiGuidePurchaseUrl} data-analytics-goal="guide_purchase_click" target="_blank" rel="noopener noreferrer">Get the full guide <ArrowUpRight size={15} /></a></div>
    </div>
  </section>
}
