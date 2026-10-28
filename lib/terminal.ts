export type TerminalApp = "paint" | "minesweeper" | "terminal"
type Category = "learn" | "play" | "explore" | "basics"
type Command = { name: string; usage: string; description: string; category: Category }
type Quiz = { order: number[]; at: number; score: number }
export type TerminalState = {
  commands: string[]
  learned: string[]
  quiz: Quiz | null
  guess: { target: number; tries: number } | null
  examples: [number, number][]
}
export type TerminalResult = {
  state: TerminalState
  lines: string[]
  clear?: boolean
  feedback?: "correct" | "incorrect"
  action?: { type: "app"; app: TerminalApp } | { type: "page"; href: string }
}

export const terminalCommands: Command[] = [
  { name: "help", usage: "help [category or command]", description: "browse commands or get an example", category: "basics" },
  { name: "tutorial", usage: "tutorial", description: "a first trip through the terminal", category: "learn" },
  { name: "learn", usage: "learn [topic]", description: "short lessons on computers and AI", category: "learn" },
  { name: "quiz", usage: "quiz [ai|computers|stop]", description: "five questions, with explanations", category: "learn" },
  { name: "answer", usage: "answer <a|b|c>", description: "answer the current quiz question", category: "learn" },
  { name: "binary", usage: "binary <text>", description: "encode your text as UTF-8 bits", category: "learn" },
  { name: "decode", usage: "decode <bits>", description: "turn UTF-8 bits back into text", category: "learn" },
  { name: "tokens", usage: "tokens <text>", description: "look inside a teaching tokenizer", category: "learn" },
  { name: "predict", usage: "predict [text]", description: "sample a word from a tiny language model", category: "learn" },
  { name: "train", usage: "train [add x y|predict x|reset]", description: "fit a model, then change its examples", category: "learn" },
  { name: "sources", usage: "sources", description: "the references behind these lessons", category: "learn" },
  { name: "progress", usage: "progress", description: "see topics explored in this session", category: "learn" },
  { name: "ls", usage: "ls [programs|pages]", description: "list the things you can open", category: "explore" },
  { name: "pwd", usage: "pwd", description: "show your virtual location", category: "explore" },
  { name: "tree", usage: "tree", description: "map the computer's programs and pages", category: "explore" },
  { name: "cat", usage: "cat <readme|cheatsheet|about|corpus>", description: "read a small text file", category: "explore" },
  { name: "open", usage: "open <name>", description: "open a program or a page", category: "explore" },
  { name: "tour", usage: "tour", description: "a few places worth exploring", category: "explore" },
  { name: "inspect", usage: "inspect", description: "how this terminal itself works", category: "explore" },
  { name: "guess", usage: "guess [1-20|stop]", description: "find the secret number", category: "play" },
  { name: "roll", usage: "roll [sides]", description: "roll a die with 2 to 100 sides", category: "play" },
  { name: "flip", usage: "flip", description: "flip a coin", category: "play" },
  { name: "fortune", usage: "fortune", description: "open a tiny fortune cookie", category: "play" },
  { name: "joke", usage: "joke", description: "a deeply questionable computer joke", category: "play" },
  { name: "surprise", usage: "surprise", description: "an unexpected little discovery", category: "play" },
  { name: "whoami", usage: "whoami", description: "show the current user", category: "basics" },
  { name: "date", usage: "date", description: "show your local date and time", category: "basics" },
  { name: "echo", usage: "echo <text>", description: "print your own words", category: "basics" },
  { name: "history", usage: "history", description: "recall commands from this session", category: "basics" },
  { name: "clear", usage: "clear", description: "clear the screen", category: "basics" },
]

