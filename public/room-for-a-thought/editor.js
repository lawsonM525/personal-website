'use strict';

const get = id => document.getElementById(id);
const canvas = get('scene');
const ctx = canvas.getContext('2d');
const { width, height } = canvas;
const message = get('message');
const palette = [
  ['🌙', 'Moon'], ['✨', 'Sparkles'], ['💌', 'Love letter'],
  ['🦋', 'Butterfly'], ['🍒', 'Cherries'], ['🌷', 'Tulip'],
  ['🎀', 'Bow'], ['🪐', 'Ringed planet'], ['👁️', 'Eye'], ['🕯️', 'Candle']
];
const emojiFont = '62px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
const messageFont = '32px system-ui, sans-serif';
const graphemes = typeof Intl.Segmenter === 'function'
  ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
const stickerImages = palette.map(([emoji]) => {
  const image = document.createElement('canvas');
  image.width = image.height = 92;
  const brush = image.getContext('2d');
  brush.font = emojiFont;
  brush.textAlign = 'center';
  brush.textBaseline = 'middle';
  brush.fillText(emoji, 46, 47);
  return image;
});
const art = new Image();
let nextId = 5;
let items = [
  { id: 1, kind: 'bubble', style: 'received', text: 'are you still awake?', x: 87, y: 152 },
  { id: 2, kind: 'bubble', style: 'sent', text: 'the moon is out ✨', x: 535, y: 255 },
  { id: 3, kind: 'sticker', sticker: 2, x: 401, y: 464 },
  { id: 4, kind: 'sticker', sticker: 3, x: 729, y: 104 }
];
let selected = null;
let drag = null;
const history = [];

function wrap(text) {
  ctx.font = messageFont;
  const lines = [];
  const fits = value => ctx.measureText(value).width <= 408;
  for (const paragraph of text.split(/\r?\n/)) {
    let line = '';
    for (const word of paragraph.trim().split(/\s+/u)) {
      const joined = line ? line + ' ' + word : word;
      if (fits(joined)) {
        line = joined;
        continue;
      }
      if (line) lines.push(line);
      line = '';
      const letters = graphemes ? Array.from(graphemes.segment(word), part => part.segment) : Array.from(word);
      for (const letter of letters) {
        if (line && !fits(line + letter)) {
          lines.push(line);
          line = '';
        }
        line += letter;
      }
    }
    lines.push(line);
  }
  return lines;
}

function bounds(item) {
  if (item.kind === 'sticker') return { w: 92, h: 92 };
  const lines = wrap(item.text);
  const w = Math.max(65, ...lines.map(line => ctx.measureText(line).width + 42));
  return { w: Math.ceil(w), h: 26 + lines.length * 40, lines };
}

function paint(brush, showSelection) {
  brush.fillStyle = '#20245a';
  brush.fillRect(0, 0, width, height);
  if (art.naturalWidth) {
    const scale = Math.max(width / art.naturalWidth, height / art.naturalHeight);
    const w = art.naturalWidth * scale;
    const h = art.naturalHeight * scale;
    brush.drawImage(art, (width - w) / 2, (height - h) / 2, w, h);
  }
  for (const item of items) {
    const { x, y } = item;
    const { w, h, lines } = bounds(item);
    brush.save();
    brush.shadowColor = '#11092f55';
    brush.shadowBlur = 11;
    brush.shadowOffsetY = 4;
    if (item.kind === 'sticker') {
      brush.drawImage(stickerImages[item.sticker], x, y);
    } else {
      const sent = item.style === 'sent';
      brush.fillStyle = sent ? '#0877ee' : '#e8e8ed';
      brush.beginPath();
      brush.roundRect(x, y, w, h, 25);
      brush.fill();
      brush.shadowColor = 'transparent';
      brush.save();
      brush.translate(sent ? x + w - 13 : x + 13, y + h - 13);
      brush.scale(sent ? 1 : -1, 1);
      brush.beginPath();
      brush.moveTo(-16, -7);
      brush.lineTo(11, -9);
      brush.quadraticCurveTo(10, 10, 22, 14);
      brush.quadraticCurveTo(6, 18, -4, 7);
      brush.closePath();
      brush.fill();
      brush.restore();
      brush.fillStyle = sent ? '#fff' : '#231f30';
      brush.font = messageFont;
      brush.direction = 'inherit';
      brush.textAlign = 'left';
      brush.textBaseline = 'middle';
      lines.forEach((line, i) => brush.fillText(line, x + 21, y + 33 + i * 40));
    }
    brush.restore();
  }
  const item = active();
  if (showSelection && item) {
    const { w, h } = bounds(item);
    brush.save();
    brush.strokeStyle = '#fff4a6';
    brush.lineWidth = 3;
    brush.setLineDash([8, 5]);
    brush.beginPath();
    brush.roundRect(item.x - 5, item.y - 5, w + 10, h + 10, 13);
    brush.stroke();
    brush.restore();
  }
}

