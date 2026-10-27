export type StickerPack = "Little guys" | "Desk junk" | "Computer"
export type PaintSticker = { id: string; name: string; pack: StickerPack; src: string }

const littleGuys = ["Frog", "Cat", "Rubber duck", "Goose", "Dolphin", "Butterfly", "Cherries", "Strawberry", "Daisy", "Rainbow cloud", "Mushroom", "Alien", "Ringed planet", "Smiley", "Moon", "Twinkles"]
const deskJunk = ["Cyan computer", "Pink floppy", "Compact disc", "Film camera", "Lava lamp", "Telephone", "Pink bow", "Roller skate", "Disco ball", "Chrome star", "Secret diary", "Heart stamp", "Airmail", "Seashell", "Red heart", "Cassette"]
const pack = (names: string[], folder: string, label: StickerPack): PaintSticker[] => names.map((name, index) => ({ id: `${folder}-${index}`, name, pack: label, src: `/explorer/paint/${folder}/${index}.webp` }))

export const paintStickers: PaintSticker[] = [
  ...pack(littleGuys, "little-guys", "Little guys"),
  ...pack(deskJunk, "desk-junk", "Desk junk"),
  ...["paint", "minesweeper", "terminal", "folder", "paper", "magazine", "penpals"].map(name => ({ id: `computer-${name}`, name: ({ paint: "Paint palette", minesweeper: "Minefield", terminal: "DOS computer", folder: "Folder", paper: "Document", magazine: "Magazine", penpals: "Letter" } as Record<string, string>)[name], pack: "Computer" as const, src: `/explorer/icons/${name}-v1.webp` })),
]
