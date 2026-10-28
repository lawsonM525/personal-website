import { z } from "zod"
import type { AvatarConfig } from "./member/avatar"

export const feedbackReviewCost = 3
export const feedbackReplyMinLength = 500
export const feedbackReplyMaxLength = 2000
export function feedbackReplyLength(value: string) { return Array.from(value.trim()).length }
export const feedbackReplyBodySchema = z.string().trim()
  .refine(value => feedbackReplyLength(value) >= feedbackReplyMinLength, "Share at least 500 characters so the builder has something useful to work with.")
  .refine(value => feedbackReplyLength(value) <= feedbackReplyMaxLength, "Keep your reply under 2,000 characters.")

export const feedbackRatingCategories = [
  { key: "design", label: "Design", hint: "How it looks and feels." },
  { key: "usability", label: "Ease of use", hint: "How easy it is to find your way." },
  { key: "usefulness", label: "Usefulness", hint: "How well it solves a real problem." },
] as const
const starScore = z.number().int().min(1).max(5)
export const feedbackRatingsSchema = z.object({ design: starScore, usability: starScore, usefulness: starScore }, { required_error: "Choose a star rating for all three categories." }).strict()
export type FeedbackRatings = z.output<typeof feedbackRatingsSchema>
export const feedbackCommentSchema = z.object({ projectId: z.string().uuid(), body: feedbackReplyBodySchema, ratings: feedbackRatingsSchema.optional() })
export const feedbackCategories = ["Web app", "Website", "Mobile app", "Creative experiment"] as const
export const feedbackOutcomes = ["Completed it", "Partly completed it", "Got stuck"] as const

export function isPublicAppUrl(value: string): boolean {
  try {
    const url = new URL(value)
    const host = url.hostname.toLowerCase()
    const labels = host.split(".")
    return url.protocol === "https:" && !url.username && !url.password && !url.port && labels.length >= 2 &&
      labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)) &&
      /^[a-z]{2,63}$/.test(labels.at(-1) || "") &&
      !/(^|\.)(localhost|local|internal|test|invalid|example|onion)$/.test(host) &&
      !host.endsWith(".localdomain") &&
      !Array.from(url.searchParams.keys()).some(key => /^(token|access_token|api_key|apikey|secret|password|auth)$/i.test(key))
  } catch { return false }
}

export const feedbackSummarySchema = z.string().trim().min(15, "Describe your project in at least 15 characters.").max(180, "Keep the project summary under 180 characters.").refine(value => !/[\r\n]/.test(value), "Keep the project summary to one line.")

export const feedbackProjectSchema = z.object({
  title: z.string().trim().min(3).max(80),
  summary: feedbackSummarySchema,
  url: z.string().trim().max(2048).refine(isPublicAppUrl, "Use a public HTTPS link, without a password or access token."),
  category: z.enum(feedbackCategories),
  audience: z.string().trim().min(12).max(250),
  task: z.string().trim().min(20).max(500),
  focus: z.string().trim().min(12).max(500),
}).transform(value => ({ ...value, url: new URL(value.url).href }))

export const feedbackObservationSchema = z.object({
  where: z.string().trim().min(3, "Name the screen, control, or step you tried.").max(180),
  happened: z.string().trim().min(40, "Describe what happened in at least 40 characters.").max(1000),
  suggestion: z.string().trim().min(40, "Explain what would help in at least 40 characters.").max(1000),
})
export type FeedbackObservation = z.output<typeof feedbackObservationSchema>
export const feedbackReviewSchema = z.object({
  projectId: z.string().uuid(),
  purpose: z.string().trim().min(40).max(1500),
  observations: z.array(feedbackObservationSchema).length(3, "Share three specific observations."),
  ratings: feedbackRatingsSchema,
  outcome: z.enum(feedbackOutcomes),
}).superRefine((value, context) => {
  const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, " ")
  if (["happened", "suggestion"].some(key => new Set(value.observations.map(item => normalize(item[key as keyof FeedbackObservation]))).size !== 3) || value.observations.some(item => normalize(item.happened) === normalize(item.suggestion))) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Give each observation its own experience and suggestion.", path: ["observations"] })
  }
})

export type FeedbackProject = Omit<z.output<typeof feedbackProjectSchema>, "summary"> & { summary?: string | null; id: string; owner_id: string; builder_name: string; avatar?: AvatarConfig | null; cover_id?: string | null; created_at: string; status: "pending" | "approved" | "rejected"; featured: boolean; review_count: number }
export type ReviewerStats = { completed: number; helpful_reviews: number; helped_builders: number }
export type FeedbackReviewer = ReviewerStats & { id: string; name: string; avatar?: AvatarConfig | null }
export type FeedbackReview = { id: string; project_id: string; reviewer_id: string; reviewer_name: string; avatar?: AvatarConfig | null; purpose: string; confusion: string; improvement: string; observations?: FeedbackObservation[] | null; useful_observations?: number[]; reviewer_stats?: ReviewerStats; design_score: number; ratings?: FeedbackRatings | null; outcome: string; created_at: string }
export type FeedbackComment = { id: string; project_id: string; author_id: string; author_name: string; avatar?: AvatarConfig | null; body: string; ratings?: FeedbackRatings | null; created_at: string }
export type FeedbackReport = { id: string; target_kind: "project" | "review" | "comment"; target_id: string; reason: string; detail: string; created_at: string; target?: { project_id: string; project_title: string; project_url: string; author_name: string; status: string; body: string } }
export type FeedbackHiddenContent = { id: string; kind: "review" | "comment"; project_id: string; project_title: string; author_name: string; body: string; created_at: string }
export type FeedbackViewer = { id: string; display_name: string; avatar?: AvatarConfig | null; credits: number; submission_cost: 0 | 3; reviewer_stats?: ReviewerStats; is_admin: boolean; own_projects: FeedbackProject[]; assignment: { project_id: string; expires_at: string } | null }
export type ArticleMemberComment = { id: string; author_name: string; avatar?: AvatarConfig | null; body: string; created_at: string; article_title: string; article_slug: string; status?: "published" | "hidden" }
export type ArticleModeration = { comments: ArticleMemberComment[]; reports: { id: string; comment_id: string; reason: string; detail: string; body: string; author_name: string; article_title: string; article_slug: string }[] }
export type FeedbackBoard = { configured: boolean; submission_cost?: 0 | 3; launch_remaining?: number; reviewers?: FeedbackReviewer[]; projects: FeedbackProject[]; reviews: FeedbackReview[]; comments: FeedbackComment[]; viewer: FeedbackViewer | null; moderation?: { projects: FeedbackProject[]; reports: FeedbackReport[]; hidden?: FeedbackHiddenContent[]; discussion?: ArticleModeration } }

export function prioritizeFeedback(projects: FeedbackProject[]) {
  return [...projects].sort((a, b) => a.review_count - b.review_count || Date.parse(a.created_at) - Date.parse(b.created_at))
}

export const feedbackExample: FeedbackProject = {
  id: "00000000-0000-4000-8000-000000000001", owner_id: "example", title: "Michelle’s Computer", url: "https://michellescomputer.com/", category: "Website",
  summary: "A playful desktop full of AI guides, projects and creative experiments.", audience: "Curious people learning to build with AI.", task: "Find Learn, open an article, and tell me whether it’s comfortable to read on your phone.",
  focus: "Does the desktop idea still feel easy to use on a small screen?", builder_name: "Example request", created_at: "2026-10-26T12:00:00-07:00", status: "approved", featured: false, review_count: 0,
}
