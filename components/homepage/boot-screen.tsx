"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import styles from "./home.module.css"
import { motionPreferenceEvent, prefersLessMotion } from "@/lib/computer-experience"
import { useComputerSound } from "./computer-sounds"
import { createBootHaptics } from "@/lib/boot-haptics"

const restartEvent = "michelle:restart"
// Remember startup only while navigating this loaded site. A fresh visit or
// reload should boot again, including browsers with the old localStorage flag.
let hasBooted = false

// Short bursts and pauses give the console the rhythm of an old computer boot.
// This visual bootstrap transcript uses the app’s real module and route names.
const bootOutput: [number, string][] = [
  [70, "C:\\MICHELLE>npm run start"],
  [100, ""],
  [130, "> michelle-portfolio@0.1.0 start"],
  [250, "> next start"],
  [300, ""],
  [420, "[init] Next.js 15.1.11"],
  [450, "[resolve] react/jsx-runtime"],
  [480, "[resolve] react-dom/client"],
  [510, ""],
  [540, "[import] app/globals.css"],
  [740, "[import] app/computer.css"],
  [770, "[import] components/homepage/home.module.css"],
  [800, ""],
  [830, "[route] /learn"],
  [860, "[route] /projects"],
  [890, "[route] /magazine"],
  [1120, "[route] /penpals"],
  [1150, "[route] /about"],
  [1180, ""],
  [1210, "[hydrate] <HomeDesktop />"],
  [1240, "[mount] <HomeHeader />"],
  [1270, "[mount] <ProfileMark />"],
  [1300, "[mount] <WindowBar />"],
  [1530, ""],
  [1570, "[asset] /homepage/denim-wallpaper-d.webp"],
  [1610, "[asset] /homepage/welcome-letter-d.webp"],
  [1650, ""],
  [1690, "[render] <HomeDesktop />"],
  [2020, "[commit] document"],
  [2160, "[########............] hydrating"],
  [2440, "[##############......] hydrating"],
  [2710, "[####################] ready"],
]

export function restartComputer(navigate?: (href: string) => void) {
  hasBooted = false
  if (window.location.pathname === "/") window.dispatchEvent(new Event(restartEvent))
  else if (navigate) navigate("/")
  else window.location.assign("/")
}

export function BootScreen({ children, skipStartup = false }: { children: React.ReactNode; skipStartup?: boolean }) {
  const [stage, setStage] = useState<"checking" | "booting" | "ready">(skipStartup ? "ready" : "checking")
  const [lineCount, setLineCount] = useState(0)
  const output = useRef<HTMLDivElement>(null)
  const skip = useRef<HTMLButtonElement>(null)
  const sound = useComputerSound()
  const feedback = useRef(sound)
  feedback.current = sound

  const enter = useCallback(() => {
    hasBooted = true
    setStage("ready")
  }, [])

  useEffect(() => {
    if (skipStartup || hasBooted) enter()
    else setStage("booting")
    const restart = () => { setLineCount(0); setStage("booting") }
    window.addEventListener(restartEvent, restart)
    return () => window.removeEventListener(restartEvent, restart)
  }, [enter, skipStartup])

  useEffect(() => {
    if (stage !== "booting") return
    if (prefersLessMotion()) { enter(); return }
    setLineCount(0)
    const haptics = createBootHaptics({
      allowed: () => !!feedback.current?.feedbackAllowed() && !prefersLessMotion() && matchMedia("(pointer: coarse)").matches,
      vibrate: typeof navigator.vibrate === "function" ? duration => navigator.vibrate(duration) : undefined,
    })
    const timers = bootOutput.map(([delay, text], index) => setTimeout(() => {
      setLineCount(index + 1)
      if (text && !prefersLessMotion()) { feedback.current?.type(); haptics.tick() }
    }, delay))
    timers.push(setTimeout(enter, 3100))
    skip.current?.focus({ preventScroll: true })
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); enter() }
    }
    window.addEventListener("keydown", keyboard)
    const media = matchMedia("(prefers-reduced-motion: reduce)")
    function motionChanged() { if (prefersLessMotion()) enter() }
    function visibility() { if (document.hidden) { feedback.current?.stopTyping(); haptics.stop() } }
    window.addEventListener(motionPreferenceEvent, motionChanged); media.addEventListener("change", motionChanged)
    document.addEventListener("visibilitychange", visibility)
    return () => {
      timers.forEach(clearTimeout)
      feedback.current?.stopTyping(); haptics.stop()
      window.removeEventListener("keydown", keyboard)
      window.removeEventListener(motionPreferenceEvent, motionChanged); media.removeEventListener("change", motionChanged)
      document.removeEventListener("visibilitychange", visibility)
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
    {stage !== "ready" && <main className={styles.bootDesktop} data-boot-stage={stage} aria-label="Michelle’s Computer startup" onPointerDownCapture={event => { if (event.isTrusted) feedback.current?.unlock() }} onKeyDownCapture={event => { if (event.isTrusted && event.key !== "Escape") feedback.current?.unlock() }}>
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
