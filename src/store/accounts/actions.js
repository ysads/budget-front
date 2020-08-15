import { get, post } from '@/api'

export default {
  async createAccount ({ commit }, account) {
    await post('accounts', { account: account })

    commit('UPSERT_ACCOUNT', account)
  },

  async getAccounts ({ commit }, params) {
    const accounts = await get('accounts', params)

    commit('SET_ACCOUNTS', accounts)
  },
}
