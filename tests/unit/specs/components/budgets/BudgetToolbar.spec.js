import BudgetToolbar from '@/components/budgets/BudgetToolbar'
import factories from '#/factories'
import * as repository from '@/repositories/budgets'
import { factoryBuilder } from '#/factory-builder'

const openBudget = factories.budget.build()

const factory = (args = {}) => factoryBuilder(BudgetToolbar)

repository.openBudget.value = openBudget

describe('BudgetToolbar', () => {
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

  it('renders new monthly budget button', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='new-monthly-budget-btn']")

    expect(item.text()).toMatch('newMonthlyBudget')
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

  it('does not render create monthly budget details by default', () => {
    const wrapper = factory()
    const item = wrapper.find("[data-test='monthly-budget-details']")

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

  context('when new monthly budget button is clicked', () => {
    it('shows create category modal', async () => {
      const wrapper = factory()
      await wrapper.find("[data-test='new-monthly-budget-btn']")
        .vm.$emit('click')

      const modal = wrapper.find("[data-test='monthly-budget-details']")

      expect(modal.exists()).toBeTruthy()
    })
  })
})
