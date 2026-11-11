import Link from "next/link"
import { ArrowUpRight } from "@/components/retro-icons"
import { beautifulWomanDeckPath } from "@/lib/beautiful-woman-slides"
import styles from "@/components/slides/slide-deck.module.css"

export default function Talks() {
  return (
    <main className={styles.catalog}>
      <h1>Talks & slides</h1>
      <p>A little something to keep learning with after the conversation.</p>
      <Link href={beautifulWomanDeckPath} className={styles.catalogCard}>
        <div><small>The Beautiful Woman · 19 slides</small><h2>AI, ideas & faith</h2><p>What AI can help us make and learn, what to be careful about, and keeping our faith and judgment at the center.</p><strong>Open the slides <ArrowUpRight size={17} aria-hidden="true" /></strong></div>
        <img src="/books/girly-guide-to-ai/mia-and-mai.webp" alt="Mia and Mai from The Girly Guide to AI" width={564} height={304} />
      </Link>
    </main>
  )
}

