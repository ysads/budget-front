import { get, post } from '@/api'
import { ref } from '@vue/composition-api'

const categoryGroups = ref([])

const createCategoryGroup = async (params) => {
  const categoryGroup = await post(
    `budgets/${params.budgetId}/category_groups`, params,
  )

  categoryGroups.value.push(categoryGroup)
}

const getCategoryGroups = async (params) => {
  const groups = await get(
    `budgets/${params.budgetId}/category_groups`,
  )
  categoryGroups.value = groups
}

export default {
  categoryGroups,
  createCategoryGroup,
  getCategoryGroups,
}
