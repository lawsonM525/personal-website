"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./home.module.css"

const key = "michelle-computer-booted-v1"
const restartEvent = "michelle:restart"

// Short bursts and pauses give the console the rhythm of an old computer boot.
// These describe the website, rather than inventing diagnostics about its visitor.
const bootOutput: [number, string][] = [
  [70, "MICHELLE'S COMPUTER"],
  [100, "Desktop startup"],
  [130, ""],
  [250, "C:\\MICHELLE>start desktop"],
  [300, ""],
  [420, "Reading desktop configuration..."],
  [450, "  background ............ denim"],
  [480, "  window theme .......... blue / cream"],
  [510, "  pointer ............... ready"],
  [540, ""],
  [740, "Loading desktop components"],
  [770, "  window controls ....... loaded"],
  [800, "  navigation ............ loaded"],
  [830, "  keyboard shortcuts .... loaded"],
  [860, "  desktop icons ......... loaded"],
  [890, ""],
  [1120, "Mounting destinations"],
  [1150, "  /learn ................ ready"],
  [1180, "  /projects ............. ready"],
  [1210, "  /magazine ............. ready"],
  [1240, "  /penpals .............. ready"],
  [1270, "  /about ................ ready"],
  [1300, ""],
  [1530, "Restoring desktop"],
  [1570, "  top menu .............. ready"],
  [1610, "  taskbar ............... ready"],
  [1650, "  welcome window ........ waiting"],
  [1690, ""],
  [2020, "C:\\MICHELLE>open desktop"],
  [2160, "[########............] starting desktop"],
  [2440, "[##############......] starting desktop"],
  [2710, "[####################] ready"],
]

export function restartComputer() {
  try { localStorage.removeItem(key) } catch {}
  if (window.location.pathname === "/") window.dispatchEvent(new Event(restartEvent))
  else window.location.assign("/")
}

export function BootScreen({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<"checking" | "booting" | "ready">("checking")
  const [lineCount, setLineCount] = useState(0)
  const output = useRef<HTMLDivElement>(null)
  const skip = useRef<HTMLButtonElement>(null)

  const enter = useCallback(() => {
    try { localStorage.setItem(key, "1") } catch {}
    setStage("ready")
  }, [])

  useEffect(() => {
    try { setStage(localStorage.getItem(key) ? "ready" : "booting") }
    catch { setStage("booting") }
    const restart = () => { setLineCount(0); setStage("booting") }
    window.addEventListener(restartEvent, restart)
    return () => window.removeEventListener(restartEvent, restart)
  }, [])

  useEffect(() => {
    if (stage !== "booting") return
    setLineCount(0)
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches
    const timers = reducedMotion ? [] : bootOutput.map(([delay], index) =>
      setTimeout(() => setLineCount(index + 1), delay)
    )
    timers.push(setTimeout(enter, reducedMotion ? 120 : 3100))
    skip.current?.focus({ preventScroll: true })
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); enter() }
    }
    window.addEventListener("keydown", keyboard)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("keydown", keyboard)
    }
  }, [stage, enter])

  useEffect(() => {
    if (output.current) output.current.scrollTop = output.current.scrollHeight
  }, [lineCount])

  useEffect(() => {
    if (stage === "ready") {
      (document.querySelector<HTMLElement>("#home-title") ??
        document.querySelector<HTMLElement>('a[aria-label="Michelle’s Computer home"]'))?.focus({ preventScroll: true })
    }
  }, [stage])

  // Replace the text progress line in place, as an actual terminal would.
  const lines = bootOutput.slice(0, Math.min(lineCount, 30)).map(([, text]) => text)
  if (lineCount > 30) lines[29] = bootOutput[lineCount - 1][1]

  return <>
    <div className={styles.bootContent} hidden={stage !== "ready"}>{children}</div>
    <noscript><style>{`.${styles.bootContent}[hidden]{display:block!important}.${styles.bootDesktop}{display:none!important}`}</style></noscript>
    {stage !== "ready" && <main className={styles.bootDesktop} data-boot-stage={stage} aria-label="Michelle’s Computer startup">
      <p className={styles.srOnly} role="status">Starting Michelle’s Computer. You can skip startup with Escape.</p>
      <div ref={output} className={styles.bootTerminal} aria-hidden="true">
        <pre>{lines.join("\n")}{lineCount > 0 ? " " : ""}<span className={styles.bootCursor}>█</span></pre>
      </div>
      <button ref={skip} type="button" className={styles.bootSkip} onClick={enter} aria-label="Skip startup">
        <span aria-hidden="true">ESC</span> skip intro
      </button>
    </main>}
  </>
}
