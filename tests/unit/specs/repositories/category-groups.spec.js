import * as api from '@/api'
import * as repository from '@/repositories/category-groups'
import factories from '#/factories'
import faker from 'faker'

describe('CategoryGroupRepository', () => {
  beforeEach(() => {
    repository.categoryGroups.value = []
  })

  describe('#categoryGroupById', () => {
    it('finds the category group matching given id', () => {
      const categoryGroups = factories.categoryGroup.buildList(3)
      repository.categoryGroups.value = categoryGroups

      const response = repository.categoryGroupById(categoryGroups[2].id)

      expect(response).toEqual(categoryGroups[2])
    })
  })

  describe('#createCategoryGroup', () => {
    it('dispatches a POST to api', async () => {
      const budgetId = faker.datatype.uuid()
      const params = { mock: true, budgetId }

      await repository.createCategoryGroup(params)

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budgetId}/category_groups`, params,
      )
    })

    it('updates category groups with newly-created resource', async () => {
      const params = { param: 1 }
      const categoryGroup = factories.categoryGroup.build()

      api.post.mockResolvedValueOnce(categoryGroup)

      await repository.createCategoryGroup(params)

      expect(repository.categoryGroups.value).toEqual([categoryGroup])
    })
  })

  describe('#getCategoryGroups', () => {
    it('dispatches a GET to api', async () => {
      const budgetId = faker.datatype.uuid()
      const params = { mock: true, budgetId }

      await repository.getCategoryGroups(params)

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${budgetId}/category_groups`,
      )
    })

    it('saves fetched resources on local categoryGroups', async () => {
      const params = { param: 1 }
      const categoryGroups = factories.categoryGroup.buildList(2)

      api.get.mockResolvedValueOnce(categoryGroups)

      await repository.getCategoryGroups(params)

      expect(repository.categoryGroups.value).toEqual(categoryGroups)
    })
  })
})
