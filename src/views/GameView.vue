<template>
  <div class="game-view">
    <header class="header">
      <div>
        <h1 class="title">五子棋对战</h1>
        <p class="subtitle">同屏双人 · 自由规则 · 15×15 棋盘</p>
      </div>
      <button
        class="btn primary"
        type="button"
        aria-label="开始新局"
        @click="handleReset"
      >
        新局
      </button>
    </header>

    <div class="layout">
      <section class="board-card">
        <GomokuCanvas
          :board="game.board"
          :board-size="game.boardSize"
          :last-move="game.lastMove"
          :disabled="game.status === 'ended'"
          aria-label="五子棋棋盘，点击交叉点落子"
          @cell-click="handleCellClick"
        />
        <div class="board-meta">
          <span>步数</span>
          <strong>{{ game.moveCount }}</strong>
        </div>
      </section>

      <aside class="side-panel">
        <div class="status-card" aria-live="polite">
          <div class="status-row">
            <span>当前回合</span>
            <span class="chip" :class="currentChipClass">{{ currentPlayerLabel }}</span>
          </div>
          <div class="status-row">
            <span>对局状态</span>
            <span class="result" :class="resultClass">{{ resultText }}</span>
          </div>
          <div class="status-row">
            <span>先手</span>
            <span class="chip black">黑子</span>
          </div>
          <p v-if="game.message" class="message" role="alert">{{ game.message }}</p>
          <p class="helper">提示：点击棋盘交叉点落子。</p>
        </div>
      </aside>
    </div>

    <div v-if="showWinnerModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="winner-title">
      <div class="modal">
        <div class="modal-header">
          <h2 id="winner-title" class="modal-title">胜利方已出现</h2>
          <button class="btn ghost" type="button" aria-label="关闭胜利弹窗" @click="dismissWinner">关闭</button>
        </div>
        <p class="modal-body">
          {{ winnerText }} 获胜！本局已结束，随时可以开启新局。
        </p>
        <div class="modal-actions">
          <button class="btn primary" type="button" @click="handleReset">开启新局</button>
          <button class="btn ghost" type="button" @click="dismissWinner">继续查看棋盘</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GomokuCanvas from '../components/GomokuCanvas.vue';
import { useGameStore } from '../stores/gameStore.js';

export default {
  name: 'GameView',
  components: {
    GomokuCanvas
  },
  data() {
    return {
      game: useGameStore(),
      winnerDismissed: false
    };
  },
  computed: {
    currentPlayerLabel() {
      return this.game.currentPlayer === 'black' ? '黑子' : '白子';
    },
    currentChipClass() {
      return this.game.currentPlayer === 'black' ? 'black' : 'white';
    },
    resultText() {
      if (this.game.result === 'black_win') {
        return '黑子胜利';
      }
      if (this.game.result === 'white_win') {
        return '白子胜利';
      }
      if (this.game.result === 'draw') {
        return '平局';
      }
      return this.game.status === 'ended' ? '已结束' : '进行中';
    },
    resultClass() {
      if (this.game.result === 'draw') {
        return 'draw';
      }
      if (this.game.result === 'black_win' || this.game.result === 'white_win') {
        return '';
      }
      return 'pending';
    },
    hasWinner() {
      return this.game.result === 'black_win' || this.game.result === 'white_win';
    },
    showWinnerModal() {
      return this.hasWinner && !this.winnerDismissed;
    },
    winnerText() {
      if (this.game.result === 'black_win') {
        return '黑子';
      }
      if (this.game.result === 'white_win') {
        return '白子';
      }
      return '';
    }
  },
  mounted() {
    this.game.newGame();
  },
  methods: {
    handleCellClick({ row, col }) {
      this.game.placeMove(row, col);
    },
    handleReset() {
      this.winnerDismissed = false;
      this.game.resetMatch();
    },
    dismissWinner() {
      this.winnerDismissed = true;
    }
  }
};
</script>
