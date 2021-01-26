import * as api from '@/api'
import actions from '@/store/categories/actions'
import factories from '#/factories'
import Faker from 'faker'

const mockStore = {
  commit: jest.fn(),
}

describe('actions', () => {
  describe('#createCategory', () => {
    it('requests a POST to /budgets/:id/categories endpoint', async () => {
      const budgetId = Faker.random.uuid()
      const mockParams = { mock: true, budgetId }

      await actions.createCategory(mockStore, mockParams)

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budgetId}/categories`, mockParams,
      )
    })

    it('commits INSERT_CATEGORY', async () => {
      const mockParams = { param: 1 }
      const mockCategory = factories.category.build()

      api.post.mockResolvedValueOnce(mockCategory)

      await actions.createCategory(mockStore, mockParams)

      expect(mockStore.commit).toHaveBeenCalledWith(
        'INSERT_CATEGORY', mockCategory,
      )
    })
  })

  describe('#getCategories', () => {
    it('requests GET to /budgets/:id/categories endpoint', async () => {
      const budgetId = Faker.random.uuid()
      const mockParams = { mock: true, budgetId }

      api.get.mockResolvedValueOnce([])

      await actions.getCategories(mockStore, mockParams)

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${budgetId}/categories`,
      )
    })

    it('commits INSERT_CATEGORY', async () => {
      const mockParams = { param: 1 }
      const mockCategories = factories.category.buildList(2)

      api.get.mockResolvedValueOnce(mockCategories)

      await actions.getCategories(mockStore, mockParams)

      expect(mockStore.commit.mock.calls).toEqual([
        ['INSERT_CATEGORY', mockCategories[0]],
        ['INSERT_CATEGORY', mockCategories[1]],
      ])
    })
  })
})
