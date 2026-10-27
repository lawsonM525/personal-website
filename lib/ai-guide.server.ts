import "server-only"
import { readFile } from "node:fs/promises"
import path from "node:path"
import publicPreview from "@/data/books/girly-guide-ai.preview.json"
import { allowLocalGuideProof, type GuideBook } from "./ai-guide"

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
