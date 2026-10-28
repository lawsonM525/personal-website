"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, BookOpen } from "@/components/retro-icons"
import { aiGuideReaderPath } from "@/lib/ai-guide"
import { guidePlaceHash, guideProgressKey, readGuidePlace, type GuideReadingPlace } from "@/lib/guide-progress"
import styles from "./guide.module.css"

export function GuideStartLink({ startHref }: { startHref: string }) {
  const [place, setPlace] = useState<GuideReadingPlace | null>(null)
  useEffect(() => {
    function readPlace() { try { setPlace(readGuidePlace(localStorage)) } catch {} }
    function cover() { if (location.hash === "#guide-top") readPlace() }
    readPlace(); window.addEventListener("hashchange", cover)
    return () => window.removeEventListener("hashchange", cover)
  }, [])
  return <div className={styles.startControls}>
    <a className={styles.readButton} href={place ? `${aiGuideReaderPath}#${guidePlaceHash(place)}` : startHref} data-analytics-goal="guide_preview_start"><BookOpen size={26} />{place ? "Continue reading" : "Start reading"}<ArrowUpRight size={16} /></a>
    {place && <><p className={styles.resumeNote}>Page {place.page} · {place.chapterTitle}</p><a href={startHref} className={styles.startAgain} data-analytics-goal="guide_preview_start" onClick={() => { try { localStorage.removeItem(guideProgressKey) } catch {}; setPlace(null) }}>Start from the beginning</a></>}
  </div>
}
