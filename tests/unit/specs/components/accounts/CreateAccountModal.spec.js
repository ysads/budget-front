import CreateAccountModal from '@/components/accounts/CreateAccountModal'
import Faker from 'faker'
import factories from '#/factories'
import sample from 'lodash/sample'
import { factoryBuilder } from '#/factory-builder'
import { ACCOUNTS } from '@/store/namespaces'
import { ACCOUNT_TYPES } from '@/constants/account'
import * as money from '@/support/money'

const budget = factories.budget.build()
const form = {
  accountName: Faker.finance.accountName(),
  accountType: sample(ACCOUNT_TYPES),
  currentBalance: '2940,90',
}

const factory = (args = {}) => factoryBuilder(CreateAccountModal, {
  data: args.data,
  propsData: { budget: budget },
  mocks: { BaseModal: true },
  store: {
    [ACCOUNTS]: {
      actions: {
        createAccount: args.createAccount || jest.fn(() => Promise.resolve()),
      },
    },
  },
})

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
    const label = wrapper.find("[data-test='account-name']")
    const input = label.find("[data-test='input']")

    expect(label.props().text).toEqual('CreateAccountModal.accountName')
    expect(input.exists()).toBeTruthy()
  })

  it('renders current balance input', () => {
    const wrapper = factory()
    const label = wrapper.find("[data-test='current-balance']")
    const input = label.find("[data-test='input']")

    expect(label.props().text).toEqual('CreateAccountModal.currentBalance')
    expect(input.props().money).toStrictEqual(money.currencySettings(budget))
  })

  it('renders current balance tip with info variant', () => {
    const wrapper = factory()
    const tip = wrapper.find("[data-test='current-balance-tip']")

    expect(tip.props().text).toEqual('CreateAccountModal.currentBalanceTip')
    expect(tip.props().variant).toEqual('info')
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

  context('when current balance is invalid', () => {
    it('renders current balance tip with error variant', async () => {
      const wrapper = factory({
        data: {
          form: { ...form, currentBalance: '' },
        },
      })

      await wrapper.find("[data-test='form']").trigger('submit.prevent')

      const tip = wrapper.find("[data-test='current-balance-tip']")

      expect(tip.props().text).toEqual('validations.required')
      expect(tip.props().variant).toEqual('error')
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
      const mockCreateAccount = jest.fn()
      const wrapper = factory({
        data: { form },
        createAccount: mockCreateAccount,
      })

      await wrapper.find("[data-test='form']").trigger('submit.prevent')

      expect(mockCreateAccount).toHaveBeenCalledWith(expect.anything(), {
        ...form,
        budgetId: budget.id,
        payeeName: expect.stringMatching(/startingBalance/),
        currentBalance: money.currencyToCents(form.currentBalance, budget),
      })
    })

    context('and validation fails', () => {
      it('does call createAccount', async () => {
        const mockCreateAccount = jest.fn()
        const wrapper = factory({
          data: { form },
          createAccount: mockCreateAccount,
        })
        jest.spyOn(wrapper.vm, 'isValid').mockReturnValue(false)

        await wrapper.find("[data-test='form']").trigger('submit.prevent')

        expect(mockCreateAccount).not.toHaveBeenCalled()
      })
    })
  })
})
