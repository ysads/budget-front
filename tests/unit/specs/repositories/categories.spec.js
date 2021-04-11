import * as api from '@/api'
import * as repository from '@/repositories/categories'
import factories from '#/factories'
import faker from 'faker'

describe('CategoriesRepository', () => {
  beforeEach(() => {
    repository.categories.value = []
  })

  describe('#categoryGroupById', () => {
    it('finds the category group matching given id', () => {
      const categories = factories.category.buildList(3)
      repository.categories.value = categories

      const response = repository.categoryById(categories[2].id)

      expect(response).toEqual(categories[2])
    })
  })

  describe('#categoriesByGroupId', () => {
    it('filters out categories with differente categoryGroupId', () => {
      const categoryGroups = factories.categoryGroup.buildList(2)
      const categories = [
        factories.category.build({ categoryGroupId: categoryGroups[0].id }),
        factories.category.build({ categoryGroupId: categoryGroups[1].id }),
        factories.category.build({ categoryGroupId: categoryGroups[0].id }),
      ]

      repository.categories.value = categories

      expect(repository.categoriesByGroupId(categoryGroups[0].id)).toEqual([
        categories[0],
        categories[2],
      ])
    })
  })

  describe('#categoriesGroupedByGroupId', () => {
    it('groups categories according to their group id', () => {
      const categoryGroups = factories.categoryGroup.buildList(2)
      const categories = [
        factories.category.build({ categoryGroupId: categoryGroups[0].id }),
        factories.category.build({ categoryGroupId: categoryGroups[1].id }),
        factories.category.build({ categoryGroupId: categoryGroups[0].id }),
      ]

      repository.categories.value = categories

      expect(repository.categoriesGroupedByGroupId.value).toEqual({
        [categoryGroups[0].id]: [
          categories[0],
          categories[2],
        ],
        [categoryGroups[1].id]: [
          categories[1],
        ],
      })
    })
  })

  describe('#createCategory', () => {
    it('dispatches a POST to api', async () => {
      const budgetId = faker.datatype.uuid()
      const params = { mock: true, budgetId }

      await repository.createCategory(params)

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budgetId}/categories`, params,
      )
    })

    it('updates category groups with newly-created resource', async () => {
      const params = { param: 1 }
      const categoryGroup = factories.categoryGroup.build()

      api.post.mockResolvedValueOnce(categoryGroup)

      await repository.createCategory(params)

      expect(repository.categories.value).toEqual([categoryGroup])
    })
  })

  describe('#getCategories', () => {
    it('dispatches a GET to api', async () => {
      const budgetId = faker.datatype.uuid()
      const params = { mock: true, budgetId }

      await repository.getCategories(params)

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${budgetId}/categories`,
      )
    })

    it('saves fetched resources on local categories', async () => {
      const params = { param: 1 }
      const categories = factories.categoryGroup.buildList(2)

      api.get.mockResolvedValueOnce(categories)

      await repository.getCategories(params)

      expect(repository.categories.value).toEqual(categories)
    })
  })
})
