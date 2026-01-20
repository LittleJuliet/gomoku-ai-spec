import { EMPTY } from '../constants.js';
import { checkFiveInRow, isBoardFull } from '../rules.js';
import { getCandidateMoves } from './candidates.js';
import { evaluateBoard } from './evaluate.js';

const WIN_SCORE = 1000000;

function sanitizeOptions(options) {
  const depth = Math.max(1, Math.min(options.depth, 4));
  const candidateLimit = Math.max(6, Math.min(options.candidateLimit, 16));
  const candidateRadius = Math.max(1, Math.min(options.candidateRadius, 3));
  return {
    depth,
    candidateLimit,
    candidateRadius
  };
}

function minimax(board, depth, maximizing, alpha, beta, aiStone, humanStone, options, lastMove, lastStone) {
  if (lastMove && checkFiveInRow(board, lastMove.row, lastMove.col, lastStone)) {
    return lastStone === aiStone ? WIN_SCORE - depth : -WIN_SCORE + depth;
  }

  if (depth === 0 || isBoardFull(board)) {
    return evaluateBoard(board, aiStone, humanStone);
  }

  const candidates = getCandidateMoves(board, {
    radius: options.candidateRadius,
    maxCount: options.candidateLimit
  });

  if (candidates.length === 0) {
    return evaluateBoard(board, aiStone, humanStone);
  }

  if (maximizing) {
    let best = -Infinity;
    for (const move of candidates) {
      board[move.row][move.col] = aiStone;
      const score = minimax(
        board,
        depth - 1,
        false,
        alpha,
        beta,
        aiStone,
        humanStone,
        options,
        move,
        aiStone
      );
      board[move.row][move.col] = EMPTY;
      best = Math.max(best, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
        break;
      }
    }
    return best;
  }

  let best = Infinity;
  for (const move of candidates) {
    board[move.row][move.col] = humanStone;
    const score = minimax(
      board,
      depth - 1,
      true,
      alpha,
      beta,
      aiStone,
      humanStone,
      options,
      move,
      humanStone
    );
    board[move.row][move.col] = EMPTY;
    best = Math.min(best, score);
    beta = Math.min(beta, score);
    if (beta <= alpha) {
      break;
    }
  }
  return best;
}

export function findBestMove(board, aiStone, humanStone, options) {
  const safeOptions = sanitizeOptions(options);
  const candidates = getCandidateMoves(board, {
    radius: safeOptions.candidateRadius,
    maxCount: safeOptions.candidateLimit
  });

  if (candidates.length === 0) {
    return null;
  }

  let bestMove = candidates[0];
  let bestScore = -Infinity;

  for (const move of candidates) {
    board[move.row][move.col] = aiStone;
    const score = minimax(
      board,
      safeOptions.depth - 1,
      false,
      -Infinity,
      Infinity,
      aiStone,
      humanStone,
      safeOptions,
      move,
      aiStone
    );
    board[move.row][move.col] = EMPTY;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
