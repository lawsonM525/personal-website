"use client"

import Link from "next/link"
import Script from "next/script"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FileText } from "lucide-react"
import { HomeHeader, HomeFooter, WindowBar } from "./home-desktop"
import { signupForms } from "./signup-config"
import styles from "./home.module.css"

type SignupKind = keyof typeof signupForms
type TallyRuntime = { loadEmbeds: () => void }

function loadEmbeds() {
  (window as Window & { Tally?: TallyRuntime }).Tally?.loadEmbeds()
}

function TallyForm({ kind }: { kind: SignupKind }) {
  const form = signupForms[kind]
  const frame = useRef<HTMLIFrameElement>(null)
  useEffect(() => { loadEmbeds() }, [kind])

  function loadWithoutWidget() {
    if (frame.current && !frame.current.getAttribute("src")) frame.current.src = form.embedUrl
  }

  return <>
    <iframe ref={frame} data-tally-src={form.embedUrl} width="100%" height={form.height} frameBorder={0} title={form.title} className={styles.tallyFrame} />
    <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" onReady={loadEmbeds} onError={loadWithoutWidget} />
  </>
}

export default function SignupPage({ kind }: { kind: SignupKind }) {
  const router = useRouter()
  const magazine = kind === "magazine"
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const title = magazine ? "magazine.exe" : "penpals.exe"
  const other = magazine ? signupForms.penpals : signupForms.magazine

  return <div className={styles.site}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <HomeHeader />
    <main id="main" className={styles.formPage}>
      <Link href="/" className={styles.formCrumb}>← back to Michelle’s Computer</Link>
      <section className={`${styles.formWindow} ${styles.signupWindow} ${maximized ? styles.formWindowMaximized : ""}`} aria-labelledby="signup-title">
        <WindowBar title={title} onMinimize={() => { setMinimized(true); setMaximized(false) }} onMaximize={() => { setMaximized(value => !value); setMinimized(false) }} onClose={() => router.push("/")} maximized={maximized} />
        <h1 id="signup-title" className={styles.srOnly}>{magazine ? "The magazine waitlist" : "Wanna be pen pals?"}</h1>
        {minimized && <button type="button" className={styles.formRestore} onClick={() => setMinimized(false)}><FileText size={19} aria-hidden="true" />Restore {title}</button>}
        <div hidden={minimized}>
          <div className={styles.windowMenu}><Link href="/">My computer</Link><span>{magazine ? "Magazine waitlist" : "The little post office"}</span><Link href={other.pagePath}>{magazine ? "Pen pals" : "Magazine"} →</Link></div>
          <div className={styles.formEmbed}><TallyForm key={kind} kind={kind} /></div>
          <div className={styles.formFallback}>
            <p>Form not loading? <a href={signupForms[kind].publicUrl} target="_blank" rel="noopener noreferrer">Open just the form in a new tab</a>.</p>
            <p>Magazine and pen pals are separate signups.</p>
          </div>
          <div className={styles.statusBar}><span>{magazine ? "The magazine waitlist" : "Pen pal interest signup"}</span><span className={styles.resizeGrip} aria-hidden="true" /></div>
        </div>
      </section>
    </main>
    <HomeFooter />
  </div>
}
