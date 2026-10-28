import { z } from "zod"

const variants = (prefix: string, count: number) => Array.from({ length: count }, (_, index) => `${prefix}${String(index + 1).padStart(2, "0")}`)
const colors = {
  skinColor: ["ffdbac", "f5cfa0", "eac393", "e0b687", "cb9e6e", "b68655", "a26d3d", "8d5524", "754425", "5c3523", "43291f"],
  hairColor: ["18120f", "3b2418", "603a14", "83623b", "a78961", "cab188", "f0d38b", "ebebeb", "611c17", "bd1700", "db589b", "8054a6", "009bbd", "43794d"],
  backgroundColor: ["c5e5ef", "f6bad8", "d9c8f0", "cce8b5", "f8de8b", "f5f0df", "0a47d5", "008080"],
} as const
export const avatarChoices = {
  hair: ["none", ...variants("short", 24), ...variants("long", 21)], eyes: variants("variant", 12),
  mouth: [...variants("happy", 13), ...variants("sad", 10)], clothing: variants("variant", 23),
  glasses: ["none", ...variants("light", 7), ...variants("dark", 7)], hat: ["none", ...variants("variant", 10)],
  beard: ["none", ...variants("variant", 8)], accessories: ["none", ...variants("variant", 4)],
  clothingColor: ["03396c", "0a47d5", "428bca", "88d8b0", "43794d", "ff6f69", "d11141", "ffd969", "f2a8cc", "8054a6", "faf5e9", "28282c"], ...colors,
} as const
export const illustratedChoices = {
  hair: ["none", ...variants("variant", 48)], eyes: variants("variant", 24),
  mouth: [...variants("happy", 18), ...variants("sad", 9)], glasses: ["none", ...variants("variant", 5)],
  beard: ["none", ...variants("variant", 2)], earrings: ["none", ...variants("variant", 3)],
  eyebrows: variants("variant", 13), head: variants("variant", 4), nose: variants("variant", 6),
  hairAccessories: ["none", "flowers"], freckles: ["none", "yes"], ...colors,
} as const
export type AvatarStyle = "illustrated" | "pixel"
export type AvatarChoiceKey = keyof typeof avatarChoices | keyof typeof illustratedChoices
export type PixelAvatarConfig = { version: 1 } & Record<keyof typeof avatarChoices, string>
export type IllustratedAvatarConfig = { version: 2; style: "illustrated" } & Record<keyof typeof illustratedChoices, string>
export type AvatarConfig = PixelAvatarConfig | IllustratedAvatarConfig
const choice = (values: readonly string[]) => z.string().refine(value => values.includes(value), "Choose one of the avatar options.")
function shape<T extends Record<string, readonly string[]>>(choices: T) { return Object.fromEntries(Object.entries(choices).map(([key, values]) => [key, choice(values)])) as Record<keyof T, ReturnType<typeof choice>> }
export const avatarSchema: z.ZodType<AvatarConfig> = z.union([
  z.object({ version: z.literal(1), ...shape(avatarChoices) }).strict(),
  z.object({ version: z.literal(2), style: z.literal("illustrated"), ...shape(illustratedChoices) }).strict(),
])
export const profileSchema = z.object({ name: z.string().trim().min(2).max(60), avatar: avatarSchema }).strict()
export const avatarStyle = (avatar: AvatarConfig): AvatarStyle => avatar.version === 2 ? "illustrated" : "pixel"
export function avatarOptions(avatar: AvatarConfig): Record<string, readonly string[]> { return avatar.version === 2 ? illustratedChoices : avatarChoices }

/** Stable fallback portraits, never emails or remote avatar requests. */
export function defaultAvatar(seed: string, style: AvatarStyle = "illustrated"): AvatarConfig {
  let hash = 0
  for (const character of seed) hash = (Math.imul(hash, 31) + character.charCodeAt(0)) >>> 0
  const shared = { eyes: "variant01", mouth: "happy01", glasses: "none", beard: "none", skinColor: colors.skinColor[hash % colors.skinColor.length], hairColor: "3b2418", backgroundColor: colors.backgroundColor[hash % colors.backgroundColor.length] }
  if (style === "illustrated") return { ...shared, version: 2, style: "illustrated", hair: illustratedChoices.hair[1 + hash % 48], earrings: "none", eyebrows: "variant01", head: "variant01", nose: "variant01", hairAccessories: "none", freckles: "none" }
  return { ...shared, version: 1, hair: avatarChoices.hair[1 + hash % 45], clothing: "variant01", hat: "none", accessories: "none", clothingColor: avatarChoices.clothingColor[hash % avatarChoices.clothingColor.length] }
}
export function randomAvatar(style: AvatarStyle = "illustrated", random = Math.random): AvatarConfig {
  const pick = (values: readonly string[]) => values[Math.min(values.length - 1, Math.floor(random() * values.length))]
  const options = style === "illustrated" ? illustratedChoices : avatarChoices
  const choices = Object.fromEntries(Object.entries(options).map(([key, values]) => [key, pick(values)]))
  return avatarSchema.parse({ ...choices, glasses: random() < .3 ? pick(options.glasses.slice(1)) : "none", beard: "none", ...(style === "illustrated" ? { version: 2, style, hairAccessories: "none", freckles: random() < .25 ? "yes" : "none" } : { version: 1, hat: "none", accessories: random() < .3 ? pick(avatarChoices.accessories.slice(1)) : "none" }) })
}
export function memberReturnPath(value: unknown): string {
  if (typeof value !== "string" || value.length > 500 || /[\\\r\n]/.test(value)) return "/feedback"
  if (value === "/feedback" || /^\/learn\/[a-z0-9-]+$/.test(value)) return value
  return "/feedback"
}
