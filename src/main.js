import Vue from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import router from './router'

import './plugins/composition-api'
import './plugins/element-ui'
import './plugins/validation'
import './assets/styles/themes/main.scss'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
