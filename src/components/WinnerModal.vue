<template>
  <transition name="fade">
    <div v-if="open" class="modal-mask" role="dialog" aria-modal="true">
      <div class="modal-card">
        <div class="modal-title">{{ titleText }}</div>
        <div class="modal-body" aria-live="polite">{{ bodyText }}</div>
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
    winnerLabel: {
      type: String,
      default: ''
    },
    isDraw: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const titleText = computed(() => (props.isDraw ? '平局' : '胜负已分'))
    const bodyText = computed(() =>
      props.isDraw ? '棋盘已满，判定为平局' : `${props.winnerLabel} 获胜`
    )
    return { titleText, bodyText }
  }
}
</script>
