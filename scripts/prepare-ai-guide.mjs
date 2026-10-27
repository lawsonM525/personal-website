import { readFile, writeFile, mkdir } from "node:fs/promises"
import { trainMarkov, previewStrength, scrambleText } from "../lib/markov-preview.ts"

const book = JSON.parse(await readFile("_private/girly-guide-ai.full.json", "utf8"))
const corpus = book.chapters.flatMap(chapter => chapter.pages.flatMap(page => page.blocks.map(block => block.text))).join("\n")
const model = trainMarkov(corpus)
const preview = structuredClone(book)
let changed = 0
for (const chapter of preview.chapters) for (const page of chapter.pages) {
  page.obscured = previewStrength(page.number, book.freeThroughPage, book.pageCount)
  for (const [index, block] of page.blocks.entries()) {
    if (block.kind === "heading" || !page.obscured) continue
    block.text = scrambleText(block.text, block.kind === "code" ? Math.max(.8, page.obscured) : page.obscured, `${chapter.id}:${page.number}:${index}`, model)
    changed++
  }
}
await mkdir("data/books", { recursive: true })
await writeFile("data/books/girly-guide-ai.preview.json", JSON.stringify(preview))
console.log(JSON.stringify({ previewWords: book.wordCount, scrambledBlocks: changed, chapters: book.chapters.length, freeThroughPage: book.freeThroughPage }))
