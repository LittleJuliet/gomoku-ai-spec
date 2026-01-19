<template>
  <section class="status-card">
    <div class="status-title">当前回合</div>
    <div class="status-player">
      <span class="stone-preview" :class="currentStoneClass"></span>
      <span class="status-player-name">{{ playerText }}</span>
    </div>
    <div class="status-meta" aria-live="polite">
      <span>步数：{{ store.moveCount }}</span>
      <span v-if="store.winner">胜者：{{ winnerText }}</span>
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
    const playerText = computed(() => (store.currentPlayer === 1 ? '黑子' : '白子'))
    const winnerText = computed(() => (store.winner === 1 ? '黑子' : '白子'))
    const currentStoneClass = computed(() =>
      store.currentPlayer === 1 ? 'stone-black' : 'stone-white'
    )

    return {
      store,
      playerText,
      winnerText,
      currentStoneClass
    }
  }
}
</script>
