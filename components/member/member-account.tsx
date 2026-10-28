"use client"
import { useEffect, useState } from "react"
import type { FeedbackViewer } from "@/lib/feedback"
import { memberReturnPath, type AvatarConfig } from "@/lib/member/avatar"
import { AvatarEditor } from "./avatar-editor"
import { MemberAvatar } from "./member-avatar"
import styles from "./member.module.css"

export function MemberAccount({ viewer: suppliedViewer, onChange, compact = false, variant = "default" }: { viewer?: FeedbackViewer | null; onChange?: (viewer: FeedbackViewer | null) => void; compact?: boolean; variant?: "default" | "builder-card" }) {
  const [viewer, setViewer] = useState<FeedbackViewer | null>(suppliedViewer || null)
  const [editor, setEditor] = useState(false)
  const [signin, setSignin] = useState(false)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(suppliedViewer === undefined)
  const [error, setError] = useState("")
  const [note, setNote] = useState("")
  function changed(next: FeedbackViewer | null) { setViewer(next); onChange?.(next) }
  useEffect(() => {
    if (suppliedViewer !== undefined) { setViewer(suppliedViewer); return }
    const controller = new AbortController()
    fetch("/api/member", { cache: "no-store", signal: controller.signal }).then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error); changed(data.viewer) }).catch(error => { if (error.name !== "AbortError") setError("Your profile couldn’t load. Refresh to try again.") }).finally(() => setLoading(false))
    return () => controller.abort()
  }, [suppliedViewer]) // onChange is a notification, not a fetch dependency.
  async function save(name: string, avatar: AvatarConfig) {
    const response = await fetch("/api/member", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, avatar }) })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || "Your portrait couldn’t save.")
    changed(data.viewer); setNote("Portrait saved. Looking very you.")
  }
  return <div>
    {loading ? <p className={styles.note}>Opening your profile…</p> : viewer ? <div className={`${styles.account} ${variant === "builder-card" ? styles.cardAccount : ""}`}><MemberAvatar name={viewer.display_name} avatar={viewer.avatar} size={variant === "builder-card" ? 56 : 40} /><strong>{viewer.display_name}</strong><button type="button" onClick={() => { setEditor(true); setNote("") }}>{viewer.avatar ? "Edit portrait" : "Make your portrait"}</button>{!compact && <button type="button" disabled={busy} onClick={async () => { setBusy(true); setError(""); try { const response = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) }); if (!response.ok) throw new Error(); changed(null) } catch { setError("Sign-out didn’t finish. Try again.") } finally { setBusy(false) } }}>Sign out</button>}</div> : <div className={styles.account}><button type="button" onClick={() => setSignin(current => !current)}>Sign in to comment & make a portrait</button></div>}
    {signin && !viewer && <form className={styles.signin} onSubmit={async event => {
      event.preventDefault(); setBusy(true); setError(""); const form = new FormData(event.currentTarget)
      try {
        const response = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "signin", name: form.get("name"), email: form.get("email"), returnTo: memberReturnPath(window.location.pathname) }) })
        const data = await response.json(); if (!response.ok) throw new Error(data.error || "That sign-in link couldn’t send."); setSent(true)
      } catch (error) { setError(error instanceof Error ? error.message : "That sign-in link couldn’t send.") } finally { setBusy(false) }
    }}><p>One profile for your comments, reviews, and projects. Your email stays private.</p><label>Public name<input name="name" required minLength={2} maxLength={60} autoComplete="nickname" /></label><label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" /></label><button type="submit" disabled={busy}>{busy ? "Sending…" : sent ? "Send another link" : "Email me a sign-in link"}</button>{sent && <p role="status">Check your inbox. Open the sign-in link in this browser, and you’ll come back here.</p>}<small>No password to remember.</small></form>}
    {editor && viewer && <AvatarEditor viewer={viewer} onClose={() => setEditor(false)} onSave={save} />}
    {note && <p className={styles.note} role="status">{note}</p>}{error && <p role="alert" className={styles.error}>{error}</p>}
  </div>
}
