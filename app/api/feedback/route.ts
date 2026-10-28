import { NextRequest } from "next/server"
import { z } from "zod"
import { feedbackProjectSchema, feedbackReviewSchema, type FeedbackBoard, type FeedbackViewer } from "@/lib/feedback"
import { FeedbackError, feedbackIsOpen, feedbackResponse, feedbackRpc, feedbackSession, supabaseFeedback, type FeedbackSession } from "@/lib/feedback/server"
import { feedbackPkce } from "@/lib/feedback/pkce"
import { feedbackRequestOrigin } from "@/lib/feedback/request-origin"

export const dynamic = "force-dynamic"
const uuid = z.string().uuid()
const name = z.string().trim().min(2).max(60)
const email = z.string().trim().email().max(254)
function parse<T>(schema: z.ZodType<T>, value: unknown): T {
  const result = schema.safeParse(value)
  if (!result.success) throw new FeedbackError(400, result.error.issues[0]?.message || "Check the highlighted fields.")
  return result.data
}
function failure(error: unknown, session?: FeedbackSession | null) { return feedbackResponse({ error: error instanceof FeedbackError ? error.message : "Something went wrong. Please try again." }, error instanceof FeedbackError ? error.status : 500, session) }

export async function GET(request: NextRequest) {
  if (!feedbackIsOpen()) return feedbackResponse({ configured: false, projects: [], reviews: [], comments: [], viewer: null })
  let session: FeedbackSession | null = null
  try {
    session = await feedbackSession(request)
    const board = await feedbackRpc<Pick<FeedbackBoard, "projects" | "reviews" | "comments">>("feedback_board")
    const viewer = session ? await feedbackRpc<FeedbackViewer>("feedback_member", session.access_token) : null
    const moderation = viewer?.is_admin ? await feedbackRpc<FeedbackBoard["moderation"]>("feedback_moderation", session!.access_token) : undefined
    return feedbackResponse({ ...board, configured: true, viewer, moderation }, 200, session)
  } catch (error) { return failure(error, session) }
}

export async function POST(request: NextRequest) {
  let session: FeedbackSession | null = null
  try {
    const origin = feedbackRequestOrigin(request.headers.get("host"), process.env.NODE_ENV === "production")
    if (request.headers.get("origin") !== origin || !request.headers.get("content-type")?.startsWith("application/json")) throw new FeedbackError(403, "Open this page on Michelle’s Computer to continue.")
    if (!feedbackIsOpen()) throw new FeedbackError(503, "Public submissions aren’t open yet. You can explore the example while we connect the exchange.")
    const raw = await request.text()
    if (raw.length > 16000) throw new FeedbackError(413, "That request is too long.")
    const body = parse(z.record(z.unknown()), await Promise.resolve().then(() => JSON.parse(raw)).catch(() => null))
    if (body.action === "signin") {
      const data = parse(z.object({ email, name }), body)
      const pkce = feedbackPkce()
      const callback = new URL("/feedback/confirm", origin).toString()
      await supabaseFeedback(`/auth/v1/otp?redirect_to=${encodeURIComponent(callback)}`, { body: { email: data.email, create_user: true, data: { display_name: data.name }, code_challenge: pkce.challenge, code_challenge_method: "s256" } })
      const response = feedbackResponse({ ok: true })
      const cookie = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 3600 }
      response.cookies.set("mc-feedback-verifier", pkce.verifier, cookie)
      response.cookies.set("mc-feedback-name", data.name, cookie)
      return response
    }
    session = await feedbackSession(request)
    if (body.action === "logout") {
      if (session) await supabaseFeedback("/auth/v1/logout?scope=local", { token: session.access_token, method: "POST" })
      return feedbackResponse({ ok: true }, 200, null, true)
    }
    if (!session) throw new FeedbackError(401, "Sign in with your email to take part.")
    const token = session.access_token
    let result: unknown
    switch (body.action) {
      case "assign": result = await feedbackRpc("feedback_assign", token); break
      case "submit": {
        const data = parse(feedbackProjectSchema, body)
        result = await feedbackRpc("feedback_submit", token, { p_title: data.title, p_url: data.url, p_category: data.category, p_audience: data.audience, p_task: data.task, p_focus: data.focus }); break
      }
      case "review": {
        const data = parse(feedbackReviewSchema, body)
        result = await feedbackRpc("feedback_review", token, { p_project_id: data.projectId, p_purpose: data.purpose, p_confusion: data.confusion, p_improvement: data.improvement, p_design_score: data.designScore, p_outcome: data.outcome }); break
      }
      case "comment": {
        const data = parse(z.object({ projectId: uuid, body: z.string().trim().min(20).max(2000) }), body)
        result = await feedbackRpc("feedback_comment", token, { p_project_id: data.projectId, p_body: data.body }); break
      }
      case "report": {
        const data = parse(z.object({ kind: z.enum(["project", "review", "comment"]), id: uuid, reason: z.enum(["Unsafe link", "Spam", "Harassment", "Other"]), detail: z.string().trim().min(20).max(1000) }), body)
        result = await feedbackRpc("feedback_report", token, { p_kind: data.kind, p_id: data.id, p_reason: data.reason, p_detail: data.detail }); break
      }
      case "moderate": {
        const data = parse(z.object({ kind: z.enum(["project", "review", "comment", "report"]), id: uuid, decision: z.enum(["approve", "reject", "pick", "unpick", "hide", "restore", "resolve"]) }), body)
        result = await feedbackRpc("feedback_moderate", token, { p_kind: data.kind, p_id: data.id, p_decision: data.decision }); break
      }
      case "seed": result = await feedbackRpc("feedback_seed", token, { p_email: parse(email, body.email) }); break
      default: throw new FeedbackError(400, "Choose an action from the feedback exchange.")
    }
    return feedbackResponse({ ok: true, result }, 200, session)
  } catch (error) { return failure(error, session) }
}
