<template>
  <button
    v-if="visible"
    class="restart-button"
    type="button"
    :disabled="disabled"
    @click="$emit('restart')"
  >
    重新开始
  </button>
</template>

<script>
export default {
  name: 'RestartButton',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
