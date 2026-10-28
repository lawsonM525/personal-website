// No permissions or fallbacks: unsupported devices simply keep a normal boot.
export function createBootHaptics({ allowed, vibrate, now = Date.now }: {
  allowed: () => boolean;
  vibrate?: (duration: number) => boolean;
  now?: () => number;
}) {
  let lastPulse = -Infinity
  let hasPulsed = false
  return {
    tick() {
      if (!vibrate || !allowed()) return
      const time = now()
      if (time - lastPulse < 240) return
      lastPulse = time
      try { hasPulsed = vibrate(5) || hasPulsed } catch {}
    },
    stop() {
      if (!hasPulsed) return
      hasPulsed = false
      try { vibrate?.(0) } catch {}
    },
  }
}
