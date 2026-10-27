import test from "node:test"
import assert from "node:assert/strict"
import { boardSize, mineCount, makeBoard, neighbors, reveal, hasWon } from "../lib/minesweeper.ts"

test("every first move and its neighbors are safe, with exactly six mines", () => {
  for (let first = 0; first < boardSize * boardSize; first++) {
    const board = makeBoard(first, () => .43)
    assert.equal(board.filter(square => square.mine).length, mineCount)
    for (const index of [first, ...neighbors(first)]) assert.equal(board[index].mine, false)
    assert.equal(board[first].nearby, 0)
  }
})
test("neighbor calculations never wrap around the board edges", () => {
  assert.deepEqual(neighbors(0).sort((a, b) => a - b), [1, 6, 7])
  assert.equal(neighbors(5).includes(6), false)
  assert.equal(neighbors(30).includes(29), false)
  const board = makeBoard(14, () => .7)
  for (let index = 0; index < board.length; index++) assert.equal(board[index].nearby, neighbors(index).filter(at => board[at].mine).length)
})
test("a reveal expands safe empty areas, preserves flags and does not mutate the previous state", () => {
  const board = makeBoard(0, () => .9)
  board[1].flagged = true
  const next = reveal(board, 0)
  assert.equal(board[0].revealed, false)
  assert.equal(next[0].revealed, true)
  assert.equal(next[1].flagged, true)
  assert.equal(next[1].revealed, false)
  assert.ok(next.filter(square => square.revealed).length > 1)
  assert.equal(next.some(square => square.revealed && square.mine), false)
})
test("winning requires clearing every safe square; revealing a mine is explicit", () => {
  let board = makeBoard(0, () => .2)
  assert.equal(hasWon(board), false)
  const mine = board.findIndex(square => square.mine)
  const lost = reveal(board, mine)
  assert.equal(lost[mine].revealed, true)
  assert.equal(lost[mine].mine, true)
  for (let index = 0; index < board.length; index++) if (!board[index].mine) board = reveal(board, index)
  assert.equal(hasWon(board), true)
  assert.equal(board.some(square => square.mine && square.revealed), false)
})
