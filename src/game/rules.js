import { isInside } from './board'

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

export function findWinner(board) {
  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[y].length; x += 1) {
      const cell = board[y][x]
      if (cell === 'empty') continue
      if (hasFiveInRow(board, x, y, cell)) {
        return cell
      }
    }
  }
  return null
}
