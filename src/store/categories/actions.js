import { get, post } from '@/api'

export default {
  async createCategory ({ commit }, params) {
    const category = await post(
      `budgets/${params.budgetId}/categories`, params,
    )

    commit('INSERT_CATEGORY', category)
  },

  async getCategories ({ commit }, params) {
    const categories = await get(
      `budgets/${params.budgetId}/categories`,
    )

    categories.map(c => commit('INSERT_CATEGORY', c))
  },
}
