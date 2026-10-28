export const analyticsGoals = ["guide_preview_start", "guide_purchase_click", "magazine_waitlist_open", "magazine_waitlist_submitted", "penpal_form_open", "penpal_signup_submitted"] as const
export type AnalyticsGoal = typeof analyticsGoals[number]

type AnalyticsWindow = Window & { datafast?: ((goal: string, properties?: Record<string, string>) => void); gtag?: (...args: unknown[]) => void }

export function trackGoal(goal: AnalyticsGoal) {
  if (process.env.NODE_ENV !== "production" || typeof window === "undefined" || window.location.hostname !== "michellescomputer.com") return
  const client = window as AnalyticsWindow
  // Never send form answers, email addresses, query strings, or reader text.
  const properties = { page_path: window.location.pathname }
  try { client.datafast?.(goal, properties) } catch {}
  try { client.gtag?.("event", goal, properties) } catch {}
}
