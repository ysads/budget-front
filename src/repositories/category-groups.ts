import { get, post } from '@/api';
import { ref } from 'vue';
import { CategoryGroup } from '@/types/models';
import { BudgetReq } from '@/types/api';

interface ApiCreateCategoryGroupRequest {
  budgetId: string;
  name: string;
}

export const categoryGroups = ref<CategoryGroup[]>([]);

export const categoryGroupById = (id: string): CategoryGroup | undefined => {
  return categoryGroups.value.find((c) => c.id === id);
};

export const createCategoryGroup = async (
  params: ApiCreateCategoryGroupRequest,
): Promise<void> => {
  const categoryGroup = await post(
    `budgets/${params.budgetId}/category_groups`,
    params,
  );

  categoryGroups.value.push(categoryGroup);
};

export const getCategoryGroups = async (params: BudgetReq): Promise<void> => {
  const groups = await get(`budgets/${params.budgetId}/category_groups`);
  categoryGroups.value = groups;
};
