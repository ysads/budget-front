import factories from '#/factories'
import TransactionDetails from '@/components/transactions/TransactionDetails'
import { factoryBuilder } from '#/factory-builder'
import { currencySettings } from '@/support/money'
import * as categoriesRepo from '@/repositories/categories'
import * as categoryGroupsRepo from '@/repositories/category-groups'
import * as budgetsRepo from '@/repositories/budgets'
import * as payeesRepo from '@/repositories/payees'

const account = factories.account.budget().build()
const budget = factories.budget.build()
const payees = factories.payee.buildList(2)
const categoryGroups = factories.categoryGroup.buildList(2)
const categories = [
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[1].id }),
]

const factory = (args = {}) => {
  budgetsRepo.openBudget.value = budget
  categoriesRepo.categories.value = categories
  categoryGroupsRepo.categoryGroups.value = categoryGroups
  payeesRepo.payees.value = payees

  return factoryBuilder(TransactionDetails, {
    propsData: {
      originAccount: args.account || account,
    },
  })
}

describe('TransactionDetails', () => {
  it('renders payee select', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='payee']")

    expect(item.props()).toMatchObject({
      options: payees.map(p => ({ label: p.name, value: p.name })),
      allowCreate: true,
      label: expect.stringMatching(/payee/),
    })
  })

  it('renders reference-at datepicker', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='reference-at']")

    expect(item.props()).toMatchObject({
      format: budget.dateFormat,
      label: expect.stringMatching(/referenceAt/),
    })
  })

  it('renders amount input', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='amount']")

    expect(item.props()).toMatchObject({
      money: currencySettings(budget),
      label: expect.stringMatching(/amount/),
    })
  })

  it('renders memo input', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='memo']")

    expect(item.props()).toMatchObject({
      label: expect.stringMatching(/memo/),
      tip: expect.stringMatching(/memoTip/),
    })
  })

  it('renders cleared-at checkbox', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='cleared-at']")

    expect(item.props()).toMatchObject({
      label: expect.stringMatching(/clearedAt/),
      tip: expect.stringMatching(/clearedAtTip/),
    })
  })
})
