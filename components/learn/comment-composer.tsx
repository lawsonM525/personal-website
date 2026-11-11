"use client"

import { FormEvent, useState } from "react"
import { commentGifs, commentGifUrl, type CommentGifKey } from "@/lib/learn-discussion"
import { CommentGif } from "./comment-gif"
import styles from "./article-discussion.module.css"

export function CommentComposer({ replyingTo, onSubmit, onCancel }: {
  replyingTo?: string
  onSubmit: (message: string, gifId: CommentGifKey | null, website: string) => Promise<void>
  onCancel?: () => void
}) {
  const [message, setMessage] = useState("")
  const [gifId, setGifId] = useState<CommentGifKey | null>(null)
  const [picker, setPicker] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const website = new FormData(event.currentTarget).get("website")?.toString() || ""
    setSending(true); setError("")
    try { await onSubmit(message, gifId, website); setMessage(""); setGifId(null); setPicker(false) }
    catch (error) { setError(error instanceof Error ? error.message : "That didn’t send. Your draft is still here.") }
    finally { setSending(false) }
  }
  return <form onSubmit={submit} className={styles.composer}>
    <label className={styles.label}>{replyingTo ? `Reply to ${replyingTo}` : "Comment"}<textarea name="message" value={message} onChange={event => setMessage(event.target.value)} required={!gifId} minLength={gifId ? undefined : 2} maxLength={4000} rows={replyingTo ? 3 : 5} className={styles.field} placeholder={replyingTo ? "Keep the conversation going…" : "What’s on your mind?"} /></label>
    <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    {gifId && <div className={styles.selectedGif}><CommentGif gifId={gifId} /><button type="button" className={styles.textButton} onClick={() => setGifId(null)}>Remove GIF ×</button></div>}
    <div className={styles.composerTools}><button type="button" className={styles.gifToggle} aria-expanded={picker} onClick={() => setPicker(value => !value)}><span aria-hidden="true">GIF</span> {gifId ? "Change GIF" : "Add a little drama"}</button><span className={styles.counter}>{Array.from(message.trim()).length.toLocaleString()} / 2,000</span></div>
    {picker && <div className={styles.gifPicker}><p>Say it with a GIF</p><div>{commentGifs.map(gif => <button key={gif.key} type="button" aria-label={`Choose ${gif.label} GIF`} aria-pressed={gif.key === gifId} onClick={() => { setGifId(gif.key); setPicker(false) }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={commentGifUrl(gif.id, false)} alt="" width={100} height={80} loading="lazy" referrerPolicy="no-referrer" /><span>{gif.label}</span>
    </button>)}</div><small>GIFs by their creators on GIPHY. Select one to preview.</small></div>}
    <div className={styles.submitRow}><button type="submit" className={styles.submit} disabled={sending || Array.from(message.trim()).length > 2000 || (Array.from(message.trim()).length < 2 && !gifId)}>{sending ? "Posting…" : replyingTo ? "Post reply ↗" : "Post comment ↗"}</button>{onCancel && <button type="button" className={styles.textButton} onClick={onCancel}>Cancel</button>}</div>
    {error && <p role="alert" className={styles.error}>{error}</p>}
  </form>
}
