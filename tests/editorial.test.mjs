import test from 'node:test'
import assert from 'node:assert/strict'
import {authorPath, articleDate, articleSearchTitle} from '../lib/editorial.ts'

test('guest authors never inherit Michelle’s profile URL', () => {
  assert.equal(authorPath({name:'Leesha Mogha',slug:'leesha-mogha'}),'/learn/authors/leesha-mogha')
  assert.equal(authorPath({name:'Guest without profile'}),undefined)
  assert.equal(authorPath({name:'Michelle Lawson'}),'/about')
})
test('article dates use a stable timezone and later editorial titles take precedence', () => {
  assert.equal(articleDate('2026-10-27T00:00:00Z','short'),'Oct 26, 2026')
  assert.equal(articleSearchTitle('ai-alignment-and-ai-safety','Visible headline','AI Alignment and AI Safety: The need to be cautious with AI'),'AI Alignment and AI Safety: Why They Matter')
  assert.equal(articleSearchTitle('ai-alignment-and-ai-safety','Visible headline','A new editor-approved title'),'A new editor-approved title')
  assert.equal(articleSearchTitle('another-article','Visible headline'),'Visible headline')
})
