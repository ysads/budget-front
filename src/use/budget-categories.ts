import { categoriesGroupedByGroupId } from '@/repositories/categories';
import { categoryGroupById } from '@/repositories/category-groups';
import { computed, ComputedRef } from 'vue';
import useI18n from '@/use/i18n';

interface BudgetCategoryOption {
  label: string | undefined;
  value: string;
}

interface BudgetCategoryGroupOption {
  label: string | undefined;
  options: BudgetCategoryOption[];
}

export default function useBudgetCategories(): ComputedRef<
  BudgetCategoryGroupOption[]
> {
  const { st } = useI18n('budgetCategories');

  const inflowCategory = {
    label: st('inflow'),
    options: [
      {
        label: st('toBeBudgeted'),
        value: '',
      },
    ],
  };
  const userCategories = Object.entries(categoriesGroupedByGroupId.value).map(
    ([groupId, categories]) => ({
      label: categoryGroupById(groupId)?.name,
      options: categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    }),
  );

  const categoryOptions = computed(() => [inflowCategory, ...userCategories]);

  return categoryOptions;
}
