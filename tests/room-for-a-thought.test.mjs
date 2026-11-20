import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync('public/room-for-a-thought/style.css', 'utf8');
const js = readFileSync('public/room-for-a-thought/editor.js', 'utf8');
const html = readFileSync('public/room-for-a-thought/index.html', 'utf8');
test('illustration maker uses the existing desktop wallpaper, not an approximation', () => {
  assert.match(css, /\/homepage\/denim-wallpaper-d\.webp/);
  assert.match(css, /background-size: 700px 700px/);
});
test('local image replacement retains the original illustration and rejects stale decodes', () => {
  assert.match(js, /const originalArt = art/);
  assert.match(js, /await image.decode\(\)/);
  assert.match(js, /request !== backgroundRequest/);
  assert.match(js, /URL.revokeObjectURL\(url\)/);
  assert.match(js, /art = originalArt/);
  assert.match(html, /type="file" accept="image\/jpeg,image\/png,image\/webp"/);
  assert.match(html, /Center-cropped to fill the 4:3 canvas, never stretched/);
  assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
});
test('local image blobs are allowed by the game-specific CSP without permitting remote uploads', () => {
  const config = readFileSync('next.config.mjs', 'utf8');
  assert.match(config, /img-src 'self' blob:/);
  assert.match(config, /default-src 'none'/);
});
