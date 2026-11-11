import { z } from "zod"

export const commentReactions = [
  { key: "love", emoji: "🩵", label: "Love this" },
  { key: "laugh", emoji: "😂", label: "Made me laugh" },
  { key: "mindblown", emoji: "🤯", label: "Mind blown" },
  { key: "sparkles", emoji: "✨", label: "Brilliant" },
  { key: "frog", emoji: "🐸", label: "Frog approved" },
] as const
export type CommentReactionKind = typeof commentReactions[number]["key"]
export type CommentReaction = { kind: CommentReactionKind; count: number; reacted: boolean }

export const commentGifs = [
  { key: "typing-cat", id: "dwEweAW0zXcGQupuAC", label: "Typing cat", artist: "ehcat", source: "https://giphy.com/gifs/cat-ehcat-netizen-dwEweAW0zXcGQupuAC" },
  { key: "happy-frog", id: "a6cbEVtlNCkylm0hKL", label: "Happy frog", artist: "Rihnlin", source: "https://giphy.com/gifs/dancing-frog-poke-dance-a6cbEVtlNCkylm0hKL" },
  { key: "happy-dance", id: "AcvtX3DDKMTy3PdvZ2", label: "Happy dance", artist: "dricstudio", source: "https://giphy.com/gifs/frog-fric-dric-AcvtX3DDKMTy3PdvZ2" },
  { key: "thank-you", id: "nPuGJbsZ4EkCu0tC9l", label: "Thank you cat", artist: "nubcat", source: "https://giphy.com/gifs/cat-nub-nubcat-nPuGJbsZ4EkCu0tC9l" },
  { key: "applause", id: "82OQwS4UmQfZ97DBYo", label: "Applause", artist: "Cartoon Hangover", source: "https://giphy.com/gifs/cartoonhangover-82OQwS4UmQfZ97DBYo" },
  { key: "sending-love", id: "ysOVMqjXvmrWqftKnO", label: "Sending love", artist: "Froggy Friends", source: "https://giphy.com/gifs/froggyfriendsofficial-happy-cute-frog-ysOVMqjXvmrWqftKnO" },
] as const
export type CommentGifKey = typeof commentGifs[number]["key"]
export function findCommentGif(key: string | null | undefined) { return commentGifs.find(gif => gif.key === key) }
export function commentGifUrl(id: string, animated = true) { return `https://media.giphy.com/media/${id}/${animated ? "200w.gif" : "200w_s.gif"}` }
const gifKey = z.enum(["typing-cat", "happy-frog", "happy-dance", "thank-you", "applause", "sending-love"])
export const articleCommentSchema = z.object({
  articleId: z.string().regex(/^[a-zA-Z0-9_.-]{1,200}$/),
  message: z.string().trim().refine(value => Array.from(value).length <= 2000),
  parentId: z.string().uuid().nullable().optional(),
  gifId: gifKey.nullable().optional(),
  website: z.string().max(0).optional(),
}).refine(value => Array.from(value.message).length >= 2 || (value.message.length === 0 && Boolean(value.gifId)), { message: "Write at least two characters or choose a GIF." })
export const articleReactionSchema = z.object({
  id: z.string().uuid(), kind: z.enum(["love", "laugh", "mindblown", "sparkles", "frog"]), active: z.boolean(),
})

// Keep replies one level deep visually, while preserving who each reply answers.
// Missing parents and malformed cycles never strand or infinitely recurse a comment.
export function commentThreads<T extends { id: string; parent_id?: string | null }>(comments: T[]) {
  const byId = new Map(comments.map(comment => [comment.id, comment]))
  const groups = new Map<string, { root: T; replies: T[] }>()
  for (const comment of comments) {
    let root = comment
    const seen = new Set([comment.id])
    while (root.parent_id && byId.has(root.parent_id) && !seen.has(root.parent_id)) {
      root = byId.get(root.parent_id)!
      seen.add(root.id)
    }
    if (root.parent_id && seen.has(root.parent_id)) root = comment
    if (!groups.has(root.id)) groups.set(root.id, { root, replies: [] })
    if (comment.id !== root.id) groups.get(root.id)!.replies.push(comment)
  }
  return [...groups.values()]
}
