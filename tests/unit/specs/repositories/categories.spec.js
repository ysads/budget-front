import * as api from '@/api'
import * as categoriesRepo from '@/repositories/categories'
import factories from '#/factories'
import faker from 'faker'

describe('CategoriesRepository', () => {
  beforeEach(() => {
    categoriesRepo.categories.value = []
  })

  describe('#categoriesByGroupId', () => {
    it('filters out categories with differente categoryGroupId', () => {
      const categoryGroups = factories.categoryGroup.buildList(2)
      const categories = [
        factories.category.build({ categoryGroupId: categoryGroups[0].id }),
        factories.category.build({ categoryGroupId: categoryGroups[1].id }),
        factories.category.build({ categoryGroupId: categoryGroups[0].id }),
      ]

      categoriesRepo.categories.value = categories

      expect(categoriesRepo.categoriesByGroupId(categoryGroups[0].id)).toEqual([
        categories[0],
        categories[2],
      ])
    })
  })

  describe('#createCategory', () => {
    it('dispatches a POST to api', async () => {
      const budgetId = faker.random.uuid()
      const params = { mock: true, budgetId }

      await categoriesRepo.createCategory(params)

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budgetId}/categories`, params,
      )
    })

    it('updates category groups with newly-created resource', async () => {
      const params = { param: 1 }
      const categoryGroup = factories.categoryGroup.build()

      api.post.mockResolvedValueOnce(categoryGroup)

      await categoriesRepo.createCategory(params)

      expect(categoriesRepo.categories.value).toEqual([categoryGroup])
    })
  })

  describe('#getCategories', () => {
    it('dispatches a GET to api', async () => {
      const budgetId = faker.random.uuid()
      const params = { mock: true, budgetId }

      await categoriesRepo.getCategories(params)

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${budgetId}/categories`,
      )
    })

    it('saves fetched resources on local categories', async () => {
      const params = { param: 1 }
      const categories = factories.categoryGroup.buildList(2)

      api.get.mockResolvedValueOnce(categories)

      await categoriesRepo.getCategories(params)

      expect(categoriesRepo.categories.value).toEqual(categories)
    })
  })
})
