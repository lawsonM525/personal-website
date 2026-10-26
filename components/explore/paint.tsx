"use client"

import { useEffect, useRef, useState, type PointerEvent } from "react"
import { Download, Eraser, RotateCcw, Undo2 } from "lucide-react"
import styles from "./explore.module.css"

const colors = [{ name: "Navy", value: "#14293e" }, { name: "Blue", value: "#0848d5" }, { name: "Orange", value: "#ed7953" }, { name: "Teal", value: "#239da5" }, { name: "Yellow", value: "#d8aa38" }, { name: "Pink", value: "#c278a6" }]
const paper = "#fffaf0"

export function Paint() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const undo = useRef<ImageData[]>([])
  const [color, setColor] = useState(colors[0].value)
  const [eraser, setEraser] = useState(false)
  const [size, setSize] = useState(4)
  const [revision, setRevision] = useState(0)
  const [message, setMessage] = useState("Draw with a finger or mouse. Save a PNG when you’re done.")
  useEffect(() => { const context = canvas.current?.getContext("2d"); if (context) { context.fillStyle = paper; context.fillRect(0, 0, 720, 480) } }, [])
  function remember() { const context = canvas.current?.getContext("2d"); if (context) { undo.current.push(context.getImageData(0, 0, 720, 480)); if (undo.current.length > 8) undo.current.shift(); setRevision(value => value + 1) } }
  function point(event: PointerEvent<HTMLCanvasElement>) { const rect = event.currentTarget.getBoundingClientRect(); return { x: (event.clientX - rect.left) * 720 / rect.width, y: (event.clientY - rect.top) * 480 / rect.height } }
  function start(event: PointerEvent<HTMLCanvasElement>) {
    if (event.button !== 0) return
    const context = canvas.current?.getContext("2d"); if (!context) return
    remember(); drawing.current = true; event.currentTarget.setPointerCapture(event.pointerId)
    const at = point(event); context.strokeStyle = eraser ? paper : color; context.fillStyle = context.strokeStyle; context.lineWidth = eraser ? size * 4 : size; context.lineCap = "round"; context.lineJoin = "round"
    context.beginPath(); context.arc(at.x, at.y, context.lineWidth / 2, 0, Math.PI * 2); context.fill(); context.beginPath(); context.moveTo(at.x, at.y)
  }
  function move(event: PointerEvent<HTMLCanvasElement>) { if (!drawing.current) return; const context = canvas.current?.getContext("2d"); if (context) { const at = point(event); context.lineTo(at.x, at.y); context.stroke() } }
  function stamp() {
    const context = canvas.current?.getContext("2d"); if (!context) return
    remember(); context.fillStyle = color; context.beginPath()
    for (let n = 0; n < 10; n++) { const angle = n * Math.PI / 5 - Math.PI / 2, radius = n % 2 ? 28 : 65; const x = 360 + Math.cos(angle) * radius, y = 240 + Math.sin(angle) * radius; if (n === 0) context.moveTo(x, y); else context.lineTo(x, y) }
    context.closePath(); context.fill(); setMessage("Star added.")
  }
  function save() { canvas.current?.toBlob(blob => { if (!blob) { setMessage("Couldn’t prepare the image. Please try again."); return }; const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "michelles-computer-paint.png"; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setMessage("Your drawing is ready to download.") }, "image/png") }
  return <div className={styles.paint}>
    <div className={styles.paintToolbar}>
      <div className={styles.palette} aria-label="Paint colors">{colors.map(item => <button key={item.value} type="button" aria-label={item.name} aria-pressed={!eraser && color === item.value} style={{ background: item.value }} onClick={() => { setColor(item.value); setEraser(false) }} />)}</div>
      <label>Brush <select value={size} onChange={event => setSize(Number(event.target.value))}><option value={4}>Fine</option><option value={10}>Medium</option><option value={20}>Thick</option></select></label>
      <button type="button" aria-pressed={eraser} onClick={() => setEraser(value => !value)}><Eraser size={16} />Eraser</button>
    </div>
    <canvas ref={canvas} width="720" height="480" aria-label="Drawing canvas. Draw with a finger, mouse or stylus, or use Add a star below." onPointerDown={start} onPointerMove={move} onPointerUp={() => { drawing.current = false }} onPointerCancel={() => { drawing.current = false }} onLostPointerCapture={() => { drawing.current = false }} />
    <div className={styles.appActions}><button type="button" onClick={stamp}>✦ Add a star</button><button type="button" disabled={!revision || !undo.current.length} onClick={() => { const image = undo.current.pop(); if (image) { canvas.current?.getContext("2d")?.putImageData(image, 0, 0); setRevision(value => value + 1) } }}><Undo2 size={16} />Undo</button><button type="button" onClick={() => { remember(); const context = canvas.current?.getContext("2d"); if (context) { context.fillStyle = paper; context.fillRect(0, 0, 720, 480) } }}><RotateCcw size={16} />Clear</button><button type="button" onClick={save}><Download size={16} />Save PNG</button></div>
    <p className={styles.appHint} role="status">{message}</p>
  </div>
}
