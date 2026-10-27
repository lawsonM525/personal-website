"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowUp, ArrowUpRight, ChevronDown, List, Maximize2, Minimize2, Minus, Plus } from "lucide-react"
import { aiGuidePurchaseUrl } from "@/lib/ai-guide"
import styles from "./guide.module.css"

type ChapterLink = { id: string; title: string; number: number; part: string }
export function GuideReader({ chapters, fullText, children }: { chapters: ChapterLink[]; fullText: boolean; children: React.ReactNode }) {
  const reader = useRef<HTMLDivElement>(null)
  const toolbar = useRef<HTMLDivElement>(null)
  const article = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState("introduction")
  const [progress, setProgress] = useState(0)
  const [tocOpen, setTocOpen] = useState(false)
  const [size, setSize] = useState(18)
  const [focused, setFocused] = useState(false)
  const readingAnchor = useRef<{ element?: HTMLElement; fraction: number; gap: number; scrollTop: number } | null>(null)

  function changeFocus(next: boolean) {
    const viewport = reader.current?.closest<HTMLElement>("[data-guide-scroll-viewport]")
    if (viewport) {
      const bounds = viewport.getBoundingClientRect()
      const tools = toolbar.current?.getBoundingClientRect()
      const top = tools && tools.top <= bounds.top + 1 ? tools.bottom : bounds.top
      const candidates = article.current?.querySelectorAll<HTMLElement>("h2,h3,p,pre,blockquote,figure,[data-guide-purchase-banner]") || []
      const element = Array.from(candidates).find(element => {
        const rect = element.getBoundingClientRect()
        return rect.height > 1 && rect.bottom > top && rect.top < bounds.bottom
      })
      const rect = element?.getBoundingClientRect()
      readingAnchor.current = { element, fraction: rect ? Math.max(0, (top - rect.top) / rect.height) : 0, gap: rect ? Math.max(0, rect.top - top) : 0, scrollTop: viewport.scrollTop }
    }
    setFocused(next)
  }

  useLayoutEffect(() => {
    const desktop = reader.current?.closest<HTMLElement>('[data-contained-reader="guide"]')
    const viewport = reader.current?.closest<HTMLElement>("[data-guide-scroll-viewport]")
    if (!desktop || !viewport) return
    if (focused) desktop.dataset.readerFocus = "true"
    else delete desktop.dataset.readerFocus
    const anchor = readingAnchor.current
    if (anchor) {
      viewport.style.setProperty("--guide-viewport-height", `${viewport.clientHeight}px`)
      reader.current?.style.setProperty("--guide-toolbar-height", `${toolbar.current?.getBoundingClientRect().height || 46}px`)
      if (anchor.element?.isConnected) {
        const bounds = viewport.getBoundingClientRect()
        const tools = toolbar.current?.getBoundingClientRect()
        const top = tools && tools.top <= bounds.top + 1 ? tools.bottom : bounds.top
        const rect = anchor.element.getBoundingClientRect()
        viewport.scrollTop += rect.top + anchor.fraction * rect.height - top - anchor.gap
      } else viewport.scrollTop = anchor.scrollTop
      readingAnchor.current = null
    }
    return () => { delete desktop.dataset.readerFocus }
  }, [focused])

  useEffect(() => {
    if (!focused) return
    function exitOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !tocOpen && !document.querySelector("dialog[open]")) changeFocus(false)
    }
    document.addEventListener("keydown", exitOnEscape)
    return () => document.removeEventListener("keydown", exitOnEscape)
  }, [focused, tocOpen])

  useEffect(() => {
    if (!tocOpen) return
    function closeOnOutside(event: PointerEvent) {
      const target = event.target instanceof Element ? event.target : null
      if (!target?.closest('#guide-contents, [aria-controls="guide-contents"]')) setTocOpen(false)
    }
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") setTocOpen(false) }
    document.addEventListener("pointerdown", closeOnOutside)
    document.addEventListener("keydown", closeOnEscape)
    return () => { document.removeEventListener("pointerdown", closeOnOutside); document.removeEventListener("keydown", closeOnEscape) }
  }, [tocOpen])

  useEffect(() => {
    const viewport = reader.current?.closest<HTMLElement>("[data-guide-scroll-viewport]")
    if (!viewport) return
    let frame = 0
    function update() {
      frame = 0
      const element = article.current; if (!element || !viewport?.clientHeight) return
      const rect = element.getBoundingClientRect()
      const viewportTop = viewport.getBoundingClientRect().top
      const toolbarHeight = toolbar.current?.getBoundingClientRect().height || 46
      reader.current?.style.setProperty("--guide-toolbar-height", `${toolbarHeight}px`)
      viewport.style.setProperty("--guide-viewport-height", `${viewport.clientHeight}px`)
      reader.current?.style.setProperty("--guide-toolbar-bottom", `${Math.max(viewportTop + toolbarHeight, toolbar.current?.getBoundingClientRect().bottom || 0)}px`)
      const offset = viewportTop + toolbarHeight + 20
      const total = Math.max(1, rect.height - viewport.clientHeight + toolbarHeight + 20)
      setProgress(Math.max(0, Math.min(100, Math.round((offset - rect.top) / total * 100))))
      let chapter = chapters[0]?.id || "introduction"
      for (const item of chapters) {
        const top = document.getElementById(`guide-${item.id}`)?.getBoundingClientRect().top
        if (top !== undefined && top <= offset + 20) chapter = item.id
      }
      setActive(chapter)
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update) }
    update()
    viewport.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    window.addEventListener("hashchange", schedule)
    const observer = new ResizeObserver(schedule)
    if (article.current) observer.observe(article.current)
    if (toolbar.current) observer.observe(toolbar.current)
    observer.observe(viewport)
    return () => { viewport.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); window.removeEventListener("hashchange", schedule); observer.disconnect(); cancelAnimationFrame(frame); viewport.style.removeProperty("--guide-viewport-height") }
  }, [chapters])

  return <div ref={reader} className={styles.reader} data-focus-mode={focused} style={{ "--guide-type-size": `${size}px` } as React.CSSProperties}>
    <div ref={toolbar} className={styles.readingBar} data-guide-toolbar>
      <span>{fullText ? "Full text" : "Reading preview"}<span className={styles.readingProgress}>{progress}%</span></span>
      <div className={styles.typeTools} aria-label="Reading text size"><button type="button" aria-label="Decrease text size" disabled={size <= 16} onClick={() => setSize(value => value - 1)}><Minus size={13} /></button><span>Aa</span><button type="button" aria-label="Increase text size" disabled={size >= 23} onClick={() => setSize(value => value + 1)}><Plus size={13} /></button></div>
      <div className={styles.readingActions}>
        {!fullText && <a href={aiGuidePurchaseUrl} target="_blank" rel="noopener noreferrer">Get the full guide <ArrowUpRight size={13} /></a>}
        <button className={styles.focusButton} type="button" aria-pressed={focused} aria-label={focused ? "Exit focus mode" : "Enter focus mode"} title={focused ? "Exit focus mode (Escape)" : "Focus mode"} onClick={() => changeFocus(!focused)}>{focused ? <Minimize2 size={16} /> : <Maximize2 size={16} />}<span>{focused ? "Exit focus" : "Focus mode"}</span><span className={styles.focusShort} aria-hidden="true">Focus</span></button>
      </div>
      <button className={styles.contentsToggle} type="button" aria-label="Chapters" aria-expanded={tocOpen} aria-controls="guide-contents" onClick={() => setTocOpen(value => !value)}><List size={15} /><span>{chapters.find(chapter => chapter.id === active)?.title || "Chapters"}</span><ChevronDown size={15} /></button>
      <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
    </div>
    <div className={styles.readerLayout}>
      <aside className={styles.contents} data-open={tocOpen}>
        <div className={styles.contentsTitle}><span>In this book</span><span>12 chapters + more</span></div>
        <nav id="guide-contents" className={styles.contentsList} data-open={tocOpen} aria-label="Book chapters">
          {chapters.map((chapter, index) => <div key={chapter.id}>
            {(index === 0 || chapters[index - 1].part !== chapter.part) && <p>{chapter.part}</p>}
            <a href={`#guide-${chapter.id}`} aria-current={active === chapter.id ? "location" : undefined} onClick={() => setTocOpen(false)}><span>{chapter.number > 0 && chapter.number <= 12 ? String(chapter.number).padStart(2, "0") : "·"}</span>{chapter.title}</a>
          </div>)}
          <a href="#guide-top" className={styles.backToTop}><ArrowUp size={12} />Back to the cover</a>
        </nav>
      </aside>
      <div className={styles.readingColumn} ref={article}>{children}</div>
    </div>
  </div>
}
