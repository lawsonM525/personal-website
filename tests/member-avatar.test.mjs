import test from 'node:test'
import assert from 'node:assert/strict'
import { avatarChoices, avatarSchema, defaultAvatar, randomAvatar, profileSchema, memberReturnPath } from '../lib/member/avatar.ts'

test('portraits are deterministic, serializable and cover every supported choice',()=>{
 const base=defaultAvatar('Builder A')
 assert.deepEqual(base,defaultAvatar('Builder A'))
 assert.notDeepEqual(base,defaultAvatar('Builder B'))
 assert.deepEqual(avatarSchema.parse(JSON.parse(JSON.stringify(base))),base)
 for(const [key,values] of Object.entries(avatarChoices)) for(const value of values) assert.equal(avatarSchema.safeParse({...base,[key]:value}).success,true,`${key} ${value}`)
 for(let i=0;i<100;i++) assert.equal(avatarSchema.safeParse(randomAvatar()).success,true)
})
test('profile choices reject arbitrary SVG, URLs, extra keys and unsupported values',()=>{
 const base=defaultAvatar('Builder')
 for(const value of [null,[],{},'<svg onload="alert(1)"/>',{...base,src:'https://evil.example/picture.svg'},{...base,hair:'long99'},{...base,skinColor:'url(https://evil.example)'},{...base,eyes:['variant01']},{...base,version:2}]) assert.equal(avatarSchema.safeParse(value).success,false)
 assert.equal(profileSchema.safeParse({name:'A',avatar:base}).success,false)
 assert.equal(profileSchema.safeParse({name:'Builder',avatar:base,user_id:'someone-else'}).success,false)
 assert.equal(profileSchema.parse({name:' Builder ',avatar:base}).name,'Builder')
})
test('email callbacks only return to the exchange or a local article',()=>{
 assert.equal(memberReturnPath('/learn/ai-alignment-and-ai-safety'),'/learn/ai-alignment-and-ai-safety')
 assert.equal(memberReturnPath('/feedback'),'/feedback')
 for(const value of ['https://evil.example','//evil.example','/learn/../evil','/learn/%2f%2fevil','/learn/a?next=https://evil.example','/learn/a\\evil','/learn/a\n',null]) assert.equal(memberReturnPath(value),'/feedback')
})
