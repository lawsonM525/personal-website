"use client"

import { useState, type CSSProperties, type KeyboardEvent } from "react"
import { Flag, RotateCcw } from "@/components/retro-icons"
import { useComputerSound } from "@/components/homepage/computer-sounds"
import { boardSize, mineCount, makeBoard, reveal, hasWon, type Square } from "@/lib/minesweeper"
import styles from "./minesweeper.module.css"

type Phase = "ready" | "playing" | "lost" | "won"
type Burst = { id: number; index: number; count: number; kind: "clear" | "flag" | "mine" }
const safeCount = boardSize * boardSize - mineCount
const particleColors = ["#f43d29", "#244ddb", "#ffda15", "#b9df23", "#f43d29"]

function Face({ mood }: { mood: "happy" | "nervous" | "lost" | "won" }) {
  return <svg viewBox="0 0 80 80" aria-hidden="true" className={styles.face}>
    <path d="m51 21 3-10 8 1 1-7" fill="none" stroke="#171714" strokeWidth="4" strokeLinecap="round" />
    <path d="m66 1 2 5 6-2-3 5 5 4-7-1-2 6-2-6-5-2 5-2z" fill="#f43d29" />
    <path d="M13 45C11 29 24 16 40 17c18-1 30 12 29 29 1 17-12 29-30 28C22 75 11 62 13 45Z" fill="#171714" stroke="#171714" strokeWidth="2" />
    <path d="M20 34q3-9 11-10" fill="none" stroke="#fff8e7" strokeWidth="3" strokeLinecap="round" />
    {mood === "lost" ? <path d="m26 35 10 12m0-12L26 47m20-12 10 12m0-12L46 47" stroke="#fff8e7" strokeWidth="4" strokeLinecap="round" /> : mood === "won" ? <g fill="#ffda15"><path d="m29 29 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" /><path d="m51 29 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" /></g> : <><ellipse cx="30" cy="40" rx="9" ry="12" fill="#fff8e7" /><ellipse cx="51" cy="40" rx="9" ry="12" fill="#fff8e7" /><ellipse cx={mood === "nervous" ? 32 : 33} cy={mood === "nervous" ? 43 : 39} rx="4" ry="6" fill="#171714" /><ellipse cx={mood === "nervous" ? 49 : 48} cy={mood === "nervous" ? 43 : 39} rx="4" ry="6" fill="#171714" /></>}
    {mood === "nervous" ? <ellipse cx="40" cy="61" rx="6" ry="8" fill="#f43d29" /> : mood === "lost" ? <><path d="M29 59q12-8 23 0" stroke="#fff8e7" strokeWidth="3" fill="none" /><path d="M39 58h10v8q-5 8-10 0z" fill="#f43d29" /></> : <><path d="M26 55q14 4 29-1-5 18-17 13-8-3-12-12" fill="#fff8e7" /><path d="m35 56 1 8m9-9-1 10" stroke="#171714" strokeWidth="2" /></>}
    {mood === "nervous" && <path d="M8 25q-10 12 0 14 9-2 0-14" fill="#244ddb" stroke="#171714" strokeWidth="2" />}
  </svg>
}

function Mine() {
  return <svg viewBox="0 0 40 40" className={styles.mine} aria-hidden="true"><path d="m25 9 2-6 5 1 1-3" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="m34 2 2 3 4-1-2 4 2 3-5-1-2 3V8l-3-2 4-1z" fill="#f43d29" /><circle cx="20" cy="24" r="14" fill="currentColor" /><ellipse cx="15" cy="22" rx="4" ry="5" fill="#fff8e7" /><ellipse cx="25" cy="22" rx="4" ry="5" fill="#fff8e7" /><circle cx="16" cy="23" r="2" fill="currentColor" /><circle cx="24" cy="23" r="2" fill="currentColor" /><path d="M14 30q6 7 12-1" fill="none" stroke="#fff8e7" strokeWidth="2" /></svg>
}

function PopStar() {
  return <svg viewBox="0 0 80 80" className={styles.popStar} aria-hidden="true"><path d="m39 4 10 23 25-5-15 22 14 23-26-6-18 15 1-26L6 38l25-9z" fill="#ffda15" stroke="#171714" strokeWidth="3" strokeLinejoin="round" /><ellipse cx="36" cy="37" rx="3" ry="6" fill="#171714" /><ellipse cx="49" cy="38" rx="3" ry="6" fill="#171714" /><path d="M33 49q9 10 18-1" stroke="#171714" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
}

