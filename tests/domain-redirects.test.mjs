import test from 'node:test'
import assert from 'node:assert/strict'
import testing from 'next/experimental/testing/server.js'
import nextConfig from '../next.config.mjs'

const {unstable_getResponseFromNextConfig, getRedirectUrl}=testing

test('legacy-domain search links permanently reach the same content on Michelle’s Computer',async()=>{
  for(const host of ['michellelawson.me','www.michellelawson.me']) {
    // Query forwarding is checked against the built server; Next 15's test
    // helper constructs its result from the pathname without the query string.
    for(const path of ['/','/learn','/learn/symbolic-systems-curriculum','/girly-guide-to-ai','/girly-guide-to-ai/read']) {
      const response=await unstable_getResponseFromNextConfig({url:`https://${host}${path}`,nextConfig})
      assert.equal(response.status,308)
      assert.equal(getRedirectUrl(response),`https://michellescomputer.com${path}`)
    }
  }
})

test('the redirect neither loops on the current domain nor captures preview or lookalike hosts',async()=>{
  for(const host of ['michellescomputer.com','www.michellescomputer.com','preview.vercel.app','www.michellelawson.me.example.com','wwwXmichellelawsonYme']) {
    const response=await unstable_getResponseFromNextConfig({url:`https://${host}/learn/symbolic-systems-curriculum`,nextConfig})
    assert.equal(response.status,200)
    assert.equal(getRedirectUrl(response),null)
  }
})
