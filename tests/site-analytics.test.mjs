import test from 'node:test'
import assert from 'node:assert/strict'
import { trackGoal } from '../lib/analytics.ts'

test('local previews do not send conversion events to production analytics', () => {
  const environment=process.env.NODE_ENV
  const priorWindow=globalThis.window
  const calls=[]
  try {
    process.env.NODE_ENV='production'
    globalThis.window={location:{hostname:'127.0.0.1',pathname:'/magazine'},datafast:(...args)=>calls.push(args),gtag:(...args)=>calls.push(args)}
    trackGoal('magazine_waitlist_open')
    assert.equal(calls.length,0)
    process.env.NODE_ENV='development'
    globalThis.window.location.hostname='michellescomputer.com'
    trackGoal('magazine_waitlist_open')
    assert.equal(calls.length,0)
  } finally {process.env.NODE_ENV=environment;globalThis.window=priorWindow}
})

test('production goals send only the public path to DataFast and GA4', () => {
  const environment=process.env.NODE_ENV
  const priorWindow=globalThis.window
  const calls=[]
  try {
    process.env.NODE_ENV='production'
    globalThis.window={location:{hostname:'michellescomputer.com',pathname:'/magazine',search:'?email=private@example.com',hash:'#private'},datafast:(...args)=>calls.push(args),gtag:(...args)=>calls.push(args)}
    trackGoal('magazine_waitlist_submitted')
    assert.deepEqual(calls,[['magazine_waitlist_submitted',{page_path:'/magazine'}],['event','magazine_waitlist_submitted',{page_path:'/magazine'}]])
  } finally {process.env.NODE_ENV=environment;globalThis.window=priorWindow}
})
