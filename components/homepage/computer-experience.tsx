"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { desktopNoticeEvent, motionPreferenceEvent, notifyDesktop, prefersLessMotion, refreshMotionPreference, rememberWindowLaunch, setLessMotion } from "@/lib/computer-experience"
import styles from "./computer-experience.module.css"

function useMotionPreference() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(prefersLessMotion())
    const storage = () => { refreshMotionPreference(); update() }
    update(); media.addEventListener("change", update)
    window.addEventListener(motionPreferenceEvent, update); window.addEventListener("storage", storage)
    return () => { media.removeEventListener("change", update); window.removeEventListener(motionPreferenceEvent, update); window.removeEventListener("storage", storage) }
  }, [])
  return reduced
}

export function ComputerMotionToggle() {
  const reduced = useMotionPreference()
  return <button type="button" className={styles.motion} aria-pressed={reduced} title="Reduce movement and skip the startup animation" onClick={() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { notifyDesktop("Less motion is enabled in your device settings."); return }
    setLessMotion(!reduced)
  }}>Less motion {reduced ? "on" : "off"}</button>
}

export function ComputerExperience() {
  const pathname = usePathname()
  const search = useSearchParams().toString()
  const reduced = useMotionPreference()
  const [notice, setNotice] = useState<{ message: string; href?: string } | null>(null)
  const [pending, setPending] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  function clearTimers() { timers.current.forEach(clearTimeout); timers.current = [] }

  useEffect(() => {
    document.documentElement.dataset.computerExperience = "true"
    return () => { delete document.documentElement.dataset.computerExperience; delete document.documentElement.dataset.computerMotion }
  }, [])
  useEffect(() => { document.documentElement.dataset.computerMotion = reduced ? "reduced" : "full" }, [reduced])
  useEffect(() => { clearTimers(); setNotice(null); setPending(false) }, [pathname, search])

  useEffect(() => {
    function click(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("button,a[href]") : null
      if (!target || target.hasAttribute("disabled") || target.getAttribute("aria-disabled") === "true") return
      if (!target.closest("[data-window-drag-handle]")) rememberWindowLaunch(target.getBoundingClientRect())
      if (!(target instanceof HTMLAnchorElement) || target.download || (target.target && target.target !== "_self")) return
      const next = new URL(target.href, location.href)
      if (next.origin !== location.origin || `${next.pathname}${next.search}` === `${location.pathname}${location.search}`) return
      clearTimers()
      setPending(true)
      const label = (target.getAttribute("aria-label") || target.textContent || "page").trim().replace(/\s+/g, " ")
      timers.current.push(setTimeout(() => setNotice({ message: `Opening ${label.slice(0, 80)}…` }), 180))
      timers.current.push(setTimeout(() => setNotice({ message: "This is taking longer than usual. You can try the page again.", href: `${next.pathname}${next.search}${next.hash}` }), 10000))
    }
    function message(event: Event) {
      const value: unknown = (event as CustomEvent).detail
      if (typeof value !== "string" || !value) return
      clearTimers(); setPending(false); setNotice({ message: value })
      timers.current.push(setTimeout(() => setNotice(null), 4500))
    }
    function offline() { clearTimers(); setPending(false); setNotice({ message: "You’re offline. Your open page is still here." }) }
    function online() { setNotice({ message: "You’re back online." }); timers.current.push(setTimeout(() => setNotice(null), 3000)) }
    document.addEventListener("click", click, true)
    window.addEventListener(desktopNoticeEvent, message); window.addEventListener("offline", offline); window.addEventListener("online", online)
    return () => { clearTimers(); document.removeEventListener("click", click, true); window.removeEventListener(desktopNoticeEvent, message); window.removeEventListener("offline", offline); window.removeEventListener("online", online) }
  }, [])

  return <div data-navigation-pending={pending} aria-live="polite" aria-atomic="true">{notice && <div className={styles.notice}><p>{notice.message}</p>{notice.href && <a href={notice.href}>Try again</a>}<button type="button" aria-label="Dismiss computer message" onClick={() => { clearTimers(); setNotice(null); setPending(false) }}>×</button></div>}</div>
}