export const terminalSources = {
  terminal: { title: "MDN: Command line crash course", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line" },
  web: { title: "MDN: How the web works", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works" },
  binary: { title: "MDN: Encoding API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API" },
  ai: { title: "Google: Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
  llm: { title: "Hugging Face: LLM Course", url: "https://huggingface.co/learn/llm-course/chapter1/1" },
  tokens: { title: "Hugging Face: Tokenization algorithms", url: "https://huggingface.co/docs/transformers/en/tokenizer_summary" },
  training: { title: "Google: Linear regression", url: "https://developers.google.com/machine-learning/crash-course/linear-regression" },
  overfitting: { title: "Google: Overfitting", url: "https://developers.google.com/machine-learning/crash-course/overfitting/overfitting" },
  hallucinations: { title: "NIST: Generative AI risk profile", url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence" },
} as const

type Lesson = { title: string; lines: string[]; try: string; source: keyof typeof terminalSources }
export const terminalLessons: Record<string, Lesson> = {
  terminal: { title: "What is a terminal?", lines: ["A terminal is a text interface. You type a command; a program interprets it and returns a result.", "In: echo hello", "Out: hello", "In a regular computer terminal, a shell interprets commands. Here, a small browser program handles the commands listed in help."], try: "echo hello", source: "terminal" },
  binary: { title: "How does a computer store text?", lines: ["A bit has two possible values: 0 or 1. Eight bits make a byte.", "Text needs an encoding: rules that connect characters to numbers. This demo uses UTF-8.", "The letter A takes one UTF-8 byte: 01000001. Many other characters need several bytes."], try: "binary A", source: "binary" },
  web: { title: "What happens when you open a website?", lines: ["Your browser finds the server's address, makes a request, and receives a response.", "HTML describes the page, CSS styles it, and JavaScript can make it respond to you.", "This terminal's commands are JavaScript running in your browser."], try: "inspect", source: "web" },
  algorithm: { title: "What is an algorithm?", lines: ["An algorithm is a set of steps for solving a problem.", "To find a name in an alphabetized list: check the middle, keep the half that could contain it, and repeat. That's binary search.", "The guess game lets you try a similar strategy: start at 10, then use the higher/lower hints to halve the possibilities."], try: "guess", source: "ai" },
  ai: { title: "Where does machine learning fit into AI?", lines: ["AI is a broad field. Machine learning is one approach: fit a model to examples so it can make predictions on new inputs.", "The examples matter. The prediction can be wrong, especially when the new input differs from what the model learned from."], try: "train", source: "ai" },
  llm: { title: "How does a language model generate text?", lines: ["A language model assigns probabilities to possible next tokens using the preceding context.", "During generation, a token is selected, added to the context, and the process repeats.", "Our predict demo uses only the previous word and a few sentences. An LLM uses a much richer learned model."], try: "predict the", source: "llm" },
  tokens: { title: "Why isn't a token always a word?", lines: ["A tokenizer turns text into pieces and maps those pieces to numeric IDs. A piece might be a word, part of a word, punctuation, or bytes.", "The split depends on the tokenizer's vocabulary and rules.", "Our tokens command uses a deliberately small teaching vocabulary. Its counts are not counts for any commercial model."], try: "tokens unhappy computers!", source: "tokens" },
  training: { title: "What does a model learn?", lines: ["In linear regression, a model fits a line to numeric examples. Its adjustable numbers are the slope and intercept.", "Training chooses those parameters to reduce prediction error. Inference uses the fitted line on a new input.", "Our train demo fits the line directly; it doesn't train a neural network."], try: "train add 4 2", source: "training" },
  overfitting: { title: "Why can a good training score be misleading?", lines: ["Overfitting happens when a model fits the training examples but performs poorly on new examples.", "Hold back separate test data to check how well a model generalizes.", "A tiny error on familiar examples does not establish that a model will work in a new setting."], try: "quiz ai", source: "overfitting" },
  context: { title: "Context isn't the same as training", lines: ["Context is the information available to a model for its current response. It can include instructions, earlier messages, and retrieved text.", "Providing a fact in a prompt does not, by itself, change the model's learned parameters.", "What a particular product saves between sessions depends on its features and settings."], try: "learn training", source: "llm" },
  hallucinations: { title: "Can a confident answer still be wrong?", lines: ["Yes. Generative AI can produce convincing claims, citations, or explanations that are false.", "For a claim you need to rely on, check the original evidence and whether it actually supports the answer.", "Ask what would let you verify the claim independently."], try: "quiz ai", source: "hallucinations" },
}

type Destination = { name: string; description: string; aliases?: string[] } & ({ app: TerminalApp; href?: never } | { href: string; app?: never })
const destinations: Destination[] = [
  { name: "paint", app: "paint", description: "stickers, glitter, and drawing" },
  { name: "minesweeper", app: "minesweeper", description: "a small game of logic" },
  { name: "learn", href: "/learn", description: "articles and practical guides" },
  { name: "guide", href: "/girly-guide-to-ai", aliases: ["girly-guide-to-ai"], description: "the Girly Guide to AI" },
  { name: "finds", href: "/learn/you-wont-believe-this-was-made-with-ai", description: "Michelle's internet finds" },
  { name: "projects", href: "/projects", description: "things Michelle has built" },
  { name: "research", href: "/research", description: "published research" },
  { name: "feedback", href: "/feedback", description: "feedback exchange for builders" },
  { name: "magazine", href: "/magazine", description: "the magazine and waitlist" },
  { name: "penpals", href: "/penpals", description: "stay in touch" },
  { name: "about", href: "/about", description: "about Michelle" },
  { name: "posts", href: "/posts", description: "posts from Michelle's Computer" },
  { name: "10apps", href: "/10apps", description: "10 Apps in 10 Weeks" },
  { name: "submit-article", href: "/learn/submit", description: "submit an article or draft" },
]

const quizQuestions = [
  { topic: "computers", question: "How many bits are in one byte?", options: ["2", "8", "16"], correct: 1, why: "Eight bits make one byte. UTF-8 can use multiple bytes for one character." },
  { topic: "computers", question: "What does an encoding such as UTF-8 do?", options: ["Connects text to byte sequences", "Makes every character one byte", "Encrypts a message"], correct: 0, why: "An encoding represents text as bytes. Encoding isn't encryption." },
  { topic: "computers", question: "What is an algorithm?", options: ["A particular brand of computer", "Any answer produced by AI", "A set of steps for solving a problem"], correct: 2, why: "Algorithms describe steps. They don't have to use AI." },
  { topic: "computers", question: "Which part normally controls a web page's visual styling?", options: ["DNS", "CSS", "UTF-8"], correct: 1, why: "CSS handles presentation. DNS helps resolve domain names; UTF-8 encodes text." },
  { topic: "computers", question: "You're guessing a number from 1 to 20. Which first guess splits the options roughly in half?", options: ["1", "20", "10"], correct: 2, why: "A middle guess lets a higher/lower answer rule out about half the possibilities." },
  { topic: "ai", question: "Is a language-model token always a whole word?", options: ["Yes", "No", "Only in English"], correct: 1, why: "Tokens can be words, subwords, punctuation, or bytes. The tokenizer determines the split." },
  { topic: "ai", question: "What changes during model training?", options: ["The model's learned parameters", "Only the font on screen", "The name of the input file"], correct: 0, why: "Training adjusts parameters. In the train demo, those parameters are a line's slope and intercept." },
  { topic: "ai", question: "A model is excellent on its training examples. What should you check next?", options: ["Whether its name sounds impressive", "Whether it answers confidently", "Performance on separate test examples"], correct: 2, why: "Test examples help reveal overfitting and whether the model generalizes." },
  { topic: "ai", question: "You put a new fact in a prompt. Does that alone retrain the model?", options: ["Always", "No", "Only if the fact is in capitals"], correct: 1, why: "A prompt supplies context for a response. That alone doesn't update learned parameters." },
  { topic: "ai", question: "An AI gives a confident answer with a citation. What establishes whether the claim is supported?", options: ["Checking the cited source", "The confident tone", "Asking it to say the answer twice"], correct: 0, why: "Open the source and check the evidence. A citation can be wrong or fail to support the claim." },
]

const aliases: Record<string, string> = { "?": "help", dir: "ls", cls: "clear", explain: "learn" }
const categories: Category[] = ["learn", "play", "explore", "basics"]
const usageExamples: Record<string, string> = {
  help: "help learn", tutorial: "tutorial", learn: "learn tokens", quiz: "quiz ai", answer: "answer b", binary: "binary hello", decode: "decode 01001000 01101001", tokens: "tokens unhappy computers!", predict: "predict the", train: "train predict 4", sources: "sources", progress: "progress", ls: "ls programs", pwd: "pwd", tree: "tree", cat: "cat readme", open: "open paint", tour: "tour", inspect: "inspect", guess: "guess 10", roll: "roll 20", flip: "flip", fortune: "fortune", joke: "joke", surprise: "surprise", whoami: "whoami", date: "date", echo: "echo hello", history: "history", clear: "clear",
}

export function createTerminalState(): TerminalState {
  return { commands: [], learned: [], quiz: null, guess: null, examples: [[1, 2], [2, 4], [3, 6]] }
}

function unquote(value: string) {
  return value.length >= 2 && (value[0] === '"' && value.at(-1) === '"' || value[0] === "'" && value.at(-1) === "'") ? value.slice(1, -1) : value
}

function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]; row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const saved = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1))
      previous = saved
    }
  }
  return row[b.length]
}

