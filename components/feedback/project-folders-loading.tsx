import styles from "./project-folders-loading.module.css"

export function ProjectFoldersLoading() {
  return <div className={styles.stage} role="status" aria-live="polite" aria-atomic="true" data-project-folders-loading>
    <span className="sr-only">Loading projects…</span>
    <div className={styles.track} aria-hidden="true"><div className={styles.blocks}>{[0, 1, 2, 3, 4, 5].map(index => <span key={index} />)}</div></div>
  </div>
}
