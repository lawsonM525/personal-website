import test from "node:test"
import assert from "node:assert/strict"
import { completeTerminal, createTerminalState, executeTerminal, fitLine, teachingTokens, binaryByteLimit, terminalInputLimit, terminalCommands, terminalLessons } from "../lib/terminal.ts"

const run = (command, state = createTerminalState()) => executeTerminal(command, state, { random: () => .5 })
const text = result => result.lines.join("\n")

test("help exposes every category, commands have examples, and typo suggestions are actionable", () => {
  for (const category of ["learn", "play", "explore", "basics"]) {
    const help = text(run(`help ${category}`))
    for (const command of terminalCommands.filter(item => item.category === category)) assert.ok(help.includes(command.usage), command.name)
  }
  for (const command of terminalCommands) {
    const example = run(`help ${command.name}`).lines.find(line => line.startsWith("Try: "))?.slice(5)
    // Categories deliberately take precedence over the same-named command.
    if (example) assert.doesNotMatch(text(run(example)), /Command not found/)
  }
  assert.match(text(run("leran")), /Did you mean: learn/)
  assert.match(text(run("learn toknes")), /learn tokens/)
  assert.match(text(run("open panit")), /open paint/)
})

test("UTF-8 experiments round-trip accented text and emoji, reject malformed bytes, and keep output pasteable", () => {
  for (const value of ["Hi", "café", "👋", "a b", "中文"]) {
    const encoded = run(`binary ${value}`).lines[2]
    assert.match(encoded, /^[01]{8}( [01]{8})*$/)
    assert.ok(`decode ${encoded}`.length <= terminalInputLimit)
    assert.equal(run(`decode ${encoded}`).lines[0], `Decoded UTF-8: ${JSON.stringify(value)}`)
  }
  assert.match(text(run("decode 101")), /eight bits/)
  assert.match(text(run("decode 11111111")), /aren't valid UTF-8/)
  assert.match(text(run("decode banana")), /only 0s, 1s/)
  assert.match(text(run(`binary ${"👋".repeat(binaryByteLimit / 4 + 1)}`)), /4,096 UTF-8 bytes/)
  assert.match(text(run(`decode ${"01000001".repeat(binaryByteLimit + 1)}`)), /4,096 bytes/)
  assert.match(text(run(`echo ${"x".repeat(241)}`)), /240 characters/)
  assert.match(text(run(`decode ${"1".repeat(terminalInputLimit)}`)), /characters or fewer/)
})

test("binary accepts full-size UTF-8 input and every valid output fits a decode command", () => {
  for (const value of ["a".repeat(binaryByteLimit), "👋".repeat(binaryByteLimit / 4), "café and 中文 text ".repeat(40)]) {
    const result = run(`binary ${value}`)
    const bits = result.lines[2]
    assert.match(bits, /^[01]{8}( [01]{8})*$/)
    const bytes = new TextEncoder().encode(value.trim())
    assert.equal(bits.split(" ").length, bytes.length)
    assert.ok(`decode ${bits}`.length <= terminalInputLimit)
    assert.equal(run(`decode ${bits}`).lines[0], `Decoded UTF-8: ${JSON.stringify(value.trim())}`)
  }
  assert.equal(run('binary " hi "').lines[2], "00100000 01101000 01101001 00100000")
  assert.equal(run("decode 0100100001101001").lines[0], 'Decoded UTF-8: "Hi"')
  assert.deepEqual(run("open text-to-binary").action, { type: "page", href: "/text-to-binary" })
})

test("token lab preserves all text and keeps token IDs stable between inputs", () => {
  for (const value of ["unhappy computers!", "Hello, 世界 👋", " a  b "]) assert.equal(teachingTokens(value).join(""), value)
  assert.deepEqual(teachingTokens("unhappy"), ["un", "happy"])
  const idFor = (value, piece) => run(`tokens ${value}`).lines.find(line => line.startsWith(`${JSON.stringify(piece)} `))?.match(/id (\d+)/)?.[1]
  assert.equal(idFor("?x", "x"), idFor("!x", "x"))
  assert.match(text(run("tokens hello")), /teaching tokenizer/)
  assert.match(text(run("tokens hello")), /Actual model tokenizers split differently/)
})

test("the regression lab really refits the model without mutating prior examples", () => {
  const state = createTerminalState()
  assert.deepEqual(fitLine(state.examples), { slope: 2, intercept: 0 })
  assert.match(text(run("train predict 4", state)), /Prediction y = 8/)
  const changed = run("train add 4 2", state)
  assert.equal(state.examples.length, 3)
  assert.equal(changed.state.examples.length, 4)
  assert.match(text(run("train predict 4", changed.state)), /Prediction y = 3.8/)
  const reset = run("train reset", changed.state)
  assert.match(text(run("train predict 4", reset.state)), /Prediction y = 8/)
  for (const value of ["train add NaN 2", "train add Infinity 4", "train add 2", "train predict banana", "train predict 10001"]) assert.match(text(run(value)), /Use (two finite numbers|one number)/)
  assert.equal(fitLine([[1, 2], [1, 3]]), null)
})

test("next-word probabilities come from the displayed corpus, not invented confidence", () => {
  const result = run("predict the")
  assert.ok(result.lines.includes("computer   50% ##########"))
  assert.ok(result.lines.includes("model      50% ##########"))
  assert.match(text(result), /six example sentences, not an LLM/)
  assert.match(text(run("predict bananas")), /no next-word examples/)
  const a = run("predict the computer can").lines.filter(line => /%/.test(line))
  const b = run("predict the model can").lines.filter(line => /%/.test(line))
  assert.deepEqual(a, b, "bigram lab intentionally uses only the previous word")
})

test("quiz validates answers, gives explanations, avoids repeats, and reports its actual score", () => {
  for (const topic of ["ai", "computers", ""]) {
    let result = run(`quiz ${topic}`)
    const seen = new Set()
    let correct = 0
    const invalid = run("answer z", result.state)
    assert.equal(invalid.state.quiz.at, 0)
    assert.equal(invalid.feedback, undefined)
    for (let index = 0; index < 5; index++) {
      const question = result.lines.find(line => line.startsWith("Question "))
      assert.ok(question)
      assert.equal(seen.has(question.split(": ")[1]), false)
      seen.add(question.split(": ")[1])
      result = run(index % 2 ? "answer a" : "a", result.state)
      assert.equal(result.feedback, result.lines[0] === "Correct!" ? "correct" : "incorrect", "every answer, including the last, reports its sound outcome")
      if (result.lines[0] === "Correct!") correct++
      else assert.match(result.lines[0], /The answer is [abc]\)/)
      assert.ok(result.lines[1].length > 25, "each answer includes an explanation")
    }
    assert.equal(result.state.quiz, null)
    assert.match(text(result), new RegExp(`Quiz complete: ${correct}/5`))
  }
  assert.match(text(run("answer a")), /No quiz is running/)
  assert.equal(run("quiz stop", run("quiz ai").state).state.quiz, null)
})

