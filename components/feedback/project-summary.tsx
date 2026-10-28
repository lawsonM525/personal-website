"use client"

import { useState } from "react"
import { feedbackSummarySchema } from "@/lib/feedback"
import styles from "./project-summary.module.css"

export function ProjectSummaryEditor({ summary, busy, onSave }: { summary?: string | null; busy: boolean; onSave: (summary: string) => Promise<boolean> }) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(summary || "")
  const [error, setError] = useState("")
  return <div className={styles.editor}>{!open ? <button type="button" onClick={() => { setDraft(summary || ""); setError(""); setOpen(true) }}>{summary ? "Edit project summary" : "Add project summary"}</button> : <form onSubmit={async event => {
    event.preventDefault()
    const parsed = feedbackSummarySchema.safeParse(draft)
    if (!parsed.success) { setError(parsed.error.issues[0].message); return }
    if (await onSave(parsed.data)) setOpen(false)
  }}>
    <label>Brief project summary<input value={draft} onChange={event => { setDraft(event.target.value); setError("") }} required minLength={15} maxLength={180} disabled={busy} placeholder="A study planner that turns exam dates into a weekly plan." /><small>One sentence about what it does. This appears on your gallery card.</small></label>
    <p className={styles.count}>{draft.length}/180</p>
    {error && <p role="alert" className={styles.error}>{error}</p>}
    <div className={styles.actions}><button type="submit" disabled={busy}>{busy ? "Saving…" : "Save summary"}</button><button type="button" disabled={busy} onClick={() => setOpen(false)}>Cancel</button></div>
  </form>}</div>
}
