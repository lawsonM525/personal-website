import { z } from "zod"

const variants = (prefix: string, count: number) => Array.from({ length: count }, (_, index) => `${prefix}${String(index + 1).padStart(2, "0")}`)
export const avatarChoices = {
  hair: ["none", ...variants("short", 24), ...variants("long", 21)],
  eyes: variants("variant", 12),
  mouth: [...variants("happy", 13), ...variants("sad", 10)],
  clothing: variants("variant", 23),
  glasses: ["none", ...variants("light", 7), ...variants("dark", 7)],
  hat: ["none", ...variants("variant", 10)],
  beard: ["none", ...variants("variant", 8)],
  accessories: ["none", ...variants("variant", 4)],
  skinColor: ["ffdbac", "f5cfa0", "eac393", "e0b687", "cb9e6e", "b68655", "a26d3d", "8d5524", "754425", "5c3523", "43291f"],
  hairColor: ["18120f", "3b2418", "603a14", "83623b", "a78961", "cab188", "f0d38b", "ebebeb", "611c17", "bd1700", "db589b", "8054a6", "009bbd", "43794d"],
  clothingColor: ["03396c", "0a47d5", "428bca", "88d8b0", "43794d", "ff6f69", "d11141", "ffd969", "f2a8cc", "8054a6", "faf5e9", "28282c"],
  backgroundColor: ["c5e5ef", "f6bad8", "d9c8f0", "cce8b5", "f8de8b", "f5f0df", "0a47d5", "008080"],
} as const
const choice = (values: readonly string[]) => z.string().refine(value => values.includes(value), "Choose one of the avatar options.")
const choiceShape = Object.fromEntries(Object.entries(avatarChoices).map(([key, values]) => [key, choice(values)])) as Record<keyof typeof avatarChoices, ReturnType<typeof choice>>
export const avatarSchema: z.ZodType<AvatarConfig> = z.object({
  version: z.literal(1),
  ...choiceShape,
}).strict()
export type AvatarConfig = { version: 1 } & Record<keyof typeof avatarChoices, string>
export const profileSchema = z.object({ name: z.string().trim().min(2).max(60), avatar: avatarSchema }).strict()

/** Stable fallback portraits, never emails or remote avatar requests. */
export function defaultAvatar(seed: string): AvatarConfig {
  let hash = 0
  for (const character of seed) hash = (Math.imul(hash, 31) + character.charCodeAt(0)) >>> 0
  return {
    version: 1, hair: avatarChoices.hair[1 + hash % 45], eyes: "variant01", mouth: "happy01", clothing: "variant01",
    glasses: "none", hat: "none", beard: "none", accessories: "none",
    skinColor: avatarChoices.skinColor[hash % avatarChoices.skinColor.length], hairColor: "3b2418",
    clothingColor: avatarChoices.clothingColor[hash % avatarChoices.clothingColor.length], backgroundColor: avatarChoices.backgroundColor[hash % avatarChoices.backgroundColor.length],
  }
}
export function randomAvatar(random = Math.random): AvatarConfig {
  const pick = (values: readonly string[]) => values[Math.min(values.length - 1, Math.floor(random() * values.length))]
  return { ...Object.fromEntries(Object.entries(avatarChoices).map(([key, values]) => [key, pick(values)])), version: 1,
    glasses: random() < .3 ? pick(avatarChoices.glasses.slice(1)) : "none", hat: "none", beard: "none", accessories: random() < .3 ? pick(avatarChoices.accessories.slice(1)) : "none",
  } as AvatarConfig
}

export function memberReturnPath(value: unknown): string {
  if (typeof value !== "string" || value.length > 500 || /[\\\r\n]/.test(value)) return "/feedback"
  // A small allowlist prevents external redirects, including encoded slashes.
  if (value === "/feedback" || /^\/learn\/[a-z0-9-]+$/.test(value)) return value
  return "/feedback"
}
