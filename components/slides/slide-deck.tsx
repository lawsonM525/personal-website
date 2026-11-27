"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { HomeHeader } from "@/components/homepage/home-desktop"
import { WindowBar } from "@/components/homepage/window-bar"
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, List, Maximize2, Minimize2, X } from "@/components/retro-icons"
import { beautifulWomanSlides as slides, beautifulWomanDeckTitle, deckShareUrl, slideIndexFromHash, type SessionSlide } from "@/lib/beautiful-woman-slides"
import styles from "./slide-deck.module.css"

const art = {
  friends: { src: "/books/girly-guide-to-ai/mia-and-mai.webp", alt: "Mia and Mai, the human and robot friends from The Girly Guide to AI" },
  learn: { src: "/homepage/learn-icon-v3.webp", alt: "An illustrated open notebook and pen" },
  letter: { src: "/homepage/welcome-letter-d.webp", alt: "An illustrated letter in an open envelope" },
}

function SlideContent({ slide, number }: { slide: SessionSlide; number: number }) {
  const image = slide.art ? art[slide.art] : null
  return <>
    <div className={styles.slideTop}><span>{slide.section === "Welcome" ? "The Beautiful Woman" : slide.section}</span><span aria-hidden="true">{String(number).padStart(2, "0")}</span></div>
    <div className={`${styles.slideBody} ${image ? styles.withArt : ""}`}>
      <div className={styles.words}>
        <h2 id={`${slide.id}-title`} tabIndex={-1}>{slide.title}</h2>
        {slide.lead && <p className={styles.lead}>{slide.lead}</p>}
        {slide.points && <ul className={styles.points}>{slide.points.map(point => <li key={point.title}><strong>{point.title}</strong><p>{point.text}</p></li>)}</ul>}
        {slide.prompt && <blockquote className={styles.prompt}><span>A prompt to try</span><p>{slide.prompt}</p></blockquote>}
        {slide.question && <p className={styles.question}>{slide.question}</p>}
      </div>
      {image && <figure className={`${styles.art} ${slide.art === "friends" ? styles.friends : ""}`}><img src={image.src} alt={image.alt} width={slide.art === "friends" ? 564 : 1100} height={slide.art === "friends" ? 304 : 1100} loading={number === 1 ? "eager" : "lazy"} decoding="async" /></figure>}
    </div>
    {(slide.note || slide.source) && <div className={styles.slideNote}>{slide.note && <p>{slide.note}</p>}{slide.source && <a href={slide.source.href} target="_blank" rel="noopener noreferrer">{slide.source.label} <ArrowUpRight size={14} aria-hidden="true" /></a>}</div>}
  </>
}

