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
  assert.match(html, /Center-cropped to fill the canvas, never stretched/);
  assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|localStorage|sessionStorage/);
});
test('local image blobs are allowed by the game-specific CSP without permitting remote uploads', () => {
  const config = readFileSync('next.config.mjs', 'utf8');
  assert.match(config, /img-src 'self' blob:/);
  assert.match(config, /default-src 'none'/);
});
test('standalone editor mirrors Explorer window chrome and uses real controls', () => {
  const explore = readFileSync('components/explore/explore.module.css', 'utf8');
  for (const token of ['linear-gradient(90deg,#000080,#1084d0)', '#d4d0c8', '#14293e', 'sserife,Tahoma,Arial,sans-serif']) {
    assert.ok(explore.includes(token) && css.includes(token), token);
  }
  assert.match(html, /id="room-window"/);
  assert.match(html, /href="\/explore" aria-label="Close Room for a Thought"/);
  assert.match(js, /minimizeWindow.addEventListener\('click', toggleRoomVisibility\)/);
  assert.match(js, /maximizeWindow.addEventListener\('click', toggleRoomMaximized\)/);
  assert.match(readFileSync('next.config.mjs', 'utf8'), /font-src 'self'/);
});
test('canvas ratios keep the original size and share preview/export dimensions', () => {
  for (const [ratio, width, height] of [['4:3',960,720],['16:9',1280,720],['1:1',960,960],['4:5',768,960],['9:16',720,1280]]) {
    assert.ok(html.includes('value="' + ratio + '"'), ratio);
    assert.ok(js.includes("'" + ratio + "': [" + width + ", " + height + "]"), ratio);
    assert.equal(width / height, Number(ratio.split(':')[0]) / Number(ratio.split(':')[1]));
  }
  assert.match(js, /output.width = width \* 2/);
  assert.match(js, /output.height = height \* 2/);
  assert.match(js, /paint\(brush, false\)/);
  assert.match(js, /setCanvasRatio\(state.ratio\)/);
});
