"use client"

import Link from "next/link"
import Script from "next/script"
import { useEffect, useId, useRef, useState } from "react"
import { FileText, FolderOpen, Grid2X2 } from "@/components/retro-icons"
import { isTallyReadyEvent, isTallySubmittedEvent, shouldRetryEmbed } from "@/lib/tally-embed"
import { trackGoal } from "@/lib/analytics"
import { WindowBar } from "./window-bar"
import { penpalDeliveryNote, signupForms } from "./signup-config"
import styles from "./home.module.css"

type SignupKind = keyof typeof signupForms
type TallyRuntime = { loadEmbeds: () => void }

function loadEmbeds() {
  (window as Window & { Tally?: TallyRuntime }).Tally?.loadEmbeds()
}

type FormDestination = { id: string; title: string; embedUrl: string; height: number }

export function TallyForm({ form, active, recoveryId }: { form: FormDestination; active: boolean; recoveryId: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [frameVersion, setFrameVersion] = useState(0)
  const [widgetReady, setWidgetReady] = useState(false)
  const engaged = useRef(false)
  const ready = useRef(false)
  const navigated = useRef(false)
  const attempts = useRef(0)
  const submitted = useRef(false)
  const [state, setState] = useState<"loading" | "ready" | "unavailable">("loading")

  function isInitialBlank(element: HTMLIFrameElement) {
    // Cross-origin contents stay unreadable. Readiness and the focus guard
    // protect a loaded or engaged form from automatic replacement.
    try { return element.contentDocument?.URL === "about:blank" }
    catch { return false }
  }

  useEffect(() => {
    const element = frame.current
    if (!element) return
    function receive(event: MessageEvent) {
      if (!submitted.current && isTallySubmittedEvent(event, element?.contentWindow ?? null, form.id)) {
        if (form.id === signupForms.magazine.id) trackGoal("magazine_waitlist_submitted")
        else if (form.id === signupForms.penpals.id) trackGoal("penpal_signup_submitted")
        submitted.current = true
      }
      if (!isTallyReadyEvent(event, element?.contentWindow ?? null, form.id)) return
      // Consume readiness only; never retain or log answers.
      ready.current = true
      navigated.current = true
      setState("ready")
      loadEmbeds()
    }
    function protectInput() { if (document.activeElement === element) engaged.current = true }
    window.addEventListener("blur", protectInput)
    window.addEventListener("message", receive)
    return () => { window.removeEventListener("message", receive); window.removeEventListener("blur", protectInput) }
  }, [form.id, frameVersion])

  useEffect(() => {
    // A blocked resizing widget must not prevent the form itself from loading.
    const timer = setTimeout(() => setWidgetReady(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const element = frame.current
    if (!active || !widgetReady || !element || ready.current) return
    let cancelled = false
    let animation = 0
    let checkTimer = 0
    const started = Date.now()

    function check() {
      if (cancelled || !element || ready.current) return
      const dialog = element.closest("dialog")
      const visible = !document.hidden && element.getBoundingClientRect().width > 0 && !element.closest("[hidden]") && (!dialog || dialog.open)
      if (visible) {
        if (!element.hasAttribute("src")) {
          attempts.current += 1
          element.dataset.loadAttempts = String(attempts.current)
          element.src = form.embedUrl
        } else if (shouldRetryEmbed({ ready: ready.current, engaged: engaged.current, attempts: attempts.current, elapsed: Date.now() - started, initialBlank: isInitialBlank(element) })) {
          // Reassigning src on the stalled browsing context did not recover it.
          // Replace only a never-ready, untouched frame; retain loaded forms.
          navigated.current = false
          setFrameVersion(value => value + 1)
          return
        } else if (!isInitialBlank(element)) {
          navigated.current = true
        }
        if (Date.now() - started >= 12000) {
          setState("unavailable")
          return
        }
      }
      checkTimer = window.setTimeout(check, 1500)
    }

    // Start navigation after React has committed and the native dialog has a
    // visible layout, not while the iframe is being inserted into its subtree.
    animation = requestAnimationFrame(check)
    return () => { cancelled = true; cancelAnimationFrame(animation); clearTimeout(checkTimer) }
  }, [active, widgetReady, form.embedUrl, frameVersion])

  return <div data-tally-state={state}>
    <span className={state === "ready" ? styles.srOnly : styles.formLoadStatus} role="status">{state === "loading" ? "Loading form…" : state === "unavailable" ? "Form loading is taking longer. You can reload it or use the direct form link." : "Form loaded."}</span>
    <iframe key={frameVersion} ref={frame} onFocus={() => { engaged.current = true }} onLoad={() => { if (frame.current && !isInitialBlank(frame.current)) { navigated.current = true; loadEmbeds() } }} loading="eager" width="100%" height={form.height} frameBorder={0} title={form.title} aria-describedby={recoveryId} aria-busy={state === "loading"} className={styles.tallyFrame} />
    <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" onReady={() => { setWidgetReady(true); if (navigated.current) loadEmbeds() }} onError={() => setWidgetReady(true)} />
  </div>
}

export function SignupWindow({ kind, onClose, onSwitch, startOpen = true, active = true }: { kind: SignupKind; onClose: () => void; onSwitch?: (kind: SignupKind) => void; startOpen?: boolean; active?: boolean }) {
  const form = signupForms[kind]
  const magazine = kind === "magazine"
  const headingId = useId()
  const recoveryId = useId()
  const windowRef = useRef<HTMLElement>(null)
  useEffect(() => { windowRef.current?.querySelector("button")?.focus() }, [])
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [formVersion, setFormVersion] = useState(0)
  const [formOpen, setFormOpen] = useState(startOpen)
  const title = magazine ? "magazine.exe" : "penpals.exe"
  const otherKind = magazine ? "penpals" : "magazine"
  const other = signupForms[otherKind]

  return <section data-computer-window ref={windowRef} className={`${styles.formWindow} ${styles.signupWindow} ${maximized ? styles.formWindowMaximized : ""}`} aria-labelledby={headingId}>
    <WindowBar title={title} onMinimize={() => { setMinimized(true); setMaximized(false) }} onMaximize={() => { setMaximized(value => !value); setMinimized(false) }} onClose={onClose} maximized={maximized} />
    <h1 id={headingId} className={styles.srOnly}>{magazine ? "The magazine waitlist" : "Wanna be pen pals?"}</h1>
    {minimized && <button type="button" className={styles.formRestore} data-computer-sound="open" onClick={() => setMinimized(false)}><FileText size={24} aria-hidden="true" />Restore {title}</button>}
    <div hidden={minimized}>
      <div className={styles.windowMenu}><Link href="/?desktop=1" onClick={onSwitch ? event => { event.preventDefault(); onClose() } : undefined}>My computer</Link><span>{magazine ? "Magazine waitlist" : "The little post office"}</span><Link href={other.pagePath} onClick={onSwitch ? event => { event.preventDefault(); onSwitch(otherKind) } : undefined}>{magazine ? "Pen pals" : "Magazine"} →</Link></div>
      {formOpen && <div id={recoveryId} className={`${styles.formFallback} ${styles.formRecovery}`}>
        {!magazine && <p>{penpalDeliveryNote}</p>}
        <p>Form not loading? <button type="button" className={styles.formReload} onClick={() => setFormVersion(value => value + 1)}>Reload the form</button> or <a href={signupForms[kind].publicUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${form.title.toLowerCase()} in a new tab`}>open it in a new tab</a>.</p>
      </div>}
      {formOpen ? <div className={styles.formEmbed}><TallyForm key={`${kind}:${formVersion}`} form={form} active={active && !minimized} recoveryId={recoveryId} /></div> : <div className={styles.formIntro}>
        <span className={`${styles.sprite} ${magazine ? styles.sprite_magazine : styles.sprite_penpals} ${styles.invitationArt}`} aria-hidden="true"/>
        <h2>{magazine ? "the magazine waitlist" : "wanna be penpals?"}</h2>
        <p>{magazine ? "We’re putting together an artsy magazine about AI and learning — with comics, diary entries, and handwritten, junk-journal-style pages. Join the waitlist for updates as it comes together." : penpalDeliveryNote}</p>
        <button type="button" className={styles.button} data-computer-sound="open" onClick={() => setFormOpen(true)}>{magazine ? "Join the magazine waitlist" : "Sign up to be pen pals"} →</button>
      </div>}
      {formOpen && <div className={styles.formFallback}>
        <p>Magazine and pen pals are separate signups.</p>
      </div>}
      <div className={styles.statusBar}><span>{magazine ? "The magazine waitlist" : "Pen pal interest signup"}</span><span className={styles.resizeGrip} aria-hidden="true" /></div>
    </div>
    <nav className={styles.signupDock} aria-label="Desktop controls"><Link href="/?desktop=1"><Grid2X2 size={24}/><span>Desktop</span></Link><Link href="/explore"><FolderOpen size={24}/><span>Explore</span></Link><button type="button" aria-pressed={!minimized} onClick={() => setMinimized(false)}><FileText size={24}/><span>{magazine ? "Magazine" : "Pen pals"}</span></button></nav>
  </section>
}
