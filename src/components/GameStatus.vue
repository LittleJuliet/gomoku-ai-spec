<template>
  <div class="rounded-lg bg-white p-4 shadow-sm">
    <div class="text-sm text-slate-500">回合信息</div>
    <div class="mt-1 text-lg font-semibold text-slate-800">
      {{ statusText }}
    </div>
    <div class="mt-2 flex items-center gap-2 text-sm text-slate-600">
      <span>当前玩家：{{ currentLabel }}</span>
      <span aria-hidden="true">•</span>
      <span>步数：{{ moveCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameStatus',
  props: {
    status: {
      type: String,
      required: true
    },
    currentPlayer: {
      type: String,
      required: true
    },
    winner: {
      type: String,
      required: true
    },
    moveCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentLabel() {
      return this.currentPlayer === 'black' ? '黑方' : '白方'
    },
    statusText() {
      if (this.status !== 'finished') {
        return `当前回合：${this.currentLabel}`
      }
      if (this.winner === 'draw') {
        return '对局结束：平局'
      }
      if (this.winner === 'black') {
        return '对局结束：黑方胜'
      }
      if (this.winner === 'white') {
        return '对局结束：白方胜'
      }
      return '对局结束'
    }
  }
}
</script>
