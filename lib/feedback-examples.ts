import type { FeedbackProject } from "./feedback"

// Design examples only. These never enter the database or earn review credits.
export const feedbackConceptProjects: FeedbackProject[] = [
  { id: "00000000-0000-4000-8000-000000000011", title: "Study planner", summary: "A calm study planner with timetables and tasks.", audience: "Students who want a calmer way to plan their week.", task: "Try adding a study session for tomorrow.", builder_name: "Alex", category: "Web app" },
  { id: "00000000-0000-4000-8000-000000000012", title: "City trails", summary: "Discover and save walking routes in your city.", audience: "People looking for an enjoyable walk around their city.", task: "Find a walk you would like to try and work out how to save it.", builder_name: "Sam", category: "Web app" },
  { id: "00000000-0000-4000-8000-000000000013", title: "A little portfolio", summary: "A clean portfolio for designers and creatives.", audience: "Designers and creatives sharing their work.", task: "Find one project and work out how to contact its designer.", builder_name: "Marie", category: "Website" },
  { id: "00000000-0000-4000-8000-000000000014", title: "Pantry pal", summary: "Find easy, delicious meals with ingredients you already have.", audience: "Home cooks making dinner from the ingredients they have.", task: "Look for a recipe using the ingredients already in your pantry.", builder_name: "Jordan", category: "Web app" },
].map(project => ({ ...project, category: project.category as FeedbackProject["category"], owner_id: "example", url: "https://michellescomputer.com/feedback", focus: "First-use clarity", created_at: "2026-10-26T12:00:00-07:00", status: "approved" as const, featured: false, review_count: 0 }))

export function feedbackExampleArtwork(project: FeedbackProject): string | null {
  if (!isFeedbackExample(project)) return null
  const index = feedbackConceptProjects.findIndex(sample => sample.id === project.id)
  return index < 0 ? null : `/feedback/previews/${["study", "trails", "portfolio", "pantry"][index]}.webp`
}

export function isFeedbackExample(project: FeedbackProject): boolean {
  return project.owner_id === "example"
}
