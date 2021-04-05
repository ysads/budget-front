import { get, post } from '@/api'
import { computed, ref } from '@vue/composition-api'
import groupBy from 'lodash/groupBy'

export const monthlyBudgets = ref([])

export const createMonthlyBudget = async ({ budgetId, ...rest }) => {
  const monthlyBudget = await post(
    `budgets/${budgetId}/monthly_budgets`, rest,
  )

  monthlyBudgets.value.push(monthlyBudget)
}

export const getMonthlyBudgets = async ({ budgetId, ...rest }) => {
  const response = await get(
    `budgets/${budgetId}/monthly_budgets/`, rest,
  )

  monthlyBudgets.value = response
}

export const monthlyBudgetsByCategoryGroup = computed(() => {
  return groupBy(monthlyBudgets.value, m => m.categoryGroupId)
})
