import { get } from '@/api'

export default {
  async getBudget ({ commit }, id) {
    const budget = await get(`/budgets/${id}`)

    console.log(budget)

    commit('SET_OPEN_BUDGET', budget)
  },

  async getBudgets ({ commit }, params) {
    const budgets = await get('/budgets', params)

    commit('SET_BUDGETS', budgets)
  },
}
