import Vue from 'vue'
import App from './App.vue'
import 'vant/lib/index.css';
import "@/public/css/reset.scss"

import store from "./store/index.js"
import router from './router/index.js'

import "@/utils/components.js"
import "@/utils/vant.js"
import "@/utils/all.js"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
