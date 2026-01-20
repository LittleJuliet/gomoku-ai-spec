import { ACTOR, BLACK, MODE, RESULT, STATUS, WHITE } from './constants.js';
import { inBounds, isEmpty, placeStone } from './board.js';
import { checkFiveInRow, isBoardFull } from './rules.js';
import { createMatchState } from './state.js';

let currentMatch = createMatchState();

export function createMatch(options = {}) {
  currentMatch = createMatchState(options);
  return currentMatch;
}

export function getMatch() {
  return currentMatch;
}

export function resetMatch(options = {}) {
  const mode = options.mode ?? currentMatch.mode;
  return createMatch({ mode });
}

export function setAiPending(value) {
  currentMatch.aiPending = value;
  return currentMatch;
}

export function placeMove(row, col, actor = ACTOR.HUMAN) {
  if (currentMatch.status === STATUS.ENDED) {
    return { ok: false, code: 'MATCH_ENDED', message: '对局已结束，请开始新局。' };
  }

  const size = currentMatch.boardSize;
  if (!inBounds(row, col, size)) {
    return { ok: false, code: 'OUT_OF_BOUNDS', message: '落子位置超出棋盘范围。' };
  }

  if (!isEmpty(currentMatch.board, row, col)) {
    return { ok: false, code: 'CELL_OCCUPIED', message: '该位置已有棋子。' };
  }

  if (currentMatch.mode === MODE.HUMAN_VS_AI && actor !== currentMatch.currentActor) {
    return { ok: false, code: 'NOT_YOUR_TURN', message: '当前不是你的回合。' };
  }

  const stone = currentMatch.mode === MODE.HUMAN_VS_AI
    ? (actor === ACTOR.AI ? WHITE : BLACK)
    : currentMatch.currentPlayer;
  placeStone(currentMatch.board, row, col, stone);
  currentMatch.lastMove = { row, col };
  currentMatch.moveCount += 1;

  if (checkFiveInRow(currentMatch.board, row, col, stone)) {
    currentMatch.status = STATUS.ENDED;
    if (currentMatch.mode === MODE.HUMAN_VS_AI) {
      currentMatch.result = actor === ACTOR.HUMAN ? RESULT.HUMAN_WIN : RESULT.AI_WIN;
    } else {
      currentMatch.result = stone === BLACK ? RESULT.BLACK_WIN : RESULT.WHITE_WIN;
    }
    return { ok: true, match: currentMatch };
  }

  if (isBoardFull(currentMatch.board)) {
    currentMatch.status = STATUS.ENDED;
    currentMatch.result = RESULT.DRAW;
    return { ok: true, match: currentMatch };
  }

  currentMatch.currentPlayer = stone === BLACK ? WHITE : BLACK;
  if (currentMatch.mode === MODE.HUMAN_VS_AI) {
    currentMatch.currentActor = actor === ACTOR.HUMAN ? ACTOR.AI : ACTOR.HUMAN;
  }
  return { ok: true, match: currentMatch };
}
