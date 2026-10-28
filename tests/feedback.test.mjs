import test from 'node:test'
import assert from 'node:assert/strict'
import { isPublicAppUrl, feedbackProjectSchema, feedbackReviewSchema, feedbackExample, prioritizeFeedback } from '../lib/feedback.ts'

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
test('reviews reject drive-by praise, repeated answers, invalid scores, and missing tasks',()=>{
 const data={projectId:feedbackExample.id,purpose:'I expected a study planner that would turn my course list into a daily plan.',confusion:'I could not tell whether the blue button saved the plan or started a new one.',improvement:'Label the blue button Save plan so I know what will happen before clicking.',designScore:4,outcome:'Completed it'}
 assert.equal(feedbackReviewSchema.safeParse(data).success,true)
 for(const patch of [{purpose:'looks good!'},{confusion:data.purpose},{improvement:data.confusion},{designScore:0},{designScore:6},{outcome:'did not try'}]) assert.equal(feedbackReviewSchema.safeParse({...data,...patch}).success,false)
})
test('queue puts unreviewed apps ahead of older apps that already have feedback',()=>{
 const projects=[{...feedbackExample,id:'one',review_count:2,created_at:'2026-01-01'},{...feedbackExample,id:'two',review_count:0,created_at:'2026-10-25'},{...feedbackExample,id:'three',review_count:0,created_at:'2026-10-20'}]
 assert.deepEqual(prioritizeFeedback(projects).map(p=>p.id),['three','two','one'])
 assert.equal(projects[0].id,'one')
})
