<template>
  <section class="status-card">
    <div class="status-title">当前回合 · {{ store.modeLabel }}</div>
    <div class="status-player">
      <span class="stone-preview" :class="currentStoneClass"></span>
      <span class="status-player-name">{{ store.currentPlayerName }}</span>
    </div>
    <div class="status-meta" aria-live="polite">
      <span>步数：{{ store.moveCount }}</span>
      <span v-if="store.isDraw">结果：平局</span>
      <span v-else-if="store.winner">胜者：{{ store.winnerName }}</span>
      <span v-else-if="store.isAiThinking">电脑落子中</span>
      <span v-else>对局进行中</span>
    </div>
  </section>
</template>

<script>
// 对局状态栏：展示当前回合与胜负信息。
import { computed } from 'vue'
import { useGameStore } from '../stores/game'

export default {
  name: 'StatusBar',
  setup() {
    const store = useGameStore()
    const currentStoneClass = computed(() =>
      store.currentPlayer === 1 ? 'stone-black' : 'stone-white'
    )

    return {
      store,
      currentStoneClass
    }
  }
}
</script>
