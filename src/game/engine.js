import { cloneBoard } from './boardUtils.js';
import { checkWin, isDraw, validateMove } from './rules.js';

function createMove(game, x, y, playerId) {
  return {
    id: `${game.id}-${game.moveCount + 1}`,
    order: game.moveCount + 1,
    playerId,
    x,
    y
  };
}

export function applyMove(game, x, y, playerId) {
  const validation = validateMove(game, x, y, playerId);
  if (!validation.valid) {
    return { game, error: validation.message };
  }

  const board = cloneBoard(game.board);
  board[y][x] = playerId;

  const move = createMove(game, x, y, playerId);
  const moves = [...game.moves, move];
  const moveCount = game.moveCount + 1;

  const hasWin = checkWin(board, x, y, playerId, game.boardSize);
  const hasDraw = !hasWin && isDraw(moveCount, game.boardSize);

  let status = 'in_progress';
  let winnerPlayerId = null;
  let result = null;

  if (hasWin) {
    status = 'finished';
    winnerPlayerId = playerId;
    result = 'win';
  } else if (hasDraw) {
    status = 'finished';
    result = 'draw';
  }

  const nextPlayerId =
    playerId === game.players[0].id ? game.players[1].id : game.players[0].id;

  return {
    game: {
      ...game,
      board,
      moves,
      moveCount,
      status,
      winnerPlayerId,
      result,
      currentPlayerId: status === 'finished' ? playerId : nextPlayerId
    },
    error: ''
  };
}
