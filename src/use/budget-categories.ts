import {
  categoryById,
  categoriesGroupedByGroupId,
} from '@/repositories/categories';
import { categoryGroupById } from '@/repositories/category-groups';
import { computed, ComputedRef } from 'vue';
import useI18n from '@/use/i18n';
import { Category, CategoryGroup, Transaction } from '@/types/models';

interface BudgetCategoryOption {
  label: string | undefined;
  value: string;
}
interface BudgetCategoryGroupOption {
  label: string | undefined;
  options: BudgetCategoryOption[];
}

interface UseBudgetCategoriesHook {
  categoryOptions: ComputedRef<BudgetCategoryGroupOption[]>;
  categoryName: (transaction: Transaction) => string;
}

export default function useBudgetCategories(): UseBudgetCategoriesHook {
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

  const categoryName = (transaction: Transaction) => {
    if (!transaction.categoryId) {
      return `${st('inflow')}: ${st('toBeBudgeted')}`;
    }

    const category = categoryById(transaction.categoryId) as Category;
    const categoryGroup = categoryGroupById(
      category.categoryGroupId,
    ) as CategoryGroup;

    return `${categoryGroup.name}: ${category.name}`;
  };

  return { categoryOptions, categoryName };
}
