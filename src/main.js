import Vue from 'vue'
import underscore from 'vue-underscore'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './stores/'

Vue.use(underscore)
Vue.config.productionTip = false

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/'
})
Vue.prototype.$http = baseApi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
