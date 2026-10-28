import test from 'node:test'
import assert from 'node:assert/strict'
import { avatarChoices, illustratedChoices, avatarSchema, defaultAvatar, randomAvatar, profileSchema, memberReturnPath } from '../lib/member/avatar.ts'

test('illustrated portraits are the default and both styles have deterministic, serializable choices',()=>{
 assert.equal(defaultAvatar('Builder A').version,2)
 for(const [style,options] of [['illustrated',illustratedChoices],['pixel',avatarChoices]]){
  const base=defaultAvatar('Builder A',style)
  assert.deepEqual(base,defaultAvatar('Builder A',style))
  assert.notDeepEqual(base,defaultAvatar('Builder B',style))
  assert.deepEqual(avatarSchema.parse(JSON.parse(JSON.stringify(base))),base)
  for(const [key,values] of Object.entries(options)) for(const value of values) assert.equal(avatarSchema.safeParse({...base,[key]:value}).success,true,`${style} ${key} ${value}`)
  for(let i=0;i<100;i++) assert.equal(avatarSchema.safeParse(randomAvatar(style)).success,true)
 }
})
test('profile choices reject SVG, URLs, extra keys, unsupported variants and mixed styles',()=>{
 const base=defaultAvatar('Builder')
 for(const value of [null,[],{},'<svg onload="alert(1)"/>',{...base,src:'https://evil.example/picture.svg'},{...base,hair:'long04'},{...base,hair:'variant49'},{...base,style:'unknown'},{...base,skinColor:'url(https://evil.example)'},{...base,eyes:['variant01']},{...base,version:3},{...defaultAvatar('Builder','pixel'),style:'illustrated'}]) assert.equal(avatarSchema.safeParse(value).success,false)
 assert.equal(profileSchema.safeParse({name:'A',avatar:base}).success,false)
 assert.equal(profileSchema.safeParse({name:'Builder',avatar:base,user_id:'someone-else'}).success,false)
 assert.equal(profileSchema.parse({name:' Builder ',avatar:base}).name,'Builder')
})
test('legacy saved pixel choices remain valid without being changed into illustrated portraits',()=>{
 const pixel={version:1,hair:'long04',eyes:'variant01',mouth:'happy01',clothing:'variant01',glasses:'none',hat:'none',beard:'none',accessories:'none',skinColor:'8d5524',hairColor:'3b2418',clothingColor:'0a47d5',backgroundColor:'f6bad8'}
 assert.deepEqual(avatarSchema.parse(pixel),pixel)
})
test('email callbacks only return to the exchange or a local article',()=>{
 assert.equal(memberReturnPath('/learn/ai-alignment-and-ai-safety'),'/learn/ai-alignment-and-ai-safety')
 assert.equal(memberReturnPath('/feedback'),'/feedback')
 for(const value of ['https://evil.example','//evil.example','/learn/../evil','/learn/%2f%2fevil','/learn/a?next=https://evil.example','/learn/a\\evil','/learn/a\n',null]) assert.equal(memberReturnPath(value),'/feedback')
})
