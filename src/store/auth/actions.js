import { get, post } from '@/api'

export default {
  async getMe ({ commit, state }) {
    if (state.me) {
      return state.me
    }

    const user = await get('me')

    commit('SET_ME', user)

    return user
  },

  signIn (_, params) {
    return post('sign_in', { user: params })
  },
}
