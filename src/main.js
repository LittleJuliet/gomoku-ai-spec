import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import App from './App.vue';
import './assets/main.css';

Vue.config.productionTip = false;
Vue.use(PiniaVuePlugin);

const pinia = createPinia();

new Vue({
  pinia,
  render: (h) => h(App)
}).$mount('#app');
