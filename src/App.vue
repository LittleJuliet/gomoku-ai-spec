<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true"></span>
        <div class="brand-text">
          <h1>五子棋对战</h1>
          <p>本地双人 · 15×15 棋盘</p>
        </div>
      </div>
    </header>
    <main class="app-main">
      <GameView />
    </main>
  </div>
</template>

<script>
import GameView from './views/GameView.vue';

export default {
  name: 'App',
  components: {
    GameView
  }
};
</script>
