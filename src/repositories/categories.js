import { get, post } from '@/api'
import { ref } from '@vue/composition-api'

export const categories = ref([])

export const categoriesByGroupId = (groupId) => {
  return categories.value.filter(c => c.categoryGroupId === groupId)
}

export const createCategory = async (params) => {
  const categoryGroup = await post(
    `budgets/${params.budgetId}/categories`, params,
  )

  categories.value.push(categoryGroup)
}

export const getCategories = async (params) => {
  const groups = await get(
    `budgets/${params.budgetId}/categories`,
  )
  categories.value = groups
}
