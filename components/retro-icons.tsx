import { forwardRef, type SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string }

// Original 16px toolbar artwork. Each letter is one square pixel in the palette.
// Content icons reuse the illustrated desktop/Explorer artwork below.
const palette: Record<string, string> = {
  k: "#25334a", w: "#fffbed", s: "#b9c5ce", d: "#718296", b: "#2456c4",
  c: "#97ccef", y: "#efcd76", o: "#d39a4a", r: "#e26561", p: "#f3a7c8",
  g: "#4c936c", l: "#a4d7a1", i: "currentColor",
}

const pixels = {
  clock: [".....kkkkkk.....", "...kkwwwwwwkk...", "..kwwwwwwwwwwk..", ".kwwwwwkwwwwwwk.", ".kwwwwwkwwwwwwk.", "kwwwwwwkwwwwwwwk", "kwwwwwwkwwwwwwwk", "kwwwwwwkkkkwwwwk", "kwwwwwwwwwwwwwwk", "kwwwwwwwwwwwwwwk", ".kwwwwwwwwwwwwk.", ".kwwwwwwwwwwwwk.", "..kwwwwwwwwwwk..", "...kkwwwwwwkk...", ".....kkkkkk....."],
  restart: [".....bbbbbb.....", "...bbccccccbb...", "..bccccccccccb..", ".bcccbbbbbbcccb.", ".bccb......bccb.", "bbccb......bccb.", "bccccb......bcb.", "bbbbbb......bcb.", "............bcb.", "..b.........bcb.", "..bcb......bccb.", "..bccbbbbbbccb..", "...bccccccccb...", "....bbbbbbbb...."],
  arrow: ["........i.......", "........ii......", "........iii.....", ".iiiiiiiiiii....", ".iiiiiiiiiiii...", ".iiiiiiiiiii....", "........iii.....", "........ii......", "........i......."],
  external: ["......iiiiiiii..", ".........iiiii..", "........iiiiii..", ".......iii.iii..", "......iii..iii..", ".....iii...iii..", "....iii....iii..", "...iii..........", "..iii...........", "...i............"],
  chevron: [".....ii.........", "......ii........", ".......ii.......", "........ii......", ".........ii.....", "........ii......", ".......ii.......", "......ii........", ".....ii........."],
  close: ["..ii......ii....", "..iii....iii....", "...iii..iii.....", "....iiiiii......", ".....iiii.......", "....iiiiii......", "...iii..iii.....", "..iii....iii....", "..ii......ii...."],
  minus: ["................", "................", "................", "................", "..iiiiiiiiiiii..", "..iiiiiiiiiiii.."],
  plus: [".......ii.......", ".......ii.......", ".......ii.......", ".......ii.......", "..iiiiiiiiiiii..", "..iiiiiiiiiiii..", ".......ii.......", ".......ii.......", ".......ii.......", ".......ii......."],
  square: ["..iiiiiiiiiiii..", "..iiiiiiiiiiii..", "..ii........ii..", "..ii........ii..", "..ii........ii..", "..ii........ii..", "..ii........ii..", "..ii........ii..", "..ii........ii..", "..iiiiiiiiiiii.."],
  check: [".............gg.", "............ggg.", "...........ggg..", "..........ggg...", "..gg.....ggg....", "..ggg...ggg.....", "...ggg.ggg......", "....ggggg.......", ".....ggg........", "......g........."],
  dot: ["................", "................", "................", "......iiii......", ".....iiiiii.....", ".....iiiiii.....", "......iiii......"],
  more: ["................", "................", "................", "..ii...ii...ii..", "..ii...ii...ii.."],
  heart: ["..kkkk..kkkk....", ".kiwwwkkiwwwik..", "kiwwiiiwwwiiiik.", "kiwiiiiiwiiiiik.", "kiiiiiiiiiiiiik.", ".kiiiiiiiiiiik..", "..kiiiiiiiiik...", "...kiiiiiiik....", "....kiiiiik.....", ".....kiiik......", "......kik.......", ".......k........"],
  star: [".......k........", "......kyk.......", "......kyk.......", ".....kyyyk......", ".kkkkkyyykkkkk..", "..kyyyyyyyyyk...", "...kyyyyyyyk....", "....kyyyyyk.....", "...kyyyyyyyk....", "...kyykkyyyk....", "..kykk..kkyyk...", "..kk......kk...."],
  flag: ["...kk...........", "...krkkkk.......", "...krrrrrkk.....", "...krrrrrrrk....", "...krrrrrkk.....", "...krkkkk.......", "...kk...........", "...kk...........", "...kk...........", ".kkkkkk.........", "kssssssk........", ".kkkkkk........."],
  shield: [".......kk.......", ".....kkbbkk.....", "..kkkbbccbbkkk..", "..kbccccccccbk..", "..kbcccggcccbk..", "..kbccgggcccbk..", "..kbggggccccbk..", "...kbggccccbk...", "...kbccccccbk...", "....kbccccbk....", ".....kbbbbk.....", "......kkkk......"],
  copy: ["....kkkkkkkkkk..", "....kwwwwwwwwk..", "....kwwbbbbwwk..", ".kkkkkkkkkwwwk..", ".kwwwwwwwkwwwk..", ".kwwbbbwwkwwwk..", ".kwwwwwwwkwwwk..", ".kwwbbbwwkwwwk..", ".kwwwwwwwkkkkk..", ".kwwwwwwwk......", ".kkkkkkkkk......"],
  play: ["...kk...........", "...klkk.........", "...kgllkk.......", "...kgglllkk.....", "...kgggllllkk...", "...kgggllllllk..", "...kgggllllkk...", "...kgglllkk.....", "...kgllkk.......", "...klkk.........", "...kk..........."],
  camera: [".....kkkkkk.....", "....kssssssk....", ".kkkkkkkkkkkkkk.", ".kwwssssssssssk.", ".kwsskkkkssssk.", ".ksskkccckksssk.", ".ksskccbccksssk.", ".ksskccbccksssk.", ".ksskkccckksssk.", ".ksssskkkkssssk.", ".kkkkkkkkkkkkkk."],
  bookmark: ["...kkkkkkkkkk...", "...kbwwwwwwbk...", "...kbwwwwwwbk...", "...kbwwwwwwbk...", "...kbwwwwwwbk...", "...kbwwwwwwbk...", "...kbbbbbbbbk...", "...kbbbkkbbbk...", "...kbbk..kbbk...", "...kbk....kbk...", "...kk......kk..."],
  trash: ["......kkkk......", ".....kssssk.....", "..kkkkkkkkkkkk..", "..kwwwwwwwwwwk..", "...kkkkkkkkkk...", "...kwsssssssk...", "...kwsksksksk...", "...kwsksksksk...", "...kwsksksksk...", "...kwsksksksk...", "...kssssssssk..", "....kkkkkkkk...."],
  eraser: ["........kkkk....", ".......krpprk...", "......krpppprk..", ".....krpppprrk..", "....krpppprrk...", "...kwwppprrk....", "..kwwwwprrk.....", ".kwwwwwwrk......", "..kwwwwwwk......", "...kkkkkk......."],
  sliders: ["...kk...........", ".sskwksssssssss.", "...kk...........", "................", ".........kk.....", ".sssssssskwksss.", ".........kk.....", "................", ".....kk.........", ".sssskwksssssss.", ".....kk........."],
  eye: [".....kkkkkk.....", "...kkwwwwwwkk...", "..kwwwkkkkwwwk..", ".kwwwkbccbkwwwk.", "kwwwwkbbcbkwwwwk", ".kwwwkbbbbkwwwk.", "..kwwwkkkkwwwk..", "...kkwwwwwwkk...", ".....kkkkkk....."],
  sun: [".......yy.......", "...y...yy...y...", "....y......y....", "......kkkk......", ".....kyyyyk.....", ".yy.kyyyyyyk.yy.", ".yy.kyyyyyyk.yy.", ".....kyyyyk.....", "......kkkk......", "....y......y....", "...y...yy...y...", ".......yy......."],
  moon: ["......kkkk......", "....kksswk......", "...kssswk.......", "..kssswk........", "..kssswk........", ".ksssswk........", ".ksssswk........", ".kssssswkkkk....", "..ksssssswwwk...", "...ksssswwwk....", "....kkkkkkk....."],
  person: [".....kkkk.......", "....koyyok......", "....kyyyyok.....", "....kyyyook.....", ".....kook.......", "....kkkkkk......", "...kbccccbk.....", "..kbccccccbk....", "..kbccccccbk....", "..kbbbbbbbbk....", "..kkkkkkkkkk...."],
  info: [".....kkkkkk.....", "...kkcccccckk...", "..kccccbbcccck..", ".kcccccbbccccck.", ".kcccccccccccck.", "kcccccbbbcccccck", "kccccccbbcccccck", "kccccccbbcccccck", "kcccccbbbbccccck", ".kcccccccccccck.", "..kcccccccccck..", "...kkcccccckk...", ".....kkkkkk....."],
  list: [".bb..kkkkkkkkkk.", ".bb..kkkkkkkkkk.", "................", ".rr..kkkkkkkkkk.", ".rr..kkkkkkkkkk.", "................", ".gg..kkkkkkkkkk.", ".gg..kkkkkkkkkk."],
  grip: [".....ii..ii.....", ".....ii..ii.....", "................", ".....ii..ii.....", ".....ii..ii.....", "................", ".....ii..ii.....", ".....ii..ii....."],
  mic: [".....kkkk.......", "....kssssk.....", "....kwsssk......", "....kwsssk......", "....kwsssk......", "..k.kssssk.k...", "..k..kkkk..k....", "..kssssssssk...", "...kkkkkkkk.....", "......kk........", "....kkkkkk......"],
  rainbow: [".....rrrrrr.....", "...rroooooorr...", "..rooyyyyyyoor..", ".royyggggggyyor.", ".roygbbbbbbgyor.", "roygbccccccbgyor", "roygbc....cbgyor", "roygbc....cbgyor"],
  video: [".kkkkkkkkkk.....", ".kbbbbbbbbk..kk.", ".kbccccccbk.kck.", ".kbccccccbkkcck.", ".kbccccccbkccck.", ".kbccccccbkkcck.", ".kbccccccbk.kck.", ".kbbbbbbbbk..kk.", ".kkkkkkkkkk....."],
  chart: ["k...............", "k.............g.", "k............gg.", "k..........ggg..", "k.........gg....", "k.....gg.gg.....", "k....ggggg......", "k...gg.gg.......", "k..gg...........", "k.gg............", "kkkkkkkkkkkkkkk."],
  restore: [".....iiiiiiiii..", ".....ii.....ii..", "..iiiiiiiii.ii..", "..ii.....ii.ii..", "..ii.....iiiii..", "..ii.....ii.....", "..ii.....ii.....", "..iiiiiiiii....."],
  spray: ["......kkkk......", "......krwk..b.b.", "......kkkk.b.b..", ".....kssssk...b.", "....kwsssssk....", "....kwbbbbsk....", "....kwbbbbsk....", "....kwbbbbsk....", "....kwsssssk....", ".....kkkkkk....."],
  flip: [".......i........", ".......i........", "..b....i....g...", "..bb...i...gg...", "..bcb..i..glg...", "..bccb.i.gllg...", "..bbbb.i.gggg...", ".......i........", ".......i........"],
  grid: [".kkkk.kkkk.kkkk.", ".kbck.kbck.kbck.", ".kkkk.kkkk.kkkk.", "................", ".kkkk.kkkk.kkkk.", ".kbck.kbck.kbck.", ".kkkk.kkkk.kkkk.", "................", ".kkkk.kkkk.kkkk.", ".kbck.kbck.kbck.", ".kkkk.kkkk.kkkk."],
} as const

