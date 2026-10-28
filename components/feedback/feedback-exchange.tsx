"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { ArrowUpRight, ChevronLeft, Flag, FolderOpen, Sparkles } from "@/components/retro-icons"
import { feedbackCategories, feedbackExample, feedbackProjectSchema, feedbackReviewSchema, prioritizeFeedback, type FeedbackBoard as FeedbackBoardData, type FeedbackProject } from "@/lib/feedback"
import { FeedbackBoard, ProjectPreview } from "./feedback-board"
import { ProjectSummaryEditor } from "./project-summary"
import { ProjectCover, ProjectCoverEditor, uploadProjectCover } from "./project-cover"
import { ReviewForm, PublishedReview, HelpfulReviewers, type ReviewDraft } from "./structured-review"
import { FeedbackModeration } from "./feedback-moderation"
import { feedbackConceptProjects, isFeedbackExample } from "@/lib/feedback-examples"
import { FeedbackSidebar } from "./feedback-sidebar"
import { FeedbackReply } from "./feedback-reply"
import { FeedbackRatingSummary } from "./feedback-ratings"
import layout from "./feedback-layout.module.css"
import { MemberAvatar } from "@/components/member/member-avatar"
import styles from "./feedback.module.css"
import { toast } from "@/components/ui/use-toast"

const empty: FeedbackBoardData = { configured: false, projects: [], reviews: [], comments: [], viewer: null }
type Panel = "board" | "signin" | "submit" | "project" | "moderation" | "how"
type ReportTarget = { kind: "project" | "review" | "comment"; id: string; label: string }
function fields(event: FormEvent<HTMLFormElement>) { return Object.fromEntries(new FormData(event.currentTarget)) }
function notify(description: string) { toast({ description, duration: 5000, className: styles.notification }) }
function shortDate(value: string) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(value)) }