function draw() { paint(ctx, true); }
function active() { return items.find(item => item.id === selected); }
function announce(text) { get('status').textContent = text; }

function refresh() {
  const layers = get('layers');
  const focused = layers.contains(document.activeElement);
  const focusedId = document.activeElement?.dataset.layer;
  const scroll = layers.scrollTop;
  layers.replaceChildren();
  for (const item of [...items].reverse()) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.layer = item.id;
    button.textContent = item.kind === 'bubble' ? item.text : palette[item.sticker].join(' ');
    button.title = button.textContent;
    button.setAttribute('aria-pressed', String(item.id === selected));
    button.addEventListener('click', () => select(item.id));
    layers.append(button);
  }
  if (!items.length) {
    const empty = document.createElement('p');
    empty.textContent = 'Add a message or sticker.';
    layers.append(empty);
  }
  if (focused) {
    const target = Array.from(layers.children).find(button => button.dataset.layer === focusedId);
    target?.focus({ preventScroll: true });
  }
  layers.scrollTop = scroll;
  const index = items.findIndex(item => item.id === selected);
  get('remove').disabled = index < 0;
  get('forward').disabled = index < 0 || index === items.length - 1;
  get('back').disabled = index <= 0;
  get('undo').disabled = history.length === 0;
  get('update').hidden = active()?.kind !== 'bubble';
  draw();
}

function select(id) {
  if (id !== selected) {
    selected = id;
    const item = active();
    if (item?.kind === 'bubble') {
      message.value = item.text;
      document.querySelector('input[name="style"][value="' + item.style + '"]').checked = true;
    }
    get('message-error').hidden = true;
  }
  refresh();
}

function snapshot() {
  return { items: items.map(item => ({ ...item })), selected };
}

function remember(state = snapshot()) {
  history.push(state);
  if (history.length > 50) history.shift();
}

function constrain(item) {
  const { w, h } = bounds(item);
  item.x = Math.max(12, Math.min(width - w - 12, item.x));
  item.y = Math.max(12, Math.min(height - h - 12, item.y));
}

function add(piece) {
  remember();
  const offset = (nextId % 8) * 19;
  const item = { ...piece, id: nextId++, x: width * .37 + offset, y: height * .39 + offset };
  constrain(item);
  items.push(item);
  select(item.id);
  announce(piece.kind === 'bubble' ? 'Message added.' : palette[piece.sticker][1] + ' added.');
}

function messageAction(update) {
  if (drag) return;
  const text = message.value.trim();
  const error = get('message-error');
  const problem = !text ? 'Enter a message first.' :
    wrap(text).length > 15 ? 'Use fewer lines or split your text into two messages.' : '';
  error.textContent = problem;
  error.hidden = !problem;
  if (problem) {
    message.focus();
    return;
  }
  const style = document.querySelector('input[name="style"]:checked').value;
  if (update) {
    const item = active();
    if (item?.kind !== 'bubble') return;
    remember();
    Object.assign(item, { text, style });
    constrain(item);
    refresh();
    announce('Message updated.');
  } else {
    add({ kind: 'bubble', text, style });
  }
}

