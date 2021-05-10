import alert from '@/support/alert'
import factories from '#/factories'
import flushPromises from 'flush-promises'
import MockDate from 'mockdate'
import TransactionDetails from '@/components/transactions/TransactionDetails'
import { handleApiError } from '@/api/errors'
import { factoryBuilder } from '#/factory-builder'
import { currencySettings, currencyToCents } from '@/support/money'
import * as categoriesRepo from '@/repositories/categories'
import * as categoryGroupsRepo from '@/repositories/category-groups'
import * as budgetsRepo from '@/repositories/budgets'
import * as payeesRepo from '@/repositories/payees'
import * as transactionsRepository from '@/repositories/transactions'

jest.mock('@/api/errors', () => ({
  handleApiError: jest.fn(),
}))

jest.mock('@/support/alert', () => ({
  success: jest.fn(),
  error: jest.fn(),
}))

const account = factories.account.budget().build()
const budget = factories.budget.build()
const payees = factories.payee.buildList(2)
const categoryGroups = factories.categoryGroup.buildList(2)
const categories = [
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[0].id }),
  factories.category.build({ categoryGroupId: categoryGroups[1].id }),
]
const form = {
  amount: factories.money.build(),
  budgetId: budget.id,
  clearedAt: new Date().toISOString(),
  memo: '',
  categoryId: '',
  originId: account.id,
  outflow: true,
  payeeName: '',
  referenceAt: new Date(),
}

const factory = (args = {}) => {
  budgetsRepo.openBudget.value = budget
  categoriesRepo.categories.value = categories
  categoryGroupsRepo.categoryGroups.value = categoryGroups
  payeesRepo.payees.value = payees
  transactionsRepository.createTransaction = jest.fn()

  return factoryBuilder(TransactionDetails, {
    propsData: {
      originAccount: args.account || account,
    },
  })
}

describe('TransactionDetails', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

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

  describe('when cleared-at is checked', () => {
    it('sets form.clearedAt as true', async () => {
      const wrapper = factory()
      const item = wrapper.find("[data-test='cleared-at']")

      await item.vm.$emit('input', true)

      expect(wrapper.vm.form.clearedAt).toEqual(new Date().toISOString())
    })
  })

  describe('when cleared-at is unchecked', () => {
    it('sets form.clearedAt as null', async () => {
      const wrapper = factory()
      const item = wrapper.find("[data-test='cleared-at']")

      await item.vm.$emit('input', true)
      await item.vm.$emit('input', false)

      expect(wrapper.vm.form.clearedAt).toBeNull()
    })
  })

  describe('when save button emits click', () => {
    it('creates a new monthly budget', async () => {
      const wrapper = factory()

      await wrapper.setData({ form })
      await wrapper.find("[data-test='save-btn']").vm.$emit('click')

      expect(transactionsRepository.createTransaction).toHaveBeenCalledWith(
        {
          ...form,
          amount: currencyToCents(form.amount, budget),
        },
      )
    })

    it('emits close', async () => {
      const wrapper = factory()

      await wrapper.setData({ form })
      await wrapper.find("[data-test='save-btn']").vm.$emit('click')

      expect(wrapper.emitted().close).toBeTruthy()
    })

    it('alerts an success', async () => {
      const wrapper = factory()

      await wrapper.setData({ form })
      await wrapper.find("[data-test='save-btn']").vm.$emit('click')

      expect(alert.success).toHaveBeenCalledWith(
        expect.stringMatching(/created/),
      )
    })

    describe('and request fails', () => {
      it('handles api error', async () => {
        const wrapper = factory()
        const error = new Error()

        transactionsRepository.createTransaction.mockResolvedValueOnce(
          Promise.reject(error),
        )

        await wrapper.setData({ form })
        await wrapper.find("[data-test='save-btn']").vm.$emit('click')

        await flushPromises()

        expect(handleApiError).toHaveBeenCalledWith(error)
      })
    })
  })
})
