import type { Metadata } from "next"
import Link from "next/link"
import { ComputerDock, ComputerTopbar } from "../computer-client"
import { computerCategories } from "../computer-data"
import styles from "../computer.module.css"

export const metadata: Metadata = {
  title: "Toolkit — Michelle's Computer",
  description: "A pixel desktop-style toolkit organized by building, career, network, money, identity, and other resources.",
}

export default function ComputerToolkitPage() {
  return (
    <main className={`${styles.shell} ${styles.pageShell}`}>
      <ComputerTopbar />
      <section className={styles.page}>
        <div className={styles.window}>
          <div className={styles.windowBar}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            toolkit.exe
          </div>
          <div className={styles.windowBody}>
            <h1>Resource toolkit</h1>
            <p>Folders from the desktop view, expanded into quick-use stacks.</p>

            <div className={styles.cards}>
              {computerCategories.map((category) => (
                <article className={styles.card} id={category.slug} key={category.slug}>
                  <img src={category.image} alt="" />
                  <h2>{category.title}</h2>
                  <p>{category.description}</p>
                  <div className={styles.toolChips}>
                    {category.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <Link className={styles.primaryButton} href="/resources/computer/quests">
                open quests
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ComputerDock />
    </main>
  )
}
