import Vue from 'vue'
import Vuex from 'vuex'

import * as namespaces from './namespaces'

import accounts from './accounts'
import auth from './auth'
import budgets from './budgets'
import categories from './categories'
import categoryGroups from './category-groups'
import months from './months'

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
  [namespaces.CATEGORIES]: {
    namespaced: true,
    ...categories,
  },
  [namespaces.CATEGORY_GROUPS]: {
    namespaced: true,
    ...categoryGroups,
  },
  [namespaces.MONTHS]: {
    namespaced: true,
    ...months,
  },
}

export default new Vuex.Store({ modules })
