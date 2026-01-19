<template>
  <div class="app">
    <header class="app-header">
      <div>
        <h1 class="app-title">五子棋对战</h1>
        <p class="app-subtitle">15×15 · 人机对战默认 · 支持双人对战</p>
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
        <div class="mode-card">
          <div class="mode-title">对战模式</div>
          <div class="mode-options" role="group" aria-label="对战模式">
            <button
              class="mode-option"
              type="button"
              :class="{ 'is-active': store.mode === 'ai' }"
              @click="setMode('ai')"
            >
              人机对战
            </button>
            <button
              class="mode-option"
              type="button"
              :class="{ 'is-active': store.mode === 'duel' }"
              @click="setMode('duel')"
            >
              双人对战
            </button>
          </div>
          <div class="mode-hint">{{ modeHint }}</div>
        </div>
        <div class="rule-card">
          <div class="rule-title">规则提示</div>
          <ul>
            <li v-for="rule in ruleTips" :key="rule">{{ rule }}</li>
          </ul>
        </div>
        <div class="meta-card">
          <div class="meta-title">对局状态</div>
          <div class="meta-row">
            <span>对战模式</span>
            <span class="meta-value">{{ store.modeLabel }}</span>
          </div>
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

    <WinnerModal
      :open="winnerOpen"
      :winner-label="store.winnerName"
      :is-draw="store.isDraw"
      @restart="store.reset"
    />
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
    const winnerOpen = computed(() => store.winner !== null || store.isDraw)
    const ruleTips = computed(() => {
      const common = ['任一方向连成五子即胜', '允许长连', '棋盘满且无胜负判平局']
      if (store.mode === 'ai') {
        return ['玩家执黑先手，电脑执白', '电脑立即回应落子', ...common]
      }
      return ['黑子先手，交替落子', '双人轮流对弈', ...common]
    })
    const modeHint = computed(() =>
      store.mode === 'ai' ? '玩家执黑，电脑执白' : '黑子先手，白子后手'
    )
    const setMode = (mode) => {
      store.setMode(mode)
    }

    return {
      store,
      winnerOpen,
      ruleTips,
      modeHint,
      setMode
    }
  }
}
</script>
