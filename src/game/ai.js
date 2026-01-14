import { isBoardFull, isInside, isCellEmpty, placeStone } from './board'
import { hasFiveInRow, findWinner } from './rules'

const DEFAULT_TIME_LIMIT_MS = 1800
const DEFAULT_MAX_DEPTH = 3
const SEARCH_RADIUS = 2

function getCandidateMoves(board) {
  const size = board.length
  const candidates = new Set()
  let hasStone = false

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (board[y][x] === 'empty') continue
      hasStone = true
      for (let dy = -SEARCH_RADIUS; dy <= SEARCH_RADIUS; dy += 1) {
        for (let dx = -SEARCH_RADIUS; dx <= SEARCH_RADIUS; dx += 1) {
          const nx = x + dx
          const ny = y + dy
          if (!isInside(board, nx, ny)) continue
          if (isCellEmpty(board, nx, ny)) {
            candidates.add(`${nx},${ny}`)
          }
        }
      }
    }
  }

  if (!hasStone) {
    const center = Math.floor(size / 2)
    return [{ x: center, y: center }]
  }

  if (candidates.size === 0) {
    const all = []
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        if (board[y][x] === 'empty') {
          all.push({ x, y })
        }
      }
    }
    return all
  }

  return Array.from(candidates).map((key) => {
    const [x, y] = key.split(',').map(Number)
    return { x, y }
  })
}

function findImmediateMove(board, player, candidates) {
  for (const move of candidates) {
    const next = placeStone(board, move.x, move.y, player)
    if (hasFiveInRow(next, move.x, move.y, player)) {
      return move
    }
  }
  return null
}

function scorePattern(length, openEnds) {
  if (length >= 5) return 1000000
  if (length === 4) return openEnds === 2 ? 100000 : openEnds === 1 ? 10000 : 1000
  if (length === 3) return openEnds === 2 ? 10000 : openEnds === 1 ? 1000 : 100
  if (length === 2) return openEnds === 2 ? 500 : openEnds === 1 ? 50 : 10
  if (length === 1) return openEnds === 2 ? 10 : openEnds === 1 ? 5 : 1
  return 0
}

function scoreLine(line, player) {
  let score = 0
  let i = 0
  while (i < line.length) {
    if (line[i] !== player) {
      i += 1
      continue
    }
    const start = i
    while (i < line.length && line[i] === player) {
      i += 1
    }
    const end = i - 1
    const length = end - start + 1
    const leftOpen = start - 1 >= 0 && line[start - 1] === 'empty'
    const rightOpen = i < line.length && line[i] === 'empty'
    const openEnds = (leftOpen ? 1 : 0) + (rightOpen ? 1 : 0)
    score += scorePattern(length, openEnds)
  }
  return score
}

function scoreForPlayer(board, player) {
  const size = board.length
  let score = 0

  for (let y = 0; y < size; y += 1) {
    score += scoreLine(board[y], player)
  }

  for (let x = 0; x < size; x += 1) {
    const line = []
    for (let y = 0; y < size; y += 1) {
      line.push(board[y][x])
    }
    score += scoreLine(line, player)
  }

  for (let startX = 0; startX < size; startX += 1) {
    const line = []
    let x = startX
    let y = 0
    while (x < size && y < size) {
      line.push(board[y][x])
      x += 1
      y += 1
    }
    score += scoreLine(line, player)
  }
  for (let startY = 1; startY < size; startY += 1) {
    const line = []
    let x = 0
    let y = startY
    while (x < size && y < size) {
      line.push(board[y][x])
      x += 1
      y += 1
    }
    score += scoreLine(line, player)
  }

  for (let startX = 0; startX < size; startX += 1) {
    const line = []
    let x = startX
    let y = size - 1
    while (x < size && y >= 0) {
      line.push(board[y][x])
      x += 1
      y -= 1
    }
    score += scoreLine(line, player)
  }
  for (let startY = size - 2; startY >= 0; startY -= 1) {
    const line = []
    let x = 0
    let y = startY
    while (x < size && y >= 0) {
      line.push(board[y][x])
      x += 1
      y -= 1
    }
    score += scoreLine(line, player)
  }

  return score
}

function evaluateBoard(board, aiColor, humanColor) {
  return scoreForPlayer(board, aiColor) - scoreForPlayer(board, humanColor)
}

function minimax(board, depth, maximizing, alpha, beta, aiColor, humanColor, startTime, timeLimit) {
  if (Date.now() - startTime > timeLimit) {
    return { score: evaluateBoard(board, aiColor, humanColor), timedOut: true }
  }

  const winner = findWinner(board)
  if (winner === aiColor) {
    return { score: 10000000 - depth }
  }
  if (winner === humanColor) {
    return { score: -10000000 + depth }
  }
  if (depth === 0 || isBoardFull(board)) {
    return { score: evaluateBoard(board, aiColor, humanColor) }
  }

  const moves = getCandidateMoves(board)
  const scoredMoves = moves
    .map((move) => {
      const next = placeStone(board, move.x, move.y, maximizing ? aiColor : humanColor)
      return { move, score: evaluateBoard(next, aiColor, humanColor) }
    })
    .sort((a, b) => (maximizing ? b.score - a.score : a.score - b.score))

  let bestMove = null
  let bestScore = maximizing ? -Infinity : Infinity

  for (const entry of scoredMoves) {
    if (Date.now() - startTime > timeLimit) {
      return { score: bestScore, move: bestMove, timedOut: true }
    }

    const move = entry.move
    const next = placeStone(board, move.x, move.y, maximizing ? aiColor : humanColor)
    const result = minimax(
      next,
      depth - 1,
      !maximizing,
      alpha,
      beta,
      aiColor,
      humanColor,
      startTime,
      timeLimit
    )

    if (maximizing) {
      if (result.score > bestScore) {
        bestScore = result.score
        bestMove = move
      }
      alpha = Math.max(alpha, bestScore)
      if (beta <= alpha) break
    } else {
      if (result.score < bestScore) {
        bestScore = result.score
        bestMove = move
      }
      beta = Math.min(beta, bestScore)
      if (beta <= alpha) break
    }
  }

  return { score: bestScore, move: bestMove }
}

export function getBestMove(board, aiColor = 'white', options = {}) {
  const timeLimit = options.timeLimitMs ?? DEFAULT_TIME_LIMIT_MS
  const maxDepth = options.maxDepth ?? DEFAULT_MAX_DEPTH
  const humanColor = aiColor === 'black' ? 'white' : 'black'

  const candidates = getCandidateMoves(board)
  const immediateWin = findImmediateMove(board, aiColor, candidates)
  if (immediateWin) {
    return { ...immediateWin, timedOut: false }
  }
  const immediateBlock = findImmediateMove(board, humanColor, candidates)
  if (immediateBlock) {
    return { ...immediateBlock, timedOut: false }
  }

  const startTime = Date.now()
  const result = minimax(
    board,
    maxDepth,
    true,
    -Infinity,
    Infinity,
    aiColor,
    humanColor,
    startTime,
    timeLimit
  )

  if (result.move) {
    return { ...result.move, timedOut: Boolean(result.timedOut) }
  }

  const fallback = candidates[Math.floor(Math.random() * candidates.length)]
  return fallback ? { ...fallback, timedOut: true } : null
}
