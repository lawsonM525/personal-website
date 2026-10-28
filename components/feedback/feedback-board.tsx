"use client"

import { useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, ChevronLeft, FileText, FolderOpen, Minus, Search, Sparkles, Square, X } from "@/components/retro-icons"
import { feedbackExampleArtwork, isFeedbackExample } from "@/lib/feedback-examples"
import type { FeedbackProject } from "@/lib/feedback"
import styles from "./feedback-board.module.css"

export function ProjectPreview({ project, large = false }: { project: FeedbackProject; large?: boolean }) {
  const artwork = feedbackExampleArtwork(project)
  if (artwork) return <img className={`${styles.preview} ${large ? styles.largePreview : ""}`} src={artwork} alt={`${project.title} — fictional example interface`} width="900" height="600" />
  return <div className={`${styles.sitePreview} ${large ? styles.largePreview : ""}`}><div className={styles.address}><span aria-hidden="true">↗</span>{new URL(project.url).hostname}</div><FolderOpen size={62} /><strong>{project.title}</strong><p>{project.audience}</p><span>Open the project to try the real thing <ArrowUpRight size={14} /></span></div>
}

function WindowDecoration() {
  return <span className={styles.windowDecoration} aria-hidden="true"><span><Minus size={11} /></span><span><Square size={10} /></span><span><X size={11} /></span></span>
}

export function FeedbackBoard({ projects, loading, filter, query, samples, onFilter, onQuery, onReview, onNextReview }: {
  projects: FeedbackProject[]; loading: boolean; filter: string; query: string; samples: boolean;
  onFilter: (value: string) => void; onQuery: (value: string) => void;
  onReview: (project: FeedbackProject) => void; onNextReview: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mobileDetail, setMobileDetail] = useState(false)
  const detail = useRef<HTMLElement>(null)
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
      <div className={styles.filters}>{filters.map(({ value, label, icon: Icon }, index) => <button key={value} type="button" data-color={index} aria-pressed={filter === value} onClick={() => { onFilter(value); setMobileDetail(false) }}><Icon size={22} />{label}</button>)}</div>
      <label className={styles.search}><Search size={21} /><span className="sr-only">Search projects</span><input type="search" placeholder="Find a project…" value={query} onChange={event => onQuery(event.target.value)} /></label>
      <p className={styles.previewLabel}>{samples ? "Example projects · fictional builds" : "Fresh eyes go where they’re needed"}</p>
    </div>
    {loading ? <p className={styles.empty} role="status">Opening the project folders…</p> : !projects.length ? <div className={styles.empty}><FolderOpen size={48} /><h2>{query ? "No projects match that search." : filter === "Michelle’s picks" ? "Michelle’s picks will go here." : filter === "My requests" ? "Your next build belongs here." : "The first fresh eyes are yours."}</h2><p>{query ? "Try another name or clear the search." : "Give two thoughtful reviews to earn a feedback request."}</p><button type="button" onClick={onNextReview}>Review next project <ArrowRight size={17} /></button></div> : <div className={styles.layout} data-detail-open={mobileDetail}>
      <div className={styles.cards}>{projects.map((project, index) => <article className={styles.card} data-selected={active?.id === project.id} data-color={index % 4} key={project.id}>
        <div className={styles.cardBar}><FolderOpen size={23} /><span>{project.title}</span><WindowDecoration /></div>
        <button className={styles.previewButton} type="button" onClick={() => select(project)} aria-label={`Take a look at ${project.title}`}><ProjectPreview project={project} /></button>
        <div className={styles.cardBody}><FolderOpen size={44} /><div className={styles.cardCopy}><h2>{project.title}</h2><p>{project.audience}</p><p><strong>Focus:</strong> {project.focus}</p>{project.status !== "approved" && <p className={styles.status}>{project.status === "pending" ? "Waiting for a link check" : "Not published · credits returned"}</p>}</div><button type="button" className={styles.takeLook} onClick={() => select(project)}>Take a look <ArrowRight size={18} /></button></div>
      </article>)}</div>
      {active && <aside ref={detail} tabIndex={-1} className={styles.detail} aria-label={`A closer look at ${active.title}`}>
        <div className={styles.detailBar}><FolderOpen size={23} /><h2>A closer look — {active.title}</h2><WindowDecoration /></div>
        <div className={styles.detailBody}><button type="button" className={styles.mobileBack} onClick={() => { setMobileDetail(false); requestAnimationFrame(() => document.querySelector<HTMLElement>(`[aria-label="Take a look at ${CSS.escape(active.title)}"]`)?.focus()) }}><ChevronLeft size={16} />Back to projects</button>
          <ProjectPreview project={active} large />
          <div className={styles.maker}><span className={styles.avatar} aria-hidden="true">{active.builder_name.slice(0, 1).toUpperCase()}</span><div><p><strong>From {active.builder_name}</strong>{isFeedbackExample(active) && <> · sample maker</>}</p><p>{active.title === "Study planner" && isFeedbackExample(active) ? "I’m making a calmer way to plan a busy week. Does the first step make sense?" : active.audience}</p></div></div>
          <dl className={styles.brief}><div><dt>Focus</dt><dd>{active.focus}</dd></div><div><dt>Your task</dt><dd>{active.task}</dd></div></dl>
          <button type="button" className={styles.reviewButton} onClick={() => onReview(active)}><FileText size={30} />Try it & leave feedback</button>
          <div className={styles.detailFoot}><p>{isFeedbackExample(active) ? "Example review · no credits or public posts." : "Earn 1 credit for a thoughtful review."}</p>{isFeedbackExample(active) ? <span>Preview only</span> : <a href={active.url} target="_blank" rel="noopener noreferrer">Open project <ArrowUpRight size={16} /></a>}</div>
        </div>
      </aside>}
    </div>}
  </section>
}
