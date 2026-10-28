"use client"

import { useId } from "react"
import { Sparkles } from "@/components/retro-icons"
import { feedbackRatingCategories, type FeedbackRatings } from "@/lib/feedback"
import styles from "./feedback-ratings.module.css"

export function FeedbackRatingInput({ value, onChange, required = false, disabled = false }: {
  value: Partial<FeedbackRatings>; onChange: (ratings: Partial<FeedbackRatings>) => void; required?: boolean; disabled?: boolean;
}) {
  const id = useId()
  const rated = feedbackRatingCategories.filter(category => value[category.key]).length
  return <fieldset className={styles.input} disabled={disabled}>
    <legend>Your ratings {required ? "" : "(optional)"}</legend>
    <p className={styles.hint}>{required ? "Choose a rating for each category." : "Tried the project? Add three ratings, or leave them blank for a follow-up."} 1 = needs work · 5 = loved it.</p>
    <div className={styles.categories}>
      {feedbackRatingCategories.map(category => <fieldset key={category.key} className={styles.category}>
        <legend>{category.label}</legend><p>{category.hint}</p>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map(score => <label className={styles.star} key={score} data-filled={score <= (value[category.key] || 0)}>
            <input type="radio" name={`${id}-${category.key}`} value={score} checked={value[category.key] === score} required={required || rated > 0} onChange={() => onChange({ ...value, [category.key]: score })} aria-label={`${score} ${score === 1 ? "star" : "stars"}`} />
            <Sparkles size={31} aria-hidden="true" />
          </label>)}
        </div>
        <span className={styles.score} aria-live="polite">{value[category.key] ? `${value[category.key]} / 5` : "Not rated yet"}</span>
      </fieldset>)}
    </div>
    <div className={styles.completion}><span>{rated} of 3 categories rated</span>{!required && rated > 0 && <button type="button" onClick={() => onChange({})}>Clear ratings</button>}</div>
  </fieldset>
}

export function FeedbackRatingSummary({ ratings }: { ratings?: FeedbackRatings | null }) {
  if (!ratings) return null
  return <dl className={styles.summary} aria-label="Project ratings">{feedbackRatingCategories.map(category => <div key={category.key}>
    <dt>{category.label}</dt><dd aria-label={`${ratings[category.key]} out of 5 stars`}><span className={styles.publishedStars} aria-hidden="true">{[1, 2, 3, 4, 5].map(score => <span key={score} data-filled={score <= ratings[category.key]}><Sparkles size={19} /></span>)}</span><span aria-hidden="true">{ratings[category.key]}/5</span></dd>
  </div>)}</dl>
}
