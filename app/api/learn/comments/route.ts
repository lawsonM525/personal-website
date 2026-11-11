import { NextRequest } from "next/server"
import { z } from "zod"
import { defineQuery } from "next-sanity"
import { sanityClient } from "@/sanity/lib/client"
import { feedbackRequestOrigin } from "@/lib/feedback/request-origin"
import { articleCommentSchema, articleReactionSchema } from "@/lib/learn-discussion"
import { FeedbackError, feedbackIsOpen, feedbackResponse, feedbackRpc, feedbackSession, type FeedbackSession } from "@/lib/feedback/server"
export const dynamic = "force-dynamic"
const publishedArticle = defineQuery(`*[_type == "article" && _id == $articleId && !(_id in path("drafts.**"))][0]{title,"slug":slug.current}`)
const articleId = z.string().regex(/^[a-zA-Z0-9_.-]{1,200}$/)
function failure(error: unknown, session?: FeedbackSession | null) { return feedbackResponse({ error: error instanceof FeedbackError ? error.message : "The conversation couldn’t connect. Try again." }, error instanceof FeedbackError ? error.status : 503, session) }
export async function GET(request: NextRequest) {
  let session: FeedbackSession | null = null
  try {
    if (!feedbackIsOpen()) throw new FeedbackError(503, "Comments are being connected. Try again shortly.")
    const parsed = articleId.safeParse(request.nextUrl.searchParams.get("articleId"))
    if (!parsed.success) throw new FeedbackError(400, "Choose an article to read the conversation.")
    session = await feedbackSession(request)
    return feedbackResponse({ comments: await feedbackRpc("learn_discussion", session?.access_token, { p_article_id: parsed.data }) }, 200, session)
  } catch (error) { return failure(error, session) }
}
export async function POST(request: NextRequest) {
  let session: FeedbackSession | null = null
  try {
    if (request.headers.get("origin") !== feedbackRequestOrigin(request.headers.get("host"), process.env.NODE_ENV === "production") || !request.headers.get("content-type")?.startsWith("application/json")) throw new FeedbackError(403, "Open this article on Michelle’s Computer to continue.")
    if (!feedbackIsOpen()) throw new FeedbackError(503, "Comments are being connected. Try again shortly.")
    session = await feedbackSession(request)
    if (!session) throw new FeedbackError(401, "Sign in to join the conversation.")
    const raw = await request.text()
    if (raw.length > 12000) throw new FeedbackError(413, "That comment is too long.")
    const body = await Promise.resolve().then(() => JSON.parse(raw)).catch(() => null)
    if (body?.action === "react") {
      const parsed = articleReactionSchema.safeParse(body)
      if (!parsed.success) throw new FeedbackError(400, "Choose a reaction for this comment.")
      await feedbackRpc("learn_react", session.access_token, { p_id: parsed.data.id, p_kind: parsed.data.kind, p_active: parsed.data.active })
      return feedbackResponse({ ok: true }, 200, session)
    }
    if (body?.action === "report") {
      const parsed = z.object({ id: z.string().uuid(), reason: z.enum(["Spam", "Harassment", "Other"]), detail: z.string().trim().min(10).max(1000) }).safeParse(body)
      if (!parsed.success) throw new FeedbackError(400, "Tell the moderators what happened.")
      await feedbackRpc("learn_report", session.access_token, { p_id: parsed.data.id, p_reason: parsed.data.reason, p_detail: parsed.data.detail })
      return feedbackResponse({ ok: true }, 200, session)
    }
    const parsed = articleCommentSchema.safeParse(body)
    if (!parsed.success) throw new FeedbackError(400, "Write between 2 and 2,000 characters, or choose a GIF from the picker.")
    const article = await sanityClient.fetch<{ title: string; slug: string } | null>(publishedArticle, { articleId: parsed.data.articleId })
    if (!article) throw new FeedbackError(404, "Article not found.")
    await feedbackRpc("learn_post", session.access_token, { p_article_id: parsed.data.articleId, p_article_title: article.title, p_article_slug: article.slug, p_body: parsed.data.message, p_parent_id: parsed.data.parentId || null, p_gif_id: parsed.data.gifId || null })
    return feedbackResponse({ ok: true }, 200, session)
  } catch (error) { return failure(error, session) }
}
