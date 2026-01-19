<template>
  <div class="game-view">
    <section class="board-panel">
      <BoardGrid
        :board="game.board"
        :players="game.players"
        @cell-click="handleCellClick"
      />
    </section>

    <section class="side-panel">
      <GameStatus
        :current-player="currentPlayer"
        :is-finished="store.isFinished"
        :winner="store.winner"
        :result="game.result"
        :message="store.message"
        :error="store.error"
      />
      <RestartButton
        :visible="store.isFinished"
        :disabled="!store.isFinished"
        @restart="handleRestart"
      />
      <section class="instructions-card" aria-label="玩法说明">
        <h3>玩法说明</h3>
        <ol>
          <li>黑方先行，双方轮流在空格落子。</li>
          <li>任一方向连成五子即获胜。</li>
          <li>棋盘满且无人连五则判为和局。</li>
        </ol>
      </section>
    </section>
  </div>
</template>

<script>
import BoardGrid from '../components/BoardGrid.vue';
import GameStatus from '../components/GameStatus.vue';
import RestartButton from '../components/RestartButton.vue';
import { useGameStore } from '../stores/gameStore.js';

export default {
  name: 'GameView',
  components: {
    BoardGrid,
    GameStatus,
    RestartButton
  },
  data() {
    return {
      store: useGameStore()
    };
  },
  computed: {
    game() {
      return this.store.game;
    },
    currentPlayer() {
      return this.store.currentPlayer;
    }
  },
  mounted() {
    if (this.game.status === 'idle') {
      this.store.startGame();
    }
  },
  methods: {
    handleCellClick({ x, y }) {
      this.store.placeMove(x, y);
    },
    handleRestart() {
      this.store.restartGame();
    }
  }
};
</script>
