// Render the approved page artwork into a static sharing image. Run on the
// design workstation with Georgia/Tahoma installed; no font files are shipped.
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const root = new URL('../', import.meta.url)
const asset = async (path, width, height) => {
  const input = await readFile(new URL(path, root))
  const data = await sharp(input).resize(width, height, { fit: 'fill', kernel: 'nearest' }).png().toBuffer()
  return `data:image/png;base64,${data.toString('base64')}`
}
const [denim, eyes, folder, handshake] = await Promise.all([
  asset('public/homepage/denim-wallpaper-d.webp', 900, 900),
  asset('public/feedback/fresh-eyes.webp', 300, 200),
  asset('public/explorer/icons/folder-v1.webp', 64, 64),
  asset('public/feedback/handshake.svg', 43, 34),
])
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
 <pattern id="denim" width="900" height="900" patternUnits="userSpaceOnUse"><image href="${denim}" width="900" height="900"/></pattern>
 <linearGradient id="bar"><stop stop-color="#0044d6"/><stop offset="1" stop-color="#055be3"/></linearGradient>
 <linearGradient id="yellow" x2="0" y2="1"><stop stop-color="#fffec2"/><stop offset="1" stop-color="#fff15b"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#denim)"/>
<rect x="36" y="37" width="1144" height="574" fill="#071d36" opacity=".7"/>
<rect x="28" y="28" width="1144" height="574" fill="#f0efe3" stroke="#172e50" stroke-width="2"/>
<path d="M30 600V30h1140" fill="none" stroke="#fffef6" stroke-width="3"/>
<rect x="36" y="36" width="1128" height="49" fill="url(#bar)"/>
<image href="${folder}" x="48" y="45" width="31" height="31"/>
<text x="93" y="69" fill="#fffef6" font-family="Tahoma,Arial,sans-serif" font-weight="bold" font-size="26">Feedback exchange</text>
${[1048,1085,1122].map(x=>`<rect x="${x}" y="45" width="30" height="30" fill="#eeeee6" stroke="#142d4c" stroke-width="2"/><path d="M${x+2} 73V47h26" fill="none" stroke="#fff" stroke-width="2"/>`).join('')}
<path d="M1056 68h14 M1093 54h14v13h-14z M1130 54l14 14m0-14l-14 14" fill="none" stroke="#172e50" stroke-width="3"/>
<rect x="36" y="85" width="1128" height="459" fill="#faf7ed"/>
<image href="${eyes}" x="66" y="158" width="270" height="180"/>
<g fill="#080b36" font-family="Georgia,serif" font-weight="bold" font-size="76" letter-spacing="-3">
 <text x="362" y="204">Good projects</text>
 <text x="362" y="285">need fresh eyes.</text>
</g>
<g fill="#15233d" font-family="Tahoma,Arial,sans-serif" font-size="26">
 <text x="365" y="347">Make your ideas real.</text>
 <text x="365" y="384">Get feedback &amp; help someone make</text>
 <text x="365" y="420">their project better.</text>
</g>
<rect x="370" y="456" width="449" height="65" fill="#173254" opacity=".4"/>
<rect x="364" y="450" width="449" height="65" fill="url(#yellow)" stroke="#293b66" stroke-width="2"/>
<path d="M367 512v-59h443" fill="none" stroke="#ffffe6" stroke-width="3"/>
<path d="M810 453v59H367" fill="none" stroke="#b9a73c" stroke-width="3"/>
<image href="${folder}" x="380" y="460" width="43" height="43"/>
<text x="438" y="493" fill="#080b36" font-family="Tahoma,Arial,sans-serif" font-size="28" font-weight="bold">Submit your project</text>
<path d="M760 493l16-16m-14 0h14v14" fill="none" stroke="#080b36" stroke-width="4"/>
<rect x="36" y="544" width="1128" height="50" fill="#e5e6df"/>
<path d="M36 544h1128" stroke="#8394a2"/>
<image href="${handshake}" x="50" y="553" width="43" height="34"/>
<text x="105" y="577" fill="#172e50" font-family="Tahoma,Arial,sans-serif" font-size="21">Be kind. Be specific. Try the thing.</text>
<path d="M812 554v30" stroke="#8e9da7"/>
<text x="834" y="577" fill="#17385d" font-family="Tahoma,Arial,sans-serif" font-size="22">michellescomputer.com</text>
</svg>`
const output = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
await writeFile(new URL('public/feedback/feedback-exchange-social-v1.png', root), output)
console.log(`Feedback social card: 1200 × 630, ${Math.round(output.length / 1024)} KB`)
