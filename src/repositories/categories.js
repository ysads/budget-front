import { get, post } from '@/api'
import { computed, ref } from '@vue/composition-api'
import groupBy from 'lodash/groupBy'

export const categories = ref([])

export const categoriesByGroupId = (groupId) => {
  return categories.value.filter(c => c.categoryGroupId === groupId)
}

export const categoriesGroupedByGroupId = computed(
  () => groupBy(categories.value, c => c.categoryGroupId),
)

export const categoryById = (id) => {
  return categories.value.find(c => c.id === id)
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
