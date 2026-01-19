<template>
  <div ref="wrapRef" class="board-wrap">
    <canvas
      ref="canvasRef"
      class="board-canvas"
      role="button"
      aria-label="棋盘，点击落子"
      @click="handleClick"
    ></canvas>
  </div>
</template>

<script>
// Canvas 棋盘组件：绘制棋盘与棋子并处理点击落子。
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useGameStore } from '../stores/game'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default {
  name: 'BoardCanvas',
  setup() {
    const store = useGameStore()
    const wrapRef = ref(null)
    const canvasRef = ref(null)
    const canvasSize = ref(0)
    const layoutRef = ref({ size: 0, padding: 0, gap: 0 })
    let resizeObserver = null

    const updateLayout = (size) => {
      const padding = clamp(size * 0.07, 24, 48)
      const gap = (size - padding * 2) / (store.boardSize - 1)
      layoutRef.value = { size, padding, gap }
    }

    const resizeCanvas = () => {
      const wrap = wrapRef.value
      const canvas = canvasRef.value
      if (!wrap || !canvas) {
        return
      }
      const size = Math.floor(Math.min(wrap.clientWidth, wrap.clientHeight))
      if (!size) {
        return
      }
      canvasSize.value = size
      updateLayout(size)

      const ratio = window.devicePixelRatio || 1
      canvas.width = size * ratio
      canvas.height = size * ratio
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`

      const ctx = canvas.getContext('2d')
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw()
    }

    const toPixel = (value) => Math.round(value) + 0.5

    const drawBoardBackground = (ctx, size) => {
      const gradient = ctx.createLinearGradient(0, 0, size, size)
      gradient.addColorStop(0, '#d1a165')
      gradient.addColorStop(0.45, '#b07a42')
      gradient.addColorStop(1, '#8a5a32')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)

      ctx.save()
      ctx.globalAlpha = 0.08
      ctx.strokeStyle = '#7a4a28'
      ctx.lineWidth = 1
      for (let y = 0; y <= size; y += 12) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(size, y + 6)
        ctx.stroke()
      }
      ctx.restore()
    }

    const drawGrid = (ctx, padding, gap, sizeCount) => {
      ctx.save()
      ctx.strokeStyle = '#6b3f1f'
      ctx.lineWidth = 1
      for (let i = 0; i < sizeCount; i += 1) {
        const pos = toPixel(padding + i * gap)
        ctx.beginPath()
        ctx.moveTo(pos, padding)
        ctx.lineTo(pos, padding + gap * (sizeCount - 1))
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(padding, pos)
        ctx.lineTo(padding + gap * (sizeCount - 1), pos)
        ctx.stroke()
      }
      ctx.restore()
    }

    const drawStarPoints = (ctx, padding, gap) => {
      const stars = [
        [3, 3],
        [3, 11],
        [7, 7],
        [11, 3],
        [11, 11]
      ]
      ctx.save()
      ctx.fillStyle = '#3a1d0e'
      stars.forEach(([row, col]) => {
        const x = padding + col * gap
        const y = padding + row * gap
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()
    }

    const drawStone = (ctx, x, y, radius, player) => {
      ctx.save()
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)'
      ctx.shadowBlur = radius * 0.4
      ctx.shadowOffsetX = radius * 0.15
      ctx.shadowOffsetY = radius * 0.2

      const highlightX = x - radius * 0.35
      const highlightY = y - radius * 0.35
      const gradient = ctx.createRadialGradient(highlightX, highlightY, radius * 0.2, x, y, radius)
      if (player === 1) {
        gradient.addColorStop(0, '#4b4b4b')
        gradient.addColorStop(0.6, '#1b1b1b')
        gradient.addColorStop(1, '#0b0b0b')
      } else {
        gradient.addColorStop(0, '#ffffff')
        gradient.addColorStop(0.55, '#f0ebe4')
        gradient.addColorStop(1, '#cfc7bb')
      }

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.shadowColor = 'transparent'
      ctx.lineWidth = 1
      ctx.strokeStyle = player === 1 ? '#1a1a1a' : '#b7afa4'
      ctx.stroke()
      ctx.restore()
    }

    const drawStones = (ctx, padding, gap) => {
      const radius = gap * 0.46
      for (let row = 0; row < store.boardSize; row += 1) {
        for (let col = 0; col < store.boardSize; col += 1) {
          const player = store.board[row][col]
          if (!player) {
            continue
          }
          const x = padding + col * gap
          const y = padding + row * gap
          drawStone(ctx, x, y, radius, player)
        }
      }
    }

    const draw = () => {
      const canvas = canvasRef.value
      const ctx = canvas?.getContext('2d')
      const { size, padding, gap } = layoutRef.value
      if (!canvas || !ctx || !size) {
        return
      }
      ctx.clearRect(0, 0, size, size)
      drawBoardBackground(ctx, size)
      drawGrid(ctx, padding, gap, store.boardSize)
      drawStarPoints(ctx, padding, gap)
      drawStones(ctx, padding, gap)
    }

    const handleClick = (event) => {
      if (store.winner) {
        return
      }
      const canvas = canvasRef.value
      if (!canvas) {
        return
      }
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const { padding, gap, size } = layoutRef.value
      if (!size) {
        return
      }
      const col = Math.round((x - padding) / gap)
      const row = Math.round((y - padding) / gap)
      const cx = padding + col * gap
      const cy = padding + row * gap
      const distance = Math.hypot(cx - x, cy - y)
      if (distance > gap * 0.45) {
        return
      }
      if (row < 0 || col < 0 || row >= store.boardSize || col >= store.boardSize) {
        return
      }
      if (store.placeMove(row, col)) {
        draw()
      }
    }

    onMounted(() => {
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => resizeCanvas())
        resizeObserver.observe(wrapRef.value)
      } else {
        window.addEventListener('resize', resizeCanvas)
      }
      resizeCanvas()
    })

    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener('resize', resizeCanvas)
      }
    })

    watch(
      () => store.board,
      () => draw(),
      { deep: true }
    )

    return {
      wrapRef,
      canvasRef,
      handleClick
    }
  }
}
</script>
