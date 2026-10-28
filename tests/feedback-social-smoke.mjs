// Verify the HTML crawlers receive, including Next's metadata inheritance.
import assert from 'node:assert/strict'
const root = (process.argv[2] || 'http://127.0.0.1:3116').replace(/\/$/,'')
const response = await fetch(root+'/feedback',{headers:{'User-Agent':'facebookexternalhit/1.1'}})
assert.equal(response.status,200)
const html = await response.text()
const values = key => [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag])=>{
 const attribute=(name)=>tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
 return attribute('property')===key || attribute('name')===key ? attribute('content') : null
}).filter(value=>value!==null)
assert.deepEqual(values('og:image'),['https://michellescomputer.com/feedback/feedback-exchange-social-v1.png'])
assert.deepEqual(values('twitter:image'),values('og:image'))
assert.deepEqual(values('og:image:width'),['1200'])
assert.deepEqual(values('og:image:height'),['630'])
assert.deepEqual(values('og:image:type'),['image/png'])
assert.match(values('og:image:alt')[0],/Good projects need fresh eyes/)
assert.deepEqual(values('twitter:image:alt'),values('og:image:alt'))
const image=await fetch(root+new URL(values('og:image')[0]).pathname)
assert.equal(image.status,200);assert.match(image.headers.get('content-type'),/image\/png/)
const bytes=Buffer.from(await image.arrayBuffer())
assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a')
assert.equal(bytes.readUInt32BE(16),1200);assert.equal(bytes.readUInt32BE(20),630)
assert.ok(bytes.length<400*1024,'Sharing image should remain lightweight')
console.log(JSON.stringify({feedbackSpecificImage:true,noGenericFallback:true,openGraphAndTwitter:true,dimensions:'1200x630',imageBytes:bytes.length,crawlerHtmlVerified:true}))
