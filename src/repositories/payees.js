import { get } from '@/api'
import { ref } from '@vue/composition-api'

export const payees = ref([])

export const getPayees = async (params) => {
  const response = await get(
    `budgets/${params.budgetId}/payees`,
  )

  payees.value = response
}
