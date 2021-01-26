import commit from '@/store/categories/mutations'
import factories from '#/factories'

describe('INSERT_CATEGORY', () => {
  it('adds a new category to state', () => {
    const mockState = { categories: [] }
    const mockCategory = factories.category.build()

    commit.INSERT_CATEGORY(mockState, mockCategory)

    expect(mockState.categories).toEqual([mockCategory])
  })
})
