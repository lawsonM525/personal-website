"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"
import { computerCategories } from "./computer-data"
import styles from "./computer.module.css"

export function ComputerClient() {
  const [query, setQuery] = useState("")

  const visibleCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return computerCategories

    return computerCategories.filter((category) => {
      const haystack = [
        category.title,
        category.description,
        category.count,
        ...category.tools,
      ].join(" ").toLowerCase()

      return haystack.includes(normalized)
    })
  }, [query])

  return (
    <main className={styles.shell}>
      <ComputerTopbar />
      <section className={styles.hero}>
        <img className={styles.michelle} src="/michelles-computer/michelle.png" alt="Michelle" />

        <div className={styles.panel}>
          <div className={styles.badge}>
            <h1>Michelle&apos;s Computer</h1>
            <p>all the resources you need to succeed</p>
          </div>

          <label className={styles.search}>
            <Search size={22} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="type what you are trying to do..."
              aria-label="Search resource folders"
            />
            <button type="button" onClick={() => setQuery("")}>
              reset
            </button>
          </label>

          <div className={styles.folderGrid}>
            {visibleCategories.map((category) => (
              <Link
                className={styles.folder}
                key={category.slug}
                href={`/resources/computer/toolkit#${category.slug}`}
              >
                <img src={category.image} alt="" />
                <strong>{category.title}</strong>
                <span>{category.count}</span>
              </Link>
            ))}
            <Link className={styles.folder} href="/resources/computer/quests">
              <img src="/michelles-computer/cat-quests.png" alt="" />
              <strong>Quests</strong>
              <span>guided</span>
            </Link>
          </div>
        </div>
      </section>
      <ComputerDock />
    </main>
  )
}

export function ComputerTopbar() {
  return (
    <header className={styles.topbar}>
      <Link className={styles.brand} href="/resources/computer">
        Michelle&apos;s Computer
      </Link>
      <nav className={styles.nav} aria-label="Michelle's Computer pages">
        <Link href="/resources">Classic resources</Link>
        <Link href="/resources/computer/toolkit">Toolkit</Link>
        <Link href="/resources/computer/quests">Quests</Link>
      </nav>
    </header>
  )
}

export function ComputerDock() {
  return (
    <nav className={styles.dock} aria-label="Michelle's Computer dock">
      <Link href="/resources/computer">
        <img src="/michelles-computer/dock-admin.png" alt="" />
        <span>Desktop</span>
      </Link>
      <Link href="/resources/computer/toolkit">
        <img src="/michelles-computer/toolbox.png" alt="" />
        <span>Toolkit</span>
      </Link>
      <Link href="/resources/computer/quests">
        <img src="/michelles-computer/cat-quests.png" alt="" />
        <span>Quests</span>
      </Link>
      <Link href="/resources">
        <img src="/michelles-computer/icon-ask-ai.png" alt="" />
        <span>Back</span>
      </Link>
    </nav>
  )
}
