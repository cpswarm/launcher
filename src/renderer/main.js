import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import '@/element-custom.scss'
import App from '@/App.vue'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')

