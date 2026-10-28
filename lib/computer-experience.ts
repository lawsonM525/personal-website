export const motionPreferenceKey = "michelle-computer-motion-v1"
export const desktopNoticeEvent = "michelle:desktop-notice"
export const motionPreferenceEvent = "michelle:motion-preference"

let launch: { x: number; y: number; at: number } | null = null
let memoryMotionChoice: boolean | undefined

export function rememberWindowLaunch(rect: { left: number; top: number; width: number; height: number }, now = Date.now()) {
  launch = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, at: now }
}

export function takeWindowLaunch(now = Date.now()) {
  const value = launch
  launch = null
  return value && now - value.at >= 0 && now - value.at < 1200 ? value : null
}

export function prefersLessMotion() {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
  if (memoryMotionChoice !== undefined) return memoryMotionChoice
  try { return localStorage.getItem(motionPreferenceKey) === "reduced" } catch { return false }
}

export function setLessMotion(reduced: boolean) {
  memoryMotionChoice = reduced
  try { localStorage.setItem(motionPreferenceKey, reduced ? "reduced" : "full") } catch {}
  window.dispatchEvent(new Event(motionPreferenceEvent))
}

export function refreshMotionPreference() { memoryMotionChoice = undefined }

export function notifyDesktop(message: string) {
  window.dispatchEvent(new CustomEvent(desktopNoticeEvent, { detail: message }))
}

export function explorerLocation(currentUrl: string, app?: string) {
  const url = new URL(currentUrl)
  if (app) url.searchParams.set("app", app)
  else url.searchParams.delete("app")
  return `${url.pathname}${url.search}${url.hash}`
}
