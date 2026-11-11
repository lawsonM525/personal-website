"use client"

import { useEffect, useState } from "react"
import { commentGifUrl, findCommentGif } from "@/lib/learn-discussion"
import styles from "./article-discussion.module.css"

export function CommentGif({ gifId }: { gifId: string }) {
  const gif = findCommentGif(gifId)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPlaying(!motion.matches)
    const changed = () => setPlaying(!motion.matches)
    motion.addEventListener("change", changed)
    return () => motion.removeEventListener("change", changed)
  }, [gifId])
  if (!gif) return null
  return <figure className={styles.gif}>
    {/* The catalog contains bounded, verified GIFs; no arbitrary user media URLs. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={commentGifUrl(gif.id, playing)} alt={gif.label} width={200} height={160} loading="lazy" referrerPolicy="no-referrer" />
    <figcaption><button type="button" onClick={() => setPlaying(value => !value)} aria-label={`${playing ? "Pause" : "Play"} ${gif.label} GIF`}>{playing ? "Pause" : "Play"} GIF</button><a href={gif.source} target="_blank" rel="noreferrer">{gif.artist} / GIPHY ↗</a></figcaption>
  </figure>
}
