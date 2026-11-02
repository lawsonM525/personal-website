import type { ArticleContentsEntry } from "@/lib/article-contents";
import styles from "./article-contents.module.css";

export function ArticleContents({ entries }: { entries: ArticleContentsEntry[] }) {
  const links = <ol className={styles.list}>{entries.map(entry => <li key={entry.key} className={entry.level === 3 ? styles.subsection : undefined}><a href={"#" + entry.id}>{entry.title}</a></li>)}</ol>;
  return <aside className={styles.contents} aria-label="Tutorial index">
    <nav className={styles.desktop} aria-label="Jump to a tutorial section"><h2>On this page</h2>{links}</nav>
    <details className={styles.mobile}><summary>Jump to a step</summary><nav aria-label="Jump to a tutorial section">{links}</nav></details>
  </aside>;
}
