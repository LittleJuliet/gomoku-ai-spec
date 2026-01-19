import { BOARD_SIZE, PLAYERS, EMPTY_CELL } from './constants.js';

function createId() {
  return `game-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export function createEmptyBoard(size = BOARD_SIZE) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => EMPTY_CELL)
  );
}

export function createPlayers() {
  return PLAYERS.map((player) => ({ ...player }));
}

export function createInitialGameState({
  status = 'idle',
  boardSize = BOARD_SIZE,
  startingPlayerId = PLAYERS[0].id
} = {}) {
  const players = createPlayers();
  return {
    id: createId(),
    status,
    boardSize,
    board: createEmptyBoard(boardSize),
    players,
    currentPlayerId: startingPlayerId,
    startedPlayerId: startingPlayerId,
    winnerPlayerId: null,
    result: null,
    moveCount: 0,
    moves: []
  };
}
