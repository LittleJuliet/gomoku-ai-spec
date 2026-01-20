import { defineStore } from 'pinia';
import { ACTOR, BLACK, DIFFICULTY, MODE, RESULT, STATUS, WHITE } from '../game/constants.js';
import {
  createMatch,
  getMatch,
  placeMove as servicePlaceMove,
  resetMatch as serviceResetMatch,
  setAiPending
} from '../game/matchService.js';
import { chooseAIMove, DEFAULT_AI_CONFIG } from '../game/ai/index.js';

function cloneBoard(board) {
  return board.map((row) => row.slice());
}

function normalizeResult(match) {
  if (match.mode !== MODE.HUMAN_VS_AI) {
    return match.result;
  }
  if (match.result === RESULT.BLACK_WIN) {
    return RESULT.HUMAN_WIN;
  }
  if (match.result === RESULT.WHITE_WIN) {
    return RESULT.AI_WIN;
  }
  return match.result;
}

export const useGameStore = defineStore('game', {
  state: () => {
    const match = getMatch();
    return {
      board: cloneBoard(match.board),
      boardSize: match.boardSize,
      currentPlayer: match.currentPlayer,
      currentActor: match.currentActor,
      status: match.status,
      result: match.result,
      moveCount: match.moveCount,
      lastMove: match.lastMove,
      gameMode: match.mode,
      difficulty: match.difficulty,
      aiPending: match.aiPending,
      aiToken: 0,
      message: ''
    };
  },
  actions: {
    applyMatch(match) {
      this.board = cloneBoard(match.board);
      this.boardSize = match.boardSize;
      this.currentPlayer = match.currentPlayer;
      this.currentActor = match.currentActor;
      this.status = match.status;
      this.result = normalizeResult(match);
      this.moveCount = match.moveCount;
      this.lastMove = match.lastMove;
      this.gameMode = match.mode;
      this.difficulty = match.difficulty;
      this.aiPending = match.aiPending;
    },
    setAiPendingState(value) {
      this.aiPending = value;
      setAiPending(value);
    },
    cancelAi() {
      this.aiToken += 1;
      this.setAiPendingState(false);
    },
    startLocalMatch() {
      this.cancelAi();
      const match = createMatch({ mode: MODE.LOCAL });
      this.applyMatch(match);
      this.message = '';
    },
    startHumanVsAi() {
      this.cancelAi();
      const match = createMatch({ mode: MODE.HUMAN_VS_AI, difficulty: DIFFICULTY.EXTREME });
      this.applyMatch(match);
      this.message = '';
    },
    setMode(mode) {
      if (this.gameMode === mode) {
        return;
      }
      if (mode === MODE.HUMAN_VS_AI) {
        this.startHumanVsAi();
        return;
      }
      this.startLocalMatch();
    },
    newGame() {
      if (this.gameMode === MODE.HUMAN_VS_AI) {
        this.startHumanVsAi();
        return;
      }
      this.startLocalMatch();
    },
    scheduleAiMove() {
      if (this.gameMode !== MODE.HUMAN_VS_AI || this.status === STATUS.ENDED) {
        return;
      }
      const token = this.aiToken + 1;
      this.aiToken = token;
      this.setAiPendingState(true);

      const boardSnapshot = cloneBoard(this.board);
      const aiStone = WHITE;
      const humanStone = BLACK;

      setTimeout(() => {
        if (token !== this.aiToken) {
          return;
        }
        const move = chooseAIMove(boardSnapshot, aiStone, humanStone, DEFAULT_AI_CONFIG);
        if (token !== this.aiToken) {
          return;
        }
        if (!move) {
          this.setAiPendingState(false);
          return;
        }
        const response = servicePlaceMove(move.row, move.col, ACTOR.AI);
        if (!response.ok) {
          this.message = response.message;
          this.setAiPendingState(false);
          return;
        }
        this.applyMatch(response.match);
        this.setAiPendingState(false);
        this.message = '';
      }, 80);
    },
    placeMove(row, col) {
      if (this.gameMode === MODE.HUMAN_VS_AI && (this.aiPending || this.currentActor === ACTOR.AI)) {
        this.message = 'AI 思考中，请稍候。';
        return;
      }

      const response = servicePlaceMove(
        row,
        col,
        this.gameMode === MODE.HUMAN_VS_AI ? ACTOR.HUMAN : undefined
      );
      if (!response.ok) {
        this.message = response.message;
        return;
      }

      this.applyMatch(response.match);
      this.message = '';

      if (this.gameMode === MODE.HUMAN_VS_AI && response.match.status !== STATUS.ENDED) {
        this.scheduleAiMove();
      }
    },
    resetMatch() {
      this.cancelAi();
      const match = serviceResetMatch({ mode: this.gameMode });
      this.applyMatch(match);
      this.message = '';
    }
  }
});
