"use client"

import { useEffect, useRef, useState } from "react"
import { Power } from "lucide-react"
import { ButterflyMark } from "./butterfly-mark"
import styles from "./home.module.css"

const key="michelle-computer-booted-v1"
export function BootScreen({children}:{children:React.ReactNode}) {
  const [stage,setStage]=useState<"checking"|"off"|"booting"|"ready">("checking")
  const power=useRef<HTMLButtonElement>(null)
  useEffect(()=>{try{setStage(localStorage.getItem(key)?"ready":"off")}catch{setStage("off")}},[])
  useEffect(()=>{if(stage==="off")power.current?.focus()},[stage])
  function enter(){try{localStorage.setItem(key,"1")}catch{}setStage("ready")}
  useEffect(()=>{if(stage!=="booting")return;const timer=setTimeout(enter,matchMedia("(prefers-reduced-motion: reduce)").matches?150:2000);return()=>clearTimeout(timer)},[stage])
  useEffect(()=>{if(stage==="ready")document.querySelector<HTMLElement>("#home-title")?.focus({preventScroll:true})},[stage])
  return <><div className={styles.bootContent} hidden={stage!=="ready"}>{children}</div><noscript><style>{`.${styles.bootContent}[hidden]{display:block!important}.${styles.bootDesktop}{display:none!important}`}</style></noscript>{stage!=="ready"&&<main className={styles.bootDesktop} aria-label="Turn on Michelle’s Computer"><div className={styles.bootHeading}><ButterflyMark/><span>Michelle’s Computer</span></div><div className={styles.bootComputer}><div className={styles.bootBezel}><div className={`${styles.bootDisplay} ${stage==="booting"?styles.bootDisplayOn:""}`} aria-live="polite">{stage==="booting"?<><ButterflyMark/><p>Michelle’s Computer</p><div className={styles.bootProgress}><span/></div><small>Starting up…</small></>:<span className={styles.bootOffMark} aria-hidden="true">M.</span>}</div><div className={styles.bootHardware}><span>MICHELLE’S COMPUTER</span><button ref={power} type="button" aria-label="Turn on the computer" disabled={stage==="booting"} onClick={()=>setStage("booting")}><Power size={20} aria-hidden="true"/><i aria-hidden="true"/></button></div></div><div className={styles.bootStand}/><div className={styles.bootBase}/></div><div className={styles.bootPrompt}>{stage!=="booting"&&<p><span>Press the power button to come in.</span></p>}<button type="button" onClick={enter}>{stage==="booting"?"Skip startup":"Skip intro"} →</button></div></main>}</>
}
