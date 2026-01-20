import { BOARD_SIZE, BLACK, RESULT, STATUS } from './constants.js';
import { createBoard } from './board.js';

export function createMatchState() {
  return {
    id: `match_${Date.now()}`,
    status: STATUS.IN_PROGRESS,
    result: RESULT.NONE,
    boardSize: BOARD_SIZE,
    currentPlayer: BLACK,
    moveCount: 0,
    board: createBoard(BOARD_SIZE),
    lastMove: null
  };
}
