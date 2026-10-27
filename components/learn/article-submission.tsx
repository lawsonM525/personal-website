"use client"

import Link from "next/link"
import { useId, useState } from "react"
import { ArrowLeft, ArrowUpRight } from "@/components/retro-icons"
import { TallyForm } from "@/components/homepage/signup-window"
import styles from "@/components/homepage/home.module.css"

export const articleSubmissionForm = {
  id: "laaBaX",
  title: "Submit an article for Learn",
  publicUrl: "https://tally.so/r/laaBaX",
  embedUrl: "https://tally.so/embed/laaBaX?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
  height: 1200,
}

export function ArticleSubmission() {
  const recoveryId = useId()
  const [version, setVersion] = useState(0)
  return <main className="article-submission">
    <Link className="article-submission-back" href="/learn"><ArrowLeft size={15} />Back to Learn</Link>
    <header><div><p className="article-eyebrow">Learn</p><h1>Submit an article</h1></div><img src="/homepage/learn-icon-v3.webp" alt="" width="108" height="108" /></header>
    <p id={recoveryId} className="article-submission-recovery">Form not loading? <button className={styles.formReload} type="button" onClick={() => setVersion(value => value + 1)}>Reload the form</button> or <a href={articleSubmissionForm.publicUrl} target="_blank" rel="noopener noreferrer">open it in a new tab <ArrowUpRight size={13} /></a>.</p>
    <TallyForm key={version} form={articleSubmissionForm} active={true} recoveryId={recoveryId} />
  </main>
}
