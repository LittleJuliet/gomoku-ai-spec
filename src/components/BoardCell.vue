<template>
  <button
    class="flex h-8 w-8 items-center justify-center border border-slate-300 bg-amber-50 sm:h-9 sm:w-9 md:h-10 md:w-10"
    :class="disabled ? 'cursor-not-allowed opacity-60' : 'hover:bg-amber-100'"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <span
      v-if="value !== 'empty'"
      class="h-6 w-6 rounded-full"
      :class="
        value === 'black'
          ? 'bg-slate-900'
          : 'bg-slate-100 border border-slate-400'
      "
    ></span>
  </button>
</template>

<script>
export default {
  name: 'BoardCell',
  props: {
    value: {
      type: String,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ariaLabel() {
      const coord = `(${this.x + 1}, ${this.y + 1})`
      const status = this.value === 'empty' ? '空位' : this.value === 'black' ? '黑子' : '白子'
      return `棋盘 ${coord} ${status}`
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      this.$emit('select', { x: this.x, y: this.y })
    }
  }
}
</script>
