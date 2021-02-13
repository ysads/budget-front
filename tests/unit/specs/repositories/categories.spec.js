import * as api from '@/api'
import factories from '#/factories'
import faker from 'faker'
import CategoriesRepo from '@/repositories/categories'

describe('CategoriesRepo', () => {
  beforeEach(() => {
    CategoriesRepo.categories.value = []
  })

  describe('#createCategory', () => {
    it('dispatches a POST to api', async () => {
      const budgetId = faker.random.uuid()
      const params = { mock: true, budgetId }

      await CategoriesRepo.createCategory(params)

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budgetId}/categories`, params,
      )
    })

    it('updates category groups with newly-created resource', async () => {
      const params = { param: 1 }
      const categoryGroup = factories.categoryGroup.build()

      api.post.mockResolvedValueOnce(categoryGroup)

      await CategoriesRepo.createCategory(params)

      expect(CategoriesRepo.categories.value).toEqual([categoryGroup])
    })
  })

  describe('#getCategories', () => {
    it('dispatches a GET to api', async () => {
      const budgetId = faker.random.uuid()
      const params = { mock: true, budgetId }

      await CategoriesRepo.getCategories(params)

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${budgetId}/categories`,
      )
    })

    it('saves fetched resources on local categories', async () => {
      const params = { param: 1 }
      const categories = factories.categoryGroup.buildList(2)

      api.get.mockResolvedValueOnce(categories)

      await CategoriesRepo.getCategories(params)

      expect(CategoriesRepo.categories.value).toEqual(categories)
    })
  })
})
