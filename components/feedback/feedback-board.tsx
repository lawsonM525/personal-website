"use client"

import { useRef, useState } from "react"
import { ArrowRight, ChevronLeft, FileText, FolderOpen, Search, Sparkles } from "@/components/retro-icons"
import { feedbackExampleArtwork, isFeedbackExample } from "@/lib/feedback-examples"
import type { FeedbackProject } from "@/lib/feedback"
import { MemberAvatar } from "@/components/member/member-avatar"
import styles from "./feedback-board.module.css"

export function ProjectPreview({ project, large = false }: { project: FeedbackProject; large?: boolean }) {
  if (project.cover_id) return <img className={`${styles.preview} ${large ? styles.largePreview : ""}`} src={`/api/feedback/covers/${project.cover_id}`} alt={`${project.title} — project screenshot or cover`} width="1600" height="900" loading="lazy" decoding="async" />
  const artwork = feedbackExampleArtwork(project)
  if (artwork) return <img className={`${styles.preview} ${large ? styles.largePreview : ""}`} src={artwork} alt={`${project.title} — fictional example interface`} width="900" height="600" />
  return <div className={`${styles.sitePreview} ${large ? styles.largePreview : ""}`}>
    <div className={styles.address}><span aria-hidden="true">↗</span>{new URL(project.url).hostname}</div>
    <FolderOpen size={large ? 62 : 52} />
    {large ? <><strong>{project.title}</strong><p>{project.audience}</p></> : <span className={styles.previewType}>{project.category}</span>}
  </div>
}

export function FeedbackBoard({ projects, loading, filter, query, samples, onFilter, onQuery, onReview, onNextReview }: {
  projects: FeedbackProject[]; loading: boolean; filter: string; query: string; samples: boolean;
  onFilter: (value: string) => void; onQuery: (value: string) => void;
  onReview: (project: FeedbackProject) => void; onNextReview: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mobileDetail, setMobileDetail] = useState(false)
  const detail = useRef<HTMLElement>(null)
  const lastCard = useRef<HTMLButtonElement>(null)
  const active = projects.find(project => project.id === selectedId) || projects[0]
  function select(project: FeedbackProject) {
    setSelectedId(project.id); setMobileDetail(true)
    if (matchMedia("(max-width: 900px)").matches) requestAnimationFrame(() => { detail.current?.focus({ preventScroll: true }); detail.current?.scrollIntoView({ block: "start", behavior: "instant" }) })
  }
  const filters = [
    { value: "Waiting for feedback", label: "Waiting for feedback", icon: FolderOpen },
    { value: "All apps", label: "All projects", icon: FolderOpen },
    { value: "Michelle’s picks", label: "Michelle’s picks", icon: Sparkles },
    { value: "My requests", label: "My requests", icon: FolderOpen },
  ]
  return <section className={styles.board} aria-label="Projects in the feedback exchange">
    <div className={styles.tools}>
      <div className={styles.filters}>{filters.map(({ value, label, icon: Icon }, index) => <button key={value} type="button" data-color={index} aria-pressed={filter === value} onClick={() => { onFilter(value); setMobileDetail(false) }}><Icon size={19} />{label}</button>)}</div>
      <label className={styles.search}><Search size={19} /><span className="sr-only">Search projects</span><input type="search" placeholder="Find a project…" value={query} onChange={event => onQuery(event.target.value)} /></label>
      <p className={styles.previewLabel}>{samples ? "Example projects · fictional builds" : "Fresh eyes go where they’re needed"}</p>
    </div>
    {loading ? <p className={styles.empty} role="status">Opening the project folders…</p> : !projects.length ? <div className={styles.empty}><FolderOpen size={48} /><h2>{query ? "No projects match that search." : filter === "Michelle’s picks" ? "Michelle’s picks will go here." : filter === "My requests" ? "Your next build belongs here." : "The first fresh eyes are yours."}</h2><p>{query ? "Try another name or clear the search." : "Share a project or give another builder fresh eyes."}</p><button type="button" onClick={onNextReview}>Review next project <ArrowRight size={17} /></button></div> : <div className={styles.layout} data-detail-open={mobileDetail}>
      <div className={styles.cards}>{projects.map((project, index) => <article className={styles.card} data-selected={active?.id === project.id} data-color={index % 4} key={project.id}>
        <div className={styles.cardBar}><FolderOpen size={22} /><h2>{project.title}</h2></div>
        <div className={styles.previewFrame}><ProjectPreview project={project} /></div>
        <div className={styles.cardBody}><div className={styles.cardCopy}><p>{project.audience}</p>{project.status !== "approved" && <p className={styles.status}>{project.status === "pending" ? "Publishing" : "Removed · credits returned"}</p>}</div><ArrowRight className={styles.cardArrow} size={20} aria-hidden="true" /></div>
        <button type="button" ref={active?.id === project.id ? lastCard : undefined} className={styles.cardSelect} aria-label={`View ${project.title}`} aria-pressed={active?.id === project.id} aria-controls="feedback-project-detail" onClick={() => select(project)} />
      </article>)}</div>
      {active && <aside id="feedback-project-detail" ref={detail} tabIndex={-1} className={styles.detail} aria-label={`A closer look at ${active.title}`}>
        <div className={styles.detailBar}><FolderOpen size={22} /><h2>A closer look — {active.title}</h2></div>
        <div className={styles.detailBody}>
          <button type="button" className={styles.mobileBack} onClick={() => { setMobileDetail(false); requestAnimationFrame(() => lastCard.current?.focus()) }}><ChevronLeft size={16} />Back to projects</button>
          <div className={styles.maker}><MemberAvatar name={active.builder_name} avatar={active.avatar} size={44} /><div><p className={styles.byline}><strong>From {active.builder_name}</strong>{isFeedbackExample(active) && <> · sample maker</>}</p><p>{active.task}</p></div></div>
          <section className={styles.feedbackRequest} aria-label="Requested feedback"><h3>Fresh eyes wanted on</h3><p>{active.focus}</p></section>
          <button type="button" className={styles.reviewButton} onClick={() => onReview(active)}><FileText size={25} />Try it & leave feedback</button>
          <p className={styles.detailFoot}>{isFeedbackExample(active) ? "Example review · no credits or public posts." : "Earn 1 credit for a thoughtful review."}</p>
        </div>
      </aside>}
    </div>}
  </section>
}
