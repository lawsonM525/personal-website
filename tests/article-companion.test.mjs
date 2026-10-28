import test from 'node:test'
import assert from 'node:assert/strict'
import { alignmentVideo, companionPosition, companionVideoSchema } from '../lib/article-companion.ts'

test('the companion sits after the alignment explanation without changing the author’s blocks', () => {
  const body=[{_key:'before',_type:'block',children:[{text:'Leesha’s opening.'}]},{_key:'anchor',_type:'block',children:[{text:'This is the problem of '},{text:'AI alignment'},{text:'.'}]},{_key:'after',_type:'articleImage'}]
  const original=structuredClone(body), position=companionPosition(alignmentVideo.articleSlug,body)
  assert.equal(position,2)
  assert.deepEqual([...body.slice(0,position),...body.slice(position)],original)
  assert.equal(companionPosition('digital-conquest-ai-cybersecurity',body),null)
  assert.equal(companionPosition(alignmentVideo.articleSlug,[body[0]]),1)
})
test('a later Studio embed of the same post replaces the companion without duplication', () => {
  for(const url of [alignmentVideo.sourceUrl,'https://instagram.com/reel/De4_7QUybQs?igsh=example',alignmentVideo.contentPath]) assert.equal(companionPosition(alignmentVideo.articleSlug,[{_type:'videoEmbed',url}]),null)
  assert.equal(companionPosition(alignmentVideo.articleSlug,[{_type:'videoEmbed',url:'https://example.com/p/De4_7QUybQs/'}]),1)
})
test('video metadata credits Michelle separately and uses the actual asset and publication date', () => {
  const video=companionVideoSchema('https://michellescomputer.com/learn/ai-alignment-and-ai-safety',path=>'https://michellescomputer.com'+path,'https://michellescomputer.com/#person')
  assert.equal(video.creator.name,'Michelle Lawson')
  assert.equal(video.uploadDate,'2026-10-24T20:33:58.000Z')
  assert.equal(video.duration,'PT1M17S')
  assert.match(video.contentUrl,/\.mp4$/)
  assert.match(video.transcript,/free up some space/)
})
