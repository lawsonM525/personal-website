"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import type { GuideChapterPayload } from "@/lib/ai-guide"
import { GuideChapterView } from "./guide-chapter"
import styles from "./guide.module.css"
import { chapterFromGuideHash } from "@/lib/guide-progress"

type Chapter = { id: string; title: string }

export function ProgressiveGuide({ chapters, initial, previewStartChapter }: { chapters: Chapter[]; initial: GuideChapterPayload[]; previewStartChapter: string }) {
  const [loaded, setLoaded] = useState<Record<string, GuideChapterPayload>>(() => Object.fromEntries(initial.map(payload => [payload.chapter.id, payload])))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)
  const [pendingHash, setPendingHash] = useState("")
  const sentinel = useRef<HTMLDivElement>(null)
  const cache = useRef(new Map(initial.map(payload => [payload.chapter.id, payload])))
  const inFlight = useRef(new Map<string, Promise<GuideChapterPayload>>())
  const requests = useRef(0)
  const retry = useRef<{ id: string; hash: string } | null>(null)

  const loadThrough = useCallback(async (id: string, hash = "") => {
    const target = chapters.findIndex(chapter => chapter.id === id)
    if (target < 0) return
    requests.current += 1
    setBusy(true); setError(false)
    try {
      // Keep the book continuous even when a visitor jumps ahead from Contents.
      const missing = chapters.slice(0, target + 1).filter(chapter => !cache.current.has(chapter.id))
      for (let start = 0; start < missing.length; start += 3) {
        const batch = await Promise.all(missing.slice(start, start + 3).map(chapter => {
          let request = inFlight.current.get(chapter.id)
          if (!request) {
            request = fetch(`/api/guide/chapters/${chapter.id}`).then(async response => {
              if (!response.ok) throw new Error("Chapter unavailable")
              const payload = await response.json() as GuideChapterPayload
              if (payload.chapter?.id !== chapter.id) throw new Error("Unexpected chapter")
              cache.current.set(chapter.id, payload)
              return payload
            }).finally(() => inFlight.current.delete(chapter.id))
            inFlight.current.set(chapter.id, request)
          }
          return request
        }))
        setLoaded(previous => ({ ...previous, ...Object.fromEntries(batch.map(payload => [payload.chapter.id, payload])) }))
      }
      retry.current = null
      if (hash) setPendingHash(hash)
    } catch { retry.current = { id, hash }; setError(true) }
    finally {
      // Retain successful responses even if another chapter in a batch failed.
      setLoaded(previous => ({ ...previous, ...Object.fromEntries(cache.current) }))
      requests.current -= 1
      if (!requests.current) setBusy(false)
    }
  }, [chapters])

  useEffect(() => {
    function openHash() {
      const hash = window.location.hash.slice(1)
      const id = chapterFromGuideHash(hash, previewStartChapter)
      if (chapters.some(chapter => chapter.id === id)) void loadThrough(id, hash)
    }
    openHash(); window.addEventListener("hashchange", openHash)
    return () => window.removeEventListener("hashchange", openHash)
  }, [chapters, loadThrough, previewStartChapter])

  useLayoutEffect(() => {
    if (!pendingHash) return
    const target = document.getElementById(pendingHash)
    if (!target) return
    const frame = requestAnimationFrame(() => { target.scrollIntoView({ block: "start" }); setPendingHash("") })
    return () => cancelAnimationFrame(frame)
  }, [loaded, pendingHash])

  const next = chapters.find(chapter => !loaded[chapter.id])
  useEffect(() => {
    const element = sentinel.current
    const root = element?.closest<HTMLElement>("[data-guide-scroll-viewport]")
    if (!element || !root || !next || busy || error) return
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) void loadThrough(next.id) }, { root, rootMargin: "1000px 0px" })
    observer.observe(element)
    return () => observer.disconnect()
  }, [next, busy, error, loadThrough])

  return <>
    {chapters.map(chapter => loaded[chapter.id] && <GuideChapterView key={chapter.id} payload={loaded[chapter.id]} />)}
    {next && <div ref={sentinel} className={styles.chapterLoader}><p role="status">{error ? "This chapter couldn’t open. Please try again." : busy ? "Opening the next part of the book…" : "There’s more to read."}</p><button type="button" className={styles.readButton} disabled={busy} onClick={() => void loadThrough(error && retry.current ? retry.current.id : next.id, error && retry.current ? retry.current.hash : "")}>{busy ? "Opening…" : error ? "Try again" : `Continue to ${next.title}`}</button></div>}
  </>
}
