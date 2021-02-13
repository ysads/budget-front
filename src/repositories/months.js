import { get } from '@/api'
import { ref } from '@vue/composition-api'

export const currentMonth = ref({})

export const getMonthByIso = async (params) => {
  const month = await get(
    `budgets/${params.budgetId}/months/${params.isoMonth}`,
  )

  currentMonth.value = month
}
