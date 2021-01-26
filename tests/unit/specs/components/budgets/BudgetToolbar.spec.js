import BudgetToolbar from '@/components/budgets/BudgetToolbar'
import factories from '#/factories'
import { factoryBuilder } from '#/factory-builder'
import { BUDGETS } from '@/store/namespaces'

const openBudget = factories.budget.build()

const factory = (args = {}) => factoryBuilder(BudgetToolbar, {
  store: {
    [BUDGETS]: {
      state: { openBudget },
    },
  },
})

describe('CreateCategoryGroupModal', () => {
  it('renders new group button', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='new-group-btn']")

    expect(item.text()).toMatch('newCategoryGroup')
  })

  it('renders new category button', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='new-category-btn']")

    expect(item.text()).toMatch('newCategory')
  })

  it('does not render create group modal by default', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='new-group-modal']")

    expect(item.exists()).toBeFalsy()
  })

  it('does not render create category modal by default', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='new-category-modal']")

    expect(item.exists()).toBeFalsy()
  })

  context('when new group button is clicked', () => {
    it('shows create group modal', async () => {
      const wrapper = factory()
      await wrapper.find("[data-test='new-category-btn']").vm.$emit('click')

      const modal = wrapper.find("[data-test='new-category-modal']")

      expect(modal.exists()).toBeTruthy()
    })
  })

  context('when new category button is clicked', () => {
    it('shows create category modal', async () => {
      const wrapper = factory()
      await wrapper.find("[data-test='new-group-btn']").vm.$emit('click')

      const modal = wrapper.find("[data-test='new-group-modal']")

      expect(modal.exists()).toBeTruthy()
    })
  })
})
