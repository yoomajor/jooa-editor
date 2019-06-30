import Vue from 'vue'
import VueLodash from 'vue-lodash'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './stores/'

Vue.config.productionTip = false

Vue.use(VueLodash)

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/'
})
Vue.prototype.$http = baseApi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
