import { writeFile } from 'node:fs/promises'
const base = new URL(process.argv[2] || 'https://michellescomputer.com')
const paths = ['/', '/about', '/learn', '/learn/how-to-build-ai-wardrobe-digital-closet', '/girly-guide-to-ai', '/projects', '/projects/rag-in-practice', '/projects/delta-stock-pitch', '/research', '/magazine', '/penpals', '/explore', '/learn/submit']
const decode = text => text?.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'")
function attributes(tag) { return Object.fromEntries([...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map(([,key,value])=>[key,decode(value)])) }
const pages=[]
for(let index=0;index<paths.length;index+=4) await Promise.all(paths.slice(index,index+4).map(async path=>{
  const response=await fetch(new URL(path,base));const html=await response.text()
  const metas=[...html.matchAll(/<meta\b[^>]*>/g)].map(match=>attributes(match[0]))
  const links=[...html.matchAll(/<link\b[^>]*>/g)].map(match=>attributes(match[0]))
  const meta=name=>metas.find(item=>item.name===name||item.property===name)?.content
  const structured=[]
  for(const [,raw] of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g)) {
    try {const value=JSON.parse(raw);structured.push(...(value['@graph']||[value]).map(item=>item['@type']))}catch{structured.push('INVALID_JSON')}
  }
  pages.push({path,status:response.status,title:decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]),description:meta('description'),canonical:links.find(item=>item.rel==='canonical')?.href,robots:meta('robots'),ogImage:meta('og:image'),types:structured,illustrations:(html.match(/data-source-page=/g)||[]).length})
}))
const resources=[]
for(const path of ['/robots.txt','/sitemap.xml','/ai.txt']) { const response=await fetch(new URL(path,base));const text=await response.text();resources.push({path,status:response.status,contentType:response.headers.get('content-type'),...(path==='/sitemap.xml'?{urls:[...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>decode(match[1]))}:{text})}) }
const report={base:base.origin,pages:pages.sort((a,b)=>a.path.localeCompare(b.path)),resources}
if(process.argv[3])await writeFile(process.argv[3],JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify(report,null,2))
