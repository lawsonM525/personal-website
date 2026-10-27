import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
const base = process.argv[2] || 'http://127.0.0.1:3107'
const entries = await readdir('app',{recursive:true})
const routes = entries.filter(p=>(p==='page.tsx'||p.endsWith('/page.tsx'))&&!p.includes('[')).map(p=>'/'+p.replace(/\/page\.tsx$/,'').replace(/^page\.tsx$/,''))
const manifest = JSON.parse(await readFile('.next/prerender-manifest.json','utf8'))
routes.push(...Object.keys(manifest.routes).filter(p=>p.startsWith('/learn/')&&!routes.includes(p)))
const results=[]
for (let i=0;i<routes.length;i+=4) {
  await Promise.all(routes.slice(i,i+4).map(async route=>{
    const response = await fetch(base+route,{redirect:'manual'})
    const html = await response.text()
    const redirect = response.status>=300&&response.status<400
    assert.ok(response.ok || redirect,`${route}: HTTP ${response.status}`)
    if (route.startsWith("/resources")) {
      assert.equal(response.status,307,`${route}: archive must redirect`);assert.equal(response.headers.get("location"),"/learn")
    }
    if (!redirect) {
      if(route === "/learn")assert.equal(/<nav[^>]+class="computer-page-toolbar/.test(html),false,"Learn must not duplicate window navigation")
      if(route === "/")assert.ok(html.includes("Welcome"),"Homepage content must remain server-rendered")
      if(["/", "/learn", "/projects"].includes(route))assert.equal(/href="\/resources(?:["/])/.test(html),false,`${route}: archived resources link remains`)
      const proposal=route.startsWith('/begin')||route==='/openaibeta'
      const shared=/<section[^>]+class="computer-page-window/.test(html)
      if(proposal) {
        assert.equal(shared,false,`${route}: proposal must remain outside the new layout`)
        assert.equal(html.includes('aria-label="Sound effects"'),false,`${route}: proposal must remain outside computer sounds`)
      }
      else {
        assert.ok(['/','/explore','/magazine','/penpals'].includes(route)||shared,`${route}: shared window absent`)
        assert.ok(html.includes('aria-label="Sound effects"'),`${route}: sound control absent`)
      }
    }
    results.push({route,status:response.status,...(redirect?{location:response.headers.get('location')}:{} )})
  }))
}
const missing = await fetch(base+'/this-page-does-not-exist')
assert.equal(missing.status,404)
const pdf=await fetch(base+"/projects/delta-stock-pitch/delta-stock-pitch.pdf")
assert.equal(pdf.status,200);assert.ok(pdf.headers.get("content-type")?.includes("application/pdf"));assert.equal(Buffer.from(await pdf.arrayBuffer()).subarray(0,5).toString(),"%PDF-")
console.log(JSON.stringify({pdfStatus:pdf.status,count:results.length,routes:results.sort((a,b)=>a.route.localeCompare(b.route)),notFoundStatus:missing.status},null,2))