function suggest(value: string, choices: string[]) {
  const best = choices.map(name => ({ name, distance: distance(value, name) })).sort((a, b) => a.distance - b.distance)[0]
  return best && best.distance <= Math.min(2, Math.floor(value.length / 2)) ? best.name : null
}

export function completeTerminal(value: string): string[] {
  const normalized = value.trimStart().toLowerCase()
  const space = normalized.indexOf(" ")
  if (space < 0) return terminalCommands.map(command => command.name).filter(name => name.startsWith(normalized))
  const name = normalized.slice(0, space), prefix = normalized.slice(space + 1)
  const choices = name === "learn" || name === "explain" ? Object.keys(terminalLessons) : name === "open" ? destinations.map(item => item.name) : name === "help" ? [...categories, ...terminalCommands.map(item => item.name)] : name === "cat" ? ["readme", "cheatsheet", "about", "corpus"] : name === "quiz" ? ["ai", "computers", "stop"] : []
  return Array.from(new Set(choices)).filter(choice => choice.startsWith(prefix)).map(choice => `${name} ${choice}`)
}

// A small, explicit subword vocabulary for teaching. This is not a production model tokenizer.
const teachingPieces = ["computer", "learn", "happy", "model", "hello", "world", "token", "train", "ing", "un", "re", "s"]
export function teachingTokens(text: string): string[] {
  const tokens: string[] = []
  const characters = Array.from(text)
  let at = 0
  while (at < characters.length) {
    const rest = characters.slice(at).join("")
    const piece = teachingPieces.find(candidate => rest.startsWith(candidate)) || characters[at]
    tokens.push(piece); at += Array.from(piece).length
  }
  return tokens
}

