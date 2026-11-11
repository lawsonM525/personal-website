"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { MessageCircle } from "@/components/retro-icons"
import { ArticleLikeButton } from "./article-like-button"
import { CommentComposer } from "./comment-composer"
import { CommentGif } from "./comment-gif"
import { MemberAccount } from "@/components/member/member-account"
import { MemberAvatar } from "@/components/member/member-avatar"
import { commentReactions, commentThreads, type CommentReactionKind } from "@/lib/learn-discussion"
import type { ArticleMemberComment, FeedbackViewer } from "@/lib/feedback"
import type { LearnComment } from "@/sanity/lib/types"
import styles from "./article-discussion.module.css"

export function ArticleDiscussion({ articleId, initialComments, initialLikeCount }: { articleId: string; initialComments: LearnComment[]; initialLikeCount: number }) {
  const [viewer, setViewer] = useState<FeedbackViewer | null>(null)
  const [comments, setComments] = useState<ArticleMemberComment[]>([])
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState("")
  const [error, setError] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [reactionPicker, setReactionPicker] = useState<string | null>(null)
  const [report, setReport] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const mutation = useRef(false)
  const load = useCallback(async (signal?: AbortSignal) => {
    const response = await fetch(`/api/learn/comments?articleId=${encodeURIComponent(articleId)}`, { cache: "no-store", signal })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || "Comments couldn’t load.")
    setComments(data.comments); setLoading(false)
  }, [articleId])
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true); setReplyTo(null); setReactionPicker(null)
    load(controller.signal).catch(error => { if (error.name !== "AbortError") { setError(error.message); setLoading(false) } })
    if (new URLSearchParams(window.location.search).get("signin") === "expired") setError("That sign-in link expired or opened in a different browser. Request another one below.")
    return () => controller.abort()
  }, [load])
  async function post(body: Record<string, unknown>) {
    const response = await fetch("/api/learn/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || "That didn’t send. Try again.")
  }
  function signInPrompt() {
    setNote("Sign in with your profile to reply or react.")
    document.getElementById("article-comment-account")?.scrollIntoView({ block: "center", behavior: "instant" })
  }
  async function react(comment: ArticleMemberComment, kind: CommentReactionKind) {
    if (!viewer) { signInPrompt(); return }
    if (mutation.current) return
    mutation.current = true; setBusy(comment.id); setError("")
    const active = !comment.reactions?.find(reaction => reaction.kind === kind)?.reacted
    try { await post({ action: "react", id: comment.id, kind, active }); await load(); setReactionPicker(null) }
    catch (error) { setError(error instanceof Error ? error.message : "That reaction couldn’t save.") }
    finally { mutation.current = false; setBusy(null) }
  }
  async function remove(comment: ArticleMemberComment) {
    if (mutation.current) return
    mutation.current = true; setBusy(comment.id); setError("")
    try {
      const response = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "moderate-article", id: comment.id, decision: "hide" }) })
      const data = await response.json(); if (!response.ok) throw new Error(data.error)
      await load(); setNote("Comment removed. You can restore it from moderation.")
    } catch (error) { setError(error instanceof Error ? error.message : "Removal didn’t finish.") }
    finally { mutation.current = false; setBusy(null) }
  }
  function commentRow(comment: ArticleMemberComment, isReply = false) {
    const parent = comments.find(item => item.id === comment.parent_id)
    return <article key={comment.id} id={`comment-${comment.id}`} className={styles.comment} aria-label={`Comment by ${comment.author_name}`}>
      <div className={styles.identity}><MemberAvatar name={comment.author_name} avatar={comment.avatar} size={isReply ? 32 : 40} /><h4>{comment.author_name}</h4><time dateTime={comment.created_at}>{new Date(comment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time></div>
      {isReply && parent && <p className={styles.replyLabel}>↳ Replying to {parent.author_name}</p>}
      {comment.body && <p className={styles.body}>{comment.body}</p>}
      {comment.gif_id && <CommentGif gifId={comment.gif_id} />}
      {Boolean(comment.reactions?.length) && <div className={styles.reactionCounts} aria-label="Reactions">{comment.reactions?.map(reaction => {
        const choice = commentReactions.find(item => item.key === reaction.kind)
        return choice && <button type="button" key={reaction.kind} className={styles.reactionCount} aria-label={`${choice.label}, ${reaction.count} ${reaction.count === 1 ? "reaction" : "reactions"}`} aria-pressed={reaction.reacted} disabled={busy === comment.id} onClick={() => react(comment, reaction.kind)}><span aria-hidden="true">{choice.emoji}</span><span>{reaction.count}</span></button>
      })}</div>}
      <div className={styles.actions}>
        <button type="button" className={styles.primaryAction} aria-expanded={replyTo === comment.id} onClick={() => { setReplyTo(replyTo === comment.id ? null : comment.id); if (!viewer) signInPrompt() }}>Reply ↩</button>
        <button type="button" className={styles.primaryAction} aria-expanded={reactionPicker === comment.id} onClick={() => setReactionPicker(reactionPicker === comment.id ? null : comment.id)}>React ☺</button>
        {viewer && <button type="button" className={styles.textButton} onClick={() => setReport(report === comment.id ? null : comment.id)}>Report</button>}
        {viewer?.is_admin && <button type="button" className={styles.textButton} disabled={busy === comment.id} onClick={() => remove(comment)}>Remove</button>}
      </div>
      {reactionPicker === comment.id && <div className={styles.reactionTray} role="group" aria-label={`React to ${comment.author_name}’s comment`}>{commentReactions.map(choice => <button type="button" key={choice.key} title={choice.label} aria-label={choice.label} aria-pressed={Boolean(comment.reactions?.find(reaction => reaction.kind === choice.key)?.reacted)} disabled={busy === comment.id} onClick={() => react(comment, choice.key)}>{choice.emoji}</button>)}</div>}
      {replyTo === comment.id && viewer && <CommentComposer replyingTo={comment.author_name} onCancel={() => setReplyTo(null)} onSubmit={async (message, gifId, website) => { await post({ articleId, message, gifId, parentId: comment.id, website }); await load(); setReplyTo(null); setNote("Your reply is live.") }} />}
      {report === comment.id && viewer && <form className={styles.report} onSubmit={async event => {
        event.preventDefault(); const values = new FormData(event.currentTarget); if (mutation.current) return
        mutation.current = true; setBusy(comment.id); setError("")
        try { await post({ action: "report", id: comment.id, reason: values.get("reason"), detail: values.get("detail") }); setReport(null); setNote("Report sent. The moderation team will take a look.") }
        catch (error) { setError(error instanceof Error ? error.message : "Report couldn’t send.") }
        finally { mutation.current = false; setBusy(null) }
      }}><label className={styles.label}>Reason<select name="reason" className={styles.field}>{["Spam", "Harassment", "Other"].map(reason => <option key={reason}>{reason}</option>)}</select></label><label className={styles.label}>What should we know?<textarea name="detail" required minLength={10} maxLength={1000} rows={3} className={styles.field} /></label><div className={styles.submitRow}><button type="submit" disabled={busy === comment.id} className={styles.submit}>Send report</button><button type="button" className={styles.textButton} onClick={() => setReport(null)}>Cancel</button></div></form>}
    </article>
  }
  const count = initialComments.length + comments.length
  return <section className="learn-border mt-16 border-t-4 pt-9" aria-labelledby="discussion-heading">
    <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-black uppercase tracking-[.2em]">Discussion</p><h2 id="discussion-heading" className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">What are you thinking?</h2></div><ArticleLikeButton articleId={articleId} initialCount={initialLikeCount} /></div>
    <div className={styles.layout}><div className={styles.account} id="article-comment-account">
      <div className="flex items-center gap-2 font-black"><MessageCircle className="h-5 w-5" /> Leave a comment</div>
      <MemberAccount onChange={next => { setViewer(next); load().catch(error => setError(error.message)) }} />
      {viewer && <CommentComposer onSubmit={async (message, gifId, website) => { await post({ articleId, message, gifId, website }); await load(); setNote("Your comment is live.") }} />}
      {note && <p role="status" className={styles.note}>{note}</p>}
    </div><div className={styles.comments} aria-busy={loading}><h3 className="text-sm font-black uppercase tracking-[.16em]">{loading ? "Opening the conversation…" : `${count} ${count === 1 ? "comment" : "comments"}`}</h3>
      {commentThreads(comments).map(thread => <div key={thread.root.id}>{commentRow(thread.root)}{thread.replies.length > 0 && <div className={styles.replies}>{thread.replies.map(reply => commentRow(reply, true))}</div>}</div>)}
      {initialComments.map(comment => <article key={comment._id} className={styles.comment}><div className={styles.identity}><MemberAvatar name={comment.displayName} size={40} /><h4>{comment.displayName}</h4><time dateTime={comment.submittedAt}>{new Date(comment.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time></div><p className={styles.body}>{comment.message}</p></article>)}
      {!loading && !count && !error && <p className="learn-muted mt-5 max-w-md leading-7">No comments yet. You could be the first person with an opinion, which has never stopped the internet before.</p>}
    </div></div>
    {error && <p role="alert" className={styles.error}>{error}</p>}
  </section>
}
