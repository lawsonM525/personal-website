import { NextRequest } from "next/server"
import { FeedbackError, feedbackConfig, feedbackIsOpen, feedbackResponse, feedbackRpc, feedbackSession, type FeedbackSession } from "@/lib/feedback/server"
import { feedbackRequestOrigin } from "@/lib/feedback/request-origin"
import { coverUploadLimit, normalizeCover } from "@/lib/feedback/cover-image"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  let session: FeedbackSession | null = null
  try {
    if (request.headers.get("origin") !== feedbackRequestOrigin(request.headers.get("host"), process.env.NODE_ENV === "production")) throw new FeedbackError(403, "Open this page on Michelle’s Computer to continue.")
    if (!feedbackIsOpen()) throw new FeedbackError(503, "Public submissions aren’t open yet.")
    session = await feedbackSession(request)
    if (!session) throw new FeedbackError(401, "Sign in before uploading your project image.")
    if (!/^image\/(jpeg|png|webp)$/.test(request.headers.get("content-type") || "")) throw new FeedbackError(400, "Choose a JPG, PNG or WebP image.")
    if (Number(request.headers.get("content-length")) > coverUploadLimit) throw new FeedbackError(413, "Try a smaller screenshot.")
    const reader = request.body?.getReader()
    if (!reader) throw new FeedbackError(400, "Choose an image first.")
    const chunks: Uint8Array[] = []; let size = 0
    while (true) {
      const part = await reader.read()
      if (part.done) break
      size += part.value.length
      if (size > coverUploadLimit) { await reader.cancel(); throw new FeedbackError(413, "Try a smaller screenshot.") }
      chunks.push(part.value)
    }
    // Reserve before decoding to enforce an account-level processing/upload cap.
    const cover = await feedbackRpc<{ id: string; path: string }>("feedback_cover_begin", session.access_token)
    let image: Awaited<ReturnType<typeof normalizeCover>>
    try { image = await normalizeCover(Buffer.concat(chunks)) }
    catch (error) { throw new FeedbackError(400, error instanceof RangeError ? error.message : "That image couldn’t be opened. Try a different JPG, PNG or WebP.") }
    const config = feedbackConfig()!
    const response = await fetch(`${config.url}/storage/v1/object/feedback-covers/${cover.path}`, {
      method: "POST", headers: { apikey: config.key, Authorization: `Bearer ${session.access_token}`, "Content-Type": "image/webp", "Cache-Control": "60", "x-upsert": "false" },
      body: new Uint8Array(image.data), cache: "no-store", signal: AbortSignal.timeout(20000),
    })
    if (!response.ok) throw new FeedbackError(503, "Your image couldn’t be saved. Please try again.")
    return feedbackResponse({ id: cover.id, width: image.width, height: image.height }, 200, session)
  } catch (error) { return feedbackResponse({ error: error instanceof FeedbackError ? error.message : "Your image couldn’t be uploaded. Please try again." }, error instanceof FeedbackError ? error.status : 500, session) }
}
