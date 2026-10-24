export const computerSoundCues = ["click", "open", "close", "minimize", "maximize", "startup"] as const
export type ComputerSoundCue = typeof computerSoundCues[number]
type Note = { frequency: number; end?: number; at: number; duration: number; level: number; triangle?: boolean }

// Original short OS-style sounds, synthesized locally. No sampled system audio.
const notes: Record<ComputerSoundCue, readonly Note[]> = {
  click: [{ frequency: 1050, end: 870, at: 0, duration: .032, level: .12, triangle: true }],
  open: [
    { frequency: 523.25, at: 0, duration: .16, level: .16 },
    { frequency: 659.25, at: .045, duration: .16, level: .12 },
    { frequency: 783.99, at: .09, duration: .17, level: .09 },
  ],
  close: [{ frequency: 523.25, end: 261.63, at: 0, duration: .15, level: .17, triangle: true }],
  minimize: [{ frequency: 740, end: 220, at: 0, duration: .13, level: .15, triangle: true }],
  maximize: [
    { frequency: 330, end: 740, at: 0, duration: .12, level: .15, triangle: true },
    { frequency: 987.77, at: .06, duration: .10, level: .05 },
  ],
  startup: [
    { frequency: 261.63, at: 0, duration: .32, level: .17 },
    { frequency: 392, at: .06, duration: .34, level: .12 },
    { frequency: 523.25, at: .14, duration: .32, level: .15 },
    { frequency: 783.99, at: .24, duration: .22, level: .05, triangle: true },
  ],
}

export function renderComputerSound(cue: ComputerSoundCue, sampleRate: number): Float32Array {
  if (!Number.isFinite(sampleRate) || sampleRate < 8000 || sampleRate > 192000) throw new RangeError("Unsupported sample rate")
  const score = notes[cue]
  const duration = Math.max(...score.map(note => note.at + note.duration))
  const samples = new Float32Array(Math.ceil(duration * sampleRate) + 1)
  for (const note of score) {
    const first = Math.round(note.at * sampleRate)
    const count = Math.floor(note.duration * sampleRate)
    for (let index = 0; index < count; index++) {
      const time = index / sampleRate
      const phase = 2 * Math.PI * (note.frequency * time + ((note.end ?? note.frequency) - note.frequency) * time * time / (2 * note.duration))
      const wave = note.triangle ? 2 / Math.PI * Math.asin(Math.sin(phase)) : Math.sin(phase) + .12 * Math.sin(phase * 2)
      const envelope = Math.min(1, time / .004) * Math.min(1, (note.duration - time) / .025) * Math.exp(-2.4 * time / note.duration)
      samples[first + index] += wave * envelope * note.level
    }
  }
  return samples
}

export type ComputerPlayback = { playing: boolean; lastCue: ComputerSoundCue | null; context: string }

export class ComputerSoundPlayer {
  private context: AudioContext | null = null
  private master: GainNode | null = null
  private buffers = new Map<ComputerSoundCue, AudioBuffer>()
  private sources = new Set<AudioBufferSourceNode>()
  private muted = false
  private lastStarted = -Infinity
  private lastCue: ComputerSoundCue | null = null
  private createContext: () => AudioContext
  private onPlayback?: (state: ComputerPlayback) => void

  constructor(createContext: () => AudioContext, onPlayback?: (state: ComputerPlayback) => void) {
    this.createContext = createContext
    this.onPlayback = onPlayback
  }

  private report() {
    this.onPlayback?.({ playing: this.sources.size > 0, lastCue: this.lastCue, context: this.context?.state ?? "locked" })
  }

  // Invoked from trusted clicks, never during initial page load.
  async play(cue: ComputerSoundCue): Promise<boolean> {
    if (this.muted) return false
    try {
      if (!this.context || this.context.state === "closed") {
        this.context = this.createContext()
        this.buffers.clear()
        this.lastStarted = -Infinity
        this.master = this.context.createGain()
        this.master.gain.value = .4
        this.master.connect(this.context.destination)
      }
      const context = this.context
      if (context.state !== "running") await context.resume()
      if (this.muted || this.context !== context || context.state !== "running") return false
      if (context.currentTime - this.lastStarted < .045 || this.sources.size >= 6) return false
      let buffer = this.buffers.get(cue)
      if (!buffer) {
        const pcm = renderComputerSound(cue, context.sampleRate)
        buffer = context.createBuffer(1, pcm.length, context.sampleRate)
        buffer.copyToChannel(pcm, 0)
        this.buffers.set(cue, buffer)
      }
      const source = context.createBufferSource()
      source.buffer = buffer
      source.connect(this.master!)
      source.onended = () => { source.disconnect(); this.sources.delete(source); this.report() }
      this.master!.gain.cancelScheduledValues(context.currentTime)
      this.master!.gain.setValueAtTime(.4, context.currentTime)
      try { source.start() } catch (error) { source.disconnect(); throw error }
      this.sources.add(source)
      this.lastStarted = context.currentTime
      this.lastCue = cue
      this.report()
      return true
    } catch {
      // Unavailable/blocked audio must never interrupt a page action.
      this.report()
      return false
    }
  }

  stop() {
    if (this.context && this.master) {
      this.master.gain.cancelScheduledValues(this.context.currentTime)
      this.master.gain.setTargetAtTime(0, this.context.currentTime, .004)
      for (const source of this.sources) { try { source.stop(this.context.currentTime + .015) } catch {} }
    }
    this.sources.clear()
    this.report()
  }

  setMuted(muted: boolean) { this.muted = muted; if (muted) this.stop() }

  dispose() {
    this.onPlayback = undefined
    this.stop()
    const context = this.context
    this.context = null
    this.master = null
    this.buffers.clear()
    if (context && context.state !== "closed") void context.close().catch(() => {})
  }
}
