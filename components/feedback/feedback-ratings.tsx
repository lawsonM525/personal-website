"use client"

import { useId, useRef, useState } from "react"
import { useComputerSound } from "@/components/homepage/computer-sounds"
import { feedbackRatingCategories, type FeedbackRatings } from "@/lib/feedback"
import styles from "./feedback-ratings.module.css"

const starShape = "M24 4 30 16 43 18 33.5 27.5 36 41 24 34.5 12 41 14.5 27.5 5 18 18 16Z"
const scoreLabels = ["", "Needs work", "Getting there", "Pretty good", "Really good", "Love it!"]

function RatingStar({ lit, size = 42 }: { lit: boolean; size?: number }) {
  return <svg className={styles.starArt} data-lit={lit} width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
    <path className={styles.shadow} d={starShape} transform="translate(1 2)" />
    <path className={styles.starBody} d={starShape} stroke="#17385e" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="m23 10-3 8-9 2" stroke="#fffdf0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path className={styles.warmEdge} d="m32 30 1 6-8-4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <g fill="#17385e"><ellipse cx="20" cy="22" rx="1.4" ry="1.9" /><ellipse cx="28" cy="22" rx="1.4" ry="1.9" /></g>
    <g className={styles.cheeks} fill="#f77e9e"><ellipse cx="17.5" cy="25" rx="2.2" ry="1.25" /><ellipse cx="30.5" cy="25" rx="2.2" ry="1.25" /></g>
    <path d={lit ? "M20.5 26q3.5 5 7 0" : "M21 26q3 2.5 6 0"} stroke="#17385e" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
}

export function FeedbackRatingInput({ value, onChange, required = false, disabled = false }: {
  value: Partial<FeedbackRatings>; onChange: (ratings: Partial<FeedbackRatings>) => void; required?: boolean; disabled?: boolean;
}) {
  const id = useId()
  const sound = useComputerSound()
  const sequence = useRef(0)
  const [preview, setPreview] = useState<{ category: keyof FeedbackRatings; score: number } | null>(null)
  const [burst, setBurst] = useState<{ category: keyof FeedbackRatings; score: number; id: number } | null>(null)
  function celebrate(category: keyof FeedbackRatings, score: number) {
    setBurst({ category, score, id: ++sequence.current })
    sound?.play("paintSparkle")
  }
  function choose(category: keyof FeedbackRatings, score: number) {
    setPreview(null)
    onChange({ ...value, [category]: score })
    celebrate(category, score)
  }
  const rated = feedbackRatingCategories.filter(category => value[category.key]).length
  return <fieldset className={styles.input} disabled={disabled}>
    <legend>Your ratings {required ? "" : "(optional)"}</legend>
    <p className={styles.hint}>{required ? "Choose a rating for each category." : "Tried the project? Add three ratings, or leave them blank for a follow-up."} 1 = needs work · 5 = loved it.</p>
    <div className={styles.categories}>
      {feedbackRatingCategories.map(category => <fieldset key={category.key} className={styles.category}>
        <legend>{category.label}</legend><p>{category.hint}</p>
        <div className={styles.stars} onPointerLeave={() => setPreview(null)}>
          {[1, 2, 3, 4, 5].map(score => {
            const filled = score <= (preview?.category === category.key ? preview.score : value[category.key] || 0)
            const popping = burst?.category === category.key && burst.score === score && value[category.key] === score
            return <label className={styles.star} key={score} data-filled={filled} data-pop={popping} onPointerEnter={event => { if (!disabled && event.pointerType === "mouse") setPreview({ category: category.key, score }) }}>
              <input type="radio" name={`${id}-${category.key}`} value={score} checked={value[category.key] === score} required={required || rated > 0} onChange={() => choose(category.key, score)} onClick={() => { if (value[category.key] === score) celebrate(category.key, score) }} aria-label={`${score} ${score === 1 ? "star" : "stars"}`} />
              <span className={styles.artWrap} key={popping ? `pop-${burst?.id}` : "rest"}><RatingStar lit={filled} /></span>
              {popping && <span key={burst?.id} className={styles.burst} aria-hidden="true"><i /><i /><i /></span>}
            </label>
          })}
        </div>
        <span className={styles.score} aria-live="polite">{value[category.key] ? `${value[category.key]} / 5 · ${scoreLabels[value[category.key] || 0]}` : "Pick a star"}</span>
      </fieldset>)}
    </div>
    <div className={styles.completion}><span>{rated} of 3 categories rated</span>{!required && rated > 0 && <button type="button" onClick={() => { setPreview(null); setBurst(null); onChange({}) }}>Clear ratings</button>}</div>
  </fieldset>
}

export function FeedbackRatingSummary({ ratings }: { ratings?: FeedbackRatings | null }) {
  if (!ratings) return null
  return <dl className={styles.summary} aria-label="Project ratings">{feedbackRatingCategories.map(category => <div key={category.key}>
    <dt>{category.label}</dt><dd aria-label={`${ratings[category.key]} out of 5 stars`}><span className={styles.publishedStars} aria-hidden="true">{[1, 2, 3, 4, 5].map(score => <span key={score} data-filled={score <= ratings[category.key]}><RatingStar lit={score <= ratings[category.key]} size={23} /></span>)}</span><span aria-hidden="true">{ratings[category.key]}/5</span></dd>
  </div>)}</dl>
}
