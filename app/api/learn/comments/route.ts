import { createHmac, randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { z } from "zod"
import { getSanityWriteClient } from "@/sanity/lib/write-client"

const commentSchema = z.object({
  articleId: z.string().min(1).max(200),
  displayName: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(2).max(2000),
  website: z.string().max(0).optional(),
})

export async function POST(request: Request) {
  const client = getSanityWriteClient()
  const salt = process.env.LEARN_INTERACTION_SALT
  if (!client || !salt) {
    return NextResponse.json({ error: "Comments are not connected yet." }, { status: 503 })
  }

  const parsed = commentSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: "Check your name, email, and comment." }, { status: 400 })
  }
  if (parsed.data.website) return NextResponse.json({ ok: true })

  const articleExists = await client.fetch<boolean>(`defined(*[_type == "article" && _id == $articleId][0]._id)`, {
    articleId: parsed.data.articleId,
  })
  if (!articleExists) return NextResponse.json({ error: "Article not found." }, { status: 404 })

  const emailHash = createHmac("sha256", salt).update(parsed.data.email.toLowerCase()).digest("hex")
  const cutoff = new Date(Date.now() - 10 * 60 * 1000).toISOString()
  const recentCount = await client.fetch<number>(
    `count(*[_type == "comment" && article._ref == $articleId && emailHash == $emailHash && submittedAt > $cutoff])`,
    { articleId: parsed.data.articleId, emailHash, cutoff },
  )
  if (recentCount >= 3) {
    return NextResponse.json({ error: "Give it a few minutes before commenting again." }, { status: 429 })
  }

  await client.create({
    _id: `drafts.comment.${randomUUID()}`,
    _type: "comment",
    article: { _type: "reference", _ref: parsed.data.articleId },
    displayName: parsed.data.displayName,
    emailHash,
    message: parsed.data.message,
    status: "pending",
    submittedAt: new Date().toISOString(),
  })

  return NextResponse.json({ ok: true })
}
