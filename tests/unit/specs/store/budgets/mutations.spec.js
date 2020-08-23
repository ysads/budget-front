import commit from '@/store/budgets/mutations'

describe('SET_BUDGETS', () => {
  it('replaces budgets on state', () => {
    const mockState = { budgets: [] }
    const mockBudgets = [{ name: 'budget-1' }]

    commit.SET_BUDGETS(mockState, mockBudgets)

    expect(mockState.budgets).toEqual(mockBudgets)
  })
})

describe('SET_OPEN_BUDGET', () => {
  it('replaces openBudget on state', () => {
    const mockState = { openBudget: null }
    const mockBudget = { name: 'budget-1' }

    commit.SET_OPEN_BUDGET(mockState, mockBudget)

    expect(mockState.openBudget).toEqual(mockBudget)
  })
})
