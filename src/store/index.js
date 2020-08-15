import Vue from 'vue'
import Vuex from 'vuex'

import * as namespaces from './namespaces'

import accounts from './accounts'
import auth from './auth'
import budgetBoards from './budget-boards'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    [namespaces.ACCOUNTS]: {
      namespaced: true,
      ...accounts,
    },
    [namespaces.AUTH]: {
      namespaced: true,
      ...auth,
    },
    [namespaces.BUDGET_BOARDS]: {
      namespaced: true,
      ...budgetBoards,
    },
  },
})
