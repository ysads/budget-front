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
        `budgets/${budgetId}/monthly_budgets`, { mock: true },
      )
    })

    it('updates monthly budgets with newly-created resource', async () => {
      const params = { param: 1 }
      const monthlyBudget = factories.monthlyBudget.build()

      api.post.mockResolvedValueOnce(monthlyBudget)

      await repository.createMonthlyBudget(params)

      expect(repository.monthlyBudgets.value).toEqual([monthlyBudget])
    })
  })

  describe('#updateMonthlyBudget', () => {
    it('dispatches a PUT to api', async () => {
      const budgetId = faker.random.uuid()
      const id = faker.random.uuid()
      const params = { mock: true, budgetId, id }

      await repository.updateMonthlyBudget(params)

      expect(api.put).toHaveBeenCalledWith(
        `budgets/${budgetId}/monthly_budgets/${id}`, { mock: true },
      )
    })

    it('updates monthly budgets with newly-created resource', async () => {
      const params = { param: 1 }
      const monthlyBudgetOne = factories.monthlyBudget.build()
      const monthlyBudgetTwo = factories.monthlyBudget.build()
      const updatedMonthlyBudgetTwo = { ...monthlyBudgetTwo, updatedParam: 2 }

      repository.monthlyBudgets.value = [monthlyBudgetOne, monthlyBudgetTwo]

      api.put.mockResolvedValueOnce(updatedMonthlyBudgetTwo)

      await repository.updateMonthlyBudget(params)

      expect(repository.monthlyBudgets.value).toEqual([
        monthlyBudgetOne,
        updatedMonthlyBudgetTwo,
      ])
    })
  })
})
