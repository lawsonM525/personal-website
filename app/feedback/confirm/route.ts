import { NextRequest, NextResponse } from "next/server"
import { feedbackIsOpen, feedbackRpc, feedbackSessionCookies, supabaseFeedback, type FeedbackSession } from "@/lib/feedback/server"
import { feedbackRequestOrigin } from "@/lib/feedback/request-origin"
import { memberReturnPath } from "@/lib/member/avatar"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  const verifier = request.cookies.get("mc-feedback-verifier")?.value
  let session: FeedbackSession | null = null
  let success = false
  if (feedbackIsOpen() && code && code.length < 1000 && verifier) {
    try {
      session = await supabaseFeedback<FeedbackSession>("/auth/v1/token?grant_type=pkce", { body: { auth_code: code, code_verifier: verifier } })
      if (session.user.email_confirmed_at) {
        const name = request.cookies.get("mc-feedback-name")?.value || "Builder"
        await feedbackRpc("feedback_member", session.access_token, { p_name: name.length >= 2 && name.length <= 60 ? name : "Builder" })
        success = true
      }
    } catch { /* A failed/used link returns to sign-in without exposing auth details. */ }
  }
  const origin = feedbackRequestOrigin(request.headers.get("host"), process.env.NODE_ENV === "production")
  const returnTo = memberReturnPath(request.cookies.get("mc-feedback-return")?.value)
  const response = NextResponse.redirect(new URL(`${returnTo}?signin=${success ? "success" : "expired"}${returnTo.startsWith("/learn/") ? "#discussion-heading" : ""}`, origin), 303)
  response.headers.set("Cache-Control", "private, no-store")
  response.headers.set("Referrer-Policy", "no-referrer")
  if (success && session) feedbackSessionCookies(response, { ...session, refreshed: true })
  for (const name of ["mc-feedback-verifier", "mc-feedback-name", "mc-feedback-return"]) response.cookies.set(name, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 })
  return response
}
