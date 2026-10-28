import { NextResponse } from "next/server"
import { getPublicGuideChapter } from "@/lib/ai-guide.server"

export async function GET(_request: Request, { params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = await params
  // This endpoint only reads the prepared public preview, never the local author proof.
  const payload = getPublicGuideChapter(chapterId)
  if (!payload) return NextResponse.json({ error: "Chapter not found" }, { status: 404, headers: { "X-Robots-Tag": "noindex" } })
  return NextResponse.json(payload, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400", "X-Robots-Tag": "noindex" } })
}
