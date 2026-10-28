"use client"

import { ArrowRight, ArrowUpRight, FolderOpen, Search } from "@/components/retro-icons"
import { feedbackExampleArtwork } from "@/lib/feedback-examples"
import type { FeedbackProject } from "@/lib/feedback"
import { ProjectFoldersLoading } from "./project-folders-loading"
import styles from "./feedback-board.module.css"

export function ProjectPreview({ project, large = false }: { project: FeedbackProject; large?: boolean }) {
  if (project.cover_id) return <img className={`${styles.preview} ${large ? styles.largePreview : ""}`} src={`/api/feedback/covers/${project.cover_id}`} alt={`${project.title} — project screenshot or cover`} width="1600" height="900" loading="lazy" decoding="async" />
  const artwork = feedbackExampleArtwork(project)
  if (artwork) return <img className={`${styles.preview} ${large ? styles.largePreview : ""}`} src={artwork} alt={`${project.title} — fictional example interface`} width="900" height="600" />
  return <div className={`${styles.sitePreview} ${large ? styles.largePreview : ""}`}>
    <div className={styles.address}><span aria-hidden="true">↗</span>{new URL(project.url).hostname}</div>
    <FolderOpen size={large ? 62 : 52} />
    {large ? <><strong>{project.title}</strong><p>{project.summary || project.audience}</p></> : <span className={styles.previewType}>{project.category}</span>}
  </div>
}

export function FeedbackBoard({ projects, loading, filter, query, samples, onFilter, onQuery, onReview, onNextReview }: {
  projects: FeedbackProject[]; loading: boolean; filter: string; query: string; samples: boolean;
  onFilter: (value: string) => void; onQuery: (value: string) => void;
  onReview: (project: FeedbackProject) => void; onNextReview: () => void;
}) {
  const browsing = filter === "Waiting for feedback" || filter === "All apps"
  return <section className={styles.board} aria-label="Projects in the feedback exchange">
    <div className={styles.tools}>
      {browsing ? <div className={styles.filters} role="group" aria-label="Browse projects">{[{value:"Waiting for feedback",label:"Waiting for feedback"},{value:"All apps",label:"All projects"}].map(item => <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => onFilter(item.value)}>{item.label}</button>)}</div> : <h2 className={styles.collectionTitle}>{filter}</h2>}
      <label className={styles.search}><Search size={19} /><span className="sr-only">Search projects</span><input type="search" placeholder="Find a project…" value={query} onChange={event => onQuery(event.target.value)} /></label>
      {samples && <p className={styles.previewLabel}>Example projects · fictional builds</p>}
    </div>
    {loading ? <ProjectFoldersLoading /> : !projects.length ? <div className={styles.empty}><FolderOpen size={48} /><h2>{query ? "No projects match that search." : filter === "Michelle’s picks" ? "Michelle’s picks will go here." : filter === "My requests" ? "Your next build belongs here." : "The first fresh eyes are yours."}</h2><p>{query ? "Try another name or clear the search." : "Share a project or give another builder fresh eyes."}</p><button type="button" onClick={onNextReview}>Review next project <ArrowRight size={17} /></button></div> : <div className={styles.cards}>{projects.map((project, index) => <article className={styles.card} data-color={index % 4} key={project.id}>
        <div className={styles.cardBar}><FolderOpen size={32} /><h2>{project.title}</h2></div>
        <div className={styles.previewFrame}><ProjectPreview project={project} /></div>
        <div className={styles.cardBody}><p className={styles.summary}>{project.summary || project.audience}</p>{project.status !== "approved" && <p className={styles.status}>{project.status === "pending" ? "Publishing" : "Removed · credits returned"}</p>}<span className={styles.cardLink} aria-hidden="true">Take a look <ArrowUpRight size={18} /></span></div>
        <button type="button" className={styles.cardSelect} aria-label={`View ${project.title}`} onClick={() => onReview(project)} />
      </article>)}
    </div>}

  </section>
}