const predictionCorpus = ["the computer can learn patterns", "the computer can run programs", "the computer can store files", "the model can learn patterns", "the model can generate text", "the model can generate code"]
function predictions(text: string) {
  const last = text.toLowerCase().match(/[a-z]+/g)?.at(-1) || "the"
  const counts = new Map<string, number>()
  for (const sentence of predictionCorpus) {
    const words = sentence.split(" ")
    for (let index = 0; index < words.length - 1; index++) if (words[index] === last) counts.set(words[index + 1], (counts.get(words[index + 1]) || 0) + 1)
  }
  return { last, counts: Array.from(counts.entries()).sort((a, b) => b[1] - a[1]) }
}

export function fitLine(examples: [number, number][]) {
  const xMean = examples.reduce((total, [x]) => total + x, 0) / examples.length
  const yMean = examples.reduce((total, [, y]) => total + y, 0) / examples.length
  const variance = examples.reduce((total, [x]) => total + (x - xMean) ** 2, 0)
  if (!variance) return null
  const slope = examples.reduce((total, [x, y]) => total + (x - xMean) * (y - yMean), 0) / variance
  return { slope, intercept: yMean - slope * xMean }
}
function number(value: number) { return String(Number(value.toFixed(3))) }

function questionLines(quiz: Quiz) {
  const item = quizQuestions[quiz.order[quiz.at]]
  return [`Question ${quiz.at + 1}/${quiz.order.length}: ${item.question}`, ...item.options.map((option, index) => `${"abc"[index]}) ${option}`), "Type answer a, answer b, or answer c. (A single letter works too.)"]
}

