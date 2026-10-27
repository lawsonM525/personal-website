export const paintWidth = 720
export const paintHeight = 480
export type PaintPoint = { x: number; y: number }
export type PaintTool = "brush" | "rainbow" | "spray" | "sparkle" | "sticker" | "eraser"
export type PaintPaper = "dots" | "plain" | "checker" | "sky" | "pink"
export const paintPapers: { id: PaintPaper; name: string; preview: string }[] = [
  { id: "dots", name: "Dot paper", preview: "radial-gradient(#b0b7dc 1px,transparent 1px) 0 0 / 7px 7px,#fffdf5" },
  { id: "plain", name: "Plain paper", preview: "#fffdf5" },
  { id: "checker", name: "Checkerboard", preview: "conic-gradient(#efdcff 25%,#fff2f8 0 50%,#efdcff 0 75%,#fff2f8 0) 0 0 / 14px 14px" },
  { id: "sky", name: "Blue sky", preview: "linear-gradient(#8acbff,#e2f6ff)" },
  { id: "pink", name: "Pink sunset", preview: "linear-gradient(#f4b6dc,#ffe2c5)" },
]

export function paintPoint(client: PaintPoint, rect: { left: number; top: number; width: number; height: number }): PaintPoint {
  return { x: Math.max(0, Math.min(paintWidth, (client.x - rect.left) * paintWidth / rect.width)), y: Math.max(0, Math.min(paintHeight, (client.y - rect.top) * paintHeight / rect.height)) }
}

export function drawPaintPaper(context: CanvasRenderingContext2D, paper: PaintPaper) {
  const w = paintWidth, h = paintHeight
  context.save()
  context.clearRect(0, 0, w, h)
  if (paper === "sky" || paper === "pink") {
    const gradient = context.createLinearGradient(0, 0, 0, h)
    gradient.addColorStop(0, paper === "sky" ? "#8acbff" : "#f4b6dc")
    gradient.addColorStop(1, paper === "sky" ? "#e2f6ff" : "#ffe2c5")
    context.fillStyle = gradient
  } else context.fillStyle = paper === "checker" ? "#fff2f8" : "#fffdf5"
  context.fillRect(0, 0, w, h)
  if (paper === "checker") {
    context.fillStyle = "#efdcff"
    for (let y = 0; y < h; y += 32) for (let x = 0; x < w; x += 32) if ((x / 32 + y / 32) % 2 === 0) context.fillRect(x, y, 32, 32)
  }
  if (paper === "dots") {
    context.fillStyle = "#bac1da"
    for (let y = 12; y < h; y += 24) for (let x = 12; x < w; x += 24) { context.beginPath(); context.arc(x, y, 1, 0, Math.PI * 2); context.fill() }
  }
  context.restore()
}

export function drawSparkle(context: CanvasRenderingContext2D, at: PaintPoint, radius: number, color: string) {
  context.fillStyle = color
  context.beginPath()
  for (let n = 0; n < 8; n++) {
    const angle = n * Math.PI / 4 - Math.PI / 2, r = n % 2 ? radius * .22 : radius
    const x = at.x + Math.cos(angle) * r, y = at.y + Math.sin(angle) * r
    if (n === 0) context.moveTo(x, y); else context.lineTo(x, y)
  }
  context.closePath(); context.fill()
}

export function drawPaintStroke(context: CanvasRenderingContext2D, from: PaintPoint, to: PaintPoint, tool: Exclude<PaintTool, "sticker">, color: string, size: number, hue: number) {
  context.save()
  context.lineCap = "round"; context.lineJoin = "round"
  context.strokeStyle = tool === "rainbow" ? `hsl(${hue % 360} 94% 60%)` : color
  context.fillStyle = context.strokeStyle
  context.lineWidth = tool === "eraser" ? size * 2.5 : size
  if (tool === "eraser") context.globalCompositeOperation = "destination-out"
  if (tool === "spray") {
    for (let n = 0; n < Math.max(14, size); n++) {
      const angle = Math.random() * Math.PI * 2, radius = Math.sqrt(Math.random()) * size * 1.5
      context.fillRect(to.x + Math.cos(angle) * radius, to.y + Math.sin(angle) * radius, 1.5, 1.5)
    }
  } else if (tool === "sparkle") {
    drawSparkle(context, to, size, `hsl(${hue % 360} 95% 65%)`)
    drawSparkle(context, { x: to.x + size, y: to.y - size }, size * .35, color)
  } else {
    if (from.x === to.x && from.y === to.y) { context.beginPath(); context.arc(to.x, to.y, context.lineWidth / 2, 0, Math.PI * 2); context.fill() }
    else { context.beginPath(); context.moveTo(from.x, from.y); context.lineTo(to.x, to.y); context.stroke() }
  }
  context.restore()
}

export function drawPaintSticker(context: CanvasRenderingContext2D, image: HTMLImageElement, at: PaintPoint, size: number, angle: number, flipped: boolean) {
  context.save()
  context.translate(at.x, at.y); context.rotate(angle * Math.PI / 180); context.scale(flipped ? -1 : 1, 1)
  context.imageSmoothingEnabled = false
  context.drawImage(image, -size / 2, -size / 2, size, size)
  context.restore()
}
