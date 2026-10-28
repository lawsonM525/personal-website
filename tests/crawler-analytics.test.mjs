import test from 'node:test'
import assert from 'node:assert/strict'
import { publicCrawlerRequest } from '../lib/crawler-analytics.ts'
import { trackAICrawlerRequest, shouldTrackAICrawlerRequest } from '@datafast/ai-crawl'

const config = {websiteId:'dfid_test', additionalIgnoredPathPrefixes:['/feedback','/begin','/openaibeta']}

test('crawler events omit queries, fragments, cookies, authorization, and referrers', () => {
  const request = publicCrawlerRequest(new Request('https://michellescomputer.com/learn?token=private#part', {headers:{'user-agent':'OAI-SearchBot','cookie':'session=private','authorization':'Bearer private','referer':'https://example.com/?email=private','x-forwarded-for':'192.0.2.1'}}))
  assert.equal(request.url,'https://michellescomputer.com/learn')
  assert.deepEqual([...request.headers.keys()],['user-agent','x-forwarded-for'])
  assert.equal(request.headers.get('x-forwarded-for'),'192.0.2.1')
})

test('ordinary visitors, APIs, assets, feedback, and proposal pages are skipped locally', () => {
  for (const [path, agent] of [['/learn','Mozilla/5.0'],['/api/feedback','OAI-SearchBot'],['/books/cover.webp','GPTBot'],['/feedback','Claude-User'],['/begin/openai','ChatGPT-User']]) {
    assert.ok(shouldTrackAICrawlerRequest(new Request(`https://michellescomputer.com${path}`,{headers:{'user-agent':agent}}),config).reason)
  }
  assert.ok(shouldTrackAICrawlerRequest(new Request('https://michellescomputer.com/learn',{headers:{'user-agent':'OAI-SearchBot'}}),config).url)
})

test('tracking runs in the background and a failed analytics request does not fail the page', async () => {
  const tasks=[]
  let release
  const response=new Promise(resolve=>{release=resolve})
  const result=trackAICrawlerRequest(new Request('https://michellescomputer.com/learn',{headers:{'user-agent':'OAI-SearchBot'}}),{waitUntil:task=>tasks.push(task)},{...config,fetch:()=>response})
  assert.equal(result.scheduled,true)
  assert.equal(tasks.length,1)
  release(new Response('',{status:503}))
  await assert.doesNotReject(tasks[0])
})
