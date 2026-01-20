import { defineStore } from 'pinia'

const BOARD_SIZE = 15
const EMPTY = 0
const BLACK = 1
const WHITE = 2

const createBoard = () =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(EMPTY))

const inBounds = (row, col) =>
  row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE

export const useGameStore = defineStore('game', {
  state: () => ({
    board: createBoard(),
    currentPlayer: BLACK,
    status: 'playing',
    winner: EMPTY
  }),
  getters: {
    currentPlayerLabel: (state) => (state.currentPlayer === BLACK ? 'Black' : 'White'),
    winnerLabel: (state) => {
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
    placeStone(row, col) {
      if (this.status !== 'playing') return false
      if (!inBounds(row, col)) return false
      if (this.board[row][col] !== EMPTY) return false

      const nextBoard = this.board.map((boardRow, rowIndex) => {
        if (rowIndex !== row) return boardRow
        return boardRow.map((cell, colIndex) =>
          colIndex === col ? this.currentPlayer : cell
        )
      })
      this.board = nextBoard

      if (this.checkWin(row, col, this.currentPlayer)) {
        this.status = 'won'
        this.winner = this.currentPlayer
        return true
      }

      if (this.isBoardFull()) {
        this.status = 'draw'
        return true
      }

      this.currentPlayer = this.currentPlayer === BLACK ? WHITE : BLACK
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
