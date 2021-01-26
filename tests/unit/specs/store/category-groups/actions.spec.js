import * as api from '@/api'
import actions from '@/store/category-groups/actions'
import factories from '#/factories'
import Faker from 'faker'

const mockStore = {
  commit: jest.fn(),
}

describe('actions', () => {
  describe('#createCategoryGroup', () => {
    it('requests /budgets/:id/category_groups endpoint', async () => {
      const budgetId = Faker.random.uuid()
      const mockParams = { mock: true, budgetId }

      await actions.createCategoryGroup(mockStore, mockParams)

      expect(api.post).toHaveBeenCalledWith(
        `budgets/${budgetId}/category_groups`, mockParams,
      )
    })

    it('commits INSERT_CATEGORY_GROUP', async () => {
      const mockParams = { param: 1 }
      const mockCategoryGroup = factories.categoryGroup.build()

      api.post.mockResolvedValueOnce(mockCategoryGroup)

      await actions.createCategoryGroup(mockStore, mockParams)

      expect(mockStore.commit).toHaveBeenCalledWith(
        'INSERT_CATEGORY_GROUP', mockCategoryGroup,
      )
    })
  })

  describe('#getCategoryGroups', () => {
    it('requests /budgets/:id/category_groups endpoint', async () => {
      const budgetId = Faker.random.uuid()
      const mockParams = { mock: true, budgetId }

      api.get.mockResolvedValueOnce([])

      await actions.getCategoryGroups(mockStore, mockParams)

      expect(api.get).toHaveBeenCalledWith(
        `budgets/${budgetId}/category_groups`,
      )
    })

    it('commits INSERT_CATEGORY_GROUP', async () => {
      const mockParams = { param: 1 }
      const mockGroups = factories.categoryGroup.buildList(2)

      api.get.mockResolvedValueOnce(mockGroups)

      await actions.getCategoryGroups(mockStore, mockParams)

      expect(mockStore.commit.mock.calls).toEqual([
        ['INSERT_CATEGORY_GROUP', mockGroups[0]],
        ['INSERT_CATEGORY_GROUP', mockGroups[1]],
      ])
    })
  })
})
