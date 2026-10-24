import test from "node:test"
import assert from "node:assert/strict"
import { ComputerSoundPlayer, computerSoundCues, renderComputerSound } from "../lib/computer-sounds.ts"

function context() {
  const sources = [], buffers = [], gains = []
  const ctx = {
    state: "suspended", sampleRate: 48000, currentTime: 0, destination: {},
    async resume() { ctx.state = "running" },
    async close() { ctx.state = "closed" },
    createGain() {
      const gain = { value: 1, cancelScheduledValues() {}, setValueAtTime(v) { this.value = v }, setTargetAtTime(v) { this.value = v } }
      const node = { gain, connect() {} }; gains.push(node); return node
    },
    createBuffer() {
      const buffer = { samples: null, copyToChannel(samples) { this.samples = samples } }
      buffers.push(buffer); return buffer
    },
    createBufferSource() {
      const source = { buffer: null, onended: null, started: false, stopped: false, connect() {}, disconnect() {}, start() { this.started = true }, stop() { this.stopped = true; this.onended?.() } }
      sources.push(source); return source
    },
  }
  return { ctx, sources, buffers, gains }
}

test("all original cues produce short, finite, unclipped PCM at common device sample rates", () => {
  for (const rate of [22050, 44100, 48000]) for (const cue of computerSoundCues) {
    const pcm = renderComputerSound(cue, rate)
    assert.ok(pcm.length / rate < .6)
    assert.equal(pcm[0], 0)
    assert.equal(pcm.at(-1), 0)
    let energy = 0
    for (const sample of pcm) { assert.ok(Number.isFinite(sample) && Math.abs(sample) <= 1); energy += sample * sample }
    assert.ok(Math.sqrt(energy / pcm.length) > .001, cue + " must not be silent")
  }
})

test("audio stays uninitialized until playback and mute stops active sounds", async () => {
  const fake = context()
  let created = 0
  const player = new ComputerSoundPlayer(() => { created++; return fake.ctx })
  assert.equal(created, 0)
  assert.equal(await player.play("open"), true)
  assert.equal(created, 1)
  assert.equal(fake.ctx.state, "running")
  assert.ok(fake.buffers[0].samples.some(sample => sample !== 0))
  player.setMuted(true)
  assert.equal(fake.sources[0].stopped, true)
  assert.equal(fake.gains[0].gain.value, 0)
  assert.equal(await player.play("close"), false)
  assert.equal(fake.sources.length, 1)
  player.setMuted(false)
  fake.ctx.currentTime = 1
  assert.equal(await player.play("click"), true)
  player.dispose()
  assert.equal(fake.sources[1].stopped, true)
  assert.equal(fake.ctx.state, "closed")
})

test("mute wins over a pending browser resume", async () => {
  const fake = context()
  let resume
  fake.ctx.resume = () => new Promise(resolve => { resume = () => { fake.ctx.state = "running"; resolve() } })
  const player = new ComputerSoundPlayer(() => fake.ctx)
  const pending = player.play("startup")
  player.setMuted(true)
  resume()
  assert.equal(await pending, false)
  assert.equal(fake.sources.length, 0)
  player.dispose()
})

test("blocked audio fails quietly and can retry on a later gesture", async () => {
  const fake = context()
  fake.ctx.resume = async () => { throw new Error("autoplay blocked") }
  const player = new ComputerSoundPlayer(() => fake.ctx)
  assert.equal(await player.play("open"), false)
  assert.equal(fake.sources.length, 0)
  fake.ctx.resume = async () => { fake.ctx.state = "running" }
  assert.equal(await player.play("open"), true)
  player.dispose()
  const unsupported = new ComputerSoundPlayer(() => { throw new Error("unavailable") })
  assert.equal(await unsupported.play("click"), false)
})

test("rapid repeated actions cannot build an unbounded stack of sounds", async () => {
  const fake = context()
  const player = new ComputerSoundPlayer(() => fake.ctx)
  assert.equal(await player.play("startup"), true)
  assert.equal(await player.play("startup"), false)
  for (let index = 1; index < 6; index++) {
    fake.ctx.currentTime += .05
    assert.equal(await player.play("startup"), true)
  }
  fake.ctx.currentTime += .05
  assert.equal(await player.play("startup"), false)
  assert.equal(fake.sources.length, 6)
  player.dispose()
})

test("a disposed player cannot finish a late resume and start playback", async () => {
  const fake = context()
  let resume
  fake.ctx.resume = () => new Promise(resolve => { resume = resolve })
  const player = new ComputerSoundPlayer(() => fake.ctx)
  const pending = player.play("startup")
  player.dispose()
  resume()
  assert.equal(await pending, false)
  assert.equal(fake.sources.length, 0)
})
