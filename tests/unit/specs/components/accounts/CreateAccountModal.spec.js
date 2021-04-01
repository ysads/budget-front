import alert from '@/support/alert'
import CreateAccountModal from '@/components/accounts/CreateAccountModal'
import Faker from 'faker'
import factories from '#/factories'
import sample from 'lodash/sample'
import { factoryBuilder } from '#/factory-builder'
import { handleApiError } from '@/api/errors'
import { ACCOUNT_TYPES } from '@/constants/account'
import * as accountsRepository from '@/repositories/accounts'
import * as money from '@/support/money'
import flushPromises from 'flush-promises'

jest.mock('@/api/errors', () => ({
  handleApiError: jest.fn(),
}))

jest.mock('@/support/alert', () => ({
  success: jest.fn(),
  error: jest.fn(),
}))

const budget = factories.budget.build()
const form = {
  accountName: Faker.finance.accountName(),
  accountType: sample(ACCOUNT_TYPES),
  currentBalance: '2940,90',
}

const factory = (args = {}) => {
  accountsRepository.createAccount = args.createAccount || jest.fn(
    () => Promise.resolve(),
  )

  return factoryBuilder(CreateAccountModal, {
    data: args.data,
    propsData: { budget: budget },
    mocks: { BaseModal: true },
  })
}

describe('CreateAccountModal', () => {
  it('renders account type select with an option for each account type', () => {
    const wrapper = factory()
    const label = wrapper.find("[data-test='account-type']")
    const options = wrapper.findAll("[data-test='select-option']")

    expect(label.props().text).toEqual('CreateAccountModal.accountType')
    expect(options.length).toEqual(ACCOUNT_TYPES.length)
  })

  it('renders account name input', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='account-name']")

    expect(item.props().label).toEqual('CreateAccountModal.accountName')
  })

  it('renders current balance input', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='current-balance']")

    expect(item.props()).toMatchObject({
      label: 'CreateAccountModal.currentBalance',
      money: money.currencySettings(budget),
    })
  })

  describe('#accountTypes', () => {
    it('is an array with each account type and its label', () => {
      const wrapper = factory()
      const typesOptions = ACCOUNT_TYPES.map(type => ({
        label: expect.stringMatching(`account.type.${type}`),
        value: type,
      }))

      expect(wrapper.vm.accountTypes).toEqual(typesOptions)
    })
  })

  context('when BaseModal emits close', () => {
    it('emits close', () => {
      const wrapper = factory()

      wrapper.find("[data-test='base-modal']").vm.$emit('close')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })

  context('when form is submitted', () => {
    it('validates form', async () => {
      const wrapper = factory({ data: { form } })
      const isValid = jest.spyOn(wrapper.vm, 'isValid')

      await wrapper.find("[data-test='form']").trigger('submit.prevent')

      expect(isValid).toHaveBeenCalled()
    })

    it('calls createAccount with form', async () => {
      const createAccount = jest.fn()
      const wrapper = factory({
        data: { form },
        createAccount,
      })

      await wrapper.find("[data-test='form']").trigger('submit.prevent')

      expect(createAccount).toHaveBeenCalledWith({
        ...form,
        budgetId: budget.id,
        payeeName: expect.stringMatching(/startingBalance/),
        currentBalance: money.currencyToCents(form.currentBalance, budget),
      })
    })

    context('and api fails', () => {
      it('handles api error', async () => {
        const error = new Error()
        const wrapper = factory({
          createAccount: jest.fn(() => Promise.reject(error)),
        })

        await wrapper.setData({ form })
        await wrapper.find("[data-test='form']").trigger('submit.prevent')

        await flushPromises()

        expect(handleApiError).toHaveBeenCalledWith(error)
      })
    })

    context('and validation fails', () => {
      it('does call createAccount', async () => {
        const createAccount = jest.fn()
        const wrapper = factory({
          data: { form },
          createAccount,
        })
        jest.spyOn(wrapper.vm, 'isValid').mockReturnValue(false)

        await wrapper.find("[data-test='form']").trigger('submit.prevent')

        expect(createAccount).not.toHaveBeenCalled()
      })
    })
  })
})
