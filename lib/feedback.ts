import { z } from "zod"

export const feedbackReviewCost = 2
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

export const feedbackProjectSchema = z.object({
  title: z.string().trim().min(3).max(80),
  url: z.string().trim().max(2048).refine(isPublicAppUrl, "Use a public HTTPS link, without a password or access token."),
  category: z.enum(feedbackCategories),
  audience: z.string().trim().min(12).max(250),
  task: z.string().trim().min(20).max(500),
  focus: z.string().trim().min(12).max(500),
}).transform(value => ({ ...value, url: new URL(value.url).href }))

export const feedbackReviewSchema = z.object({
  projectId: z.string().uuid(),
  purpose: z.string().trim().min(40).max(1500),
  confusion: z.string().trim().min(40).max(1500),
  improvement: z.string().trim().min(40).max(1500),
  designScore: z.coerce.number().int().min(1).max(5),
  outcome: z.enum(feedbackOutcomes),
}).superRefine((value, context) => {
  const answers = [value.purpose, value.confusion, value.improvement].map(text => text.toLowerCase().replace(/\s+/g, " "))
  if (new Set(answers).size !== 3) context.addIssue({ code: z.ZodIssueCode.custom, message: "Give each question its own specific answer.", path: ["improvement"] })
})

export type FeedbackProject = z.output<typeof feedbackProjectSchema> & { id: string; owner_id: string; builder_name: string; created_at: string; status: "pending" | "approved" | "rejected"; featured: boolean; review_count: number }
export type FeedbackReview = { id: string; project_id: string; reviewer_id: string; reviewer_name: string; purpose: string; confusion: string; improvement: string; design_score: number; outcome: string; created_at: string }
export type FeedbackComment = { id: string; project_id: string; author_id: string; author_name: string; body: string; created_at: string }
export type FeedbackReport = { id: string; target_kind: "project" | "review" | "comment"; target_id: string; reason: string; detail: string; created_at: string; target?: { project_id: string; project_title: string; project_url: string; author_name: string; status: string; body: string } }
export type FeedbackHiddenContent = { id: string; kind: "review" | "comment"; project_id: string; project_title: string; author_name: string; body: string; created_at: string }
export type FeedbackViewer = { id: string; display_name: string; credits: number; is_admin: boolean; own_projects: FeedbackProject[]; assignment: { project_id: string; expires_at: string } | null }
export type FeedbackBoard = { configured: boolean; projects: FeedbackProject[]; reviews: FeedbackReview[]; comments: FeedbackComment[]; viewer: FeedbackViewer | null; moderation?: { projects: FeedbackProject[]; reports: FeedbackReport[]; hidden?: FeedbackHiddenContent[] } }

export function prioritizeFeedback(projects: FeedbackProject[]) {
  return [...projects].sort((a, b) => a.review_count - b.review_count || Date.parse(a.created_at) - Date.parse(b.created_at))
}

export const feedbackExample: FeedbackProject = {
  id: "00000000-0000-4000-8000-000000000001", owner_id: "example", title: "Michelle’s Computer", url: "https://michellescomputer.com/", category: "Website",
  audience: "Curious people learning to build with AI.", task: "Find Learn, open an article, and tell me whether it’s comfortable to read on your phone.",
  focus: "Does the desktop idea still feel easy to use on a small screen?", builder_name: "Example request", created_at: "2026-10-26T12:00:00-07:00", status: "approved", featured: false, review_count: 0,
}