type PixelName = keyof typeof pixels

function pixelPaths(rows: readonly string[]) {
  const paths: Record<string, string> = {}
  const offsetY = Math.floor((16 - rows.length) / 2)
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = row[x]
      if (!palette[color]) continue
      const start = x
      while (row[x + 1] === color) x++
      paths[color] = (paths[color] || "") + `M${start} ${y + offsetY}h${x - start + 1}v1H${start}z`
    }
  })
  return Object.entries(paths).map(([color, d]) => ({ fill: palette[color], d }))
}

const artwork = Object.fromEntries(Object.entries(pixels).map(([name, rows]) => [name, pixelPaths(rows)]))

function pixel(name: PixelName, transform?: string) {
  const PixelIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, style, strokeWidth: _strokeWidth, ...props }, ref) => {
    return <svg {...props} ref={ref} width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="none" aria-hidden={props["aria-label"] ? undefined : true} focusable="false" data-retro-icon={name} style={{ flexShrink: 0, ...style }} shapeRendering="crispEdges">
      <g transform={transform}>{artwork[name].map(path => <path key={path.fill} {...path} />)}</g>
    </svg>
  })
  PixelIcon.displayName = `RetroPixel(${name})`
  return PixelIcon
}

function illustration(src: string, name: string, badge?: "+" | "−") {
  const IllustratedIcon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, style, strokeWidth: _strokeWidth, ...props }, ref) => {
    return <svg {...props} ref={ref} width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="none" aria-hidden={props["aria-label"] ? undefined : true} focusable="false" data-retro-icon={name} style={{ flexShrink: 0, ...style }}>
      <image href={src} width="64" height="64" style={{ imageRendering: "pixelated" }} />
      {badge && <g shapeRendering="crispEdges"><path d="M38 38h26v26H38z" fill="#25334a" /><path d="M41 41h20v20H41z" fill="#fffbed" /><path d="M44 49h14v4H44z" fill="#2456c4" />{badge === "+" && <path d="M49 44h4v14h-4z" fill="#2456c4" />}</g>}
    </svg>
  })
  IllustratedIcon.displayName = `RetroIllustration(${name})`
  return IllustratedIcon
}

