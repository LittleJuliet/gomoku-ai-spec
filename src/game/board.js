export const BOARD_SIZE = 15

export function createEmptyBoard(size = BOARD_SIZE) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 'empty')
  )
}

export function isInside(board, x, y) {
  return y >= 0 && y < board.length && x >= 0 && x < board[0].length
}

export function isCellEmpty(board, x, y) {
  return isInside(board, x, y) && board[y][x] === 'empty'
}

export function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell !== 'empty'))
}

export function cloneBoard(board) {
  return board.map((row) => row.slice())
}

export function placeStone(board, x, y, color) {
  const next = cloneBoard(board)
  next[y][x] = color
  return next
}
