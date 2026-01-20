import { defineStore } from 'pinia'

const BOARD_SIZE = 15
const EMPTY = 0
const BLACK = 1
const WHITE = 2
const MODE_LOCAL = 'local'
const MODE_AI_HARD = 'ai-hard'
const CENTER = Math.floor(BOARD_SIZE / 2)

const createBoard = () =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(EMPTY))

const inBounds = (row, col) =>
  row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE

const hasAnyStone = (board) =>
  board.some((row) => row.some((cell) => cell !== EMPTY))

const getEmptyCells = (board) => {
  const empty = []
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      if (board[row][col] === EMPTY) {
        empty.push([row, col])
      }
    }
  }
  return empty
}

const lineScore = (count, openEnds) => {
  if (count >= 5) return 1000000
  if (count === 4 && openEnds === 2) return 100000
  if (count === 4 && openEnds === 1) return 10000
  if (count === 3 && openEnds === 2) return 5000
  if (count === 3 && openEnds === 1) return 500
  if (count === 2 && openEnds === 2) return 200
  if (count === 2 && openEnds === 1) return 50
  if (count === 1 && openEnds === 2) return 10
  return 1
}

const evaluateMove = (board, row, col, player) => {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1]
  ]

  return directions.reduce((total, [dr, dc]) => {
    let count = 1
    let openEnds = 0

    let r = row + dr
    let c = col + dc
    while (inBounds(r, c) && board[r][c] === player) {
      count += 1
      r += dr
      c += dc
    }
    if (inBounds(r, c) && board[r][c] === EMPTY) openEnds += 1

    r = row - dr
    c = col - dc
    while (inBounds(r, c) && board[r][c] === player) {
      count += 1
      r -= dr
      c -= dc
    }
    if (inBounds(r, c) && board[r][c] === EMPTY) openEnds += 1

    return total + lineScore(count, openEnds)
  }, 0)
}

const isWinningMove = (board, row, col, player) => {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1]
  ]

  return directions.some(([dr, dc]) => {
    let count = 1
    let r = row + dr
    let c = col + dc

    while (inBounds(r, c) && board[r][c] === player) {
      count += 1
      r += dr
      c += dc
    }

    r = row - dr
    c = col - dc

    while (inBounds(r, c) && board[r][c] === player) {
      count += 1
      r -= dr
      c -= dc
    }

    return count >= 5
  })
}

export const useGameStore = defineStore('game', {
  state: () => ({
    board: createBoard(),
    mode: MODE_LOCAL,
    currentPlayer: BLACK,
    status: 'playing',
    winner: EMPTY
  }),
  getters: {
    currentPlayerLabel: (state) => {
      if (state.mode === MODE_AI_HARD) {
        return state.currentPlayer === BLACK ? 'Player (Black)' : 'AI (White)'
      }
      return state.currentPlayer === BLACK ? 'Black' : 'White'
    },
    winnerLabel: (state) => {
      if (state.mode === MODE_AI_HARD) {
        if (state.winner === BLACK) return 'Player (Black)'
        if (state.winner === WHITE) return 'AI (White)'
        return ''
      }
      if (state.winner === BLACK) return 'Black'
      if (state.winner === WHITE) return 'White'
      return ''
    }
  },
  actions: {
    restart() {
      this.board = createBoard()
      this.currentPlayer = BLACK
      this.status = 'playing'
      this.winner = EMPTY
    },
    setMode(mode) {
      if (mode !== MODE_LOCAL && mode !== MODE_AI_HARD) return
      if (this.mode === mode) return
      this.mode = mode
      this.restart()
    },
    applyMove(row, col, player) {
      const nextBoard = this.board.map((boardRow, rowIndex) => {
        if (rowIndex !== row) return boardRow
        return boardRow.map((cell, colIndex) => (colIndex === col ? player : cell))
      })
      this.board = nextBoard

      if (this.checkWin(row, col, player)) {
        this.status = 'won'
        this.winner = player
        return true
      }

      if (this.isBoardFull()) {
        this.status = 'draw'
        return true
      }

      return true
    },
    findAIMove() {
      const board = this.board
      const emptyCells = getEmptyCells(board)
      if (emptyCells.length === 0) return null

      if (!hasAnyStone(board)) {
        return [CENTER, CENTER]
      }

      for (const [row, col] of emptyCells) {
        if (isWinningMove(board, row, col, WHITE)) {
          return [row, col]
        }
      }

      for (const [row, col] of emptyCells) {
        if (isWinningMove(board, row, col, BLACK)) {
          return [row, col]
        }
      }

      let bestMove = emptyCells[0]
      let bestScore = -Infinity
      let bestAiScore = -Infinity
      let bestDistance = Infinity

      for (const [row, col] of emptyCells) {
        const aiScore = evaluateMove(board, row, col, WHITE)
        const playerScore = evaluateMove(board, row, col, BLACK)
        const distance = Math.abs(row - CENTER) + Math.abs(col - CENTER)
        const centerBonus = 8 - distance
        const totalScore = aiScore * 1.15 + playerScore + centerBonus

        if (
          totalScore > bestScore ||
          (totalScore === bestScore && aiScore > bestAiScore) ||
          (totalScore === bestScore &&
            aiScore === bestAiScore &&
            distance < bestDistance)
        ) {
          bestScore = totalScore
          bestAiScore = aiScore
          bestDistance = distance
          bestMove = [row, col]
        }
      }

      return bestMove
    },
    makeAIMove() {
      if (this.mode !== MODE_AI_HARD) return false
      if (this.status !== 'playing') return false
      if (this.currentPlayer !== WHITE) return false

      const move = this.findAIMove()
      if (!move) return false

      const [row, col] = move
      this.applyMove(row, col, WHITE)
      if (this.status === 'playing') {
        this.currentPlayer = BLACK
      }
      return true
    },
    placeStone(row, col) {
      if (this.status !== 'playing') return false
      if (!inBounds(row, col)) return false
      if (this.board[row][col] !== EMPTY) return false
      if (this.mode === MODE_AI_HARD && this.currentPlayer !== BLACK) return false

      const player = this.currentPlayer
      this.applyMove(row, col, player)

      if (this.status !== 'playing') return true

      if (this.mode === MODE_AI_HARD) {
        this.currentPlayer = WHITE
        this.makeAIMove()
        return true
      }

      this.currentPlayer = player === BLACK ? WHITE : BLACK
      return true
    },
    checkWin(row, col, player) {
      const directions = [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, -1]
      ]

      return directions.some(([dr, dc]) => {
        let count = 1
        let r = row + dr
        let c = col + dc

        while (inBounds(r, c) && this.board[r][c] === player) {
          count += 1
          r += dr
          c += dc
        }

        r = row - dr
        c = col - dc

        while (inBounds(r, c) && this.board[r][c] === player) {
          count += 1
          r -= dr
          c -= dc
        }

        return count >= 5
      })
    },
    isBoardFull() {
      for (let row = 0; row < BOARD_SIZE; row += 1) {
        for (let col = 0; col < BOARD_SIZE; col += 1) {
          if (this.board[row][col] === EMPTY) return false
        }
      }
      return true
    }
  }
})