export function SlideDeck() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [presenting, setPresenting] = useState(false)
  const [readAll, setReadAll] = useState(false)
  const [indexOpen, setIndexOpen] = useState(false)
  const [shareStatus, setShareStatus] = useState("")
  const [manualShare, setManualShare] = useState(false)
  const index = useRef<HTMLDialogElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const copyInput = useRef<HTMLInputElement>(null)
  const presentButton = useRef<HTMLButtonElement>(null)
  const currentSlide = slides[current]

  function go(to: number, focus = false) {
    const next = Math.max(0, Math.min(slides.length - 1, to))
    setCurrent(next); setShareStatus(""); setManualShare(false)
    window.history.replaceState(window.history.state, "", `#${slides[next].id}`)
    stage.current?.scrollTo({ top: 0, behavior: "instant" })
    if (focus) requestAnimationFrame(() => document.getElementById(`${slides[next].id}-title`)?.focus({ preventScroll: true }))
  }

  useEffect(() => {
    function sync() { setCurrent(slideIndexFromHash(window.location.hash)) }
    sync(); window.addEventListener("hashchange", sync); window.addEventListener("popstate", sync)
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync) }
  }, [])
  useEffect(() => {
    function keys(event: KeyboardEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || index.current?.open) return
      if (event.key === "Escape" && presenting) { event.preventDefault(); setPresenting(false); presentButton.current?.focus(); return }
      if ((event.target as HTMLElement)?.closest("input,textarea,select,[contenteditable=true]")) return
      if (event.key.toLowerCase() === "f") { event.preventDefault(); setReadAll(false); setPresenting(value => !value); return }
      if (readAll) return
      if (["ArrowRight", "PageDown"].includes(event.key)) { event.preventDefault(); go(current + 1, true) }
      else if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); go(current - 1, true) }
      else if (event.key === "Home") { event.preventDefault(); go(0, true) }
      else if (event.key === "End") { event.preventDefault(); go(slides.length - 1, true) }
    }
    window.addEventListener("keydown", keys)
    return () => window.removeEventListener("keydown", keys)
  }, [current, readAll, presenting])
  useEffect(() => {
    if (indexOpen && !index.current?.open) index.current?.showModal()
    else if (!indexOpen && index.current?.open) index.current?.close()
  }, [indexOpen])
  useEffect(() => {
    if (!presenting) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previous }
  }, [presenting])
  useEffect(() => { if (manualShare) { copyInput.current?.focus(); copyInput.current?.select() } }, [manualShare])

  async function share() {
    try { await navigator.clipboard.writeText(deckShareUrl(current)); setShareStatus("Link copied 🩵") }
    catch { setManualShare(true); setShareStatus("Copy this link to share this slide.") }
  }
  function togglePresentation() { setReadAll(false); setPresenting(value => !value) }

  return <div className={`computer-desktop-page ${styles.desktop} ${presenting ? styles.presenting : ""}`} data-slide-deck data-presentation={presenting} data-read-all={readAll}>
    <div className={styles.siteHeader}><HomeHeader /></div>
    <a className={styles.skip} href={`#${currentSlide.id}-title`}>Skip to this slide</a>
    <main className={styles.workspace} aria-label={`${beautifulWomanDeckTitle}: slides for The Beautiful Woman`}>
      <h1 className={styles.srOnly}>{beautifulWomanDeckTitle} — The Beautiful Woman, with Michelle Lawson</h1>
      <div className={styles.window} data-computer-window>
        {!presenting && <WindowBar title="The Beautiful Woman · AI, ideas & faith" icon={<BookOpen size={23} aria-hidden="true" />} onMaximize={togglePresentation} onClose={() => router.push("/?desktop=1")} />}
        <div className={styles.toolbar}>
          <Link className={styles.homeLink} href="/?desktop=1">Michelle’s Computer <ArrowUpRight size={13} aria-hidden="true" /></Link>
          <div className={styles.tools}>
            <button type="button" onClick={() => setIndexOpen(true)} aria-haspopup="dialog" aria-expanded={indexOpen}><List size={17} aria-hidden="true" />Index</button>
            {!presenting && <button type="button" onClick={() => setReadAll(value => !value)} aria-pressed={readAll}>{readAll ? "Slide view" : "Read all"}</button>}
            <button type="button" onClick={share}>Share slide <ArrowUpRight size={14} aria-hidden="true" /></button>
            <button ref={presentButton} type="button" className={styles.presentButton} aria-pressed={presenting} onClick={togglePresentation}>{presenting ? <Minimize2 size={16} aria-hidden="true" /> : <Maximize2 size={16} aria-hidden="true" />}{presenting ? "Exit presentation" : "Present"}</button>
          </div>
        </div>
        {(shareStatus || manualShare) && <div className={styles.shareFeedback}><span role="status">{shareStatus}</span><a href={deckShareUrl(current)} target="_blank" rel="noopener noreferrer">Open shared slide ↗</a>{manualShare && <input ref={copyInput} aria-label="Share link for this slide" readOnly value={deckShareUrl(current)} />}</div>}
        <div ref={stage} className={`${styles.stage} ${readAll ? styles.readAll : ""}`}>
          {slides.map((slide, number) => <section key={slide.id} id={slide.id} hidden={!readAll && number !== current} className={`${styles.slide} ${slide.tone ? styles[slide.tone] : ""}`} role="group" aria-roledescription="slide" aria-label={`${number + 1} of ${slides.length}: ${slide.title}`}>
            <SlideContent slide={slide} number={number + 1} />
          </section>)}
        </div>
        <div className={styles.progress} role="progressbar" aria-label="Slide progress" aria-valuemin={1} aria-valuemax={slides.length} aria-valuenow={readAll ? slides.length : current + 1} aria-valuetext={readAll ? "All slides displayed" : `Slide ${current + 1} of ${slides.length}`}><span style={{ width: `${readAll ? 100 : (current + 1) / slides.length * 100}%` }} /></div>
        <footer className={styles.controls}>
          <button type="button" onClick={() => go(current - 1, true)} disabled={readAll || current === 0} aria-label="Previous slide"><ArrowLeft size={18} aria-hidden="true" /><span>Previous</span></button>
          <div className={styles.position}><span role="status" aria-live="polite">{readAll ? `All ${slides.length} slides` : `${String(current + 1).padStart(2, "0")} / ${slides.length}`}</span><small>{presenting ? "← → to browse · Esc to exit" : "← → to browse · F to present"}</small></div>
          <button type="button" onClick={() => go(current + 1, true)} disabled={readAll || current === slides.length - 1} aria-label="Next slide"><span>Next</span><ArrowRight size={18} aria-hidden="true" /></button>
        </footer>
      </div>
    </main>
    <dialog ref={index} className={styles.indexDialog} aria-labelledby="slide-index-title" onClose={() => setIndexOpen(false)} onClick={event => { if (event.target === event.currentTarget) setIndexOpen(false) }}>
      <div className={styles.indexBar}><h2 id="slide-index-title">Inside this session</h2><button type="button" aria-label="Close slide index" onClick={() => setIndexOpen(false)}><X size={18} aria-hidden="true" /></button></div>
      <nav aria-label="Slide index">{slides.map((slide, number) => <a key={slide.id} href={`#${slide.id}`} aria-current={number === current ? "step" : undefined} onClick={event => { event.preventDefault(); setReadAll(false); setIndexOpen(false); go(number, true) }}><span>{String(number + 1).padStart(2, "0")}</span><span><small>{slide.section}</small>{slide.title}</span><ArrowRight size={15} aria-hidden="true" /></a>)}</nav>
      <div className={styles.indexEnd}><Link href="/girly-guide-to-ai">Keep learning with The Girly Guide to AI <ArrowUpRight size={14} aria-hidden="true" /></Link></div>
    </dialog>
  </div>
}
