import AccountAccordion from '@/components/accounts/AccountAccordion'
import * as Money from '@/support/money'
import Faker from 'faker'
import factories from '#/factories'
import sample from 'lodash/sample'
import { factoryBuilder } from '#/factory-builder'

const accounts = factories.account.buildList(2)
const budget = factories.budget.build()
const label = Faker.name.findName()
const name = sample(['tracking', 'budget'])

const factory = (args = {}) => factoryBuilder(AccountAccordion, {
  propsData: {
    accounts,
    budget,
    label,
    name,
    ...args.propsData,
  },
  mocks: {
    ...args.mocks,
  },
})

describe('AccountAccordion', () => {
  it('renders account totals', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='title']")

    const total = accounts.reduce((total, a) => total + a.balance, 0)

    expect(item.text()).toMatch(label)
    expect(item.text()).toMatch(Money.localize(total, budget))
  })

  it('renders a list item to each account', () => {
    const wrapper = factory()
    const items = wrapper.findAll("[data-test='account-item']")

    expect(items.length).toBe(accounts.length)
  })

  it('renders the open account item with active class', () => {
    const $route = { params: { id: accounts[1].id } }
    const wrapper = factory({ mocks: { $route } })
    const items = wrapper.findAll("[data-test='account-item']")

    expect(items.at(0).classes()).not.toContain('active')
    expect(items.at(1).classes()).toContain('active')
  })

  it('renders a link to each account', () => {
    const wrapper = factory()
    const items = wrapper.findAll("[data-test='account-link']")

    accounts.map((account, index) => {
      expect(items.at(index).props().to).toEqual({
        name: 'AccountShow',
        params: { id: account.id },
      })
      expect(items.at(index).text()).toMatch(
        Money.localize(account.balance, budget),
      )
      expect(items.at(index).text()).toMatch(account.name)
    })
  })

  context('when there is no account', () => {
    it('does not render accordion', () => {
      const wrapper = factory({ propsData: { accounts: [] } })
      const item = wrapper.find("[data-test='accordion']")

      expect(item.exists()).toBe(false)
    })
  })
})
