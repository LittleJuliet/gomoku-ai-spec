const { defineConfig } = require('vitest/config')
const vue = require('@vitejs/plugin-vue2')

module.exports = defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  }
})
