import { get, post } from '@/api'
import { ref } from '@vue/composition-api'

const categories = ref([])

const createCategory = async (params) => {
  const categoryGroup = await post(
    `budgets/${params.budgetId}/categories`, params,
  )

  categories.value.push(categoryGroup)
}

const getCategories = async (params) => {
  const groups = await get(
    `budgets/${params.budgetId}/categories`,
  )
  categories.value = groups
}

export default {
  categories,
  createCategory,
  getCategories,
}
