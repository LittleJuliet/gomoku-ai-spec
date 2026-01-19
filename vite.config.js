// Vite 配置：启用 Vue2.7 支持并保持默认构建行为。
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: true
  }
})
