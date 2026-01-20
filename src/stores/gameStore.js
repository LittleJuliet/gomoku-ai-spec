import { defineStore } from 'pinia';
import { BLACK, RESULT, STATUS, WHITE } from '../game/constants.js';
import { createMatch, getMatch, placeMove as servicePlaceMove, resetMatch as serviceResetMatch } from '../game/matchService.js';

function cloneBoard(board) {
  return board.map((row) => row.slice());
}

export const useGameStore = defineStore('game', {
  state: () => {
    const match = getMatch();
    return {
      board: cloneBoard(match.board),
      boardSize: match.boardSize,
      currentPlayer: match.currentPlayer,
      status: match.status,
      result: match.result,
      moveCount: match.moveCount,
      lastMove: match.lastMove,
      message: ''
    };
  },
  actions: {
    applyMatch(match) {
      this.board = cloneBoard(match.board);
      this.boardSize = match.boardSize;
      this.currentPlayer = match.currentPlayer;
      this.status = match.status;
      this.result = match.result;
      this.moveCount = match.moveCount;
      this.lastMove = match.lastMove;
    },
    newGame() {
      const match = createMatch();
      this.applyMatch(match);
      this.message = '';
    },
    switchTurn() {
      this.currentPlayer = this.currentPlayer === BLACK ? WHITE : BLACK;
    },
    setWinner(result) {
      this.result = result;
      this.status = STATUS.ENDED;
    },
    blockAfterEnd() {
      if (this.status === STATUS.ENDED) {
        return true;
      }
      return false;
    },
    placeMove(row, col) {
      const response = servicePlaceMove(row, col);
      if (!response.ok) {
        this.message = response.message;
        return;
      }

      this.applyMatch(response.match);
      this.message = '';
    },
    resetMatch() {
      const match = serviceResetMatch();
      this.applyMatch(match);
      this.message = '';
    }
  }
});