test("quiz sound outcomes distinguish right and wrong answers, including bare letters, without sounding on other commands", () => {
  const state = run("quiz ai").state
  assert.equal(run("answer b", state).feedback, "correct")
  assert.equal(run("b", state).feedback, "correct")
  assert.equal(run("answer a", state).feedback, "incorrect")
  for (const command of ["help", "quiz ai", "quiz stop", "answer z", "echo Correct!"]) assert.equal(run(command, state).feedback, undefined)
  assert.equal(run("answer a").feedback, undefined)
})

test("lessons count once and each recommended next command is implemented", () => {
  let state = createTerminalState()
  for (const [topic, lesson] of Object.entries(terminalLessons)) {
    const result = run(`learn ${topic}`, state)
    state = result.state
    assert.match(text(result), /Source: https:\/\//)
    assert.doesNotMatch(text(run(lesson.try)), /Command not found/)
  }
  assert.equal(state.learned.length, Object.keys(terminalLessons).length)
  assert.equal(run("learn ai", state).state.learned.length, state.learned.length)
  assert.equal(createTerminalState().learned.length, 0)
})

test("app and page actions use known destinations while arbitrary strings stay inert", () => {
  assert.deepEqual(run("OPEN PAINT").action, { type: "app", app: "paint" })
  assert.deepEqual(run("open minesweeper").action, { type: "app", app: "minesweeper" })
  assert.deepEqual(run("open guide").action, { type: "page", href: "/girly-guide-to-ai" })
  for (const command of ["open https://example.com", "open __proto__", "open constructor", "__proto__", "constructor", "alert(1)", "rm -rf /"]) assert.equal(run(command).action, undefined)
  assert.deepEqual(run("dir").lines, run("ls").lines)
  assert.equal(run("cls").clear, true)
  assert.equal(run("echo Mixed CASE and  spaces").lines[0], "Mixed CASE and  spaces")
})

test("autocomplete handles command, lesson, file, and app names without changing arbitrary text", () => {
  assert.deepEqual(completeTerminal("tr"), ["train", "tree"])
  assert.deepEqual(completeTerminal("learn tok"), ["learn tokens"])
  assert.deepEqual(completeTerminal("OPEN MIN"), ["open minesweeper"])
  assert.deepEqual(completeTerminal("cat cor"), ["cat corpus"])
  assert.deepEqual(completeTerminal("echo hello"), [])
})

test("number game validates guesses, finishes, and can be stopped; dice stay within bounds", () => {
  const state = run("guess").state
  assert.equal(state.guess.target, 11)
  assert.match(text(run("guess 4", state)), /Higher/)
  assert.match(text(run("guess 18", state)), /Lower/)
  assert.match(text(run("guess 2.5", state)), /whole number/)
  assert.equal(run("guess 11", state).state.guess, null)
  assert.equal(run("guess stop", state).state.guess, null)
  for (const random of [0, .999999]) {
    const line = executeTerminal("roll 20", createTerminalState(), { random: () => random }).lines[0]
    const rolled = Number(line.split(": ")[1])
    assert.ok(rolled >= 1 && rolled <= 20)
  }
  for (const value of ["roll 0", "roll 2.5", "roll Infinity", "roll 101"]) assert.match(text(run(value)), /whole number/)
})

test("history is bounded, clear preserves session learning, and separate sessions do not share state", () => {
  let state = createTerminalState()
  for (let index = 0; index < 110; index++) state = run(`echo ${index}`, state).state
  assert.equal(state.commands.length, 100)
  state = run("learn ai", state).state
  const cleared = run("clear", state)
  assert.equal(cleared.clear, true)
  assert.deepEqual(cleared.state.learned, ["ai"])
  assert.equal(createTerminalState().commands.length, 0)
  assert.equal(run("   ", state).state, state)
})
