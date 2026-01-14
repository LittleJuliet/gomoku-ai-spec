import Vue from 'vue'
import { defineStore } from 'pinia'
import {
  BOARD_SIZE,
  createEmptyBoard,
  isBoardFull,
  isCellEmpty,
  isInside
} from '../game/board'
import { hasFiveInRow } from '../game/rules'
import { getBestMove } from '../game/ai'

const initialState = () => ({
  boardSize: BOARD_SIZE,
  board: createEmptyBoard(BOARD_SIZE),
  currentTurn: 'black',
  status: 'idle',
  result: 'ongoing',
  moveCount: 0,
  isAiThinking: false,
  lastError: null
})

export const useAiGameStore = defineStore('aiGame', {
  state: () => initialState(),
  actions: {
    startGame() {
      this.board = createEmptyBoard(BOARD_SIZE)
      this.currentTurn = 'black'
      this.status = 'in_progress'
      this.result = 'ongoing'
      this.moveCount = 0
      this.isAiThinking = false
      this.lastError = null
    },
    restartGame() {
      this.startGame()
    },
    setError(reason) {
      this.lastError = reason
      return { ok: false, reason }
    },
    applyMove(x, y, color) {
      const nextRow = [...this.board[y]]
      nextRow[x] = color
      Vue.set(this.board, y, nextRow)
      this.moveCount += 1
    },
    finishGame(result) {
      this.status = 'finished'
      this.result = result
      this.currentTurn = result === 'black_win' ? 'black' : result === 'white_win' ? 'white' : this.currentTurn
      this.isAiThinking = false
    },
    playerMove(x, y) {
      if (this.status === 'finished') {
        return this.setError('finished')
      }
      if (this.currentTurn !== 'black' || this.isAiThinking) {
        return this.setError('not_your_turn')
      }
      if (!isInside(this.board, x, y)) {
        return this.setError('out_of_bounds')
      }
      if (!isCellEmpty(this.board, x, y)) {
        return this.setError('occupied')
      }

      this.lastError = null
      this.applyMove(x, y, 'black')

      if (hasFiveInRow(this.board, x, y, 'black')) {
        this.finishGame('black_win')
        return { ok: true, finished: true }
      }

      if (isBoardFull(this.board)) {
        this.finishGame('draw')
        return { ok: true, finished: true }
      }

      this.currentTurn = 'white'
      this.runAiMove()
      return { ok: true, finished: false }
    },
    runAiMove() {
      this.isAiThinking = true
      this.lastError = null

      setTimeout(() => {
        if (this.status !== 'in_progress' || this.currentTurn !== 'white') {
          this.isAiThinking = false
          return
        }

        const move = getBestMove(this.board, 'white', {
          timeLimitMs: 1800,
          maxDepth: 3
        })

        if (!move) {
          this.finishGame('draw')
          return
        }

        if (!isCellEmpty(this.board, move.x, move.y)) {
          this.finishGame('draw')
          return
        }

        this.applyMove(move.x, move.y, 'white')

        if (hasFiveInRow(this.board, move.x, move.y, 'white')) {
          this.finishGame('white_win')
          return
        }

        if (isBoardFull(this.board)) {
          this.finishGame('draw')
          return
        }

        this.currentTurn = 'black'
        this.isAiThinking = false
      }, 0)
    }
  }
})
