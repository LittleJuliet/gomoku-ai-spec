export const BOARD_SIZE = 15;

export const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1]
];

export const PLAYERS = [
  { id: 'player-black', label: '黑方', color: 'black', stone: '●' },
  { id: 'player-white', label: '白方', color: 'white', stone: '○' }
];

export const EMPTY_CELL = null;
