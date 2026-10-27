export type ExplorerIconKind = "paint" | "minesweeper" | "terminal" | "folder" | "paper" | "magazine" | "penpals"

export function ExplorerIcon({ kind, size = 64 }: { kind: ExplorerIconKind; size?: number }) {
  return <img
    src={`/explorer/icons/${kind}-v1.webp`}
    alt=""
    aria-hidden="true"
    width={size}
    height={size}
    draggable={false}
    style={{ width: size, height: size, objectFit: "contain", imageRendering: "pixelated", flexShrink: 0 }}
  />
}
