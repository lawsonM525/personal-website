"use client"

import { FormEvent, useState } from "react"
import { ArrowUpRight } from "@/components/retro-icons"
import type { FeedbackBoard } from "@/lib/feedback"
import styles from "./feedback.module.css"

export function FeedbackModeration({ moderation, busy, onAction }: {
  moderation: FeedbackBoard["moderation"]; busy: boolean;
  onAction: (action: string, data: Record<string, unknown>) => Promise<unknown | null>;
}) {
  const [query, setQuery] = useState("")
  const projects = (moderation?.projects || []).filter(project => `${project.title} ${project.builder_name} ${project.url}`.toLowerCase().includes(query.toLowerCase().trim()))
  async function seed(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (await onAction("seed", Object.fromEntries(new FormData(form)))) form.reset()
  }
  return <section className={styles.moderation}>
    <p className={styles.eyebrow}>Michelle’s desk</p><h2>Give people the benefit of the doubt.</h2>
    <p className={styles.muted}>Projects, reviews, and replies publish immediately. Remove anything that doesn’t belong, or restore it if a takedown was a mistake.</p>
    <h3>Reports</h3>
    {moderation?.reports.length ? moderation.reports.map(item => <article className={styles.review} key={item.id}>
      <strong>{item.reason} · {item.target_kind === "comment" ? "reply" : item.target_kind}</strong><p>{item.detail}</p>
      {item.target && <div className={styles.reportContext}><strong>{item.target.project_title}</strong><p>By {item.target.author_name}</p><p>{item.target.body}</p><a href={item.target.project_url} target="_blank" rel="noopener noreferrer">Open project <ArrowUpRight size={14} /></a></div>}
      <div className={styles.heroActions}>{!["hidden", "rejected"].includes(item.target?.status || "") && <button type="button" className={styles.secondary} disabled={busy} onClick={() => onAction("moderate", { kind: item.target_kind, id: item.target_id, decision: "hide" })}>Remove reported content</button>}<button type="button" className={styles.secondary} disabled={busy} onClick={() => onAction("moderate", { kind: "report", id: item.id, decision: "resolve" })}>Dismiss report</button></div>
    </article>) : <p className={styles.muted}>No open reports.</p>}
    <h3>Projects</h3><label className={styles.moderationSearch}>Find a project<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Title, builder, or web address" /></label>
    {projects.length ? projects.map(project => <article className={styles.review} key={project.id}>
      <header><h3>{project.title}</h3><span>{project.status === "rejected" ? "Removed" : "Published"}</span></header><p>By {project.builder_name} · {project.audience}</p><p><strong>Task:</strong> {project.task}</p>
      <a href={project.url} target="_blank" rel="noopener noreferrer">Open project <ArrowUpRight size={14} /></a>
      <div className={styles.heroActions}><button type="button" className={styles.secondary} disabled={busy} onClick={() => onAction("moderate", { kind: "project", id: project.id, decision: project.status === "rejected" ? "restore" : "hide" })}>{project.status === "rejected" ? "Restore project" : "Remove project"}</button></div>
    </article>) : <p className={styles.muted}>{query ? "No projects match that search." : "No projects have been submitted yet."}</p>}
    {!!moderation?.hidden?.length && <><h3>Removed reviews & replies</h3>{moderation.hidden.map(item => <article className={styles.review} key={`${item.kind}:${item.id}`}><strong>{item.project_title} · {item.kind === "comment" ? "Reply" : "Review"} by {item.author_name}</strong><p>{item.body}</p><div className={styles.heroActions}><button type="button" className={styles.secondary} disabled={busy} onClick={() => onAction("moderate", { kind: item.kind, id: item.id, decision: "restore" })}>Restore {item.kind === "comment" ? "reply" : "review"}</button></div></article>)}</>}
    <h3>Article comment reports</h3>
    {moderation?.discussion?.reports.length ? moderation.discussion.reports.map(report => <article className={styles.review} key={report.id}><strong>{report.reason} · {report.article_title}</strong><p>{report.detail}</p><p>Comment by {report.author_name}: {report.body}</p><div className={styles.heroActions}><button type="button" className={styles.secondary} disabled={busy} onClick={() => onAction("moderate-article", { id: report.comment_id, decision: "hide" })}>Remove comment</button><button type="button" className={styles.secondary} disabled={busy} onClick={() => onAction("moderate-article", { id: report.id, decision: "resolve" })}>Dismiss report</button></div></article>) : <p className={styles.muted}>No open article reports.</p>}
    <h3>Article comments</h3>
    {moderation?.discussion?.comments.length ? moderation.discussion.comments.map(comment => <article className={styles.review} key={comment.id}><header><strong>{comment.author_name} · {comment.article_title}</strong><span>{comment.status === "hidden" ? "Removed" : "Published"}</span></header><p>{comment.body}</p><div className={styles.heroActions}><a href={`/learn/${comment.article_slug}#discussion-heading`}>Open article <ArrowUpRight size={14} /></a><button type="button" className={styles.secondary} disabled={busy} onClick={() => onAction("moderate-article", { id: comment.id, decision: comment.status === "hidden" ? "restore" : "hide" })}>{comment.status === "hidden" ? "Restore comment" : "Remove comment"}</button></div></article>) : <p className={styles.muted}>No article comments yet.</p>}
    <h3>Start the pilot</h3><p className={styles.muted}>Give an invited builder three review credits for a starter request. They must sign in first; this can’t be granted twice.</p>
    <form className={styles.seed} onSubmit={seed}><label>Invited builder’s email<input type="email" name="email" required /></label><button type="submit" className={styles.secondary} disabled={busy}>Grant starter request</button></form>
  </section>
}
