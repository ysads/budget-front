import Vue from 'vue'
import ElementUI from 'element-ui'
import en from 'element-ui/lib/locale/lang/en'
import ptBR from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'

import 'element-ui/lib/theme-chalk/index.css'

locale.use(en)
locale.use(ptBR)

Vue.use(ElementUI)