export function executeTerminal(value: string, state: TerminalState, options: { random?: () => number; now?: Date } = {}): TerminalResult {
  const clean = value.trim()
  if (!clean) return { state, lines: [] }
  const first = clean.split(/\s+/, 1)[0].toLowerCase()
  let name = Object.hasOwn(aliases, first) ? aliases[first] : first
  let argument = unquote(clean.slice(first.length).trim())
  if (state.quiz && /^[abc]$/i.test(clean)) { name = "answer"; argument = clean.toLowerCase() }
  const next: TerminalState = { ...state, commands: [...state.commands, clean].slice(-100) }
  const result = (lines: string[], extra: Omit<Partial<TerminalResult>, "state" | "lines"> = {}): TerminalResult => ({ state: next, lines, ...extra })
  const random = options.random || Math.random
  const pick = <T,>(items: T[]): T => items[Math.max(0, Math.min(items.length - 1, Math.floor(random() * items.length)))]
  const usage = (command: string) => result([`Usage: ${terminalCommands.find(item => item.name === command)?.usage}`, `Try: ${usageExamples[command]}`])

  if (clean.length > 240) return result(["Keep commands to 240 characters or fewer."])
  if (name === "clear") return result([], { clear: true })
  if (name === "help") {
    const topic = argument.toLowerCase()
    if (!topic) return result([`${terminalCommands.length} commands to explore.`, "", "help learn    computers, AI, and experiments", "help play     games and small surprises", "help explore  programs, pages, and text files", "help basics   everyday terminal commands", "", "Start here: tutorial", "Get an example: help train", "Up/Down recalls commands. Tab completes names."])
    if (categories.includes(topic as Category)) return result([`${topic.toUpperCase()} COMMANDS`, ...terminalCommands.filter(command => command.category === topic).map(command => `${command.usage}\n  ${command.description}`), "", topic === "learn" ? "Try: learn ai" : `Try: ${usageExamples[terminalCommands.find(item => item.category === topic)!.name]}`])
    const command = terminalCommands.find(item => item.name === topic)
    return command ? result([command.usage, command.description, `Try: ${usageExamples[command.name]}`]) : result([`No help topic called "${argument}".`, "Try: help learn, help play, help explore, or help basics."])
  }
  if (name === "tutorial") return result(["YOUR FIRST FIVE COMMANDS", "Type each one and see what changes:", "", "1. echo hello              tell the terminal what to print", "2. binary A                see one letter as bits", "3. tokens unhappy          split text into smaller pieces", "4. train predict 4         try a fitted model", "5. quiz ai                 check your understanding", "", "Click the terminal to type. Up recalls a command; Tab completes a name."])
  if (name === "learn") {
    const topic = argument.toLowerCase()
    if (!topic) return result(["PICK A SHORT LESSON", ...Object.entries(terminalLessons).map(([key, lesson]) => `learn ${key}\n  ${lesson.title}`), "", "Each lesson includes a command to try and a reference."])
    const lesson = Object.hasOwn(terminalLessons, topic) ? terminalLessons[topic] : undefined
    if (!lesson) { const match = suggest(topic, Object.keys(terminalLessons)); return result([`No lesson called "${argument}".`, match ? `Did you mean: learn ${match}?` : "Type learn to see the topics."]) }
    next.learned = Array.from(new Set([...state.learned, topic]))
    return result([lesson.title.toUpperCase(), "", ...lesson.lines.flatMap(line => [line, ""]), `Try: ${lesson.try}`, `Source: ${terminalSources[lesson.source].url}`])
  }
  if (name === "sources") return result(["READ THE ORIGINAL EXPLANATIONS", ...Object.values(terminalSources).flatMap(source => ["", source.title, source.url])])
  if (name === "progress") return result([`Topics explored: ${state.learned.length}/${Object.keys(terminalLessons).length}`, state.learned.length ? state.learned.join(", ") : "No lessons opened yet. Try learn ai.", ...(state.quiz ? [`Quiz: ${state.quiz.at}/${state.quiz.order.length} answered; ${state.quiz.score} correct.`] : []), "This progress lasts for this loaded terminal session."])
  if (name === "binary") {
    if (!argument) return usage(name)
    const bytes = new TextEncoder().encode(argument)
    if (bytes.length > 24) return result(["Try a shorter phrase: this lab holds 24 UTF-8 bytes so you can paste the full result into decode.", "Try: binary hello"])
    return result([`Text: ${JSON.stringify(argument)}`, `UTF-8 bytes: ${bytes.length} | Bits: ${bytes.length * 8}`, Array.from(bytes, byte => byte.toString(2).padStart(8, "0")).join(" "), "", "Each group is one byte. A character can need more than one byte.", "Copy the bits after decode to turn them back into text."])
  }
  if (name === "decode") {
    if (!argument) return usage(name)
    if (!/^[01\s]+$/.test(argument)) return result(["Use only 0s, 1s, and spaces. Try: decode 01001000 01101001"])
    const bits = argument.replace(/\s/g, "")
    if (bits.length % 8) return result(["A byte needs eight bits. The total number of bits must be a multiple of eight."])
    try {
      const bytes = Uint8Array.from(bits.match(/.{8}/g) || [], byte => parseInt(byte, 2))
      return result([`Decoded UTF-8: ${JSON.stringify(new TextDecoder("utf-8", { fatal: true }).decode(bytes))}`])
    } catch { return result(["Those bytes aren't valid UTF-8 text. Some byte sequences represent other kinds of data."]) }
  }
  if (name === "tokens") {
    if (!argument) return usage(name)
    const pieces = teachingTokens(argument)
    const tokenId = (piece: string) => teachingPieces.includes(piece) ? teachingPieces.indexOf(piece) + 1 : teachingPieces.length + 1 + piece.codePointAt(0)!
    return result(["TOKEN LAB — a teaching tokenizer", ...pieces.map(piece => `${JSON.stringify(piece).padEnd(16)} id ${tokenId(piece)}`), "", `${pieces.length} pieces. Spaces and punctuation count too.`, "Known pieces stay together; other text falls back to characters.", "IDs are fixed for this demo. Actual model tokenizers split differently.", "Try: tokens Unhappy computers!", `Source: ${terminalSources.tokens.url}`])
  }
  if (name === "predict") {
    const { last, counts } = predictions(argument)
    if (!counts.length) return result([`The teaching corpus has no next-word examples after "${last}".`, "Try: predict the, predict can, or predict generate.", "No evidence here means no prediction, rather than a made-up probability."])
    const total = counts.reduce((sum, [, count]) => sum + count, 0)
    const sample = pick(counts.flatMap(([word, count]) => Array<string>(count).fill(word)))
    return result(["NEXT-WORD LAB — a tiny bigram model", `Looking only at the previous word: "${last}"`, ...counts.map(([word, count]) => `${word.padEnd(10)} ${number(count / total * 100)}% ${"#".repeat(Math.round(count / total * 20))}`), `Sampled next word: ${sample}`, "", "Probabilities come from counts in six example sentences, not an LLM.", "A different corpus gives different probabilities. These aren't probabilities of a claim being true.", "Try: predict the model can", "See the full corpus: cat corpus"])
  }
  if (name === "train") {
    const parts = argument.split(/\s+/), operation = parts[0].toLowerCase()
    if (operation === "reset") next.examples = createTerminalState().examples
    else if (operation === "add") {
      if (parts.length !== 3 || parts.slice(1).some(part => !Number.isFinite(Number(part)) || Math.abs(Number(part)) > 10000)) return result(["Use two finite numbers between -10000 and 10000. Try: train add 4 2"])
      if (state.examples.length >= 30) return result(["This tiny lab holds 30 examples. Use train reset to start again."])
      next.examples = [...state.examples, [Number(parts[1]), Number(parts[2])]]
    } else if (operation && operation !== "predict") return usage(name)
    const line = fitLine(next.examples)!
    if (operation === "predict") {
      if (parts.length !== 2 || !Number.isFinite(Number(parts[1])) || Math.abs(Number(parts[1])) > 10000) return result(["Use one number between -10000 and 10000. Try: train predict 4"])
      const x = Number(parts[1]), y = line.slope * x + line.intercept
      return result([`Input x = ${number(x)}`, `Prediction y = ${number(y)}`, `Using y = ${number(line.slope)}x ${line.intercept < 0 ? "-" : "+"} ${number(Math.abs(line.intercept))}`, "", "This is a prediction from the fitted line, not a guaranteed answer.", "Change the training data: train add 4 2"])
    }
    return result(["TRAINING LAB — linear regression", `Examples (x -> y): ${next.examples.map(([x, y]) => `${number(x)} -> ${number(y)}`).join(", ")}`, `Fitted model: y = ${number(line.slope)}x ${line.intercept < 0 ? "-" : "+"} ${number(Math.abs(line.intercept))}`, "", "The line is fitted to minimize squared error on these examples.", "Try: train predict 4", "Then: train add 4 2", "Predict again. How did the changed example affect the answer?", "Start over: train reset", `Source: ${terminalSources.training.url}`])
  }
  if (name === "quiz") {
    const topic = argument.toLowerCase()
    if (topic === "stop") { next.quiz = null; return result(["Quiz stopped. Try learn to explore at your own pace."]) }
    if (topic && topic !== "ai" && topic !== "computers") return usage(name)
    const available = quizQuestions.flatMap((item, index) => !topic || item.topic === topic ? [index] : [])
    for (let i = available.length - 1; i > 0; i--) { const j = Math.max(0, Math.min(i, Math.floor(random() * (i + 1)))); [available[i], available[j]] = [available[j], available[i]] }
    next.quiz = { order: available.slice(0, 5), at: 0, score: 0 }
    return result([`${topic === "computers" ? "COMPUTER" : topic === "ai" ? "AI" : "COMPUTERS + AI"} QUIZ`, "Type quiz stop to leave. Explanations follow every answer.", "", ...questionLines(next.quiz)])
  }
  if (name === "answer") {
    if (!state.quiz) return result(["No quiz is running. Start one with quiz ai or quiz computers."])
    const chosen = "abc".indexOf(argument.toLowerCase())
    if (argument.length !== 1 || chosen < 0) return usage(name)
    const item = quizQuestions[state.quiz.order[state.quiz.at]], correct = chosen === item.correct
    const quiz = { ...state.quiz, at: state.quiz.at + 1, score: state.quiz.score + Number(correct) }
    const feedback = [correct ? "Correct!" : `Not quite. The answer is ${"abc"[item.correct]}) ${item.options[item.correct]}.`, item.why, ""]
    if (quiz.at === quiz.order.length) { next.quiz = null; return result([...feedback, `Quiz complete: ${quiz.score}/${quiz.order.length}.`, "Revisit a topic with learn, or start another round with quiz."], { feedback: correct ? "correct" : "incorrect" }) }
    next.quiz = quiz
    return result([...feedback, ...questionLines(quiz)], { feedback: correct ? "correct" : "incorrect" })
  }
  if (name === "ls") {
    const filter = argument.toLowerCase()
    if (filter && filter !== "programs" && filter !== "pages") return usage(name)
    return result([...destinations.filter(item => !filter || (filter === "programs" ? item.app : item.href)).map(item => `[${item.app ? "APP" : "PAGE"}] ${item.name} — ${item.description}`), ...(!filter ? ["[TEXT] readme, cheatsheet, about, corpus (use cat)"] : [])])
  }
  if (name === "pwd") return result(["C:\\MICHELLE", "A virtual location inside this website."])
  if (name === "tree") return result(["C:\\MICHELLE", "+-- Programs", ...destinations.filter(item => item.app).map(item => `|   +-- ${item.name}`), "+-- Pages", ...destinations.filter(item => item.href).map(item => `|   +-- ${item.name}`), "+-- Text files", "    +-- readme", "    +-- cheatsheet", "    +-- about", "    +-- corpus"])
  if (name === "cat") {
    const file = argument.toLowerCase().replace(/\.txt$/, "")
    if (file === "readme") return result(["MICHELLE'S COMPUTER / README", "A small computer for exploring AI, creative tools, and things Michelle has made.", "Start with tutorial, learn ai, or tour.", "Use help learn for the experiments. Use open paint when you want to make a mess."])
    if (file === "cheatsheet") return result(["CHEATSHEET", "Up / Down       recall commands", "Tab             complete a command or topic", "Enter           run your command", "Click           focus the prompt", "help <command>  show an example", "clear           clear the screen", "quiz stop       leave the quiz", "guess stop      leave the number game"])
    if (file === "about") return result(["This terminal is part of Michelle's Computer.", "Explore AI guides, creative experiments, projects, and writing.", "Try: open about"])
    if (file === "corpus") return result(["THE NEXT-WORD LAB'S ENTIRE CORPUS", ...predictionCorpus, "", "The model counts each word that follows the previous word in these examples.", "Try: predict can"])
    return result([`Text file not found: ${argument || "(no file specified)"}`, "Try: cat readme, cat cheatsheet, cat about, or cat corpus."])
  }
  if (name === "open") {
    const target = argument.toLowerCase(), item = destinations.find(item => item.name === target || item.aliases?.includes(target))
    if (!item) { const match = suggest(target, destinations.map(item => item.name)); return result([`File not found: ${argument || "(no file specified)"}`, match ? `Did you mean: open ${match}?` : "Use ls to see what you can open."]) }
    return item.app ? result([`[open] ${item.name}`], { action: { type: "app", app: item.app } }) : result([`[open] ${item.href}`], { action: { type: "page", href: item.href! } })
  }
  if (name === "tour") return result(["A SHORT TOUR", "open learn       start with articles and guides", "open guide       explore the Girly Guide to AI", "open finds       browse Michelle's internet finds", "open projects    see what she's built", "open paint       draw, stamp, and experiment", "open minesweeper take a little logic break", "", "Type one of the open commands to go there."])
  if (name === "inspect") return result(["UNDER THE HOOD", "Interface: a React component in your browser.", "Commands: a small JavaScript command interpreter.", "Experiments: UTF-8 encoding, a teaching tokenizer, word counts, and a fitted line.", "The experiments run locally in this page. They do not call a language-model API.", "This is a simulated terminal, so only the commands in help are implemented."])
  if (name === "history") return result(next.commands.map((command, index) => `${index + 1}. ${command}`))
  if (name === "whoami") return result(["guest@michellescomputer"])
  if (name === "date") return result([(options.now || new Date()).toLocaleString()])
  if (name === "echo") return result([argument])
  if (name === "roll") {
    const sides = argument ? Number(argument) : 6
    if (!Number.isInteger(sides) || sides < 2 || sides > 100) return result(["Pick a whole number from 2 to 100. Try: roll 20"])
    return result([`Rolled a ${sides}-sided die: ${pick(Array.from({ length: sides }, (_, index) => index + 1))}`])
  }
  if (name === "flip") return result([pick(["Heads.", "Tails."])])
  if (name === "fortune") return result(["FORTUNE COOKIE", pick(["The thing you're putting off might need a smaller first step.", "Today is a good day to ask how something works.", "One weird little experiment is allowed.", "A useful question beats a confident guess.", "Save your work. Then go get some water."])])
  if (name === "joke") return result([pick(["Why do programmers confuse Halloween and Christmas? OCT 31 = DEC 25. (31 in base 8 is 25 in base 10.)", "A SQL query walks into a bar, sees two tables, and asks: can I join you?", "There are 10 kinds of people: those who understand binary and those who don't. (10 in binary means two.)"])])
  if (name === "surprise") return result(pick([[" /\\_/\\", "( o.o )", " > ^ <", "A very small cat has inspected your computer.", "Its recommendation: cat cheatsheet"], ["A tiny puzzle: what does 01001000 01101001 say?", "Try: decode 01001000 01101001"], ["Two prompts can end with the same word but mean different things.", "Our little predictor can't tell: it only looks at that last word.", "Try: predict the computer can", "Then: predict the model can"]]))
  if (name === "guess") {
    if (argument.toLowerCase() === "stop") { next.guess = null; return result(["Number game stopped. Start again with guess."]) }
    if (!argument) { next.guess = { target: pick(Array.from({ length: 20 }, (_, index) => index + 1)), tries: 0 }; return result(["I've picked a whole number from 1 to 20.", "Try: guess 10", "Use the higher/lower hints. How few guesses can you use?", "Leave with guess stop."]) }
    if (!state.guess) return result(["Start a round with guess, then try a number with guess 10."])
    const guessed = Number(argument)
    if (!Number.isInteger(guessed) || guessed < 1 || guessed > 20) return result(["Guess a whole number from 1 to 20."])
    const tries = state.guess.tries + 1
    if (guessed === state.guess.target) { next.guess = null; return result([`Found it: ${guessed}. ${tries} ${tries === 1 ? "guess" : "guesses"}.`, "Want the strategy? learn algorithm", "Another round: guess"]) }
    next.guess = { ...state.guess, tries }
    return result([guessed < state.guess.target ? "Higher." : "Lower.", `Guesses so far: ${tries}`])
  }
  const match = suggest(name, terminalCommands.map(item => item.name))
  return result([`Command not found: ${first}`, match ? `Did you mean: ${match}?` : "Try help learn, help play, or help explore."])
}
