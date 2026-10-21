"use client"

import Script from "next/script"
import { useEffect, useId, useRef, useState, type SyntheticEvent } from "react"
import { FileText } from "lucide-react"
import { WindowBar } from "./window-bar"
import { signupForms } from "./signup-config"
import styles from "./home.module.css"

type SignupKind = keyof typeof signupForms
type TallyRuntime = { loadEmbeds: () => void }

function loadEmbeds() {
  (window as Window & { Tally?: TallyRuntime }).Tally?.loadEmbeds()
}

function TallyForm({ kind }: { kind: SignupKind }) {
  const form = signupForms[kind]
  const loaded = useRef(false)
  const retriedBlank = useRef(false)

  function formLoaded(event: SyntheticEvent<HTMLIFrameElement>) {
    const frame = event.currentTarget
    // A newly attached iframe can fire its initial blank-document load first.
    // Initialize resizing only after the actual form has navigated.
    if (frame.contentDocument?.URL === "about:blank") {
      if (!retriedBlank.current) {
        retriedBlank.current = true
        frame.src = form.embedUrl
      }
      return
    }
    loaded.current = true
    loadEmbeds()
  }

  return <>
    <iframe src={form.embedUrl} onLoad={formLoaded} loading="eager" width="100%" height={form.height} frameBorder={0} title={form.title} className={styles.tallyFrame} />
    <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" onReady={() => { if (loaded.current) loadEmbeds() }} />
  </>
}

export function SignupWindow({ kind, onClose, onSwitch, startOpen = true }: { kind: SignupKind; onClose: () => void; onSwitch?: (kind: SignupKind) => void; startOpen?: boolean }) {
  const magazine = kind === "magazine"
  const headingId = useId()
  const windowRef = useRef<HTMLElement>(null)
  useEffect(() => { windowRef.current?.querySelector("button")?.focus() }, [])
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [formVersion, setFormVersion] = useState(0)
  const [formOpen, setFormOpen] = useState(startOpen)
  const title = magazine ? "magazine.exe" : "penpals.exe"
  const otherKind = magazine ? "penpals" : "magazine"
  const other = signupForms[otherKind]

  return <section ref={windowRef} className={`${styles.formWindow} ${styles.signupWindow} ${maximized ? styles.formWindowMaximized : ""}`} aria-labelledby={headingId}>
    <WindowBar title={title} onMinimize={() => { setMinimized(true); setMaximized(false) }} onMaximize={() => { setMaximized(value => !value); setMinimized(false) }} onClose={onClose} maximized={maximized} />
    <h1 id={headingId} className={styles.srOnly}>{magazine ? "The magazine waitlist" : "Wanna be pen pals?"}</h1>
    {minimized && <button type="button" className={styles.formRestore} onClick={() => setMinimized(false)}><FileText size={19} aria-hidden="true" />Restore {title}</button>}
    <div hidden={minimized}>
      <div className={styles.windowMenu}><a href="/" onClick={onSwitch ? event => { event.preventDefault(); onClose() } : undefined}>My computer</a><span>{magazine ? "Magazine waitlist" : "The little post office"}</span><a href={other.pagePath} onClick={onSwitch ? event => { event.preventDefault(); onSwitch(otherKind) } : undefined}>{magazine ? "Pen pals" : "Magazine"} →</a></div>
      {formOpen ? <div className={styles.formEmbed}><TallyForm key={`${kind}:${formVersion}`} kind={kind} /></div> : <div className={styles.formIntro}>
        <h2>{magazine ? "the magazine waitlist" : "wanna be penpals?"}</h2>
        <p>{magazine ? "We’re putting together an artsy magazine about AI and learning — with comics, diary entries, and handwritten, junk-journal-style pages. Join the waitlist for updates as it comes together." : "Want a handwritten letter from me? Leave your mailing address below!!"}</p>
        <button type="button" className={styles.button} onClick={() => setFormOpen(true)}>{magazine ? "Join the magazine waitlist" : "Leave my mailing address"} →</button>
      </div>}
      {formOpen && <div className={styles.formFallback}>
        <p>Form not loading? <button type="button" className={styles.formReload} onClick={() => setFormVersion(value => value + 1)}>Reload the form</button> or <a href={signupForms[kind].publicUrl} target="_blank" rel="noopener noreferrer">open it in a new tab</a>.</p>
        <p>Magazine and pen pals are separate signups.</p>
      </div>}
      <div className={styles.statusBar}><span>{magazine ? "The magazine waitlist" : "Pen pal interest signup"}</span><span className={styles.resizeGrip} aria-hidden="true" /></div>
    </div>
  </section>
}
