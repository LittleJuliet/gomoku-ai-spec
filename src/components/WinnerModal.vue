<template>
  <transition name="fade">
    <div v-if="open" class="modal-mask" role="dialog" aria-modal="true">
      <div class="modal-card">
        <div class="modal-title">胜负已分</div>
        <div class="modal-body" aria-live="polite">{{ winnerText }} 获胜</div>
        <div class="modal-actions">
          <button class="btn btn-primary" type="button" @click="$emit('restart')">
            重新开始
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 胜负弹窗：在对局结束时提示获胜方。
import { computed } from 'vue'

export default {
  name: 'WinnerModal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    winner: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const winnerText = computed(() => (props.winner === 1 ? '黑子' : '白子'))
    return { winnerText }
  }
}
</script>
