import { FileText, FolderOpen } from "@/components/retro-icons"
import styles from "./project-folders-loading.module.css"

export function ProjectFoldersLoading() {
  return <div className={styles.stage} role="status" aria-live="polite" aria-atomic="true" data-project-folders-loading>
    <div className={styles.panel}>
      <div className={styles.titleBar}><FolderOpen size={21} /><span>Project folders</span></div>
      <div className={styles.body}>
        <div className={styles.transfer} aria-hidden="true">
          <FolderOpen className={styles.folder} size={72} />
          <div className={styles.papers}>{[0, 1, 2].map(index => <FileText key={index} className={styles.paper} size={26} />)}</div>
          <div className={styles.projects}>{[0, 1, 2].map(index => <div className={styles.project} key={index}><span /><i /><i /></div>)}</div>
        </div>
        <p className={styles.label}>Loading projects…</p>
        <div className={styles.track} aria-hidden="true"><div className={styles.blocks}>{[0, 1, 2, 3, 4, 5].map(index => <span key={index} />)}</div></div>
        <p className={styles.caption}>Getting the latest builds.</p>
      </div>
    </div>
  </div>
}
