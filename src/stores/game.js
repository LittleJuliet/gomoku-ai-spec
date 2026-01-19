// 游戏状态仓库：保存棋盘、模式、回合与胜负信息并提供落子动作。
import { defineStore } from 'pinia'
import { BOARD_SIZE, createEmptyBoard, checkWin } from '../utils/rules'
import { getBestMove } from '../utils/ai'

export const useGameStore = defineStore('game', {
  state: () => ({
    board: createEmptyBoard(BOARD_SIZE),
    mode: 'ai',
    currentPlayer: 1,
    winner: null,
    isDraw: false,
    moveCount: 0,
    lastMove: null,
    isAiThinking: false
  }),
  getters: {
    boardSize: (state) => state.board.length,
    isGameOver: (state) => state.winner !== null || state.isDraw,
    isAiMode: (state) => state.mode === 'ai',
    isAiTurn: (state) =>
      state.mode === 'ai' && state.currentPlayer === 2 && state.winner === null && !state.isDraw,
    modeLabel: (state) => (state.mode === 'ai' ? '人机对战' : '双人对战'),
    playerLabel: (state) => (player) => {
      if (state.mode === 'ai') {
        return player === 1 ? '玩家' : '电脑'
      }
      return player === 1 ? '黑子' : '白子'
    },
    currentPlayerName() {
      return this.playerLabel(this.currentPlayer)
    },
    winnerName() {
      if (this.winner === null) return ''
      return this.playerLabel(this.winner)
    }
  },
  actions: {
    reset() {
      this.board = createEmptyBoard(BOARD_SIZE)
      this.currentPlayer = 1
      this.winner = null
      this.isDraw = false
      this.moveCount = 0
      this.lastMove = null
      this.isAiThinking = false
    },
    setMode(mode) {
      if (this.mode === mode) {
        return
      }
      this.mode = mode
      this.reset()
    },
    applyMove(row, col, player) {
      if (this.winner !== null || this.isDraw) {
        return false
      }
      if (!this.board[row] || this.board[row][col] !== 0) {
        return false
      }
      this.board[row].splice(col, 1, player)
      this.lastMove = { row, col, player }
      this.moveCount += 1

      if (checkWin(this.board, row, col, player)) {
        this.winner = player
        return true
      }

      const maxMoves = this.board.length * this.board.length
      if (this.moveCount >= maxMoves) {
        this.isDraw = true
        return true
      }

      this.currentPlayer = player === 1 ? 2 : 1
      return true
    },
    playHumanMove(row, col) {
      if (this.isGameOver || this.isAiThinking) {
        return false
      }
      if (this.isAiMode && this.currentPlayer !== 1) {
        return false
      }
      const moved = this.applyMove(row, col, this.currentPlayer)
      if (!moved) {
        return false
      }
      if (this.isAiMode && !this.isGameOver) {
        this.queueAiMove()
      }
      return true
    },
    queueAiMove() {
      if (!this.isAiTurn || this.isGameOver) {
        return
      }
      this.isAiThinking = true
      setTimeout(() => {
        if (!this.isAiTurn || this.isGameOver) {
          this.isAiThinking = false
          return
        }
        const bestMove = getBestMove(this.board, 2, 450)
        if (bestMove) {
          this.applyMove(bestMove.row, bestMove.col, 2)
        }
        this.isAiThinking = false
      }, 0)
    }
  }
})
