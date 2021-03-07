import * as api from '@/api'
import * as repository from '@/repositories/monthly-budgets'
import factories from '#/factories'
import faker from 'faker'

describe('MonthlyBudgetsRepository', () => {
  beforeEach(() => {
    repository.monthlyBudgets.value = []
  })

  describe('#createMonthlyBudget', () => {
    it('dispatches a POST to api', async () => {
      const budgetId = faker.random.uuid()
      const params = { mock: true, budgetId }

      await repository.createMonthlyBudget(params)

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budgetId}/monthly_budgets`, params,
      )
    })

    it('updates monthly budgets with newly-created resource', async () => {
      const params = { param: 1 }
      const categoryGroup = factories.categoryGroup.build()

      api.post.mockResolvedValueOnce(categoryGroup)

      await repository.createMonthlyBudget(params)

      expect(repository.monthlyBudgets.value).toEqual([categoryGroup])
    })
  })
})
