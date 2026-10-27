import test from 'node:test'
import assert from 'node:assert/strict'
import { absoluteUrl, buildPageMetadata, personId, personStructuredData, websiteStructuredData, serializeStructuredData, siteConfig } from '../lib/seo.ts'

test('nested content gets its own canonical URL and real sharing image',()=>{
  for(const path of ['/projects/rag-in-practice','/projects/delta-stock-pitch','/girly-guide-to-ai']) {
    const meta=buildPageMetadata({title:'A page',description:'A useful description.',path})
    assert.equal(meta.alternates.canonical,absoluteUrl(path))
    assert.equal(meta.openGraph.url,absoluteUrl(path))
    assert.deepEqual(meta.openGraph.images,[absoluteUrl('/opengraph-image')])
    assert.deepEqual(meta.twitter.images,meta.openGraph.images)
    assert.ok(meta.keywords.length<10)
  }
})
test('page-specific art and indexing instructions survive shared metadata',()=>{
  const meta=buildPageMetadata({title:'The book',description:'A preview.',path:'/girly-guide-to-ai',images:['/books/girly-guide-to-ai/cover.webp'],robots:{index:false,follow:true}})
  assert.deepEqual(meta.openGraph.images,[absoluteUrl('/books/girly-guide-to-ai/cover.webp')])
  assert.deepEqual(meta.robots,{index:false,follow:true})
})
test('person and website form a consistent entity graph with current visible profile links',()=>{
  assert.equal(personStructuredData['@id'],personId)
  assert.equal(websiteStructuredData['@type'],'WebSite')
  assert.equal(websiteStructuredData.publisher['@id'],personId)
  assert.equal(websiteStructuredData.url,absoluteUrl())
  assert.ok(personStructuredData.sameAs.includes('https://www.instagram.com/michellescomputer/'))
  assert.equal(siteConfig.ogImage.includes('placeholder'),false)
})
test('structured data cannot terminate its containing script element',()=>{
  const value={name:'A </script> title',description:'< useful >'}
  const serialized=serializeStructuredData(value)
  assert.equal(serialized.includes('</script>'),false)
  assert.deepEqual(JSON.parse(serialized),value)
})
