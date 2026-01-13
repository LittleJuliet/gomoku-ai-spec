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

export function nextPlayer(currentPlayer) {
  return currentPlayer === 'black' ? 'white' : 'black'
}

function countOneDirection(board, x, y, dx, dy, player) {
  let count = 0
  let cx = x + dx
  let cy = y + dy
  while (isInside(board, cx, cy) && board[cy][cx] === player) {
    count += 1
    cx += dx
    cy += dy
  }
  return count
}

export function hasFiveInRow(board, x, y, player) {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1]
  ]

  return directions.some(([dx, dy]) => {
    const total =
      1 +
      countOneDirection(board, x, y, dx, dy, player) +
      countOneDirection(board, x, y, -dx, -dy, player)
    return total >= 5
  })
}
