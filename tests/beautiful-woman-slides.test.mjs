import test from 'node:test'
import assert from 'node:assert/strict'
import { beautifulWomanSlides, beautifulWomanDeckPath, deckShareUrl, slideIndexFromHash } from '../lib/beautiful-woman-slides.ts'

test('each audience-facing slide has a unique stable share URL that reopens the same slide', () => {
  const ids = beautifulWomanSlides.map(slide => slide.id)
  assert.equal(new Set(ids).size, ids.length)
  for (let index = 0; index < ids.length; index++) {
    const url = new URL(deckShareUrl(index))
    assert.equal(url.origin, 'https://michellescomputer.com')
    assert.equal(url.pathname, beautifulWomanDeckPath)
    assert.equal(url.search, '')
    assert.equal(slideIndexFromHash(url.hash), index)
  }
  assert.equal(slideIndexFromHash('#not-a-slide'), 0)
  assert.equal(slideIndexFromHash(''), 0)
  assert.equal(deckShareUrl(-1), deckShareUrl(0))
  assert.equal(deckShareUrl(100), deckShareUrl(ids.length - 1))
})

test('the focused deck preserves the requested three sections and ends with next week', () => {
  assert.ok(beautifulWomanSlides.length >= 15 && beautifulWomanSlides.length <= 20)
  assert.deepEqual([...new Set(beautifulWomanSlides.map(slide => slide.section))], ['Welcome', 'Possibilities', 'Cautions', 'Faith & judgment', 'Next week'])
  assert.equal(beautifulWomanSlides.at(-1).id, 'next-week')
  const text = JSON.stringify(beautifulWomanSlides)
  assert.ok(!/Renee|Maryanne/.test(text), 'private audience examples must not be published')
  assert.match(text, /doesn’t guarantee a job/)
  assert.match(text, /Holy Spirit/)
  assert.match(text, /not a formal diagnosis/)
  for (const slide of beautifulWomanSlides) {
    assert.ok(slide.title && (slide.lead || slide.points?.length || slide.question || slide.prompt))
    if (slide.source) assert.equal(new URL(slide.source.href).protocol, 'https:')
  }
})
