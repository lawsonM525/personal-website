"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { Heart } from "@/components/retro-icons"
import styles from "./article-like-button.module.css"

const heartFlights = [
  [-28, -24, -22], [-14, -39, -12], [8, -43, 8], [29, -27, 23], [35, -7, 32], [-34, -4, -32],
]

export function ArticleLikeButton({ articleId, initialCount }: { articleId: string; initialCount: number }) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(initialCount)
  const [ready, setReady] = useState(false)
  const [saving, setSaving] = useState(false)
  const [note, setNote] = useState("")
  const [celebration, setCelebration] = useState(0)
  const inFlight = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    setReady(false); setLiked(false); setCount(initialCount); setCelebration(0)
    fetch(`/api/learn/like?articleId=${encodeURIComponent(articleId)}`, { cache: "no-store", signal: controller.signal })
      .then(async response => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || "Likes couldn’t load. Please try again later.")
        setLiked(data.liked); setCount(data.count); setReady(data.enabled)
        setNote(data.enabled ? "" : "Likes are temporarily unavailable.")
      }).catch(error => { if (error.name !== "AbortError") setNote(error.message) })
    return () => controller.abort()
  }, [articleId, initialCount])

  async function toggle() {
    if (!ready || inFlight.current) return
    inFlight.current = true; setSaving(true); setNote("")
    try {
      const response = await fetch("/api/learn/like", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ articleId, liked: !liked }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Your like couldn’t save. Please try again.")
      setLiked(data.liked); setCount(data.count)
      if (data.liked) setCelebration(value => value + 1)
      setNote(data.liked ? "Thanks for the love!" : "Like removed.")
    } catch (error) { setNote(error instanceof Error ? error.message : "The like button couldn’t connect.") }
    finally { inFlight.current = false; setSaving(false) }
  }

  return <div className={styles.group}>
    <button type="button" onClick={toggle} aria-pressed={liked} aria-busy={saving} aria-label={`${liked ? "Unlike" : "Like"} this article, ${count} ${count === 1 ? "like" : "likes"}`} disabled={!ready || saving} className={styles.button}>
      <span key={celebration} className={styles.visual} data-celebrate={liked && celebration > 0 || undefined} aria-hidden="true">
        <Heart className={styles.heart} data-liked={liked} size={18} />
        {liked && celebration > 0 && <span className={styles.burst}>{heartFlights.map(([x, y, turn], index) => <Heart key={index} className={styles.flyingHeart} size={12} style={{ "--heart-x": `${x}px`, "--heart-y": `${y}px`, "--heart-turn": `${turn}deg`, "--heart-delay": `${index * 18}ms` } as CSSProperties} />)}</span>}
      </span>
      <span>{saving ? "Saving…" : liked ? "Liked" : "Like"}</span>
      <span className={`learn-muted ${styles.count}`} aria-hidden="true">{count}</span>
    </button>
    <p role="status" className={styles.note}>{note}</p>
  </div>
}
