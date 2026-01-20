<template>
  <div class="board-wrap">
    <canvas
      ref="canvas"
      class="board-canvas"
      :aria-label="ariaLabel"
      role="img"
      @click="handleClick"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'GomokuCanvas',
  props: {
    board: {
      type: Array,
      required: true
    },
    boardSize: {
      type: Number,
      required: true
    },
    lastMove: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: '五子棋棋盘'
    }
  },
  data() {
    return {
      displaySize: 640,
      padding: 28,
      cellSize: 0,
      ctx: null
    };
  },
  watch: {
    board: {
      deep: true,
      handler() {
        this.drawBoard();
      }
    },
    lastMove() {
      this.drawBoard();
    },
    boardSize() {
      this.updateCanvasMetrics();
      this.drawBoard();
    }
  },
  mounted() {
    this.updateCanvasMetrics();
    this.drawBoard();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.updateCanvasMetrics();
      this.drawBoard();
    },
    updateCanvasMetrics() {
      const containerWidth = this.$el.clientWidth || 640;
      const size = Math.max(320, Math.min(containerWidth, 640));
      this.displaySize = size;
      this.padding = Math.round(size * 0.08);
      this.cellSize = (size - this.padding * 2) / (this.boardSize - 1);

      const canvas = this.$refs.canvas;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      this.ctx = canvas.getContext('2d');
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    },
    drawBoard() {
      if (!this.ctx) {
        return;
      }
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.displaySize, this.displaySize);
      this.drawGrid(ctx);
      this.drawStones(ctx);
      this.drawLastMove(ctx);
    },
    drawGrid(ctx) {
      ctx.strokeStyle = '#7a5b3a';
      ctx.lineWidth = 1;
      for (let i = 0; i < this.boardSize; i += 1) {
        const pos = this.padding + i * this.cellSize;
        ctx.beginPath();
        ctx.moveTo(this.padding, pos);
        ctx.lineTo(this.displaySize - this.padding, pos);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pos, this.padding);
        ctx.lineTo(pos, this.displaySize - this.padding);
        ctx.stroke();
      }
    },
    drawStones(ctx) {
      for (let row = 0; row < this.boardSize; row += 1) {
        for (let col = 0; col < this.boardSize; col += 1) {
          const cell = this.board[row][col];
          if (cell === 'empty') {
            continue;
          }
          const x = this.padding + col * this.cellSize;
          const y = this.padding + row * this.cellSize;
          const radius = this.cellSize * 0.38;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          if (cell === 'black') {
            const gradient = ctx.createRadialGradient(
              x - radius * 0.3,
              y - radius * 0.3,
              radius * 0.2,
              x,
              y,
              radius
            );
            gradient.addColorStop(0, '#3b3b3b');
            gradient.addColorStop(1, '#101010');
            ctx.fillStyle = gradient;
            ctx.fill();
          } else {
            const gradient = ctx.createRadialGradient(
              x - radius * 0.4,
              y - radius * 0.4,
              radius * 0.2,
              x,
              y,
              radius
            );
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(1, '#e6ddd2');
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.strokeStyle = 'rgba(47, 35, 30, 0.2)';
            ctx.stroke();
          }
        }
      }
    },
    drawLastMove(ctx) {
      if (!this.lastMove) {
        return;
      }
      const { row, col } = this.lastMove;
      const x = this.padding + col * this.cellSize;
      const y = this.padding + row * this.cellSize;
      ctx.beginPath();
      ctx.strokeStyle = '#c23a2b';
      ctx.lineWidth = 2;
      ctx.arc(x, y, this.cellSize * 0.18, 0, Math.PI * 2);
      ctx.stroke();
    },
    handleClick(event) {
      if (this.disabled) {
        return;
      }
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.round((x - this.padding) / this.cellSize);
      const row = Math.round((y - this.padding) / this.cellSize);
      const snappedX = this.padding + col * this.cellSize;
      const snappedY = this.padding + row * this.cellSize;
      const distance = Math.hypot(snappedX - x, snappedY - y);

      if (distance > this.cellSize * 0.45) {
        return;
      }

      if (row < 0 || col < 0 || row >= this.boardSize || col >= this.boardSize) {
        return;
      }

      this.$emit('cell-click', { row, col });
    }
  }
};
</script>
