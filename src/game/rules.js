import { EMPTY } from './constants.js';

const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1]
];

export function checkFiveInRow(board, row, col, stone) {
  for (const [dr, dc] of DIRECTIONS) {
    let count = 1;

    count += countDirection(board, row, col, dr, dc, stone);
    count += countDirection(board, row, col, -dr, -dc, stone);

    if (count >= 5) {
      return true;
    }
  }
  return false;
}

function countDirection(board, row, col, dr, dc, stone) {
  let r = row + dr;
  let c = col + dc;
  let count = 0;

  while (board[r] && board[r][c] === stone) {
    count += 1;
    r += dr;
    c += dc;
  }

  return count;
}

export function isBoardFull(board) {
  return board.every((row) => row.every((cell) => cell !== EMPTY));
}
