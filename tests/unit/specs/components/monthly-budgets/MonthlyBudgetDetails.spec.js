import * as budgetsRepository from '@/repositories/budgets'
import * as monthlyBudgetRepository from '@/repositories/monthly-budgets'
import * as monthsRepository from '@/repositories/months'
import MonthlyBudgetDetails from '@/components/monthly-budgets/MonthlyBudgetDetails'
import factories from '#/factories'
import { currencyToCents } from '@/support/money'
import { factoryBuilder } from '#/factory-builder'

const openBudget = factories.budget.build()
const currentMonth = factories.month.build()
const form = {
  categoryId: factories.category.build().id,
  budgeted: factories.money.build({ currency: openBudget.currency }),
}

monthlyBudgetRepository.createMonthlyBudget = jest.fn()
monthsRepository.currentMonth.value = currentMonth
budgetsRepository.openBudget.value = openBudget

const factory = (args = {}) => factoryBuilder(MonthlyBudgetDetails)

describe('MonthlyBudgetDetails', () => {
  it('renders budgeted input', () => {
    const wrapper = factory()

    const item = wrapper.find("[data-test='budgeted']")

    expect(item.props().label).toEqual('MonthlyBudgetDetails.budgeted')
  })

  it('renders category select', () => {
    const wrapper = factory()

    const item = wrapper.find("[data-test='category']")

    expect(item.props().placeholder).toEqual('MonthlyBudgetDetails.categoryPlaceholder')
    expect(item.props().label).toEqual('MonthlyBudgetDetails.category')
  })

  it('renders save button', () => {
    const wrapper = factory()

    const item = wrapper.find("[data-test='save-btn']")

    expect(item.text()).toMatch(/save/)
    expect(item.props()).toMatchObject({
      fullWidth: true,
      size: 'normal',
      type: 'primary',
    })
  })

  describe('when save button emits click', () => {
    it('creates a new monthly budget', async () => {
      const wrapper = factory()

      await wrapper.setData({ form })
      await wrapper.find("[data-test='save-btn']").vm.$emit('click')

      expect(monthlyBudgetRepository.createMonthlyBudget).toHaveBeenCalledWith(
        {
          ...form,
          budgeted: currencyToCents(form.budgeted, openBudget),
          budgetId: openBudget.id,
          monthId: currentMonth.id,
        },
      )
    })

    it('emits close', async () => {
      const wrapper = factory()

      await wrapper.setData({ form })
      await wrapper.find("[data-test='save-btn']").vm.$emit('click')

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })
})
