import { ACTOR, BLACK, BOARD_SIZE, DIFFICULTY, MODE, RESULT, STATUS } from './constants.js';
import { createBoard } from './board.js';

export function createMatchState(options = {}) {
  const { mode = MODE.LOCAL, difficulty: requestedDifficulty } = options;
  const difficulty = mode === MODE.HUMAN_VS_AI ? (requestedDifficulty ?? DIFFICULTY.EXTREME) : null;
  return {
    id: `match_${Date.now()}`,
    mode,
    difficulty,
    status: STATUS.IN_PROGRESS,
    result: RESULT.NONE,
    boardSize: BOARD_SIZE,
    currentPlayer: BLACK,
    currentActor: mode === MODE.HUMAN_VS_AI ? ACTOR.HUMAN : null,
    aiPending: false,
    moveCount: 0,
    board: createBoard(BOARD_SIZE),
    lastMove: null
  };
}
