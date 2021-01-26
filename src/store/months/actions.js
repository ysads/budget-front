import { get } from '@/api'

export default {
  async getMonth ({ commit }, params) {
    const month = await get(
      `budgets/${params.budgetId}/months/${params.isoMonth}`,
    )

    commit('INSERT_MONTH', month)
  },
}
