import { EMPTY } from '../constants.js';
import { inBounds, isEmpty } from '../board.js';

function countNeighbors(board, row, col) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) {
        continue;
      }
      const r = row + dr;
      const c = col + dc;
      if (!inBounds(r, c, board.length)) {
        continue;
      }
      if (board[r][c] !== EMPTY) {
        count += 1;
      }
    }
  }
  return count;
}

export function getCandidateMoves(board, options = {}) {
  const { radius = 2, maxCount = 12 } = options;
  const size = board.length;
  const candidates = new Map();
  let hasStones = false;

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (board[row][col] === EMPTY) {
        continue;
      }
      hasStones = true;
      for (let dr = -radius; dr <= radius; dr += 1) {
        for (let dc = -radius; dc <= radius; dc += 1) {
          const r = row + dr;
          const c = col + dc;
          if (!inBounds(r, c, size)) {
            continue;
          }
          if (!isEmpty(board, r, c)) {
            continue;
          }
          const key = `${r}:${c}`;
          if (!candidates.has(key)) {
            candidates.set(key, {
              row: r,
              col: c,
              score: countNeighbors(board, r, c)
            });
          }
        }
      }
    }
  }

  if (!hasStones) {
    const mid = Math.floor(size / 2);
    return [{ row: mid, col: mid }];
  }

  return Array.from(candidates.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount)
    .map(({ row, col }) => ({ row, col }));
}
