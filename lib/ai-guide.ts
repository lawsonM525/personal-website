export const aiGuidePath = "/girly-guide-to-ai"
export const aiGuideReaderPath = `${aiGuidePath}/read`
export const aiGuidePurchaseUrl = "https://michellexcomputer.gumroad.com/l/girly-guide-to-ai"
export const aiGuideRecoveryUrl = "https://gumroad.com/license-key-lookup"

export type GuideBlock = { kind: "body" | "heading" | "code" | "callout"; text: string }
export type GuidePage = { number: number; obscured?: number; blocks: GuideBlock[] }
export type GuideChapter = { id: string; number: number; title: string; part: string; pages: GuidePage[] }
export type GuideBook = { title: string; author: string; edition: string; pageCount: number; wordCount: number; freeThroughPage: number; chapters: GuideChapter[] }
export type BookFigure = { src: string; width: number; height: number; displayWidth: number; beforeBlock: number; alt: string; sourcePage: number }
export type GuideChapterPayload = { chapter: GuideChapter; figures: Record<string, BookFigure[]>; freeThroughPage: number }

// The full local proof is an authoring aid, never a production unlock mechanism.
export function allowLocalGuideProof(environment: string | undefined, requested: string | string[] | undefined): boolean {
  return environment === "development" && requested === "full"
}
