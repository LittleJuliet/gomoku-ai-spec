import Vue from 'vue'
import { defineStore } from 'pinia'
import {
  BOARD_SIZE,
  createEmptyBoard,
  hasFiveInRow,
  isBoardFull,
  isCellEmpty,
  isInside,
  nextPlayer
} from './gameEngine'

const initialState = () => ({
  boardSize: BOARD_SIZE,
  board: createEmptyBoard(BOARD_SIZE),
  currentPlayer: 'black',
  status: 'idle',
  winner: 'none',
  moveCount: 0
})

export const useGameStore = defineStore('game', {
  state: () => initialState(),
  actions: {
    startGame() {
      this.board = createEmptyBoard(BOARD_SIZE)
      this.currentPlayer = 'black'
      this.status = 'in_progress'
      this.winner = 'none'
      this.moveCount = 0
    },
    placeMove(x, y) {
      if (this.status === 'finished') {
        return { ok: false, reason: 'finished' }
      }
      if (!isInside(this.board, x, y)) {
        return { ok: false, reason: 'out_of_bounds' }
      }
      if (!isCellEmpty(this.board, x, y)) {
        return { ok: false, reason: 'occupied' }
      }

      const nextRow = [...this.board[y]]
      nextRow[x] = this.currentPlayer
      Vue.set(this.board, y, nextRow)
      this.moveCount += 1

      if (hasFiveInRow(this.board, x, y, this.currentPlayer)) {
        this.status = 'finished'
        this.winner = this.currentPlayer
        return { ok: true, finished: true }
      }

      if (isBoardFull(this.board)) {
        this.status = 'finished'
        this.winner = 'draw'
        return { ok: true, finished: true }
      }

      this.currentPlayer = nextPlayer(this.currentPlayer)
      return { ok: true, finished: false }
    },
    restartGame() {
      this.startGame()
    }
  }
})
