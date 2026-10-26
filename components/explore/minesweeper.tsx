"use client"

import { useState } from "react"
import { Flag, RotateCcw } from "lucide-react"
import { boardSize, mineCount, makeBoard, reveal, hasWon, type Square } from "@/lib/minesweeper"
import styles from "./explore.module.css"

export function Minesweeper() {
  const [board, setBoard] = useState<Square[] | null>(null)
  const [flags, setFlags] = useState<number[]>([])
  const [flagMode, setFlagMode] = useState(false)
  const [phase, setPhase] = useState<"ready" | "playing" | "lost" | "won">("ready")
  const [notice, setNotice] = useState("")
  function flag(index: number) {
    if (phase === "lost" || phase === "won" || board?.[index].revealed) return
    setNotice("")
    if (flags.includes(index)) setFlags(flags.filter(value => value !== index))
    else if (flags.length < mineCount) setFlags([...flags, index])
    else setNotice("All six flags are in use. Remove one to move it.")
  }
  function open(index: number) {
    if (flagMode) { flag(index); return }
    if (phase === "lost" || phase === "won" || flags.includes(index)) return
    const next = (board || makeBoard(index)).map((square, at) => ({ ...square, flagged: flags.includes(at) }))
    const revealed = reveal(next, index); setBoard(revealed)
    setPhase(revealed[index].mine ? "lost" : hasWon(revealed) ? "won" : "playing")
  }
  return <div className={styles.minesweeper}>
    <div className={styles.gameToolbar}><span><Flag size={16} />{mineCount - flags.length} flags left</span><button type="button" onClick={() => { setBoard(null); setFlags([]); setPhase("ready"); setFlagMode(false); setNotice("") }}><RotateCcw size={16} />New game</button></div>
    <p>Clear the safe squares. Numbers tell you how many mines are next to them.</p>
    <div className={styles.mineBoard} role="group" aria-label="Minesweeper board, six rows and six columns">{Array.from({ length: boardSize * boardSize }, (_, index) => {
      const square = board?.[index], flagged = flags.includes(index), visible = square?.revealed || (phase === "lost" && square?.mine)
      const description = flagged && !visible ? "flagged" : !visible ? "covered" : square?.mine ? "mine" : square?.nearby ? `${square.nearby} neighboring mines` : "clear"
      return <button type="button" key={index} data-mine-square={index} data-revealed={!!visible} data-number={square?.nearby || 0} aria-label={`Row ${Math.floor(index / boardSize) + 1}, column ${index % boardSize + 1}, ${description}`} onClick={() => open(index)} onContextMenu={event => { event.preventDefault(); flag(index) }} onKeyDown={event => { const delta: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -boardSize, ArrowDown: boardSize }; if (event.key in delta) { event.preventDefault(); const next = Math.max(0, Math.min(35, index + delta[event.key])); event.currentTarget.parentElement?.querySelector<HTMLElement>(`[data-mine-square="${next}"]`)?.focus() } }}>{visible ? square?.mine ? "✹" : square?.nearby || "" : flagged ? <Flag size={20} aria-hidden="true" /> : ""}</button>
    })}</div>
    <div className={styles.appActions}><button type="button" aria-pressed={flagMode} onClick={() => setFlagMode(value => !value)}><Flag size={16} />{flagMode ? "Flag mode on" : "Flag mode off"}</button></div>
    <p className={styles.gameStatus} role="status">{phase === "lost" ? "A mine! Try a new game." : phase === "won" ? "All clear. You found every safe square!" : notice || (flagMode ? "Tap a covered square to add or remove a flag." : "Your first square is safe. Tap to clear; turn on flag mode to mark mines.")}</p>
  </div>
}
