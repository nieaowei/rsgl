import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";

var axios = require('axios')

Vue.use(ElementUI)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
