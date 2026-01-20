import { EMPTY } from './constants.js';

export function createBoard(size) {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => EMPTY));
}

export function inBounds(row, col, size) {
  return row >= 0 && row < size && col >= 0 && col < size;
}

export function isEmpty(board, row, col) {
  return board[row][col] === EMPTY;
}

export function placeStone(board, row, col, stone) {
  board[row][col] = stone;
}
