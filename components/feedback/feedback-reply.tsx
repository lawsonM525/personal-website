"use client"

import { useId, useState } from "react"
import { feedbackReplyBodySchema, feedbackRatingsSchema, type FeedbackRatings, feedbackReplyLength, feedbackReplyMinLength, feedbackReplyMaxLength } from "@/lib/feedback"
import styles from "./feedback.module.css"
import { FeedbackRatingInput } from "./feedback-ratings"

export function FeedbackReply({ busy, allowRatings = true, onSubmit }: { busy: boolean; allowRatings?: boolean; onSubmit: (body: string, ratings?: FeedbackRatings) => Promise<boolean> }) {
  const id = useId()
  const [body, setBody] = useState("")
  const [ratings, setRatings] = useState<Partial<FeedbackRatings>>({})
  const hasRatings = allowRatings && Object.keys(ratings).length > 0
  const parsedRatings = feedbackRatingsSchema.safeParse(ratings)
  const length = feedbackReplyLength(body)
  const remaining = Math.max(0, feedbackReplyMinLength - length)
  return <form className={styles.reply} onSubmit={async event => {
    event.preventDefault()
    const parsed = feedbackReplyBodySchema.safeParse(body)
    if (busy || !parsed.success || (hasRatings && !parsedRatings.success)) return
    if (await onSubmit(parsed.data, hasRatings && parsedRatings.success ? parsedRatings.data : undefined)) { setBody(""); setRatings({}) }
  }}>
    <label htmlFor={`${id}-body`}>Keep the conversation going</label>
    <div id={`${id}-ideas`} className={styles.replyIdeas}>
      <p>Not sure where to start? A few things you could talk about:</p>
      <ul>
        <li><strong>The design.</strong> What do you like about how it looks? What would you change?</li>
        <li><strong>Using it.</strong> How easy was it to use? Did anything confuse you or slow you down?</li>
        <li><strong>One useful suggestion.</strong> What would make the project better, and why?</li>
      </ul>
      <p>Use a specific moment or screen as an example. You can also ask a follow-up or explain what you changed.</p>
    </div>
    <textarea id={`${id}-body`} name="body" required minLength={feedbackReplyMinLength} maxLength={feedbackReplyMaxLength} rows={7} value={body} onChange={event => setBody(event.target.value)} aria-describedby={`${id}-ideas ${id}-count`} placeholder="I tried… The design made me think… I got stuck when… One thing that would help is…" />
    <div className={styles.replyCount} id={`${id}-count`} aria-live="polite" aria-atomic="true" data-ready={remaining === 0}>
      <span>{length.toLocaleString()} / {feedbackReplyMinLength} characters minimum</span>
      <span>{remaining ? `${remaining} more to go` : `${(feedbackReplyMaxLength - length).toLocaleString()} characters left`}</span>
    </div>
    {allowRatings && <FeedbackRatingInput value={ratings} onChange={setRatings} disabled={busy} />}
    <button type="submit" className={styles.secondary} disabled={busy || remaining > 0 || length > feedbackReplyMaxLength || (hasRatings && !parsedRatings.success)}>{busy ? "Posting…" : "Post reply"}</button>
    <small>Replies don’t earn review credits.</small>
  </form>
}
