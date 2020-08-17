import Vue from 'vue'
import Vuex from 'vuex'

import * as namespaces from './namespaces'

import accounts from './accounts'
import auth from './auth'
import budgets from './budgets'

Vue.use(Vuex)

export const modules = {
  [namespaces.ACCOUNTS]: {
    namespaced: true,
    ...accounts,
  },
  [namespaces.AUTH]: {
    namespaced: true,
    ...auth,
  },
  [namespaces.BUDGETS]: {
    namespaced: true,
    ...budgets,
  },
}

export default new Vuex.Store({ modules })
