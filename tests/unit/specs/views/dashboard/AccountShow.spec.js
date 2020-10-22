import AccountShow from '@/views/dashboard/AccountShow'
import factories from '#/factories'
import flushPromises from 'flush-promises'
import { factoryBuilder } from '#/factory-builder'
import { ACCOUNTS, BUDGETS } from '@/store/namespaces'

const openBudget = factories.budget.build()
const accounts = factories.account.buildList(3)
const selectedAccount = accounts[0]

const factory = (args = {}) => factoryBuilder(AccountShow, {
  store: {
    [ACCOUNTS]: {
      state: {
        accounts: args.accounts || accounts,
      },
    },
    [BUDGETS]: {
      state: {
        openBudget,
      },
    },
  },
  mocks: {
    $route: {
      params: { id: selectedAccount.id },
    },
    ...args.mocks,
  },
})

describe('AccountShow', () => {
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

  context('when account state changes', () => {
    it('fetches account', async () => {
      const wrapper = factory({ accounts: [] })
      await flushPromises()

      expect(wrapper.find("[data-test='header']").exists()).toBe(false)

      wrapper.vm.$store.state.account.accounts = accounts
      await flushPromises()

      expect(wrapper.find("[data-test='header']").exists()).toBe(true)
    })
  })
})
