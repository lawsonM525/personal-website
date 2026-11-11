"use client"

import { FormEvent, useState } from "react"
import styles from "./article-discussion.module.css"

export function CommentComposer({ replyingTo, onSubmit, onCancel }: {
  replyingTo?: string
  onSubmit: (message: string, website: string) => Promise<void>
  onCancel?: () => void
}) {
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const length = Array.from(message.trim()).length
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    const website = new FormData(form).get("website")?.toString() || ""
    setSending(true); setError("")
    try {
      await onSubmit(message, website)
      setMessage("")
      const field = form.elements.namedItem("message") as HTMLTextAreaElement | null
      if (field) field.style.height = ""
    }
    catch (error) { setError(error instanceof Error ? error.message : "That didn’t send. Your draft is still here.") }
    finally { setSending(false) }
  }
  return <form onSubmit={submit} className={styles.composer}>
    <label className={styles.label}><span className={replyingTo ? styles.replyLabel : styles.srOnly}>{replyingTo ? `Reply to ${replyingTo}` : "Comment"}</span><textarea name="message" value={message} onChange={event => {
      setMessage(event.target.value)
      event.target.style.height = "auto"
      event.target.style.height = `${Math.min(event.target.scrollHeight, 180)}px`
    }} required minLength={2} maxLength={4000} rows={2} className={styles.field} placeholder={replyingTo ? "Write a reply…" : "Leave a comment…"} /></label>
    <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <div className={styles.submitRow}><span className={styles.counter}>{length > 0 ? `${length.toLocaleString()} / 2,000` : ""}</span><div className={styles.postActions}>{onCancel && <button type="button" className={styles.textButton} onClick={onCancel}>Cancel</button>}<button type="submit" className={styles.submit} disabled={sending || length > 2000 || length < 2}>{sending ? "Posting…" : replyingTo ? "Post reply" : "Post comment"}</button></div></div>
    {error && <p role="alert" className={styles.error}>{error}</p>}
  </form>
}
