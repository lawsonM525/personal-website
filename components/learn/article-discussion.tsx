"use client"

import { FormEvent, useEffect, useState } from "react"
import { Heart, MessageCircle } from "@/components/retro-icons"
import { MemberAccount } from "@/components/member/member-account"
import { MemberAvatar } from "@/components/member/member-avatar"
import type { ArticleMemberComment, FeedbackViewer } from "@/lib/feedback"
import type { LearnComment } from "@/sanity/lib/types"

export function ArticleDiscussion({ articleId, initialComments, initialLikeCount }: { articleId: string; initialComments: LearnComment[]; initialLikeCount: number }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [likeNote, setLikeNote] = useState("")
  const [viewer, setViewer] = useState<FeedbackViewer | null>(null)
  const [comments, setComments] = useState<ArticleMemberComment[]>([])
  const [sending, setSending] = useState(false)
  const [note, setNote] = useState("")
  const [error, setError] = useState("")
  const [report, setReport] = useState<string | null>(null)
  const fieldClass = "learn-surface learn-border mt-2 w-full border-2 px-3 py-2.5 font-normal outline-none focus:ring-4 focus:ring-[#7557ff]/35"
  async function load(signal?: AbortSignal) {
    const response = await fetch(`/api/learn/comments?articleId=${encodeURIComponent(articleId)}`, { cache: "no-store", signal })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || "Comments couldn’t load.")
    setComments(data.comments)
  }
  useEffect(() => {
    try { setLiked(window.localStorage.getItem(`mc-liked:${articleId}`) === "yes") } catch { /* Browsers can disable local storage. */ }
    const controller = new AbortController()
    load(controller.signal).catch(error => { if (error.name !== "AbortError") setError(error.message) })
    if (new URLSearchParams(window.location.search).get("signin") === "expired") setError("That sign-in link expired or opened in a different browser. Request another one below.")
    return () => controller.abort()
  }, [articleId])
  async function toggleLike() {
    setLikeNote("")
    try {
      const response = await fetch("/api/learn/like", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ articleId }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "The like button is having a moment.")
      setLiked(data.liked); setLikeCount(data.count)
      try { window.localStorage.setItem(`mc-liked:${articleId}`, data.liked ? "yes" : "no") } catch { /* Liking does not require browser storage. */ }
    } catch (error) { setLikeNote(error instanceof Error ? error.message : "The like button couldn’t connect.") }
  }
  async function post(body: Record<string, unknown>) {
    const response = await fetch("/api/learn/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || "That didn’t send. Try again.")
  }
  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const element = event.currentTarget; const form = new FormData(element)
    setError(""); setNote(""); setSending(true)
    try { await post({ articleId, message: form.get("message"), website: form.get("website") }); element.reset(); setNote("Your comment is live."); await load() }
    catch (error) { setError(error instanceof Error ? error.message : "Your comment couldn’t send.") }
    finally { setSending(false) }
  }
  return <section className="learn-border mt-16 border-t-4 pt-9" aria-labelledby="discussion-heading">
    <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-black uppercase tracking-[.2em]">Discussion</p><h2 id="discussion-heading" className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">What are you thinking?</h2></div><button type="button" onClick={toggleLike} aria-pressed={liked} className={`learn-border learn-surface learn-shadow-sm inline-flex items-center gap-2 border-2 px-4 py-3 font-black ${liked ? "text-[#7557ff]" : ""}`}><Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />{likeCount} {likeCount === 1 ? "like" : "likes"}</button></div>
    {likeNote && <p role="status" className="learn-muted mt-3 text-sm">{likeNote}</p>}
    <div className="mt-9 grid gap-10 lg:grid-cols-[.9fr_1.1fr]"><div className="learn-surface learn-border learn-shadow-sm self-start border-2 p-5 sm:p-6">
      <div className="flex items-center gap-2 font-black"><MessageCircle className="h-5 w-5" /> Leave a comment</div>
      <MemberAccount onChange={next => { setViewer(next); load().catch(error => setError(error.message)) }} />
      {viewer && <form onSubmit={submitComment}><label className="mt-4 block text-sm font-bold">Comment<textarea name="message" required minLength={2} maxLength={2000} rows={5} className={`${fieldClass} resize-y`} /></label><label className="absolute -left-[9999px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button type="submit" disabled={sending} className="learn-border mt-4 border-2 bg-[#d7ff45] px-5 py-2.5 font-black text-black disabled:opacity-50">{sending ? "Posting…" : "Post comment"}</button></form>}
      {note && <p role="status" className="mt-4 font-bold text-[#7557ff]">{note}</p>}{error && <p role="alert" className="mt-4 font-bold text-red-700">{error}</p>}
    </div><div><h3 className="text-sm font-black uppercase tracking-[.16em]">{initialComments.length + comments.length} {initialComments.length + comments.length === 1 ? "comment" : "comments"}</h3>
      <div className="learn-divider mt-4 divide-y">{comments.map(comment => <article key={comment.id} className="py-5"><div className="flex items-center gap-3"><MemberAvatar name={comment.author_name} avatar={comment.avatar} size={40} /><h4 className="font-black">{comment.author_name}</h4><time dateTime={comment.created_at} className="learn-muted ml-auto text-xs">{new Date(comment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time></div><p className="learn-muted mt-2 whitespace-pre-wrap break-words leading-7">{comment.body}</p>{viewer && <div className="mt-2 flex gap-4 text-xs"><button type="button" className="underline" onClick={() => setReport(report === comment.id ? null : comment.id)}>Report comment</button>{viewer.is_admin && <button type="button" className="underline" disabled={sending} onClick={async () => { setSending(true); setError(""); try { const response = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "moderate-article", id: comment.id, decision: "hide" }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error); await load(); setNote("Comment removed. You can restore it from moderation.") } catch (error) { setError(error instanceof Error ? error.message : "Removal didn’t finish.") } finally { setSending(false) } }}>Remove comment</button>}</div>}{report === comment.id && viewer && <form className="learn-surface learn-border mt-4 border p-4" onSubmit={async event => { event.preventDefault(); const values = new FormData(event.currentTarget); setSending(true); setError(""); try { await post({ action: "report", id: comment.id, reason: values.get("reason"), detail: values.get("detail") }); setReport(null); setNote("Report sent. The moderation team will take a look.") } catch (error) { setError(error instanceof Error ? error.message : "Report couldn’t send.") } finally { setSending(false) } }}><label className="block text-sm font-bold">Reason<select name="reason" className={fieldClass}>{["Spam", "Harassment", "Other"].map(reason => <option key={reason}>{reason}</option>)}</select></label><label className="mt-3 block text-sm font-bold">What should we know?<textarea name="detail" required minLength={10} maxLength={1000} rows={3} className={fieldClass} /></label><button type="submit" disabled={sending} className="learn-border mt-3 border-2 px-3 py-2 font-bold">Send report</button><button type="button" className="ml-4 underline" onClick={() => setReport(null)}>Cancel</button></form>}</article>)}
      {initialComments.map(comment => <article key={comment._id} className="py-5"><div className="flex items-center gap-3"><MemberAvatar name={comment.displayName} size={40} /><h4 className="font-black">{comment.displayName}</h4><time dateTime={comment.submittedAt} className="learn-muted ml-auto text-xs">{new Date(comment.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time></div><p className="learn-muted mt-2 whitespace-pre-wrap break-words leading-7">{comment.message}</p></article>)}</div>
      {!initialComments.length && !comments.length && <p className="learn-muted mt-5 max-w-md leading-7">No comments yet. You could be the first person with an opinion, which has never stopped the internet before.</p>}
    </div></div>
  </section>
}
