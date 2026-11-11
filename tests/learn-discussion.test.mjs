import test from 'node:test'
import assert from 'node:assert/strict'
import {articleCommentSchema,articleReactionSchema,commentThreads,commentGifs,findCommentGif,commentGifUrl} from '../lib/learn-discussion.ts'
const id='a0000000-0000-4000-8000-000000000001'
const body={articleId:'article-1',message:'Hello there',parentId:id}
test('comments allow text, text plus a catalog GIF, and GIF-only replies',()=>{
 assert.ok(articleCommentSchema.safeParse(body).success)
 assert.ok(articleCommentSchema.safeParse({...body,message:'',gifId:'happy-frog'}).success)
 assert.ok(articleCommentSchema.safeParse({...body,gifId:'typing-cat'}).success)
 for(const invalid of [{message:''},{message:'x'},{gifId:'https://bad.example/gif'},{parentId:'not-an-id'},{articleId:'drafts/unsafe'},{website:'spam'}]) assert.equal(articleCommentSchema.safeParse({...body,...invalid}).success,false)
})
test('Unicode limits count characters consistently with Postgres',()=>{
 assert.ok(articleCommentSchema.safeParse({...body,message:'🩵'.repeat(2000)}).success)
 assert.equal(articleCommentSchema.safeParse({...body,message:'🩵'.repeat(2001)}).success,false)
 assert.equal(articleCommentSchema.safeParse({...body,message:'  🩵  '}).success,false)
})
test('reaction changes require a supported kind and explicit desired state',()=>{
 assert.ok(articleReactionSchema.safeParse({id,kind:'frog',active:true}).success)
 for(const extra of [{kind:'custom'},{active:'true'},{active:undefined},{id:'bad'}]) assert.equal(articleReactionSchema.safeParse({id,kind:'love',active:false,...extra}).success,false)
})
test('deep replies stay together even when input arrives out of order',()=>{
 const root={id:'a'},child={id:'b',parent_id:'a'},grandchild={id:'c',parent_id:'b'},second={id:'d'}
 assert.deepEqual(commentThreads([grandchild,root,child,second]),[{root,replies:[grandchild,child]},{root:second,replies:[]}])
})
test('orphaned or malformed cyclic comments remain finite and visible',()=>{
 const comments=[{id:'a',parent_id:'missing'},{id:'b',parent_id:'c'},{id:'c',parent_id:'b'}]
 assert.equal(commentThreads(comments).flatMap(group=>[group.root,...group.replies]).length,3)
})
test('GIF lookup never converts arbitrary user input into a media URL',()=>{
 assert.equal(findCommentGif('https://bad.example/gif'),undefined)
 assert.equal(new Set(commentGifs.map(gif=>gif.key)).size,commentGifs.length)
 for(const gif of commentGifs) assert.ok(commentGifUrl(gif.id).startsWith('https://media.giphy.com/media/'))
})
