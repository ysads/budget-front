import { get, post } from '@/api'

export default {
  async createCategoryGroup ({ commit }, params) {
    const categoryGroup = await post(
      `budgets/${params.budgetId}/category_groups`, params,
    )

    commit('INSERT_CATEGORY_GROUP', categoryGroup)
  },

  async getCategoryGroups ({ commit }, params) {
    const groups = await get(
      `budgets/${params.budgetId}/category_groups`,
    )

    groups.map(g => commit('INSERT_CATEGORY_GROUP', g))
  },
}
