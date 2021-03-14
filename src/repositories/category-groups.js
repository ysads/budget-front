import { get, post } from '@/api'
import { ref } from '@vue/composition-api'

export const categoryGroups = ref([])

export const createCategoryGroup = async (params) => {
  const categoryGroup = await post(
    `budgets/${params.budgetId}/category_groups`, params,
  )

  categoryGroups.value.push(categoryGroup)
}

export const getCategoryGroups = async (params) => {
  const groups = await get(
    `budgets/${params.budgetId}/category_groups`,
  )
  categoryGroups.value = groups
}
