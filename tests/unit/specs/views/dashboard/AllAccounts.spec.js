import AllAccounts from '@/views/dashboard/AllAccounts'
import factories from '#/factories'
import { factoryBuilder } from '#/factory-builder'
import * as budgetsRepository from '@/repositories/budgets'
import * as accountsRepository from '@/repositories/accounts'

const openBudget = factories.budget.build()
const accounts = factories.account.buildList(3)

const factory = () => factoryBuilder(AllAccounts)

describe('AllAccounts', () => {
  beforeEach(() => {
    budgetsRepository.openBudget.value = openBudget
    accountsRepository.accounts.value = accounts
  })

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
