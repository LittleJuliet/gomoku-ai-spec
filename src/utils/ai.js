// AI 引擎：提供候选点生成、局面评分与搜索决策。
import { checkWin } from './rules'

const MAX_DEPTH = 3
const MAX_CANDIDATES = 12
const WIN_SCORE = 10000000

const SCORE_TABLE = {
  five: 1000000,
  openFour: 100000,
  blockedFour: 20000,
  openThree: 5000,
  blockedThree: 1000,
  openTwo: 200,
  blockedTwo: 50,
  openOne: 10,
  blockedOne: 1
}

const getOpponent = (player) => (player === 1 ? 2 : 1)

const isBoardFull = (board) => {
  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board.length; col += 1) {
      if (board[row][col] === 0) {
        return false
      }
    }
  }
  return true
}

const getCenter = (size) => Math.floor(size / 2)

const buildLine = (board, startRow, startCol, dr, dc) => {
  const size = board.length
  const line = []
  let row = startRow
  let col = startCol
  while (row >= 0 && col >= 0 && row < size && col < size) {
    line.push(board[row][col])
    row += dr
    col += dc
  }
  return line
}

const collectLines = (board) => {
  const size = board.length
  const lines = []
  for (let row = 0; row < size; row += 1) {
    lines.push([...board[row]])
  }
  for (let col = 0; col < size; col += 1) {
    const line = []
    for (let row = 0; row < size; row += 1) {
      line.push(board[row][col])
    }
    lines.push(line)
  }
  for (let col = 0; col < size; col += 1) {
    lines.push(buildLine(board, 0, col, 1, 1))
  }
  for (let row = 1; row < size; row += 1) {
    lines.push(buildLine(board, row, 0, 1, 1))
  }
  for (let col = 0; col < size; col += 1) {
    lines.push(buildLine(board, 0, col, 1, -1))
  }
  for (let row = 1; row < size; row += 1) {
    lines.push(buildLine(board, row, size - 1, 1, -1))
  }
  return lines
}

const scoreSequence = (count, openEnds) => {
  if (count >= 5) {
    return SCORE_TABLE.five
  }
  if (count === 4) {
    if (openEnds === 2) return SCORE_TABLE.openFour
    if (openEnds === 1) return SCORE_TABLE.blockedFour
  }
  if (count === 3) {
    if (openEnds === 2) return SCORE_TABLE.openThree
    if (openEnds === 1) return SCORE_TABLE.blockedThree
  }
  if (count === 2) {
    if (openEnds === 2) return SCORE_TABLE.openTwo
    if (openEnds === 1) return SCORE_TABLE.blockedTwo
  }
  if (count === 1) {
    if (openEnds === 2) return SCORE_TABLE.openOne
    if (openEnds === 1) return SCORE_TABLE.blockedOne
  }
  return 0
}

const scoreLine = (line, player) => {
  let score = 0
  let index = 0
  while (index < line.length) {
    if (line[index] !== player) {
      index += 1
      continue
    }
    let count = 0
    const start = index
    while (index < line.length && line[index] === player) {
      count += 1
      index += 1
    }
    const left = start - 1 >= 0 ? line[start - 1] : null
    const right = index < line.length ? line[index] : null
    let openEnds = 0
    if (left === 0) openEnds += 1
    if (right === 0) openEnds += 1
    score += scoreSequence(count, openEnds)
  }
  return score
}

const evaluateBoard = (board, player) => {
  const opponent = getOpponent(player)
  const lines = collectLines(board)
  let playerScore = 0
  let opponentScore = 0
  lines.forEach((line) => {
    playerScore += scoreLine(line, player)
    opponentScore += scoreLine(line, opponent)
  })
  const size = board.length
  const center = getCenter(size)
  let centerScore = 0
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (board[row][col] === player) {
        const distance = Math.abs(row - center) + Math.abs(col - center)
        centerScore += Math.max(0, 6 - distance)
      }
    }
  }
  return playerScore - opponentScore * 1.05 + centerScore * 2
}

const getAdjacencyScore = (board, row, col) => {
  let score = 0
  for (let dr = -2; dr <= 2; dr += 1) {
    for (let dc = -2; dc <= 2; dc += 1) {
      if (dr === 0 && dc === 0) continue
      const r = row + dr
      const c = col + dc
      if (!board[r] || board[r][c] === undefined) continue
      if (board[r][c] !== 0) {
        score += Math.abs(dr) <= 1 && Math.abs(dc) <= 1 ? 3 : 1
      }
    }
  }
  return score
}

