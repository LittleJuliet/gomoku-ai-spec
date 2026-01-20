import { EMPTY } from '../constants.js';
import { checkFiveInRow } from '../rules.js';
import { getCandidateMoves } from './candidates.js';
import { findBestMove } from './minimax.js';

export const DEFAULT_AI_CONFIG = {
  depth: 3,
  candidateRadius: 2,
  candidateLimit: 10
};

function resolveImmediateMove(board, stone, candidates) {
  for (const move of candidates) {
    board[move.row][move.col] = stone;
    const wins = checkFiveInRow(board, move.row, move.col, stone);
    board[move.row][move.col] = EMPTY;
    if (wins) {
      return move;
    }
  }
  return null;
}

export function chooseAIMove(board, aiStone, humanStone, config = {}) {
  const options = {
    ...DEFAULT_AI_CONFIG,
    ...config
  };
  const candidates = getCandidateMoves(board, {
    radius: options.candidateRadius,
    maxCount: options.candidateLimit
  });

  if (candidates.length === 0) {
    return null;
  }

  const winningMove = resolveImmediateMove(board, aiStone, candidates);
  if (winningMove) {
    return winningMove;
  }

  const blockingMove = resolveImmediateMove(board, humanStone, candidates);
  if (blockingMove) {
    return blockingMove;
  }

  return findBestMove(board, aiStone, humanStone, options);
}
