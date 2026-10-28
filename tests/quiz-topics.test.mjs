import test from "node:test"
import assert from "node:assert/strict"
import { quizTopics, getQuizTopic, quizQuestionCount } from "../lib/quiz-topics.ts"
import { executeTerminal, createTerminalState, completeTerminal } from "../lib/terminal.ts"

const options = slug => ({ quizTopics, activeTopic: slug })
const start = slug => executeTerminal(`quiz ${slug}`, createTerminalState(), options(slug))

test("shared bank has unique topics, complete choices, original explanations, and valid related links", () => {
  assert.equal(quizQuestionCount, 70)
  assert.equal(new Set(quizTopics.map(t => t.slug)).size, 7)
  const questions = new Set()
  for (const topic of quizTopics) {
    assert.equal(topic.questions.length, 10)
    assert.ok(topic.igcse.section && topic.ib.section)
    for (const slug of topic.related) assert.ok(getQuizTopic(slug), slug)
    for (const q of topic.questions) {
      assert.ok(!questions.has(q.question), q.question)
      questions.add(q.question)
      assert.equal(new Set(q.options).size, 3)
      assert.ok(q.correct >= 0 && q.correct < 3)
      assert.ok(q.why.trim() && q.why !== q.options[q.correct])
    }
  }
})

test("every topic can be completed, explains every answer, scores accurately, and emits both sound outcomes", () => {
  for (const topic of quizTopics) {
    for (const correct of [true, false]) {
      let result = start(topic.slug)
      assert.match(result.lines.join("\n"), /Question 1\/10/)
      for (let i = 0; i < topic.questions.length; i++) {
        const question = topic.questions[i]
        result = executeTerminal("abc"[correct ? question.correct : (question.correct + 1) % 3], result.state, options(topic.slug))
        assert.ok(result.lines.includes(question.why))
        assert.equal(result.feedback, correct ? "correct" : "incorrect")
        if (i < 9) assert.match(result.lines.join("\n"), new RegExp(`Question ${i + 2}/10`))
      }
      assert.equal(result.state.quiz, null)
      assert.equal(result.quizCompleted, true)
      assert.ok(result.lines.includes(`Quiz complete: ${correct ? 10 : 0}/10.`))
    }
  }
})

test("invalid answers preserve position; other commands preserve the quiz; restart and stop reset it", () => {
  let result = start("binary")
  for (const value of ["answer d", "answer", "answer aa", "echo hello", "help", "review"]) {
    result = executeTerminal(value, result.state, options("binary"))
    assert.equal(result.state.quiz.at, 0)
    assert.equal(result.feedback, undefined)
  }
  result = executeTerminal("b", result.state, options("binary"))
  assert.equal(result.state.quiz.at, 1)
  assert.equal(result.state.quiz.score, 1)
  result = executeTerminal("quiz", result.state, options("binary"))
  assert.equal(result.state.quiz.at, 0)
  assert.equal(result.state.quiz.score, 0)
  assert.equal(executeTerminal("quiz stop", result.state, options("binary")).state.quiz, null)
})

test("topic commands navigate to canonical pages, references stay local, and autocomplete discovers topics", () => {
  for (const topic of quizTopics) {
    assert.deepEqual(executeTerminal(`quiz ${topic.slug}`, createTerminalState(), { quizTopics }).action, { type: "page", href: `/quizzes/${topic.slug}` })
    assert.deepEqual(executeTerminal("review", start(topic.slug).state, options(topic.slug)).action, { type: "review" })
    assert.deepEqual(executeTerminal(`review ${topic.slug}`, createTerminalState(), { quizTopics }).action, { type: "page", href: `/quizzes/${topic.slug}#reference` })
    assert.ok(completeTerminal(`quiz ${topic.slug.slice(0, 3)}`, quizTopics).includes(`quiz ${topic.slug}`))
  }
  assert.deepEqual(executeTerminal("topics", createTerminalState()).action, { type: "page", href: "/quizzes" })
  assert.equal(executeTerminal("quiz __proto__", createTerminalState(), { quizTopics }).action, undefined)
  assert.equal(executeTerminal("pwd", createTerminalState(), { workingDirectory: "C:\\MICHELLE\\QUIZZES" }).lines[0], "C:\\MICHELLE\\QUIZZES")
})

test("binary answer keys agree with independently calculated conversions and shifts", () => {
  const q = getQuizTopic("binary").questions
  const answers = q.map(item => item.options[item.correct])
  assert.equal(Number(answers[0]), parseInt("1010", 2))
  assert.equal(parseInt(answers[1], 2), 13)
  assert.equal(Number(answers[2]), parseInt("2F", 16))
  assert.equal(Number(answers[3]), 2 ** 8 - 1)
  assert.equal(parseInt(answers[5], 2), (parseInt("00101101", 2) << 1) & 255)
  assert.equal(parseInt(answers[6], 2), parseInt("10010000", 2) >>> 2)
  assert.equal(Number(answers[7]), 24 / 8)
  assert.equal(Number(answers[8]), Math.log2(16))
  assert.equal(Number(answers[9].replace("−", "-")), 255 - 256)
})

test("trace and SQL count answer keys match execution, including inclusive bounds", () => {
  const a = getQuizTopic("algorithms").questions
  let x = 3; while (x < 20) x *= 2
  assert.equal(Number(a[2].options[a[2].correct]), x)
  let total = 0; for (let i = 1; i <= 4; i++) total += i
  assert.equal(Number(a[3].options[a[3].correct]), total)
  const list = [5, 1, 4, 2]
  for (let i = 0; i < list.length - 1; i++) if (list[i] > list[i + 1]) [list[i], list[i + 1]] = [list[i + 1], list[i]]
  assert.deepEqual(JSON.parse(a[7].options[a[7].correct]), list)
  const d = getQuizTopic("databases").questions[8]
  assert.equal(Number(d.options[d.correct]), [40, 50, 80].filter(mark => mark >= 50).length)
})
