import { NextRequest } from "next/server"
import { profileSchema } from "@/lib/member/avatar"
import { feedbackRequestOrigin } from "@/lib/feedback/request-origin"
import { FeedbackError, feedbackIsOpen, feedbackResponse, feedbackRpc, feedbackSession, type FeedbackSession } from "@/lib/feedback/server"
export const dynamic = "force-dynamic"
export async function GET(request: NextRequest) {
  let session: FeedbackSession | null = null
  try {
    if (!feedbackIsOpen()) return feedbackResponse({ configured: false, viewer: null })
    session = await feedbackSession(request)
    return feedbackResponse({ configured: true, viewer: session ? await feedbackRpc("feedback_member", session.access_token) : null }, 200, session)
  } catch (error) { return feedbackResponse({ error: error instanceof FeedbackError ? error.message : "Your profile couldn’t load." }, 503, session) }
}
export async function POST(request: NextRequest) {
  let session: FeedbackSession | null = null
  try {
    if (request.headers.get("origin") !== feedbackRequestOrigin(request.headers.get("host"), process.env.NODE_ENV === "production") || !request.headers.get("content-type")?.startsWith("application/json")) throw new FeedbackError(403, "Open your profile on Michelle’s Computer to continue.")
    if (!feedbackIsOpen()) throw new FeedbackError(503, "Profiles are being connected. Try again shortly.")
    session = await feedbackSession(request)
    if (!session) throw new FeedbackError(401, "Sign in to save your portrait.")
    const raw = await request.text()
    if (raw.length > 4000) throw new FeedbackError(413, "That profile is too large.")
    const parsed = profileSchema.safeParse(await Promise.resolve().then(() => JSON.parse(raw)).catch(() => null))
    if (!parsed.success) throw new FeedbackError(400, "Choose a public name and one of the portrait options.")
    const viewer = await feedbackRpc("member_profile_save", session.access_token, { p_name: parsed.data.name, p_avatar: parsed.data.avatar })
    return feedbackResponse({ viewer }, 200, session)
  } catch (error) { return feedbackResponse({ error: error instanceof FeedbackError ? error.message : "Your portrait couldn’t save. Try again." }, error instanceof FeedbackError ? error.status : 500, session) }
}
