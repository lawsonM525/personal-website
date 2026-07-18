import type { Metadata } from "next"
import Link from "next/link"
import { ComputerDock, ComputerTopbar } from "../computer-client"
import { computerQuests } from "../computer-data"
import styles from "../computer.module.css"

export const metadata: Metadata = {
  title: "Quests — Michelle's Computer",
  description: "Guided resource quests for shipping, inbox triage, coding, second brains, and presentations.",
}

export default function ComputerQuestsPage() {
  return (
    <main className={`${styles.shell} ${styles.pageShell}`}>
      <ComputerTopbar />
      <section className={styles.page}>
        <div className={styles.window}>
          <div className={styles.windowBar}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            quests.exe
          </div>
          <div className={styles.windowBody}>
            <h1>Guided quests</h1>
            <p>Pick the thing you keep avoiding and follow the smallest useful path through it.</p>

            <div className={styles.cards}>
              {computerQuests.map((quest) => (
                <article className={styles.card} key={quest.slug}>
                  <img src={quest.image} alt="" />
                  <h2>{quest.title}</h2>
                  <p>{quest.prompt}</p>
                  <ul>
                    {quest.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <Link className={styles.primaryButton} href="/resources/computer/toolkit">
                open toolkit
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ComputerDock />
    </main>
  )
}
