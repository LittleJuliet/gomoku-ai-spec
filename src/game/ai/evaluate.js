import { EMPTY } from '../constants.js';

const BASE_SCORES = {
  1: 2,
  2: 12,
  3: 80,
  4: 600,
  5: 100000
};

function segmentScore(length, openEnds) {
  if (length >= 5) {
    return BASE_SCORES[5];
  }
  const base = BASE_SCORES[length] || 0;
  if (openEnds === 2) {
    return base;
  }
  if (openEnds === 1) {
    return Math.floor(base * 0.5);
  }
  return Math.floor(base * 0.1);
}

function scoreLine(line, aiStone, humanStone) {
  let score = 0;
  let i = 0;

  while (i < line.length) {
    const stone = line[i];
    if (stone !== aiStone && stone !== humanStone) {
      i += 1;
      continue;
    }
    const start = i;
    while (i < line.length && line[i] === stone) {
      i += 1;
    }
    const end = i - 1;
    const length = end - start + 1;
    const leftOpen = start - 1 >= 0 && line[start - 1] === EMPTY;
    const rightOpen = i < line.length && line[i] === EMPTY;
    const openEnds = (leftOpen ? 1 : 0) + (rightOpen ? 1 : 0);
    const value = segmentScore(length, openEnds);
    score += stone === aiStone ? value : -value;
  }

  return score;
}

export function evaluateBoard(board, aiStone, humanStone) {
  const size = board.length;
  let total = 0;

  for (let row = 0; row < size; row += 1) {
    total += scoreLine(board[row], aiStone, humanStone);
  }

  for (let col = 0; col < size; col += 1) {
    const line = [];
    for (let row = 0; row < size; row += 1) {
      line.push(board[row][col]);
    }
    total += scoreLine(line, aiStone, humanStone);
  }

  for (let row = 0; row < size; row += 1) {
    const line = [];
    let r = row;
    let c = 0;
    while (r < size && c < size) {
      line.push(board[r][c]);
      r += 1;
      c += 1;
    }
    total += scoreLine(line, aiStone, humanStone);
  }

  for (let col = 1; col < size; col += 1) {
    const line = [];
    let r = 0;
    let c = col;
    while (r < size && c < size) {
      line.push(board[r][c]);
      r += 1;
      c += 1;
    }
    total += scoreLine(line, aiStone, humanStone);
  }

  for (let row = 0; row < size; row += 1) {
    const line = [];
    let r = row;
    let c = size - 1;
    while (r < size && c >= 0) {
      line.push(board[r][c]);
      r += 1;
      c -= 1;
    }
    total += scoreLine(line, aiStone, humanStone);
  }

  for (let col = size - 2; col >= 0; col -= 1) {
    const line = [];
    let r = 0;
    let c = col;
    while (r < size && c >= 0) {
      line.push(board[r][c]);
      r += 1;
      c -= 1;
    }
    total += scoreLine(line, aiStone, humanStone);
  }

  return total;
}

export function hasImmediateThreat(board, stone, checkFiveInRow) {
  const size = board.length;
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (board[row][col] !== EMPTY) {
        continue;
      }
      board[row][col] = stone;
      const wins = checkFiveInRow(board, row, col, stone);
      board[row][col] = EMPTY;
      if (wins) {
        return { row, col };
      }
    }
  }
  return null;
}
