import { post } from '@/api'
import { ref } from '@vue/composition-api'

export const monthlyBudgets = ref([])

export const createMonthlyBudget = async (params) => {
  const monthlyBudget = await post(
    `budgets/${params.budgetId}/monthly_budgets`, params,
  )

  monthlyBudgets.value.push(monthlyBudget)
}
