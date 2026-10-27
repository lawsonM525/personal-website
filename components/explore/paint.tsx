"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import { Download, Eraser, FlipHorizontal2, Paintbrush, Rainbow, Redo2, RotateCcw, Sparkles, SprayCan, Sticker, Trash2, Undo2, Volume2, VolumeX, WandSparkles, Palette, FileImage, SlidersHorizontal, X } from "@/components/retro-icons"
import { useComputerSound } from "@/components/homepage/computer-sounds"
import { drawPaintPaper, drawPaintSticker, drawPaintStroke, drawSparkle, paintHeight, paintPapers, paintPoint, paintWidth, type PaintPaper, type PaintPoint, type PaintTool } from "@/lib/paint"
import type { ComputerSoundCue } from "@/lib/computer-sounds"
import { paintStickers, type PaintSticker, type StickerPack } from "./paint-stickers"
import styles from "./paint.module.css"

const colors = ["#14293e", "#fffdf5", "#0848d5", "#348eff", "#7c39e9", "#bd70ef", "#ed478c", "#ff9cca", "#ef4b3e", "#ff8f44", "#ffd642", "#bde048", "#2b9667", "#60cdaa", "#4bcddd", "#b29377"]
const tools = [
  { id: "sticker", label: "Stickers", icon: <Sticker size={19} /> },
  { id: "brush", label: "Brush", icon: <Paintbrush size={19} /> },
  { id: "rainbow", label: "Rainbow", icon: <Rainbow size={19} /> },
  { id: "spray", label: "Spray", icon: <SprayCan size={19} /> },
  { id: "sparkle", label: "Glitter", icon: <Sparkles size={19} /> },
  { id: "eraser", label: "Eraser", icon: <Eraser size={19} /> },
] satisfies { id: PaintTool; label: string; icon: React.ReactNode }[]
type Snapshot = { image: ImageData; paper: PaintPaper; marked: boolean }
// Keep the current drawing while navigating this loaded computer. A reload starts a new session.
let sessionDraft: { drawing: Snapshot; history: Snapshot[]; future: Snapshot[] } | null = null
type Gesture = { last: PaintPoint; hue: number }
const center = { x: paintWidth / 2, y: paintHeight / 2 }

