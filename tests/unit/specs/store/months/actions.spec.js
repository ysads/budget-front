import * as api from '@/api'
import actions from '@/store/months/actions'
import factories from '#/factories'
import Faker from 'faker'

const mockStore = {
  commit: jest.fn(),
}

describe('actions', () => {
  describe('#getMonth', () => {
    it('requests /budgets/:id/month/:isoMonth endpoint', async () => {
      const budgetId = Faker.random.uuid()
      const mockMonth = factories.month.build()
      const mockParams = {
        budgetId,
        isoMonth: mockMonth.isoMonth,
        otherArg: 1,
      }

      await actions.getMonth(mockStore, mockParams)

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${budgetId}/months/${mockMonth.isoMonth}`,
      )
    })

    it('commits INSERT_MONTH', async () => {
      const budgetId = Faker.random.uuid()
      const mockMonth = factories.month.build()
      const mockParams = {
        budgetId,
        isoMonth: mockMonth.isoMonth,
        otherArg: 1,
      }

      api.get.mockResolvedValueOnce(mockMonth)

      await actions.getMonth(mockStore, mockParams)

      expect(mockStore.commit).toHaveBeenCalledWith(
        'INSERT_MONTH', mockMonth,
      )
    })
  })
})
