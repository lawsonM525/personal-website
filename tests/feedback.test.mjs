import test from 'node:test'
import assert from 'node:assert/strict'
import { isPublicAppUrl, feedbackCommentSchema, feedbackRatingsSchema, feedbackReplyLength, feedbackProjectSchema, feedbackReviewSchema, feedbackExample, prioritizeFeedback } from '../lib/feedback.ts'

test('app links allow public HTTPS demos and app-store pages',()=>{
 for(const url of ['https://my-app.vercel.app','https://apps.apple.com/us/app/example/id1234','https://example.com/demo?view=public']) assert.equal(isPublicAppUrl(url),true,url)
})
test('app links reject executable, local, credentialed, nonstandard-port, and malformed URLs',()=>{
 for(const url of ['javascript:alert(1)','data:text/html,hello','file:///tmp/app','http://example.com','https://127.0.0.1','https://[::1]','https://10.0.0.1','https://localhost','https://a.local','https://a.internal','https://name:password@example.com','https://example.com:8000','https://bad_.com','https://-bad.com','https://a.test','https://example.com/?access_token=private','not a url']) assert.equal(isPublicAppUrl(url),false,url)
})
test('requests require a brief summary, audience, concrete task, focus, and supported category',()=>{
 const data={title:'Study buddy',summary:'A study planner that turns exam dates into a weekly plan.',url:'https://study.example.com',category:'Web app',audience:'Students preparing for exams.',task:'Create a study plan for an exam next Friday.',focus:'Is the first step clear without an explanation?'}
 assert.equal(feedbackProjectSchema.parse(data).url,'https://study.example.com/')
 assert.equal(feedbackProjectSchema.parse({...data,summary:'  '+data.summary+'  '}).summary,data.summary)
 for(const patch of [{summary:undefined},{summary:'An app'},{summary:'x'.repeat(181)},{summary:'A study planner\nwith a weekly calendar.'},{task:'Thoughts?'},{audience:''},{focus:'rate it'},{category:'Spam'}]) assert.equal(feedbackProjectSchema.safeParse({...data,...patch}).success,false)
})
const observation=(i)=>({where:`Screen ${i}`,happened:`I tried step ${i} and the button did not show whether the project had been saved.`,suggestion:`For step ${i}, add a saved confirmation beside the button so the outcome is clear.`})
test('reviews require three different complete observations, an initial impression and task outcome',()=>{
 const data={projectId:feedbackExample.id,purpose:'I expected a study planner that would turn my course list into a daily plan.',observations:[1,2,3].map(observation),ratings:{design:4,usability:3,usefulness:5},outcome:'Completed it'}
 assert.equal(feedbackReviewSchema.safeParse(data).success,true)
 for(const patch of [{purpose:'looks good!'},{observations:undefined},{observations:[]},{observations:[observation(1),observation(2)]},{observations:[observation(1),observation(1),observation(3)]},{observations:[{...observation(1),happened:'looks good!'},observation(2),observation(3)]},{observations:[{...observation(1),suggestion:observation(1).happened},observation(2),observation(3)]},{observations:[{...observation(1),where:'a'},observation(2),observation(3)]},{ratings:undefined},{ratings:{design:0,usability:3,usefulness:5}},{ratings:{design:4,usability:6,usefulness:5}},{outcome:'did not try'}]) assert.equal(feedbackReviewSchema.safeParse({...data,...patch}).success,false,JSON.stringify(patch))
 const normalized=feedbackReviewSchema.parse({...data,observations:data.observations.map(x=>({...x,where:'  '+x.where+'  '}))})
 assert.equal(normalized.observations[0].where,'Screen 1')
 const copied={...observation(2),suggestion:observation(1).suggestion.toUpperCase().replaceAll(' ','  ')}
 assert.equal(feedbackReviewSchema.safeParse({...data,observations:[observation(1),copied,observation(3)]}).success,false)
})
test('queue puts unreviewed apps ahead of older apps that already have feedback',()=>{
 const projects=[{...feedbackExample,id:'one',review_count:2,created_at:'2026-01-01'},{...feedbackExample,id:'two',review_count:0,created_at:'2026-10-25'},{...feedbackExample,id:'three',review_count:0,created_at:'2026-10-20'}]
 assert.deepEqual(prioritizeFeedback(projects).map(p=>p.id),['three','two','one'])
 assert.equal(projects[0].id,'one')
})

test('project replies require 500–2000 meaningful characters and trim surrounding whitespace',()=>{
 const reply={projectId:feedbackExample.id,body:'a'.repeat(500)}
 assert.equal(feedbackCommentSchema.safeParse(reply).success,true)
 assert.equal(feedbackCommentSchema.safeParse({...reply,body:'a'.repeat(499)}).success,false)
 assert.equal(feedbackCommentSchema.safeParse({...reply,body:'  '+reply.body+' \n'}).data.body,reply.body)
 assert.equal(feedbackCommentSchema.safeParse({...reply,body:' '.repeat(500)}).success,false)
 assert.equal(feedbackCommentSchema.safeParse({...reply,body:'a'.repeat(2000)}).success,true)
 assert.equal(feedbackCommentSchema.safeParse({...reply,body:'a'.repeat(2001)}).success,false)
 assert.equal(feedbackReplyLength('😀'.repeat(250)),250)
 assert.equal(feedbackCommentSchema.safeParse({...reply,body:'😀'.repeat(250)}).success,false)
 assert.equal(feedbackCommentSchema.safeParse({...reply,projectId:'not-a-project'}).success,false)
})

test('ratings require exactly three whole-star scores, and ordinary follow-ups may omit them',()=>{
 const ratings={design:5,usability:1,usefulness:4}
 assert.deepEqual(feedbackRatingsSchema.parse(ratings),ratings)
 for(const value of [{...ratings,design:0},{...ratings,usefulness:6},{...ratings,usability:2.5},{...ratings,design:"4"},{design:4,usability:3},{...ratings,extra:5},null]) assert.equal(feedbackRatingsSchema.safeParse(value).success,false)
 const reply={projectId:feedbackExample.id,body:'a'.repeat(500)}
 assert.equal(feedbackCommentSchema.safeParse(reply).success,true)
 assert.deepEqual(feedbackCommentSchema.parse({...reply,ratings}).ratings,ratings)
 assert.equal(feedbackCommentSchema.safeParse({...reply,ratings:{design:4}}).success,false)
})
