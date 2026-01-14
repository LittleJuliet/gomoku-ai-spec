<template>
  <section class="grid gap-6 lg:grid-cols-[280px_1fr]">
    <div class="flex flex-col gap-4">
      <div class="rounded-lg bg-white p-4 shadow-sm">
        <div class="text-sm text-slate-500">人机对战</div>
        <div class="mt-1 text-lg font-semibold text-slate-800">玩家执黑，电脑执白</div>
        <div v-if="aiGame.isAiThinking" class="mt-2 text-sm text-amber-600">
          电脑思考中...
        </div>
        <div v-if="errorMessage" class="mt-2 text-sm text-rose-600">
          {{ errorMessage }}
        </div>
      </div>

      <GameStatus
        :status="statusForDisplay"
        :current-player="aiGame.currentTurn"
        :winner="winnerForDisplay"
        :move-count="aiGame.moveCount"
      />

      <button
        class="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        @click="restart"
      >
        再来一局
      </button>
    </div>

    <div class="flex flex-col items-center gap-3">
      <GameBoard :board="aiGame.board" :disabled="boardDisabled" @select="handleSelect" />
      <p class="text-xs text-slate-500">
        规则：黑先行，任意方向连续五子或以上即胜（与人人对战一致）。
      </p>
      <p class="text-xs text-slate-500">刷新或离开页面将结束该局</p>
    </div>
  </section>
</template>

<script>
import GameBoard from '../components/GameBoard.vue'
import GameStatus from '../components/GameStatus.vue'
import { useAiGameStore } from '../stores'

export default {
  name: 'AiMatchPage',
  components: {
    GameBoard,
    GameStatus
  },
  data() {
    return {
      aiGame: useAiGameStore()
    }
  },
  computed: {
    boardDisabled() {
      return (
        this.aiGame.status === 'finished' ||
        this.aiGame.currentTurn !== 'black' ||
        this.aiGame.isAiThinking
      )
    },
    statusForDisplay() {
      return this.aiGame.status === 'finished' ? 'finished' : 'in_progress'
    },
    winnerForDisplay() {
      if (this.aiGame.result === 'black_win') return 'black'
      if (this.aiGame.result === 'white_win') return 'white'
      if (this.aiGame.result === 'draw') return 'draw'
      return 'none'
    },
    errorMessage() {
      const reason = this.aiGame.lastError
      if (!reason) return ''
      const map = {
        finished: '对局已结束',
        out_of_bounds: '落子超出棋盘范围',
        occupied: '该位置已被占用',
        not_your_turn: '当前为电脑回合'
      }
      return map[reason] || '操作无效'
    }
  },
  created() {
    if (this.aiGame.status === 'idle') {
      this.aiGame.startGame()
    }
  },
  methods: {
    handleSelect({ x, y }) {
      this.aiGame.playerMove(x, y)
    },
    restart() {
      this.aiGame.restartGame()
    }
  }
}
</script>