export function Paint() {
  const trays = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const backdrop = useRef<HTMLCanvasElement>(null)
  const history = useRef<Snapshot[]>([])
  const future = useRef<Snapshot[]>([])
  const images = useRef(new Map<string, HTMLImageElement>())
  const gesture = useRef<Gesture | null>(null)
  const marked = useRef(false)
  const paperRef = useRef<PaintPaper>("dots")
  const lastSound = useRef(-Infinity)
  const sound = useComputerSound()
  const [mobilePanel, setMobilePanel] = useState<"stickers" | "colors" | "paper" | "more" | null>(null)
  const [tool, setTool] = useState<PaintTool>("sticker")
  const [color, setColor] = useState("#0848d5")
  const [brushSize, setBrushSize] = useState(14)
  const [stickerSize, setStickerSize] = useState(96)
  const [angle, setAngle] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [paper, setPaper] = useState<PaintPaper>("dots")
  const [pack, setPack] = useState<StickerPack>("Little guys")
  const [selected, setSelected] = useState(paintStickers[0])
  const [loaded, setLoaded] = useState(0)
  const [hasMarks, setHasMarks] = useState(false)
  const [cursor, setCursor] = useState({ ...center, visible: false })
  const [pulse, setPulse] = useState({ ...center, id: 0 })
  const [message, setMessage] = useState("Pick a sticker, then click or drag on the page. Go a little overboard.")
  const [, refreshHistory] = useState(0)
  const available = paintStickers.filter(item => item.pack === pack)

  useEffect(() => {
    let disposed = false
    const pending = paintStickers.map(item => {
      const image = new Image()
      image.onload = () => { if (!disposed) { images.current.set(item.id, image); setLoaded(images.current.size) } }
      image.onerror = () => { if (!disposed) setMessage("A sticker couldn’t load. The other stickers and brushes still work.") }
      image.src = item.src
      return image
    })
    return () => { disposed = true; pending.forEach(image => { image.onload = null; image.onerror = null }) }
  }, [])
  useEffect(() => {
    if (!mobilePanel) return
    function escape(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return
      setMobilePanel(null)
      trays.current?.querySelector<HTMLButtonElement>(`[data-tray="${mobilePanel}"]`)?.focus({ preventScroll: true })
    }
    window.addEventListener("keydown", escape)
    return () => window.removeEventListener("keydown", escape)
  }, [mobilePanel])
  useEffect(() => { const context = backdrop.current?.getContext("2d"); if (context) drawPaintPaper(context, paper) }, [paper])
  useEffect(() => {
    const element = canvas.current
    if (!element) return
    if (sessionDraft) {
      history.current = sessionDraft.history
      future.current = sessionDraft.future
      restore(sessionDraft.drawing)
    }
    return () => {
      // Capture the element before React clears its ref during route removal.
      const context = element.getContext("2d")
      if (context) sessionDraft = {
        drawing: { image: context.getImageData(0, 0, paintWidth, paintHeight), paper: paperRef.current, marked: marked.current },
        history: history.current,
        future: future.current,
      }
    }
  }, [])

  function snapshot(): Snapshot | null {
    const context = canvas.current?.getContext("2d")
    return context ? { image: context.getImageData(0, 0, paintWidth, paintHeight), paper: paperRef.current, marked: marked.current } : null
  }
  function remember() {
    const previous = snapshot(); if (!previous) return
    history.current.push(previous); if (history.current.length > 16) history.current.shift()
    future.current = []; refreshHistory(value => value + 1)
  }
  function mark(value = true) { marked.current = value; setHasMarks(value) }
  function setBackdrop(value: PaintPaper) { paperRef.current = value; setPaper(value) }
  function restore(value: Snapshot) {
    canvas.current?.getContext("2d")?.putImageData(value.image, 0, 0)
    setBackdrop(value.paper); mark(value.marked); gesture.current = null
    refreshHistory(value => value + 1)
  }
  function undo() {
    const previous = history.current.pop(), current = snapshot()
    if (!previous || !current) return
    future.current.push(current); restore(previous); sound?.play("click"); setMessage("Undone. Every good experiment has an undo button.")
  }
  function redo() {
    const next = future.current.pop(), current = snapshot()
    if (!next || !current) return
    history.current.push(current); restore(next); sound?.play("click"); setMessage("Back again.")
  }
  function playDrawing(cue: ComputerSoundCue) {
    const now = performance.now()
    if (now - lastSound.current < 140) return
    lastSound.current = now; sound?.play(cue)
  }
  function position(event: PointerEvent<HTMLCanvasElement>) { return paintPoint({ x: event.clientX, y: event.clientY }, event.currentTarget.getBoundingClientRect()) }
  function dab(at: PaintPoint, from = at, hue = 0) {
    const context = canvas.current?.getContext("2d"); if (!context) return
    if (tool === "sticker") {
      const image = images.current.get(selected.id); if (!image) return
      drawPaintSticker(context, image, at, stickerSize, angle, flipped)
      setPulse({ ...at, id: Date.now() }); playDrawing("paintStamp")
    } else {
      drawPaintStroke(context, from, at, tool, color, brushSize, hue)
      playDrawing(tool === "sparkle" || tool === "rainbow" ? "paintSparkle" : "paintSpray")
    }
    mark()
  }
  function start(event: PointerEvent<HTMLCanvasElement>) {
    if (event.button !== 0 || !event.isPrimary) return
    if (tool === "sticker" && !images.current.has(selected.id)) { setMessage("This sticker is still loading. Try a brush while it arrives."); return }
    const at = position(event)
    remember(); gesture.current = { last: at, hue: 0 }
    event.currentTarget.setPointerCapture(event.pointerId)
    setCursor({ ...at, visible: event.pointerType !== "touch" }); dab(at)
    setMessage(tool === "sticker" ? `${selected.name} stamped. Drag for a whole parade.` : "A little mess is a good thing.")
  }
  function move(event: PointerEvent<HTMLCanvasElement>) {
    const at = position(event); setCursor({ ...at, visible: event.pointerType !== "touch" })
    const stroke = gesture.current; if (!stroke) return
    const distance = Math.hypot(at.x - stroke.last.x, at.y - stroke.last.y)
    if (tool === "sticker" && distance < stickerSize * .65 || tool === "sparkle" && distance < brushSize * .8) return
    stroke.hue += distance * 1.3
    dab(at, stroke.last, stroke.hue); stroke.last = at
  }
  function finish(event: PointerEvent<HTMLCanvasElement>) {
    gesture.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  function chooseSticker(item: PaintSticker) { setMobilePanel(null); setSelected(item); setTool("sticker"); sound?.play("paintStamp"); setMessage(`${item.name} selected. Tap the page to place it.`) }
  function stampCenter() {
    if (!images.current.has(selected.id)) return
    setTool("sticker"); remember()
    const context = canvas.current?.getContext("2d"); if (!context) return
    drawPaintSticker(context, images.current.get(selected.id)!, center, stickerSize, angle, flipped)
    mark(); setPulse({ ...center, id: Date.now() }); sound?.play("paintStamp"); setMessage(`${selected.name}, front and center.`)
  }
  function collage(replace: boolean) {
    const pool = (replace ? paintStickers : available).filter(item => images.current.has(item.id))
    const context = canvas.current?.getContext("2d"); if (!context || !pool.length) return
    remember()
    if (replace) { context.clearRect(0, 0, paintWidth, paintHeight); setBackdrop(paintPapers[Math.floor(Math.random() * paintPapers.length)].id) }
    for (let n = 0; n < (replace ? 13 : 9); n++) {
      const item = pool[Math.floor(Math.random() * pool.length)]
      drawPaintSticker(context, images.current.get(item.id)!, { x: 65 + Math.random() * (paintWidth - 130), y: 65 + Math.random() * (paintHeight - 130) }, 65 + Math.random() * 95, Math.random() * 50 - 25, Math.random() > .7)
    }
    for (let n = 0; n < 22; n++) drawSparkle(context, { x: Math.random() * paintWidth, y: Math.random() * paintHeight }, 3 + Math.random() * 8, colors[Math.floor(Math.random() * colors.length)])
    mark(); sound?.play("paintMagic"); setMessage(replace ? "A tiny masterpiece, courtesy of chaos. Keep going or Undo." : "Sticker bomb! One undo removes the whole batch.")
  }
  function clear() { remember(); canvas.current?.getContext("2d")?.clearRect(0, 0, paintWidth, paintHeight); mark(false); sound?.play("paintSpray"); setMessage("Fresh page. Your last drawing is one Undo away.") }
  function changePaper(value: PaintPaper) { setMobilePanel(null); if (value === paperRef.current) return; remember(); setBackdrop(value); sound?.play("paintMagic"); setMessage("New paper. Your artwork stays right where it is.") }
  function save() {
    const drawing = canvas.current; if (!drawing) return
    const output = document.createElement("canvas"); output.width = paintWidth; output.height = paintHeight
    const context = output.getContext("2d"); if (!context) return
    drawPaintPaper(context, paperRef.current); context.drawImage(drawing, 0, 0)
    output.toBlob(blob => {
      if (!blob) { setMessage("Couldn’t prepare the image. Please try again."); return }
      const url = URL.createObjectURL(blob), link = document.createElement("a")
      link.href = url; link.download = "made-on-michelles-computer.png"; link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      sound?.play("paintMagic"); setMessage("Saved as a PNG. Put it on the fridge.")
    }, "image/png")
  }
  function keyboard(event: KeyboardEvent<HTMLCanvasElement>) {
    const deltas: Record<string, PaintPoint> = { ArrowLeft: { x: -12, y: 0 }, ArrowRight: { x: 12, y: 0 }, ArrowUp: { x: 0, y: -12 }, ArrowDown: { x: 0, y: 12 } }
    if (deltas[event.key]) { event.preventDefault(); const delta = deltas[event.key]; setCursor(previous => ({ x: Math.max(0, Math.min(paintWidth, previous.x + delta.x)), y: Math.max(0, Math.min(paintHeight, previous.y + delta.y)), visible: true })) }
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); if (tool === "sticker" && !images.current.has(selected.id)) return; remember(); dab(cursor); setMessage("Placed at the keyboard cursor. Arrow keys move it.") }
  }
  function shortcuts(event: KeyboardEvent<HTMLDivElement>) {
    if (!(event.metaKey || event.ctrlKey)) return
    if (event.key.toLowerCase() === "z") { event.preventDefault(); event.shiftKey ? redo() : undo() }
    if (event.key.toLowerCase() === "y") { event.preventDefault(); redo() }
  }

  function togglePanel(panel: NonNullable<typeof mobilePanel>) { setMobilePanel(value => value === panel ? null : panel) }
  function sheetHeading(title: string) { return <div className={styles.mobileSheetHeading}><strong>{title}</strong><button type="button" aria-label="Close Paint tray" onClick={() => setMobilePanel(null)}><X size={18}/></button></div> }

  return <div className={styles.paint} data-mobile-panel={mobilePanel ?? "none"} data-sound-ignore onKeyDown={shortcuts}>
    <div className={styles.heading}>
      <img src="/explorer/icons/paint-v1.webp" width="38" height="38" alt="" />
      <div><strong>Paint Club</strong><span>Make a little mess.</span></div>
      <button type="button" className={styles.sound} aria-label="Paint sound effects" aria-pressed={!!sound?.enabled} onClick={sound?.toggle}>{sound?.enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>Sound {sound?.enabled ? "on" : "off"}</span></button>
    </div>
    <div className={styles.menu} aria-label="Drawing actions">
      <button type="button" aria-label="Undo" disabled={!history.current.length} onClick={undo}><Undo2 size={16} /><span>Undo</span></button>
      <button type="button" aria-label="Redo" disabled={!future.current.length} onClick={redo}><Redo2 size={16} /><span>Redo</span></button>
      <button type="button" aria-label="Clear canvas" disabled={!hasMarks} onClick={clear}><Trash2 size={16} /><span>Clear</span></button>
      <button type="button" className={styles.mobileSurprise} disabled={!loaded} onClick={() => collage(true)}><WandSparkles size={16}/>Surprise!</button>
      <button type="button" className={styles.save} onClick={save}><Download size={14} />Save PNG</button>
    </div>
    <div className={styles.studio}>
      <div className={styles.tools} role="toolbar" aria-label="Painting tools">{tools.map(item => <button key={item.id} type="button" aria-label={item.label} aria-pressed={tool === item.id} title={item.label} onClick={() => { setTool(item.id); setMobilePanel(item.id === "sticker" && window.matchMedia("(max-width: 760px)").matches ? "stickers" : null); sound?.play("click"); setMessage(item.id === "sticker" ? "Choose a sticker, then stamp the page." : `${item.label} selected. Drag on the page.`) }}>{item.icon}<span>{item.label}</span></button>)}</div>
      <div className={styles.drawingArea}>
        <div className={styles.quickPicker}>
          <div><span>Pick a sticker</span><a href="#paint-sticker-drawer">All {paintStickers.length} ↓</a></div>
          <div>{available.slice(0, 8).map(item => <button key={item.id} type="button" aria-label={`Quick select ${item.name} sticker`} aria-pressed={tool === "sticker" && selected.id === item.id} onClick={() => chooseSticker(item)}><img src={item.src} alt="" width="32" height="32" /></button>)}</div>
        </div>
        <div className={styles.pageCaption}><span>UNTITLED.PNG</span><span>{paintWidth} × {paintHeight}</span></div>
        <div className={styles.canvasViewport}><div className={styles.stage}>
          <canvas ref={backdrop} className={styles.backdrop} width={paintWidth} height={paintHeight} aria-hidden="true" />
          <canvas ref={canvas} className={`${styles.canvas} ${tool === "sticker" && loaded ? styles.stampCursor : ""}`} width={paintWidth} height={paintHeight} tabIndex={0} aria-label="Drawing canvas. Click or drag to draw or stamp. Arrow keys move the cursor; Enter or Space places a mark." onPointerDown={start} onPointerMove={move} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={() => { gesture.current = null }} onPointerLeave={() => { if (!gesture.current) setCursor(previous => ({ ...previous, visible: false })) }} onKeyDown={keyboard} />
          {!hasMarks && <div className={styles.invitation} aria-hidden="true"><img src="/explorer/paint/little-guys/0.webp" alt="" width="68" height="68" /><strong>Your next <em>masterpiece.</em></strong><span>Stamp something. Scribble something.<br />There are no rules here.</span></div>}
          {tool === "sticker" && cursor.visible && <img className={styles.cursor} src={selected.src} alt="" aria-hidden="true" style={{ left: `${cursor.x / paintWidth * 100}%`, top: `${cursor.y / paintHeight * 100}%`, width: `${stickerSize / paintWidth * 100}%`, transform: `translate(-50%,-50%) rotate(${angle}deg) scaleX(${flipped ? -1 : 1})` }} />}
          {!!pulse.id && <span key={pulse.id} className={styles.ping} aria-hidden="true" style={{ left: `${pulse.x / paintWidth * 100}%`, top: `${pulse.y / paintHeight * 100}%` }}>✦</span>}
        </div>
        </div>
        <div className={styles.paletteBar}>
          {sheetHeading("Choose a color")}
          <div className={styles.palette} role="group" aria-label="Paint colors">{colors.map(value => <button type="button" key={value} title={value} aria-label={`Color ${value}`} aria-pressed={color === value && tool !== "eraser"} style={{ background: value }} onClick={() => { setMobilePanel(null); setColor(value); if (tool === "eraser" || tool === "sticker") setTool("brush"); sound?.play("paintStamp") }} />)}</div>
          <label className={styles.customColor} title="Choose any color"><input aria-label="Custom paint color" type="color" value={color} onChange={event => { setMobilePanel(null); setColor(event.target.value); setTool("brush") }} /><span>any color</span></label>
        </div>
        <div className={styles.paperRow}>{sheetHeading("Choose your paper")}<span>Paper</span>{paintPapers.map(item => <button key={item.id} type="button" aria-label={item.name} title={item.name} aria-pressed={paper === item.id} onClick={() => changePaper(item.id)} style={{ background: item.preview }}><span>{item.name}</span></button>)}</div>
        <div className={styles.toys}><button type="button" disabled={!loaded} onClick={() => collage(false)}><Sticker size={16} />Sticker bomb!</button><button type="button" disabled={!loaded} className={styles.surprise} onClick={() => collage(true)}><WandSparkles size={16} />Surprise me</button></div>
      </div>
      <aside id="paint-sticker-drawer" className={styles.drawer} aria-label="Sticker drawer">
        {sheetHeading(mobilePanel === "more" ? "Size & little extras" : "39 stickers. Go wild.")}
        <div className={styles.drawerTitle}><strong>Sticker drawer</strong><span>{paintStickers.length}</span></div>
        <div className={styles.packs} aria-label="Sticker packs">{(["Little guys", "Desk junk", "Computer"] as StickerPack[]).map(item => <button type="button" key={item} aria-pressed={pack === item} onClick={() => { setPack(item); sound?.play("click") }}>{item}</button>)}</div>
        <div className={styles.stickerGrid}>{available.map(item => <button type="button" key={item.id} aria-label={`Choose ${item.name} sticker`} aria-pressed={tool === "sticker" && selected.id === item.id} title={item.name} onClick={() => chooseSticker(item)}><img src={item.src} alt="" width="42" height="42" draggable={false} /></button>)}</div>
        <div className={styles.settings}>
          <label>{tool === "sticker" ? "Sticker size" : "Brush size"}<span>{tool === "sticker" ? stickerSize : brushSize}px</span><input aria-label={tool === "sticker" ? "Sticker size" : "Brush size"} type="range" min={tool === "sticker" ? 32 : 2} max={tool === "sticker" ? 180 : 42} step={2} value={tool === "sticker" ? stickerSize : brushSize} onChange={event => tool === "sticker" ? setStickerSize(Number(event.target.value)) : setBrushSize(Number(event.target.value))} /></label>
          {tool === "sticker" && <><div className={styles.stickerTransforms}><button type="button" aria-label="Rotate sticker" onClick={() => { setAngle(value => (value + 30) % 360); sound?.play("click") }}><RotateCcw size={14} />Turn</button><button type="button" aria-pressed={flipped} onClick={() => { setFlipped(value => !value); sound?.play("click") }}><FlipHorizontal2 size={14} />Flip</button></div><button type="button" className={styles.stampCenter} disabled={!loaded} aria-label={`Stamp ${selected.name} in center`} onClick={stampCenter}>Stamp in center</button></>}
        </div>
        <div className={styles.mobileExtras}><button type="button" disabled={!loaded} onClick={() => { collage(false); setMobilePanel(null) }}><Sticker size={17}/>Sticker bomb!</button><button type="button" disabled={!loaded} onClick={() => { collage(true); setMobilePanel(null) }}><WandSparkles size={17}/>Surprise me</button></div>
        <p className={styles.drawerHint}>{loaded < paintStickers.length ? `${loaded}/${paintStickers.length} stickers loaded…` : "Click to place. Drag for a parade."}</p>
      </aside>
    </div>
    {mobilePanel && <button type="button" className={styles.trayDismiss} aria-label="Dismiss Paint tray" onClick={() => setMobilePanel(null)} />}
    <div ref={trays} className={styles.mobileTrays} role="toolbar" aria-label="Paint drawers">
      {([{id:"stickers", label:"Stickers", icon:<Sticker size={19}/>}, {id:"colors",label:"Colors",icon:<Palette size={19}/>}, {id:"paper",label:"Paper",icon:<FileImage size={19}/>}, {id:"more",label:"More",icon:<SlidersHorizontal size={19}/>} ] as const).map(item => <button key={item.id} data-tray={item.id} type="button" aria-label={`Open ${item.label.toLowerCase()} tray`} aria-expanded={mobilePanel === item.id} onClick={() => togglePanel(item.id)}>{item.icon}<span>{item.label}{item.id === "stickers" ? " 39" : ""}</span></button>)}
    </div>
    <div className={styles.status}><span className={styles.statusLight} /><p role="status">{message}</p><span className={styles.signature}>made on michelle’s computer</span></div>
  </div>
}
