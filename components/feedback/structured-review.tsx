"use client"

import { useEffect, useState } from "react"
import { Check, Flag, Sparkles } from "@/components/retro-icons"
import { MemberAvatar } from "@/components/member/member-avatar"
import { feedbackOutcomes, type FeedbackObservation, type FeedbackReview, type FeedbackReviewer, type ReviewerStats } from "@/lib/feedback"
import styles from "./structured-review.module.css"
import shared from "./feedback.module.css"

export type ReviewDraft = { purpose: string; observations: FeedbackObservation[]; outcome: string; designScore: number }
const blankObservation = (): FeedbackObservation => ({ where: "", happened: "", suggestion: "" })

export function ReviewForm({ busy, preview, expiresAt, onRenew, onRelease, onSubmit }: {
  busy: boolean; preview: boolean; expiresAt?: string; onRenew?: () => void; onRelease?: () => void;
  onSubmit: (data: ReviewDraft) => Promise<boolean>;
}) {
  const [observations, setObservations] = useState(() => Array.from({ length: 3 }, blankObservation))
  const [now, setNow] = useState(Date.now)
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 15000); return () => clearInterval(timer) }, [])
  const minutes = expiresAt ? Math.max(0, Math.min(45, Math.ceil((Date.parse(expiresAt) - now) / 60000))) : null
  const complete = observations.filter(item => item.where.trim().length >= 3 && item.happened.trim().length >= 40 && item.suggestion.trim().length >= 40).length
  return <form className={shared.reviewForm} onSubmit={async event => {
    event.preventDefault()
    const form = event.currentTarget, data = new FormData(form)
    if (await onSubmit({ purpose: String(data.get("purpose")), observations, outcome: String(data.get("outcome")), designScore: Number(data.get("designScore")) })) {
      form.reset(); setObservations(Array.from({ length: 3 }, blankObservation))
    }
  }}>
    <p className={shared.eyebrow}>{preview ? "Try the review format · example" : "Your assigned review · earns 1 credit"}</p>
    <h3>Try it. Notice three things.</h3>
    <p className={shared.muted}>Walk through the builder’s task. Share three moments you noticed: something that worked, something confusing, or an idea that would help.</p>
    {!preview && expiresAt && <div className={styles.assignment}>
      <span>{minutes ? `${minutes} ${minutes === 1 ? "minute" : "minutes"} left` : "Your assignment expired"} · <time dateTime={expiresAt}>until {new Date(expiresAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time></span>
      {minutes === 0 && <><small>Your draft is still in this form.</small><button type="button" disabled={busy} onClick={onRenew}>Get more time</button></>}
      <button type="button" disabled={busy} onClick={onRelease}>Release this review</button>
    </div>}
    <label>What did you think the app was for?<textarea name="purpose" required minLength={40} maxLength={1500} rows={2} placeholder="Before I clicked anything, I thought this would help me…" /></label>
    <div className={styles.progress}><span>{complete} of 3 observations ready</span><progress max={3} value={complete} aria-label={`${complete} of 3 observations complete`} /></div>
    {observations.map((item, index) => <fieldset className={styles.observation} key={index}>
      <legend>Observation {index + 1}</legend>
      {([{ name: "where", label: "Where in the app?", placeholder: "The first screen, Save button, checkout…", min: 3, max: 180 }, { name: "happened", label: "What happened?", placeholder: "I clicked Save but couldn’t tell whether my plan was saved or lost.", min: 40, max: 1000 }, { name: "suggestion", label: "What would help?", placeholder: "Show a saved confirmation next to the button so I know it worked.", min: 40, max: 1000 }] as const).map(field => <label key={field.name}>{field.label}
        {field.name === "where" ? <input name={`observation-${index}-${field.name}`} required minLength={field.min} maxLength={field.max} placeholder={field.placeholder} value={item[field.name]} onChange={event => setObservations(current => current.map((value, i) => i === index ? { ...value, [field.name]: event.target.value } : value))} /> : <textarea name={`observation-${index}-${field.name}`} required minLength={field.min} maxLength={field.max} rows={3} placeholder={field.placeholder} value={item[field.name]} onChange={event => setObservations(current => current.map((value, i) => i === index ? { ...value, [field.name]: event.target.value } : value))} />}
        <small>{item[field.name].trim().length}/{field.max} characters{field.min === 40 && " · at least 40"}</small>
      </label>)}
    </fieldset>)}
    <div className={shared.twoFields}><label>How did the task go?<select name="outcome">{feedbackOutcomes.map(outcome => <option key={outcome}>{outcome}</option>)}</select></label><label>Design clarity<select name="designScore" defaultValue="3">{["1 · Very confusing", "2 · Took some effort", "3 · Mostly clear", "4 · Easy to use", "5 · Immediately clear"].map((label, index) => <option key={label} value={index + 1}>{label}</option>)}</select></label></div>
    <label className={shared.check}><input type="checkbox" required />{preview ? "I looked through this example and noted what I’d test." : "I opened the project and tried the builder’s task."}</label>
    <button type="submit" className={shared.primary} disabled={busy || minutes === 0}>{busy ? "Publishing…" : preview ? "Preview my review" : "Publish feedback & earn 1 credit"}</button>
    <p className={shared.finePrint}>Your credit arrives when your complete review publishes. Builders can mark useful observations afterward.</p>
  </form>
}

export function ReviewerReputation({ stats }: { stats?: ReviewerStats }) {
  if (!stats) return null
  const recognized = stats.helpful_reviews >= 3 && stats.helped_builders >= 3
  return <span className={styles.reputation}>{recognized && <strong title="At least three builders marked this reviewer’s feedback useful"><Sparkles size={15} />Helpful reviewer</strong>}<span>{stats.completed} {stats.completed === 1 ? "review" : "reviews"} · {stats.helpful_reviews} marked useful</span></span>
}

export function PublishedReview({ review, owner, signedIn, busy, onUseful, onReport, onHide }: {
  review: FeedbackReview; owner: boolean; signedIn: boolean; busy: boolean;
  onUseful: (index: number, useful: boolean) => void; onReport: () => void; onHide?: () => void;
}) {
  const useful = (index: number) => (review.useful_observations || []).includes(index)
  const mark = (index: number, legacy = false) => owner ? <button type="button" className={styles.useful} aria-pressed={useful(index)} disabled={busy} onClick={() => onUseful(index, !useful(index))}><Check size={15} />{useful(index) ? "Marked useful · undo" : legacy ? "Useful feedback" : "Useful observation"}</button> : useful(index) ? <p className={styles.usefulLabel}><Check size={15} />The builder found this useful</p> : null
  return <article className={shared.review}>
    <header><strong><MemberAvatar name={review.reviewer_name} avatar={review.avatar} size={32} /> {review.reviewer_name}</strong><span>{new Date(review.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span></header>
    <ReviewerReputation stats={review.reviewer_stats} />
    <div className={shared.reviewBadges}><span>Design clarity {review.design_score}/5</span><span>{review.outcome}</span></div>
    <dl><dt>What I thought it was for</dt><dd>{review.purpose}</dd></dl>
    {review.observations?.length ? review.observations.map((item, index) => <section className={styles.publishedObservation} key={index}><h4>Observation {index + 1} · {item.where}</h4><dl><dt>What happened</dt><dd>{item.happened}</dd><dt>What would help</dt><dd>{item.suggestion}</dd></dl>{mark(index)}</section>) : <><dl><dt>What confused me</dt><dd>{review.confusion}</dd><dt>One change I’d make</dt><dd>{review.improvement}</dd></dl>{mark(0, true)}</>}
    {signedIn && <button type="button" className={shared.reportButton} onClick={onReport}><Flag size={12} />Report review</button>}{onHide && <button type="button" className={shared.reportButton} disabled={busy} onClick={onHide}>Remove review</button>}
  </article>
}

export function HelpfulReviewers({ reviewers }: { reviewers?: FeedbackReviewer[] }) {
  if (!reviewers?.length) return null
  return <details className={styles.community}><summary><Sparkles size={19} />Builders helping builders</summary><p>Recognizing useful feedback, as marked by the people who received it. A review counts once, even if several observations helped.</p><ol>{reviewers.map(reviewer => <li key={reviewer.id}><MemberAvatar name={reviewer.name} avatar={reviewer.avatar} size={36} /><div><strong>{reviewer.name}</strong><ReviewerReputation stats={reviewer} /></div></li>)}</ol><small>“Helpful reviewer” means useful feedback for at least three different builders. Credits are earned by publishing complete reviews.</small></details>
}
