import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
const base = process.argv[2] || 'http://127.0.0.1:3103'
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
    if (!redirect) {
      const proposal=route.startsWith('/begin')||route==='/openaibeta'
      const shared=/<section[^>]+class="computer-page-window/.test(html)
      if(proposal) assert.equal(shared,false,`${route}: proposal must remain outside the new layout`)
      else assert.ok(['/','/magazine','/penpals'].includes(route)||shared,`${route}: shared window absent`)
    }
    results.push({route,status:response.status,...(redirect?{location:response.headers.get('location')}:{} )})
  }))
}
const missing = await fetch(base+'/this-page-does-not-exist')
assert.equal(missing.status,404)
console.log(JSON.stringify({count:results.length,routes:results.sort((a,b)=>a.route.localeCompare(b.route)),notFoundStatus:missing.status},null,2))