export const FileText = illustration("/explorer/icons/paper-v1.webp", "document")
export const FolderOpen = illustration("/explorer/icons/folder-v1.webp", "folder")
export const Mail = illustration("/explorer/icons/penpals-v1.webp", "mail")
export const Grid2X2 = illustration("/interface/icons/desktop-v1.webp", "desktop")
export const Home = Grid2X2
export const BookOpen = illustration("/interface/icons/book-v1.webp", "book")
export const Book = illustration("/explorer/icons/magazine-v1.webp", "booklet")
export const Briefcase = illustration("/homepage/projects-icon-v2.webp", "projects")
export const GraduationCap = BookOpen
export const Paintbrush = illustration("/explorer/icons/paint-v1.webp", "paint")
export const Palette = Paintbrush
export const FileImage = illustration("/explorer/icons/paper-v1.webp", "picture")
export const Search = illustration("/interface/icons/search-v1.webp", "search")
export const ZoomIn = illustration("/interface/icons/search-v1.webp", "zoom-in", "+")
export const ZoomOut = illustration("/interface/icons/search-v1.webp", "zoom-out", "−")
export const Volume2 = illustration("/interface/icons/sound-v1.webp", "sound")
export const VolumeX = illustration("/interface/icons/muted-v1.webp", "muted")
export const Menu = illustration("/interface/icons/menu-v1.webp", "menu")
export const PanelLeft = Menu
export const Grid = pixel("grid")
export const Clock3 = pixel("clock")
export const RotateCcw = pixel("restart")
export const Undo2 = RotateCcw
export const Redo2 = pixel("restart", "translate(16 0) scale(-1 1)")
export const Repeat2 = Redo2
export const ArrowRight = pixel("arrow")
export const ArrowLeft = pixel("arrow", "translate(16 16) rotate(180)")
export const ArrowDown = pixel("arrow", "translate(16 0) rotate(90)")
export const ArrowUp = pixel("arrow", "translate(0 16) rotate(-90)")
export const ArrowUpRight = pixel("external")
export const ExternalLink = ArrowUpRight
export const ChevronRight = pixel("chevron")
export const ChevronLeft = pixel("chevron", "translate(16 16) rotate(180)")
export const ChevronDown = pixel("chevron", "translate(16 0) rotate(90)")
export const ChevronUp = pixel("chevron", "translate(0 16) rotate(-90)")
export const X = pixel("close")
export const Minus = pixel("minus")
export const Plus = pixel("plus")
export const Square = pixel("square")
export const Maximize2 = Square
export const Minimize2 = pixel("restore")
export const Check = pixel("check")
export const Dot = pixel("dot")
export const Circle = Dot
export const MoreHorizontal = pixel("more")
export const Heart = pixel("heart")
export const Sparkles = pixel("star")
export const WandSparkles = Sparkles
export const Sticker = Sparkles
export const MessageSquare = illustration("/interface/icons/discussion-v1.webp", "discussion")
export const MessageCircle = MessageSquare
export const MessagesSquare = MessageSquare
export const Flag = pixel("flag")
export const ShieldCheck = pixel("shield")
export const Download = illustration("/interface/icons/save-v1.webp", "save")
export const Send = Mail
export const Copy = pixel("copy")
export const ClipboardCopy = Copy
export const Play = pixel("play")
export const Instagram = pixel("camera")
export const Github = illustration("/explorer/icons/terminal-v1.webp", "code")
export const Linkedin = Briefcase
export const Bookmark = pixel("bookmark")
export const Trash2 = pixel("trash")
export const Eraser = pixel("eraser")
export const SlidersHorizontal = pixel("sliders")
export const FlipHorizontal2 = pixel("flip")
export const Eye = pixel("eye")
export const Sun = pixel("sun")
export const Moon = pixel("moon")
export const Settings = illustration("/interface/icons/settings-v1.webp", "settings")
export const User = pixel("person")
export const Info = pixel("info")
export const List = pixel("list")
export const GripVertical = pixel("grip")
export const Mic = pixel("mic")
export const AudioWaveform = Volume2
export const Rainbow = pixel("rainbow")
export const SprayCan = pixel("spray")
export const Video = pixel("video")
export const Clapperboard = Video
export const TrendingUp = pixel("chart")
