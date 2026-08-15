import { createHmac, randomUUID } from "node:crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getSanityWriteClient } from "@/sanity/lib/write-client"

const likeSchema = z.object({ articleId: z.string().min(1).max(200) })
const visitorCookie = "mc_reader"

export async function POST(request: Request) {
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
  const visitorHash = createHmac("sha256", salt).update(visitorId).digest("hex")
  const likeId = `articleLike.${createHmac("sha256", salt).update(`${parsed.data.articleId}:${visitorHash}`).digest("hex")}`
  const existingLike = await client.fetch<boolean>(`defined(*[_id == $likeId][0]._id)`, { likeId })

  if (existingLike) {
    await client.delete(likeId)
  } else {
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
  const response = NextResponse.json({ liked: !existingLike, count })
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
}
