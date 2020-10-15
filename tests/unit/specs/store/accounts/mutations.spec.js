import commit from '@/store/accounts/mutations'
import factories from '#/factories'

describe('SET_ACCOUNTS', () => {
  it('replaces accounts on state', () => {
    const mockState = { accounts: [] }
    const mockAccounts = factories.account.buildList(1)

    commit.SET_ACCOUNTS(mockState, mockAccounts)

    expect(mockState.accounts).toEqual(mockAccounts)
  })
})

describe('UPSERT_ACCOUNT', () => {
  it('pushes a new account to state', () => {
    const prevAccount = factories.account.build()
    const newAccount = factories.account.build()
    const mockState = { accounts: [prevAccount] }

    commit.UPSERT_ACCOUNT(mockState, newAccount)

    expect(mockState.accounts).toEqual([prevAccount, newAccount])
  })
})
