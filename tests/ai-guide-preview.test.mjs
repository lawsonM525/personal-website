import test from "node:test"
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { trainMarkov, previewStrength, scrambleText } from "../lib/markov-preview.ts"
import { allowLocalGuideProof } from "../lib/ai-guide.ts"

const sentence = "Learning about artificial intelligence should feel like exploring a wonderful new world with your friends. We can collect examples, train models, try experiments, and learn from the results!"
const model = trainMarkov(sentence.repeat(20))

test("the existing free opening stays readable and scrambling increases through the book", () => {
  assert.equal(previewStrength(24), 0)
  assert.equal(scrambleText(sentence, 0, "free", model), sentence)
  let previous = 0
  for (let page = 25; page <= 267; page++) {
    const value = previewStrength(page)
    assert.ok(value >= previous && value < 1)
    previous = value
  }
  assert.ok(previewStrength(267) > .95)
})

test("a visitor gets a stable prepared preview, with punctuation and word lengths preserved", () => {
  const first = scrambleText(sentence, .65, "chapter-7:140:3", model)
  assert.equal(first, scrambleText(sentence, .65, "chapter-7:140:3", model))
  assert.notEqual(first, sentence)
  assert.equal(first.replace(/[A-Za-z]/g, ""), sentence.replace(/[A-Za-z]/g, ""))
  assert.deepEqual([...first.matchAll(/[A-Za-z]+/g)].map(match => match[0].length), [...sentence.matchAll(/[A-Za-z]+/g)].map(match => match[0].length))
})

test("locked prose cannot pass through unchanged or retain long readable runs", () => {
  const source = Array.from({ length: 60 }, (_, index) => `word${String.fromCharCode(97 + index % 26)}example`).join(" ")
  const preview = scrambleText(source, .24, "paid-page", trainMarkov(source))
  const a = source.split(" "), b = preview.split(" ")
  let run = 0
  for (let n = 0; n < a.length; n++) { run = a[n] === b[n] ? run + 1 : 0; assert.ok(run <= 7) }
  assert.notEqual(preview, source)
})

test("later pages visibly replace a larger share of the text", () => {
  const source = sentence.repeat(100)
  const original = source.match(/[A-Za-z]{2,}/g)
  const changes = strength => scrambleText(source, strength, "density", model).match(/[A-Za-z]{2,}/g).filter((word, index) => word !== original[index]).length / original.length
  assert.ok(changes(.95) > changes(.24) + .45)
})

test("the author proof cannot unlock a production or test server", () => {
  assert.equal(allowLocalGuideProof("development", "full"), true)
  for (const environment of ["production", "test", undefined]) assert.equal(allowLocalGuideProof(environment, "full"), false)
  assert.equal(allowLocalGuideProof("development", undefined), false)
  assert.equal(allowLocalGuideProof("development", ["full"]), false)
})

test("the prepared public book includes all twelve chapters and the glossary", async () => {
  const book = JSON.parse(await readFile("data/books/girly-guide-ai.preview.json", "utf8"))
  assert.equal(book.pageCount, 267)
  assert.equal(book.chapters.filter(chapter => chapter.number >= 1 && chapter.number <= 12).length, 12)
  assert.ok(book.chapters.find(chapter => chapter.id === "glossary"))
  assert.ok(book.wordCount > 40000)
  for (const chapter of book.chapters) for (const page of chapter.pages) {
    assert.equal(page.obscured, previewStrength(page.number, book.freeThroughPage, book.pageCount))
  }
})

test("original illustrations cover every chapter and point to complete local image assets", async () => {
  const book = JSON.parse(await readFile("data/books/girly-guide-ai.preview.json", "utf8"))
  const art = JSON.parse(await readFile("data/books/girly-guide-ai.art.json", "utf8"))
  const pages = new Map(book.chapters.flatMap(chapter => chapter.pages.map(page => [page.number, page])))
  assert.ok(Object.keys(art).length >= 170, "the restored book must include artwork throughout")
  for (const chapter of book.chapters.filter(chapter => chapter.number >= 1 && chapter.number <= 12)) {
    assert.ok(chapter.pages.some(page => art[page.number]?.length), `missing artwork in ${chapter.title}`)
  }
  for (const [number, figures] of Object.entries(art)) for (const figure of figures) {
    const page = pages.get(Number(number))
    assert.ok(page)
    assert.equal(figure.sourcePage, page.number)
    assert.ok(Number.isInteger(figure.beforeBlock) && figure.beforeBlock >= 0 && figure.beforeBlock <= page.blocks.length)
    assert.ok(figure.width > 0 && figure.height > 0 && figure.displayWidth > 0 && figure.displayWidth <= 100)
    assert.ok(figure.alt.length > 10)
    assert.match(figure.src, /^\/books\/girly-guide-to-ai\/illustrations\/art-[a-f0-9]{16}\.webp$/)
    const image = await readFile(`public${figure.src}`)
    assert.equal(image.toString("ascii", 0, 4), "RIFF")
    assert.equal(image.toString("ascii", 8, 12), "WEBP")
  }
})
