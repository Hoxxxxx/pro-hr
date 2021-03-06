import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

//默认样式修改
import '../src/assets/style/global.css'
import '../src/assets/style/public.less'

import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Fragment from 'vue-fragment'
Vue.use(element)
Vue.use(Fragment.Plugin)

Vue.prototype.axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
