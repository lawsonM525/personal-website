import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { feedbackPkce } from '../lib/feedback/pkce.ts'
import { feedbackRequestOrigin } from '../lib/feedback/request-origin.ts'

test('email sign-in uses an unpredictable PKCE verifier and matching S256 challenge',()=>{
 const first=feedbackPkce(), second=feedbackPkce()
 assert.match(first.verifier,/^[A-Za-z0-9_-]{43}$/)
 assert.notEqual(first.verifier,second.verifier)
 assert.equal(first.challenge,createHash('sha256').update(first.verifier).digest('base64url'))
 assert.notEqual(first.challenge,first.verifier)
})
test('sign-in stays on the browser host for local development and production',()=>{
 assert.equal(feedbackRequestOrigin('127.0.0.1:3000',false),'http://127.0.0.1:3000')
 assert.equal(feedbackRequestOrigin('localhost:3000',false),'http://localhost:3000')
 assert.equal(feedbackRequestOrigin('michellescomputer.com',true),'https://michellescomputer.com')
 for(const host of [null,'evil.com/path','user@evil.com','evil.com\\path','evil.com?next=bad']) assert.throws(()=>feedbackRequestOrigin(host,true))
})
