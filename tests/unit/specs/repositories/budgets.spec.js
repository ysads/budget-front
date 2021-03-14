import * as api from '@/api'
import * as repository from '@/repositories/budgets'
import factories from '#/factories'
import faker from 'faker'

describe('BudgetsRepository', () => {
  beforeEach(() => {
    repository.openBudget.value = {}
  })

  describe('#getBudgetById', () => {
    it('dispatches a GET to api', async () => {
      const id = faker.random.uuid

      await repository.getBudgetById(id)

      expect(api.get).toHaveBeenCalledWith(`budgets/${id}`)
    })

    it('updates monthly budgets with newly-created resource', async () => {
      const id = faker.random.uuid
      const budget = factories.budget.build()

      api.get.mockResolvedValueOnce(budget)

      await repository.getBudgetById(id)

      expect(repository.openBudget.value).toEqual(budget)
    })
  })
})
