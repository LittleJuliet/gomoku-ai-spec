import { DIRECTIONS } from './constants.js';
import { isInBounds, isCellEmpty, getCell } from './boardUtils.js';

export function validateMove(game, x, y, playerId) {
  if (game.status !== 'in_progress') {
    return { valid: false, message: '对局已结束' };
  }
  if (playerId !== game.currentPlayerId) {
    return { valid: false, message: '当前不是你的回合' };
  }
  if (!isInBounds(x, y, game.boardSize)) {
    return { valid: false, message: '落子超出棋盘范围' };
  }
  if (!isCellEmpty(game.board, x, y)) {
    return { valid: false, message: '该位置已被占用' };
  }
  return { valid: true, message: '' };
}

function countInDirection(board, x, y, dx, dy, playerId, size) {
  let count = 0;
  let cx = x + dx;
  let cy = y + dy;
  while (isInBounds(cx, cy, size) && getCell(board, cx, cy) === playerId) {
    count += 1;
    cx += dx;
    cy += dy;
  }
  return count;
}

export function checkWin(board, x, y, playerId, boardSize) {
  return DIRECTIONS.some(([dx, dy]) => {
    const total =
      1 +
      countInDirection(board, x, y, dx, dy, playerId, boardSize) +
      countInDirection(board, x, y, -dx, -dy, playerId, boardSize);
    return total >= 5;
  });
}

export function isDraw(moveCount, boardSize) {
  return moveCount >= boardSize * boardSize;
}
