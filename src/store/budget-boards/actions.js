import { get } from '@/api'

export default {
  async getBudgetBoard ({ commit }, id) {
    const budgetBoard = await get(`/budget_boards/${id}`)

    commit('SET_OPEN_BOARD', budgetBoard)
  },

  async getBudgetBoards ({ commit }, params) {
    const budgetBoards = await get('/budget_boards', params)

    commit('SET_BUDGET_BOARDS', budgetBoards)
  },
}
