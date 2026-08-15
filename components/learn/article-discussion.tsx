"use client"

import { FormEvent, useEffect, useState } from "react"
import { Heart, MessageCircle } from "lucide-react"
import type { LearnComment } from "@/sanity/lib/types"

export function ArticleDiscussion({
  articleId,
  initialComments,
  initialLikeCount,
}: {
  articleId: string
  initialComments: LearnComment[]
  initialLikeCount: number
}) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [likeNote, setLikeNote] = useState("")
  const [commentState, setCommentState] = useState<"idle" | "sending" | "sent">("idle")
  const [commentError, setCommentError] = useState("")

  useEffect(() => {
    setLiked(window.localStorage.getItem(`mc-liked:${articleId}`) === "yes")
  }, [articleId])

  async function toggleLike() {
    setLikeNote("")
    const response = await fetch("/api/learn/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId }),
    })
    const data = await response.json()
    if (!response.ok) {
      setLikeNote(data.error || "The like button is having a moment.")
      return
    }
    setLiked(data.liked)
    setLikeCount(data.count)
    window.localStorage.setItem(`mc-liked:${articleId}`, data.liked ? "yes" : "no")
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCommentError("")
    setCommentState("sending")
    const form = new FormData(event.currentTarget)
    const response = await fetch("/api/learn/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleId,
        displayName: form.get("displayName"),
        email: form.get("email"),
        message: form.get("message"),
        website: form.get("website"),
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      setCommentError(data.error || "Your comment did not send. Try again.")
      setCommentState("idle")
      return
    }
    event.currentTarget.reset()
    setCommentState("sent")
  }

  return (
    <section className="learn-border mt-16 border-t-4 pt-9" aria-labelledby="discussion-heading">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[.2em]">Discussion</p>
          <h2 id="discussion-heading" className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">What are you thinking?</h2>
        </div>
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          className={`learn-border learn-surface learn-shadow-sm inline-flex items-center gap-2 border-2 px-4 py-3 font-black transition-transform hover:-translate-y-0.5 ${liked ? "text-[#7557ff]" : ""}`}
        >
          <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </button>
      </div>
      {likeNote && <p role="status" className="learn-muted mt-3 text-sm">{likeNote}</p>}

      <div className="mt-9 grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <form onSubmit={submitComment} className="learn-surface learn-border learn-shadow-sm border-2 p-5 sm:p-6">
          <div className="flex items-center gap-2 font-black"><MessageCircle className="h-5 w-5" /> Leave a comment</div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-bold">
              Name
              <input name="displayName" required maxLength={60} className="learn-surface learn-border mt-2 w-full border-2 px-3 py-2.5 font-normal outline-none focus:ring-4 focus:ring-[#7557ff]/35" />
            </label>
            <label className="text-sm font-bold">
              Email <span className="learn-muted font-normal">(never shown)</span>
              <input name="email" type="email" required maxLength={254} className="learn-surface learn-border mt-2 w-full border-2 px-3 py-2.5 font-normal outline-none focus:ring-4 focus:ring-[#7557ff]/35" />
            </label>
          </div>
          <label className="mt-4 block text-sm font-bold">
            Comment
            <textarea name="message" required minLength={2} maxLength={2000} rows={5} className="learn-surface learn-border mt-2 w-full resize-y border-2 px-3 py-2.5 font-normal outline-none focus:ring-4 focus:ring-[#7557ff]/35" />
          </label>
          <label className="absolute -left-[9999px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <button type="submit" disabled={commentState === "sending"} className="learn-border mt-4 border-2 bg-[#d7ff45] px-5 py-2.5 font-black text-black disabled:opacity-50">
            {commentState === "sending" ? "Sending…" : "Post comment"}
          </button>
          <p className="learn-muted mt-3 text-xs leading-5">Comments appear after Michelle approves them.</p>
          {commentState === "sent" && <p role="status" className="mt-4 font-bold text-[#7557ff]">sent. it’s waiting for Michelle’s approval.</p>}
          {commentError && <p role="alert" className="mt-4 font-bold text-red-600">{commentError}</p>}
        </form>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[.16em]">{initialComments.length} {initialComments.length === 1 ? "comment" : "comments"}</h3>
          {initialComments.length ? (
            <div className="learn-divider mt-4 divide-y">
              {initialComments.map((comment) => (
                <article key={comment._id} className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h4 className="font-black">{comment.displayName}</h4>
                    <time dateTime={comment.submittedAt} className="learn-muted text-xs">
                      {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(comment.submittedAt))}
                    </time>
                  </div>
                  <p className="learn-muted mt-2 whitespace-pre-wrap leading-7">{comment.message}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="learn-muted mt-5 max-w-md leading-7">No comments yet. You could be the first person with an opinion, which has never stopped the internet before.</p>
          )}
        </div>
      </div>
    </section>
  )
}
