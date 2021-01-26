import commit from '@/store/category-groups/mutations'
import factories from '#/factories'

describe('INSERT_CATEGORY_GROUP', () => {
  it('adds a new category to state', () => {
    const mockState = { categoryGroups: [] }
    const mockCategoryGroup = factories.categoryGroup.build()

    commit.INSERT_CATEGORY_GROUP(mockState, mockCategoryGroup)

    expect(mockState.categoryGroups).toEqual([mockCategoryGroup])
  })
})
