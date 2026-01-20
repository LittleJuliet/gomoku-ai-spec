import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import './style.css'

Vue.use(PiniaVuePlugin)

const pinia = createPinia()

new Vue({
  pinia,
  render: (h) => h(App)
}).$mount('#app')
