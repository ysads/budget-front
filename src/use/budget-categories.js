import { categoriesGroupedByGroupId } from '@/repositories/categories'
import { categoryGroupById } from '@/repositories/category-groups'
import { computed } from '@vue/composition-api'
import { useI18n } from '@/use/i18n'

export default function useBudgetCategories () {
  const { st } = useI18n('budgetCategories')

  const inflowCategory = {
    label: st('inflow'),
    options: [{
      label: st('toBeBudgeted'),
      value: null,
    }],
  }
  const userCategories = Object
    .entries(categoriesGroupedByGroupId.value)
    .map(
      ([groupId, categories]) => ({
        label: categoryGroupById(groupId).name,
        options: categories.map(
          category => ({
            label: category.name,
            value: category.id,
          }),
        ),
      }),
    )

  const categoryOptions = computed(() => [inflowCategory, ...userCategories])

  return categoryOptions
}
