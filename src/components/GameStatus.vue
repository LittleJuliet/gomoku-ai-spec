<template>
  <section class="game-status" aria-label="对局信息">
    <div class="status-card">
      <div class="status-row">
        <span class="status-label">当前玩家</span>
        <span class="status-value" :class="playerClass">
          {{ currentPlayerLabel }}
        </span>
      </div>
      <div class="status-row">
        <span class="status-label">对局状态</span>
        <span class="status-value">
          {{ isFinished ? '已结束' : '进行中' }}
        </span>
      </div>
      <div v-if="isFinished" class="status-row">
        <span class="status-label">结果</span>
        <span class="status-value">
          {{ resultLabel }}
        </span>
      </div>
    </div>

    <p class="status-message" role="status" aria-live="polite">
      {{ message }}
    </p>
    <p v-if="error" class="status-error" role="alert">
      {{ error }}
    </p>
  </section>
</template>

<script>
export default {
  name: 'GameStatus',
  props: {
    currentPlayer: {
      type: Object,
      default: null
    },
    isFinished: {
      type: Boolean,
      default: false
    },
    winner: {
      type: Object,
      default: null
    },
    result: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentPlayerLabel() {
      return this.currentPlayer?.label || '--';
    },
    playerClass() {
      return this.currentPlayer?.color === 'black'
        ? 'player-black'
        : this.currentPlayer?.color === 'white'
        ? 'player-white'
        : '';
    },
    resultLabel() {
      if (this.result === 'win' && this.winner) {
        return `${this.winner.label} 获胜`;
      }
      if (this.result === 'draw') {
        return '和局';
      }
      return '--';
    }
  }
};
</script>
