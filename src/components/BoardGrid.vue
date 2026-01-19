<template>
  <div
    class="board-grid"
    role="grid"
    :style="{ '--board-size': size }"
    aria-label="五子棋棋盘"
  >
    <div v-for="(row, rowIndex) in board" :key="`row-${rowIndex}`" class="board-row">
      <button
        v-for="(cell, colIndex) in row"
        :key="`cell-${rowIndex}-${colIndex}`"
        class="board-cell"
        :class="cellClass(cell)"
        type="button"
        @click="handleClick(colIndex, rowIndex)"
        :aria-label="cellAriaLabel(cell, colIndex, rowIndex)"
      >
        <span v-if="cell" class="stone" aria-hidden="true">{{ stoneFor(cell) }}</span>
        <span v-else class="cell-dot" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardGrid',
  props: {
    board: {
      type: Array,
      required: true
    },
    players: {
      type: Array,
      required: true
    }
  },
  computed: {
    size() {
      return this.board.length;
    },
    playerMap() {
      return this.players.reduce((map, player) => {
        map[player.id] = player;
        return map;
      }, {});
    }
  },
  methods: {
    handleClick(x, y) {
      this.$emit('cell-click', { x, y });
    },
    stoneFor(playerId) {
      return this.playerMap[playerId]?.stone || '';
    },
    cellClass(playerId) {
      if (!playerId) return 'is-empty';
      return this.playerMap[playerId]?.color === 'black'
        ? 'is-black'
        : 'is-white';
    },
    cellAriaLabel(playerId, x, y) {
      const position = `第${y + 1}行第${x + 1}列`;
      if (!playerId) {
        return `${position} 空位`;
      }
      const label = this.playerMap[playerId]?.label || '已落子';
      return `${position} ${label}`;
    }
  }
};
</script>
