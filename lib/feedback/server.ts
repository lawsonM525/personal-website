import "server-only"
import { NextRequest, NextResponse } from "next/server"

export class FeedbackError extends Error { constructor(public status: number, message: string) { super(message) } }
export function feedbackConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return url && key ? { url: url.replace(/\/$/, ""), key } : null
}
export function feedbackIsOpen() { return Boolean(feedbackConfig()) && process.env.FEEDBACK_EXCHANGE_OPEN === "true" }

const errors: Record<string, string> = {
  feedback_observations: "Add three different observations: where, what happened, and what would help.", feedback_useful_owner: "Only this project’s builder can mark its feedback useful.", feedback_useful_review: "This feedback is no longer available to mark useful.",
  feedback_summary: "Add a one-line project summary between 15 and 180 characters.", feedback_summary_owner: "Only the project’s owner can change its summary.",
  feedback_cover_limit: "You’ve uploaded ten images today. Try again tomorrow.", feedback_cover_owner: "Only the project’s owner can change its image.", feedback_cover_missing: "Add a screenshot or cover image before submitting.",
  member_invalid_avatar: "Choose one of the portrait options.", learn_comment_limit: "Give it a few minutes before commenting again.",
  feedback_sign_in: "Sign in with your email to take part.", feedback_blocked: "This account cannot post. Contact Michelle if you think this is a mistake.", feedback_name: "Use a public name between 2 and 60 characters.",
  feedback_empty_queue: "You’ve reached the end of the review queue. Come back when another builder shares an app.", feedback_need_reviews: "Complete three reviews to earn a feedback request.",
  feedback_submit_limit: "You can submit one app every 24 hours.", feedback_public_url: "Use a public HTTPS link.", feedback_duplicate_url: "That app already has an active feedback request.",
  feedback_not_reviewable: "This app is no longer in the review queue, or it belongs to you.", feedback_assignment_expired: "Your review slot expired. Choose ‘Review next app’ to get a fresh assignment.",
  feedback_distinct_answers: "Give each question its own specific answer.", feedback_review_limit: "You’ve completed ten reviews today. Come back tomorrow.", feedback_already_reviewed: "You’ve already reviewed this app.",
  feedback_comment_length: "Share between 500 and 2,000 characters in your reply.",
  feedback_missing_project: "This app or comment is no longer available.", feedback_comment_limit: "Give other people a moment before posting another reply.", feedback_report_limit: "You’ve sent several reports. Please try again later.",
  feedback_admin_only: "Only Michelle’s moderation team can do that.", feedback_invalid_action: "That moderation action is not available.", feedback_member_not_found: "That builder needs to sign in once before receiving pilot credits.",
}

export async function supabaseFeedback<T>(path: string, options: { token?: string; body?: unknown; method?: string } = {}): Promise<T> {
  const config = feedbackConfig()
  if (!config) throw new FeedbackError(503, "The feedback exchange is being connected. Public submissions aren’t open yet.")
  let response: Response
  try {
    response = await fetch(`${config.url}${path}`, { method: options.method || (options.body === undefined ? "GET" : "POST"), headers: { apikey: config.key, ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}), "Content-Type": "application/json" }, body: options.body === undefined ? undefined : JSON.stringify(options.body), cache: "no-store", signal: AbortSignal.timeout(12000) })
  } catch { throw new FeedbackError(503, "The exchange couldn’t connect. Please try again.") }
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = typeof data?.message === "string" ? errors[data.message] : undefined
    if (message) throw new FeedbackError(data.message === "feedback_admin_only" ? 403 : 400, message)
    if (response.status === 429) throw new FeedbackError(429, "Please wait a minute before trying again.")
    if (path.startsWith("/auth/") && response.status < 500) throw new FeedbackError(401, "That sign-in attempt didn’t work. Check the code or request a new one.")
    throw new FeedbackError(503, "The exchange isn’t ready yet. Please try again later.")
  }
  return data as T
}
export function feedbackRpc<T>(name: string, token?: string, body: unknown = {}) { return supabaseFeedback<T>(`/rest/v1/rpc/${name}`, { token, body }) }

export type FeedbackSession = { access_token: string; refresh_token: string; expires_in: number; user: { id: string; email_confirmed_at?: string }; refreshed?: boolean }
export async function feedbackSession(request: NextRequest): Promise<FeedbackSession | null> {
  const access = request.cookies.get("mc-feedback-access")?.value
  const refresh = request.cookies.get("mc-feedback-refresh")?.value
  if (access) {
    try {
      const user = await supabaseFeedback<FeedbackSession["user"]>("/auth/v1/user", { token: access })
      if (user.email_confirmed_at) return { access_token: access, refresh_token: refresh || "", expires_in: 3600, user }
    } catch (error) { if (!(error instanceof FeedbackError) || error.status !== 401) throw error }
  }
  if (refresh) {
    try {
      const session = await supabaseFeedback<FeedbackSession>("/auth/v1/token?grant_type=refresh_token", { body: { refresh_token: refresh } })
      return session.user.email_confirmed_at ? { ...session, refreshed: true } : null
    } catch (error) { if (!(error instanceof FeedbackError) || error.status !== 401) throw error }
  }
  return null
}
export function feedbackResponse(body: unknown, status = 200, session?: FeedbackSession | null, clear = false) {
  const response = NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store" } })
  feedbackSessionCookies(response, session, clear)
  return response
}
export function feedbackSessionCookies(response: NextResponse, session?: FeedbackSession | null, clear = false) {
  const cookie = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/" }
  if (clear) for (const name of ["mc-feedback-access", "mc-feedback-refresh"]) response.cookies.set(name, "", { ...cookie, maxAge: 0 })
  else if (session?.refreshed) {
    response.cookies.set("mc-feedback-access", session.access_token, { ...cookie, maxAge: session.expires_in })
    response.cookies.set("mc-feedback-refresh", session.refresh_token, { ...cookie, maxAge: 60 * 60 * 24 * 30 })
  }
}
