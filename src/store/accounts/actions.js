import { get, post } from '@/api'

export default {
  async createAccount ({ commit }, params) {
    const account = await post(
      `budgets/${params.budgetId}/accounts`,
      { account: params },
    )

    commit('UPSERT_ACCOUNT', account)
  },

  async getAccounts ({ commit }, params) {
    const accounts = await get(`budgets/${params.budgetId}/accounts`)

    commit('SET_ACCOUNTS', accounts)
  },
}
