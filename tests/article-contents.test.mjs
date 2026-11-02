import test from 'node:test'
import assert from 'node:assert/strict'
import {articleContents} from '../lib/article-contents.ts'

const block=(key,title,style='h2')=>({_type:'block',_key:key,style,children:[{_type:'span',_key:key+'text',text:title,marks:[]}],markDefs:[]})

test('the index follows major steps and nested headings without changing the article',()=>{
 const body=[block('intro','Start here','normal'),block('one','1 Build your page'),{...block('sub','Set up React','h3'),children:[{_type:'span',_key:'a',text:'Set up ',marks:[]},{_type:'span',_key:'b',text:'React',marks:['strong']}]},block('code','Ignore this','normal'),block('two','2 Put it online')]
 const before=structuredClone(body)
 assert.deepEqual(articleContents(body),[{key:'one',id:'section-1-build-your-page',title:'1 Build your page',level:2},{key:'sub',id:'section-set-up-react',title:'Set up React',level:3},{key:'two',id:'section-2-put-it-online',title:'2 Put it online',level:2}])
 assert.deepEqual(body,before)
})

test('repeated or normalized headings have distinct targets and empty headings are skipped',()=>{
 const entries=articleContents([block('a','Résumé'),block('b','Resume'),block('c','   '),block('d','Build & publish!','h3')])
 assert.deepEqual(entries.map(x=>x.id),['section-resume','section-resume-2','section-build-publish'])
 assert.equal(new Set(entries.map(x=>x.id)).size,3)
})
