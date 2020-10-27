import AllAccounts from '@/views/dashboard/AllAccounts'
import factories from '#/factories'
import { factoryBuilder } from '#/factory-builder'
import { ACCOUNTS, BUDGETS } from '@/store/namespaces'

const openBudget = factories.budget.build()
const accounts = factories.account.buildList(3)

const factory = (args = {}) => factoryBuilder(AllAccounts, {
  store: {
    [ACCOUNTS]: {
      state: {
        accounts,
      },
    },
    [BUDGETS]: {
      state: {
        openBudget,
      },
    },
  },
})

describe('AllAccounts', () => {
  it('renders AccountHeader with accounts totals as props', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='header']")

    expect(item.props()).toEqual({
      budget: openBudget,
      cleared: accounts.reduce((total, a) => total + a.clearedBalance, 0),
      uncleared: accounts.reduce((total, a) => total + a.unclearedBalance, 0),
      name: expect.stringMatching(/allAccounts/),
    })
  })
})
