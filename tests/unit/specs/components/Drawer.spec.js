import Drawer from '@/components/Drawer'
import factories from '#/factories'
import flushPromises from 'flush-promises'
import { factoryBuilder } from '#/factory-builder'
import { BUDGETS, ACCOUNTS } from '@/store/namespaces'

const accounts = factories.account.buildList(2)
const openBudget = factories.budget.build()

const factory = (args = {}) => factoryBuilder(Drawer, {
  propsData: args.propsData,
  store: {
    [ACCOUNTS]: {
      state: {
        accounts: args.accounts || accounts,
      },
      actions: {
        getAccounts: args.getAccounts || jest.fn(() => Promise.resolve()),
      },
    },
    [BUDGETS]: {
      state: { openBudget },
    },
  },
  mocks: args.mocks || {},
})

describe('Drawer', () => {
  it('fetches all accounts from current budget', () => {
    const getAccounts = jest.fn()
    factory({ getAccounts })

    expect(getAccounts).toHaveBeenCalledWith(expect.anything(), {
      budgetId: openBudget.id,
    })
  })

  it('renders a link to all accounts', async () => {
    const wrapper = factory()
    await flushPromises()

    const item = wrapper.find("[data-test='all-accounts-link']")

    expect(item.props().to).toEqual({ name: 'AllAccounts' })
    expect(item.text()).toMatch(/allAccounts/)
  })

  it('renders a add account button', async () => {
    const wrapper = factory()
    await flushPromises()

    const item = wrapper.find("[data-test='add-account-btn']")

    expect(item.text()).toMatch(/addAccount/)
  })

  context('when at the AllAccounts pages ', () => {
    it('renders all accounts menu item as active', async () => {
      const wrapper = factory({ mocks: { $route: { name: 'AllAccounts' } } })
      await flushPromises()

      const item = wrapper.find("[data-test='all-accounts-item']")

      expect(item.classes()).toContain('active')
    })
  })

  context('when create account button is clicked', () => {
    it('shows create account modal', async () => {
      const wrapper = factory()
      await flushPromises()

      await wrapper.find("[data-test='add-account-btn']")
        .vm.$emit('click')

      const modal = wrapper.find("[data-test='create-account-modal']")
      expect(modal.exists()).toBe(true)
    })

    context('and modal emits close', () => {
      it('hides create account modal', async () => {
        const wrapper = factory()
        await flushPromises()

        await wrapper.find("[data-test='add-account-btn']")
          .vm.$emit('click')
        await wrapper.find("[data-test='create-account-modal']")
          .vm.$emit('close')

        const modal = wrapper.find("[data-test='create-account-modal']")
        expect(modal.exists()).toBe(false)
      })
    })
  })

  context('when there are budget accounts', () => {
    it('renders an account accordion with them', async () => {
      const budgetAccounts = factories.account.budget().buildList(1)
      const wrapper = factory({ accounts: budgetAccounts })
      await flushPromises()

      const item = wrapper.find("[data-test='budget-accounts-accordion']")

      expect(item.props()).toEqual({
        accounts: budgetAccounts,
        budget: openBudget,
        label: expect.stringMatching(/budgetAccounts/),
        name: 'budget',
      })
    })
  })

  context('when there are tracking accounts', () => {
    it('renders an account accordion with them', async () => {
      const trackingAccounts = factories.account.tracking().buildList(1)
      const wrapper = factory({ accounts: trackingAccounts })
      await flushPromises()

      const item = wrapper.find("[data-test='tracking-accounts-accordion']")

      expect(item.props()).toEqual({
        accounts: trackingAccounts,
        budget: openBudget,
        label: expect.stringMatching(/trackingAccounts/),
        name: 'tracking',
      })
    })
  })

  context('when there are neither budget nor tracking accounts', () => {
    it('renders a message', async () => {
      const wrapper = factory({ accounts: [] })
      await flushPromises()

      const accordion = wrapper.find("[data-test='accounts-accordion']")
      const emptyAccounts = wrapper.find("[data-test='empty-accounts-text']")

      expect(accordion.exists()).toEqual(false)
      expect(emptyAccounts.text()).toMatch(/noAccounts/)
      expect(emptyAccounts.text()).toMatch(/noAccountsTip/)
    })
  })
})
