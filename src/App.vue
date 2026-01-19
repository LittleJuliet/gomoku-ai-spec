<template>
  <div class="app">
    <header class="app-header">
      <div>
        <h1 class="app-title">五子棋双人对战</h1>
        <p class="app-subtitle">15×15 · 允许长连 · 单页本地对战</p>
      </div>
      <button class="btn btn-secondary" type="button" @click="store.reset">
        重新开始
      </button>
    </header>

    <main class="game-shell">
      <section class="board-panel">
        <BoardCanvas />
      </section>

      <aside class="side-panel">
        <StatusBar />
        <div class="rule-card">
          <div class="rule-title">规则提示</div>
          <ul>
            <li>黑子先手，交替落子</li>
            <li>任一方向连成五子即胜</li>
            <li>允许长连</li>
          </ul>
        </div>
        <div class="meta-card">
          <div class="meta-title">对局状态</div>
          <div class="meta-row">
            <span>当前回合</span>
            <span class="meta-value">{{ store.currentPlayerName }}</span>
          </div>
          <div class="meta-row">
            <span>总步数</span>
            <span class="meta-value">{{ store.moveCount }}</span>
          </div>
        </div>
      </aside>
    </main>

    <WinnerModal :open="winnerOpen" :winner="store.winner" @restart="store.reset" />
  </div>
</template>

<script>
// 主页面：组合棋盘、状态与胜负弹窗，并负责整体布局。
import { computed } from 'vue'
import { useGameStore } from './stores/game'
import BoardCanvas from './components/BoardCanvas.vue'
import StatusBar from './components/StatusBar.vue'
import WinnerModal from './components/WinnerModal.vue'

export default {
  name: 'App',
  components: {
    BoardCanvas,
    StatusBar,
    WinnerModal
  },
  setup() {
    const store = useGameStore()
    const winnerOpen = computed(() => store.winner !== null)

    return {
      store,
      winnerOpen
    }
  }
}
</script>
