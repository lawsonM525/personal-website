import { createHmac, randomUUID } from "node:crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getSanityWriteClient } from "@/sanity/lib/write-client"
import { sanityClient } from "@/sanity/lib/client"
import { feedbackRequestOrigin } from "@/lib/feedback/request-origin"

const articleIdSchema = z.string().min(1).max(200).regex(/^[a-zA-Z0-9_.-]+$/)
const likeSchema = z.object({ articleId: articleIdSchema, liked: z.boolean().optional() })
const visitorCookie = "mc_reader"

function visitorLikeId(articleId: string, visitorId: string, salt: string) {
  const visitorHash = createHmac("sha256", salt).update(visitorId).digest("hex")
  return { visitorHash, likeId: `articleLike.${createHmac("sha256", salt).update(`${articleId}:${visitorHash}`).digest("hex")}` }
}

export async function GET(request: Request) {
  const parsed = articleIdSchema.safeParse(new URL(request.url).searchParams.get("articleId"))
  if (!parsed.success) return NextResponse.json({ error: "Invalid article." }, { status: 400 })
  const client = sanityClient.withConfig({ useCdn: false, stega: false })
  const salt = process.env.LEARN_INTERACTION_SALT
  const visitorId = (await cookies()).get(visitorCookie)?.value
  const likeId = salt && visitorId ? visitorLikeId(parsed.data, visitorId, salt).likeId : ""
  try {
    const state = await client.fetch<{ count: number; liked: boolean }>(`{
      "count": count(*[_type == "articleLike" && article._ref == $articleId]),
      "liked": defined(*[_type == "articleLike" && _id == $likeId][0]._id)
    }`, { articleId: parsed.data, likeId }, { cache: "no-store" })
    return NextResponse.json({ ...state, enabled: !!(process.env.SANITY_API_WRITE_TOKEN && salt) }, { headers: { "Cache-Control": "private, no-store" } })
  } catch {
    return NextResponse.json({ error: "Likes couldn’t load. Please try again later." }, { status: 503 })
  }
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== feedbackRequestOrigin(request.headers.get("host"), process.env.NODE_ENV === "production") || !request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Open this article on Michelle’s Computer to leave a like." }, { status: 403 })
  }
  const client = getSanityWriteClient()
  const salt = process.env.LEARN_INTERACTION_SALT
  if (!client || !salt) {
    return NextResponse.json({ error: "Likes are not connected yet." }, { status: 503 })
  }

  const parsed = likeSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: "Invalid article." }, { status: 400 })

  const cookieStore = await cookies()
  const existingVisitor = cookieStore.get(visitorCookie)?.value
  const visitorId = existingVisitor || randomUUID()
  const { visitorHash, likeId } = visitorLikeId(parsed.data.articleId, visitorId, salt)
  try {
    const existingLike = await client.fetch<boolean>(`defined(*[_id == $likeId][0]._id)`, { likeId })
    const liked = parsed.data.liked ?? !existingLike

    if (!liked && existingLike) {
      await client.delete(likeId)
    } else if (liked && !existingLike) {
      const articleExists = await client.fetch<boolean>(`defined(*[_type == "article" && _id == $articleId][0]._id)`, {
        articleId: parsed.data.articleId,
      })
      if (!articleExists) return NextResponse.json({ error: "Article not found." }, { status: 404 })

      await client.createIfNotExists({
        _id: likeId,
        _type: "articleLike",
        article: { _type: "reference", _ref: parsed.data.articleId },
        visitorHash,
        likedAt: new Date().toISOString(),
      })
    }

    const count = await client.fetch<number>(`count(*[_type == "articleLike" && article._ref == $articleId])`, {
      articleId: parsed.data.articleId,
    })
    const response = NextResponse.json({ liked, count }, { headers: { "Cache-Control": "private, no-store" } })
    if (!existingVisitor) {
      response.cookies.set(visitorCookie, visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      })
    }
    return response
  } catch {
    return NextResponse.json({ error: "Your like couldn’t save. Please try again." }, { status: 503 })
  }
}
