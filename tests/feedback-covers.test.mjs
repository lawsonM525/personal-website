import test from 'node:test'
import assert from 'node:assert/strict'
import sharp from 'sharp'
import { normalizeCover, coverUploadLimit, coverStoredLimit } from '../lib/feedback/cover-image.ts'

test('large screenshots become bounded WebP with source metadata removed', async () => {
 const input=await sharp({create:{width:2400,height:1350,channels:3,background:'#ffb9da'}}).jpeg().withMetadata({exif:{IFD0:{Artist:'private-source-name'}}}).toBuffer()
 const result=await normalizeCover(input)
 const metadata=await sharp(result.data).metadata()
 assert.equal(metadata.format,'webp'); assert.equal(metadata.width,1600); assert.equal(metadata.height,900)
 assert.equal(metadata.exif,undefined); assert.ok(result.data.length<=coverStoredLimit)
})
test('portrait screenshots keep their shape and smaller images are not enlarged',async()=>{
 const input=await sharp({create:{width:390,height:844,channels:4,background:'#b4d3ed'}}).png().toBuffer()
 const result=await normalizeCover(input)
 assert.equal(result.width,390); assert.equal(result.height,844)
})
test('uploads reject active content, corrupt files, tiny thumbnails and oversized payloads',async()=>{
 const tiny=await sharp({create:{width:100,height:100,channels:3,background:'white'}}).png().toBuffer()
 for(const input of [Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>'),Buffer.from('<html>hello</html>'),Buffer.from('RIFF0000WEBPbroken'),tiny,Buffer.alloc(coverUploadLimit+1)]) await assert.rejects(normalizeCover(input))
})
test('animated WebP is rejected instead of silently flattening frames',async()=>{
 const chunk=(name,data)=>{const head=Buffer.alloc(8);head.write(name);head.writeUInt32LE(data.length,4);return Buffer.concat([head,data,...(data.length%2?[Buffer.alloc(1)]:[])])}
 const header=Buffer.alloc(10);header[0]=2;header.writeUIntLE(399,4,3);header.writeUIntLE(199,7,3)
 const frames=[]
 for(const background of ['pink','blue']) {const image=await sharp({create:{width:400,height:200,channels:3,background}}).webp().toBuffer();const frame=Buffer.alloc(16);frame.writeUIntLE(399,6,3);frame.writeUIntLE(199,9,3);frame.writeUIntLE(100,12,3);frames.push(chunk('ANMF',Buffer.concat([frame,image.subarray(12)])))}
 const payload=Buffer.concat([Buffer.from('WEBP'),chunk('VP8X',header),chunk('ANIM',Buffer.alloc(6)),...frames]);const riff=Buffer.alloc(8);riff.write('RIFF');riff.writeUInt32LE(payload.length,4);const animated=Buffer.concat([riff,payload])
 assert.equal((await sharp(animated,{animated:true}).metadata()).pages,2)
 await assert.rejects(normalizeCover(animated),/still image/)
})
