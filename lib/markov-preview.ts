export type MarkovModel = Record<string, string[]>

export function seedNumber(seed: string): number {
  let value = 2166136261
  for (const char of seed) value = Math.imul(value ^ char.charCodeAt(0), 16777619)
  return value >>> 0
}

export function trainMarkov(text: string): MarkovModel {
  const model: MarkovModel = {}
  for (const word of text.toLowerCase().match(/[a-z]{3,}/g) || []) {
    const padded = `^^${word}$`
    for (let n = 2; n < padded.length; n++) {
      const state = padded.slice(n - 2, n)
      ;(model[state] ??= []).push(padded[n])
    }
  }
  return model
}

export function previewStrength(page: number, freeThroughPage = 24, lastPage = 267): number {
  if (page <= freeThroughPage) return 0
  const progress = Math.min(1, (page - freeThroughPage - 1) / (lastPage - freeThroughPage - 1))
  return .24 + .74 * Math.pow(progress, .7)
}

// Runs during content preparation. Only the resulting text is sent to visitors.
export function scrambleText(text: string, strength: number, seed: string, model: MarkovModel): string {
  if (strength <= 0) return text
  let state = seedNumber(seed), run = 0, changed = 0
  const random = () => { state += 0x6D2B79F5; let n = state; n = Math.imul(n ^ n >>> 15, n | 1); n ^= n + Math.imul(n ^ n >>> 7, n | 61); return ((n ^ n >>> 14) >>> 0) / 4294967296 }
  const generate = (word: string) => {
    let result = "", context = "^^"
    for (let n = 0; n < word.length; n++) {
      const choices = (model[context] || model["^^"] || ["a", "e", "i", "o", "u"]).filter(char => char !== "$")
      const char = choices[Math.floor(random() * choices.length)] || "a"
      result += char; context = (context + char).slice(-2)
    }
    if (result === word.toLowerCase()) result = (result[0] === "m" ? "s" : "m") + result.slice(1)
    return word === word.toUpperCase() ? result.toUpperCase() : /^[A-Z]/.test(word) ? result[0].toUpperCase() + result.slice(1) : result
  }
  const words = [...text.matchAll(/[A-Za-z]{2,}/g)]
  const forced = words.findIndex(match => match[0].length >= 4)
  let index = 0
  return text.replace(/[A-Za-z]{2,}/g, word => {
    const replace = random() < strength || run >= 7 || index === forced && changed === 0
    index++
    if (!replace) { run++; return word }
    run = 0; changed++; return generate(word)
  })
}
