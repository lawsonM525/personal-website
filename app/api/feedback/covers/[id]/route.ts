import { feedbackConfig, feedbackRpc } from "@/lib/feedback/server"

export const dynamic = "force-dynamic"
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return new Response(null, { status: 404 })
  try {
    const path = await feedbackRpc<string | null>("feedback_cover_read", undefined, { p_id: id })
    const config = feedbackConfig()
    if (!path || !config) return new Response(null, { status: 404 })
    const response = await fetch(`${config.url}/storage/v1/object/authenticated/feedback-covers/${path}`, { headers: { apikey: config.key }, cache: "no-store", signal: AbortSignal.timeout(12000) })
    if (!response.ok) return new Response(null, { status: 404 })
    return new Response(response.body, { headers: { "Content-Type": "image/webp", "X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=60", "Content-Security-Policy": "default-src 'none'; sandbox" } })
  } catch { return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } }) }
}
