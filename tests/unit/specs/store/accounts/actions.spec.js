import * as api from '@/api'
import actions from '@/store/accounts/actions'
import uuid from 'uuid-random'
import factories from '#/factories'

const mockStore = {
  commit: jest.fn(),
}

describe('#getAccounts', () => {
  it('requests account endpoint using budgetId', async () => {
    const mockBudgetId = uuid()
    const mockParams = { budgetId: mockBudgetId }

    await actions.getAccounts(mockStore, mockParams)

    expect(api.get).toHaveBeenCalledWith(`budgets/${mockBudgetId}/accounts`)
  })

  it('commits SET_ACCOUNTS', async () => {
    const mockBudgetId = uuid()
    const mockParams = { budgetId: mockBudgetId }
    const mockAccounts = factories.account.buildList(2)

    api.get.mockResolvedValueOnce(mockAccounts)

    await actions.getAccounts(mockStore, mockParams)

    expect(mockStore.commit).toHaveBeenCalledWith(
      'SET_ACCOUNTS', mockAccounts,
    )
  })
})

describe('#createAccount', () => {
  it('requests a POST to /account endpoint using given params', async () => {
    const mockBudgetId = uuid()
    const mockParams = { budgetId: mockBudgetId, name: 'acc-1' }

    await actions.createAccount(mockStore, mockParams)

    expect(api.post).toHaveBeenCalledWith(
      `budgets/${mockBudgetId}/accounts`, mockParams,
    )
  })

  it('commits UPSERT_ACCOUNT with API response', async () => {
    const mockBudgetId = uuid()
    const mockParams = { budgetId: mockBudgetId, name: 'acc-1' }
    const mockAccount = factories.account.build()

    api.post.mockResolvedValueOnce(mockAccount)

    await actions.createAccount(mockStore, mockParams)

    expect(mockStore.commit).toHaveBeenCalledWith(
      'UPSERT_ACCOUNT', mockAccount,
    )
  })
})
