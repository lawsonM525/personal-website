import test from 'node:test'
import assert from 'node:assert/strict'
import {blockText, curriculumSections, curriculumGroups, completedReadings, highlightCompletedLearning} from '../lib/curriculum.ts'

const block=(key,text,style='normal')=>({_type:'block',_key:key,style,markDefs:[],children:[{_type:'span',_key:key+'text',text,marks:[]}]})

test('folding keeps the introduction, every module and nested subsections in reading order',()=>{
 const body=[block('intro','My story'),block('one','1 Representation','h2'),block('read','Read this'),block('nested','A closer look','h3'),block('nestedbody','Nested explanation'),block('two','2 Logic','h2'),block('last','An exercise')]
 const sections=curriculumSections(body)
 assert.deepEqual(sections.map(s=>[s.id,s.module]),[['curriculum-introduction',false],['curriculum-1-representation',true],['curriculum-2-logic',true]])
 assert.deepEqual(sections.flatMap(s=>[...(s.heading?[s.heading]:[]),...s.blocks]),body)
 assert.equal(sections[1].blocks[1].style,'h3')
 assert.equal(new Set(curriculumSections([block('a','Ideas','h2'),block('b','Ideas','h2')]).map(s=>s.id)).size,2)
})

test('a completed title can span emphasis and links without changing source text or marks',()=>{
 const body=[{...block('book',''),markDefs:[{_key:'source',_type:'link',href:'https://example.com/book'}],children:[{_type:'span',_key:'a',text:'Gödel, ',marks:['em']},{_type:'span',_key:'b',text:'Escher, Bach',marks:['strong','source']},{_type:'span',_key:'c',text:', by Hofstadter.',marks:[]}]}]
 const before=structuredClone(body)
 const highlighted=highlightCompletedLearning(body,[{title:'Gödel, Escher, Bach'}])
 assert.deepEqual(body,before)
 assert.equal(blockText(highlighted[0]),blockText(body[0]))
 assert.deepEqual(highlighted[0].markDefs,body[0].markDefs)
 assert.equal(highlighted[0].children.filter(s=>s.marks.includes('completedLearning')).map(s=>s.text).join(''),'Gödel, Escher, Bach')
 assert.ok(highlighted[0].children.find(s=>s.text==='Escher, Bach').marks.includes('source'))
 assert.ok(!highlighted[0].children.at(-1).marks.includes('completedLearning'))
})

test('the author learning log excludes absent topics and never invents recap links',()=>{
 const body=[block('geb','Gödel, Escher, Bach'),block('ai','Artificial Intelligence')]
 const log=completedReadings(body,[{title:'Gödel, Escher, Bach'},{title:'Not read'},{title:'Artificial Intelligence',recapHref:'//unrelated.example/recap'}])
 assert.deepEqual(log.map(s=>s.targetId),['curriculum-reading-geb','curriculum-reading-ai'])
 assert.ok(log.every(s=>s.recapHref===undefined))
 assert.equal(completedReadings(body,[{title:'Gödel, Escher, Bach',recapHref:'/learn/my-recap'}])[0].recapHref,'/learn/my-recap')
 const highlighted=highlightCompletedLearning(body,[{title:'Gödel, Escher, Bach'}])
 assert.ok(!highlighted[1].children.some(s=>s.marks.includes('completedLearning')))
})

test('the compact overview moves all eight modules forward without losing sections or old reading targets',()=>{
 const body=[block('intro','My story'),block('books','Reading list','h2'),block('geb','Gödel, Escher, Bach'),...Array.from({length:8},(_,i)=>[block(`m${i}`,`${i+1} Module ${i+1}`,'h2'),block(`reading${i}`,`Reading ${i+1}`)]).flat(),block('progress','What counts as progress','h2'),block('progressbody','Make something')]
 const sections=curriculumSections(body)
 const before=structuredClone(sections)
 const groups=curriculumGroups(sections)
 assert.equal(groups.modules.length,8)
 assert.deepEqual(groups.modules.map(s=>s.title),Array.from({length:8},(_,i)=>`${i+1} Module ${i+1}`))
 assert.deepEqual(groups.before.map(s=>s.title),['Why I’m studying this','Reading list'])
 assert.deepEqual(groups.after.map(s=>s.title),['What counts as progress'])
 assert.deepEqual([...groups.before,...groups.modules,...groups.after],sections)
 assert.equal(completedReadings(body,[{title:'Gödel, Escher, Bach'}])[0].targetId,'curriculum-reading-geb')
 assert.ok(groups.before.some(s=>s.blocks.some(b=>b._key==='geb')))
 assert.deepEqual(sections,before)
 assert.equal(new Set([...groups.before,...groups.modules,...groups.after].map(s=>s.id)).size,sections.length)
})

test('grouping keeps a curriculum without numbered modules readable',()=>{
 const sections=curriculumSections([block('intro','Welcome'),block('reading','Read this')])
 assert.deepEqual(curriculumGroups(sections),{before:sections,modules:[],after:[]})
})
