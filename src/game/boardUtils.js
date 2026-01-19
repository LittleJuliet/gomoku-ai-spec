export function isInBounds(x, y, size) {
  return x >= 0 && y >= 0 && x < size && y < size;
}

export function getCell(board, x, y) {
  if (!board[y]) {
    return undefined;
  }
  return board[y][x];
}

export function isCellEmpty(board, x, y) {
  return getCell(board, x, y) == null;
}

export function cloneBoard(board) {
  return board.map((row) => row.slice());
}
