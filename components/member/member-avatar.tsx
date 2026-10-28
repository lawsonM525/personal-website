import { useMemo } from "react"
import { createAvatar } from "@dicebear/core"
import * as pixelArt from "@dicebear/pixel-art"
import { avatarSchema, defaultAvatar, type AvatarConfig } from "@/lib/member/avatar"

function portrait(config: AvatarConfig) {
  const optional = <T extends string>(value: string) => value === "none" ? [] : [value as T]
  return createAvatar(pixelArt, {
    seed: "michelles-computer-v1", size: 128, radius: 0,
    backgroundColor: [config.backgroundColor], skinColor: [config.skinColor], hairColor: [config.hairColor],
    clothingColor: [config.clothingColor], eyesColor: ["344052"], mouthColor: ["bb6071"],
    glassesColor: ["17233a"], hatColor: [config.clothingColor], accessoriesColor: ["ffd969"],
    hair: optional(config.hair), eyes: optional(config.eyes), mouth: optional(config.mouth), clothing: optional(config.clothing),
    glasses: optional(config.glasses), glassesProbability: config.glasses === "none" ? 0 : 100,
    hat: optional(config.hat), hatProbability: config.hat === "none" ? 0 : 100,
    beard: optional(config.beard), beardProbability: config.beard === "none" ? 0 : 100,
    accessories: optional(config.accessories), accessoriesProbability: config.accessories === "none" ? 0 : 100,
  }).toDataUri()
}
export function MemberAvatar({ avatar, name, size = 40, className = "" }: { avatar?: AvatarConfig | null; name: string; size?: number; className?: string }) {
  const src = useMemo(() => { const parsed = avatarSchema.safeParse(avatar); return portrait(parsed.success ? parsed.data : defaultAvatar(name)) }, [avatar, name])
  return <img src={src} alt="" aria-hidden="true" width={size} height={size} className={className} style={{ width: size, height: size, imageRendering: "pixelated", flexShrink: 0, display: "inline-block", verticalAlign: "middle" }} />
}