const getCandidateMoves = (board) => {
  const size = board.length
  const candidates = new Map()
  let hasStone = false
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (board[row][col] === 0) {
        continue
      }
      hasStone = true
      for (let dr = -2; dr <= 2; dr += 1) {
        for (let dc = -2; dc <= 2; dc += 1) {
          if (dr === 0 && dc === 0) continue
          const r = row + dr
          const c = col + dc
          if (r < 0 || c < 0 || r >= size || c >= size) {
            continue
          }
          if (board[r][c] !== 0) {
            continue
          }
          const key = `${r}-${c}`
          if (!candidates.has(key)) {
            candidates.set(key, { row: r, col: c, score: 0 })
          }
        }
      }
    }
  }
  if (!hasStone) {
    const center = getCenter(size)
    return [{ row: center, col: center, score: 0 }]
  }
  candidates.forEach((value) => {
    value.score = getAdjacencyScore(board, value.row, value.col)
  })
  return Array.from(candidates.values()).sort((a, b) => b.score - a.score)
}

const minimax = (board, depth, alpha, beta, maximizing, player, startTime, timeLimit) => {
  if (Date.now() - startTime > timeLimit) {
    return { score: evaluateBoard(board, player), timedOut: true }
  }
  if (depth === 0) {
    return { score: evaluateBoard(board, player) }
  }
  const opponent = getOpponent(player)
  const currentPlayer = maximizing ? player : opponent
  const moves = getCandidateMoves(board).slice(0, MAX_CANDIDATES)
  if (!moves.length) {
    return { score: 0 }
  }
  let bestMove = moves[0]
  if (maximizing) {
    let bestScore = -Infinity
    for (const move of moves) {
      board[move.row][move.col] = currentPlayer
      let score = 0
      if (checkWin(board, move.row, move.col, currentPlayer)) {
        score = WIN_SCORE
      } else if (isBoardFull(board)) {
        score = 0
      } else {
        const result = minimax(board, depth - 1, alpha, beta, false, player, startTime, timeLimit)
        if (result.timedOut) {
          board[move.row][move.col] = 0
          return { score: result.score, timedOut: true, move: bestMove }
        }
        score = result.score
      }
      board[move.row][move.col] = 0
      if (score > bestScore) {
        bestScore = score
        bestMove = move
      }
      alpha = Math.max(alpha, bestScore)
      if (beta <= alpha) {
        break
      }
    }
    return { score: bestScore, move: bestMove }
  }
  let bestScore = Infinity
  for (const move of moves) {
    board[move.row][move.col] = currentPlayer
    let score = 0
    if (checkWin(board, move.row, move.col, currentPlayer)) {
      score = -WIN_SCORE
    } else if (isBoardFull(board)) {
      score = 0
    } else {
      const result = minimax(board, depth - 1, alpha, beta, true, player, startTime, timeLimit)
      if (result.timedOut) {
        board[move.row][move.col] = 0
        return { score: result.score, timedOut: true, move: bestMove }
      }
      score = result.score
    }
    board[move.row][move.col] = 0
    if (score < bestScore) {
      bestScore = score
      bestMove = move
    }
    beta = Math.min(beta, bestScore)
    if (beta <= alpha) {
      break
    }
  }
  return { score: bestScore, move: bestMove }
}

export const getBestMove = (board, player = 2, timeLimit = 450) => {
  const candidates = getCandidateMoves(board)
  const opponent = getOpponent(player)
  if (!candidates.length) {
    return null
  }
  for (const move of candidates) {
    board[move.row][move.col] = player
    const win = checkWin(board, move.row, move.col, player)
    board[move.row][move.col] = 0
    if (win) {
      return { row: move.row, col: move.col }
    }
  }
  const blockMoves = []
  for (const move of candidates) {
    board[move.row][move.col] = opponent
    const win = checkWin(board, move.row, move.col, opponent)
    board[move.row][move.col] = 0
    if (win) {
      blockMoves.push(move)
    }
  }
  if (blockMoves.length) {
    blockMoves.sort((a, b) => b.score - a.score)
    return { row: blockMoves[0].row, col: blockMoves[0].col }
  }
  const startTime = Date.now()
  let bestMove = candidates[0]
  for (let depth = 1; depth <= MAX_DEPTH; depth += 1) {
    const result = minimax(board, depth, -Infinity, Infinity, true, player, startTime, timeLimit)
    if (result.timedOut) {
      break
    }
    if (result.move) {
      bestMove = result.move
    }
  }
  return { row: bestMove.row, col: bestMove.col }
}
