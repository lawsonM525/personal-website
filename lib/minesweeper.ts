export type Square = { mine: boolean; nearby: number; revealed: boolean; flagged: boolean }
export const boardSize = 6
export const mineCount = 6

export function makeBoard(first: number, random = Math.random): Square[] {
  const board = Array.from({ length: boardSize * boardSize }, () => ({ mine: false, nearby: 0, revealed: false, flagged: false }))
  const safe = new Set([first, ...neighbors(first)])
  const available = board.map((_, index) => index).filter(index => !safe.has(index))
  for (let n = 0; n < mineCount; n++) {
    const pick = Math.min(available.length - 1, Math.floor(random() * available.length))
    board[available.splice(pick, 1)[0]].mine = true
  }
  board.forEach((square, index) => { square.nearby = neighbors(index).filter(next => board[next].mine).length })
  return board
}

export function neighbors(index: number): number[] {
  const row = Math.floor(index / boardSize), column = index % boardSize, result: number[] = []
  for (let y = -1; y <= 1; y++) for (let x = -1; x <= 1; x++) {
    const r = row + y, c = column + x
    if ((x || y) && r >= 0 && r < boardSize && c >= 0 && c < boardSize) result.push(r * boardSize + c)
  }
  return result
}

export function reveal(board: Square[], index: number): Square[] {
  const next = board.map(square => ({ ...square }))
  const pending = [index]
  while (pending.length) {
    const at = pending.pop()!, square = next[at]
    if (square.revealed || square.flagged) continue
    square.revealed = true
    if (!square.mine && square.nearby === 0) pending.push(...neighbors(at))
  }
  return next
}

export function hasWon(board: Square[]) { return board.every(square => square.mine || square.revealed) }