export function Minesweeper() {
  const sound = useComputerSound()
  const [board, setBoard] = useState<Square[] | null>(null)
  const [flags, setFlags] = useState<number[]>([])
  const [flagMode, setFlagMode] = useState(false)
  const [phase, setPhase] = useState<Phase>("ready")
  const [notice, setNotice] = useState("")
  const [pressed, setPressed] = useState(false)
  const [burst, setBurst] = useState<Burst | null>(null)
  const [fresh, setFresh] = useState<number[]>([])
  const cleared = board?.filter(square => square.revealed && !square.mine).length || 0
  const ended = phase === "lost" || phase === "won"
  const mood = phase === "won" ? "won" : phase === "lost" ? "lost" : pressed ? "nervous" : "happy"

  function reset() {
    setBoard(null); setFlags([]); setPhase("ready"); setFlagMode(false)
    setNotice(""); setBurst(null); setFresh([]); setPressed(false)
    sound?.play("open")
  }
  function pop(index: number, count: number, kind: Burst["kind"]) {
    setBurst(previous => ({ id: (previous?.id || 0) + 1, index, count, kind }))
  }
  function flag(index: number) {
    if (ended || board?.[index].revealed) return
    setNotice("")
    if (flags.includes(index)) setFlags(flags.filter(value => value !== index))
    else if (flags.length < mineCount) {
      setFlags([...flags, index]); pop(index, 0, "flag"); sound?.play("paintStamp")
    } else setNotice("All six flags are in use. Remove one to move it.")
  }
  function open(index: number) {
    setPressed(false)
    if (flagMode) { flag(index); return }
    if (ended || flags.includes(index) || board?.[index].revealed) return
    const next = (board || makeBoard(index)).map((square, at) => ({ ...square, flagged: flags.includes(at) }))
    const revealed = reveal(next, index)
    const justOpened = revealed.flatMap((square, at) => square.revealed && !next[at].revealed ? [at] : [])
    const nextPhase = revealed[index].mine ? "lost" : hasWon(revealed) ? "won" : "playing"
    setBoard(revealed); setPhase(nextPhase); setFresh(justOpened)
    pop(index, justOpened.length, nextPhase === "lost" ? "mine" : "clear")
    setNotice(justOpened.length > 1 ? `${justOpened.length} squares in one move. Big sweep.` : "One more down. Keep going.")
    sound?.play(nextPhase === "won" ? "paintMagic" : nextPhase === "lost" ? "close" : justOpened.length > 1 ? "paintSparkle" : "paintStamp")
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key.toLowerCase() === "f") { event.preventDefault(); flag(index); return }
    const row = Math.floor(index / boardSize), column = index % boardSize
    const next = { ArrowLeft: row * boardSize + Math.max(0, column - 1), ArrowRight: row * boardSize + Math.min(boardSize - 1, column + 1), ArrowUp: Math.max(0, row - 1) * boardSize + column, ArrowDown: Math.min(boardSize - 1, row + 1) * boardSize + column }[event.key]
    if (next === undefined) return
    event.preventDefault()
    event.currentTarget.parentElement?.querySelector<HTMLElement>(`[data-mine-square="${next}"]`)?.focus()
  }

  return <div className={styles.game} data-phase={phase} data-sound-ignore>
    <div className={styles.playArea}>
      <div className={styles.heading}>
        <PopStar />
        <h2>lucky sweep!</h2>
        <span className={styles.goSticker} aria-hidden="true"><span><span>let’s</span><span>go!</span></span></span>
      </div>
      <div className={styles.cabinet}>
        <div className={styles.dashboard}>
          <div className={styles.counter}><span><Flag size={13} /> flags left</span><strong>{String(mineCount - flags.length).padStart(2, "0")}</strong></div>
          <button type="button" className={styles.faceButton} onClick={reset} aria-label="New game" title="New game. Give the little guy another chance."><Face mood={mood} /></button>
          <div className={`${styles.counter} ${styles.clearCounter}`}><span>safe squares</span><strong>{String(cleared).padStart(2, "0")}<small>/{safeCount}</small></strong></div>
        </div>
        <div className={styles.boardWrap}>
          <div className={styles.board} role="group" aria-label="Minesweeper board, six rows and six columns" onPointerUp={() => setPressed(false)} onPointerLeave={() => setPressed(false)} onPointerCancel={() => setPressed(false)}>
            {Array.from({ length: boardSize * boardSize }, (_, index) => {
              const square = board?.[index], flagged = flags.includes(index), visible = !!(square?.revealed || (ended && square?.mine))
              const wrongFlag = phase === "lost" && flagged && !square?.mine
              const description = flagged && !visible ? "flagged" : !visible ? "covered" : square?.mine ? "mine" : square?.nearby ? `${square.nearby} neighboring mines` : "clear"
              const distance = burst ? Math.abs(Math.floor(index / boardSize) - Math.floor(burst.index / boardSize)) + Math.abs(index % boardSize - burst.index % boardSize) : 0
              return <button type="button" key={index} className={styles.tile} data-mine-square={index} data-revealed={visible} data-number={visible ? square?.nearby || 0 : 0} data-color={(index + Math.floor(index / boardSize)) % 4} data-fresh={fresh.includes(index)} data-flagged={flagged} data-hit={phase === "lost" && square?.revealed && square.mine} data-mine={visible && square?.mine} style={{ "--reveal-delay": `${distance * 27}ms` } as CSSProperties}
                aria-label={`Row ${Math.floor(index / boardSize) + 1}, column ${index % boardSize + 1}, ${description}${wrongFlag ? ", incorrect flag" : ""}`} aria-disabled={ended || !!square?.revealed}
                onPointerDown={event => { if (event.button === 0 && !ended && !visible && !flagged && !flagMode) setPressed(true) }} onBlur={() => setPressed(false)}
                onClick={() => open(index)} onContextMenu={event => { event.preventDefault(); setPressed(false); flag(index) }} onKeyDown={event => navigate(event, index)}>
                {visible ? square?.mine ? phase === "won" ? <span className={styles.safeMine}>★</span> : <Mine /> : square?.nearby ? <span className={styles.number}>{square.nearby}</span> : <span className={styles.clearDot} /> : flagged ? <span className={styles.flag} key="flag"><Flag size={25} />{wrongFlag && <b>×</b>}</span> : <span className={styles.tileShine} aria-hidden="true">✦</span>}
              </button>
            })}
          </div>
          {burst && <div key={burst.id} className={styles.burst} data-kind={burst.kind} aria-hidden="true" style={{ left: `${(burst.index % boardSize + .5) / boardSize * 100}%`, top: `${(Math.floor(burst.index / boardSize) + .5) / boardSize * 100}%` }}>
            {Array.from({ length: 8 }, (_, index) => <i key={index} style={{ "--dx": `${Math.cos(index * Math.PI / 4) * 55}px`, "--dy": `${Math.sin(index * Math.PI / 4) * 55}px`, "--particle-color": particleColors[index % particleColors.length], "--spin": `${index * 60}deg` } as CSSProperties}>{index % 2 ? "✦" : "·"}</i>)}
            {burst.kind === "clear" && <strong>{burst.count > 1 ? `+${burst.count} YES!` : "+1 NICE!"}</strong>}
            {burst.kind === "mine" && <strong>BOOM!</strong>}
          </div>}
          {phase === "won" && <div className={styles.confetti} aria-hidden="true">{Array.from({ length: 40 }, (_, index) => <i key={index} style={{ left: `${(index * 37) % 100}%`, background: particleColors[index % particleColors.length], "--fall-delay": `${index * 35}ms`, "--drift": `${(index % 7 - 3) * 22}px`, "--spin": `${index * 47}deg` } as CSSProperties} />)}</div>}
        </div>
        <div className={styles.progress} role="progressbar" aria-label="Safe squares cleared" aria-valuenow={cleared} aria-valuemin={0} aria-valuemax={safeCount}>{Array.from({ length: safeCount }, (_, index) => <i key={index} data-filled={index < cleared} style={{ "--progress-color": particleColors[Math.floor(index / 6)] } as CSSProperties} />)}</div>
      </div>
      <div className={styles.feedback} data-ended={ended}>
        <p role="status">{phase === "won" ? <><strong>clean sweep. superstar!</strong><span>30 safe squares. zero unfinished business.</span></> : phase === "lost" ? <><strong>boom. back for revenge?</strong><span>{cleared} safe squares found. The rematch is yours.</span></> : <><strong>{phase === "ready" ? "big click energy." : flagMode ? "flag it. don’t trust it." : cleared >= 24 ? "finish strong!" : cleared >= 15 ? "you’re on a roll!" : "nice move. go again."}</strong><span>{notice || (flagMode ? "Tap a covered square to add or remove a flag." : "30 safe squares. 6 little troublemakers. First click is safe.")}</span></>}</p>
      </div>
      <div className={styles.actions}>
        <button type="button" aria-label={`Flag mode ${flagMode ? "on" : "off"}`} aria-pressed={flagMode} disabled={ended} onClick={() => { setFlagMode(value => !value); setNotice("") }}><Flag size={18} /><span>flag mode <b>{flagMode ? "on" : "off"}</b></span></button>
        <button type="button" onClick={reset}><RotateCcw size={17} />{ended ? "play again" : "fresh field"}</button>
      </div>
      <details className={styles.help}><summary>how to play</summary><p>Clear all {safeCount} safe squares. Each number counts the mines touching that square, including diagonals. Empty squares open up a whole patch. Your first click and its neighbors are always safe.</p><p>Use flag mode or right-click to mark a suspected mine. On a keyboard, use the arrow keys to move, Enter to clear, and F to flag.</p></details>
    </div>
  </div>
}