function reorder(direction) {
  if (drag) return;
  const index = items.indexOf(active());
  const destination = index + direction;
  if (index < 0 || destination < 0 || destination >= items.length) return;
  remember();
  [items[index], items[destination]] = [items[destination], items[index]];
  refresh();
  announce(direction > 0 ? 'Layer moved forward.' : 'Layer moved backward.');
}

function remove() {
  if (drag || !active()) return;
  remember();
  items = items.filter(item => item.id !== selected);
  select(null);
  announce('Layer deleted.');
}

function position(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * width / rect.width,
    y: (event.clientY - rect.top) * height / rect.height
  };
}

canvas.addEventListener('pointerdown', event => {
  if (drag || event.button !== 0) return;
  const { x, y } = position(event);
  const item = items.findLast(layer => {
    const { w, h } = bounds(layer);
    return x >= layer.x && x <= layer.x + w && y >= layer.y && y <= layer.y + h;
  });
  canvas.focus({ preventScroll: true });
  const state = snapshot();
  select(item?.id ?? null);
  if (!item) return;
  drag = { id: event.pointerId, dx: x - item.x, dy: y - item.y, item, state, x: item.x, y: item.y };
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener('pointermove', event => {
  if (event.pointerId !== drag?.id) return;
  const { x, y } = position(event);
  drag.item.x = x - drag.dx;
  drag.item.y = y - drag.dy;
  constrain(drag.item);
  draw();
});

function finishDrag(event) {
  if (event.pointerId !== drag?.id) return;
  const { item, state, x, y } = drag;
  drag = null;
  if (event.type === 'pointerup') {
    if (item.x !== x || item.y !== y) remember(state);
  } else {
    Object.assign(item, { x, y });
  }
  refresh();
}
for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  canvas.addEventListener(type, finishDrag);
}

canvas.addEventListener('keydown', event => {
  const item = active();
  if (!item || drag) return;
  const offsets = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
  if (Object.hasOwn(offsets, event.key)) {
    event.preventDefault();
    remember();
    const [dx, dy] = offsets[event.key];
    const step = event.shiftKey ? 20 : 5;
    item.x += dx * step;
    item.y += dy * step;
    constrain(item);
    refresh();
  } else if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault();
    remove();
  }
});

for (const [index, [emoji, name]] of palette.entries()) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = emoji;
  button.title = name;
  button.setAttribute('aria-label', 'Add ' + name.toLowerCase() + ' sticker');
  button.addEventListener('click', () => { if (!drag) add({ kind: 'sticker', sticker: index }); });
  get('stickers').append(button);
}
get('add').addEventListener('click', () => messageAction(false));
get('update').addEventListener('click', () => messageAction(true));
message.addEventListener('input', () => { get('message-error').hidden = true; });
get('forward').addEventListener('click', () => reorder(1));
get('back').addEventListener('click', () => reorder(-1));
get('remove').addEventListener('click', remove);
get('undo').addEventListener('click', () => {
  if (drag || !history.length) return;
  const state = history.pop();
  items = state.items;
  selected = null;
  select(state.selected);
  announce('Change undone.');
});

get('download').addEventListener('click', () => {
  const format = get('format').value;
  const output = document.createElement('canvas');
  output.width = width * 2;
  output.height = height * 2;
  const brush = output.getContext('2d');
  brush.scale(2, 2);
  paint(brush, false);
  output.toBlob(blob => {
    if (!blob) {
      announce('Could not create the image. Try downloading again.');
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'room-for-a-thought.' + (format === 'jpeg' ? 'jpg' : 'png');
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    announce(format.toUpperCase() + ' download started.');
  }, 'image/' + format, 0.94);
});

get('download').disabled = true;
art.addEventListener('load', () => {
  draw();
  get('download').disabled = false;
});
art.addEventListener('error', () => {
  announce('The room illustration could not load.');
  get('download').disabled = false;
});
art.src = './night-room.jpg';
refresh();
