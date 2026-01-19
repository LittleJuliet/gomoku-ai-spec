// 游戏状态仓库：保存棋盘、回合与胜负信息并提供落子动作。
import { defineStore } from 'pinia'
import { BOARD_SIZE, createEmptyBoard, checkWin } from '../utils/rules'

export const useGameStore = defineStore('game', {
  state: () => ({
    board: createEmptyBoard(BOARD_SIZE),
    currentPlayer: 1,
    winner: null,
    moveCount: 0,
    lastMove: null
  }),
  getters: {
    boardSize: (state) => state.board.length,
    currentPlayerName: (state) => (state.currentPlayer === 1 ? '黑子' : '白子')
  },
  actions: {
    reset() {
      this.board = createEmptyBoard(BOARD_SIZE)
      this.currentPlayer = 1
      this.winner = null
      this.moveCount = 0
      this.lastMove = null
    },
    placeMove(row, col) {
      if (this.winner) {
        return false
      }
      if (!this.board[row] || this.board[row][col] !== 0) {
        return false
      }
      this.board[row].splice(col, 1, this.currentPlayer)
      this.lastMove = { row, col }
      this.moveCount += 1

      if (checkWin(this.board, row, col, this.currentPlayer)) {
        this.winner = this.currentPlayer
        return true
      }

      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
      return true
    }
  }
})
