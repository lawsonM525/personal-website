import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
const base=process.argv[2] || 'http://127.0.0.1:3108'
const report=JSON.parse(await readFile(process.argv[3] || 'output/seo-foundation-check.json','utf8'))
for(const page of report.pages) {
  assert.equal(page.status,200,`${page.path}: HTTP status`)
  assert.ok(page.title && page.description,`${page.path}: title/description absent`)
  const canonical=new URL(page.canonical)
  assert.equal(canonical.origin,'https://michellescomputer.com',`${page.path}: canonical origin`)
  assert.equal(canonical.pathname,page.path,`${page.path}: canonical points to another page`)
  assert.ok(!page.ogImage.includes('placeholder'),`${page.path}: placeholder sharing image`)
  assert.ok(page.types.includes('Person') && page.types.includes('WebSite'),`${page.path}: entity graph absent`)
  assert.ok(!page.types.includes('INVALID_JSON'),`${page.path}: malformed structured data`)
}
const book=report.pages.find(page=>page.path==='/girly-guide-to-ai')
assert.ok(book.types.includes('Book'));assert.equal(book.illustrations,230)
assert.ok(report.pages.find(page=>page.path.includes('/learn/how-to-')).types.includes('Article'))
assert.match(report.pages.find(page=>page.path==='/learn/submit').robots,/noindex/)
const sitemap=report.resources.find(resource=>resource.path==='/sitemap.xml')
assert.equal(sitemap.status,200)
assert.ok(sitemap.urls.includes('https://michellescomputer.com/projects/rag-in-practice'))
assert.ok(sitemap.urls.includes('https://michellescomputer.com/projects/delta-stock-pitch'))
assert.ok(!sitemap.urls.some(url=>url.includes('/learn/submit') || url.includes('/begin')))
assert.match(report.resources.find(resource=>resource.path==='/robots.txt').text,/OAI-SearchBot/)
for(const path of ['/begin','/begin/openai','/openaibeta']) {
 const response=await fetch(base+path);const html=await response.text()
 assert.equal(response.status,200)
 assert.match(html,/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/,`${path}: proposal is indexable`)
}
const image=await fetch(base+'/opengraph-image');assert.equal(image.status,200);assert.match(image.headers.get('content-type'),/image\/png/)
const png=Buffer.from(await image.arrayBuffer());assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630)
const proof=await fetch(base+'/girly-guide-to-ai?preview=full');const proofHtml=await proof.text()
assert.equal(proof.status,200);assert.ok(proofHtml.includes('Reading preview'));assert.ok(!proofHtml.includes('>Full text<'))
assert.equal((await fetch(base+'/_private/girly-guide-ai.full.json')).status,404)
console.log(JSON.stringify({pages:report.pages.length,originalFigures:book.illustrations,sharingImage:'1200x630 PNG',productionProofLocked:true,sitemapAndRobots:'passed',utilityNoindex:'passed'},null,2))
