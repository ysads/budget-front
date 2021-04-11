import AccountShow from '@/views/dashboard/AccountShow'
import factories from '#/factories'
import flushPromises from 'flush-promises'
import { factoryBuilder } from '#/factory-builder'
import * as budgetsRepository from '@/repositories/budgets'
import * as accountsRepository from '@/repositories/accounts'

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

  context('while fetching account', () => {
    it('renders Loading component', async () => {
      const wrapper = factory()
      const item = wrapper.find("[data-test='loading']")

      expect(item.exists()).toBe(true)

      await flushPromises()

      expect(item.exists()).toBe(false)
    })
  })

  context('when query string id changes', () => {
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
})
