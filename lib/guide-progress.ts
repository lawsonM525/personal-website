export const guideProgressKey = "michelle-guide-reading-place-v1"
export type GuideReadingPlace = { chapterId: string; chapterTitle: string; page: number }
type ReadingStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">

export function validReadingPlace(value: unknown): value is GuideReadingPlace {
  if (!value || typeof value !== "object") return false
  const place = value as Partial<GuideReadingPlace>
  return typeof place.chapterId === "string" && /^(introduction|chapter-([1-9]|1[0-2])|glossary)$/.test(place.chapterId)
    && typeof place.chapterTitle === "string" && place.chapterTitle.length > 0 && place.chapterTitle.length <= 180
    && Number.isInteger(place.page) && place.page! >= 10 && place.page! <= 267
}

export function readGuidePlace(storage: ReadingStorage): GuideReadingPlace | null {
  try { const value: unknown = JSON.parse(storage.getItem(guideProgressKey) || "null"); return validReadingPlace(value) ? value : null } catch { return null }
}

export function saveGuidePlace(storage: ReadingStorage, place: GuideReadingPlace) {
  if (!validReadingPlace(place)) return false
  try { storage.setItem(guideProgressKey, JSON.stringify(place)); return true } catch { return false }
}

export function guidePlaceHash(place: GuideReadingPlace) { return `guide-${place.chapterId}-page-${place.page}` }

export function chapterFromGuideHash(hash: string, previewStartChapter: string) {
  if (hash === "guide-preview-start") return previewStartChapter
  const page = /^guide-(introduction|chapter-(?:[1-9]|1[0-2])|glossary)-page-(\d+)$/.exec(hash)
  if (page) return page[1]
  if (hash.startsWith("guide-preview-")) return hash.slice("guide-preview-".length)
  return hash.startsWith("guide-") ? hash.slice(6) : ""
}
