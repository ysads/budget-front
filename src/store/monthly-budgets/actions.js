import { get } from '@/api'

export default {
  async getMonthlyBudgets ({ commit }, params) {
    const monthlyBudgets = await get(
      `budgets/${params.budgetId}/months/${params.isoMonth}/monthly_budgets`,
    )

    commit('SET_MONTHLY_BUDGETS', monthlyBudgets)
  },
}
