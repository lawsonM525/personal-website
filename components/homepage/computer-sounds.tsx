"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { ComputerSoundPlayer, computerSoundCues, type ComputerPlayback, type ComputerSoundCue } from "@/lib/computer-sounds"
import styles from "./home.module.css"

const preferenceKey = "michelle-computer-sound-v1"
const SoundContext = createContext<{ enabled: boolean; toggle: () => void; play: (cue: ComputerSoundCue) => void; playback: ComputerPlayback } | null>(null)

export function useComputerSound() { return useContext(SoundContext) }

export function ComputerSoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true)
  const [playback, setPlayback] = useState<ComputerPlayback>({ playing: false, lastCue: null, context: "locked" })
  const enabledRef = useRef(true)
  const player = useRef<ComputerSoundPlayer | null>(null)

  const play = useCallback((cue: ComputerSoundCue) => {
    if (!enabledRef.current || document.hidden) return
    if (!player.current) player.current = new ComputerSoundPlayer(() => {
      const Constructor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Constructor) throw new Error("Audio unavailable")
      return new Constructor({ latencyHint: "interactive" })
    }, setPlayback)
    void player.current.play(cue)
  }, [])

  const applyPreference = useCallback((value: boolean) => {
    enabledRef.current = value
    player.current?.setMuted(!value)
    setEnabled(value)
  }, [])

  useEffect(() => {
    try { applyPreference(localStorage.getItem(preferenceKey) !== "off") } catch {}
    function storage(event: StorageEvent) { if (event.key === preferenceKey) applyPreference(event.newValue !== "off") }
    function visibility() { if (document.hidden) player.current?.stop() }
    function action(event: MouseEvent) {
      if (!event.isTrusted || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-computer-sound],button,a[href]") : null
      if (!target || target.closest("[data-sound-ignore]") || target.hasAttribute("disabled") || target.getAttribute("aria-disabled") === "true") return
      const explicit = target.dataset.computerSound
      const cue = computerSoundCues.includes(explicit as ComputerSoundCue) ? explicit as ComputerSoundCue : target.tagName === "A" ? "open" : "click"
      play(cue)
    }
    document.addEventListener("click", action, true)
    document.addEventListener("visibilitychange", visibility)
    window.addEventListener("storage", storage)
    return () => {
      document.removeEventListener("click", action, true)
      document.removeEventListener("visibilitychange", visibility)
      window.removeEventListener("storage", storage)
      player.current?.dispose()
      player.current = null
    }
  }, [applyPreference, play])

  const toggle = useCallback(() => {
    const next = !enabledRef.current
    applyPreference(next)
    try { localStorage.setItem(preferenceKey, next ? "on" : "off") } catch {}
    if (next) play("open")
  }, [applyPreference, play])

  const value = useMemo(() => ({ enabled, toggle, play, playback }), [enabled, toggle, play, playback])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function ComputerSoundToggle() {
  const sound = useContext(SoundContext)
  if (!sound) return null
  return <button type="button" className={styles.soundButton} data-sound-ignore
    aria-label="Sound effects" aria-pressed={sound.enabled}
    title={sound.enabled ? "Mute sound effects" : "Enable sound effects"}
    data-audio-state={sound.playback.context} data-sound-playing={sound.playback.playing} data-sound-last={sound.playback.lastCue ?? ""}
    onClick={sound.toggle}>
    {sound.enabled ? <Volume2 size={19} aria-hidden="true"/> : <VolumeX size={19} aria-hidden="true"/>}
  </button>
}
