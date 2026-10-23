"use client"

import { useEffect, useRef, useState } from "react"
import { Power } from "lucide-react"
import styles from "./home.module.css"

const key = "michelle-computer-booted-v1"
const powerOffEvent = "michelle:power-off"

export function powerOffComputer() {
  try { localStorage.removeItem(key) } catch {}
  if (window.location.pathname === "/") window.dispatchEvent(new Event(powerOffEvent))
  else window.location.assign("/")
}

export function BootScreen({children}:{children:React.ReactNode}) {
  const [stage,setStage]=useState<"checking"|"off"|"booting"|"ready">("checking")
  const power=useRef<HTMLButtonElement>(null)
  useEffect(() => {
    try { setStage(localStorage.getItem(key) ? "ready" : "off") } catch { setStage("off") }
    const turnOff = () => setStage("off")
    window.addEventListener(powerOffEvent, turnOff)
    return () => window.removeEventListener(powerOffEvent, turnOff)
  }, [])
  useEffect(()=>{if(stage==="off")power.current?.focus()},[stage])
  function enter(){try{localStorage.setItem(key,"1")}catch{}setStage("ready")}
  useEffect(()=>{if(stage!=="booting")return;const timer=setTimeout(enter,matchMedia("(prefers-reduced-motion: reduce)").matches?150:2000);return()=>clearTimeout(timer)},[stage])
  useEffect(()=>{if(stage==="ready")(document.querySelector<HTMLElement>("#home-title") ?? document.querySelector<HTMLElement>('a[aria-label="Michelle’s Computer home"]'))?.focus({preventScroll:true})},[stage])

  return <>
    <div className={styles.bootContent} hidden={stage!=="ready"}>{children}</div>
    <noscript><style>{`.${styles.bootContent}[hidden]{display:block!important}.${styles.bootDesktop}{display:none!important}`}</style></noscript>
    {stage!=="ready" && <main className={styles.bootDesktop} data-power-stage={stage} aria-label="Turn on Michelle’s Computer">
      <div className={styles.bootScene}>
        <div className={styles.bootComputer}>
          <div className={styles.bootBezel}>
            <div className={`${styles.bootDisplay} ${stage==="booting"?styles.bootDisplayOn:""}`} aria-live="polite">
              {stage==="booting" && <><span className={styles.srOnly}>Starting up…</span><div className={styles.bootProgress} aria-hidden="true"><span/></div></>}
            </div>
            <div className={styles.bootHardware}>
              <span className={styles.bootNote}>This computer is for Michelle</span>
              <button ref={power} type="button" aria-label="Turn on the computer" disabled={stage==="booting"||stage==="checking"} onClick={()=>setStage("booting")}><Power size={23} aria-hidden="true"/><i aria-hidden="true"/></button>
            </div>
          </div>
          <div className={styles.bootStand}/><div className={styles.bootBase}/>
        </div>
        <div className={`${styles.bootCallout} ${stage==="booting"?styles.bootCalloutHidden:""}`} aria-hidden="true">
          <span>press me!</span>
          <svg viewBox="0 0 185 155" fill="none"><path d="M14 145C109 160 191 106 155 54C150 44 143 35 137 30M137 30L138 53M137 30L159 34"/><path d="M16 148C108 160 187 107 153 56" opacity=".4"/></svg>
        </div>
      </div>
      <div className={styles.bootPrompt}><button type="button" onClick={enter}>{stage==="booting"?"Skip startup":"Skip intro"} →</button></div>
    </main>}
  </>
}
