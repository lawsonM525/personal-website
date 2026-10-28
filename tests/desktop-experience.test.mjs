import test from 'node:test'
import assert from 'node:assert/strict'
import { explorerLocation, rememberWindowLaunch, takeWindowLaunch, prefersLessMotion, setLessMotion, refreshMotionPreference } from '../lib/computer-experience.ts'
import { chapterFromGuideHash, guidePlaceHash, guideProgressKey, readGuidePlace, saveGuidePlace } from '../lib/guide-progress.ts'

test('opening and closing apps preserves folder filters and produces a shareable route', () => {
  assert.equal(explorerLocation('https://michellescomputer.com/explore?folder=programs','paint'),'/explore?folder=programs&app=paint')
  assert.equal(explorerLocation('https://michellescomputer.com/explore?folder=programs&app=paint'),'/explore?folder=programs')
  assert.equal(explorerLocation('https://michellescomputer.com/explore?app=paint','terminal'),'/explore?app=terminal')
})

test('window launch feedback is consumed once and never reuses a stale click', () => {
  rememberWindowLaunch({left:10,top:20,width:80,height:60},100)
  assert.deepEqual(takeWindowLaunch(300),{x:50,y:50,at:100})
  assert.equal(takeWindowLaunch(400),null)
  rememberWindowLaunch({left:10,top:20,width:80,height:60},100)
  assert.equal(takeWindowLaunch(1400),null)
})

test('reading places round-trip and resolve to the correct progressively loaded chapter', () => {
  const items=new Map()
  const storage={getItem:key=>items.get(key)||null,setItem:(key,value)=>items.set(key,value),removeItem:key=>items.delete(key)}
  const place={chapterId:'chapter-6',chapterTitle:'Computer Vision',page:142}
  assert.equal(saveGuidePlace(storage,place),true)
  assert.deepEqual(readGuidePlace(storage),place)
  assert.equal(chapterFromGuideHash(guidePlaceHash(place),'chapter-1'),'chapter-6')
  assert.equal(chapterFromGuideHash('guide-preview-start','chapter-1'),'chapter-1')
  assert.equal(chapterFromGuideHash('guide-preview-chapter-2','chapter-1'),'chapter-2')
  assert.equal(chapterFromGuideHash('guide-glossary','chapter-1'),'glossary')
  items.set(guideProgressKey,JSON.stringify({...place,chapterId:'../../private'}))
  assert.equal(readGuidePlace(storage),null)
  assert.equal(saveGuidePlace(storage,{...place,page:999}),false)
})

test('corrupt or unavailable browser storage never blocks reading', () => {
  const corrupt={getItem:()=>'{bad json',setItem(){throw Error('quota')},removeItem(){}}
  assert.equal(readGuidePlace(corrupt),null)
  assert.equal(saveGuidePlace(corrupt,{chapterId:'introduction',chapterTitle:'Introduction',page:10}),false)
  const blocked={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){}}
  assert.equal(readGuidePlace(blocked),null)
})


test('motion choice works without storage and always respects a device reduction request', () => {
  const savedWindow=Object.getOwnPropertyDescriptor(globalThis,'window')
  const savedStorage=Object.getOwnPropertyDescriptor(globalThis,'localStorage')
  let deviceReduced=false
  Object.defineProperty(globalThis,'window',{configurable:true,value:{matchMedia:()=>({matches:deviceReduced}),dispatchEvent(){}}})
  Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}}})
  try {
    refreshMotionPreference();assert.equal(prefersLessMotion(),false)
    setLessMotion(true);assert.equal(prefersLessMotion(),true)
    setLessMotion(false);assert.equal(prefersLessMotion(),false)
    deviceReduced=true;assert.equal(prefersLessMotion(),true)
  } finally {
    refreshMotionPreference()
    if(savedWindow)Object.defineProperty(globalThis,'window',savedWindow);else delete globalThis.window
    if(savedStorage)Object.defineProperty(globalThis,'localStorage',savedStorage);else delete globalThis.localStorage
  }
})
