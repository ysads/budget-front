import * as api from '@/api'
import actions from '@/store/budgets/actions'
import factories from '#/factories'
import uuid from 'uuid-random'

const mockStore = {
  commit: jest.fn(),
}

describe('actions', () => {
  describe('#getBudget', () => {
    it('requests /budget/:id endpoint using id', async () => {
      const mockId = uuid()

      await actions.getBudget(mockStore, mockId)

      expect(api.get).toHaveBeenCalledWith(`budgets/${mockId}`)
    })

    it('commits SET_OPEN_BUDGET', async () => {
      const mockId = uuid()
      const mockBudget = factories.budget.build()

      api.get.mockResolvedValueOnce(mockBudget)

      await actions.getBudget(mockStore, mockId)

      expect(mockStore.commit).toHaveBeenCalledWith(
        'SET_OPEN_BUDGET', mockBudget,
      )
    })
  })

  describe('#getBudgets', () => {
    it('requests /budgets endpoint using given params', async () => {
      const mockParams = { mock: true }

      await actions.getBudgets(mockStore, mockParams)

      expect(api.get).toHaveBeenCalledWith('budgets', mockParams)
    })

    it('commits SET_BUDGETS', async () => {
      const mockParams = { param: 1 }
      const mockBudgets = factories.budget.buildList(2)

      api.get.mockResolvedValueOnce(mockBudgets)

      await actions.getBudgets(mockStore, mockParams)

      expect(mockStore.commit).toHaveBeenCalledWith(
        'SET_BUDGETS', mockBudgets,
      )
    })
  })
})
