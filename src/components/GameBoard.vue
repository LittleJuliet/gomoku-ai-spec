<template>
  <div class="inline-block rounded-lg border border-amber-300 bg-amber-100 p-2 shadow-sm">
    <div class="grid gap-0.5" :style="gridStyle">
      <BoardCell
        v-for="(cell, index) in flatBoard"
        :key="index"
        :value="cell.value"
        :x="cell.x"
        :y="cell.y"
        :disabled="disabled"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script>
import BoardCell from './BoardCell.vue'

export default {
  name: 'GameBoard',
  components: {
    BoardCell
  },
  props: {
    board: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    boardSize() {
      return this.board.length
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.boardSize}, minmax(0, 1fr))`
      }
    },
    flatBoard() {
      const cells = []
      for (let y = 0; y < this.board.length; y += 1) {
        for (let x = 0; x < this.board[y].length; x += 1) {
          cells.push({ x, y, value: this.board[y][x] })
        }
      }
      return cells
    }
  },
  methods: {
    handleSelect(payload) {
      this.$emit('select', payload)
    }
  }
}
</script>
