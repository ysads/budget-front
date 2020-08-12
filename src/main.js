import Vue from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import store from './store'
import router from './router'

import './plugins/element-ui'
import './assets/styles/themes/main.scss'

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
