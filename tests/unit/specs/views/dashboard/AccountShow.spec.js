import AccountShow from '@/views/dashboard/AccountShow'
import factories from '#/factories'
import flushPromises from 'flush-promises'
import alert from '@/support/alert'
import { factoryBuilder } from '#/factory-builder'
import * as budgetsRepository from '@/repositories/budgets'
import * as accountsRepository from '@/repositories/accounts'

jest.mock('@/support/alert', () => ({
  error: jest.fn(),
}))

const openBudget = factories
const accounts = factories.account.buildList(3)
const selectedAccount = accounts[0]

const factory = (args = {}) => factoryBuilder(AccountShow, {
  mocks: {
    $route: {
      params: { id: selectedAccount.id },
    },
    ...args.mocks,
  },
})

describe('AccountShow', () => {
  beforeEach(() => {
    budgetsRepository.openBudget.value = openBudget
    accountsRepository.accounts.value = accounts
  })

  it('renders AccountHeader with selected account data as props', async () => {
    const wrapper = factory()

    await flushPromises()
    const item = wrapper.find("[data-test='header']")

    expect(item.props()).toEqual({
      budget: openBudget,
      cleared: selectedAccount.clearedBalance,
      uncleared: selectedAccount.unclearedBalance,
      name: selectedAccount.name,
    })
  })

  it('renders AccountToolbar using selected account', async () => {
    const wrapper = factory()

    await flushPromises()
    const item = wrapper.find("[data-test='toolbar']")

    expect(item.props()).toEqual({ account: selectedAccount })
  })

  describe('when query string id changes', () => {
    it('fetches new account', async () => {
      const wrapper = factory()
      await flushPromises()

      const header = wrapper.find("[data-test='header']")

      expect(header.props().name).toBe(accounts[0].name)

      wrapper.vm.$route.params.id = accounts[2].id
      await flushPromises()

      expect(header.props().name).toBe(accounts[2].name)
    })
  })

  describe('when there is not an account with such id', () => {
    it('redirects to AllAccounts page', async () => {
      const $router = { push: jest.fn() }
      factory({
        mocks: {
          $route: { params: { id: 'other-id' } },
          $router,
        },
      })

      await flushPromises()

      expect($router.push).toHaveBeenCalledWith({ name: 'AllAccounts' })
    })

    it('alerts user', async () => {
      factory({
        mocks: { $route: { params: { id: 'other-id' } } },
      })

      await flushPromises()

      expect(alert.error).toHaveBeenCalledWith('errors.accounts.not-found')
    })
  })
})
