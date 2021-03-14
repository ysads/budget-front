import { get } from '@/api'
import { ref } from '@vue/composition-api'

export const openBudget = ref({})

export const getBudgetById = async (id) => {
  openBudget.value = await get(`budgets/${id}`)
}
