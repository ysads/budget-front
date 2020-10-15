import getters from '@/store/accounts/getters'
import factories from '#/factories'

describe('getters', () => {
  describe('#budgetAccounts', () => {
    it('returns only accounts with budget nature', () => {
      const budgetAccount = factories.account.budget().build()
      const trackingAccount = factories.account.tracking().build()

      const state = { accounts: [budgetAccount, trackingAccount] }

      expect(getters.budgetAccounts(state)).toEqual([budgetAccount])
    })
  })

  describe('#trackingAccounts', () => {
    it('returns only accounts with budget nature', () => {
      const budgetAccount = factories.account.budget().build()
      const trackingAccount = factories.account.tracking().build()

      const state = { accounts: [budgetAccount, trackingAccount] }

      expect(getters.trackingAccounts(state)).toEqual([trackingAccount])
    })
  })
})
