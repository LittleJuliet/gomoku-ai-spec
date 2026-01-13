<template>
  <div class="min-h-screen px-4 py-8">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header class="flex flex-col gap-2">
        <h1 class="text-2xl font-bold text-slate-900">五子棋对战</h1>
        <p class="text-sm text-slate-600">本地双人对战，固定 15×15，连五即胜。</p>
      </header>

      <div class="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div class="flex flex-col gap-4">
          <GameStatus
            :status="game.status"
            :current-player="game.currentPlayer"
            :winner="game.winner"
            :move-count="game.moveCount"
          />
          <button
            class="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            @click="restart"
          >
            新局 / 重开
          </button>
        </div>

        <div class="flex items-center justify-center">
          <GameBoard
            :board="game.board"
            :disabled="game.status === 'finished'"
            @select="handleSelect"
          />
        </div>
      </div>

      <p class="text-xs text-slate-500">
        规则：黑先行，任意方向连续五子或以上即胜，棋盘满则平局。
      </p>
    </div>
  </div>
</template>

<script>
import GameBoard from '../components/GameBoard.vue'
import GameStatus from '../components/GameStatus.vue'
import { useGameStore } from '../stores'

export default {
  name: 'HomePage',
  components: {
    GameBoard,
    GameStatus
  },
  data() {
    return {
      game: useGameStore()
    }
  },
  created() {
    if (this.game.status === 'idle') {
      this.game.startGame()
    }
  },
  methods: {
    handleSelect({ x, y }) {
      this.game.placeMove(x, y)
    },
    restart() {
      this.game.restartGame()
    }
  }
}
</script>