export function FeedbackExchange() {
  const [board, setBoard] = useState<FeedbackBoardData>(empty)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [coverImage, setCoverImage] = useState<Blob | null>(null)
  const [uploading, setUploading] = useState(false)
  const uploadedCover = useRef<{ image: Blob; id: string } | null>(null)
  const [error, setError] = useState("")
  const [panel, setPanel] = useState<Panel>("board")
  const [filter, setFilter] = useState("Waiting for feedback")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<FeedbackProject | null>(null)
  const [example, setExample] = useState(false)
  const [demoReview, setDemoReview] = useState<ReviewDraft | null>(null)
  const [demoRequest, setDemoRequest] = useState<FeedbackProject | null>(null)
  const [report, setReport] = useState<ReportTarget | null>(null)
  const [auth, setAuth] = useState({ name: "", email: "", sent: false })
  const panelTop = useRef<HTMLDivElement>(null)
  const reportPanel = useRef<HTMLElement>(null)
  const viewer = board.viewer
  const cost = board.submission_cost ?? 3

  async function load() {
    const response = await fetch("/api/feedback", { cache: "no-store" })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || "The exchange couldn’t load.")
    setBoard(data)
    return data as FeedbackBoardData
  }
  useEffect(() => {
    const signIn = new URLSearchParams(window.location.search).get("signin")
    if (signIn === "expired") { setPanel("signin"); setError("That sign-in link expired or was opened in another browser. Request a new one here.") }
    load().catch(error => setError(error.message)).finally(() => setLoading(false))
  }, [])
  useEffect(() => { if (panel !== "board") panelTop.current?.focus({ preventScroll: true }) }, [panel])
  useEffect(() => { if (error) panelTop.current?.scrollIntoView({ behavior: "instant", block: "start" }) }, [error])
  useEffect(() => { if (report) { setError(""); reportPanel.current?.scrollIntoView({ behavior: "instant", block: "start" }) } }, [report])
  function show(next: Panel) { setPanel(next); setError(""); setReport(null); requestAnimationFrame(() => panelTop.current?.scrollIntoView({ behavior: "instant", block: "start" })) }
  async function send(action: string, data: Record<string, unknown> = {}) {
    setBusy(true); setError("")
    try {
      const response = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, action }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "That didn’t send. Try again.")
      const fresh = action === "signin" ? null : await load()
      return { ...result, board: fresh }
    } catch (error) { setError(error instanceof Error ? error.message : "That didn’t send. Try again."); return null }
    finally { setBusy(false) }
  }
  async function saveCover(image: Blob) {
    if (uploadedCover.current?.image === image) return uploadedCover.current.id
    const id = await uploadProjectCover(image)
    uploadedCover.current = { image, id }
    return id
  }
  async function moderationAction(action: string, data: Record<string, unknown>) {
    const result = await send(action, data)
    if (result) notify(action === "seed" ? "That builder now has starter review credits." : data.decision === "hide" ? "Removed from public view. You can restore it from moderation." : data.decision === "restore" ? "Restored to the exchange." : data.decision === "resolve" ? "Report dismissed. The content stays published." : "Updated.")
    return result
  }
  async function nextReview() {
    if (!board.configured) { setExample(true); setSelected(feedbackExample); show("project"); return }
    if (!viewer) { show("signin"); return }
    const result = await send("assign")
    if (result) {
      const fresh = result.board as FeedbackBoardData
      const project = fresh.projects.find(project => project.id === result.result)
      if (project) { setExample(false); setSelected(project); show("project") }
    }
  }
  function open(project: FeedbackProject) { setExample(isFeedbackExample(project)); setDemoReview(null); setSelected(project); show("project") }
  const samples = !loading && board.projects.length === 0 && filter !== "My requests" && filter !== "Michelle’s picks"
  const projectPool = (filter === "My requests" ? [...(viewer?.own_projects || []), ...(demoRequest ? [demoRequest] : [])] : samples ? feedbackConceptProjects : board.projects)
  const projects = (filter === "All apps" ? [...projectPool].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)) : prioritizeFeedback(projectPool))
    .filter(project => (filter !== "Michelle’s picks" || project.featured) && `${project.title} ${project.summary || ""} ${project.audience} ${project.category}`.toLowerCase().includes(query.toLowerCase().trim()))
  const current = selected && (board.projects.find(project => project.id === selected.id) || viewer?.own_projects.find(project => project.id === selected.id) || board.moderation?.projects.find(project => project.id === selected.id) || selected)
  const reviews = board.reviews.filter(review => review.project_id === current?.id)
  const comments = board.comments.filter(comment => comment.project_id === current?.id)
  const canReview = example || Boolean(viewer && current && viewer.assignment?.project_id === current.id)

  return <main className={`${styles.page} ${layout.workspace}`} data-feedback-exchange>
    <FeedbackSidebar active={panel === "how" ? "how" : panel === "board" ? filter === "Michelle’s picks" ? "picks" : filter === "My requests" ? "requests" : "browse" : null} viewer={viewer} busy={busy} onBrowse={() => { setFilter("Waiting for feedback"); show("board") }} onPicks={() => { setFilter("Michelle’s picks"); show("board") }} onRequests={() => { if (!viewer && board.configured) { show("signin"); return } setFilter("My requests"); show("board") }} onHow={() => show("how")} onSignIn={() => show("signin")} onNextReview={nextReview} onModeration={() => show("moderation")} onSignOut={() => { void send("logout") }} onViewerChange={next => { setBoard(current => ({ ...current, viewer: next })); load().catch(error => setError(error.message)) }} />
    <div className={layout.content}>
    <header className={`${styles.hero} ${layout.hero}`}>
      <img className={styles.eyes} src="/feedback/fresh-eyes.webp" width="150" height="100" alt="" />
      <div className={styles.heroCopy}><h1>Good projects need fresh eyes.</h1><p>Make your ideas real. Get feedback &amp; Help someone make their project better.</p></div>
      <button type="button" className={styles.submitProject} onClick={() => show(board.configured && !viewer ? "signin" : "submit")}><FolderOpen size={32} />Submit your project</button>
      <div className={styles.creditMeter}><span>{loading ? "Opening the exchange…" : cost === 0 ? `${board.launch_remaining ?? 10} free spots left · No reviews needed to start` : `${viewer?.credits || 0} / 3 review credits`}</span>{!loading && cost > 0 && <progress max={3} value={Math.min(3, Math.max(0, viewer?.credits || 0))} aria-label={`${viewer?.credits || 0} of 3 review credits`} />}</div>
    </header>

    {!loading && !board.configured && <aside className={styles.previewNote}><Sparkles size={18} /><div><strong>Pilot preview</strong><p>We’re getting ready for the first builders. Try the example and draft a request; nothing is posted publicly or saved yet.</p></div></aside>}
    <div ref={panelTop} tabIndex={-1} className={styles.panelTop} />
    {panel !== "board" && <button type="button" className={styles.back} onClick={() => show("board")}><ChevronLeft size={15} />Back to the exchange</button>}
    {error && <div role="alert" className={styles.error}>{error}<button type="button" onClick={() => setError("")} aria-label="Dismiss error">×</button></div>}
    {panel === "board" && <FeedbackBoard projects={projects} loading={loading} filter={filter} query={query} samples={samples} onFilter={setFilter} onQuery={setQuery} onReview={open} onNextReview={nextReview} />}{panel === "board" && !loading && <HelpfulReviewers reviewers={board.reviewers} />}
    {panel === "signin" && <section className={styles.formPanel}><p className={styles.eyebrow}>A name behind the feedback</p><h2>Join the exchange.</h2><p>Your public name appears on your reviews. Your email stays private.</p>{!board.configured && <p className={styles.inlineNote}>Sign-in opens with the pilot. You can explore the example now.</p>}<form onSubmit={async event => { event.preventDefault(); if (!board.configured) return; const data = fields(event); const next = { name: String(data.name), email: String(data.email), sent: true }; if (await send("signin", next)) { setAuth(next) } }}>{auth.sent && <p className={styles.signInStatus} role="status">Check your inbox for a sign-in link. Open it in this browser to finish joining.</p>}<label>Public name<input name="name" required minLength={2} maxLength={60} autoComplete="nickname" defaultValue={auth.name} /></label><label>Email<input name="email" required type="email" autoComplete="email" defaultValue={auth.email} /></label><button type="submit" className={styles.primary} disabled={busy || !board.configured}>{busy ? "One moment…" : auth.sent ? "Send another sign-in link" : "Email me a sign-in link"}</button><p className={styles.finePrint}>No password to remember. Sign-in links work in the browser where you requested them.</p></form></section>}
    {panel === "submit" && <section className={styles.formPanel}><p className={styles.eyebrow}>{board.configured ? "Your turn" : "Draft a request · preview only"}</p><h2>What are you building?</h2><p>Give someone a real task to try. “Can you create your first study plan?” gets better feedback than “Thoughts?”</p>{board.configured && (viewer?.credits || 0) < cost && <div className={styles.inlineNote}>You need three review credits to submit. <button type="button" onClick={nextReview}>Review next app <ArrowUpRight size={13} /></button></div>}<form onSubmit={async event => { event.preventDefault(); const data = fields(event); const parsed = feedbackProjectSchema.safeParse(data); if (!parsed.success) { setError(parsed.error.issues[0].message); return } if (!board.configured) { const request = { ...parsed.data, id: "preview-request", owner_id: "example", builder_name: "Your preview", status: "approved" as const, featured: false, created_at: new Date().toISOString(), review_count: 0 }; setDemoRequest(request); setDemoReview(null); setSelected(request); setExample(true); show("project"); notify("This is your request preview. It hasn’t been posted or saved."); return } if (!coverImage) { setError("Add a screenshot or cover image so people can see what you’ve made."); return } setUploading(true); try { const coverId = await saveCover(coverImage); if (await send("submit", { ...parsed.data, coverId })) { setCoverImage(null); uploadedCover.current = null; show("board"); setFilter("My requests"); notify("Your project is live in the feedback exchange.") } } catch (error) { setError(error instanceof Error ? error.message : "Your image couldn’t be uploaded. Try again.") } finally { setUploading(false) } }}><div className={styles.twoFields}><label>App name<input name="title" required minLength={3} maxLength={80} placeholder="Give your build a name" /></label><label>Kind of build<select name="category">{feedbackCategories.map(category => <option key={category}>{category}</option>)}</select></label></div><label>Brief project summary<input name="summary" required minLength={15} maxLength={180} placeholder="A study planner that turns exam dates into a weekly plan." /><small>One sentence about what it does. This appears under your project in the gallery.</small></label><label>Public app link<input name="url" type="url" required maxLength={2048} placeholder="https://your-app.com" /><small>A public demo or app-store page. No private invites, passwords, or access tokens.</small></label><ProjectCover onChange={setCoverImage} disabled={busy || uploading} required={board.configured} /><label>Who is it for?<textarea name="audience" rows={2} required minLength={12} maxLength={250} placeholder="Students who want to plan their week without a giant spreadsheet." /></label><label>One thing to try<textarea name="task" rows={3} required minLength={20} maxLength={500} placeholder="Create a study plan for an exam next Friday. Can you work out what to do first?" /></label><label>Where would fresh eyes help most?<textarea name="focus" rows={3} required minLength={12} maxLength={500} placeholder="The first screen, how the navigation feels, or where you got stuck…" /></label><button type="submit" className={styles.primary} disabled={busy || uploading || (board.configured && (!viewer || viewer.credits < cost || !coverImage))}>{uploading ? "Uploading image…" : busy ? "Sending…" : board.configured ? cost === 0 ? "Submit my project · free" : "Use 3 credits & submit" : "Preview my request"}</button><p className={styles.finePrint}>One request per 24 hours. Your project goes live as soon as you submit.</p></form></section>}
    {panel === "project" && current && <section className={styles.project}><header><div><p className={styles.eyebrow}>{example ? "Example · not a public submission" : current.category}</p><h2>{current.title}</h2>{current.summary && <p className={styles.projectSummary}>{current.summary}</p>}<p><MemberAvatar name={current.builder_name} avatar={current.avatar} size={32} /> By {current.builder_name}{!example && <> · {shortDate(current.created_at)}</>}</p></div>{example ? <span className={styles.previewBadge}>Example project · no public posts</span> : <a className={styles.primary} href={current.url} target="_blank" rel="noopener noreferrer">Try the project <ArrowUpRight size={16} /></a>}</header>{(isFeedbackExample(current) || current.cover_id) && <div className={styles.fullExample}><ProjectPreview project={current} large /></div>}{!example && viewer?.id === current.owner_id && <ProjectCoverEditor key={current.id} busy={busy} onSave={async image => { try { const coverId = await saveCover(image); if (await send("cover", { projectId: current.id, coverId })) { uploadedCover.current = null; notify("Your project image is updated."); return true } } catch (error) { setError(error instanceof Error ? error.message : "Your image couldn’t be saved.") } return false }} />}{!example && viewer?.id === current.owner_id && <ProjectSummaryEditor key={current.id} summary={current.summary} busy={busy} onSave={async summary => { if (await send("summary", { projectId: current.id, summary })) { notify("Your project summary is updated."); return true } return false }} />}<div className={styles.brief}><div><p className={styles.eyebrow}>Who it’s for</p><p>{current.audience}</p></div><div><p className={styles.eyebrow}>One thing to try</p><p>{current.task}</p></div><div><p className={styles.eyebrow}>Fresh eyes wanted on</p><p>{current.focus}</p></div></div>{current.status !== "approved" && <p className={styles.inlineNote}>{example ? "A preview only. Nothing has been submitted." : current.status === "pending" ? "Your project is being published." : "A moderator removed this project. Its review credits have been returned."}</p>}<div className={styles.projectActions}>{!example && viewer && <button type="button" onClick={() => setReport({ kind: "project", id: current.id, label: current.title })}><Flag size={13} />Report app</button>}{viewer?.is_admin && !example && <button type="button" disabled={busy} onClick={() => moderationAction("moderate", { kind: "project", id: current.id, decision: current.status === "rejected" ? "restore" : "hide" })}>{current.status === "rejected" ? "Restore project" : "Remove project"}</button>}{viewer?.is_admin && !example && current.status === "approved" && <button type="button" onClick={() => send("moderate", { kind: "project", id: current.id, decision: current.featured ? "unpick" : "pick" })}><Sparkles size={14} />{current.featured ? "Remove from Michelle’s picks" : "Add to Michelle’s picks"}</button>}</div>{current.status === "approved" && (canReview ? <ReviewForm key={current.id} busy={busy} preview={example} expiresAt={viewer?.assignment?.project_id === current.id ? viewer.assignment.expires_at : undefined} onRenew={() => { void send("renew-assignment", { projectId: current.id }) }} onRelease={async () => { if (await send("release-assignment")) show("board") }} onSubmit={async data => { const parsed = feedbackReviewSchema.safeParse({ ...data, projectId: current.id }); if (!parsed.success) { setError(parsed.error.issues[0].message); return false } if (example) { setDemoReview(data); notify("That’s how a structured review looks. This example doesn’t post publicly or earn real credits."); return true } if (await send("review", parsed.data)) { notify("Your feedback is published. You earned one review credit."); return true } return false }} /> : viewer?.id === current.owner_id ? <p className={styles.inlineNote}>This is your request. Other builders will be matched with it through the review queue.</p> : <div className={styles.callout}><h3>Give someone fresh eyes.</h3><p>We match reviewers with the apps that need feedback most.</p><button type="button" className={styles.secondary} onClick={nextReview} disabled={busy}>Review next app <ArrowUpRight size={14} /></button></div>)}{demoReview && example && isFeedbackExample(current) && <section><p className={styles.eyebrow}>Your example review · not published</p><PublishedReview review={{ ...demoReview, id: "preview", project_id: current.id, reviewer_id: "preview", reviewer_name: "Your example review", created_at: new Date().toISOString(), confusion: "", improvement: "", design_score: demoReview.ratings.design }} owner={false} signedIn={false} busy={false} onUseful={() => {}} onReport={() => {}} /></section>}<section className={styles.discussion}><h3>The conversation <span>{reviews.length + comments.length}</span></h3>{viewer?.id === current.owner_id && reviews.length > 0 && <p className={styles.muted}>Found an observation useful? Mark it so your reviewer knows what helped. Their review credit is already earned.</p>}{reviews.map(review => <PublishedReview key={review.id} review={review} owner={viewer?.id === current.owner_id && viewer.id !== review.reviewer_id} signedIn={Boolean(viewer)} busy={busy} onUseful={(observation, useful) => { void send("useful", { reviewId: review.id, observation, useful }) }} onReport={() => setReport({ kind: "review", id: review.id, label: `Review by ${review.reviewer_name}` })} onHide={viewer?.is_admin && !example ? () => { void moderationAction("moderate", { kind: "review", id: review.id, decision: "hide" }) } : undefined} />)}{comments.map(comment => <article key={comment.id} className={styles.review}><header><strong><MemberAvatar name={comment.author_name} avatar={comment.avatar} size={32} /> {comment.author_name}</strong><span>{shortDate(comment.created_at)}</span></header><FeedbackRatingSummary ratings={comment.ratings} /><p>{comment.body}</p>{viewer && <button type="button" className={styles.reportButton} onClick={() => setReport({ kind: "comment", id: comment.id, label: `Reply by ${comment.author_name}` })}><Flag size={12} />Report reply</button>}{viewer?.is_admin && !example && <button type="button" className={styles.reportButton} disabled={busy} onClick={() => moderationAction("moderate", { kind: "comment", id: comment.id, decision: "hide" })}>Remove reply</button>}</article>)}{!reviews.length && !comments.length && <p className={styles.muted}>No feedback here yet. The first specific observation can make a big difference.</p>}{viewer && !example && current.status === "approved" && <FeedbackReply key={current.id} busy={busy} allowRatings={viewer.id !== current.owner_id} onSubmit={async (body, ratings) => { if (await send("comment", { projectId: current.id, body, ratings })) { notify("Your reply is published."); return true } return false }} />}</section></section>}
    {report && <section ref={reportPanel} className={styles.formPanel} aria-label="Report content"><p className={styles.eyebrow}>Send to moderation</p><h3>Report: {report.label}</h3><form onSubmit={async event => { event.preventDefault(); if (await send("report", { ...fields(event), kind: report.kind, id: report.id })) { setReport(null); notify("Your report has been sent to the moderation queue.") } }}><label>Reason<select name="reason">{["Unsafe link", "Spam", "Harassment", "Other"].map(reason => <option key={reason}>{reason}</option>)}</select></label><label>What should we know?<textarea name="detail" required minLength={20} maxLength={1000} rows={3} /></label><div className={styles.heroActions}><button type="submit" className={styles.secondary} disabled={busy}>Send report</button><button type="button" onClick={() => setReport(null)}>Cancel</button></div></form></section>}
    {panel === "moderation" && viewer?.is_admin && <FeedbackModeration moderation={board.moderation} busy={busy} onAction={moderationAction} />}
    {panel === "how" && <section className={layout.how} aria-labelledby="exchange-how-title"><h2 id="exchange-how-title">Fresh eyes, in both directions.</h2><p>Share what you’re building. Try someone else’s project. Give them something they can use to make it better.</p><ol><li><strong>Make a feedback request.</strong><p>Add a screenshot, a brief summary, who it’s for, and one thing you’d like someone to try. The first ten projects submit free. After that, three review credits unlock a request. One request per 24 hours.</p></li><li><strong>Try the thing and notice three moments.</strong><p>We match you with projects that need feedback. Say where you were, what happened, and what would help. Complete your review within 45 minutes, release it if you can’t finish, or renew it after it expires. Publishing a complete review earns one credit immediately.</p></li><li><strong>Tell reviewers what helped.</strong><p>Builders can mark useful observations. Those marks build reviewer reputation without changing credits. Useful feedback for three different builders earns Helpful reviewer recognition.</p></li></ol><p>Be kind. Be specific. Projects, reviews, and replies publish immediately. Report anything that doesn’t belong; moderators can remove or restore it. Example projects and reviews never earn credits or post publicly.</p><button type="button" className={styles.secondary} disabled={busy} onClick={nextReview}>Review next project <ArrowUpRight size={16} /></button></section>}
    </div>
  </main>
}
