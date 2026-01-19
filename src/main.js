// 应用入口：初始化 Vue2.7 与 Pinia，并挂载根组件。
import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import './assets/styles.css'

Vue.use(PiniaVuePlugin)

const pinia = createPinia()

Vue.config.productionTip = false

new Vue({
  pinia,
  render: (h) => h(App)
}).$mount('#app')
