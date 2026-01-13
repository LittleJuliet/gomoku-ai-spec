import Vue from 'vue'
import App from './App.vue'
import { PiniaVuePlugin, createPinia } from 'pinia'
import './styles/tailwind.css'

Vue.config.productionTip = false
Vue.use(PiniaVuePlugin)

const pinia = createPinia()

new Vue({
  pinia,
  render: (h) => h(App)
}).$mount('#app')
