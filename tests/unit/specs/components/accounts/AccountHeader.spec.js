import AccountHeader from '@/components/accounts/AccountHeader'
import Faker from 'faker'
import factories from '#/factories'
import { factoryBuilder } from '#/factory-builder'
import * as Money from '@/support/money'

const account = factories.account.build()
const cleared = account.clearedBalance
const uncleared = account.unclearedBalance
const budget = factories.budget.build()
const name = Faker.name.findName()

const factory = (args = {}) => factoryBuilder(AccountHeader, {
  propsData: {
    budget,
    name,
    cleared,
    uncleared,
    ...args.propsData,
  },
})

describe('AccountHeader', () => {
  it('renders account name', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='account-name']")

    expect(item.text()).toEqual(name)
  })

  it('renders uncleared balance', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='cleared']")

    expect(item.text()).toMatch('cleared')
    expect(item.text()).toMatch(Money.localize(cleared, budget))
  })

  it('renders cleared balance', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='uncleared']")

    expect(item.text()).toMatch('uncleared')
    expect(item.text()).toMatch(Money.localize(uncleared, budget))
  })

  it('renders current working balance', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='current']")

    expect(item.text()).toMatch('currentBalance')
    expect(item.text()).toMatch(Money.localize(cleared + uncleared, budget))
  })

  context('when cleared balance is positive', () => {
    it('adds positive class', () => {
      const wrapper = factory({ propsData: { cleared: 9000 } })
      const item = wrapper.find("[data-test='cleared-amount']")

      expect(item.classes()).toContain('positive')
    })

    it('adds negative class', () => {
      const wrapper = factory({ propsData: { cleared: -9000 } })
      const item = wrapper.find("[data-test='cleared-amount']")

      expect(item.classes()).toContain('negative')
    })
  })

  context('when uncleared balance is positive', () => {
    it('adds positive class', () => {
      const wrapper = factory({ propsData: { uncleared: 9000 } })
      const item = wrapper.find("[data-test='uncleared-amount']")

      expect(item.classes()).toContain('positive')
    })

    it('adds negative class', () => {
      const wrapper = factory({ propsData: { uncleared: -9000 } })
      const item = wrapper.find("[data-test='uncleared-amount']")

      expect(item.classes()).toContain('negative')
    })
  })

  context('when current balance is positive', () => {
    it('adds positive class', () => {
      const wrapper = factory({ propsData: { cleared: 9000, uncleared: 0 } })
      const item = wrapper.find("[data-test='current-amount']")

      expect(item.classes()).toContain('positive')
    })

    it('adds negative class', () => {
      const wrapper = factory({ propsData: { cleared: -9000, uncleared: 0 } })
      const item = wrapper.find("[data-test='current-amount']")

      expect(item.classes()).toContain('negative')
    })
  })

})
