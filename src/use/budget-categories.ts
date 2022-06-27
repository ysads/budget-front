import { categories, categoryById } from '@/repositories/categories';
import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Category, Transaction } from '@/types/models';
import { groupBy } from 'lodash';

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

export default function useBudgetCategories(
  includeInflow = true,
): UseBudgetCategoriesHook {
  const { t } = useI18n();

  const inflowCategory = {
    label: t('budgetCategories.inflow'),
    options: [
      {
        label: t('budgetCategories.toBeBudgeted'),
        value: '',
      },
    ],
  };
  const userCategories = computed(() =>
    Object.entries(groupBy(categories.value, 'groupName')).map(
      ([groupName, categories]) => ({
        label: groupName,
        options: categories.map((category) => ({
          label: category.name,
          value: category.id,
        })),
      }),
    ),
  );
  const categoryOptions = computed(() =>
    includeInflow
      ? [inflowCategory, ...userCategories.value]
      : userCategories.value,
  );

  const categoryName = (transaction: Transaction) => {
    if (!transaction.categoryId) {
      return `${t('budgetCategories.inflow')}: ${t(
        'budgetCategories.toBeBudgeted',
      )}`;
    }

    const category = categoryById(transaction.categoryId) as Category;
    return category
      ? `${category.groupName}: ${category.name}`
      : t('budgetCategories.unknown');
  };

  return { categoryOptions, categoryName };
}
