import { defineStore } from 'pinia';
import { createInitialGameState } from '../game/initialState.js';
import { applyMove } from '../game/engine.js';
import { PLAYERS } from '../game/constants.js';

export const useGameStore = defineStore('game', {
  state: () => ({
    game: createInitialGameState({ status: 'idle' }),
    message: '准备开始对局',
    error: ''
  }),
  getters: {
    currentPlayer(state) {
      return state.game.players.find(
        (player) => player.id === state.game.currentPlayerId
      );
    },
    isFinished(state) {
      return state.game.status === 'finished';
    },
    isInProgress(state) {
      return state.game.status === 'in_progress';
    },
    winner(state) {
      if (!state.game.winnerPlayerId) {
        return null;
      }
      return state.game.players.find(
        (player) => player.id === state.game.winnerPlayerId
      );
    }
  },
  actions: {
    setMessage(message) {
      this.message = message;
    },
    startGame() {
      const startingPlayerId = PLAYERS[0].id;
      this.game = createInitialGameState({
        status: 'in_progress',
        startingPlayerId
      });
      this.error = '';
      this.message = `${this.currentPlayer.label} 请落子`;
    },
    placeMove(x, y) {
      if (this.game.status === 'idle') {
        this.startGame();
      }
      const { game, error } = applyMove(this.game, x, y, this.game.currentPlayerId);
      if (error) {
        this.error = error;
        return;
      }
      this.game = game;
      this.error = '';

      if (this.game.status === 'finished') {
        if (this.game.result === 'win' && this.winner) {
          this.message = `${this.winner.label} 获胜`; 
        } else {
          this.message = '和局';
        }
      } else {
        this.message = `${this.currentPlayer.label} 请落子`;
      }
    },
    restartGame() {
      this.startGame();
    },
    clearError() {
      this.error = '';
    }
  }
});
