import test from 'node:test'
import assert from 'node:assert/strict'
import { createBootHaptics } from '../lib/boot-haptics.ts'

test('boot haptics require activation and stay brief and spaced out', () => {
  let allowed=false, time=0
  const calls=[]
  const haptics=createBootHaptics({allowed:()=>allowed,now:()=>time,vibrate:duration=>{calls.push(duration);return true}})
  haptics.tick();assert.deepEqual(calls,[])
  allowed=true
  haptics.tick();time=70;haptics.tick();time=239;haptics.tick();time=240;haptics.tick()
  assert.deepEqual(calls,[5,5])
  allowed=false;time=500;haptics.tick();haptics.stop();haptics.stop()
  assert.deepEqual(calls,[5,5,0])
})

test('missing or blocked vibration never interrupts startup', () => {
  const unsupported=createBootHaptics({allowed:()=>true})
  assert.doesNotThrow(()=>{unsupported.tick();unsupported.stop()})
  const blocked=createBootHaptics({allowed:()=>true,vibrate:()=>{throw Error('unavailable')}})
  assert.doesNotThrow(()=>{blocked.tick();blocked.stop()})
  const denied=[]
  const haptics=createBootHaptics({allowed:()=>true,vibrate:duration=>{denied.push(duration);return false}})
  haptics.tick();haptics.stop();assert.deepEqual(denied,[5])
})
