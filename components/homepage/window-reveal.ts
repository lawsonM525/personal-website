"use client"

import { useLayoutEffect, type RefObject } from "react"
import { motionPreferenceEvent, prefersLessMotion, takeWindowLaunch } from "@/lib/computer-experience"

export function useWindowReveal(bar: RefObject<HTMLDivElement>, title: string) {
  useLayoutEffect(() => {
    const element = bar.current?.closest<HTMLElement>("[data-computer-window]")
    if (!element) return
    let visible = false
    let animation: Animation | undefined
    function update() {
      const next = !!element!.getClientRects().length
      if (next && !visible && !prefersLessMotion()) {
        // A deep-linked program opens above Explorer; animate the program once.
        const behindProgram = title === "Explorer" && new URLSearchParams(location.search).has("app")
        const origin = behindProgram ? null : takeWindowLaunch()
        if (origin && typeof element!.animate === "function") {
          const box = element!.getBoundingClientRect()
          // Long articles keep their document position; only their title bar fades in.
          const surface = box.height > innerHeight * 1.2 ? bar.current : element!
          if (!surface) return
          const x = origin.x - box.left - box.width / 2
          const y = origin.y - box.top - box.height / 2
          animation?.cancel()
          const existing = getComputedStyle(surface).transform
          const rest = existing === "none" ? "" : existing
          animation = surface.animate([
            { opacity: 0, transform: surface === element ? `translate(${x}px,${y}px) ${rest} scale(.18)` : `translateY(3px) ${rest}` },
            { opacity: 1, transform: rest || "none" },
          ], { duration: 180, easing: "cubic-bezier(.2,.7,.2,1)" })
        }
      }
      visible = next
    }
    update()
    const observer = new MutationObserver(update)
    observer.observe(element, { attributes: true, attributeFilter: ["hidden", "class"] })
    const size = new ResizeObserver(update)
    size.observe(element)
    const media = matchMedia("(prefers-reduced-motion: reduce)")
    function motionChanged() { if (prefersLessMotion()) animation?.cancel() }
    window.addEventListener(motionPreferenceEvent, motionChanged); media.addEventListener("change", motionChanged)
    return () => { observer.disconnect(); size.disconnect(); animation?.cancel(); window.removeEventListener(motionPreferenceEvent, motionChanged); media.removeEventListener("change", motionChanged) }
  }, [bar, title])
}
