<template>
  <div class="app">
    <header class="app-header">
      <div class="title-block">
        <p class="eyebrow">Local Two-Player</p>
        <h1>Gomoku</h1>
        <p class="subtitle">Connect five or more stones to win.</p>
      </div>
      <div class="status-chip" :data-status="game.status">
        <span class="status-dot" :class="stoneClass"></span>
        <span>{{ statusText }}</span>
      </div>
    </header>

    <main class="app-main">
      <section class="board-panel">
        <div class="board-header">
          <h2>Board</h2>
          <p>15x15 - fixed canvas - no undo</p>
        </div>
        <div class="canvas-wrap">
          <canvas
            ref="canvasRef"
            class="board-canvas"
            :width="canvasSize"
            :height="canvasSize"
            @click="handleCanvasClick"
          ></canvas>
        </div>
      </section>

      <aside class="side-panel">
        <div class="card">
          <h3>Turn</h3>
          <div class="turn-indicator">
            <span class="stone large" :class="stoneClass"></span>
            <div>
              <p class="turn-text">{{ statusText }}</p>
              <p class="hint-text">{{ helperText }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Rules</h3>
          <ul class="rule-list">
            <li>Black moves first.</li>
            <li>Players alternate on valid moves.</li>
            <li>Five or more stones in a row wins.</li>
            <li>Board full without a winner is a draw.</li>
          </ul>
        </div>

        <button class="btn primary" type="button" @click="restartGame">Restart Game</button>
      </aside>
    </main>

    <div v-if="game.status !== 'playing'" class="modal-backdrop" role="dialog" aria-modal="true">
      <div class="modal">
        <h3 v-if="game.status === 'won'">Winner: {{ game.winnerLabel }}</h3>
        <h3 v-else>Draw</h3>
        <p>{{ helperText }}</p>
        <button class="btn primary" type="button" @click="restartGame">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useGameStore } from './stores/game'

const BOARD_SIZE = 15
const CANVAS_SIZE = 640
const MARGIN = 40
const GRID_SPACING = (CANVAS_SIZE - MARGIN * 2) / (BOARD_SIZE - 1)
const STONE_RADIUS = 16
const STAR_POINTS = [
  [3, 3],
  [3, 11],
  [11, 3],
  [11, 11],
  [7, 7]
]

const drawStone = (ctx, row, col, player) => {
  const x = MARGIN + col * GRID_SPACING
  const y = MARGIN + row * GRID_SPACING
  const isBlack = player === 1
  const gradient = ctx.createRadialGradient(x - 6, y - 6, 4, x, y, STONE_RADIUS)

  if (isBlack) {
    gradient.addColorStop(0, '#4b4b4b')
    gradient.addColorStop(1, '#0b0b0b')
  } else {
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(1, '#d6d6d6')
  }

  ctx.save()
  ctx.shadowColor = isBlack ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)'
  ctx.shadowBlur = 8
  ctx.shadowOffsetY = 2
  ctx.beginPath()
  ctx.fillStyle = gradient
  ctx.arc(x, y, STONE_RADIUS, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

const drawBoard = (ctx, board) => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  const background = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  background.addColorStop(0, '#f4e2c1')
  background.addColorStop(1, '#e7c89b')
  ctx.fillStyle = background
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  ctx.strokeStyle = '#2b2b2b'
  ctx.lineWidth = 1

  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const position = MARGIN + i * GRID_SPACING
    ctx.beginPath()
    ctx.moveTo(MARGIN, position)
    ctx.lineTo(CANVAS_SIZE - MARGIN, position)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(position, MARGIN)
    ctx.lineTo(position, CANVAS_SIZE - MARGIN)
    ctx.stroke()
  }

  ctx.fillStyle = '#2b2b2b'
  STAR_POINTS.forEach(([row, col]) => {
    const x = MARGIN + col * GRID_SPACING
    const y = MARGIN + row * GRID_SPACING
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fill()
  })

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const value = board[row][col]
      if (value !== 0) {
        drawStone(ctx, row, col, value)
      }
    }
  }
}

export default {
  setup() {
    const game = useGameStore()
    const canvasRef = ref(null)

    const statusText = computed(() => {
      if (game.status === 'playing') {
        return `${game.currentPlayerLabel} to move`
      }
      if (game.status === 'won') {
        return `Winner: ${game.winnerLabel}`
      }
      return 'Draw'
    })

    const helperText = computed(() => {
      if (game.status === 'playing') {
        return 'Place a stone on an empty intersection.'
      }
      if (game.status === 'won') {
        return 'Five or more connected stones ends the game.'
      }
      return 'The board is full.'
    })

    const stoneClass = computed(() => {
      if (game.status === 'won') {
        return game.winner === 1 ? 'black' : 'white'
      }
      if (game.status === 'draw') return 'draw'
      return game.currentPlayer === 1 ? 'black' : 'white'
    })

    const draw = () => {
      const canvas = canvasRef.value
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      drawBoard(ctx, game.board)
    }

    const handleCanvasClick = (event) => {
      const canvas = canvasRef.value
      if (!canvas || game.status !== 'playing') return

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const col = Math.round((x - MARGIN) / GRID_SPACING)
      const row = Math.round((y - MARGIN) / GRID_SPACING)
      const gridX = MARGIN + col * GRID_SPACING
      const gridY = MARGIN + row * GRID_SPACING
      const distance = Math.hypot(x - gridX, y - gridY)

      if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return
      if (distance > GRID_SPACING * 0.45) return

      game.placeStone(row, col)
    }

    const restartGame = () => {
      game.restart()
    }

    onMounted(() => {
      draw()
    })

    watch(
      () => game.board,
      () => {
        draw()
      },
      { deep: true }
    )

    return {
      canvasRef,
      canvasSize: CANVAS_SIZE,
      statusText,
      helperText,
      stoneClass,
      handleCanvasClick,
      restartGame,
      game
    }
  }
}
</script>
