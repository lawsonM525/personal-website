import "server-only"
import { readFile } from "node:fs/promises"
import path from "node:path"
import publicPreview from "@/data/books/girly-guide-ai.preview.json"
import artwork from "@/data/books/girly-guide-ai.art.json"
import { allowLocalGuideProof, type GuideBook, type GuideChapter, type GuideChapterPayload, type BookFigure } from "./ai-guide"

export function guideChapterPayload(chapter: GuideChapter, freeThroughPage: number): GuideChapterPayload {
  const art = artwork as Record<string, BookFigure[]>
  return { chapter, freeThroughPage, figures: Object.fromEntries(chapter.pages.filter(page => art[String(page.number)]).map(page => [String(page.number), art[String(page.number)]])) }
}

export function getPublicGuideChapter(id: string): GuideChapterPayload | undefined {
  const book = publicPreview as GuideBook
  const chapter = book.chapters.find(chapter => chapter.id === id)
  return chapter ? guideChapterPayload(chapter, book.freeThroughPage) : undefined
}

export async function getAiGuide(requested: string | string[] | undefined): Promise<{ book: GuideBook; fullText: boolean }> {
  if (allowLocalGuideProof(process.env.NODE_ENV, requested)) {
    try {
      const source = await readFile(path.join(process.cwd(), "_private/girly-guide-ai.full.json"), "utf8")
      return { book: JSON.parse(source) as GuideBook, fullText: true }
    } catch {
      // A missing local source must fall back to the prepared public preview.
    }
  }
  return { book: publicPreview as GuideBook, fullText: false }
}
