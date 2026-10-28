import test from 'node:test'
import assert from 'node:assert/strict'
import { shouldRetryEmbed, isTallyReadyEvent, isTallySubmittedEvent } from '../lib/tally-embed.ts'

const stalled = {ready:false, engaged:false, attempts:1, elapsed:8000, initialBlank:false}
test('automatic recovery never replaces a ready or engaged form', () => {
  assert.equal(shouldRetryEmbed(stalled), true)
  assert.equal(shouldRetryEmbed({...stalled, ready:true}), false)
  assert.equal(shouldRetryEmbed({...stalled, engaged:true}), false)
  assert.equal(shouldRetryEmbed({...stalled, attempts:3}), false)
})
test('signup conversions accept only the submitted event from the correct embedded form', () => {
  const source = {}
  const event = {origin:'https://tally.so',source,data:JSON.stringify({event:'Tally.FormSubmitted',payload:{formId:'zxP9JM',answers:[{email:'not-collected@example.com'}]}})}
  assert.equal(isTallySubmittedEvent(event,source,'zxP9JM'), true)
  assert.equal(isTallySubmittedEvent({...event,origin:'https://untrusted.example'},source,'zxP9JM'), false)
  assert.equal(isTallySubmittedEvent({...event,source:{}},source,'zxP9JM'), false)
  assert.equal(isTallySubmittedEvent(event,source,'68alRY'), false)
  assert.equal(isTallySubmittedEvent(event,null,'zxP9JM'), false)
  assert.equal(isTallySubmittedEvent({...event,data:'not JSON'},source,'zxP9JM'), false)
  assert.equal(isTallySubmittedEvent({...event,data:JSON.stringify({event:'Tally.FormLoaded',payload:{formId:'zxP9JM'}})},source,'zxP9JM'), false)
})
test('blank startup recovers sooner while a navigating document gets time to load', () => {
  assert.equal(shouldRetryEmbed({...stalled, elapsed:1500, initialBlank:true}), true)
  assert.equal(shouldRetryEmbed({...stalled, elapsed:1500}), false)
  assert.equal(shouldRetryEmbed({...stalled, elapsed:7999}), false)
})
test('readiness accepts only the matching Tally frame, origin, and form', () => {
  const source = {}
  const event = {origin:'https://tally.so',source,data:JSON.stringify({event:'Tally.FormLoaded',payload:{formId:'zxP9JM'}})}
  assert.equal(isTallyReadyEvent(event,source,'zxP9JM'), true)
  assert.equal(isTallyReadyEvent({...event,origin:'https://untrusted.example'},source,'zxP9JM'), false)
  assert.equal(isTallyReadyEvent({...event,source:{}},source,'zxP9JM'), false)
  assert.equal(isTallyReadyEvent(event,source,'68alRY'), false)
  assert.equal(isTallyReadyEvent({...event,data:'not JSON'},source,'zxP9JM'), false)
  assert.equal(isTallyReadyEvent({...event,data:JSON.stringify({event:'Tally.FormSubmitted',payload:{formId:'zxP9JM'}})},source,'zxP9JM'), false)
})
