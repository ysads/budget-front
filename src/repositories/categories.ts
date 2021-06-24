import { get, post } from '@/api';
import { BudgetReq } from '@/types/api';
import { Category } from '@/types/models';
import { computed, ref } from 'vue';
import groupBy from 'lodash/groupBy';

interface ApiCreateCategoryRequest {
  budgetId: string;
  categoryGroupId: string;
  name: string;
}

export const categories = ref<Category[]>([]);

export const categoriesByGroupId = (groupId: string): Category[] => {
  return categories.value.filter(
    (c: Category) => c.categoryGroupId === groupId,
  );
};

export const categoriesGroupedByGroupId = computed(() =>
  groupBy(categories.value, (c: Category) => c.categoryGroupId),
);

export const categoryById = (id: string): Category | undefined => {
  return categories.value.find((c: Category) => c.id === id);
};

export const createCategory = async (
  params: ApiCreateCategoryRequest,
): Promise<void> => {
  const categoryGroup = await post(
    `budgets/${params.budgetId}/categories`,
    params,
  );

  categories.value.push(categoryGroup);
};

export const getCategories = async (params: BudgetReq): Promise<void> => {
  const groups = await get(`budgets/${params.budgetId}/categories`);
  categories.value = groups;
};
