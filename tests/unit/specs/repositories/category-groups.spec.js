import * as api from '@/api'
import factories from '#/factories'
import faker from 'faker'
import CategoryGroupRepo from '@/repositories/category-groups'

describe('CategoryGroupRepo', () => {
  beforeEach(() => {
    CategoryGroupRepo.categoryGroups.value = []
  })

  describe('#createCategoryGroup', () => {
    it('dispatches a POST to api', async () => {
      const budgetId = faker.random.uuid()
      const params = { mock: true, budgetId }

      await CategoryGroupRepo.createCategoryGroup(params)

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budgetId}/category_groups`, params,
      )
    })

    it('updates category groups with newly-created resource', async () => {
      const params = { param: 1 }
      const categoryGroup = factories.categoryGroup.build()

      api.post.mockResolvedValueOnce(categoryGroup)

      await CategoryGroupRepo.createCategoryGroup(params)

      expect(CategoryGroupRepo.categoryGroups.value).toEqual([categoryGroup])
    })
  })

  describe('#getCategoryGroups', () => {
    it('dispatches a GET to api', async () => {
      const budgetId = faker.random.uuid()
      const params = { mock: true, budgetId }

      await CategoryGroupRepo.getCategoryGroups(params)

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${budgetId}/category_groups`,
      )
    })

    it('saves fetched resources on local categoryGroups', async () => {
      const params = { param: 1 }
      const categoryGroups = factories.categoryGroup.buildList(2)

      api.get.mockResolvedValueOnce(categoryGroups)

      await CategoryGroupRepo.getCategoryGroups(params)

      expect(CategoryGroupRepo.categoryGroups.value).toEqual(categoryGroups)
    })
  })
})
