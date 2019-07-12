import Vue from 'vue'
import VueLodash from 'vue-lodash'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './stores/'
/*
import VueCkeditor from 'vue-ckeditor5'
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
*/
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import CKEditor from '@ckeditor/ckeditor5-vue'
Vue.use(CKEditor)

Vue.config.productionTip = false

/*
const options = {
  name: 'ckeditor',
  editors: {
    inline: InlineEditor
  }
}
*/

Vue.use(VueLodash)
// Vue.use(VueCkeditor.plugin, options)
Vue.use(Datetime)

const baseApi = axios.create({
  baseURL: 'http://localhost:3000/'
})
Vue.prototype.$http = baseApi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
