import commit from '@/store/accounts/mutations'

describe('SET_ACCOUNTS', () => {
  it('replaces accounts on state', () => {
    const mockState = { accounts: [] }
    const mockAccounts = [{ name: 'acc-1' }]

    commit.SET_ACCOUNTS(mockState, mockAccounts)

    expect(mockState.accounts).toEqual(mockAccounts)
  })
})

describe('UPSERT_ACCOUNT', () => {
  it('pushes a new account to state', () => {
    const mockState = {
      accounts: [{ name: 'acc-1' }],
    }
    const mockAccount = { name: 'acc-2' }

    commit.UPSERT_ACCOUNT(mockState, mockAccount)

    expect(mockState.accounts).toEqual([
      { name: 'acc-1' },
      { name: 'acc-2' },
    ])
  })
})
