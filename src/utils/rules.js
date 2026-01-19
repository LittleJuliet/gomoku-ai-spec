// 棋盘规则工具：初始化棋盘并执行胜负判定。
export const BOARD_SIZE = 15

export const createEmptyBoard = (size = BOARD_SIZE) =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => 0))

const isInBounds = (size, row, col) => row >= 0 && col >= 0 && row < size && col < size

const countDirection = (board, row, col, dr, dc, player) => {
  const size = board.length
  let r = row + dr
  let c = col + dc
  let count = 0
  while (isInBounds(size, r, c) && board[r][c] === player) {
    count += 1
    r += dr
    c += dc
  }
  return count
}

export const checkWin = (board, row, col, player) => {
  if (!board[row] || board[row][col] !== player) {
    return false
  }
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1]
  ]
  return directions.some(([dr, dc]) => {
    const forward = countDirection(board, row, col, dr, dc, player)
    const backward = countDirection(board, row, col, -dr, -dc, player)
    return forward + backward + 1 >= 5
  })
}
